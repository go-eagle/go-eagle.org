---
id: layout
title: 项目布局
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /getting-started/layout
---

## 目录结构

### 单应用模式

```bash
├── Makefile                     # 项目管理文件
├── README.md                    # 项目说明文件
├── api                          # grpc客户端和Swagger 文档
├── cmd                          # 项目启动入口文件
├── config                       # 配置文件统一存放目录
├── internal                     # 业务目录
│   ├── cache                    # 基于业务封装的cache
│   ├── handler                  # http 接口
│   ├── middleware               # 业务自定义中间件
│   ├── model                    # 数据库 model
│   ├── repository               # 数据访问层, eg: 数据库,redis,api等
│   ├── ecode                    # 业务自定义错误码
│   ├── mock                     # mock 文件，用于单元测试
│   ├── routers                  # 业务路由
│   ├── server                   # http server 和 grpc server
│   └── service                  # 业务逻辑层
├── logs                         # 存放日志的目录
├── main.go                      # 项目入口文件
├── pkg                          # 框架核心目录
├── test                         # 单元测试依赖的配置文件，主要是供docker使用的一些环境配置文件
└── scripts                      # 存放用于执行各种构建，安装，分析等操作的脚本
```

### 多应用模式

> 大仓模式：多个应用在一个仓库下

```bash
├── Makefile                     # 项目管理文件
├── README.md                    # 项目说明文件
├── api                          # grpc客户端和Swagger 文档
├── cmd                          # 项目启动入口文件
├── config                       # 配置文件统一存放目录
├── internal                     # 业务目录
│   ├── user                     # 内部目录结构同单应用模式下的 internal
│       ├── cache                    # 基于业务封装的cache
│       ├── handler                  # http 接口
│       ├── middleware               # 业务自定义中间件
│       ├── model                    # 数据库 model
│       ├── repository               # 数据访问层, eg: 数据库,redis,api等
│       ├── ecode                    # 业务自定义错误码
│       ├── mock                     # mock 文件，用于单元测试
│       ├── routers                  # 业务路由
│       ├── server                   # http server 和 grpc server
│       └── service                  # 业务逻辑层
│   ├── post                     # 同 user
│   ├── order                    # 同 user
│   ├── payment                  # 同 user
├── logs                         # 存放日志的目录
├── main.go                      # 项目入口文件
├── pkg                          # 框架核心目录
├── test                         # 单元测试依赖的配置文件，主要是供docker使用的一些环境配置文件
└── scripts                      # 存放用于执行各种构建，安装，分析等操作的脚本
```
