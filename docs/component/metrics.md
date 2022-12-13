---
id: metrics
title: 监控指标
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/metrics
---

## 4大黄金指标

Four Golden Signals是Google针对大量分布式监控的经验总结，4个黄金指标可以在服务级别帮助衡量终端用户体验、服务中断、业务影响等层面的问题。

主要关注与以下四种类型的指标：

- 延迟：服务请求所需时间
记录用户所有请求所需的时间，重点是要区分成功请求的延迟时间和失败请求的延迟时间。
- 通讯量：监控当前系统的流量, 也就是常说的QPS
用于衡量组件和系统的“繁忙程度”，这可以捕获服务的负载需求，以便了解系统当前执行的工作量。
- 错误率：监控当前系统所有发生的错误请求，衡量当前系统错误发生的速率
- 饱和度：衡量当前服务的饱和度
主要包含内存、CPU、磁盘I/O、网络的使用情况


## 监控指标

监控指标主要包含应用本生、Go进程、HTTP/gRPC等常见指标。

具体如下：

### App监控

- 延迟 Latency
- 流量 QPS
- 错误码 Error Code
- 饱和度 内存、CPU

### Go进程监控

- Go协程数
- 请求体大小
- 响应体大小

### HTTP指标监控

- 

### gRPC指标监控

#### gRPC客户端

- 请求速率(request inbound rate)
- unary请求错误率(unary request error rate)
- unary请求错误百分比(unary request error percentage)

#### gRPC服务端

- 请求速率(request inbound rate)
- unary请求错误率(unary request error rate)
- unary请求错误百分比(unary request error percentage)

## Grafana监控图

todo: 使用截图




