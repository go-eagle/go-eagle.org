"use strict";(self.webpackChunkgo_eagle_org_2=self.webpackChunkgo_eagle_org_2||[]).push([[5564],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return m}});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=r.createContext({}),l=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=l(e.components);return r.createElement(s.Provider,{value:n},e.children)},g={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),d=l(t),m=o,c=d["".concat(s,".").concat(m)]||d[m]||g[m]||a;return t?r.createElement(c,i(i({ref:n},u),{},{components:t})):r.createElement(c,i({ref:n},u))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=d;var p={};for(var s in n)hasOwnProperty.call(n,s)&&(p[s]=n[s]);p.originalType=e,p.mdxType="string"==typeof e?e:o,i[1]=p;for(var l=2;l<a;l++)i[l]=t[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},4810:function(e,n,t){t.r(n),t.d(n,{contentTitle:function(){return s},default:function(){return d},frontMatter:function(){return p},metadata:function(){return l},toc:function(){return u}});var r=t(7462),o=t(3366),a=(t(7294),t(3905)),i=["components"],p={id:"http-guide",title:"\u5f00\u53d1\u6d41\u7a0b - HTTP",description:"HTTP API \u5f00\u53d1\u6d41\u7a0b Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",keywords:["Go","Eagle","http","Toolkit","Framework","Microservices","HTTP"],slug:"/guide/http-guide"},s=void 0,l={unversionedId:"guide/http-guide",id:"guide/http-guide",isDocsHomePage:!1,title:"\u5f00\u53d1\u6d41\u7a0b - HTTP",description:"HTTP API \u5f00\u53d1\u6d41\u7a0b Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",source:"@site/docs/guide/http-guide.md",sourceDirName:"guide",slug:"/guide/http-guide",permalink:"/docs/guide/http-guide",editUrl:"https://github.com/go-eagle/go-eagle.org/edit/main/docs/guide/http-guide.md",version:"current",frontMatter:{id:"http-guide",title:"\u5f00\u53d1\u6d41\u7a0b - HTTP",description:"HTTP API \u5f00\u53d1\u6d41\u7a0b Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",keywords:["Go","Eagle","http","Toolkit","Framework","Microservices","HTTP"],slug:"/guide/http-guide"},sidebar:"docs",previous:{title:"\u5f00\u53d1\u6d41\u7a0b - gRPC",permalink:"/docs/guide/grpc-guide"},next:{title:"gRPC \u57fa\u51c6\u548c\u8d1f\u8f7d\u6d4b\u8bd5",permalink:"/docs/guide/grpc-benchmark"}},u=[{value:"\u7eaf\u624b\u5199",id:"\u7eaf\u624b\u5199",children:[]},{value:"CLI \u751f\u6210",id:"cli-\u751f\u6210",children:[{value:"\u751f\u6210API",id:"\u751f\u6210api",children:[]},{value:"\u7ed1\u5b9a\u8def\u7531",id:"\u7ed1\u5b9a\u8def\u7531",children:[]},{value:"\u542f\u52a8\u5e94\u7528\u5e76\u9a8c\u8bc1",id:"\u542f\u52a8\u5e94\u7528\u5e76\u9a8c\u8bc1",children:[]}]},{value:"\u901a\u8fc7proto\u5b9a\u4e49\u751f\u6210",id:"\u901a\u8fc7proto\u5b9a\u4e49\u751f\u6210",children:[{value:"\u5b9a\u4e49 proto",id:"\u5b9a\u4e49-proto",children:[]},{value:"\u751f\u6210 HTTP API\u53ca\u8def\u7531",id:"\u751f\u6210-http-api\u53ca\u8def\u7531",children:[]},{value:"\u751f\u6210\u81ea\u5b9a\u4e49 tag",id:"\u751f\u6210\u81ea\u5b9a\u4e49-tag",children:[]},{value:"\u8fd0\u884c\u5e76\u9a8c\u8bc1",id:"\u8fd0\u884c\u5e76\u9a8c\u8bc1",children:[]},{value:"\u5e38\u89c1\u95ee\u9898",id:"\u5e38\u89c1\u95ee\u9898",children:[]}]},{value:"Reference",id:"reference",children:[]}],g={toc:u};function d(e){var n=e.components,t=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},g,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"\u751f\u6210 HTTP API(hanlder) \u6709\u4e09\u79cd\u65b9\u5f0f"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7eaf\u624b\u5199"),(0,a.kt)("li",{parentName:"ul"},"CLI \u751f\u6210"),(0,a.kt)("li",{parentName:"ul"},"\u901a\u8fc7proto\u5b9a\u4e49\u751f\u6210")),(0,a.kt)("h2",{id:"\u7eaf\u624b\u5199"},"\u7eaf\u624b\u5199"),(0,a.kt)("p",null,"\u7ecf\u5e38\u5199\u4e00\u4e2a\u65b0\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"HTTP API")," \u65f6\uff0c\u6211\u4eec\u53ef\u80fd\u4f1a\u624b\u52a8\u7f16\u5199API\uff0c\u6216\u8005copy\u4e00\u4e2a\u5df2\u6709\u7684\uff0c\u7136\u540e\u8fdb\u884c\u4fee\u6539\uff0c\u4f46\u8fd9\u79cd\u6548\u7387\u8f83\u4f4e\u4e14\u5bb9\u6613\u51fa\u9519\u3002"),(0,a.kt)("p",null,"\u6240\u4ee5\u6211\u4eec\u63d0\u4f9b\u4e86\u4e0b\u9762\u4e24\u79cd\u751f\u6210\u7684\u65b9\u5f0f\u3002"),(0,a.kt)("h2",{id:"cli-\u751f\u6210"},"CLI \u751f\u6210"),(0,a.kt)("h3",{id:"\u751f\u6210api"},"\u751f\u6210API"),(0,a.kt)("p",null,"\u4f7f\u7528 eagle \u81ea\u5e26\u7684\u547d\u4ee4\u884c\u5de5\u5177"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"eagle hanlder add Demo\n\n# internal/hanlder/v1\ndemo.go\n\n# \u5982\u679c\u662f\u60f3\u751f\u6210\u5230v2\u76ee\u5f55\u4e0b\uff0c\u53ef\u4ee5\u4ee5\u4e0b\u547d\u4ee4\neagle handler add -version=v2 Demo \n")),(0,a.kt)("p",null,"\u751f\u6210\u7684\u5185\u5bb9\u5982\u4e0b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'// internal/handler/v1/demo.go\npackage handler\n\nimport (\n    "github.com/gin-gonic/gin"\n\n    "github.com/go-eagle/eagle/pkg/app"\n    "github.com/go-eagle/eagle/pkg/log"\n)\n\n// Demo demo\n// @Summary demo\n// @Description demo\n// @Tags system\n// @Accept  json\n// @Produce  json\n// @Router /demo [get]\nfunc Demo(c *gin.Context) {\n    // here add your code\n\n    app.Success(c, gin.H{})\n}\n')),(0,a.kt)("h3",{id:"\u7ed1\u5b9a\u8def\u7531"},"\u7ed1\u5b9a\u8def\u7531"),(0,a.kt)("p",null,"\u6700\u540e\u9700\u8981\u5728\u8def\u7531\u6587\u4ef6\u4e2d\u52a0\u5165\u4f60\u5b9a\u4e49\u7684API"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'// internal/routes/router.go\n\n...\n  // v1 router\n    apiV1 := g.Group("/v1")\n    apiV1.Use()\n    {\n        apiV1.GET("/demo", handler.Demo)\n    }\n...\n')),(0,a.kt)("h3",{id:"\u542f\u52a8\u5e94\u7528\u5e76\u9a8c\u8bc1"},"\u542f\u52a8\u5e94\u7528\u5e76\u9a8c\u8bc1"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"go run main.go\n\n# curl http://localhost:8000/v1/demo\n")),(0,a.kt)("h2",{id:"\u901a\u8fc7proto\u5b9a\u4e49\u751f\u6210"},"\u901a\u8fc7proto\u5b9a\u4e49\u751f\u6210"),(0,a.kt)("p",null,"\u5982\u679c\u5bf9proto\u6bd4\u8f83\u719f\u6089\u7684\u540c\u5b66\uff0c\u53ef\u80fd\u66f4\u559c\u6b22\u901a\u8fc7\u5b9a\u4e49proto\u6587\u4ef6\u6765\u751f\u6210\u5bf9\u4e00\u4e2a\u7684HTTP API\u3002"),(0,a.kt)("p",null,"\u4e3b\u8981\u6709\u4ee5\u4e0b\u51e0\u4e2a\u6b65\u9aa4"),(0,a.kt)("h3",{id:"\u5b9a\u4e49-proto"},"\u5b9a\u4e49 proto"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-protobuf"},'syntax = "proto3";\n\npackage api.micro.user.v1;\n\nimport "google/api/annotations.proto";\n\noption go_package = "github.com/go-microservice/ins-api/api/micro/user/v1;v1";\n\nservice UserService {\n  // auth\n  rpc Register(RegisterRequest) returns (RegisterReply) {\n    option (google.api.http) = {\n      post: "/v1/auth/register"\n      body: "*"\n    };\n  }\n  rpc Login(LoginRequest) returns (LoginReply) {\n    option (google.api.http) = {\n      post: "/v1/auth/login"\n      body: "*"\n    };\n  }\n  rpc Logout(LogoutRequest) returns (LogoutReply) {\n    option (google.api.http) = {\n      post: "/v1/auth/logout"\n      body: "*"\n    };\n  }\n\n  // user\n  rpc CreateUser(CreateUserRequest) returns(CreateUserReply) {\n    option (google.api.http) = {\n      post: "/v1/users"\n      body: "*"\n    };\n  }\n  rpc GetUser(GetUserRequest) returns (GetUserReply) {\n    option (google.api.http) = {\n      get: "/v1/users/info"\n    };\n  }\n  rpc UpdateUser(UpdateUserRequest) returns (UpdateUserReply) {\n    option (google.api.http) = {\n      put: "/v1/users/{user_id}"\n      body: "*"\n    };\n  }\n  rpc UpdatePassword(UpdatePasswordRequest) returns (UpdatePasswordReply) {\n    option (google.api.http) = {\n      patch: "/v1/users/password/{user_id}"\n      body: "*"\n    };\n  }\n}\n\nenum StatusType {\n  NORMAL = 0;\n  DELETE = 1;\n  Ban = 2;\n}\n\nenum GenderType {\n  UNKNOWN = 0;\n  MALE = 1;\n  FEMALE = 2;\n};\n\n// user info\nmessage User {\n  int64 id = 1;\n  string username = 2;\n  string email =3;\n  string phone = 4;\n  int64  login_at = 5;\n  StatusType status = 6;\n  string nickname = 7;\n  string avatar = 8;\n  GenderType gender = 9;\n  string birthday = 10;\n  string bio = 11;\n  int64 created_at = 12;\n  int64 updated_at = 13;\n}\n\nmessage RegisterRequest {\n  string username = 1;\n  string email = 2;\n  string password = 3;\n}\n\nmessage RegisterReply {\n  int64 id = 1;\n  string username = 2;\n}\n\nmessage LoginRequest {\n  string username = 1;\n  string email = 2;\n  string password = 3;\n}\n\nmessage LoginReply {\n  string token = 1;\n}\n\nmessage LogoutRequest {\n  int64 id = 1;\n  string token = 2;\n}\n\nmessage LogoutReply {\n}\n\nmessage CreateUserRequest {\n  string username = 1;\n  string email = 2;\n  string password = 3;\n}\n\nmessage CreateUserReply {\n  int64 id = 1;\n  string username = 2;\n  string email = 3;\n}\n\nmessage UpdateUserRequest {\n  int64 user_id = 1;\n  string username = 2;\n  string email = 3;\n  string phone = 4;\n  int64  login_at = 5;\n  StatusType status = 6;\n  string nickname = 7;\n  string avatar = 8;\n  GenderType gender = 9;\n  string birthday = 10;\n  string bio = 11;\n  int64 updated_at = 13;\n}\n\nmessage UpdateUserReply {\n\n}\n\nmessage UpdatePasswordRequest {\n  int64 user_id = 1;\n  string password = 2;\n}\n\nmessage UpdatePasswordReply {\n\n}\n\nmessage GetUserRequest {\n  int64 id = 1;\n}\n\nmessage GetUserReply {\n  User user = 1;\n}\n\nmessage BatchGetUsersRequest {\n  repeated int64 ids = 1;\n}\n\nmessage BatchGetUsersReply {\n  repeated User users = 1;\n}\n')),(0,a.kt)("h3",{id:"\u751f\u6210-http-api\u53ca\u8def\u7531"},"\u751f\u6210 HTTP API\u53ca\u8def\u7531"),(0,a.kt)("p",null,"\u8fd9\u91ccAPI\u548c\u8def\u7531\u5b8c\u5168\u4e0d\u9700\u8981\u624b\u52a8\u4e66\u5199\uff0c\u5168\u90e8\u901a\u8fc7\u547d\u4ee4\u751f\u6210\u5373\u53ef\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"make http\n")),(0,a.kt)("p",null,"\u8fd0\u884c\u5b8c\u6b64\u547d\u4ee4\u540e\uff0c\u4f1a\u591a\u4e00\u4e2a ",(0,a.kt)("inlineCode",{parentName:"p"},"user_gin.pb.go")," \u6587\u4ef6\uff0c\u91cc\u9762\u5305\u542b\u4e86\u63a5\u53e3\u5b9a\u4e49\u548c\u8def\u7531\u7684\u6ce8\u518c\u3002"),(0,a.kt)("h3",{id:"\u751f\u6210\u81ea\u5b9a\u4e49-tag"},"\u751f\u6210\u81ea\u5b9a\u4e49 tag"),(0,a.kt)("p",null,"\u5982\u679c\u662f\u4f7f\u7528\u4e86\u4e00\u4e9b\u81ea\u5b9a\u4e49tag, \u90a3\u4e48\u9700\u8981\u901a\u8fc7\u5982\u4e0b\u547d\u4ee4\u6765\u751f\u6210\u7ed1\u5b9a\u7684struct\u4e0a"),(0,a.kt)("p",null,"\u5e38\u89c1\u7684tag\u6709\u4e24\u79cd\uff1a ",(0,a.kt)("inlineCode",{parentName:"p"},"uri")," \u548c ",(0,a.kt)("inlineCode",{parentName:"p"},"form")),(0,a.kt)("h4",{id:"uri-tag"},"URI tag"),(0,a.kt)("p",null,"\u5728\u4f7f\u7528uri\u53c2\u6570(",(0,a.kt)("inlineCode",{parentName:"p"},"/v1/users/:id"),")\u7684\u65f6\u5019\u4f1a\u7528\u5230 ",(0,a.kt)("inlineCode",{parentName:"p"},"uri")," tag, \u5426\u5219\u53c2\u6570\u65e0\u6cd5\u88ab\u63a5\u6536\u5230\u3002 \u5b9a\u4e49\u5982\u4e0b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-protobuf"},'message GetUserRequest {\n    // @gotags: uri:"id"\n    int64 id = 1;\n}\n')),(0,a.kt)("p",null,"\u4f7f\u7528\u547d\u4ee4\u6210 tag"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"protoc-go-inject-tag -input=./api/micro/user/v1/user.pb.go\n")),(0,a.kt)("p",null,"\u751f\u6210\u7ed3\u679c\u5982\u4e0b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'// \u8def\u7531: http://localhost/v1/user/:id\n\n// \u751f\u6210\u524d user.pb.go\ntype GetUserRequest struct {\n    state         protoimpl.MessageState\n    sizeCache     protoimpl.SizeCache\n    unknownFields protoimpl.UnknownFields\n\n    // @gotags: uri:"id"\n    Id int64 `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`\n}\n\n// \u751f\u6210\u540e user.pb.go\ntype GetPostRequest struct {\n    state         protoimpl.MessageState\n    sizeCache     protoimpl.SizeCache\n    unknownFields protoimpl.UnknownFields\n\n    // @gotags: uri:"id"\n    Id int64 `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty" uri:"id"`\n}\n')),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u6ce8\u610f\uff1aId \u5b57\u6bb5\u6700\u540e\u9762\u591a\u4e86\u4e00\u4e2a uri tag \u54e6")),(0,a.kt)("p",null,"\u8fd9\u6837\u6211\u4eec\u5c31\u53ef\u4ee5\u5b8c\u7f8e\u7684\u63a5\u6536 uri \u91cc\u5b9a\u4e49\u7684\u53c2\u6570\u4e86\u3002"),(0,a.kt)("h4",{id:"form-tag"},"form tag"),(0,a.kt)("p",null,"\u5728\u4f7f\u7528query\u53c2\u6570\u7684\u65f6\u5019\u4f1a\u7528\u5230 ",(0,a.kt)("inlineCode",{parentName:"p"},"form")," tag, \u5426\u5219\u53c2\u6570\u65e0\u6cd5\u88ab\u63a5\u6536\u5230\u3002 \u5b9a\u4e49\u5982\u4e0b:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-protobuf"},'message ListUserRequest {\n    // @gotags: form:"last_id"\n    int64 last_id = 1;\n    // @gotags: form:"limit"\n    int32 limit = 2;\n}\n')),(0,a.kt)("p",null,"\u4f7f\u7528\u547d\u4ee4\u6210 tag"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"protoc-go-inject-tag -input=./api/micro/user/v1/user.pb.go\n")),(0,a.kt)("p",null,"\u751f\u6210\u7ed3\u679c\u5982\u4e0b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'// \u8def\u7531: http://localhost/v1/users?limit=10&last_id=200\n\n// \u751f\u6210\u524d user.pb.go\ntype ListUserRequest struct {\n    state         protoimpl.MessageState\n    sizeCache     protoimpl.SizeCache\n    unknownFields protoimpl.UnknownFields\n\n    // @gotags: form:"last_id"\n    LastId int64 `protobuf:"varint,1,opt,name=last_id,json=lastId,proto3" json:"last_id,omitempty"`\n    // @gotags: form:"limit"\n    Limit int32 `protobuf:"varint,2,opt,name=limit,proto3" json:"limit,omitempty"`\n}\n\n// \u751f\u6210\u540e user.pb.go\ntype ListUserRequest struct {\n    state         protoimpl.MessageState\n    sizeCache     protoimpl.SizeCache\n    unknownFields protoimpl.UnknownFields\n\n    // @gotags: form:"id"\n    LastId int64 `protobuf:"varint,1,opt,name=last_id,json=lastId,proto3" json:"last_id,omitempty" form:"id"`\n    // @gotags: form:"id"\n    Limit int32 `protobuf:"varint,2,opt,name=limit,proto3" json:"limit,omitempty" form:"id"`\n}\n')),(0,a.kt)("p",null,"\u8fd9\u6837\u6211\u4eec\u5c31\u53ef\u4ee5\u5b8c\u7f8e\u7684\u63a5\u6536 query \u91cc\u5b9a\u4e49\u7684\u53c2\u6570\u4e86\u3002"),(0,a.kt)("p",null,"\u5b8c\u6574\u793a\u4f8b\u53ef\u53c2\u8003\uff1a",(0,a.kt)("a",{parentName:"p",href:"https://github.com/go-microservice/ins-api"},"https://github.com/go-microservice/ins-api")),(0,a.kt)("h3",{id:"\u8fd0\u884c\u5e76\u9a8c\u8bc1"},"\u8fd0\u884c\u5e76\u9a8c\u8bc1"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"go run main.go\n\n# curl http://localhost:8000/v1/demo\n")),(0,a.kt)("p",null,"\u606d\u559c\u4f60\uff0c\u5df2\u7ecf\u5b66\u4f1a\u4e86\u8fd9\u4e09\u79cd\u5b9a\u4e49handler\u7684\u65b9\u5f0f\u3002"),(0,a.kt)("h3",{id:"\u5e38\u89c1\u95ee\u9898"},"\u5e38\u89c1\u95ee\u9898"),(0,a.kt)("p",null,"Q: \u5728\u8f93\u51fajson\u65f6\uff0c\u5bf9\u4e8e\u5b57\u6bb5\u4e3a\u96f6\u503c\u7684\u5b57\u6bb5\u6ca1\u6709\u88ab\u8fd4\u56de\uff0c\u5bf9\u4e8e\u524d\u7aef\u6216\u5ba2\u6237\u7aef\u4e0d\u592a\u53cb\u597d\uff0c\u8be5\u600e\u4e48\u5904\u7406\uff1f\nA: \u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"gogoproto")," \u6765\u8fdb\u884c\u5904\u7406\uff0c\u5177\u4f53\u8fc7\u7a0b\u5982\u4e0b"),(0,a.kt)("p",null,"1\u3001\u5728 proto\u6587\u4ef6\u4e2d improt gogo.proto \u6587\u4ef6"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-protobuf"},'syntax = "proto3";\n\npackage api.micro.moment.v1;\n\n...\nimport "github.com/gogo/protobuf/gogoproto/gogo.proto";\n...\n\n')),(0,a.kt)("p",null,"2\u3001\u5728\u5bf9\u5e94\u7684\u5b57\u6bb5\u540e\u9762\u52a0\u4e0a\u5bf9\u5e94\u7684 tag \u6807\u8bb0"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-protobuf"},'...\nmessage User {\n  int32 id = 1 [(gogoproto.jsontag) = "id"]; // \u65b0\u589e\u4e86 gogoproto.jsontag\n  string name = 2;\n  string email = 3;\n}\n...\n')),(0,a.kt)("p",null,"3\u3001\u518d\u6b21\u8fd0\u884c ",(0,a.kt)("inlineCode",{parentName:"p"},"make grpc")," \u540e ",(0,a.kt)("inlineCode",{parentName:"p"},"user.pb.go")," \u6587\u4ef6\u4e2d id\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"omitempty")," tag \u5c31\u6d88\u5931\u4e86"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-protobuf"},'type Person struct {\n  Id          int32                  `protobuf:"varint,2,opt,name=id,proto3" json:"id"`\n  Name        string                 `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`\n  Email       string                 `protobuf:"bytes,3,opt,name=email,proto3" json:"email,omitempty"`\n}\n')),(0,a.kt)("h2",{id:"reference"},"Reference"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://cloud.tencent.com/developer/article/2014822"},"ProtoBuf \u751f\u6210 Go \u4ee3\u7801\u53bb\u6389 JSON tag omitempty"))))}d.isMDXComponent=!0}}]);