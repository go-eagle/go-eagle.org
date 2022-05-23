---
id: cli
title: 命令行工具
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - cli
  - tools
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
---

通过使用 eagle 命令行工具，可以：

- 通过模板快速创建项目
- 快速创建与生成 proto\repo\cache 文件
- 使用开发过程中常用的命令
- 极大提高开发效率，减轻心智负担


## 安装

### go get 方式安装

```bash
go get -v github.com/go-eagle/eagle/cmd/eagle
```

### go install 方式安装

> Go 1.16 版本以上使用该方式

```bash
go install github.com/go-eagle/eagle/cmd/eagle@latest
```

## 使用

使用前我们可以先通过查看帮助，看一下都支持什么命令

### 查看帮助

```bash
➜ eagle -h
Eagle: An develop kit for Go microservices.

Usage:
  eagle [command]

Available Commands:
  cache       Generate the cache file
  help        Help about any command
  new         Create a project template
  proto       Generate the proto files
  repo        Generate the repo file
  run         Run project
  svc         Generate the service/svc file
  task        Generate the task file
  upgrade     Upgrade the eagle tools

Flags:
  -h, --help      help for eagle
  -v, --version   version for eagle

Use "eagle [command] --help" for more information about a command.
```

### 新建项目

主要是使用命令拉取 `eagle-layout` 模板项目代码来生成。

```bash
eagle new helloworld
# or
eagle new github.com/foo/helloworld
```

### 定义proto

使用 proto 开发主要由三大步骤

- 定义proto文件
- 生成pb代码
- 编写server代码

这一切都有工具来帮你完成，你只需要实现具体的业务逻辑即可。

#### 步骤一：生成模板文件

```bash
eagle add api/user/v1/user.proto
```

生成的内容如下

```protobuf
syntax = "proto3";

package api.user.v1;

option go_package = "helloworld2/api/user/v1;v1";
option java_multiple_files = true;
option java_package = "api.user.v1";

service UserService {
    rpc CreateUser (CreateUserRequest) returns (CreateUserReply);
    rpc UpdateUser (UpdateUserRequest) returns (UpdateUserReply);
    rpc DeleteUser (DeleteUserRequest) returns (DeleteUserReply);
    rpc GetUser (GetUserRequest) returns (GetUserReply);
    rpc ListUser (ListUserRequest) returns (ListUserReply);
}

message CreateUserRequest {}
message CreateUserReply {}

message UpdateUserRequest {}
message UpdateUserReply {}

message DeleteUserRequest {}
message DeleteUserReply {}

message GetUserRequest {}
message GetUserReply {}

message ListUserRequest {}
message ListUserReply {}
```

#### 步骤二：生成 pb

```bash
eagle proto client

# Output
# api/user/v1
user.pb.go #新增
user.proto
user_grpc.pb.go #新增
```

**说明**

protocol buffer编译器(protoc)生成的代码包含

- 消息序列化代码(*.pb.go)
- 客户端使用方法调用的远程接口存根（*_grpc.pb.go）
- 服务器代码实现的抽象接口（*_grpc.pb.go）

#### 步骤三：生成 server 骨架代码

```bash
eagle proto server api/user/v1/user.proto
```

**说明**

- 默认会输出到 `internal/service` 目录下
- 如果想要输出到指定目录，可以使用 `-t` 参数来指定

### 生成 repo

```bash
eagle repo add User

# Output
# internal/repository
user_repo.go

# 驼峰写法
eagle repo add UserInfo

# Output
# internal/repository
user_info_repo.go
```

> repo 名用驼峰写法，首字母大写，生成的文件名会是下划线分隔的小写写法

### 生成 cache

```bash
eagle cache add User

# Output
# internal/cache
user_cache.go

# 驼峰写法
eagle cache add UserInfo

# Output
# internal/cache
user_info_cache.go
```

### 生成 service

> 和 eagle proto server 生成的类似，功能完全相同

```bash
eagle svc add User

#Output
#interval/service
user_svc.go
```

### 生成任务

```bash
eagle task add User

# Output
# internal/tasks
user_task.go
```

### 升级工具

```bash
eagle upgrade
```

### 查看工具版本

```bash
eagle -v

# Output
eagle version v0.13.3
```
