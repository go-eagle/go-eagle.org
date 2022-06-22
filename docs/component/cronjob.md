---
id: cronjob
title: 定时任务
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - 定时任务 cronjob
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/cronjob
---

### 注册定时任务

定时任务和其他消息不太一样，直接在 `main.go` 里注册即可

```go
scheduler := asynq.NewScheduler(
    asynq.RedisClientOpt{Addr: cfg.Addr},
    &asynq.SchedulerOpts{Location: time.Local},
)

 // 这里进行任务的注册
 // start
 t, _ := task.NewEmailWelcomeTask(6)
 if _, err := scheduler.Register("@every 5s", t); err != nil {
    log.Fatal(err)
 }
 // end

 // Run blocks and waits for os signal to terminate the program.
 if err := scheduler.Run(); err != nil {
    log.Fatal(err)
 }
```