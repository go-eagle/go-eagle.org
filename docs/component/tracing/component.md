---
id: component
title: 组件
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/tracing/component
---


## 支持的组件

`Tracing` 的实施属于架构层面的事情，仅仅靠修改一两个组件是无法成效的，而是必须在统一开发框架前提下，需要一整套框架联动的事情。在 `Eagle` 开发框架层面，对接的是 `OpenTelemetry` 的 `Go API` 接口，由于 `OpenTelemetry` 的 `Go API` 只是标准协议的接口层，并无具体的业务逻辑实现，因此在没有实例化注入具体的 `TracerProvider` 的情况下，不会对执行性能造成影响。`Eagle` 大部分组件会自动检测是否开启 `Tracing`，没有开启 `Tracing` 特性的情况下组件什么都不会做。部分组件需要开发者手动注入 `Tracing` 拦截器来启用 `Tracing` 特性（如 `HTTP` 请求拦截器）。

### HTTP Client

启用 `Tracing` 功能后，`HTTP` 客户端会自动注入，用户无需关心具体细节

使用方式和原来保持不变

### HTTP Server

`HTTP` 服务端通过提供可选择的拦截器/中间件的形式注入和启用 `Tracing` 特性。

中间件方式，通过 `Use` 方法设置服务端中间件即可：
```go
  g := gin.New()
  g.Use(middleware.Tracing("eagle-service"))
```

### 日志

通过使用如下方式可以开启日志记录tracing 信息

```go
log.WithContext(ctx).Info("test log tracing")
```

### 数据库

目前主要使用 gorm v2版本，支持传入 `context`

```go
db.WithContext(ctx).First()
```

### Redis

使用 `go-redis` 组件，支持链路追踪， 举例

```go
rdb.Get(ctx, "test-key")
```

### 函数追踪

一般情况下，使用以上和网络相关的组件基本可以进行全链路追踪了，但是如果需要追踪某些函数的，就需要自定义了。

```go
// 定义 tracer
traceName := "func_tracer"
tracer := otel.GetTracerProvider().Tracer(traceName, trace.WithInstrumentationVersion(contrib.SemVersion()))

// 使用
funcName := "GetUserInfo"
ctx, span := tracer.Start(ctx, funcName)
defer span.End()
...
```

这里有点不太好的是，`funcName` 每次都需要手动填写，很不方便, 同时也没有提供调用者的文件名、行号等，所以后续会封装一个trace函数的公共方法到框架里，方便使用。
