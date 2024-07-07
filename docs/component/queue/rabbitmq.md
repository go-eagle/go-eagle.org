---
id: rabbitmq
title: RabbitMQ 消息队列
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Queue
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/queue/rabbitmq
---

## 概览

消息队列也是框架的基本标配，实际开发中也基本上离不开消息队列的使用，比如：及时队列、延迟队列、定时队列。  
使用场景如：

- 新用户注册发送欢迎提醒（即时消息）
- 网上购物下订单，30分钟内未支付订单会被关闭（延迟消息）
- 在指定的时间运行任务（定时消息）

在 Eagle 框架中，分为两类消息队列，一种是偏轻量型的消息队列(主要使用redis)，一种重量型一点的消息队列(RabbitMQ或Kafak)，下面详细介绍, 本文主要介绍 `RabbitMQ` 消息队列。

## RabbitMQ 消息队列

## 特性

- 支持多队列配置
- 支持延迟队列配置

## 配置

```yaml
# rabbitmq.yaml, 支持配置多种队列
test-demo:
  URI: "amqp://guest:guest@localhost:5672/"
  AutoDeclare: true
  Timeout: 5s
  Exchange:
    Name: local-test-exchange
    Kind: direct
    Durable: true
    AutoDelete: false
    Internal: false
    NoWait: false
    Args: {}
  Queue:
    name: local-test-queue
    durable: true
    AutoDelete: false
    Exclusive: false
    NoWait: false
    Args: {}
  Bind:
    RoutingKey: local-test-routing-key
    NoWait: false
    Args: {}

test-multi:
  URI: "amqp://guest:guest@localhost:5672/"
  AutoDeclare: true
  Timeout: 5s
  Exchange:
    Name: local-test2-exchange
    Kind: direct
    Durable: true
    AutoDelete: false
    Internal: false
    NoWait: false
    Args: {}
  Queue:
    name: local-test2-queue
    durable: true
    AutoDelete: false
    Exclusive: false
    NoWait: false
    Args: {}
  Bind:
    RoutingKey: local-test2-routing-key
    NoWait: false
    Args: {}
```

## 使用

### 生产者

```go
package main

import (
	"context"
	"encoding/json"
	"log"
	"time"

	"github.com/go-eagle/eagle/pkg/queue/rabbitmq/options"

	eagle "github.com/go-eagle/eagle/pkg/app"
	"github.com/go-eagle/eagle/pkg/config"
	logger "github.com/go-eagle/eagle/pkg/log"
	"github.com/spf13/pflag"

	"github.com/go-eagle/eagle/pkg/queue/rabbitmq"
)

var (
	cfgDir = pflag.StringP("config dir", "c", "config", "config path.")
	env    = pflag.StringP("env name", "e", "", "env var name.")
)

// 启动 rabbitmq
// docker run -it  --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.10-management
// 访问ui: http://127.0.0.1:15672/
// cd examples/queue/rabbitmq/producer
// go run main.go
func main() {
	c := config.New(*cfgDir, config.WithEnv(*env))
	var cfg eagle.Config
	if err := c.Load("app", &cfg); err != nil {
		panic(err)
	}
	// set global
	eagle.Conf = &cfg

	logger.Init()

	rabbitmq.Load()
	defer rabbitmq.Close()

	opts := []options.PublishOption{
		options.WithPublishOptionContentType("application/json"),
	}

	go func() {
		var message string
		for i := 0; i < 100000; i++ {
			message = "Hello World RabbitMQ!" + time.Now().String()
			msg := map[string]interface{}{
				"message": message,
			}
			data, _ := json.Marshal(msg)
			if err := rabbitmq.Publish(context.Background(), "test-demo", data, opts...); err != nil {
				log.Fatalf("failed publish message: %s", err.Error())
			}
		}
	}()

	var message string
	for i := 0; i < 100000; i++ {
		message = "Hello World multi RabbitMQ!" + time.Now().String()
		msg := map[string]interface{}{
			"message": message,
		}
		data, _ := json.Marshal(msg)
		if err := rabbitmq.Publish(context.Background(), "test-multi", data, opts...); err != nil {
			log.Fatalf("failed publish message: %s", err.Error())
		}
	}

}
```
> src: https://github.com/go-eagle/eagle/blob/master/examples/queue/rabbitmq/producer/main.go

### 消费者

