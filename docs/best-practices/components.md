# 代码最佳实践汇总 - 组件篇

## 配置组件

## 日志组件

## MySQL

### gorm model定义

- gorm的model的字段的定义，尽量用 golang 原生的基本类型

### gorm方法换行

- gorm每个方法调用后换行，看着比较清晰

TODO: 补充demo

### SQL列表查询优先使用in关键字

用gorm编写query的查询条件，当某个查询条件是列表时，应当优先采用in关键字，而不是拼接多个or关键字

```go
// good case
// IN
db.Where("user_id in ?", []int64{123, 456}).Find(&users)
// SELECT * FROM users WHERE user_id IN (123, 456);
```

### dal/dao 层模糊查询写法 

- GORM 的查询并没有专门的模糊查询方法，需要自己传入的时候拼接%，形如 `%xx%`
- 使用 `"%" + str + "%"` 而不是 `fmt.Spinrtf("%%%s%%", str)`

```go
// good case
db.Where("username LIKE ?", "%" + str + "%").Find(&users)

// bad case
db.Where("username LIKE ?", fmt.Sprintf("%%%s%%", str)).Find(&users)
```

### gorm 读写分离

- 在RDS的使用中， `gorm v2` 支持读写分离，写入 `DB` 后立刻读取，大概率会出现读失败（同步延迟）。在读写分离场景下，对一致性敏感的场景，可以显示指定读的节点为主节点（master）
- `GORM V2` 提供了多数据库及读写分离等的支持，复杂配置请参考 https://gorm.io/docs/dbresolver.html

### gorm 事务

- 常见的事务设计在进入事务临界区后，只有commit或rollback才会释放事务锁。
- 在代码中如果对异常场景遗漏了rollback，可能会导致事务锁无法释放。gorm v2 推荐使用Transaction代替Begin/Rollback，通过 Begin, Commit, Rollback 来管理事务极易因为过早 return 等问题导致事务未正常处理。
- 在代码逻辑中未能正确commit，也会导致事务锁无法释放。
- 在数据库中，事务锁直到关闭数据库连接或连接超时时候才会把对应事务回滚， 而大量的无法释放的事务锁会导致数据库链接雪崩。

#### rollback必须要覆盖所有异常场景

```go
// good case

// bad case

```

### 安全优雅的执行复杂 SQL


## Cache

### 热key失效引起穿透

- 缓存失效时，回源数据要考虑下游保护（例如使用singleflight+多级缓存等），防御穿透的解决方法。
  - 多级缓存
  - 过期时间随机浮动
  - 使用redis分布式锁

> https://pkg.go.dev/golang.org/x/sync/singleflight

```go
// bad case
// 缓存穿透
func GetProduct(porductId int64) string{
    key := GenerateKey(porductId)
    item := ReadCache(key)
    if item == "" {
        // 缓存失效 查询DB或者rpc调用
        item = GetProductByID(porductId)
    }
    WriteCache(key, item)
    return item
}

// 方法中在读取缓存失效后，会触发数据回源，然后重新写缓存。这是符合我们通常认知的处理思路，但是在实际业务中，
// 尤其是key如果是热key，会在失效时，大量的请求穿透到下游的服务或者DB，有可能直接打垮下游服务。
// 如果调用RPC中逻辑复杂，甚至请求多处依赖的话，如果没有回源保护，可能导致雪崩。

// good case

```

## 分布式锁

- 使用Redis SetNX 获取分布式，使用 random.Int() 做为value，避免因为使用defer unlock 错误释放别人的锁

```go
// ------ good case ------
// 处理函数
func process() {
    val, err := Lock(ctx, uid)
    if err != nil {
        return fmt.Errorf("...")
    }
    defer UnLock(ctx, userId, val)
}

// 加锁
func Lock(ctx context.Context, uid int64) (int64, error) {
    key := fmt.Sprintf("lock:%d", uid)
    randVal = random.Int()
    lock, err := GetClient().SetNX(key, randVal, time.Second*3)
    if err != nil {
        return 0, err
    }
    if !lock {
        return 0, errors.New("failed to lock")
    }
    return randVal, nil
}

// 释放锁
func UnLock(ctx context.Context, uid, randVal int64) {
    key := fmt.Sprintf("lock:%d", uid)
    return GetClient().DelIfEqual(key, randVal)
}

// ------ bad case ------
// 未获得锁的情况下也会执行defer语法，会导致错误释放别人的锁，引发事故
// 处理函数
func process() {
    getLock := Lock(ctx, uid)
    defer UnLock(ctx, uid)
    if !getLock {
       return fmt.Errorf("...")
    }
}

// 加锁
func Lock(ctx context.Context, uid int64) {
    key := fmt.Sprintf("lock:%d", uid)
    return GetClient().SetNX(key, 1, time.Second*5)
}

// 释放锁
func UnLock(ctx context.Context, uid int64) {
    key := fmt.Sprintf("lock:%d", uid)
    return GetClient().Del(key)
}
```
