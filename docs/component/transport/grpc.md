---
id: grpc
title: gRPC
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/transport/grpc
---

`transporter/grpc` 中基于谷歌的 [grpc](https://www.grpc.io/) 框架实现了 `Transporter`，用以注册 grpc 到 `eagle.Server()` 中。

## Server

### 配置

#### `Network(network string) ServerOption`

配置服务端的 network 协议，如 tcp

#### `Address(addr string) ServerOption`

配置服务端监听的地址

#### `Timeout(timeout time.Duration) ServerOption`

配置服务端的超时设置

#### `EnableTracing() ServerOption`

启用服务端的链路追踪

#### `EnableLog() ServerOption`

启用服务端的日志

#### `UnaryInterceptor(in ...grpc.UnaryServerInterceptor) ServerOption`

配置服务端使用的 grpc 单元拦截器

#### `Options(opts ...grpc.ServerOption) ServerOption`

配置一些额外的 grpc.ServerOption

### 主要的实现细节

#### `NewServer()`
```go
func NewServer(opts ...ServerOption) *Server {
	srv := &Server{
		network: "tcp",
		address: ":0",
		timeout: 1 * time.Second,
		health:  health.NewServer(),
	}
	for _, o := range opts {
		o(srv)
	}
	// Unary
	chainUnaryInterceptors := []grpc.UnaryServerInterceptor{
		unaryServerInterceptor(srv),
		grpcPrometheus.UnaryServerInterceptor,
		grpcRecovery.UnaryServerInterceptor(),
	}
	if len(srv.inters) > 0 {
		chainUnaryInterceptors = append(chainUnaryInterceptors, srv.inters...)
	}

	// stream
	chainStreamInterceptors := []grpc.StreamServerInterceptor{
		grpcPrometheus.StreamServerInterceptor,
		grpcRecovery.StreamServerInterceptor(),
	}

	// enable tracing
	if srv.enableTracing {
		chainUnaryInterceptors = append(chainUnaryInterceptors, otelgrpc.UnaryServerInterceptor(srv.TracerOptions...))
		chainStreamInterceptors = append(chainStreamInterceptors, otelgrpc.StreamServerInterceptor(srv.TracerOptions...))
	}

	// enable log
	if srv.enableLog {
		chainUnaryInterceptors = append(chainUnaryInterceptors, grpcZap.UnaryServerInterceptor(logger.GetZapLogger()))
		chainStreamInterceptors = append(chainStreamInterceptors, grpcZap.StreamServerInterceptor(logger.GetZapLogger()))
	}

	grpcOpts := []grpc.ServerOption{
		grpc.ChainUnaryInterceptor(chainUnaryInterceptors...),
		grpc.ChainStreamInterceptor(chainStreamInterceptors...),
	}
	if len(srv.grpcOpts) > 0 {
		grpcOpts = append(grpcOpts, srv.grpcOpts...)
	}

	grpcServer := grpc.NewServer(grpcOpts...)

	// health check
	healthPb.RegisterHealthServer(grpcServer, srv.health)

	// register reflection and the interface can be debugged through the grpcurl tool
	reflection.Register(grpcServer)

	// set zero values for metrics registered for this grpc server
	grpcPrometheus.Register(grpcServer)

	srv.Server = grpcServer

	return srv
}
}
```

### 使用方式

简单列举了一些 eagle 中 grpc 的用法，其他 grpc 用法可以到 grpc 仓库中查看。

#### 注册 grpc server
```go
gs := grpc.NewServer()
app := eagle.New(
	eagle.Name("eagle"),
	eagle.Version("v1.0.0"),
	eagle.Server(gs),
)
```


## Client

### 配置

#### `WithEndpoint(endpoint string) ClientOption` 

配置客户端使用的对端连接地址，如果不使用服务发现则为ip:port,如果使用服务发现则格式为discovery://\<authority\>/\<serviceName\>

#### `WithTimeout(timeout time.Duration) ClientOption`

配置客户端的请求默认超时时间，如果有链路超时优先使用链路超时时间

#### `WithMetric() ClientOption`

启用监控指标

#### `WithLog() ClientOption`

启用日志

#### `WithTracing() ClientOption`

启用链路追踪

#### `WithKeepalive() ClientOption`

启用长连接

#### `WithGzip() ClientOption`

启用日志压缩

#### `WithoutRetry() ClientOption`

启用重试功能

#### `WithDiscovery(d registry.Discovery) ClientOption`

配置客户端服务发现

#### `WithUnaryInterceptor(in ...grpc.UnaryClientInterceptor) ClientOption`

配置客户端使用的 grpc 原生拦截器

#### `WithOptions(opts ...grpc.DialOption) ClientOption`

配置一些额外的 grpc.ClientOption

### 主要的实现细节

#### `dial()`

```go
func dial(ctx context.Context, insecure bool, opts ...ClientOption) (*grpc.ClientConn, error) {
	// default client options
	options := clientOptions{
		timeout:         2000 * time.Millisecond,
		balancerName:    roundrobin.Name,
		enableGzip:      true,
		enableMetric:    true,
		disableRetry:    false,
		NumRetries:      2,
		enableKeepalive: true,
		kp: keepalive.ClientParameters{
			Time:                10 * time.Second,
			Timeout:             time.Second,
			PermitWithoutStream: false,
		},
	}
	for _, opt := range opts {
		opt(&options)
	}

	// merge inters
	inters := []grpc.UnaryClientInterceptor{
		unaryClientInterceptor(),
	}
	if len(options.inters) > 0 {
		inters = append(inters, options.inters...)
	}

	// default dial option
	dialOpts := []grpc.DialOption{
		grpc.WithDefaultServiceConfig(fmt.Sprintf(`{"loadBalancingPolicy": "%s"}`, options.balancerName)),
		grpc.WithChainUnaryInterceptor(inters...),
	}
	if len(options.dialOpts) > 0 {
		dialOpts = append(dialOpts, options.dialOpts...)
	}
	// service discovery
	if options.discovery != nil {
		dialOpts = append(dialOpts, grpc.WithResolvers(discovery.NewBuilder(
			options.discovery, discovery.WithInsecure(insecure))))
	}
	if insecure {
		dialOpts = append(dialOpts, grpc.WithTransportCredentials(grpcInsecure.NewCredentials()))
	} else {
		tlsConfig := &tls.Config{
			InsecureSkipVerify: true,
		}
		cred := credentials.NewTLS(tlsConfig)
		dialOpts = append(dialOpts, grpc.WithTransportCredentials(cred))
	}
	if options.enableKeepalive {
		kp := keepalive.ClientParameters{
			Time:                options.kp.Time,
			Timeout:             options.kp.Timeout,
			PermitWithoutStream: options.kp.PermitWithoutStream,
		}
		dialOpts = append(dialOpts, grpc.WithKeepaliveParams(kp))
	}
	if options.enableGzip {
		dialOpts = append(dialOpts, grpc.WithDefaultCallOptions(grpc.UseCompressor(gzip.Name)))
	}
	if options.enableMetric {
		dialOpts = append(dialOpts,
			grpc.WithChainUnaryInterceptor(grpcPrometheus.UnaryClientInterceptor),
			grpc.WithChainStreamInterceptor(grpcPrometheus.StreamClientInterceptor),
		)
	}
	// enable tracing
	if options.enableTracing {
		dialOpts = append(dialOpts,
			grpc.WithChainUnaryInterceptor(otelgrpc.UnaryClientInterceptor()),
			grpc.WithChainStreamInterceptor(otelgrpc.StreamClientInterceptor()),
		)
	}
	if options.enableLog {
		dialOpts = append(dialOpts,
			grpc.WithChainUnaryInterceptor(grpcZap.UnaryClientInterceptor(logger.GetZapLogger())),
			grpc.WithChainStreamInterceptor(grpcZap.StreamClientInterceptor(logger.GetZapLogger())),
		)
	}
	if !options.disableRetry {
		dialOpts = append(dialOpts,
			grpc.WithDefaultServiceConfig(getRetryPolicy(options.balancerName, options.NumRetries)),
		)
	}

	return grpc.DialContext(ctx, options.endpoint, dialOpts...)
}

```

### 使用方式

#### 创建客户端连接

```go
conn, err := grpc.DialInsecure(
		context.Background(),
		grpc.WithEndpoint("127.0.0.1:9000"),
	)
```

#### 使用服务发现

```go
conn, err := grpc.DialInsecure(
	context.Background(),
	grpc.WithEndpoint("discovery:///helloworld"),
	grpc.WithDiscovery(r),
)
```

## References

* https://www.grpc.io/
* https://www.grpc.io/docs/languages/go/quickstart/
* https://github.com/grpc/grpc-go