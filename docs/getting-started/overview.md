---
id: overview
title: 概览
description: Eagle 一个轻量级的 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /
---

### Goals

🦅一款基于Go构建的微服务框架，通过工具链可以快速构建支持HTTP/gRPC协议的API服务，遵循SOLID设计原则


### Features

* Config：支持多种数据格式及热加载；
* Logger：标准日志接口，可方便集成三方 log 库，默认集成 Zap；
* Transport：支持HTTP/gRPC通信协议，一个进程拥有多种协议；
* API: 通过Protobuf进行定义；
* Metrics：统一指标接口，默认集成 Prometheus；
* Tracing：支持微服务链路追踪，遵循 OpenTelemetry 规范；
* Registry: 支持服务注册与发现；

<!-- ### Architecture -->
<!--  -->
<!-- <img src="/image/architecture.png" alt="Eagle architecture" width="650px" /> -->

### Related

* [Docs](https://go-eagle.org/)
* [Example社交API-类Instagram](https://github.com/go-microservice)
* [项目模板布局](https://github.com/go-eagle/eagle-layout)

### Community

* QQ Group: 1074476202

### License

Eagle is MIT licensed. See the [LICENSE](https://github.com/go-eagle/eagle/blob/master/LICENSE) file for details.

### Contributors

感谢开发者们对本项目的贡献。
<a href="https://github.com/go-eagle/eagle/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=go-eagle/eagle" />
</a>

