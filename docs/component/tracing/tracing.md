---
id: tracing
title: 链路追踪
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/tracing
---


## 为什么需要链路追踪

在微服务体系中，一次HTTP/RPC调用很可能涉及多个服务，每个服务内又可能调用其他的 HTTP API、MySQL、Redis等等，那如何知道是谁出了问题呢？又是在哪一个环节出了问题呢？如果使用日志来排查是可以做到，但是需要花费大量的时间，但是链路追踪可以帮助我们快速定位到问题所在。

## OpenTelemetry 标准

分布式链路跟踪（ Distributed Tracing ）的概念最早是由Google提出来的，发展至今技术已经比较成熟，也是有一些协议标准可以参考。目前在Tracing技术这块比较有影响力的是两大开源技术框架：Netflix公司开源的OpenTracing和Google开源的OpenCensus。两大框架都拥有比较高的开发者群体。为形成统一的技术标准，两大框架最终磨合成立了OpenTelemetry项目，简称otel。具体可以参考：

OpenTracing介绍
OpenTelemetry介绍
因此，我们的Tracing技术方案以OpenTelemetry为实施标准，协议标准的一些Golang实现开源项目：

https://github.com/open-telemetry/opentelemetry-go
https://github.com/open-telemetry/opentelemetry-go-contrib
其他第三方的框架和系统（如Jaeger/Prometheus/Grafana等）也会按照标准化的规范来对接OpenTelemetry，使得系统的开发和维护成本大大降低。

## 相关概念

## 支持的组件

### HTTP Client