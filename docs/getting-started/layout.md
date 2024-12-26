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
├── api                          # API接口定义，proto源文件及gRPC stub
├── cmd                          # 
│   ├── consumer                 # 消费者服务入口
│   ├── gen                      # gorm生成数据库脚本
│   └── server                   # 服务启动入口
├── config                       # 配置文件统一存放目录
│   ├── dev                      # 开发环境配置
│   ├── docker                   # docker环境配置
│   ├── prod                     # 生成环境配置
│   └── test                     # 测试环境配置
├── internal                     # 业务目录
│   ├── dal                      # 数据访问层
│   │   ├── cache                # 基于业务封装的cache
│   │   ├── db                   # 数据库 model 及 使用 gorm/gen 生成的自定义方法
│   │   ├── init.go              # 用于初始化数据访问层的相关配置和资源
│   │   └── rpc                  # 存放与远程过程调用（RPC）相关的代码
│   ├── handler                  # http 接口
│   ├── middleware               # 业务自定义中间件
│   ├── repository               # 数据防腐层，对下和dal层进行交互，对上供service进行调用
│   ├── ecode                    # 业务自定义错误码
│   ├── mock                     # mock 文件，用于单元测试
│   ├── routers                  # 业务路由
│   ├── tasks                    # 任务定义和处理，包含即时、延迟和定时任务
│   ├── server                   # http server 和 grpc server
│   └── service                  # 业务逻辑层
├── main.go                      # 项目入口文件
├── pkg                          # 项目公共库目录
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
│       ...                      # 说明同单应用模式里的说明
│   ├── post                     # 同 user
│   ├── order                    # 同 user
│   ├── payment                  # 同 user
├── logs                         # 存放日志的目录
├── main.go                      # 项目入口文件
├── pkg                          # 框架核心目录
├── test                         # 单元测试依赖的配置文件，主要是供docker使用的一些环境配置文件
└── scripts                      # 存放用于执行各种构建，安装，分析等操作的脚本
```
