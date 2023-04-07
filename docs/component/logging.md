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

配置文件位于 `config` 目录下，文件名为：`logger`
如果是多环境配置，可以是 `config/{env}/logger.yaml`

```yaml
# config/logger.yaml
  Development: false
  DisableCaller: false
  DisableStacktrace: false
  Encoding: json   # json or console
  Level: info      # 日志级别，DEBUG、INFO、WARN、ERROR
  Name: eagle
  Writers: console # file or console
  LoggerFile: /tmp/log/eagle.log           # 所有level的日志文件
  LoggerWarnFile: /tmp/log/eagle.wf.log    # 仅记录warn的日志文件
  LoggerErrorFile: /tmp/log/eagle.err.log  # 仅记录error的日志文件
  LogRollingPolicy: daily   # 日志切割方式: daily/hourly，默认按天(daily)进行切割
  LogBackupCount: 7         # 日志备份数
```

下面通过打印5条日志来查看各参数的打印效果
```bash
  logger.Debug("hello debug")
	logger.Info("hello info")
	logger.Warn("hello warn")
	logger.Error("hello error")
	logger.WithFields(logger.Fields{"key1": "val1", "key2": 100}).Info("test with multiple key")
```

### Development

是否是开发环境，可选值：`true` 和 `false`，默认为`false`, 示例

```bash
# 设为true
{"L":"INFO","T":"2023-04-07T18:57:46.759+0800","C":"user-service/main.go:80","M":"hello info","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}

# 设为false
{"level":"info","ts":"2023-04-07T18:56:48.342+0800","caller":"user-service/main.go:80","msg":"hello info","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}
```

### DisableCaller 

是否打印日志的文件调用文件和行号，即日志文件里的 `caller` 字段。
> 开启后会有一定的性能损耗，但基本大部分场景可以忽略

### Encoding

打印的日志格式，默认为 `json`, 也可以修改为存文本格式，可选值为：`json` 和 `console`

```bash
# 设为 json
{"level":"info","ts":"2023-04-07T18:56:48.342+0800","caller":"user-service/main.go:80","msg":"hello info","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}

# 设为 console
2023-04-07T19:09:27.773+0800    INFO    user-service/main.go:80 hello info      {"ip": "10.61.160.72", "app_id": "user-svc", "instance_id": "localhost"}
```

### Level

配置的日志级别，本地和测试可以开启为 `debug`，生产环境可以配置为 `warn`。

开启 `debug` 的日志效果

```bash
{"level":"debug","ts":"2023-04-07T19:19:42.950+0800","caller":"user-service/main.go:79","msg":"hello debug","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}
{"level":"info","ts":"2023-04-07T19:19:42.950+0800","caller":"user-service/main.go:80","msg":"hello info","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}
{"level":"warn","ts":"2023-04-07T19:19:42.950+0800","caller":"user-service/main.go:81","msg":"hello warn","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}
{"level":"error","ts":"2023-04-07T19:19:42.950+0800","caller":"user-service/main.go:82","msg":"hello error","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}
```

开启 `warn` 的日志效果

```bash
{"level":"warn","ts":"2023-04-07T19:20:25.446+0800","caller":"user-service/main.go:81","msg":"hello warn","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}
{"level":"error","ts":"2023-04-07T19:20:25.446+0800","caller":"user-service/main.go:82","msg":"hello error","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}
```

对比发现，日志只会打印当前及以下级别的日志，具体如下：
- debug 会打印 debug、info、warn、error 级别的日志
- info 会打印 info、warn、error 级别的日志
- warn 会打印 warn、error 级别的日志
- error 只会打印级别的日志

所以建议生产环境开启 `warn` 或 `error` 级别的日志。 

### Name

服务名，对应到日志里就是 `app_id` 字段。


### Writers

其中 `Writers` 是日志需要输出到的位置，值为 `file` 或 `console`，选择file会将日志记录到logger_file指定的日志文件中，选择console会将日志输出到标准输出，当然也可以两者同时选择。

- `LoggerFile` 默认输出的日志文件名
- `LoggerWarnFile` warn 输出的日志文件名
- `LoggerErrorFile` error 输出的日志文件名

> 本地开发环境可以开启console、关闭日志，测试环境和生产环境只输出到文件


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

// 打印多字段
logger.WithFields(logger.Fields{"key1": "val1", "key2": 100}).Info("test with multiple key")
// Output:
// {"level":"info","ts":"2023-04-07T19:25:24.360+0800","caller":"user-service/main.go:83","msg":"test with multiple key","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost","key1":"val1","key2":100}
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
