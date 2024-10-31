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

- client 初始化报 err，应该立刻 panic，而不是忽略错误继续业务逻辑

```go
package main

import (
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

func initDB() *gorm.DB {
    dsn := "user:password@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err!= nil {
        panic(err)
    }
    return db
}

func main() {
    db := initDB()
    // 这里可以使用 db 进行数据库操作
}
```

### 常用组件error判断

#### MySQL GORM 的 ErrRecordNotFound

- Gorm v2中，只有 First()、Last() 、Take() 三个方法可能返回这个错误https://gorm.io/docs/query.html#Retrieving-a-single-object

```go
func GetUser(name string) (*model.User, error)
     res, err := db.Where("name = ?", name).Find(&users)
     if err != nil && errors.Is(err, &gorm.ErrRecordNotFound) {
          // do something ...   
     }
     return res, nil
}
```

#### Redis redis.Nil 错误

```go
import "github.com/redis/go-redis/v9"

// ...
res, err := cmd.Result()
if err != nil && errors.Is(err, redis.Nil) {
     // do something ...    
}
// ...
```

### 所有协程都要defer处理panic

- 框架只对主进程中发生的 `panic` 兜底，如果是业务中拉取的协程，都要自行处理 `recover`，否则可能因为 `panic` 无兜底打挂整个服务

```go
// good case
func main(){
    go func(){
        defer func(){
            if err = recover(); err != nil{
                // 处理协程内的panic
            }
        }()
        foo() // 异步业务逻辑
    }
}

// bad case
func main(){
    go foo() 
}
```

## 高并发

### 加锁避免io相关操作

- 加锁内部代码块不应该IO操作，会有死锁风险

```go
// good case
s.lock.Lock()
if lastUpdateTime == 0 {
        s.data = syncData
        s.lastFullSyncTime = now
} else {
        s.incrSetCache(syncData, s.data)
}

if maxTime > s.lastUpdateTime {
        s.lastUpdateTime = maxTime
}
s.lock.Unlock()

// 独立打印日志减少写锁范围
if lastUpdateTime == 0 {
        log.Infof("full sync suc, syncData size=%d lastFullSyncTime=%v", count, now)
} else {
        log.Infof("incr sync suc, syncData size=%d originData size=%d count=%d lastUpdateTime=%v", len(syncData), len(s.data), count, lastUpdateTime)
}

// bad case
s.lock.Lock()
defer s.lock.Unlock()

if lastUpdateTime == 0 {
	// 写日式有io操作 或者 比如操作http、redis、db之类的
        log.Infof("full sync suc, syncData size=%d lastFullSyncTime=%v", count, now)
} else {
        log.Infof("incr sync suc, syncData size=%d originData size=%d count=%d lastUpdateTime=%v", len(syncData), len(s.data), count, lastUpdateTime)
}
```

### 锁的最佳实践

- 减少持有时间
- 优化锁的粒度
- 读写分离
- 使用原子操作

#### 减少持有时间

- 尽量减少锁的持有时间，毕竟使用锁是有代价的，通过减少锁的持有时间来减轻这个代价
- 不要在持有锁的时候做 IO 操作，尽量只通过持有锁来保护 IO 操作需要的资源而不是 IO 操作本身

```go
// good case
func doSomething() {
    ...
    m.Lock()     // 加锁
    ...          // 数据保护
    m.Unlock()   // 释放锁
    // 以下是有IO操作的代码
    http.Get()
}

// bad case
func doSomething() {
    ...
    m.Lock()    // 加锁
    ...
    http.Get()  // 各种耗时的 IO 操作
    m.Unlock()  // 释放锁
}
```

#### 善用 defer 

- 善用 defer 来确保在函数内正确释放了锁，通过 defer 可以确保不会遗漏释放锁操作，避免出现死锁问题，以及避免函数内非预期的 panic 导致死锁的问题。
- 不过使用 defer 的时候也要注意 `defer m.Unlock()` 可能会导致在持有锁的时候做了 IO 操作，出现了非预期的持有锁时间太长的问题。

