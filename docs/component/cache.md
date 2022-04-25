---
id: cache
title: 缓存组件
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/cache
---

## 概要

缓存组件组要包括本地缓存和分布式缓存，两个组件都实现以下接口

```go
type Cache interface {
  Set(ctx context.Context, key string, val interface{}, expiration time.Duration) error
  Get(ctx context.Context, key string, val interface{}) error
  MultiSet(ctx context.Context, valMap map[string]interface{}, expiration time.Duration) error
  MultiGet(ctx context.Context, keys []string, valueMap interface{}) error
  Del(ctx context.Context, keys ...string) error
  SetCacheWithNotFound(ctx context.Context, key string) error
}
```

## 本地缓存使用

内部主要使用 `ristretto`

### 初始化

```go
func NewMemoryCache(keyPrefix string, encoding encoding.Encoding) Cache {
  config := &ristretto.Config{
    NumCounters: 1e7,     // number of keys to track frequency of (10M).
    MaxCost:     1 << 30, // maximum cost of cache (1GB).
    BufferItems: 64,      // number of keys per Get buffer.
  }
  store, _ := ristretto.NewCache(config)
  return &memoryCache{
    client:    store,
    KeyPrefix: keyPrefix,
    encoding:  encoding,
  }
}
```

### Example

```go
  store := NewMemoryCache("memory-unit-test", encoding.JSONEncoding{})
  ctx := context.Background()
  var gotVal string
  store.Set(ctx, "test-get-key", "test", 3600)
  store.Get(ctx, "test-get-key", &gotVal)
```

## 分布式缓存使用

内部主要使用 redis

### 初始化

```go
func NewRedisCache(client *redis.Client, keyPrefix string, encoding encoding.Encoding, newObject func() interface{}) Cache {
  return &redisCache{
    client:    client,
    KeyPrefix: keyPrefix,
    encoding:  encoding,
    newObject: newObject,
  }
}
```

### Example

```go
  ...
  // 获取redis客户端
  redisClient := redis.GetRedisClient()
  // 实例化redis cache
  // 指定编码格式为 json
  cache := NewRedisCache(redisClient, "test-key", encoding.JSONEncoding{}, func() interface{} {
    return new(int64)
  })
  ...
```

## 如何在业务中使用

可以参考以下案例，代码使用工具生成

```bash
# 生成命令
eagle cache add UserCache
```

```go
package cache

//go:generate mockgen -source=user_cache.go -destination=../../internal/mock/user_cache_mock.go  -package mock

import (
  "context"
  "fmt"
  "time"

  "github.com/spf13/cast"

  "github.com/go-eagle/eagle/pkg/cache"
  "github.com/go-eagle/eagle/pkg/encoding"
  "github.com/go-eagle/eagle/pkg/log"
  "github.com/go-redis/redis/v8"

  "github.com/go-microservice/user-service/internal/model"
)

const (
  // PrefixUserCacheKey cache prefix
  PrefixUserCacheKey = "user:%d"
)

type UserCache interface {
  SetUserCache(ctx context.Context, id int64, data *model.UserModel, duration time.Duration) error
  GetUserCache(ctx context.Context, id int64) (ret *model.UserModel, err error)
  MultiGetUserCache(ctx context.Context, ids []int64) (map[string]*model.UserModel, error)
  MultiSetUserCache(ctx context.Context, data []*model.UserModel, duration time.Duration) error
  DelUserCache(ctx context.Context, id int64) error
  SetCacheWithNotFound(ctx context.Context, id int64) error
}

// userCache define a cache struct
type userCache struct {
  cache cache.Cache
}

// NewUserCache new a cache
func NewUserCache(rdb *redis.Client) UserCache {
  jsonEncoding := encoding.JSONEncoding{}
  cachePrefix := ""
  return &userCache{
    cache: cache.NewRedisCache(rdb, cachePrefix, jsonEncoding, func() interface{} {
      return &model.UserModel{}
    }),
  }
}

// GetUserCacheKey get cache key
func (c *userCache) GetUserCacheKey(id int64) string {
  return fmt.Sprintf(PrefixUserCacheKey, id)
}

// SetUserCache write to cache
func (c *userCache) SetUserCache(ctx context.Context, id int64, data *model.UserModel, duration time.Duration) error {
  if data == nil || id == 0 {
    return nil
  }
  cacheKey := c.GetUserCacheKey(id)
  err := c.cache.Set(ctx, cacheKey, data, duration)
  if err != nil {
    return err
  }
  return nil
}

// GetUserCache 获取cache
func (c *userCache) GetUserCache(ctx context.Context, id int64) (ret *model.UserModel, err error) {
  var data *model.UserModel
  cacheKey := c.GetUserCacheKey(id)
  err = c.cache.Get(ctx, cacheKey, &data)
  if err != nil {
    log.WithContext(ctx).Warnf("get err from redis, err: %+v", err)
    return nil, err
  }
  return data, nil
  }

// MultiGetUserCache 批量获取cache
func (c *userCache) MultiGetUserCache(ctx context.Context, ids []int64) (map[string]*model.UserModel, error) {
  var keys []string
  for _, v := range ids {
    cacheKey := c.GetUserCacheKey(v)
    keys = append(keys, cacheKey)
  }

// NOTE: 需要在这里make实例化，如果在返回参数里直接定义会报 nil map
itemMap := make(map[string]*model.UserModel)
  err := c.cache.MultiGet(ctx, keys, itemMap)
  if err != nil {
    return nil, err
  }

  retMap := make(map[string]*model.UserModel)
  for _, v := range ids {
    val, ok := itemMap[c.GetUserCacheKey(v)]
    if ok {
      retMap[cast.ToString(v)] = val
    }
  }
  return retMap, nil
}

// MultiSetUserCache 批量设置cache
func (c *userCache) MultiSetUserCache(ctx context.Context, data []*model.UserModel, duration time.Duration) error {
  valMap := make(map[string]interface{})
  for _, v := range data {
    cacheKey := c.GetUserCacheKey(v.ID)
    valMap[cacheKey] = v
  }

  err := c.cache.MultiSet(ctx, valMap, duration)
  if err != nil {
    return err
  }
  return nil
}

// DelUserCache 删除cache
func (c *userCache) DelUserCache(ctx context.Context, id int64) error {
  cacheKey := c.GetUserCacheKey(id)
  err := c.cache.Del(ctx, cacheKey)
  if err != nil {
    return err
  }
  return nil
}

// DelUserCache set empty cache
func (c *userCache) SetCacheWithNotFound(ctx context.Context, id int64) error {
  cacheKey := c.GetUserCacheKey(id)
  err := c.cache.SetCacheWithNotFound(ctx, cacheKey)
  if err != nil {
    return err
  }
  return nil
}

```

> 来源： https://github.com/go-microservice/user-service/blob/main/internal/cache/user_cache.go

## Reference

- https://dgraph.io/blog/post/introducing-ristretto-high-perf-go-cache/
- https://www.start.io/blog/we-chose-ristretto-cache-for-go-heres-why/

