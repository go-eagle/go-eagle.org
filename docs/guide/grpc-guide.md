---
id: grpc-guide
title: 开发流程 - gRPC
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - gRPC
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /guide/grpc-guide
---


> 👉 记录gRPC的开发流程，方便后续的开发

## 开发步骤

### 1、生成proto模板文件

```bash
eagle proto add api/like/v1/like.proto
```

内容如下

```protobuf
syntax = "proto3";

package api.like.v1;

option go_package = "github.com/go-microservice/moment-service/api/like/v1;v1";
option java_multiple_files = true;
option java_package = "api.like.v1";

service LikeService {
    rpc CreateLike (CreateLikeRequest) returns (CreateLikeReply);
    rpc UpdateLike (UpdateLikeRequest) returns (UpdateLikeReply);
    rpc DeleteLike (DeleteLikeRequest) returns (DeleteLikeReply);
    rpc GetLike (GetLikeRequest) returns (GetLikeReply);
    rpc ListLike (ListLikeRequest) returns (ListLikeReply);
}

message CreateLikeRequest {}
message CreateLikeReply {}

message UpdateLikeRequest {}
message UpdateLikeReply {}

message DeleteLikeRequest {}
message DeleteLikeReply {}

message GetLikeRequest {}
message GetLikeReply {}

message ListLikeRequest {}
message ListLikeReply {}
```

### 2、定义proto

主要是填充业务方法及message定义

```json
vim api/like/v1/like.proto
```

### 3、生成pb文件

业务rpc方法及message定义完，就可以生成pb文件了，具体操作如下

```bash
# 方式一：生成所有proto
make grpc

# 方式二：生成指定proto的pb文件
eagle proto client api/like/v1/like.proto

# Output
# api/like/v1/
like.pb.go #新增
like.proto
like_grpc.pb.go #新增
```

**说明**

protocol buffer编译器(protoc)生成的代码包含

- 消息序列化代码(`*.pb.go`)
- 客户端使用方法调用的远程接口存根（`*_grpc.pb.go`）
- 服务器代码实现的抽象接口（`*_grpc.pb.go`）

### 4、生成server骨架代码

实现了上一步生成的接口(`*_grpc.pb.go` 内)

```bash
# 生成骨架代码
eagle proto server api/like/v1/like.proto

# 默认会输出到 internal/service
# 如果需要指定到对应的目录，可以使用 -t 参数, eg: 
# eagle proto server -t internal/logic

# 查看
internal/service/likeservice_grpc.go
```

### 5、注册服务到gRPC Server

```go
// NewGRPCServer creates a gRPC server
func NewGRPCServer(
	cfg *app.ServerConfig,
	// 新增
	likeSvc *service.LikeServiceServer, 
) *grpc.Server {

	grpcServer := grpc.NewServer(
		grpc.Network("tcp"),
		grpc.Address(":9090"),
		grpc.Timeout(3*time.Second),
	)

	// register biz service
	// 新增
	likev1.RegisterLikeServiceServer(grpcServer, likeSvc)

	return grpcServer
}
```

### 6、在生成的server中编写业务逻辑

这里编写具体的业务逻辑

```go
# vim internal/service/likeservice_grpc.go

package service

import (
	"context"

	pb "github.com/go-microservice/moment-service/api/like/v1"
)

var (
	_ pb.LikeServiceServer = (*LikeServiceServer)(nil)
)

type LikeServiceServer struct {
	pb.UnimplementedLikeServiceServer

	// here 导入你需要用到的repo
	likeRepo repository.UserLikeRepo
}

func NewLikeServiceServer() *LikeServiceServer {
	return &LikeServiceServer{
}
}

func (s *LikeServiceServer) CreateLike(ctx context.Context, req *pb.CreateLikeRequest) (*pb.CreateLikeReply, error) {

	return &pb.CreateLikeReply{}, nil
}
func (s *LikeServiceServer) UpdateLike(ctx context.Context, req *pb.UpdateLikeRequest) (*pb.UpdateLikeReply, error) {
	return &pb.UpdateLikeReply{}, nil
}
func (s *LikeServiceServer) DeleteLike(ctx context.Context, req *pb.DeleteLikeRequest) (*pb.DeleteLikeReply, error) {
	return &pb.DeleteLikeReply{}, nil
}
func (s *LikeServiceServer) GetLike(ctx context.Context, req *pb.GetLikeRequest) (*pb.GetLikeReply, error) {
	return &pb.GetLikeReply{}, nil
}
func (s *LikeServiceServer) ListLike(ctx context.Context, req *pb.ListLikeRequest) (*pb.ListLikeReply, error) {
	return &pb.ListLikeReply{}, nil
}
```

### 7、启动服务

```bash
# 在根目录下运行
go run main.go
```

### 8、调试接口

调试工具，这里推荐使用 `[grpcurl](https://github.com/fullstorydev/grpcurl)`

```bash
# 查看服务列表
grpcurl -plaintext localhost:9090 list

# Output
api.like.v1.LikeService
grpc.health.v1.Health
grpc.reflection.v1alpha.ServerReflection

# 访问列表
grpcurl -plaintext -d '{"user_id":2}' localhost:9090 api.like.v1.LikeService/ListLike
```

参数说明

- -d 提交的参数， json格式
- -plaintext 使用纯文本连接，跳过TLS

## 完整案例

具体代码可以参看：[动态服务](https://github.com/go-microservice/moment-service)

## 扩展阅读

通过protoc 生成pb有两种方式，对于第二种方式，了解下即可，见到后知道是怎么回事。

### 最新方式(推荐)

> 使用：google.golang.org/protobuf

```bash
$ protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    api/like/v1/like.proto
```

> 会生成两个文件 `*.pb.go` 和 `*._grpc.pb.go`, 分别是消息序列化代码和 `gRPC` 代码.

### 较早方式(已废弃)

> 使用：github.com/golang/protobuf

```bash
$ protoc -I . --go_out=plugins=grpc,paths=source_relative:. api/like/v1/like.proto
```

> 生成的 `*.pb.go` 包含消息序列化代码和 `gRPC` 代码.

## FAQ

Q: `github.com/golang/protobuf` 和 `google.golang.org/protobuf` 有什么区别？  
A: `github.com/golang/protobuf` 模块是原始的 Go protocol buffer API。
`google.golang.org/protobuf` 模块是此 API 的更新版本，旨在简化、易用和安全，更新后的 API 的旗舰功能是支持反射以及将面向用户的 API 与底层实现分离。

> https://developers.google.com/protocol-buffers/docs/reference/go/faq

## Reference

- https://grpc.io/docs/languages/go/quickstart/
- https://developers.google.com/protocol-buffers/docs/proto3
- https://grpc.io/docs/guides/error/
- https://github.com/avinassh/grpc-errors/blob/master/go/client.go
- https://stackoverflow.com/questions/64828054/differences-between-protoc-gen-go-and-protoc-gen-go-grpc
- https://jbrandhorst.com/post/grpc-errors/
- https://godoc.org/google.golang.org/genproto/googleapis/rpc/errdetails
- https://cloud.google.com/apis/design/errors
- https://github.com/grpc/grpc/blob/master/doc/health-checking.md
- https://eddycjy.com/posts/where-is-proto/
- https://stackoverflow.com/questions/52969205/how-to-assert-grpc-error-codes-client-side-in-go