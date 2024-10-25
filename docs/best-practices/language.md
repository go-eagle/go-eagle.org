# 【语言篇】代码最佳实践

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
