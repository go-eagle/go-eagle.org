---
id: start
title: 创建项目
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
---

## 版本要求

需要使用 eagle v1.8.0 以上版本

## 环境准备

- [Go](https://golang.org/dl/)
- [protoc](https://github.com/protocolbuffers/protobuf)
- [protoc-gen-go](https://github.com/protocolbuffers/protobuf-go)

开启GO111MODULE

```bash
go env -w GO111MODULE=on
```

国内用户可以配置[代理](https://goproxy.cn/)，加速下载

```bash
go env -w GOPROXY="https://goproxy.cn,direct"

// 或者
$ echo "export GO111MODULE=on" >> ~/.profile
$ echo "export GOPROXY=https://goproxy.cn" >> ~/.profile
$ source ~/.profile
```

## 命令行工具

安装 eagle 命令行工具

### go get 方式安装

```bash
go get -v github.com/go-eagle/eagle/cmd/eagle
```

### go install 方式安装

> Go 1.16 版本以上使用该方式

```bash
go install github.com/go-eagle/eagle/cmd/eagle@latest
```

## 创建项目

默认包含 http 和 gRPC 服务

```bash
# 创建新项目
eagle new eagle-demo 

# 或
eagle new github.com/foo/eagle-demo
```

## 编译和运行

```bash
# 编译
make build

# 运行，选择需要运行的服务
eagle run
```

## 测试接口

```bash
curl 'http://127.0.0.1:8080/health'

输出：
{
    "status":"UP",
    "hostname":"host01"
}
```

恭喜💐，项目创建成功。
