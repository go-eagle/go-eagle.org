---
id: overview
title: 概览
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - interceptor
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/interceptor/overview
---

## 什么是拦截器

gRPC的拦截器（interceptor）类似 HTTP 应用的中间件（Middleware），请求中间件大家都知道是利用装饰器模式对最终处理请求的handler程序进行装饰，这样中间件就可以在处理请求前和完成处理后这两个时机上，拦截到发送给 handler 的请求以及 handler 返回给客户端的响应 。

中间件的最大的用处是可以把一些 handler 的前置和后置操作从 handler 程序中解耦出来，比如最常见的记录响应时长、记录请求和响应数据日志等操作往往是通过中间件程序实现的。

与 HTTP 应用的中间件同理，可以对gRPC的请求和响应进行拦截处理，而且既可以在 **客户端进行拦截** ，也可以对**服务器端进行拦截**。利用拦截器，可以对gRPC进行很好的扩展，把一些业务逻辑外的冗余操作从 handler 中抽离，提升项目的开发效率和扩展性。  

## 使用拦截器

gRPC的服务器和客户端都是分别可以添加一个单向调用 (Unary) 的拦截器和流式调用 (Stream) 的拦截器。

> 这两种调用方式的区别可以理解为HTTP和WebSocket的区别

对于客户端的单向调用的拦截，只需定义一个 `UnaryClientInterceptor` 方法:  

```go
type UnaryClientInterceptor func(ctx context.Context, method string, req, reply interface{}, cc *ClientConn, invoker UnaryInvoker, opts ...CallOption) error
```

而客户端流式调用的拦截，则需要定义一个 StreamClientInterceptor 方法:

```go
type StreamClientInterceptor func(ctx context.Context, desc *StreamDesc, cc *ClientConn, method string, streamer Streamer, opts ...CallOption) (ClientStream, error)
```

同理，对于gRPC的服务端也有这两种调用的拦截器方法，分别是 `UnaryServerInterceptor` 和 `StreamServerInterceptor`：

```go
type UnaryServerInterceptor func(ctx context.Context, req interface{}, info *UnaryServerInfo, handler UnaryHandler) (resp interface{}, err error)

type StreamServerInterceptor func(srv interface{}, ss ServerStream, info *StreamServerInfo, handler StreamHandler) error
```

## 链式拦截器

与 HTTP 中间件不同的是，HTTP 中间件可以给每个 handler 程序应用多个中间件，gRPC官方也提供了链式操作，社区版也有提供.

> eagle 里使用的是官方版本

官方版：新版本的 gRPC 已经提供了内置的链式 Interceptor 实现

```go
// 客户端
import "google.golang.org/grpc"

// dialoptions.go
WithChainUnaryInterceptor(interceptors ...UnaryClientInterceptor) DialOption
WithStreamInterceptor(f StreamClientInterceptor) DialOption

// 服务端
import "google.golang.org/grpc"

// server.go
ChainUnaryInterceptor(interceptors ...UnaryServerInterceptor) ServerOption
StreamInterceptor(i StreamServerInterceptor) ServerOption
```

社区版：由 grpc-ecosystem 提供的 [链式功能](https://github.com/grpc-ecosystem/go-grpc-middleware/blob/master/chain.go)

```go
// 客户端
import (
  ...
  "google.golang.org/grpc"
  "github.com/grpc-ecosystem/go-grpc-middleware"
  ...
)

// chain.go
ChainUnaryClient(interceptors ...grpc.UnaryClientInterceptor) grpc.UnaryClientInterceptor
ChainStreamClient(interceptors ...grpc.StreamClientInterceptor) grpc.StreamClientInterceptor

// 服务端
import (
  "google.golang.org/grpc"
  "github.com/grpc-ecosystem/go-grpc-middleware"
)

// chain.go
ChainUnaryServer(interceptors ...grpc.UnaryServerInterceptor) grpc.UnaryServerInterceptor
ChainStreamServer(interceptors ...grpc.StreamServerInterceptor) grpc.StreamServerInterceptor
```

## 社区拦截器插件

利用拦截器，可以对gRPC进行扩展，利用社区的力量将gRPC发展壮大，也可以让开发者更灵活地处理gRPC流程中的业务逻辑。

下面列出了利用拦截器实现的一些功能框架：

- [Go gRPC Middleware](https://github.com/grpc-ecosystem/go-grpc-middleware):提供了拦截器的interceptor链式的功能，可以将多个拦截器组合成一个拦截器链，当然它还提供了其它的功能，所以以gRPC中间件命名。
- [grpc-multi-interceptor](https://github.com/kazegusuri/grpc-multi-interceptor): 是另一个interceptor链式功能的库，也可以将单向的或者流式的拦截器组合。
- [grpc_auth](https://github.com/grpc-ecosystem/go-grpc-middleware/blob/master/auth): 身份验证拦截器
- [grpc_ctxtags](https://github.com/grpc-ecosystem/go-grpc-middleware/blob/master/tags): 为上下文增加Tag map对象
- [grpc_zap](https://github.com/grpc-ecosystem/go-grpc-middleware/blob/master/logging/zap): 支持zap日志框架
- [grpc_logrus](https://github.com/grpc-ecosystem/go-grpc-middleware/blob/master/logging/logrus): 支持logrus日志框架
- [grpc_prometheus](https://github.com/grpc-ecosystem/go-grpc-prometheus): 支持 prometheus
- [otgrpc](https://github.com/grpc-ecosystem/grpc-opentracing/tree/master/go/otgrpc): 支持opentracing/zipkin
- [grpc_opentracing](https://github.com/grpc-ecosystem/go-grpc-middleware/blob/master/tracing/opentracing):支持opentracing/zipkin
- [grpc_retry](https://github.com/grpc-ecosystem/go-grpc-middleware/blob/master/retry): 为客户端增加重试的功能
- [grpc_validator](https://github.com/grpc-ecosystem/go-grpc-middleware/blob/master/validator): 为服务器端增加校验的功能

## Rererence

- https://github.com/grpc-ecosystem/go-grpc-middleware
- https://github.com/kevinyan815/gocookbook/issues/60
- https://pandaychen.github.io/2019/11/20/GRPC-INTERCEPTOR-APPLY/
