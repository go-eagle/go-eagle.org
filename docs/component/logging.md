---
id: logging
title: 日志组件
description: 日志的定义和使用
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/logging
---

## 说明

日志基于 zap 进行封装，同时也支持切割，默认按照天进行切割。

## 功能点

- 支持日志写入到多个流中，控制台或日志文件
- 支持多日志级别，包括：DEBUG,INFO,WARN,ERROR
- 支持结构化输出，默认json，方便日志收集
- 支持日志切割，按时间进行切割
- 支持打印文件和行号

## 接口定义

为了方便适配不通的日志接入，这里定义了几个接口

```go
// github.com/go-eagle/eagle/pkg/log/logger.go

type Logger interface {
  Debug(args ...interface{})
  Debugf(format string, args ...interface{})

  Info(args ...interface{})
  Infof(format string, args ...interface{})

  Warn(args ...interface{})
  Warnf(format string, args ...interface{})

  Error(args ...interface{})
  Errorf(format string, args ...interface{})

  WithFields(keyValues Fields) Logger
}
```

## 日志配置

```yaml
# config/logger.yaml
  Development: false
  DisableCaller: false
  DisableStacktrace: false
  Encoding: json   # json or console
  Level: info      # 日志级别，DEBUG, INFO, WARN, ERROR
  Name: eagle
  Writers: console # file or console
  LoggerFile: /tmp/log/eagle.log           # 所有level的日志文件
  LoggerWarnFile: /tmp/log/eagle.wf.log    # 仅记录warn的日志文件
  LoggerErrorFile: /tmp/log/eagle.err.log  # 仅记录error的日志文件
  LogRollingPolicy: daily   # 日志切割方式: daily/hourly，默认按天(daily)进行切割
  LogBackupCount: 7         # 日志备份数
```

其中 `Writers` 是日志需要输出到的位置，值为 `file` 或 `console`，选择file会将日志记录到logger_file指定的日志文件中，选择console会将日志输出到标准输出，当然也可以两者同时选择。

- `LoggerFile` 默认输出的日志文件名
- `LoggerWarnFile` warn 输出的日志文件名
- `LoggerErrorFile` error 输出的日志文件名

> 开发环境可以两者都开发，生产环境只输出到文件

## 初始化日志

在 `main.go` 启动时会初始化日志, 之后可全局使用。

```go
// main.go
...

logger.Init()

...
```

## 使用方式

```go
import (
  ...
  "github.com/go-eagle/eagle/pkg/log"
  ...
)

// info
log.Info("this is a info log")
log.Infof("this is a info log from: %s", "eagle")

// warn
log.Warn("this is a warn log")
log.Warnf("this is a warn log from: %s", "eagle")

// error
log.Error("this is a error log")

err := errors.New("test error")
log.Errorf("this is a error log, err: %+v", err)

// 带有 trace_id 和span_id,可以配合 链路追踪组件排查问题
log.WithContext(ctx).Info("this is a info log")
```

## 数据库日志

如果想要查看数据库的执行SQL, 需要在 `database.yaml` 里进行配置

### 打印所有SQL

开启后，所有SQL会输出到标准输出里(控制台)，配置如下

```yaml
# config/database.yaml
ShowLog: true
SlowThreshold: 0
```

### 打印慢SQL

以打印执行超过200ms的为例，SQL会输出到标准输出里(控制台)，配置如下

```yaml
# config/database.yaml
ShowLog: false
SlowThreshold: 200ms
```
