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

## 文件位置

配置默认使用 `yaml` 格式，存放于项目根目录下的 `config` 目录下。

默认的配置文件名为 `config.yaml`, 各种环境的配置文件可以分开保存，如

```bash
# 本地环境
config/config.local.yaml

# 测试环境
config/config.test.yaml

# 线上环境
config/config.prod.yaml
```

## 加载配置

在项目启动的时候，通过参数 `-c` 加载配置，并存入全局变量 `Conf` 中。

```bash
go build

./eagle -c config/config.local.yaml
```

## 读取配置

以读取应用名为例

```go
// main.go

var (
  cfgFile = pflag.StringP("config", "c", "", "eagle config file path.")
  ...
)

...

// 初始化配置
cfg, err := conf.Init(*cfgFile)
if err != nil {
  panic(err)
}

// 读取某一项配置
name := conf.Conf.App.Name
```

## 热加载

当配置文件发生变更的时候，对应的配置会进行热更新，应用本生无需重启。

## 加载自定义配置

如果有一个自己的配置文件，加载方式如下：

```go
// 待补充

```
