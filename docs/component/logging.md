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

## 接口定义

为了方便适配不通的日志接入，这里定义了几个接口

```go
// github.com/go-eagle/eagle/pkg/log/logger.go

type Logger interface {
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
  Level: info      # 日志级别，INFO, WARN, ERROR
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

```
