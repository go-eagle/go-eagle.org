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

## 组件初始化

在 `main` 函数中新增trace初始化代码，在配置文件中写入`jaeger`相关地址, 具体如下：

配置文件

```yaml
# config/trace.yaml
# 服务名
ServiceName: "user-svc"
# agent地址，注意：没有http
LocalAgentHostPort: "{JAEGER_ADDR}:6831"
# collector地址
CollectorEndpoint: "http://{JAEGER_ADDR}:14268/api/traces"
```

入口文件 `main.go`

```go
package main

import (
  ...
  "github.com/go-eagle/eagle/pkg/config"
  "github.com/go-eagle/eagle/pkg/trace"
  ...
)
func main() {
  ...
  // 初始化以后会生成一个全局的tracer, 供其他组件来调用
  var traceCfg trace.Config
  err := config.Load("trace", &traceCfg)
  _, err = trace.InitTracerProvider(traceCfg.ServiceName, traceCfg.CollectorEndpoint)
  if err != nil {
    panic(err)
  }
  ...
}
    
```

> 如果想关闭 trace, 可以在 `app.yaml` 里将 `EnableTrace` 改为 `false` 即可。

## 支持的组件

`Tracing` 的实施属于架构层面的事情，仅仅靠修改一两个组件是无法成效的，而是必须在统一开发框架前提下，需要一整套框架联动的事情。在 `Eagle` 开发框架层面，对接的是 `OpenTelemetry` 的 `Go API` 接口，由于 `OpenTelemetry` 的 `Go API` 只是标准协议的接口层，并无具体的业务逻辑实现，因此在没有实例化注入具体的 `TracerProvider` 的情况下，不会对执行性能造成影响。`Eagle` 大部分组件会自动检测是否开启 `Tracing`，没有开启 `Tracing` 特性的情况下组件什么都不会做。部分组件需要开发者手动注入 `Tracing` 拦截器来启用 `Tracing` 特性（如 `HTTP` 请求拦截器）。

### HTTP Client

启用 `Tracing` 功能后，`HTTP` 客户端会自动注入，用户无需关心具体细节。

使用方式如下：

```go
# github.com/go-eagle/eagl/pkg/client/httpclient/client.go

  ret, err := GetJSON(context.Background(), "http://httpbin.org/get")
  if err != nil {
    // handle error
  }
```

如果请求的过程中有发生报错，httpclient 会自动将该请求标记为错误的状态，在 jaeger的 ui中会显示出来，如下：

```gos
  trace.SetSpanError(ctx, err)
```

### HTTP Server

`HTTP` 服务端通过提供可选择的拦截器/中间件的形式注入和启用 `Tracing` 特性。

中间件方式，通过 `Use` 方法设置服务端中间件即可：

```go
  g := gin.New()
  g.Use(middleware.Tracing("user-svc"))
  ...
```

### 日志

通过使用如下方式可以开启日志记录tracing 信息

```go
log.WithContext(ctx).Info("test log tracing")
```

> 通过 `WithContext` 会将 `trace_id` 和 `span_id` 记录到日志中，方便和链路追踪系统一起定位问题。

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

一般情况下，使用以上和网络相关的组件基本可以进行全链路追踪了，但是如果需要追踪某些函数的，可以使用以下方式。

```go
import (
  ...
  "github.com/go-eagle/eagle/pkg/trace/plugins/function"
  ...
)

// 如果函数参数是 *gin.Context 使用以下方式
func a(ctx *gin.Context) {
  c, span := function.StartFromContext(ctx.Request.Context())
  defer span.End()

  ...
}

// 如果函数参数是 context.Context 使用以下方式
func a(ctx context.Context) {
  c, span := function.StartFromContext(ctx)
  defer span.End()

  ...
}
```

## 追踪一个接口的步骤

主要包含以下步骤

- 1、修改配置文件 `config/trace.yaml`
- 2、初始化trace
- 3、开启trace中间件
- 4、handler方法中开启函数trace
- 5、在service中开启函数trace
- 6、在数据库和redis中开启trace(可选)

> 如果想追踪任务函数，只要在函数的开始处增加函数追踪代码即可。

## 示例配置及效果展示

所有的耗时及具体的执行情况都可以通过jaeger来查看。

### 接口请求预览

![api-trace-overview](/images/api-trace-overview.png)

![api-trace-overview](/images/api-trace-http.png)

所有调用的服务一目了然。每个服务内的调用情况也可以根据span数来初步确定。

### 接口请求调用详情

![api-trace-detail](/images/api-trace-detail.png)

可以清晰的看到，调用的是哪个接口，调用的哪个方法，调用了哪些服务，每个服务里方法里调用的数据库和redis的情况。

### 函数调用详情

![api-trace-func](/images/api-trace-func.png)

可以看到函数调用的具体位置，文件及行号。

### 数据库调用详情

![api-trace-gorm](/images/api-trace-grom.png)

可以看到SQL执行的具体内容及耗时。

### redis调用详情

![api-trace-redis](/images/api-trace-redis.png)

可以看到Redis执行的具体内容及耗时。

### 标记为错误状态

```go
  trace.SetSpanError(ctx, err)
```

使用后，效果如下

// TODO: 