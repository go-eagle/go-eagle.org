---
id: http
title: HTTP
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/transport/http
---

`transporter/http` 中基于 [gin](https://github.com/gin-gonic/gin) HTTP路由框架实现了 `Transporter`，用以注册 http 到 `eagle.Server()` 中。

## Server

### 配置

#### `WithAddress(addr string) ServerOption`

配置服务端监听的地址

#### `WithTimeout(timeout time.Duration) ServerOption`

配置服务端的超时设置

### 启动 Server

#### `NewServer(opts ...ServerOption) *Server`

传入opts配置并启动HTTP Server

```go
hs := http.NewServer()
app := eagle.New(
  eagle.Name("eagle"),
  eagle.Version("v1.0.0"),
  eagle.Server(hs),
)
```

#### HTTP server 中使用 eagle middleware

基本是按照gin的使用方式，在路由中直接Use，gin支持的插件这里都支持。

```go
...
serviceName := "eagle"
func NewRouter() *gin.Engine {
	g := gin.New()
	// 使用中间件
	g.Use(gin.Recovery())
	g.Use(middleware.RequestID())
	g.Use(middleware.Metrics(serviceName))
	g.Use(middleware.Tracing(serviceName))
	g.Use(mw.Translations())
  ...
}
```
