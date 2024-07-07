"use strict";(self.webpackChunkgo_eagle_org_3=self.webpackChunkgo_eagle_org_3||[]).push([[6276],{4052:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>t,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>d});var l=s(4848),r=s(8453);const a={id:"cli",title:"\u547d\u4ee4\u884c\u5de5\u5177",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",keywords:["Go","cli","tools","Eagle","Toolkit","Framework","Microservices","HTTP"]},t=void 0,i={id:"getting-started/cli",title:"\u547d\u4ee4\u884c\u5de5\u5177",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",source:"@site/docs/getting-started/cli.md",sourceDirName:"getting-started",slug:"/getting-started/cli",permalink:"/docs/getting-started/cli",draft:!1,unlisted:!1,editUrl:"https://github.com/go-eagle/go-eagle.org/edit/main/docs/getting-started/cli.md",tags:[],version:"current",frontMatter:{id:"cli",title:"\u547d\u4ee4\u884c\u5de5\u5177",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",keywords:["Go","cli","tools","Eagle","Toolkit","Framework","Microservices","HTTP"]},sidebar:"docs",previous:{title:"\u6846\u67b6\u7ed3\u6784",permalink:"/docs/getting-started/structure"},next:{title:"\u5e38\u89c1\u95ee\u9898",permalink:"/docs/getting-started/faq"}},o={},d=[{value:"\u5b89\u88c5",id:"\u5b89\u88c5",level:2},{value:"go get \u65b9\u5f0f\u5b89\u88c5",id:"go-get-\u65b9\u5f0f\u5b89\u88c5",level:3},{value:"go install \u65b9\u5f0f\u5b89\u88c5",id:"go-install-\u65b9\u5f0f\u5b89\u88c5",level:3},{value:"\u4f7f\u7528",id:"\u4f7f\u7528",level:2},{value:"\u67e5\u770b\u5e2e\u52a9",id:"\u67e5\u770b\u5e2e\u52a9",level:3},{value:"\u65b0\u5efa\u9879\u76ee",id:"\u65b0\u5efa\u9879\u76ee",level:3},{value:"\u751f\u6210model",id:"\u751f\u6210model",level:3},{value:"\u4f7f\u7528\u65b9\u6cd5",id:"\u4f7f\u7528\u65b9\u6cd5",level:4},{value:"\u793a\u4f8b1",id:"\u793a\u4f8b1",level:4},{value:"\u793a\u4f8b2",id:"\u793a\u4f8b2",level:4},{value:"\u5b9a\u4e49proto",id:"\u5b9a\u4e49proto",level:3},{value:"\u6b65\u9aa4\u4e00\uff1a\u751f\u6210\u6a21\u677f\u6587\u4ef6",id:"\u6b65\u9aa4\u4e00\u751f\u6210\u6a21\u677f\u6587\u4ef6",level:4},{value:"\u6b65\u9aa4\u4e8c\uff1a\u751f\u6210 pb",id:"\u6b65\u9aa4\u4e8c\u751f\u6210-pb",level:4},{value:"\u6b65\u9aa4\u4e09\uff1a\u751f\u6210 server \u9aa8\u67b6\u4ee3\u7801",id:"\u6b65\u9aa4\u4e09\u751f\u6210-server-\u9aa8\u67b6\u4ee3\u7801",level:4},{value:"\u751f\u6210 repo",id:"\u751f\u6210-repo",level:3},{value:"\u751f\u6210 cache",id:"\u751f\u6210-cache",level:3},{value:"\u751f\u6210 service",id:"\u751f\u6210-service",level:3},{value:"\u751f\u6210\u4efb\u52a1",id:"\u751f\u6210\u4efb\u52a1",level:3},{value:"\u5347\u7ea7\u5de5\u5177",id:"\u5347\u7ea7\u5de5\u5177",level:3},{value:"\u67e5\u770b\u5de5\u5177\u7248\u672c",id:"\u67e5\u770b\u5de5\u5177\u7248\u672c",level:3}];function c(e){const n={blockquote:"blockquote",br:"br",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(n.p,{children:["\u901a\u8fc7\u4f7f\u7528 eagle \u547d\u4ee4\u884c\u5de5\u5177\uff0c\u53ef\u4ee5\u63d0\u9ad8\u5f00\u53d1\u6548\u7387\uff0c\u51cf\u5c11\u624b\u5199\u5e26\u6765\u7684\u9519\u8bef\u3002",(0,l.jsx)(n.br,{}),"\n","\u4f7f\u5f97\u5927\u5bb6\u53ef\u4ee5\u66f4\u52a0\u4e13\u6ce8\u4e8e\u4e1a\u52a1\u5f00\u53d1\u3002"]}),"\n",(0,l.jsx)(n.h2,{id:"\u5b89\u88c5",children:"\u5b89\u88c5"}),"\n",(0,l.jsx)(n.h3,{id:"go-get-\u65b9\u5f0f\u5b89\u88c5",children:"go get \u65b9\u5f0f\u5b89\u88c5"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"go get -v github.com/go-eagle/eagle/cmd/eagle\n"})}),"\n",(0,l.jsx)(n.h3,{id:"go-install-\u65b9\u5f0f\u5b89\u88c5",children:"go install \u65b9\u5f0f\u5b89\u88c5"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsx)(n.p,{children:"Go 1.16 \u7248\u672c\u4ee5\u4e0a\u4f7f\u7528\u8be5\u65b9\u5f0f"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"go install github.com/go-eagle/eagle/cmd/eagle@latest\n"})}),"\n",(0,l.jsx)(n.h2,{id:"\u4f7f\u7528",children:"\u4f7f\u7528"}),"\n",(0,l.jsx)(n.p,{children:"\u4f7f\u7528\u524d\u6211\u4eec\u53ef\u4ee5\u5148\u901a\u8fc7\u67e5\u770b\u5e2e\u52a9\uff0c\u770b\u4e00\u4e0b\u90fd\u652f\u6301\u4ec0\u4e48\u547d\u4ee4"}),"\n",(0,l.jsx)(n.h3,{id:"\u67e5\u770b\u5e2e\u52a9",children:"\u67e5\u770b\u5e2e\u52a9"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:'\u279c eagle -h\nEagle: An develop kit for Go microservices.\n\nUsage:\n  eagle [command]\n\nAvailable Commands:\n  cache       Generate the cache file\n  handler     Generate the handler file\n  help        Help about any command\n  model       Generate the model file\n  new         Create a project template\n  proto       Generate the proto files\n  repo        Generate the repo file\n  run         Run project\n  svc         Generate the service/svc file\n  task        Generate the task file\n  upgrade     Upgrade the eagle tools\n\nFlags:\n  -h, --help      help for eagle\n  -v, --version   version for eagle\n\nUse "eagle [command] --help" for more information about a command.\n'})}),"\n",(0,l.jsx)(n.h3,{id:"\u65b0\u5efa\u9879\u76ee",children:"\u65b0\u5efa\u9879\u76ee"}),"\n",(0,l.jsxs)(n.p,{children:["\u4e3b\u8981\u662f\u4f7f\u7528\u547d\u4ee4\u62c9\u53d6 ",(0,l.jsx)(n.code,{children:"eagle-layout"})," \u6a21\u677f\u9879\u76ee\u4ee3\u7801\u6765\u751f\u6210\u3002"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"eagle new helloworld\n# or\neagle new github.com/foo/helloworld\n"})}),"\n",(0,l.jsx)(n.h3,{id:"\u751f\u6210model",children:"\u751f\u6210model"}),"\n",(0,l.jsxs)(n.p,{children:["\u7ecf\u5e38\u6211\u4eec\u5b9a\u4e49\u5b8c\u6570\u636e\u5e93\u7684\u8868\u7ed3\u6784\u4e4b\u540e\uff0c\u9700\u8981\u6765\u624b\u5199\u7ed3\u6784\u4f53\uff0c",(0,l.jsx)(n.br,{}),"\n","\u5b57\u6bb5\u6570\u91cf\u5c11\u8fd8\u53ef\u4ee5\uff0c\u5982\u679c\u5b57\u6bb5\u5f88\u591a\uff0c\u624b\u5199\u8d77\u6765\u53ef\u80fd\u4f1a\u6bd4\u8f83\u75db\u82e6\uff0c\u4e14\u5bb9\u6613\u51fa\u9519\uff0c",(0,l.jsx)(n.br,{}),"\n","\u6240\u4ee5\u8fd9\u91cc\u7ed9\u5927\u5bb6\u63d0\u4f9b\u4e86\u4e00\u4e2a\u901a\u8fc7\u547d\u4ee4\u884c\u751f\u6210\u7684\u5de5\u5177\uff0c\u4f7f\u7528\u65b9\u6cd5\u5982\u4e0b\uff1a"]}),"\n",(0,l.jsx)(n.h4,{id:"\u4f7f\u7528\u65b9\u6cd5",children:"\u4f7f\u7528\u65b9\u6cd5"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:'eagle model -h\nGenerate the model file via database table.\n\nUsage:\n  eagle model [flags]\n\nFlags:\n  -d, --database string     database name\n  -f, --filename string     model filename\n      --format string       add json annotations (default)\n  -h, --help                help for model\n      --host string         database host addr (default "localhost")\n      --package string      package name (default "model")\n  -p, --password string     password for database (default "123456")\n  -s, --struct string       model struct name\n  -t, --table string        table name\n      --target-dir string   model target dir (default "internal/model")\n  -u, --user string         database username (default "root")\n'})}),"\n",(0,l.jsx)(n.h4,{id:"\u793a\u4f8b1",children:"\u793a\u4f8b1"}),"\n",(0,l.jsxs)(n.p,{children:["\u4ee5\u751f\u6210\u7528\u6237model\u4e3a\u4f8b\uff0c\u8bbe\u5b9a\u7528\u6237\u8868\u660e\u4e3a ",(0,l.jsx)(n.code,{children:"user"}),"\uff0c\u901a\u8fc7\u4ea4\u4e92\u5f0f\u6765\u751f\u6210\uff1a"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"\u279c eagle model \u56de\u8f66  \n? What is file name ? user.go\n? What is database name ? eagle\n? What is table name ? user\n? What is struct name for model? UserModel\n\ud83d\ude80 Creating model user.go, please wait a moment.\n\n\ud83c\udf7a Model creation succeeded user.go\n"})}),"\n",(0,l.jsxs)(n.p,{children:["\u751f\u6210\u7684 ",(0,l.jsx)(n.code,{children:"user.go"})," \u4f4d\u4e8e ",(0,l.jsx)(n.code,{children:"internal/model"})," \u76ee\u5f55\u4e0b\u3002"]}),"\n",(0,l.jsx)(n.h4,{id:"\u793a\u4f8b2",children:"\u793a\u4f8b2"}),"\n",(0,l.jsxs)(n.p,{children:["\u4ee5\u751f\u6210\u7528\u6237model\u4e3a\u4f8b\uff0c\u8bbe\u5b9a\u7528\u6237\u8868\u660e\u4e3a ",(0,l.jsx)(n.code,{children:"user_info"}),"\uff0c\u901a\u8fc7\u547d\u4ee4\u884c\u53c2\u6570\u7684\u65b9\u5f0f\u6765\u751f\u6210\uff1a"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"\u279c eagle model -f=user_info.go -d=eagle -t=user_info -s=UserInfoModel -u=root -p=123456 \n\ud83d\ude80 Creating model user_info.go, please wait a moment.\n\n\ud83c\udf7a Model creation succeeded user_info.go\n"})}),"\n",(0,l.jsx)(n.p,{children:"\u4e24\u79cd\u65b9\u5f0f\u751f\u6210\u7684\u5185\u5bb9\u662f\u4e00\u81f4\u7684\uff0c\u5927\u5bb6\u53ef\u4ee5\u6839\u636e\u7231\u597d\u81ea\u884c\u9009\u62e9\u3002"}),"\n",(0,l.jsx)(n.h3,{id:"\u5b9a\u4e49proto",children:"\u5b9a\u4e49proto"}),"\n",(0,l.jsx)(n.p,{children:"\u4f7f\u7528 proto \u5f00\u53d1\u4e3b\u8981\u7531\u4e09\u5927\u6b65\u9aa4"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u5b9a\u4e49proto\u6587\u4ef6"}),"\n",(0,l.jsx)(n.li,{children:"\u751f\u6210pb\u4ee3\u7801"}),"\n",(0,l.jsx)(n.li,{children:"\u7f16\u5199server\u4ee3\u7801"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"\u8fd9\u4e00\u5207\u90fd\u6709\u5de5\u5177\u6765\u5e2e\u4f60\u5b8c\u6210\uff0c\u4f60\u53ea\u9700\u8981\u5b9e\u73b0\u5177\u4f53\u7684\u4e1a\u52a1\u903b\u8f91\u5373\u53ef\u3002"}),"\n",(0,l.jsx)(n.h4,{id:"\u6b65\u9aa4\u4e00\u751f\u6210\u6a21\u677f\u6587\u4ef6",children:"\u6b65\u9aa4\u4e00\uff1a\u751f\u6210\u6a21\u677f\u6587\u4ef6"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"eagle add api/user/v1/user.proto\n"})}),"\n",(0,l.jsx)(n.p,{children:"\u751f\u6210\u7684\u5185\u5bb9\u5982\u4e0b"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-protobuf",children:'syntax = "proto3";\n\npackage api.user.v1;\n\noption go_package = "helloworld2/api/user/v1;v1";\noption java_multiple_files = true;\noption java_package = "api.user.v1";\n\nservice UserService {\n    rpc CreateUser (CreateUserRequest) returns (CreateUserReply);\n    rpc UpdateUser (UpdateUserRequest) returns (UpdateUserReply);\n    rpc DeleteUser (DeleteUserRequest) returns (DeleteUserReply);\n    rpc GetUser (GetUserRequest) returns (GetUserReply);\n    rpc ListUser (ListUserRequest) returns (ListUserReply);\n}\n\nmessage CreateUserRequest {}\nmessage CreateUserReply {}\n\nmessage UpdateUserRequest {}\nmessage UpdateUserReply {}\n\nmessage DeleteUserRequest {}\nmessage DeleteUserReply {}\n\nmessage GetUserRequest {}\nmessage GetUserReply {}\n\nmessage ListUserRequest {}\nmessage ListUserReply {}\n'})}),"\n",(0,l.jsx)(n.h4,{id:"\u6b65\u9aa4\u4e8c\u751f\u6210-pb",children:"\u6b65\u9aa4\u4e8c\uff1a\u751f\u6210 pb"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"eagle proto client\n\n# Output\n# api/user/v1\nuser.pb.go #\u65b0\u589e\nuser.proto\nuser_grpc.pb.go #\u65b0\u589e\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"\u8bf4\u660e"})}),"\n",(0,l.jsx)(n.p,{children:"protocol buffer\u7f16\u8bd1\u5668(protoc)\u751f\u6210\u7684\u4ee3\u7801\u5305\u542b"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u6d88\u606f\u5e8f\u5217\u5316\u4ee3\u7801(*.pb.go)"}),"\n",(0,l.jsx)(n.li,{children:"\u5ba2\u6237\u7aef\u4f7f\u7528\u65b9\u6cd5\u8c03\u7528\u7684\u8fdc\u7a0b\u63a5\u53e3\u5b58\u6839\uff08*_grpc.pb.go\uff09"}),"\n",(0,l.jsx)(n.li,{children:"\u670d\u52a1\u5668\u4ee3\u7801\u5b9e\u73b0\u7684\u62bd\u8c61\u63a5\u53e3\uff08*_grpc.pb.go\uff09"}),"\n"]}),"\n",(0,l.jsx)(n.h4,{id:"\u6b65\u9aa4\u4e09\u751f\u6210-server-\u9aa8\u67b6\u4ee3\u7801",children:"\u6b65\u9aa4\u4e09\uff1a\u751f\u6210 server \u9aa8\u67b6\u4ee3\u7801"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"eagle proto server api/user/v1/user.proto\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"\u8bf4\u660e"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u9ed8\u8ba4\u4f1a\u8f93\u51fa\u5230 ",(0,l.jsx)(n.code,{children:"internal/service"})," \u76ee\u5f55\u4e0b"]}),"\n",(0,l.jsxs)(n.li,{children:["\u5982\u679c\u60f3\u8981\u8f93\u51fa\u5230\u6307\u5b9a\u76ee\u5f55\uff0c\u53ef\u4ee5\u4f7f\u7528 ",(0,l.jsx)(n.code,{children:"-t"})," \u53c2\u6570\u6765\u6307\u5b9a"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"\u751f\u6210-repo",children:"\u751f\u6210 repo"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"eagle repo add User\n\n# Output\n# internal/repository\nuser_repo.go\n\n# \u9a7c\u5cf0\u5199\u6cd5\neagle repo add UserInfo\n\n# Output\n# internal/repository\nuser_info_repo.go\n"})}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsx)(n.p,{children:"repo \u540d\u7528\u9a7c\u5cf0\u5199\u6cd5\uff0c\u9996\u5b57\u6bcd\u5927\u5199\uff0c\u751f\u6210\u7684\u6587\u4ef6\u540d\u4f1a\u662f\u4e0b\u5212\u7ebf\u5206\u9694\u7684\u5c0f\u5199\u5199\u6cd5"}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"\u751f\u6210-cache",children:"\u751f\u6210 cache"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"eagle cache add User\n\n# Output\n# internal/cache\nuser_cache.go\n\n# \u9a7c\u5cf0\u5199\u6cd5\neagle cache add UserInfo\n\n# Output\n# internal/cache\nuser_info_cache.go\n"})}),"\n",(0,l.jsx)(n.h3,{id:"\u751f\u6210-service",children:"\u751f\u6210 service"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsx)(n.p,{children:"\u548c eagle proto server \u751f\u6210\u7684\u7c7b\u4f3c\uff0c\u529f\u80fd\u5b8c\u5168\u76f8\u540c"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"eagle svc add User\n\n#Output\n#interval/service\nuser_svc.go\n"})}),"\n",(0,l.jsx)(n.h3,{id:"\u751f\u6210\u4efb\u52a1",children:"\u751f\u6210\u4efb\u52a1"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"eagle task add User\n\n# Output\n# internal/tasks\nuser_task.go\n"})}),"\n",(0,l.jsx)(n.h3,{id:"\u5347\u7ea7\u5de5\u5177",children:"\u5347\u7ea7\u5de5\u5177"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"eagle upgrade\n"})}),"\n",(0,l.jsx)(n.h3,{id:"\u67e5\u770b\u5de5\u5177\u7248\u672c",children:"\u67e5\u770b\u5de5\u5177\u7248\u672c"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"eagle -v\n\n# Output\neagle version v0.13.3\n"})})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(c,{...e})}):c(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>i});var l=s(6540);const r={},a=l.createContext(r);function t(e){const n=l.useContext(a);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),l.createElement(a.Provider,{value:n},e.children)}}}]);