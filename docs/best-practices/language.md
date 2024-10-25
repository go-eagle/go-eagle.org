# 代码最佳实践 - 语言篇

## Go 常见的坑

### 变量

#### 变量遮蔽(Shadowing)

在golang中，我们经常会用 `:=` 来声明变量，这很方便但也会带来一些问题。当变量遇到作用域时就容易产生shadowing  
比如说我们经常会遇到的：

```bash
shadow: declaration of "err" shadows declaration
```

变量遮蔽: 就是在后面重新声明了前面已经声明的同名变量时，后面的变量值会遮蔽前面的变量值，虽然这两个变量同名但值却不一样。导致后面很容易产生问题。

所以: *如无必要，嵌套块中的变量声明尽量不要重名，使用赋值而不是覆盖的形式*

Case 1

```go
// bad case
wg : = new(sync.WaitGroup)
for name, handler : = range HandlerMap {
    wg.Add(1)
    go func(name string, handler SubscribeEventHandler) {
        defer wg.Done()
        err : = handler.Handle(event)
        if err != nil {
            // hande error
        }
    }
}

// good case
wg : = new(sync.WaitGroup)
for name, handler : = range HandlerMap {
    wg.Add(1)
    go func(n string, h SubscribeEventHandler) {
        defer wg.Done()
        err : = h.Handle(event)
        if err != nil {
            // hande error
        }
    }
}
```

Case 2

```go
err := operator1()
if err != nil {
    // 此处定义的err和块外的err不等价，外面的err没有被修改
    err := operator2()
    
    // 此处赋值的err和块外等价，外面的err被修改
    err = operator3()
    // 推荐改为：err := operator3()
    
    // 如果你的err逻辑没有在此处return，那么一定要注意下面if外的代码对外部err的赋值问题
}
```

### Goroutine

#### 优雅退出

- 主协程默认不会等待所有 `goroutine` 协程，会直接退出进程，需要通过 `channel` 阻塞 或者 `WaitGroup` 等待，来实现主协程等待所有的 goroutine 结束后再退出
- 业务需要保证进程优雅退出，避免主进程退出时有 `goroutine` 未结束，对业务有损

```go
// good case
func main() {
     var wg sync.WaitGroup
     for i := 0; i < 10; i++ {
         wg.Add(1)
         go func() {
              defer wg.Done()
              defer func() {
            		if e := recover(); e != nil {
            			buf := make([]byte, 0, 4096)
            			buf = buf[:runtime.Stack(buf, false)]
            			log.WithContext(ctx).Errorf("goroutine panic: %v, stack: \n%s", e, buf)
            		}
              }()
              // do something ...
         }()
     }
     wg.Wait()
     // do something ...
}

// bad case
func main() {
     for i := 0; i < 10; i++ {
         go func() {
              defer func() {
            		if e := recover(); e != nil {
            			buf := make([]byte, 0, 4096)
            			buf = buf[:runtime.Stack(buf, false)]
            			log.WithContext(ctx).Errorf("goroutine panic: %v, stack: \n%s", e, buf)
            		}
              }()
             // do something ...
         }()
     }
     // do something ...
}
```

#### Goroutine 中 recover

- 开启 `goroutine` 总是需要 `recover`，避免 `panic` 导致进程挂掉。
- 建议使用 go + `匿名函数` 方式起 `goroutine`，在匿名函数内部进行 `recover`
- 推荐使用框架提供的封装函数 `async.Go()`

```go
// good case
go func() {
    defer func() {
        if err := recover(); err != nil {
            ...
        }
    }()
    Test()
}

func Test() {}

// bad case1
go func() {
    Test()
}

func Test() {}

// bad case2
go Test()

func Test() {}
```

> recover 中打印panic日志和metric指标，也方便监控进行跟踪

### 并发

#### 并发赋值不安全

- 由一条机器指令完成赋值的类型并发赋值是安全的，这些类型有：byte，bool、int、float、指针、函数。
- struct 或底层是 struct 的类型并发赋值大部分情况不安全，这些类型有 复数、string、 array、slice、map、channel、interface。
- 可以使用 `atomic.Value` 来保证并发赋值的安全性。注意不安全不代表一定发生错误。就是说不安全不代表任何并发赋值的情况下都会发生错误。例如循环次数少的情况下，也很难出现出现异常情况。