```go
// good case
func doSomething() error {
    m.Lock()
    defer m.Unlock()

    err := ...
    if err != nil {
        return err
    }

    err = ...
    if err != nil {
        return err
    }

    ...
    return nil
}

// bad case
// 非预期的在持有锁期间做 IO 操作
func doSomething() {
    m.Lock()
    defer m.Unlock()
    
    item := ...
    http.Get()   // 各种耗时的 IO 操作
}
```

#### 优化锁的粒度

- 细化锁的粒度，通过细化锁的粒度来减少锁的持有时间以及避免在持有锁操作的时候做各种耗时的操作。
- 最常用的方式就是使用分段锁，通过空间换时间来优化锁的粒度提升性能。

![分段锁](https://github.com/user-attachments/assets/365e74e6-68c0-4f60-8873-89773d56a108)

```go
// good case
// 通过内部封装128个锁，只要并发不超过128，都不会存在锁的竞争
type SafeRander struct {
    pos     uint32
    randers [128]*rand.Rand
    locks   [128]*sync.Mutex
}

func (sr *SafeRander) Intn(n int) int {
    x := atomic.AddUint32(&sr.pos, 1)
    x %= 128
    sr.locks[x].Lock()
    n = sr.randers[x].Intn(n)
    sr.locks[x].Unlock()
    return n
}

// bad case
// globalRand 是全局持有一个锁，这样就会导致所有执行 rand 函数的地方会去竞争同一个锁，可能会导致性能降低，提升性能的方式是可以使用分段锁的方式
var globalRand = New(&lockedSource{
    src: NewSource(1).(Source64),
})

type lockedSource struct {
    lk sync.Mutex
    src Source64
}
```

#### 读写分离

- 当确定操作不会修改保护的资源时，可以使用 RWMutex 来减少锁等待时间，使用读写锁比单纯使用普通锁的性能更好，效率更高

```go
// good case
// 读操作用 RLock
func GetName() string {
    rw.RLock()
    defer rw.RUnlock()

    return name
}

// 写操作用 Lock
func SetName(s string) string {
    rw.Lock()
    defer rw.Unlock()

    name = s
}
```

#### 使用原子操作

- 相比读写锁，使用原子操作具有更高的性能，因为原子操作不会触发 Go 的调度，也不会阻塞执行流，可以使用 Golang 的 `sync/atomic` 包中的提供的方法

```go
// good case
type AtomicCounter struct {
    count int32
}

func (c *AtomicCounter) Count() {
    atomic.AddInt32(&c.count, 1)
}

func (c *AtomicCounter) Read() {
    _ = atomic.LoadInt32(&c.count)
}
```

### 简单并发库

#### 并发限制

- 并发限制优先使用此组件库 [gopool](https://github.com/bytedance/gopkg/blob/main/util/gopool/pool.go)
- 如果不考虑性能也可以采用开源库 [SizedWaitGroup](https://remy.io/blog/sized-wait-group/)

```go
// case 1
// https://github.com/bytedance/gopkg/blob/main/util/gopool/pool_test.go
func TestPool(t *testing.T) {
     p := NewPool("test", 100, NewConfig())
     var n int32
     var wg sync.WaitGroup
     for i := 0; i < 2000; i++ {
         wg.Add(1)
         p.Go(func() {
             defer wg.Done()
             atomic.AddInt32(&n, 1)
         })
     }
     wg.Wait()
     if n != 2000 {
        t.Error(n)
     }
}

// case 2
// https://remy.io/blog/sized-wait-group/
func main() {
     rand.Seed(time.Now().UnixNano())

     // Typical use-case:
     // 50 queries must be executed as quick as possible
     // but without overloading the database, so only
     // 8 routines should be started concurrently.
     swg := sizedwaitgroup.New(8)
     for i := 0; i < 50; i++ {
         swg.Add()
         go func() {
            defer swg.Done()
            query()
         }()
     } 
     swg.Wait()
}
```
