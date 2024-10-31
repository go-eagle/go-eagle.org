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

### 字符串

#### 字符串遍历

当字符串中包含中文等字符（非 ascii 字符）时
- 使用 `rune` 类型判断字符串长度
- 使用 `rune` 类型获取其中某个字符
- 如果追求性能，使用 `utf8.DecodeRuneInString` 效率会更高（但用着比较麻烦），一般将 `string` 转换成 `[]rune` 即可

```go
// good case 1
// 通过 utf8.DecodeRuneInString 打印中文字符（性能比string 转换成 []rune好1倍）
for len(str) > 0 {
    r, size := utf8.DecodeRuneInString(str)
    fmt.Println(string(r))
    str = str[size:]
}
// 代码运行示例可以看这里 https://goplay.tools/snippet/At0AkqBYNVs

// good case 2
// 将 string 直接转换成 []rune
for _, v := range []rune(str) {
    fmt.Println(string(v))
}

// bad case
// 中文字符串长度与汉字个数不符
str := "测试" 
fmt.Println(len(str))  // 输出 6
fmt.Println(len([]byte(str))) // 输出 6
```

#### 字符串拼接

- 字符串拼接性能比较 [字符串拼接性能及原理 | Go 语言高性能编程 | 极客兔兔：](https://geektutu.com/post/hpg-string-concat.html)
  - `strings.Builder` > `bytes.Buffer` > `+` > `fmt.Sprintf`
- 字符串拼接规则
  - 涉及 `%` 这类特殊字符符时，使用 `+`
  - 正常推荐使用 `fmt.Sprintf` （可读性高）
- `String slice` 字符串拼接可以使用 `strings.Join()`，可读性和性能都会高很多

```go
func main() {
     str := "test"
     path := "docs"

     str1 := "%" + str + "%" // 涉及特殊字符（用 fmt.Sprintf 可读性差）
     str2 := fmt.Sprintf("go-eagle.org/%s", path) // 常规的字符串拼接
}
```

### float

#### float 除0不报错

- float 除0 不报错 结果为 inf，Marshal会报错；int 除0会 panic
- 除法前都需要前置判断除数是否为0

```go
// good case
if postStat.PlayCount > 0 {
    avgPlayDuration := float64(postStat.TotalDuration) / float64(postStat.PlayCount)
}

// bad case
package main

import (
     "fmt"
     "encoding/json"
)

type a struct {
     F float64
}

func main() {
     var fd float64 = 0.0
     t := &a{F: float64(1)/fd}
     bs, err := json.Marshal(t)
     if err != nil {
         fmt.Println(err) // json: unsupported value: +Inf
         return
     }
     fmt.Println(string(bs))
}
```

#### float 比较会有误差

- 浮点数直接比较不稳定可能会有误差，在精度容许范围内使用 `math.Abs` 进行判断
- https://stackoverflow.com/questions/47969385/go-float-comparison

```go
// good case
package main

import (
     "fmt"
     "math"
)

func main() {
     num := 0.1
     fmt.Println(math.Abs(num*3-0.3) < 0.01) // true（容忍0.01以下的精度误差）
}

// bad case
func main() {
     num := 0.1
     num2 := 0.3
        
     fmt.Println(num*3 == 0.3)        // false
     fmt.Println(num+num+num == 0.3)  // false
     fmt.Println(num+num+num == num2) // false
     fmt.Println(num+num+num-0.3 > 0) // true
     fmt.Println(num+num+num-0.3 < 0) // false
        
     fmt.Println(0.1+0.1+0.1 == 0.3)  // true
     fmt.Println(num+num == 0.2)      // true
}
```

#### float 范围判断

- `math.IsInf(v,0)` 可以同时判断正负 `Inf`
- 浮点数的使用要谨慎，要注意 `Inf` 和 `Nan` 的判断，这两个值json序列化时都会报错 [https://goplay.tools/snippet/abTBcOCrHSi](https://goplay.tools/snippet/abTBcOCrHSi)

```go
// 源码 src/math/bits.go
// IsInf reports whether f is an infinity, according to sign.
// If sign > 0, IsInf reports whether f is positive infinity.
// If sign < 0, IsInf reports whether f is negative infinity.
// If sign == 0, IsInf reports whether f is either infinity.
func IsInf(f float64, sign int) bool {
	// Test for infinity by comparing against maximum float.
	// To avoid the floating-point hardware, could use:
	//	x := Float64bits(f);
	//	return sign >= 0 && x == uvinf || sign <= 0 && x == uvneginf;
	return sign >= 0 && f > MaxFloat64 || sign <= 0 && f < -MaxFloat64
}
```

### for 循环

#### for 循环slice append

for循环中对元素是指针类型的切片(slice) 进行append操作，须确保append对象的指针在for循环被正确更新

```go
// good case
func Example() {
    var pTargetList []*Object  
    for i := 0; i < 10; i++ {
        var pObj *Object       
        pObj = &Object{} 
        pObj.Index = i
        targetList = append(targetList, pobj) //append进去的，非同一个指针对象
    }
}

// targetList的元素.Index 的输出结果: [0，1，2，3，4，5，6，7，8，9]

// bad case
func Example() {
    var targetList []*Object  
    var pObj *Object 
    pObj = &Object{}
    for i := 0; i < 10; i++ {
        pObj.Index = i  
        targetList = append(targetList, pobj)   //append进去的，都是同一个指针对象
    }
}

// targetList的元素.Index 的输出结果: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
```

### json

#### 反序列化

- json 反序列数字到 `interface{}` 类型的值中时，默认解析为 **float64** 类型，存在精度缺失问题
- 可以通过使用 `UseNumber` 方法配置，不解析成 `float64`，而是解析成 `json.Number` 类型，再把 `json.Number` 转成 `float64` 或者 `int64`。
- 推荐使用基础库 [json配置](https://github.com/go-eagle/eagle/blob/master/pkg/utils/string.go#L102），默认使用 `UseNumber` 方法配置

```go
// good case
// import (
	"github.com/go-eagle/eagle/pkg/utils"
)
func main() {
     s := `{"gid":6294332276511651283}`
     mp := make(map[string]interface{})
     if err := utils.Json.Unmarshal([]byte(s), &d); err != nil {
         // do something ...
     }
     newStr, err := utils.Json.Marshal(d)
     if err != nil {
        // do something ...
     }
     fmt.Println(string(s2))
}

// bad case
func main() {
     s := `{"gid":6294332276511651283}`
     mp := make(map[string]interface{})
     if err := jsoniter.Unmarshal([]byte(s), &d); err != nil {
         // do something ...
     }
     newStr, err := jsoniter.Marshal(d)
     if err != nil {
        // do something ...
     }
     fmt.Println(string(s2))   //输出的值不是 6294332276511651283
}
```

#### Decode 精度丢失

- Decode 至 `map[string]interface{}` 如果是直接用 unmarshal 原始数据是 int64， 那么会出现精度丢失问题。Decode 源码中，默认用 float64， parseFloat64 会导致 int64 精度丢失。
- 在使用包含 `interface{}` 的struct来做Json反序列化的时候，由于不知道[]byte的数值是具体的何种数值类型，会将数值全部转成float64类型，如果数值原本的类型的表示范围不被float64包含，则不在float64所包含的数转成float64时会发生精度丢失。
- 尽量 `unmarshal` 到具体的 model 中，减少 interface 的使用；或者使用 `UseNumber` 方法

```go
// good case
type Msg struct {
     GID int64 `json: "gid"`
}

func main() {
     s := `{"gid":6294332276511651283}`
     var msg Msg
     if err := json.Unmarshal([]byte(s), &msg); err != nil {
        // do something ...
     }
     fmt.Println(msg.GID)     // 6294332276511651283
}

// bad case
func main() {
     s := `{"gid":6294332276511651283}`
     mp := make(map[string]interface{})
     if err := json.Unmarshal([]byte(s), &mp); err != nil {
         // do something ...
     }
     v, ok := mp["gid"].(float64)
     if ok {
        fmt.Println(v)         // 6.29433227651165e+18
     }
     gid := int64(v) 
     fmt.Println(gid)          // 6294332276511651283
}
```

#### 去除转义字符

- JSON序列化为string字段默认会对 `<`，`>`，`&`，`U+2028` and `U+2029` 进行转义，使用 `\u003c`，`\u003e`，`\u0026`，`\u2028`  and  `\u2029` 进行代替
- 如果想要禁用转义字符需要调用 `SetEscapeHTML(false)`


```go
// good case
// 禁用json中的转义字符
func disableEscapeHtml(data interface{}) (string, error) {
     bf := bytes.NewBuffer([]byte{})
     jsonEncoder := json.NewEncoder(bf)
     jsonEncoder.SetEscapeHTML(false)
     if err := jsonEncoder.Encode(data); err != nil {
         return "", err
     }
     return bf.String(), nil
}
```

#### 反序列化报错未处理

- 在使用 `encoding/json`、`github.com/json-iterator/go` 等包进行反序列化操作时，可能会出现失败，导致业务逻辑使用了model 字段默认值进行判断，出现非预期bug，因此必须对反序列化后返回的error进行判断和处理

```go
// good case
type People struct {
    Name        string `json:"name"`
    Age         string `json:"age"`
}

func main() {
    data := `{"name":"Xiaobai", "age":"20"}`
    stu := People{}
    err := json.Unmarshal([]byte(data), &stu)
    if err!= nil {
       fmt.Printf("json.Unmarshal err: %v", err)
       return
    }
}

// bad case
type People struct {
    Name        string `json:"name"`
    Age         string `json:"age"`
}

func main() {
    data := `{"name":"Xiaobai", "age":"20"}`
    stu := People{}

    // 这里没有处理错误
    json.Unmarshal([]byte(data), &stu)
}
```

### time

#### time.AddDate 使用

golang 自带的 AddDate 方法在使用时可能不符合我们通常的认知，当我们使用 AddDate 时，实际上做了这些事

1. Go 帮我们简单直接的在对应的日期单位上加对应数字
`2021-08-31` 执行 `AddDate(0, 1, 0)` 后实际上先变成了 `2021-09-31`
`2020-02-29` 执行 `AddDate(1, 0, 0)` 后实际上先变成了 `2021-02-29`
2. 再将这个计算为实际存在的日期
`2021-09-31`，因为 9 月没有 31 天，因此往后顺延一天，即最终为 `2021-10-01`
`2021-02-29`，21 年不是闰年，因此也往后顺延一天，即最终为 `2021-03-01`
3. 已经在 `eagle/pkg/utils` 中新增了 `AddDate()` 函数，可以帮我们实现 **通常认知上的时间加减操作**，如 `2020-01-31 + 0000-01-00 = 2020-02-29`

```go
// good case
import ( 
    "fmt" 
    "time" 
    
    "github.com/go-eagle/eagle/pkg/utils" 
) 

func main() { 
     today, _ := time.ParseInLocation("2006-01-02", "2021-08-31", time.Local) 
     afterOneMonth := utils.AddDate(today, 0, 1, 0) 
     fmt.Println(afterOneMonth.Format("2006-01-02")) // 输出 2021-09-30 
     
     today, _ := time.ParseInLocation("2006-01-02", "2020-02-29", time.Local) 
     afterOneMonth := utils.AddDate(today, 1, 0, 0) 
     fmt.Println(afterOneMonth.Format("2006-01-02")) // 输出 2021-02-28 
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

### 切片 slice

#### slice 初始化

- slice 初始化使用 `make([]T, 0, cap)`，不能写成 `make([]T, cap)`，否则后续再使用append操作会导致最终得到了2* cap 长度的数组，并且前半段元素均为零值。
- `make([]T, 0, cap)` 初始化 slice，需要保证 cap 值不能太大，否则会导致 `panic: runtime error: makeslice: cap out of range`

```go
// bad case
s := make([]int64, 10)
s = append(s, 1)
s = append(s, 2)
...
```

#### slice append

- append 结果需要 **赋值给原切片**，因为对 slice 的 append 操作 **总是** 返回一个「新的 slice 」

提示:
- 不在多个函数逻辑里修改slice，尽量只读
- 如果有修改，即使是原地修改也要返回新slice的值
- 如果实在有多个地方修改，尽量把逻辑隔离开，封装一个struct或者深拷贝出新的slice

```go
// good case 1
func main() {
     sliceMap := map[int][]int{
         1: {1, 2, 3},
     }
     // 不会影响 map 元素
     // 在 for range 迭代中，遍历的值是元素的值拷贝，更新拷贝并不会更新原始的元素
     for _, v := range sliceMap {
         v = append(v, -1)
     }
     fmt.Println(sliceMap)  //map[1:[1 2 3]]
}

// good case 2
func main() {
     sliceMap := map[int][]int{
         1: {1, 2, 3},
     }
     // 影响 map 元素
     for i, v := range sliceMap {
         sliceMap[i] = append(v, -2)
     }
     fmt.Println(sliceMap) //map[1:[1 2 3 -2]]
}
```

#### slice 的追加与扩容

使用 append 操作时，可能是对 slice 进行追加或者扩容，详见[源码](https://github.com/golang/go/blob/fa6aa872225f8d33a90d936e7a81b64d2cea68e1/src/runtime/slice.go#L144)  
1. 如果「期望容量大于当前容量的两倍」就会使用期望容量；
2. 如果「当前 slice 的长度小于 1024」 就会将容量翻倍；
3. 如果「当前 slice 的长度大于 1024 」就会每次增加 25% 的容量，直到新容量大于期望容量；

这主要涉及到我们引用一个 slice 时，对新 slice 的改动可能会影响原有 slice
1. 如果没有发生扩容，会直接修改原有 slice 对应的内存，会影响原有 slice
2. 如果发生了扩容，修改会在新的内存中，不会影响原有 slice

```go
originSlice := []int{0, 1, 2}

// 两个 slice 都引用了 originSlice
testSlice1 := originSlice[:2]
testSlice2 := originSlice[:3]

fmt.Println("原始的 slice", originSlice) // 输出 [0,1,2]
fmt.Println("cap", cap(originSlice))  // 输出 3

fmt.Println("testSlice1 slice", testSlice1)     // 输出 [0,1]
fmt.Println("testSlice1 len", len(testSlice1))  // 输出 2
_ = append(testSlice1, 10) // len(testSlice1)<3, append 没发生扩容，append 后会影响 originSlice
fmt.Println("append 没发生扩容", originSlice) // 输出 [0,1,10]

fmt.Println("testSlice2 slice", testSlice2)     // 输出 [0,1,10]
fmt.Println("testSlice2 len", len(testSlice2)) // 输出 3
_ = append(testSlice2, 20) // len(testSlice2)=3, append 发生扩容，append 后不会影响 originSlice
fmt.Println("append 发生了扩容 originSlice", originSlice) // 输出 [0,1,10]
```

#### slice 为空判断

- 使用 len 是否为 0 判断一个 slice 或者 map 是否为空，而不是判断是否为 nil
  - 如果只声明，不赋值，slice 是 nil；例如 var arr []int，json marshal 后是 null
  - 如果声明+赋值，slice 为空，但是不为nil；例如 arr := make([]int, 0, 0)，json marshal 后是 []

```go
 // 只声明
 var slice1 []int
 fmt.Println(slice1 == nil) // 输出 true
 fmt.Println(len(slice1))   // 输出 0

 // 声明+赋值
 slice2 := []int{}
 fmt.Println(slice2 == nil) // 输出 false
 fmt.Println(len(slice2))   // 输出 0
```

### map

#### map遍历key顺序不固定

- `for range map` 遍历key顺序不固定的，Go在开始处理循环逻辑的时候，就做了随机播种，用于决定从哪里开始循环迭代
- 业务不要依赖range遍历返回的key次序，确实有需要可以通过引入 `slice+sort` 来保证key顺序

> 参看：https://cloud.tencent.com/developer/article/1422355

```go
// good case
func main() {
    m := make(map[string]string)
    m["hello"] = "echo hello"
    m["world"] = "echo world"
    m["go"] = "echo go"
    m["is"] = "echo is"
    m["cool"] = "echo cool"

    // 引入slice
    sortedKeys := make([]string, 0)
    for k, _ := range m {
        sortedKeys = append(sortedKeys, k)
    }
    // sort 'string' key in increasing order
    sort.Strings(sorted_keys)
    for _, k := range sorted_keys {
        fmt.Printf("k=%v, v=%v\n", k, m[k])
    }                
}

// bad case
func main() {
     m := make(map[string]string)
     m["hello"] = "echo hello"
     m["world"] = "echo world"
     m["go"] = "echo go"
     m["is"] = "echo is"
     m["cool"] = "echo cool"

     for k, v := range m {
         fmt.Printf("k=%v, v=%v\n", k, v)
     }
}
```

#### map零值

- 对map取值时，「取到空值」和「没取到值」都会返回零值，如果不需要区分这两种情况，只需判断是否为零值即可，需要区分的时候再带上第二个ok

```go
// case 1
func main() {
     // mp非nil
     mp := make(map[string]int, 1)
     v, ok := mp["one"]      
     fmt.Println(v, ok)      //v为0，ok为false
     v = mp["one"]           
     fmt.Println(v)          //v为0
}

// case 2
func main() {
     // mp为nil
     var mp map[string]int
     v, ok := mp["one"]      
     fmt.Println(v, ok)      //v为0，ok为false
     v = mp["one"]           
     fmt.Println(v)          //v为0
}
```

#### map未分配内存

- Map变量如果只声明没有初始化分配内存，直接“赋值”会引发panic，`panic: assignment to entry in nil map`

```go
// good case
func main() {
     // 方式1: 定义
     mp := make(map[string]string)
     // 方式2: 声明 + 初始化
     var mp map[string]string
     mp = make(map[string]string)
     // write
     mp["a"] = "b"
}

// bad case
func main() {
     var mp map[string]string
     //panic
     mp["a"] = "b"
}
```

#### map删除key不会缩容

- map添加key会自动扩容，删除key不会自动缩容。**也就是在删除元素时，并不会释放内存，使得分配的总内存不断增加，很可能会导致 OOM。**
[runtime: shrink map as elements are deleted · Issue #20135 · golang/go](https://github.com/golang/go/issues/20135)
- 目前并没有特别好的解决方式，**可以通过创建一个新的 map 并从旧的 map 中复制元素 来解决。**

```go
newMap := make(map[int]int, len(oldMap))   //创建一个新的 map
for k, v := range oldMap {
    newMap[k] = v
}
oldMap = newMap  //map替换
```

### interface

#### 断言失败会panic

- Interface 类型断言，没有判断是否成功，如果断言失败会 panic
- 即使业务不关心断言是否成功，也建议使用 `_` 来忽略断言结果，保证不会 panic

```go
// good case
func main() {
     mp := make(map[string]interface{})
     mp["a"] = "1"
     mp["b"] = "b"
     v, _ := mp["a"].(int)
     if v == 1 {
        fmt.Println(true)
     }
}

// bad case
func main() {
     mp := make(map[string]interface{})
     mp["a"] = "1"
     mp["b"] = "b"
     if mp["a"].(int) == 1 {
        fmt.Println(true)
     }
}
// panic: interface conversion: interface {} is string, not int
```

### defer

#### defer 参数传递

- 如果希望后续对变量的修改可以在 defer 中生效，让 defer 引用这个外部变量，而不是作为参数传入。特别的，如果传入的参数是**指针**、 **slice**、**map**，对这些变量的修改会影响原有变量
- defer 推荐的用法是 defer + 匿名函数 + 变量引用 

在 defer 中使用匿名函数

```go
// good case 1
num := 0

// num 的修改会被 defer 感知
// 输出：num = 1
defer func() {
    fmt.Println("num =", num)
}()

num = 1
```

非指针变量，被外部引用

```go
// good case 2
num := 0

// num 的修改会被 defer 感知
// 输出：num = 1
defer func() {
    fmt.Println("num =", num)
}()

num = 1
```

指针变量，作为参数传递

```go
// good case 3
intMap := make(map[int]int)

// intMap 的修改会被 defer 感知
// intMap = {"1":1}
defer func(innerMap map[int]int) {
    byteArr, _ := json.Marshal(innerMap)
    fmt.Println("intMap =", string(byteArr))
}(intMap)

intMap[1] = 1
```

非指针变量，作为参数传递

```go
// bad case
num := 0

// num 的修改不会影响到 innerNum
// 输出：innerNum = 0
defer func(innerNum int) {
    fmt.Println("innerNum =", num)
}(num)

num = 1
```

#### recover 机制 

- `recover` 必须和 `panic` 在同一个goroutine中，必须在 `defer func` 中直接调用。
- `panic` 发生时，当前goroutine会立即中止，执行所有 `defer` 的函数，若 `defer` 函数中没有调用 `recover`，则进程退出。
- `recover` 只有在 `panic` 所在的栈中调用才会生效，且不能处理其他goroutine发生的 `panic`。

必须在defer函数中直接调用 recover() 才有效

```go
// good case
// case 1
go func() {
    defer func() {
        if r := recover(); r != nil {
            ...
        }
    }()
    panic(1)
}

// case 2
func Recover() {
    if err := recover(); err != nil {
        ...
    }
}

go func() {
    defer Recover()    //Recover() wrap了一层，展开和case 1是一样的
    panic(1)
}
```

recover直接调用时无效，recover不在defer中，panic后无法调用

```go
// bad case 1
go func() {
    recover()
    panic(1)
}
```

直接defer调用recover也是无效，recover的调用在defer时被展开，不会起作用

```go
// bad case 2
go func() {
    defer recover()
    panic(1)
}
```

defer调用时多层嵌套依然无效，recover在 `defer func` 中被间接调用，defer展开后，recover在 `go func` 的下一层栈上，若发生panic不会传导至recover

```go
// bad case 3
go func() {
    defer func() {
        func() { 
            recover() 
        }()
    }()
    panic(1)
}
```

`recover` 只有在 `panic` 所在的栈中调用才会生效，且不能处理其他goroutine发生的 `panic`。

- go func1 中执行 go func2，属于2个不同的 goroutine，栈是独立的。
- 所以 go func1 的 recover 并不能处理 go func2 发生的panic。


```go
// bad case 4
func main() {
     go func1()
     time.Sleep(5 * time.Second)
}

func func1() {
     defer func() {
         if r := recover(); r != nil {
              fmt.Println("f()")
              fmt.Println(r)
         }
     }()
     go func2()  
}

func func2() {
     panic(1)
}
```

### channel

#### for+select closed channel会无限循环

- `for + select closed channel` 会无限循环，select break 是不能跳出 for 循环的，只会 select 内的语句有效

```go
// good case
func main() {
     ch := make(chan int)
     go func() {
        ch <- 1
        close(ch)
     }()
     
     Loop:
         for {
             select {
                 case x := <-ch:
                    fmt.Println(x)
                 default:
                    break Loop//结合goto + label
             }
         }
}

// bad case
func main() {
     ch := make(chan int)
     go func() {
        ch <- 1
        close(ch)
     }()
     
     for {
         select {
             case x := <-ch:    //channel closed还是能接收到零值
                 ...
             default:
                 break         //无法跳出for循环，需要return或结合goto + label
         }
     }
}
// 程序无法退出，一直跑着 ...
```

### 原子操作

#### atomic.Value 误用

- `atomic.Value` 使用原则上存入的对象都应该是只读的  

```go
// bad case
var v atomic.Value 
func Test() {
    p := v.Load().(map[string]int)  //p 是 map 可能会进行并发读写，从而产生panic 
    value = p[x]  //map读
    ...
    p[x] = xxx    //map写
    v.Store(p) 
}
```

### 锁

- 使用锁的一些最佳实践
  - 不要嵌套加锁，运行时离开当前逻辑就释放锁，`defer` 保证锁在函数结束后能正确释放
  - 锁的粒度越小越好，加锁后尽快释放锁。如果锁的临界区太大，有太多非必要操作都进了临界区会大大影响程序性能。 特别是当程序处理比较重的 `I/O` 操作时比较费时，将整个 `I/O` 处理过程写在临界区会导致程序性能大大降低。所以在使用 `defer mu.Unlock()` 确保锁能正确释放的同时也要注意是否能手动管理锁的释放，降低临界区。
  - 调用多个需要读锁的函数时，在调用的上层函数中加锁和释放，不要在每个函数中加锁和释放。
- `sync/atomic` 提供了许多原子操作，使用无锁操作不触发调度、不阻塞执行流，执行效率大大提高。

#### 锁复制失效

- 由于Go的函数调用都是值传递，函数传递 `sync.Mutex` 或 `sync.RWMutex` 需要使用锁的指针，否则会因为值传递生成一个新的 `mutex`，原先的锁就失效了。
- 所以如果要使用同一个锁进行加锁可以使用传递指针的形式

```go
// good case
func Worker(m *sync.Mutex){
    m.Lock()
    defer m.Unlock()
    .... // do something
}

func main(){
    var mu sync.Mutex
    go Worker(&mu)
    go Worker(&mu)
    time.Sleep(time.Second)
}

// bad case
// mutex 对象作为参数，会由于传值而发生拷贝，所以会生成新的Mutex，导致无法正确的加锁
func Worker(m sync.Mutex){
    m.Lock()
    defer m.Unlock()
    .... // do something
}

func main(){
    var mu sync.Mutex
    go Worker(mu)
    go Worker(mu)
    time.Sleep(time.Second)
}
```

#### 重入导致死锁 

- `sync.Mutex` **同一个协程内** Lock 锁不可重入，会导致死锁。因为Go中的锁是不可重入锁（非递归锁），所以没法两次加锁。至于为什么Go不实现递归锁，可以看[相关讨论](https://stackoverflow.com/questions/14670979/recursive-locking-in-go#14671462)。
- `sync.RWMutex` 是Go提供的读写锁，可以加多个读锁或者一个写锁，常用于读次数远远多于写次数的场景。**同一个协程内** Lock 锁不可重入，会导致死锁，只有 RLock 可重入。

```go
// good case
// 通过改写释放锁在处理流程中的位置，就可以保证协程B在获取写锁时第一次读锁能够及时释放，这样当写锁释放后，第二次读锁就可以正常获取了。

func main() {
        var l = sync.RWMutex{}
        var wg sync.WaitGroup
        c := make(chan int)
        
        // 协程A
        wg.Add(1)
        go func() {
                // 第一次获取读锁
                l.RLock()
                c <- 1
                l.RUnlock()
                // 让协程B执行
                runtime.Gosched()
                // 第二次获取读锁
                l.RLock()
                wg.Done()
                l.RUnlock()
        }()
        
        // 协程B
        wg.Add(1)
        go func() {
                <-c
                l.Lock()
                defer l.Unlock()
                wg.Done()
        }()

        wg.Wait()
}

// bad case 1（死锁）
// 在协程A中首先获取读锁，然后写入chan，协程B从chan读取，获取写锁，由于之前有读锁未释放，所以协程B会等待，此时协程A中第二次获取读锁时，发现有写锁获取中，所以需要等待写锁释放后，才能获取成功（读锁获取的条件，可以参考RLock源码分析）。此时协程A等待协程B写锁释放，而协程B等待协程A第一次读锁释放，此时就形成了死锁。
// 常常第二次获取读锁可能被封装在另一个函数中被调用，容易被忽视，但是死锁的原理是一样的。

func main() {
        var l = sync.RWMutex{}
        var wg sync.WaitGroup
        c := make(chan int)
        
        // 协程A
        wg.Add(1)
        go func() {
                // 第一次获取读锁
                l.RLock()
                // 第一个defer
                defer l.RUnlock()
                c <- 1
                // 让协程B执行
                runtime.Gosched()
                // 第二次获取读锁
                l.RLock()
                // 第二个defer
                defer l.RUnlock()
                wg.Done()
        }()
        
        // 协程B
        wg.Add(1)
        go func() {
                <-c
                l.Lock()
                defer l.Unlock()
                wg.Done()
        }()

        wg.Wait()
}
// fatal error: all goroutines are asleep - deadlock!

// bad case 2
// sync.Mutex 同一个协程内 Lock 重入导致死锁
func main(){
    var m sync.Mutex
    
    m.Lock()
    defer m.Unlock()
    
    m.Lock()
    defer m.Unlock()
}
// fatal error: all goroutines are asleep - deadlock!

// bad case 3
// sync.RWMutex 同一个协程内 Lock 重入导致死锁
func main() {
    var m sync.RWMutex
    
    m.Lock()
    defer m.Unlock()
    
    m.Lock()
    defer m.Unlock()
}
// fatal error: all goroutines are asleep - deadlock!

// bad case 4
// sync.RWMutex 同一个协程内 Lock/RLock 重入导致死锁
func main() {
    var m sync.RWMutex
    
    m.Lock()
    defer m.Unlock()
    
    m.RLock()
    defer m.RUnlock()
}
// fatal error: all goroutines are asleep - deadlock!

// good case
// sync.RWMutex 同一个协程内 RLock 重入不会导致死锁
func main() {
    var m sync.RWMutex
    
    m.RLock()
    defer m.RUnlock()
    
    m.RLock()
    defer m.RUnlock()
}
```

死锁说明见下图：

![image](https://github.com/user-attachments/assets/57b75caa-b8cb-489b-ae96-6075dd4d6c6d)

#### copy结构体可能导致非预期的死锁

- copy 结构体时，如果结构体中有锁的话，记得重新初始化一个锁对象，否则会出现非预期的死锁

```go
type User struct {
     sync.Mutex
     name string
}

func main() {
     u1 := &User{name: "test"}
     u1.Lock()
     defer u1.Unlock()
     
     tmp := *u1
     u2 := &tmp
     u2.Mutex = sync.Mutex{}  // 如果没有这一行就会死锁，指向同一个锁，重入导致死锁
     u2.Lock()
     defer u2.Unlock()
 }
```

### 闭包

#### 引用同一个变量

- `for range` 时，v 是一个共享的可访问地址，在每次循环中会对当前元素创建一个副本，并令 v 指向这个副本
- `for` 循环变量直接被闭包使用，闭包会指向相同的值，会出现“脏读”现象，可以通过 **函数参数传递** 解决

```go
// good case
type Person struct {
    Name string
    Age  int
}

func main() {
    people := []Person{{Name: "Alice", Age: 20}, {Name: "Bob", Age: 25}, {Name: "Charlie", Age: 30}}

    for _, v := range people {
        // v 是当前元素的副本，修改 v 不会影响原切片中的元素
        v.Age += 1
        fmt.Println(v)
    }

    // 打印原切片，发现元素并没有被修改
    fmt.Println(people)
}
// Output:
//  {Alice 21}
//  {Bob 26}
//  {Charlie 31}
//  [{Alice 20} {Bob 25} {Charlie 30}]

// good case
func main() {
     var wg sync.WaitGroup
     for i := 0; i < 5; i++ {
         wg.Add(1)
         go func(x int) {
            // recover code ...
            defer wg.Done()
            fmt.Println(x)
         }(i)
     }
     wg.Wait()
}

// bad case
func main() {
     var wg sync.WaitGroup
     for i := 0; i < 5; i++ {
         wg.Add(1)
         go func() {
            // recover code ...
            defer wg.Done()
            time.Sleep(1)
            fmt.Println(i)   //引用同一个外部变量 i，每个协程输出的值都一样
         }()
     }
     wg.Wait()
}
```
