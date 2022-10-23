---
id: grpc-benchmark
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

cp ./dist/ghz /usr/local/bin/

# 查看帮助
ghz -h
```

### 使用

#### A simple insecure unary call

```bash
ghz --insecure \
    --proto ./helloworld/greeter.proto \
    --call helloworld.Greeter/SayHello \
    -d '{"name": "Eagle"}' \
    -n 10000 \
    -c 100  \
	0.0.0.0:9090
```

输出结果

```bash
Summary:
  Count:        10000
  Total:        949.45 ms
  Slowest:      44.86 ms
  Fastest:      0.12 ms
  Average:      4.36 ms
  Requests/sec: 10532.46

Response time histogram:
  0.118  [1]    |
  4.591  [6064] |∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎
  9.065  [3006] |∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎
  13.539 [601]  |∎∎∎∎
  18.013 [239]  |∎∎
  22.486 [43]   |
  26.960 [19]   |
  31.434 [23]   |
  35.908 [3]    |
  40.381 [0]    |
  44.855 [1]    |

Latency distribution:
  10 % in 0.67 ms 
  25 % in 1.46 ms 
  50 % in 3.38 ms 
  75 % in 6.20 ms 
  90 % in 8.80 ms 
  95 % in 11.56 ms 
  99 % in 17.54 ms 

Status code distribution:
  [OK]   10000 responses
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
    -n 10000 \
    -c 100  \
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
