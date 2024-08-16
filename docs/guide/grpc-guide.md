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

### 6、在server中编写业务逻辑

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

其他客户端调试工具

- 类似curl的调试工具 https://github.com/fullstorydev/grpcurl
- 交互式的调试工具 https://github.com/ktr0731/evans
- UI调试工具 https://github.com/fullstorydev/grpcui

## 单元测试

```go
package service

import (
	"context"
	"log"
	"net"
	"testing"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/test/bufconn"

	pb "github.com/go-microservice/user-service/api/user/v1"
)

const (
	addr    = ""
	bufSize = 1024 * 1024
)

var (
	lis *bufconn.Listener
	srv *grpc.Server
)

func initGRPCServer() {
	lis = bufconn.Listen(bufSize)
	srv = grpc.NewServer()

	pb.RegisterUserServiceServer(srv, &UserServiceServer{})

	go func() {
		if err := srv.Serve(lis); err != nil {
			log.Fatalf("srv.Serve, err: %v", err)
		}
	}()
}

func TestUserServiceServer_GetUser(t *testing.T) {
	initGRPCServer()
	t.Cleanup(func() {
		lis.Close()
		srv.Stop()
	})

	// test
	dialer := func(context.Context, string) (net.Conn, error) {
		return lis.Dial()
	}

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	t.Cleanup(func() {
		cancel()
	})

	conn, err := grpc.DialContext(ctx, addr, grpc.WithContextDialer(dialer), grpc.WithInsecure())
	t.Cleanup(func() {
		conn.Close()
	})
	if err != nil {
		log.Fatalf("grpc.DialContext, err: %v", err)
	}

	client := pb.NewUserServiceClient(conn)
	resp, err := client.GetUser(context.Background(), &pb.GetUserRequest{Id: 1})
	if err != nil {
		t.Fatalf("client.GetUser, err: %v", err)
	}

	if resp.User.Id != 1 {
		t.Fatalf("Unexpected values: %v", resp.User)
	}
}

```

## 完整案例

具体代码可以参看：[用户服务](https://github.com/go-microservice/user-service)

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

### 为 proto 增加校验规则

1、在 `proto` 中加入校验规则

```bash
// api/user/v1/user.proto
syntax = "proto3";

package user.v1;

import "google/protobuf/empty.proto";
import "validate/validate.proto";
...
// 在对应的字段中加入校验规则
message RegisterRequest {
  string username = 1 [(validate.rules).string.min_len = 5];
  string email = 2 [(validate.rules).string.email = true];
  string password = 3 [(validate.rules).string.min_len = 6];
}
...
```

2、在 server 中启用校验

```go
...
func (s *UserServiceServer) Register(ctx context.Context, req *pb.RegisterRequest) (*pb.RegisterReply, error) {
	err := req.Validate()
	if err != nil {
		return nil, ecode.ErrInvalidArgument.WithDetails(errcode.NewDetails(map[string]interface{}{
			"msg": err.Error(),
		})).Status(req).Err()
	}
	...
}
```

比如邮箱错误会返回:

```
0: {
	type_url: type.googleapis.com/user.v1.RegisterRequest
	value: Cgd1c2VyMDAxEgl0ZXN0ZW1haWwaBjEyMzQ1Ng==
},
1: {
	type_url: type.googleapis.com/google.protobuf.Struct
	value: CngKA21zZxJxGm9pbnZhbGlkIFJlZ2lzdGVyUmVxdWVzdC5FbWFpbDogdmFsdWUgbXVzdCBiZSBhIHZhbGlkIGVtYWlsIGFkZHJlc3MgfCBjYXVzZWQgYnk6IG1haWw6IG1pc3NpbmcgJ0AnIG9yIGFuZ2xlLWFkZHI=
}
```

注意：返回的错误信息是经过序列化的 `Google Protocol Buffers (protobuf)` 格式，让我们分析其中的每个字段：

`type_url`：

这个字段表示序列化后的数据所属的类型，即数据的类型信息。
在这里，`type.googleapis.com/user.v1.RegisterRequest` 表示序列化的数据属于 user.v1 包中的 RegisterRequest 结构体类型。

`value`：
这个字段包含序列化后的二进制数据，经过 Base64 编码。
在这里，`CgYxMTExMTESCHN1cGVyMDA3GgYxMTExMTE=` 是经过 Base64 编码的序列化数据，通过解码可以得到详细的错误信息字符串。

## FAQ

Q1: `github.com/golang/protobuf` 和 `google.golang.org/protobuf` 有什么区别？    
A: `github.com/golang/protobuf` 模块是原始的 Go protocol buffer API。  
`google.golang.org/protobuf` 模块是此 API 的更新版本，旨在简化、易用和安全，更新后的 API 的旗舰功能是支持反射以及将面向用户的 API 与底层实现分离。

Q2: 如果通过proto生成的结构体在访问http接口时，当返回值为零值的时候，json字段不显示如何处理？    
A: 可以在message的字段中加入 `gogoproto.jsontag`， 示例如下：

```proto
import "gogo/protobuf/gogo.proto";

message ListPostReply {
	repeated Post items = 1 [(gogoproto.jsontag) = "items"];
	int64 count = 2 [(gogoproto.jsontag) = "count"];
	bool has_more = 3 [(gogoproto.jsontag) = "has_more"];
	string last_id = 4 [(gogoproto.jsontag) = "last_id"];
}
```

Q3: 如何接收uri中或者form里的参数？  
A: 可以使用 `gogoproto.moretags`，示例如下：
```proto
import "gogo/protobuf/gogo.proto";

// 接收 uri 中的参数
message GetPostRequest {
	string id = 1 [(gogoproto.moretags) = 'uri:"id"'];
}

// 接收 query 里的参数
message ListPostRequest {
	int64 last_id = 1 [(gogoproto.moretags) = 'form:"last_id"'];
	int32 limit = 2 [(gogoproto.moretags) = 'form:"limit"'];
}
```


> https://developers.google.com/protocol-buffers/docs/reference/go/faq

## References

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
- https://google.aip.dev/ 👍🏻
- https://groups.google.com/g/gogoprotobuf/c/xmFnqAS6MIc (gogo tag说明)
- google.golang.org/protobuf/encoding/protojson (proto to json, eg: protojson.Unmarshal(bytes, req))
- github.com/golang/protobuf/jsonpb (json to protobuf eg: sonpb.Unmarshal(r.Body, &req))
