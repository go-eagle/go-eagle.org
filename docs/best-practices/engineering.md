# 代码最佳实践 - 工程篇

## 项目结构

```bash
// todo
```

## 配置文件

- 跟环境相关的配置，都使用 `yaml` 配置文件的方式，而不是采用 `constants` 常量方式，就不需要在代码层面加上各种环境判断
- 本地配置文件结构体定义在 `config` 目录下，配置文件分环境放到对应的目录里

```bash
// config
├── dev
│   ├── app.yaml
│   ├── database.yaml
│   ├── logger.yaml
│   ├── redis.yaml
│   └── trace.yaml
├── test
├── prod
├── config.go // 自定义内容可以放这里
└── docker
```

## 日志打印

### 日志规范

- 打日志是为了方便排查问题，要保证关键信息和上下文不会缺失。分层调用的情况下，例如 `dal` 层如果不打印日志，应该 `warp` 下 `error` 保证上层调用有足够多的上下文
- 减少 `info` 日志量，避免打印太多无效日志，导致日志信息噪音过多，价值降低。推荐使用 `Info` 日志打印请求关键信息，方便排查问题
- 推荐日志格式为 `{[prefix]} {body ...}, {err: %v}` 三段式
  - prefix: 用当前函数名
  - body: 日志信息，用空格隔开单词（尽量使用驼峰）
  - err: 具体的error信息

```go
// good case
func Test(ctx context.Context, uid int64) {
     // do something ...
     log.WithContext(ctx).Errorf("[Test] call ... err: %v, uid: %d", err, uid)
     // do something ...
}

// bad case
func Test(ctx context.Context, info *model.UserInfo) {
     // do something ...
     log.WithContext(ctx).Errorf("err: %v", err)
     // do something ...
}
```

### 结构体打印

- 日志打印结构体建议 `json marshal` 后使用 `%s` 而非 `%v` 或 `%+v`，推荐使用 `utils.Stringify`
- 如果结构体太大不建议打印，日志打结构体慎用，如果大量结构体过大容易引发瞬间的 `OOM`

```go
// good case
import "github.com/go-eagle/eagle/pkg/utils"

log.WithContext(ctx).Errorf("... %s", utils.Stringify(x))

// bad case
log.WithContext(ctx).Errorf("... %v", x)
log.WithContext(ctx).Errorf("... %+v", x)
```


## 错误处理

### error 返回

- 返回 error 使用 `fmt.Errof` %w wrap 而非 `errors.New`，在上层可以使用 `errors.Is` 或 `errors.As` 判断特定错误 [https://goplay.tools/snippet/LLUomMgFlAx](https://goplay.tools/snippet/LLUomMgFlAx)
- 调用函数返回 error 但是又不需要 return 的行为，建议收敛到函数内部，或者加上注释避免更好理解

```go
// good case
// error wrap
func Test(ctx context.Context, uid int64) error {
     // do something ...
     if err := CallFunc(ctx, uid); err != nil {
         return fmt.Errorf("[Test] call CallFunc err: %w, uid: %d", err, uid)
     }
     // do something ...
     return nil
}

// 调用函数返回error，不需要return
func Test(ctx context.Context, uid int64) error {
     // do something ...
     if err := CallFunc(ctx, uid); err != nil {
         // 这里需要加上注释，为什么不需要return，reviewer更好理解
         log.Errorf("[Test] call CallFunc err: %v, uid: %d", err, uid)
     }
     // do something ...
     return nil
}
```

### error 判断

- 通过 `errors.Is` 判断 error 判断是否是底层的某个错误，而不是使用 `err.Error() == "xxxx"` 字符串的方式来判断
- 需要通过 `fmt.Errorf` 对进行 warp，才可以判断是否为嵌套 error

```go
// good case
type MyError struct {
     Msg string
}

func (e *MyError) Error() string {
     return e.Msg
}

func main() {
     myErr := &MyError{Msg: "myErr"}
     warpErr := fmt.Errorf("warp err:%w", myErr)
     if errors.Is(warpErr, myErr) {
         // do something ...
     }
}

// bad case
type MyError struct {
     Msg string
}

func (e *MyError) Error() string {
     return e.Msg
}

func main() {
     myErr := &MyError{Msg: "myErr"}
     warpErr := fmt.Errorf("warp err:%w", myErr)
     if warpErr.Error() == "xxx" {
         // do something ...
     }
}
```

### panic 排查

遇到任何 panic，都请按以下 4 步原则来排查
- panic 的原因
- 栈从哪开始看
- 报错的方法是什么
- 报错具体代码位置在哪

```go
2024/10/31 15:14:44 http: panic serving [::1]:57144: runtime error: index out of range [1] with length 1 // 1. 报错的原因
goroutine 56 [running]:
net/http.(*conn).serve.func1()
	/usr/local/go/src/net/http/server.go:1903 +0xb0
panic({0x103a7cd20?, 0x1400021e678?})
	/usr/local/go/src/runtime/panic.go:770 +0x124 // 2. 栈的开始
demo-http/internal/handler.Hello(0x14000226900) // 3. 报错的方法
	/Users/eagle/Codes/eagle-test/internal/handler/hello.go:28 +0x104 // 4. 报错具体的文件名和代码行号
```

### client 初始化报错处理
