---
id: http-guide
title: HTTP API 开发流程
description: HTTP API 开发流程 Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - http
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /guide/http-guide
---

生成 HTTP API(hanlder) 有三种方式

- 纯手写
- CLI 生成
- 通过proto定义生成

## 纯手写

经常写一个新的 `HTTP API` 时，我们可能会手动编写API，或者copy一个已有的，然后进行修改，但这种效率较低且容易出错。

所以我们提供了下面两种生成的方式。

## CLI 生成

### 生成API

使用 eagle 自带的命令行工具

```bash
eagle hanlder add Demo

# internal/hanlder/v1
demo.go

# 如果是想生成到v2目录下，可以以下命令
eagle handler add -version=v2 Demo 
```

生成的内容如下

```go
// internal/handler/v1/demo.go
package handler

import (
	"github.com/gin-gonic/gin"

	"github.com/go-eagle/eagle/pkg/app"
	"github.com/go-eagle/eagle/pkg/log"
)

// Demo demo
// @Summary demo
// @Description demo
// @Tags system
// @Accept  json
// @Produce  json
// @Router /demo [get]
func Demo(c *gin.Context) {
	// here add your code

	app.Success(c, gin.H{})
}
```

### 绑定路由

最后需要在路由文件中加入你定义的API

```go
// internal/routes/router.go

...
  // v1 router
	apiV1 := g.Group("/v1")
	apiV1.Use()
	{
		apiV1.GET("/demo", handler.Demo)
	}
...
```

### 启动应用并验证

```bash
go run main.go

# curl http://localhost:8000/v1/demo
```

## 通过proto定义生成

如果对proto比较熟悉的同学，可能更喜欢通过定义proto文件来生成对一个的HTTP API。

主要有以下几个步骤

### 定义 proto

```protobuf
syntax = "proto3";

package api.micro.user.v1;

import "google/api/annotations.proto";

option go_package = "github.com/go-microservice/ins-api/api/micro/user/v1;v1";

service UserService {
  // auth
  rpc Register(RegisterRequest) returns (RegisterReply) {
    option (google.api.http) = {
      post: "/v1/auth/register"
      body: "*"
    };
  }
  rpc Login(LoginRequest) returns (LoginReply) {
    option (google.api.http) = {
      post: "/v1/auth/login"
      body: "*"
    };
  }
  rpc Logout(LogoutRequest) returns (LogoutReply) {
    option (google.api.http) = {
      post: "/v1/auth/logout"
      body: "*"
    };
  }

  // user
  rpc CreateUser(CreateUserRequest) returns(CreateUserReply) {
    option (google.api.http) = {
      post: "/v1/users"
      body: "*"
    };
  }
  rpc GetUser(GetUserRequest) returns (GetUserReply) {
    option (google.api.http) = {
      get: "/v1/users/info"
    };
  }
  rpc UpdateUser(UpdateUserRequest) returns (UpdateUserReply) {
    option (google.api.http) = {
      patch: "/v1/users/{user_id}"
      body: "*"
    };
  }
  rpc UpdatePassword(UpdatePasswordRequest) returns (UpdatePasswordReply) {
    option (google.api.http) = {
      patch: "/v1/users/password/{user_id}"
      body: "*"
    };
  }
}

enum StatusType {
  NORMAL = 0;
  DELETE = 1;
  Ban = 2;
}

enum GenderType {
  UNKNOWN = 0;
  MALE = 1;
  FEMALE = 2;
};

// user info
message User {
  int64 id = 1;
  string username = 2;
  string email =3;
  string phone = 4;
  int64  login_at = 5;
  StatusType status = 6;
  string nickname = 7;
  string avatar = 8;
  GenderType gender = 9;
  string birthday = 10;
  string bio = 11;
  int64 created_at = 12;
  int64 updated_at = 13;
}

message RegisterRequest {
  string username = 1;
  string email = 2;
  string password = 3;
}

message RegisterReply {
  int64 id = 1;
  string username = 2;
}

message LoginRequest {
  string username = 1;
  string email = 2;
  string password = 3;
}

message LoginReply {
  string token = 1;
}

message LogoutRequest {
  int64 id = 1;
  string token = 2;
}

message LogoutReply {
}

message CreateUserRequest {
  string username = 1;
  string email = 2;
  string password = 3;
}

message CreateUserReply {
  int64 id = 1;
  string username = 2;
  string email = 3;
}

message UpdateUserRequest {
  int64 user_id = 1;
  string username = 2;
  string email = 3;
  string phone = 4;
  int64  login_at = 5;
  StatusType status = 6;
  string nickname = 7;
  string avatar = 8;
  GenderType gender = 9;
  string birthday = 10;
  string bio = 11;
  int64 updated_at = 13;
}

message UpdateUserReply {

}

message UpdatePasswordRequest {
  int64 user_id = 1;
  string password = 2;
}

message UpdatePasswordReply {

}

message GetUserRequest {
  int64 id = 1;
}

message GetUserReply {
  User user = 1;
}

message BatchGetUsersRequest {
  repeated int64 ids = 1;
}

message BatchGetUsersReply {
  repeated User users = 1;
}
```

### 生成 HTTP API及路由

这里API和路由完全不需要手动书写，全部通过命令生成即可。

```bash
make http
```

运行完此命令后，会多一个 `user_gin.pb.go` 文件，里面包含了接口定义和路由的注册。

### 启动应用并验证

```bash
go run main.go

# curl http://localhost:8000/v1/demo
```

恭喜你，已经学会了这三种定义handler的方式。