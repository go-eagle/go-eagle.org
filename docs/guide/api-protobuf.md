---
id: api-protobuf
title: 开发规范 - Protobuf
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /guide/api-protobuf
---

## 概述

API接口统一以HTTP/GRPC为基础，并通过Protobuf进行协议定义，包括完整的Request/Reply，以及对应的接口错误码（Errors）。

> 这里主要进行修订Proto规范约定和多语言之间特定商定，帮助大家写出更标准的接口。

## 目录结构

API 接口(Proto)管理的两种方式：

### 1. 定义到项目里

项目中定义Proto, 以api包为包名根目录:

```bash
eagle-demo：
|____api // 服务API定义
| |____eagle
| | |____demo
| | | |____v1
| | | | |____demo.proto
```

### 2. 在统一仓库中进行集中式管理

类似 [googleapis](https://github.com/googleapis/googleapis).

```bash
eagle-apis:
|____api // 服务API定义
| |____egale
| | |____demo
| | | |____v1
| | | | |____demo.proto
|____annotations // 注解定义options
|____third_party // 第三方引用
```

## 包名

包名为应用的标识（APP_ID），用于生成gRPC请求路径，或者Proto之间进行引用Message；

`my.package.v1`，为API目录，定义service相关接口，用于提供业务使用，例如：

```proto
// RequestURL: /<package_name>.<version>.<service_name>/{method}
package <package_name>.<version>;
```

**go_package**

```proto
option go_package = "github.com/go-eagle/eagle/<package_name>;<version>";
```

**java_package**

```proto
option java_multiple_files = true;
option java_package = "com.github.eagle.<package_name>.<version>";
```

## Version

该版本号为标注不兼容版本，并且会在<package_name>中进行区分，当接口需要重构时一般会更新不兼容结构；

## Import

- 业务proto依赖，以根目录进行引入对应依赖的proto；
- third_party，主要为依赖的第三方proto，比如protobuf、google rpc、google apis、gogo定义；

## 命名规范

### 目录结构​

包名为小写，并且同目录结构一致，例如：`my/package/v1/`

```proto
package my.package.v1;
```

### 文件结构

文件应该命名为：`lower_snake_case.proto` 所有Proto应按下列方式排列:

1. License header (if applicable)
2. File overview
3. Syntax
4. Package
5. Imports (sorted)
6. File options
7. Everything else

### Message 和 字段命名​

使用驼峰命名法（首字母大写）命名 message，例子：SongServerRequest 使用下划线命名字段，例子：song_name

```proto
message SongServerRequest {
  required string song_name = 1;
}
```

使用上述这种字段的命名约定，生成的访问器将类似于如下代码：

```proto
Java:
  public String getSongName() { ... }
  public Builder setSongName(String v) { ... }
```

### 数组 Repeated​

通过repeated关键字定义数组（List）

```proto
repeated string keys = 1;
...
repeated Account accounts = 17;
```

### 枚举 Enums​

使用驼峰命名法（首字母大写）命名枚举类型，使用 “大写下划线大写” 的方式命名枚举值：

```proto
enum Foo {
  FIRST_VALUE = 0;
  SECOND_VALUE = 1;
}
```

每一个枚举值以分号结尾，而非逗号。

### 服务 Services​

如果你在 .proto 文件中定义 RPC 服务，你应该使用驼峰命名法（首字母大写）命名 RPC 服务以及其中的 RPC 方法：

```proto
service FooService {
  rpc GetSomething(FooRequest) returns (FooResponse);
}
```

## Comment

- Service，描述清楚服务的作用
- Method，描述清楚接口的功能特性
- Field，描述清楚字段准确的信息

## Example

API Service接口定义(demo.proto)

```proto
syntax = "proto3";

package eagle.demo.v1;

// 多语言特定包名，用于源代码引用
option go_package = "github.com/go-eagle/eagle/demo/v1;v1";
option java_multiple_files = true;
option java_package = "com.github.eagle.demo.v1";
option objc_class_prefix = "EagleDemoV1";

// 描述该服务的信息
service Greeter {
    // 描述该方法的功能
    rpc SayHello (HelloRequest) returns (HelloReply);
}
// Hello请求参数
message HelloRequest {
    // 用户名字
    string name = 1;
}
// Hello返回结果
message HelloReply {
    // 结果信息
    string message = 1;
}
```

## References

- https://grpc.io/docs/languages/go/quickstart/
- https://developers.google.com/protocol-buffers/docs/proto3
- https://grpc.io/docs/guides/error/
- https://github.com/avinassh/grpc-errors/blob/master/go/client.go
- https://stackoverflow.com/questions/64828054/differences-between-protoc-gen-go-and-protoc-gen-go-grpc
- https://jbrandhorst.com/post/grpc-errors/
- https://godoc.org/google.golang.org/genproto/googleapis/rpc/errdetails
- https://cloud.google.com/apis/design/errors
- https://github.com/grpc/grpc/blob/master/doc/health-checking.md