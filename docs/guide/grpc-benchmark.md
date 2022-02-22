---
id: api-protobuf
title: gRPC 基准和负载测试
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /guide/grpc-benchmark
---

## gRPC 性能压测

### 概要

使用gRPC开发完成后，我们需要对其进行基准测试和负载测试。这里主要是对gRPC服务器端的负载进行测试。

这里我们推荐一个工具 ghz.

ghz 就是这样的负载测试工具，它是使用 Go 语言实现的命令行工具。它能够在本地对服务进行测试和调试，也能用在自动化持续集成环境中，实现性能回归测试.

### 安装 ghz

#### macOS(Homebrew)

```bash
brew install ghz
```

#### 编译安装

```bash
git clone https://github.com/bojand/ghz

cd ghz

# 这里编译包含 ghz本身和ghz-web
make build

#
./dist/ghz -h
```

### 使用

#### A simple insecure unary call

```bash
ghz --insecure \
    --proto ./helloworld/greeter.proto \
    --call helloworld.Greeter/SayHello \
    -d '{"name": "Eagle"}' \
    -n 10 \
    -c 5  \
	0.0.0.0:9090
```

输出结果

```bash
Summary:
  Count:        10
  Total:        10.92 ms
  Slowest:      5.73 ms
  Fastest:      0.34 ms
  Average:      2.91 ms
  Requests/sec: 915.64

Response time histogram:
  0.338 [1] |∎∎∎∎∎∎∎∎∎∎
  0.877 [4] |∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎
  1.417 [0] |
  1.957 [0] |
  2.496 [0] |
  3.036 [0] |
  3.575 [0] |
  4.115 [0] |
  4.654 [0] |
  5.194 [2] |∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎
  5.733 [3] |∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎

Latency distribution:
  10 % in 0.34 ms 
  25 % in 0.37 ms 
  50 % in 0.39 ms 
  75 % in 5.54 ms 
  90 % in 5.70 ms 
  95 % in 5.73 ms 
  99 % in 5.73 ms 

Status code distribution:
  [OK]   10 responses
```

更多example可以查看 https://ghz.sh/docs/examples

#### 结果输出到web查看

打开ghz-web控制台

```bash
./dist/ghz-web

# 可以看到web运行在80端口
...
⇨ http server started on [::]:80
...
```

控制台首页
![image](https://user-images.githubusercontent.com/3043638/155119046-edd3f5a0-a69d-4edf-8728-57fc73260fd6.png)

新建项目

在web控制台创建一个项目，供下面使用。

```bash
ghz --insecure \
    --proto ./helloworld/greeter.proto \
    --call helloworld.Greeter/SayHello \
    -d '{"name": "Eagle"}' \
    -n 10 \
    -c 5  \
    --tags '{"env": "staging", "created by":"Go Developer"}' \
    --name 'Greeter SayHello' \
    -O json \
    0.0.0.0:9090 | curl -H "Content-Type:application/json" -XPOST -d @- "http://localhost:80/api/projects/1/ingest"
```

之后就可以在控制台查看，效果如下
![image](https://user-images.githubusercontent.com/3043638/155119480-b7d55c1a-1471-4b85-80e2-465451cb566f.png)


## Reference

- [ghz官网](https://ghz.sh/)
- [bojand/ghz](https://github.com/bojand/ghz)
- [Exmaples](https://ghz.sh/docs/examples)
