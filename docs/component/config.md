---
id: config
title: 配置管理
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/config
---

## 概览

配置管理是框架必不可少的一部分，像数据库、redis、消息队列等都会依赖配置进行初始化。  
Eagle 框架支持 `单独模式` 和 `分环境` 的配置模式；同时也支持不同的配置格式，
目前包括的有：

```bash
yaml
toml
ini
json
hcl
dotenv
env
```

## 文件位置

配置默认使用 `yaml` 格式，存放于项目根目录的 `config` 目录下。

配置文件根据不同功能分开存放，方便扩展，具体如下：

```bash
.
├── README.md
├── app.yaml
├── database.yaml
├── logger.yaml
├── redis.yaml
└── trace.yaml

```

## 配置模式

### 单独配置模式

单独配置主要是只所有的配置文件都分开的保存在 `config` 目录下，如下：

> 适合于不需要区分环境的场景

```bash
├── config
│   ├── README.md
│   ├── app.yaml
│   ├── database.yaml
│   ├── logger.yaml
│   ├── redis.yaml
│   └── trace.yaml
```

### 分环境配置模式

我们一般的环境有开发(dev)、测试(test)、线上(prod)环境，不同的环境可以对应不同的配置文件，如下：

```bash
# 开发环境
├── config
│   ├── dev
│   │   ├── README.md
│   │   ├── app.yaml
│   │   ├── database.yaml
│   │   ├── logger.yaml
│   │   ├── redis.yaml
│   │   └── trace.yaml

# 测试环境
├── config
│   ├── test
│   │   ├── README.md
│   │   ├── app.yaml
│   │   ├── database.yaml
│   │   ├── logger.yaml
│   │   ├── redis.yaml
│   │   └── trace.yaml

# 线上环境
├── config
│   ├── prod
│   │   ├── README.md
│   │   ├── app.yaml
│   │   ├── database.yaml
│   │   ├── logger.yaml
│   │   ├── redis.yaml
│   │   └── trace.yaml
```

## 加载配置

在项目启动的时候，可以通过参数来指定配置目录和运行环境，参数说明：

- `-c` 配置目录
- `-e` 环境变量

```bash
go build

# 单独配置启动模式
./eagle -c config

# 分环境配置启动模式
./eagle -c config -e dev
# 或者
APP_ENV=dev ./eagle -c config
```

## 读取配置

以读取应用名为例

```go
// main.go
var (
  cfgDir = pflag.StringP("config", "c", "config", "config file path.")
  env    = pflag.StringP("env name", "e", "", "env var name.")
  ...
)

...

// 初始化配置
c := config.New(*cfgDir, config.WithEnv(*env))
var cfg config.AppConfig
if err := c.Load("app", &cfg); err != nil {
  panic(err)
}

// 读取某一项配置
name := cfg.Name
```

> 应用的配置 config.WithEnv(*env) 优先级高于环境变量的 APP_ENV 配置


## 加载自定义配置

如果有一个自己的配置文件，以加载 `redis` 配置文件为例，根据配置文件类型的不同有两种加载方式

### 默认加载方式(yaml)

```go
type Config struct {
  Addr              string
  Password          string
}
var cfg Config
// config/redis.yaml
if err := config.Load("redis", &cfg); err != nil {
  // handle error
}
fmt.Println(cfg)
// Output:
// {127.0.0.1:6379 123456}
```

### 指定不同的文件格式

```go
# 加载 json 格式的配置
conf, err := config.LoadWithType("redis", "json")
if err != nil {
  // handle error
}
fmt.Println("redis addr: ", conf.GetString("redis.Addr"))
fmt.Println("redis addr: ", conf.GetInt("redis.MinIdleConn"))
```
