---
id: distributed-lock
title: 分布式锁
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/distributed-lock
---


## 接口定义
为了方便适配不同的分布式锁接入，这里定义了几个必要的接口

```go
type Lock interface {
	Lock (ctx context.Context) (bool, error)
	Unlock(ctx context.Context) error
}
```

## Redis实现方式

目前默认支持redis实现的分布式锁，为了防止出现死锁的情况，加入了超时参数， `Unlock` 时使用Lua脚本实现了原子性操作。

### 使用方式

```go
// github.com/go-eagle/eagle/pkg/lock/redis.go

// 实例化锁
// 不带超时时间，默认2s
lock := NewLock(redis.RedisClient, "test:lock")
// 自定义超时时间
lock := NewLock(redis.RedisClient, "test:lock", WithTimeout(3*time.Second))

// 加锁
ok, err := lock.Lock(context.Background())
if err != nil {
    // 处理错误
}

// 释放锁
err = lock.Unlock(context.Background())
if err != nil {
    // 处理错误
}
```

## Etcd实现方式

### 使用方式

