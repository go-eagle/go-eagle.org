---
id: jaeger-deploy
title: jaeger环境部署
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/cache
---

## Jaeger架构

Jaeger 既可以部署为一体式二进制文件 (ALL IN ONE)，其中所有 Jaeger 后端组件都运行在单个进程中，也可以部署为可扩展的分布式系统 (高可用架构)

![jaeger-arch](/images/jaeger-arch.png)

主要有以下几个组件：
- Jaeger Client : OpenTracing API 的具体语言实现。它们可以用来为各种现有开源框架提供分布式追踪工具。
- Jaeger Agent : Jaeger 代理是一个网络守护进程，它会监听通过 UDP 发送的 span，并发送到收集程序。这个代理应被放置在要管理的应用程序的同一主机上。这通常是通过如 Kubernetes 等容器环境中的 sidecar 来实现的。
- Jaeger Collector : 与代理类似，该收集器可以接收 span，并将其放入内部队列以便进行处理。这允许收集器立即返回到客户端/代理，而不需要等待 span 进入存储。
- Storage : 收集器需要一个持久的存储后端。Jaeger 带有一个可插入的机制用于 span 存储。
- Query : Query 是一个从存储中检索 trace 的服务。
- Ingester : 可选组件。Jaeger 可以使用 Apache Kafka 作为收集器和实际后备存储之间的缓冲。Ingester 是一个从 Kafka 读取数据并写入另一个存储后端的服务。
- Jaeger UI : Jaeger 提供了一个用户界面，可让您可视觉地查看所分发的追踪数据。在搜索页面中，您可以查找 trace，并查看组成一个独立 trace 的 span 详情。

## 本地环境部署

主要是偏重使用 `all-in-one` 方式

### docker

```bash
docker run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -p 5775:5775/udp \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 14268:14268 \
  -p 14250:14250 \
  -p 9411:9411 \
  jaegertracing/all-in-one:latest
```

### k8s Jaeger Operator方式

```yaml
apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: my-jaeger
spec:
  strategy: allInOne # 部署策略
  allInOne:
    image: jaegertracing/all-in-one:latest
    options:
      log-level: debug # 日志等级
  storage:
    type: memory # 可选 Cassandra、Elasticsearch
    options:
      memory:
        max-traces: 100000
  ingress:
    enabled: false
  agent:
    strategy: sidecar # 代理部署策略可选 DaemonSet
  query:
    serviceType: NodePort # 用户界面使用 NodePort
```

## 测试环境部署

docker-compose方式

```yaml
version: "3"
services:
  zookeeper:
    image: 'bitnami/zookeeper:latest'
    ports:
      - '2181:2181'
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
    networks:
      - jaeger

  kafka:
    image: 'bitnami/kafka:latest'
    ports:
      - '19092:9092'
    environment:
      - KAFKA_BROKER_ID=1
      - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://10.10.10.10:19092
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
      - KAFKA_CFG_OFFSETS_TOPIC_REPLICATION_FACTOR=1
      - ALLOW_PLAINTEXT_LISTENER=yes
    depends_on:
      - zookeeper
    networks:
      - jaeger

  collector:
    container_name: jaeger-collector
    image: 'jaegertracing/jaeger-collector:latest'
    ports:
      - '9411:9411'
      - '14250:14250'
      - '14268:14268'
      - '14269:14269'
    environment:
      - SPAN_STORAGE_TYPE=kafka
      - KAFKA_PRODUCER_BROKERS=10.10.10.10:19092
      - KAFKA_PRODUCER_TOPIC=jaeger_span_test
      - LOG_LEVEL=debug

    networks:
      - jaeger

  agent:
    image: 'jaegertracing/jaeger-agent:latest'
    ports:
      - '5775:5775/udp'
      - '6831:6831/udp'
      - '6832:6832/udp'
      - '5778:5778'
    environment:
      - REPORTER_GRPC_HOST_PORT=collector:14250
      - LOG_LEVEL=debug
    depends_on:
      - jaeger-collector
    networks:
      - jaeger

  query:
    container_name: jaeger-query
    image: 'jaegertracing/jaeger-query:latest'
    ports:
      - '16686:16686'
      - '16687:16687'
    environment:
      - SPAN_STORAGE_TYPE=elasticsearch
      - ES_SERVER_URLS=10.10.10.20:9090  # es地址
      - LOG_LEVEL=debug

    networks:
      - jaeger

  ingester:
    container_name: jaeger-ingester
    image: 'jaegertracing/jaeger-ingester:latest'
    ports:
      - '14270:14270'
    environment:
      - SPAN_STORAGE_TYPE=elasticsearch
      - ES_SERVER_URLS=10.10.10.20:9090
      - LOG_LEVEL=debug
    networks:
      - jaeger
    entrypoint: ["/go/bin/ingester-linux", '--kafka.consumer.brokers=10.10.10.10:19092', '--kafka.consumer.topic=jaeger_span_test']

networks:
  jaeger:
```

## 线上环境部署

k8s Jaeger Operator方式

部署 operator
```bash
helm install jaeger-operator jaegertracing/jaeger-operator --version=2.25.0 -f jaeger-operator-prod.yaml
```

```yaml
resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 128Mi
```

部署 jaeger

```bash
kubectl apply -f jaeger-prod.yaml
```

`jaeger-prod.yaml` 内容如下
```yaml

```