```go
// good case
func main() {
     var v atomic.Value
     for i := 0; i < 50000; i++ {
         var wg sync.WaitGroup
         
         // goroutine 1
         wg.Add(1)
         go func() {
             defer wg.Done()
             v.Store("apple")
         }()
         // goroutine 2
         wg.Add(1)
         go func() {
             defer wg.Done()
             v.Store("microsoft")
         }()
         wg.Wait()

         // get value
         s := v.Load()
    }
}

// bad case
func main() {
     var s string
     for i := 0; i < 50000; i++ {
         var wg sync.WaitGroup
         
         // goroutine 1
         wg.Add(1)
         go func() {
             defer wg.Done()
             s = "apple"
         }()
         // goroutine 2
         wg.Add(1)
         go func() {
             defer wg.Done()
             s = "microsoft"
         }()
         wg.Wait()

         // 赋值异常判断
         if s != "apple" && s != "abc" {
             fmt.Printf("concurrent assignment value error, i: %v s: %v", i, s)
             break
         }
    }
}

// concurrent assignment value error, i=3160 s=appxxxsof
```

#### 并发读写map程序崩溃

- Go中并发读写map可能会引发panic，并且这种panic是不可recover的会导致程序崩溃
- 可以加锁或者使用Go中的并发安全的map `sync.Map`，适用于读多写少的场景，使用read和dirty两个map实现读写分离，提高效率

> Pro Tips: 需要拷贝map一定要深拷贝，在不同的协程里并发操作map可能panic

```go
// good case
func main() {
     var sm sync.Map
     for i := 0; i < 10000; i++ {
         go func(x int) {
              // here put recover code ...
              n := rand.Intn(10) 
              time.Sleep(time.Duration(n) * time.Millisecond)
              sm.Store("a", x)
              fmt.Println(sm.Load("a"))
         }(i)
      }
      time.Sleep(time.Duration(1000) * time.Second)
}

// bad case
func main() {
     testMap := make(map[string]int)
     for i := 0; i < 5000; i++ {
         go func(x int) {
             // here put recover code ...
             n := rand.Intn(10) 
             time.Sleep(time.Duration(n)*time.Millisecond)
             testMap["a"] = x
             fmt.Println(mp)
         }(i)
     }
     time.Sleep(time.Duration(1000)*time.Second)
}
// concurrent map writes
// fatal error: concurrent map iteration and map write
```

#### 并发append slice不安全

- 并发对 slice 进行 append 存在不安全问题，但是不会 panic。因为并发的 append 操作的是同一个底层数组，导致同一个数组下标的元素被多次覆盖。
- 可以加锁解决或者避免并发对同一个 slice append  Golang 并发 append slice 时的并发安全问题总结 | 阿小信的博客

>  Golang 并发 append slice 时的并发安全问题总结: http://axiaoxin.com/article/253/

```go
// good case
func main() {
     var s []int
     var mu sync.Mutex
     var wg sync.WaitGroup
     for i := 0; i < 100000; i++ {
          wg.Add(1)
          go func(x int) {
             // recover code ...
             // append slice 加锁解决并发安全问题
             defer wg.Done()
             mu.Lock()
             s = append(s, x)
             mu.Unlock()
          }(i)
     }
     wg.Wait()
     fmt.Println(len(s))   //100000
}

// bad case
func main() {
     var s []int
     var wg sync.WaitGroup
     for i := 0; i < 100000; i++ {
          wg.Add(1)
          go func(x int) {
             // recover code ...
             defer wg.Done()
             s = append(s, x)
          }(i)
     }
     wg.Wait()
     fmt.Println(len(s))   //不等于100000
}
```

#### WaitGroup 的使用

- sync.WaitGroup.Add() 必须在 goroutine 执行前设定，否则不生效
- sync.WaitGroup.Add() 监听的数量与实际goroutine数量必须一致，否则可能会导致panic
- sync.WaitGroup 建议起 goroutine 时才进行 Add(1) 操作，禁止一次性 Add(N) 操作

```go
// good case
func main() {
    var wg sync.WaitGroup

    // 确保 wg.Done()之前执行wg.Add()
    wg.Add(1)  
    go func() {
        defer wg.Done()  
    }()
    
    wg.Add(1)    
    go func() {
        defer wg.Done() 
    }()
     
    wg.Wait()
}

// bad case1
func main() {
    var wg sync.WaitGroup
    
    go func() {
        defer wg.Done()  
        ... //do something
    }()

    //禁止一次性 Add(N) 操作
    wg.Add(2)   
    go func() {
        defer wg.Done() 
        ... //do something
    }()
     
    wg.Wait()
}

// bad case2
func main() {
    var wg sync.WaitGroup
    
    wg.Add(3)  // Add 3/3 pcs 
    go func() {
        defer wg.Done() // Done() twice 1/3
        ... //do something
    }()

    go func() {
        defer wg.Done() // Done() twice 2/3
        ... //do something
    }()
    
    wg.Wait() // locked at waiting  miss 3/3
}

// fatal error: all goroutines are asleep - deadlock!
```

