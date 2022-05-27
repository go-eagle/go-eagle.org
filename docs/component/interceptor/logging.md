---
id: logging
title: 日志拦截器
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - gRPC interceptor
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/interceptor/logging
---

主要是使用了 `grpc-ecosystem` 提供的日志中间件, 如果需要开启打印日志，可以加入参数来控制。

## 服务端使用

通过传入 `EnableLog()` 参数来开启日志

```go
// internal/server/grpc.go
  ...
  grpcServer := grpc.NewServer(
		grpc.Network("tcp"),
		grpc.Address(cfg.Addr),
		grpc.Timeout(cfg.ReadTimeout),
    // 启用日志
		grpc.EnableLog(),
	)
  ...
```

## 客户端使用

通过传入 `WithLog()` 参数来开启日志

```go
// internal/repository/repository.go
  ...
  conn, err := grpc.DialInsecure(
      ctx,
      grpc.WithEndpoint("localhost:9000"),
      grpc.WithLog(),
	)
  ...
```

> 以上以实际项目地址为准备