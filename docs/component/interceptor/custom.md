---
id: custom
title: 自定义拦截器
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - custom gRPC interceptor
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/interceptor/custom
---

如果框架自带的拦截器都没有满足需求的，则可以自定义或者使用社区提供的拦截器。

## 自定义server中间件

### 步骤一：编写拦截器

```go
import (
  ...
  grpc2 "google.golang.org/grpc"
  ...
)
func UnaryServerInterceptorDemo() grpc2.UnaryServerInterceptor {
    return func(ctx context.Context, req interface{}, info *grpc2.UnaryServerInfo, handler grpc2.UnaryHandler) (_ interface{}, err error) {

      fmt.Println("======= demo before=======")
      defer func() {
        if err := recover(); err != nil {
          //打印错误堆栈信息
          fmt.Println(err)

        }
      }()

      resp, err := handler(ctx, req)

      fmt.Println("======= demo after=======")

      return resp, err
    }
}

```

### 步骤二：将拦截器加入到server中

```go
import (
  "github.com/go-eagle/eagle/pkg/transport/grpc"
)
  grpcServer := grpc.NewServer(
      grpc.Network("tcp"),
      grpc.Address(":9000"),
      grpc.Timeout(3*time.Second),
      grpc.UnaryInterceptor(UnaryServerInterceptorDemo()),
	)
```

到此自定义拦截器开发完毕，这里需要注意拦截器的顺序问题。

### 拦截器顺序demo

```go
import (
  ...
  grpc2 "google.golang.org/grpc"
  ...
)

func UnaryServerInterceptorDemo() grpc2.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc2.UnaryServerInfo, handler grpc2.UnaryHandler) (_ interface{}, err error) {

		fmt.Println("======= demo before=======")
		defer func() {
			if err := recover(); err != nil {
				//打印错误堆栈信息
				fmt.Println(err)

			}
		}()

		resp, err := handler(ctx, req)

		fmt.Println("======= demo after=======")

		return resp, err
	}
}

func UnaryServerInterceptorDemo2() grpc2.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc2.UnaryServerInfo, handler grpc2.UnaryHandler) (_ interface{}, err error) {

		fmt.Println("======= demo2 before=======")

		defer func() {
			if err := recover(); err != nil {
				//打印错误堆栈信息
				fmt.Println(err)

			}
		}()

		resp, err := handler(ctx, req)

		fmt.Println("======= demo2 after=======")
		return resp, err
	}
}
```

输出结果

```bash
======= demo before=======
======= demo2 before======
======= demo2 after=======
======= demo after========
```