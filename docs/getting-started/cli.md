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

通过使用 eagle 命令行工具，可以提高开发效率，减少手写带来的错误。  
使得大家可以更加专注于业务开发。

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
  model       Generate the model file
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

### 生成model

经常我们定义完数据库的表结构之后，需要来手写结构体，  
字段数量少还可以，如果字段很多，手写起来可能会比较痛苦，且容易出错，  
所以这里给大家提供了一个通过命令行生成的工具，使用方法如下：

#### 使用方法

```bash
eagle model -h
Generate the model file via database table.

Usage:
  eagle model [flags]

Flags:
  -d, --database string     database name
  -f, --filename string     model filename
      --format string       add json annotations (default)
  -h, --help                help for model
      --host string         database host addr (default "localhost")
      --package string      package name (default "model")
  -p, --password string     password for database (default "123456")
  -s, --struct string       model struct name
  -t, --table string        table name
      --target-dir string   model target dir (default "internal/model")
  -u, --user string         database username (default "root")
```

#### 示例1

以生成用户model为例，设定用户表明为 `user`，通过交互式来生成：

```bash
➜ eagle model 回车  
? What is file name ? user.go
? What is database name ? eagle
? What is table name ? user
? What is struct name for model? UserModel
🚀 Creating model user.go, please wait a moment.

🍺 Model creation succeeded user.go
```

生成的 `user.go` 位于 `internal/model` 目录下。  

#### 示例2

以生成用户model为例，设定用户表明为 `user_info`，通过命令行参数的方式来生成：

```bash
➜ eagle model -f=user_info.go -d=eagle -t=user_info -s=UserInfoModel -u=root -p=123456 
🚀 Creating model user_info.go, please wait a moment.

🍺 Model creation succeeded user_info.go
```

两种方式生成的内容是一致的，大家可以根据爱好自行选择。

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
