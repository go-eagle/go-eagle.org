---
id: overview
title: 概览
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/transport/overview
---

 eagle 框架对传输层进行了抽象，用户可以通过实现接口来接入实现，框架默认实现了HTTP和gRPC两种通信协议传输层。用户在实现通讯协议传输层时可以参考一下官方实现的代码。

- [http](https://github.com/go-eagle/eagle/tree/master/pkg/transport/http)
- [grpc](https://github.com/go-eagle/eagle/tree/master/pkg/transport/grpc)


### 接口抽象

#### `server`

```go
// 服务的启动和停止，用于管理服务生命周期。
type Server interface {
	Start(context.Context) error
	Stop(context.Context) error
}
```

#### `Transporter`

```go
type Transporter interface {
	// 代表实现的通讯协议的种类，如内置的 http grpc，也可以实现其他的类型如 mqtt，websocket
	Kind() Kind
	// 提供的服务终端地址
	Endpoint() string
	// 用于标识服务的完整方法路径
	// 示例: /helloworld.Greeter/SayHello
	Operation() string
 	// http 的请求头或者 grpc 的元数据
	Header() Header
}
```

#### `Endpointer`

```go
type Endpointer interface {
	// 用于实现注册到注册中心的终端地址，如果不实现这个方法则不会注册到注册中心
	Endpoint() (*url.URL, error)
}
```

### 使用方式

使用方式将 http 或 grpc 注册到 server 中

```go
app := eagle.New(
	eagle.Name(Name),
	eagle.Server(
		httpSrv,
	),
)
```
