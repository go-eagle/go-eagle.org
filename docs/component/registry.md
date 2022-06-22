---
id: registry
title: 注册与发现
description: 注册与发现
keywords:
  - Go
  - Eagle
  - Registry and discovery
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/registry
---

服务注册与发现基本是微服务开发中不可或缺的组件，Eagle 框架也提供了支持。

## 支持的组件

- etcd
- consul
- nacos

## 服务注册

在服务启动的时候，Eagle 会通过 `eagle.WithRegistry()` 将当前实例注册到注册中心里，需提前创建一个 `Registry`；
同理，在服务停掉的时候，会从注册中心里剔除调。

不同的组件，使用方式基本相同，具体如下。

### etcd

```go
// main.go
import (
  ...
  "github.com/go-eagle/eagle/pkg/client/etcdclient"
  "github.com/go-eagle/eagle/pkg/registry/etcd"
  ...
)

func newApp(cfg *eagle.Config, gs *grpc.Server) *eagle.App {
	return eagle.New(
		eagle.WithName(cfg.Name),
		eagle.WithVersion(cfg.Version),
		eagle.WithLogger(logger.GetLogger()),
		eagle.WithServer(gs),
		eagle.WithRegistry(getEtcdRegistry()),
	)
}

func getEtcdRegistry() registry.Registry {
	client, err := etcdclient.New()
	if err != nil {
		log.Fatal(err)
	}
	return etcd.New(client.Client)
}
```

### consul

```go
// main.go
import (
  ...
  "github.com/go-eagle/eagle/pkg/client/consulclient"
  "github.com/go-eagle/eagle/pkg/registry/consul"
  ...
)

func newApp(cfg *eagle.Config, gs *grpc.Server) *eagle.App {
	return eagle.New(
		eagle.WithName(cfg.Name),
		eagle.WithVersion(cfg.Version),
		eagle.WithLogger(logger.GetLogger()),
		eagle.WithServer(gs,),
		eagle.WithRegistry(getConsulRegistry()),
	)
}

func getConsulRegistry() registry.Registry {
	client, err := consulclient.New()
	if err != nil {
		panic(err)
	}
	return consul.New(client)
}
```

### nacos

```go
// main.go
import (
  ...
  "github.com/go-eagle/eagle/pkg/client/nacosclient"
  "github.com/go-eagle/eagle/pkg/registry/nacos"
  ...
)

func newApp(cfg *eagle.Config, gs *grpc.Server) *eagle.App {
	return eagle.New(
		eagle.WithName(cfg.Name),
		eagle.WithVersion(cfg.Version),
		eagle.WithLogger(logger.GetLogger()),
		eagle.WithServer(gs,),
		eagle.WithRegistry(getNacosRegistry()),
	)
}

func getNacosRegistry() registry.Registry {
	client, err := nacosclient.New()
	if err != nil {
		panic(err)
	}
	return nacos.New(client)
}
```

## 服务发现

服务发现的实现也有多种方式，假定需要连接的是用户服务，服务名serviceName是 `user-svc`, 举例如下：

### 直连模式

支持多个节点，多个用逗号分隔

> 直连模式就不会用到服务名了

```go
  ...
  endpoint := "127.0.0.1:9090"
	conn, err := grpc.DialInsecure(
		ctx,
		grpc.WithEndpoint(endpoint),
	)
  ...
```

### etcd

```go
func main() {
  ...
  endpoint := "discovery:///user-svc"
	conn, err := grpc.DialInsecure(
		ctx,
		grpc.WithEndpoint(endpoint),
		grpc.WithDiscovery(getEtcdDiscovery()),
	)
  ...
}

func getEtcdDiscovery() registry.Discovery {
	// create a etcd register
	client, err := etcdclient.New()
	if err != nil {
		panic(err)
	}
	return etcd.New(client.Client)
}
```

### consul

```go
func main() {
  ...
  endpoint := "discovery:///user-svc"
	conn, err := grpc.DialInsecure(
		ctx,
		grpc.WithEndpoint(endpoint),
		grpc.WithDiscovery(getConsulDiscovery()),
	)
  ...
}

func getConsulDiscovery() registry.Discovery {
	client, err := consulclient.New()
	if err != nil {
		panic(err)
	}
	return consul.New(client)
}
```

### nacos

这里需要注意，nacos和etcd,consul不同的是，`endpoint` 需要在服务名后面带上 `.grpc` 后缀，这和 nacos 注册时的处理有关。

```go
func main() {
  ...
  endpoint := "discovery:///user-svc.grpc"
	conn, err := grpc.DialInsecure(
		ctx,
		grpc.WithEndpoint(endpoint),
		grpc.WithDiscovery(getNacosDiscovery()),
	)
  ...
}

func getNacosDiscovery() registry.Discovery {
	client, err := nacosclient.New()
	if err != nil {
		panic(err)
	}
	return nacos.New(client)
}
```

## 配置

不同组件的配置都集中到了一个文件里：`config/registry.yaml`, 具体参数如下

```yaml
# config/registry.yaml
etcd:
  Endpoints:
    - "127.0.0.1:2379"
  ConnectTimeout: 5s
  BasicAuth:
  UserName:
  Password:
  Secure: false
  AutoSyncInterval: 1s
  TTL:
consul:
  Addr: "127.0.0.1:8500"
  Scheme: http
  Datacenter:
  WaitTime: 5s
nacos:
  Addr: "127.0.0.1"
  Port: 8848
  NamespaceId: public
  TimeoutMs: 5000
  LogDir:
  CacheDir: warn  # debug,info,warn,error, default is info
```

> 注意：consul的配置不能带有 `Namespace` 参数, 此功能只有企业版支持，如果强行开启会报如下错误
> `Unexpected response code: 400 (Bad request: Invalid query parameter: "ns" - Namespaces are a Consul Enterprise feature)`

可以根据不同的场景进行配置。