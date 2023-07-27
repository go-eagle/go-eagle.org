---
id: errors
title: 错误处理
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/errors
---

## Error 规范

Eagle 为微服务提供了统一的 Error 模型:

```go
type Error struct {
	code    int      `json:"code"`
	msg     string   `json:"msg"`
	details []string `json:"details"`
}
```

- `code` 业务错误码，用于外部展示
- `msg` 错误信息，可以帮助用户轻松地理解和解决API错误
- `details` 具体的错误原因，可以用来更详细的错误判定

> 1. 强制规范错误的使用，避免了开发中直接透传 Go 的 error, 从而导致一些敏感信息泄露  
> 2. Error中的 `StatusCode` 方法会将错误码转换为 `HTTP 状态码`，方便监控和告警处理

## 错误码定义

### 系统错误

框架定好了一些常用的错误，可以直接使用。

```go
// github.com/go-eagle/eagle/pkg/errors/code.go
Success               = NewError(0, "Success")
ErrInternalServer     = NewError(10001, "Internal server error")
ErrBind               = NewError(10002, "Bind request error")
ErrInvalidParam       = NewError(10003, "Invalid params")
ErrSignParam          = NewError(10004, "Invalid sign")
ErrValidation         = NewError(10005, "Validation failed")
ErrDatabase           = NewError(10006, "Database error")
ErrToken              = NewError(10007, "Gen token error")
ErrInvalidToken       = NewError(10108, "Invalid token")
ErrTokenTimeout       = NewError(10109, "Token timeout")
ErrTooManyRequests    = NewError(10110, "Too many request")
ErrInvalidTransaction = NewError(10111, "Invalid transaction")
ErrEncrypt            = NewError(10112, "Encrypting the user password error")
ErrLimitExceed        = NewError(10113, "Beyond limit")
ErrServiceUnavailable = NewError(10114, "Service Unavailable")
```

### 业务错误

业务错误码可以单独定义，可以放到一个文件或者根据功能分离到多个文件。

示例：用户错误码定义

```go
// github.com/go-eagle/eagle/internal/ecode/user.go
ErrUserNotFound          = errcode.NewError(20101, "The user was not found.")
ErrPasswordIncorrect     = errcode.NewError(20102, "账号或密码错误")
ErrAreaCodeEmpty         = errcode.NewError(20103, "手机区号不能为空")
ErrPhoneEmpty            = errcode.NewError(20104, "手机号不能为空")
...
```

## 使用方式

在handler中返回错误，有以下两种方式

### 方式一: errors.New()

在底层(`service`)通过 `errors.New()` 的方式返回时

```go
var req FollowRequest
if err := c.ShouldBindJSON(&req); err != nil {
  log.Warnf("follow bind param err: %v", err)
  response.Error(c, errcode.ErrBind.WithDetails(err.Error()))
  return
}
```

### 方式二: 错误码

底层(`service`)通过 `系统` 或 `自定义` 错误码返回，比如 `errcode.ErrInternalServer` 或 `ecode.ErrUserNotFound`

```go
var req FollowRequest
if err := c.ShouldBindJSON(&req); err != nil {
  log.Warnf("follow bind param err: %v", err)
  response.Error(c, err)
  return
}
```

## 如何处理错误

分层架构下，比较常见的错误处理方式，是在处理错误的地方进行打日志，如下：

```go
// handler / controller
res, err := service.GetById(ctx, id)
if err != nil {
    log.Errorf(ctx, "GetById failed, id=%s, error=%v", err)
    ······
}
······
  
// service  
article, err := dao.GetById(ctx, id)
if err != nil {
    log.Errorf(ctx, fmt.Errorf("[service] GetById failed, error=%v", err))
    return fmt.Errorf("[service] GetById failed, error=%v", err)
}
······

// dao/respository
······
if err != nil {
    log.Errorf(ctx, fmt.Errorf("[dao] GetById failed, id=%s, error=%v", id, err))
    return fmt.Errorf("[dao] GetById failed, id=%s, error=%v", id, err)
}
```

以上错误处理的方式，在每一层都打印一条错误日志，然后对得到的 error 进行二次封装。虽然这种处理方式可以使我们在查看日志时方便排查故障和定位问题，同时提供了错误的上下文信息，但也存在以下问题：

- 每层都打印日志，带来了大量日志；
- 字符串拼接费时费力，缺乏统一规范，可能导致理解困难；
- 通过字符串拼接，获得新 error，破坏了原始 error，会导致等值判定失败，难以获取详细的堆栈关联。

### 分层下的最佳 error 处理方式

错误处理的最佳实践是遵循以下建议，这样可以更好地处理 error ：

- 1、一个 error，应该只被处理一次
- 2、让 error 包含更多的信息
- 3、原始 error，应保证完整性，不被破坏
- 4、error 需要被日志记录

示例如下

```go
// handler / controller  
res, err := service.GetById(ctx, id)  
if err != nil {
  // 打印根因
  log.Errorf(ctx, "GetById failed, original error: %T %v", errors.Cause(err), errors.Cause(err))
  // 或 打印堆栈
  log.Errorf(ctx, "stack trace: \n%+v\n", err)  
······  
}  
······  
  
// service  
article, err := dao.GetById(ctx, id)  
if err != nil {
  // 只附加额外的信息
  return errors.WithMessage(err, "[service] GetById failed")  
}  
······  
  
// respository/dao
······  
if err != nil {
  // 保留根因、提供堆栈信息、并添加额外的上下文信息
  return errors.Wrapf(err, "[dao] GetById failed, id=%s, error=%v", id, err)  
}  
······
```

## Reference

- https://mp.weixin.qq.com/s/FkqCidcHlH2cadtsSft-ig