```go
package main

import (
	"context"
	"encoding/json"
	"os"
	"os/signal"
	"syscall"

	"github.com/go-eagle/eagle/pkg/queue/rabbitmq/options"

	"github.com/rabbitmq/amqp091-go"

	eagle "github.com/go-eagle/eagle/pkg/app"
	"github.com/go-eagle/eagle/pkg/config"

	"github.com/spf13/pflag"

	logger "github.com/go-eagle/eagle/pkg/log"

	"github.com/go-eagle/eagle/pkg/queue/rabbitmq"
)

var (
	cfgDir = pflag.StringP("config dir", "c", "config", "config path.")
	env    = pflag.StringP("env name", "e", "", "env var name.")
)

// cd examples/queue/rabbitmq/consumer/
// go run main.go
func main() {
	pflag.Parse()

	// init config
	c := config.New(*cfgDir, config.WithEnv(*env))
	var cfg eagle.Config
	if err := c.Load("app", &cfg); err != nil {
		panic(err)
	}
	// set global
	eagle.Conf = &cfg

	logger.Init()

	rabbitmq.Load()
	defer rabbitmq.Close()

	stopSig := make(chan os.Signal, 1)
	signal.Notify(stopSig, syscall.SIGINT, syscall.SIGTERM)

	done := make(chan struct{})
	stop := make(chan struct{}, 1)

	// 自定义消息处理函数
	handler := func(ctx context.Context, body amqp091.Delivery) (action rabbitmq.Action) {
		msg := make(map[string]interface{})
		err := json.Unmarshal(body.Body, &msg)
		if err != nil {
			logger.Errorf("consumer handler unmarshal msg err: %s", err.Error())
			return rabbitmq.NackDiscard
		}
		logger.Infof("consumer handler receive msg: %s", msg)
		return rabbitmq.Ack
	}

	// rabbitmq consume message
	ctx := context.Background()

	opts := []options.ConsumerOption{
		options.WithConsumerOptionConcurrency(1),
	}

	go func() {
		err := rabbitmq.Consume(ctx, "test-demo", handler, opts...)
		if err != nil {
			logger.Errorf("rabbitmq consume err: %s", err.Error())
		}
	}()

	for {
		select {
		case <-stopSig:
			logger.Info("received stop signal")
			stop <- struct{}{}
		case <-stop:
			logger.Info("stopping service")
			close(done)
			return
		case <-done:
			logger.Info("stopped service gracefully")
			return
		}
	}
}

```
> src: https://github.com/go-eagle/eagle/blob/master/examples/queue/rabbitmq/consumer/main.go

### 延迟队列

```go
package main

import (
	"context"
	"encoding/json"
	"log"
	"time"

	eagle "github.com/go-eagle/eagle/pkg/app"
	"github.com/go-eagle/eagle/pkg/config"
	logger "github.com/go-eagle/eagle/pkg/log"
	"github.com/go-eagle/eagle/pkg/queue/rabbitmq"
	"github.com/go-eagle/eagle/pkg/queue/rabbitmq/options"
)

// 启动 rabbitmq
// docker run -it  --name rabbitmq -p 5672:5672 -p 15672:15672 -v $PWD/plugins:/plugins rabbitmq:3.10-management
// 访问ui: http://127.0.0.1:15672/
// cd examples/queue/rabbitmq/producer
// go run delay_publish.go
func main() {
	c := config.New(*cfgDir, config.WithEnv(*env))
	var cfg eagle.Config
	if err := c.Load("app", &cfg); err != nil {
		panic(err)
	}
	// set global
	eagle.Conf = &cfg

	logger.Init()

	rabbitmq.Load()
	defer rabbitmq.Close()

	opts := []options.PublishOption{
		options.WithPublishOptionContentType("application/json"),
	}

	var message string
	for i := 0; i < 100000; i++ {
		message = "Hello World RabbitMQ!" + time.Now().String()
		msg := map[string]interface{}{
			"message": message,
		}
		data, _ := json.Marshal(msg)
		if err := rabbitmq.PublishWithDelay(context.Background(), "test-demo", data, 10, opts...); err != nil {
			log.Fatalf("failed publish message: %s", err.Error())
		}
	}
}
```

> src: https://github.com/go-eagle/eagle/blob/master/examples/queue/rabbitmq/producer/delay_publish.go

## 附录

基于Docker部署RabbitMQ

```shell
docker pull bitnami/rabbitmq:latest

docker run -itd \
    --hostname localhost \
    --name rabbitmq-test \
    -p 15672:15672 \
    -p 5672:5672 \
    -p 1883:1883 \
    -p 15675:15675 \
    -e RABBITMQ_PLUGINS=rabbitmq_top,rabbitmq_mqtt,rabbitmq_web_mqtt,rabbitmq_prometheus,rabbitmq_stomp,rabbitmq_auth_backend_http \
    bitnami/rabbitmq:latest

# 查看插件列表
rabbitmq-plugins list
# rabbitmq_peer_discovery_consul 
rabbitmq-plugins --offline enable rabbitmq_peer_discovery_consul
# rabbitmq_mqtt 提供与后端服务交互使用，端口1883
rabbitmq-plugins enable rabbitmq_mqtt
# rabbitmq_web_mqtt 提供与前端交互使用，端口15675
rabbitmq-plugins enable rabbitmq_web_mqtt
```

管理后台: http://localhost:15672
默认账号: guest  
默认密码: guest

## Reference

- https://mp.weixin.qq.com/s/TN0HSUdy2UFaGhO5fCYutA
- https://mp.weixin.qq.com/s/_mFXvbwC0T05So8S_smA9A