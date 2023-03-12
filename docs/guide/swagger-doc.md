---
id: http-guide
title: Swagger 文档
description: 基于OpenAPI 3生成的swagger接口文档
keywords:
  - Go
  - Eagle
  - http
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /guide/swagger-doc
---

Swagger文档

Swagger文档主要基于openapi v3版本生成，通过在 proto 里定义 option， 然后通过google开源的 `gnostic` 来生成。

## 文档定义

### 基本信息的定义

可以定义的基本信息包含
- 标题
- 版本
- 描述
- 联系人的姓名，Email
- 服务的环境名称及对应的接口地址
- 认证的方式, 比如JWT

举例如下

```proto
syntax = "proto3";

package api.micro.user.v1;

import "google/api/annotations.proto";
import "gogo/protobuf/gogo.proto";
import "openapiv3/annotations.proto";

option go_package = "github.com/go-microservice/ins-api/api/micro/user/v1;v1";

// 文档基本信息定义
option (openapi.v3.document) = {
  info: {
    title: "ins-api";
    version: "v1.0.0";
    description: "Description from annotation";
    contact: {
      name: "Contact Name";
      url: "https://github.com/go-microservice/ins-api";
      email: "";
    }
    license: {
      name: "MIT License";
      url: "https://github.com/go-microservice/ins-api/blob/main/LICENSE";
    }
  }
  servers: [
    {
      url: "http://localhost:8081";
      description: "测试环境";
    },
    {
      url: "http://api.go-microservice.io";
      description: "线上环境";
    }
  ]
  components: {
    security_schemes: {
      additional_properties: [
        {
          name: "bearerAuth";
          value: {
            security_scheme: {
              type: "http";
              scheme: "bearer";
              bearer_format: "JWT";
            }
          }
        }
      ]
    }
  }
  security: [
    {
      additional_properties: [
        {
          name: "bearerAuth";
          value: {
            value: []
          }
        }
      ]
    }
  ]
};
```

效果如下

![swagger-doc-demo](https://user-images.githubusercontent.com/3043638/224539211-433d8939-64e9-4045-bc33-67d171d429ee.png)

### 为service和message增加注释

如果想让service、method及字段在文档里都有比较清晰的说明，可以在对应proto的地方加上详细的注释，示例

```proto
syntax = "proto3";

package api.micro.moment.v1;

import "google/api/annotations.proto";
import "api/micro/user/v1/user.proto";
import "gogo/protobuf/gogo.proto";
import "openapiv3/annotations.proto";

option go_package = "github.com/go-microservice/ins-api/api/micro/moment/v1;v1";
option java_multiple_files = true;
option java_package = "api.micro.moment.v1";

// 评论接口
service CommentService {
	// 创建评论
	rpc CreateComment (CreateCommentRequest) returns (CreateCommentReply) {
		option (google.api.http) = {
			post: "/v1/comments"
			body: "*"
		};
	};
}

// 评论结构
message Comment {
	// 评论id
	string id = 1 [(gogoproto.jsontag) = "id"];
	// 帖子id
	int64 post_id = 2 [(gogoproto.jsontag) = "post_id"];
	// 用户信息
	api.micro.user.v1.User user = 3 [(gogoproto.jsontag) = "user"];
	// 评论内容
	string content = 4 [(gogoproto.jsontag) = "content"];
	// 根评论id
	int64 root_id = 5 [(gogoproto.jsontag) = "root_id"];
	// 父评论id
	int64 parent_id = 6 [(gogoproto.jsontag) = "parent_id"];
	// 点赞数
	int32 like_count = 7 [(gogoproto.jsontag) = "like_count"];
	// 回复数
	int32 reply_count = 8 [(gogoproto.jsontag) = "reply_count"];
	// 分数
	int64 score = 9 [(gogoproto.jsontag) = "score"];
	// 删除标记
	int32 del_flag = 10 [(gogoproto.jsontag) = "del_flag"];
	// 创建时间
	int64 created_at = 11 [(gogoproto.jsontag) = "created_at"];
	// 更新时间
	int64 updated_at = 12 [(gogoproto.jsontag) = "updated_at"];
	// 设备类型 iOS/Android
	string device_type = 13 [(gogoproto.jsontag) = "device_type"];
	// 用户id
	string ip = 14 [(gogoproto.jsontag) = "ip"];
}

message CreateCommentRequest {
    // 帖子id
	int64 post_id = 1;
	// 发布评论的uid
	int64 user_id = 2;
	// 评论的具体内容
	string content = 3;
	// 评论的根id
	int64 root_id = 4;
	// 评论的上一级id
	int64 parent_id = 5;
	// 设备类型，比如iOS, Android
	string device_type = 6;
	// 评论人的ip地址
	string ip = 7;
}
message CreateCommentReply {
	Comment comment = 1;
}
```

### 使用脚本生成文档

通过下面的命令可以生成一个文件：`openapi.yaml`，位于根目录的docs目录下， 然后通过对应的js和css进行渲染。

```bash
make grpc
make openapi
```

最后开启web server后即可进行访问，访问地址：`http://localhost:8081/docs`

## Reference

- https://github.com/google/gnostic/blob/main/openapiv3/OpenAPIv3.proto
- https://github.com/google/gnostic/blob/main/cmd/protoc-gen-openapi/examples/tests/openapiv3annotations/message.proto
- https://swagger.io/docs/specification/basic-structure/