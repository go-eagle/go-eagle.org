---
id: redis
title: Redis 消息队列
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Queue
  - Toolkit
  - Framework
  - Microservices
  - Redis
slug: /component/queue/redis
---

## 概览

消息队列也是框架的基本标配，实际开发中也基本上离不开消息队列的使用，比如：及时队列、延迟队列、定时队列。  
使用场景如：

- 新用户注册发送欢迎提醒（即时消息）
- 网上购物下订单，30分钟内未支付订单会被关闭（延迟消息）
- 在指定的时间运行任务（定时消息）

在 Eagle 框架中，分为两类消息队列，一种是偏轻量型的消息队列(主要使用redis)，一种重量型一点的消息队列(RabbitMQ或Kafak)，下面详细介绍，本文主要介绍 `Redis` 消息队列。

## Redis 消息队列

这里所谓的轻量主要是对使用底层存储的考量，**redis** 大家基本都在用，使用和部署都比较简单。  

:::caution
主要是对 asynq 做了简单的封装
:::

### 架构图

![asynq-arch](/images/asynq-arch.jpg)

### 特性

- 支持即时、延迟和定时消息
- 支持多worker消费
- 支持超时、重试、过期
- 支持worker崩溃自动恢复机制
- 支持redis单机、集群和哨兵模式(Sentinels)
- 支持 web UI 查看

### 配置

```yaml
# config/consumer.yaml

redis:
  Addr: 127.0.0.1:6379
  Password: ""
  DB: 0
  MinIdleConn: 200
  DialTimeout: 60s
  ReadTimeout: 500ms
  WriteTimeout: 500ms
  PoolSize: 100
  PoolTimeout: 240s
  Concurrency: 10 # 指定worker的数量

rabbitmq:
  addr: guest:guest@localhost:5672
  exchangeName: test-exchange
```

### 定义task

task里主要做了以下4件事情

- 定义任务类型  
- 定义任务payload，即定义任务里需要使用到的数据  
- 创建一个task  
- 定义一个handle方法，用来编写具体处理任务的逻辑  

有两种方式，手动和命令行生成

#### a.手动编写task

```go
// internal/tasks/email_welcome.go
package tasks

import (
    "context"
    "encoding/json"
    "fmt"
    "log"

    "github.com/hibiken/asynq"
)

const (
    // 任务类型
    TypeEmailWelcome = "email:welcome"
)

// 定义任务payload
type EmailWelcomePayload struct {
    UserID int
}

// 创建任务
func NewEmailWelcomeTask(userID int) (*asynq.Task, error) {
    payload, err := json.Marshal(EmailWelcomePayload{UserID: userID})
    if err != nil {
      return nil, err
    }
    return asynq.NewTask(TypeEmailWelcome, payload), nil
}

// 处理任务的具体逻辑
func HandleEmailWelcomeTask(ctx context.Context, t *asynq.Task) error {
    var p EmailWelcomePayload
    if err := json.Unmarshal(t.Payload(), &p); err != nil {
      return fmt.Errorf("json.Unmarshal failed: %v: %w", err, asynq.SkipRetry)
    }
    log.Printf("Sending Email to User: user_id=%d", p.UserID)
    // Email delivery code ...
    return nil
}

```

#### b.命令行生成task

```bash
# 生成任务
eagle task add EmailWelcome

# 查看任务列表
eagle task list

# 输出任务列表
+---+---------------+------------------------+------------------+----------------+
| # | TASK NAME     | HANDLER NAME           | FILE NAME        | LOCATION       |
+---+---------------+------------------------+------------------+----------------+
| 1 | email:welcome | HandleEmailWelcomeTask | email_welcome.go | internal/tasks |
+---+---------------+------------------------+------------------+----------------+

```

:::info
生成结果和手动编写是一致的。
:::

### 注册task

在 `internal/server/redis.go` 进行任务注册

```go
// 创建任务并注册
err := tasks.NewEmailWelcomeTask(tasks.EmailWelcomePayload{UserID: 1})
	if err != nil {
		logger.Fatalf("could not create task: %v", err)
	}
```

### 注册handle

在 `internal/server/redis.go` 进行注册，用于处理任务

```go
// internal/server/redis.go
  ...
  // register handler
	srv.RegisterHandler(tasks.TypeEmailWelcome, tasks.HandleEmailWelcomeTask)
	// here register other handlers...
  ...
```

### 启动server

```go
go run cmd/consumer/main.go cmd/consumer/wire_gen.go
```

OK, 这样task就会按照指定的方式运行了。

### Example

详细查看具体案例

- [task定义](https://github.com/go-microservice/user-service/tree/main/internal/tasks)
- [运行server](https://github.com/go-microservice/user-service/blob/main/cmd/consumer/main.go)

## Reference

- https://github.com/hibiken/asynq
