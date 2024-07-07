"use strict";(self.webpackChunkgo_eagle_org_3=self.webpackChunkgo_eagle_org_3||[]).push([[9483],{6275:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>o,default:()=>m,frontMatter:()=>r,metadata:()=>l,toc:()=>g});var a=t(4848),i=t(8453);const r={id:"rabbitmq",title:"RabbitMQ \u6d88\u606f\u961f\u5217",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",keywords:["Go","Eagle","Queue","Toolkit","Framework","Microservices","HTTP"],slug:"/component/queue/rabbitmq"},o=void 0,l={id:"component/queue/rabbitmq",title:"RabbitMQ \u6d88\u606f\u961f\u5217",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",source:"@site/docs/component/queue/rabbitmq.md",sourceDirName:"component/queue",slug:"/component/queue/rabbitmq",permalink:"/docs/component/queue/rabbitmq",draft:!1,unlisted:!1,editUrl:"https://github.com/go-eagle/go-eagle.org/edit/main/docs/component/queue/rabbitmq.md",tags:[],version:"current",frontMatter:{id:"rabbitmq",title:"RabbitMQ \u6d88\u606f\u961f\u5217",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",keywords:["Go","Eagle","Queue","Toolkit","Framework","Microservices","HTTP"],slug:"/component/queue/rabbitmq"},sidebar:"docs",previous:{title:"Redis \u6d88\u606f\u961f\u5217",permalink:"/docs/component/queue/redis"},next:{title:"\u6ce8\u518c\u4e0e\u53d1\u73b0",permalink:"/docs/component/registry"}},s={},g=[{value:"\u6982\u89c8",id:"\u6982\u89c8",level:2},{value:"RabbitMQ \u6d88\u606f\u961f\u5217",id:"rabbitmq-\u6d88\u606f\u961f\u5217",level:2},{value:"\u7279\u6027",id:"\u7279\u6027",level:2},{value:"\u914d\u7f6e",id:"\u914d\u7f6e",level:2},{value:"\u4f7f\u7528",id:"\u4f7f\u7528",level:2},{value:"\u751f\u4ea7\u8005",id:"\u751f\u4ea7\u8005",level:3},{value:"\u6d88\u8d39\u8005",id:"\u6d88\u8d39\u8005",level:3},{value:"\u5ef6\u8fdf\u961f\u5217",id:"\u5ef6\u8fdf\u961f\u5217",level:3},{value:"\u9644\u5f55",id:"\u9644\u5f55",level:2},{value:"Reference",id:"reference",level:2}];function c(e){const n={a:"a",blockquote:"blockquote",br:"br",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h2,{id:"\u6982\u89c8",children:"\u6982\u89c8"}),"\n",(0,a.jsxs)(n.p,{children:["\u6d88\u606f\u961f\u5217\u4e5f\u662f\u6846\u67b6\u7684\u57fa\u672c\u6807\u914d\uff0c\u5b9e\u9645\u5f00\u53d1\u4e2d\u4e5f\u57fa\u672c\u4e0a\u79bb\u4e0d\u5f00\u6d88\u606f\u961f\u5217\u7684\u4f7f\u7528\uff0c\u6bd4\u5982\uff1a\u53ca\u65f6\u961f\u5217\u3001\u5ef6\u8fdf\u961f\u5217\u3001\u5b9a\u65f6\u961f\u5217\u3002",(0,a.jsx)(n.br,{}),"\n","\u4f7f\u7528\u573a\u666f\u5982\uff1a"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"\u65b0\u7528\u6237\u6ce8\u518c\u53d1\u9001\u6b22\u8fce\u63d0\u9192\uff08\u5373\u65f6\u6d88\u606f\uff09"}),"\n",(0,a.jsx)(n.li,{children:"\u7f51\u4e0a\u8d2d\u7269\u4e0b\u8ba2\u5355\uff0c30\u5206\u949f\u5185\u672a\u652f\u4ed8\u8ba2\u5355\u4f1a\u88ab\u5173\u95ed\uff08\u5ef6\u8fdf\u6d88\u606f\uff09"}),"\n",(0,a.jsx)(n.li,{children:"\u5728\u6307\u5b9a\u7684\u65f6\u95f4\u8fd0\u884c\u4efb\u52a1\uff08\u5b9a\u65f6\u6d88\u606f\uff09"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["\u5728 Eagle \u6846\u67b6\u4e2d\uff0c\u5206\u4e3a\u4e24\u7c7b\u6d88\u606f\u961f\u5217\uff0c\u4e00\u79cd\u662f\u504f\u8f7b\u91cf\u578b\u7684\u6d88\u606f\u961f\u5217(\u4e3b\u8981\u4f7f\u7528redis)\uff0c\u4e00\u79cd\u91cd\u91cf\u578b\u4e00\u70b9\u7684\u6d88\u606f\u961f\u5217(RabbitMQ\u6216Kafak)\uff0c\u4e0b\u9762\u8be6\u7ec6\u4ecb\u7ecd, \u672c\u6587\u4e3b\u8981\u4ecb\u7ecd ",(0,a.jsx)(n.code,{children:"RabbitMQ"})," \u6d88\u606f\u961f\u5217\u3002"]}),"\n",(0,a.jsx)(n.h2,{id:"rabbitmq-\u6d88\u606f\u961f\u5217",children:"RabbitMQ \u6d88\u606f\u961f\u5217"}),"\n",(0,a.jsx)(n.h2,{id:"\u7279\u6027",children:"\u7279\u6027"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"\u652f\u6301\u591a\u961f\u5217\u914d\u7f6e"}),"\n",(0,a.jsx)(n.li,{children:"\u652f\u6301\u5ef6\u8fdf\u961f\u5217\u914d\u7f6e"}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"\u914d\u7f6e",children:"\u914d\u7f6e"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",children:'# rabbitmq.yaml, \u652f\u6301\u914d\u7f6e\u591a\u79cd\u961f\u5217\ntest-demo:\n  URI: "amqp://guest:guest@localhost:5672/"\n  AutoDeclare: true\n  Timeout: 5s\n  Exchange:\n    Name: local-test-exchange\n    Kind: direct\n    Durable: true\n    AutoDelete: false\n    Internal: false\n    NoWait: false\n    Args: {}\n  Queue:\n    name: local-test-queue\n    durable: true\n    AutoDelete: false\n    Exclusive: false\n    NoWait: false\n    Args: {}\n  Bind:\n    RoutingKey: local-test-routing-key\n    NoWait: false\n    Args: {}\n\ntest-multi:\n  URI: "amqp://guest:guest@localhost:5672/"\n  AutoDeclare: true\n  Timeout: 5s\n  Exchange:\n    Name: local-test2-exchange\n    Kind: direct\n    Durable: true\n    AutoDelete: false\n    Internal: false\n    NoWait: false\n    Args: {}\n  Queue:\n    name: local-test2-queue\n    durable: true\n    AutoDelete: false\n    Exclusive: false\n    NoWait: false\n    Args: {}\n  Bind:\n    RoutingKey: local-test2-routing-key\n    NoWait: false\n    Args: {}\n'})}),"\n",(0,a.jsx)(n.h2,{id:"\u4f7f\u7528",children:"\u4f7f\u7528"}),"\n",(0,a.jsx)(n.h3,{id:"\u751f\u4ea7\u8005",children:"\u751f\u4ea7\u8005"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:'package main\n\nimport (\n\t"context"\n\t"encoding/json"\n\t"log"\n\t"time"\n\n\t"github.com/go-eagle/eagle/pkg/queue/rabbitmq/options"\n\n\teagle "github.com/go-eagle/eagle/pkg/app"\n\t"github.com/go-eagle/eagle/pkg/config"\n\tlogger "github.com/go-eagle/eagle/pkg/log"\n\t"github.com/spf13/pflag"\n\n\t"github.com/go-eagle/eagle/pkg/queue/rabbitmq"\n)\n\nvar (\n\tcfgDir = pflag.StringP("config dir", "c", "config", "config path.")\n\tenv    = pflag.StringP("env name", "e", "", "env var name.")\n)\n\n// \u542f\u52a8 rabbitmq\n// docker run -it  --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.10-management\n// \u8bbf\u95eeui: http://127.0.0.1:15672/\n// cd examples/queue/rabbitmq/producer\n// go run main.go\nfunc main() {\n\tc := config.New(*cfgDir, config.WithEnv(*env))\n\tvar cfg eagle.Config\n\tif err := c.Load("app", &cfg); err != nil {\n\t\tpanic(err)\n\t}\n\t// set global\n\teagle.Conf = &cfg\n\n\tlogger.Init()\n\n\trabbitmq.Load()\n\tdefer rabbitmq.Close()\n\n\topts := []options.PublishOption{\n\t\toptions.WithPublishOptionContentType("application/json"),\n\t}\n\n\tgo func() {\n\t\tvar message string\n\t\tfor i := 0; i < 100000; i++ {\n\t\t\tmessage = "Hello World RabbitMQ!" + time.Now().String()\n\t\t\tmsg := map[string]interface{}{\n\t\t\t\t"message": message,\n\t\t\t}\n\t\t\tdata, _ := json.Marshal(msg)\n\t\t\tif err := rabbitmq.Publish(context.Background(), "test-demo", data, opts...); err != nil {\n\t\t\t\tlog.Fatalf("failed publish message: %s", err.Error())\n\t\t\t}\n\t\t}\n\t}()\n\n\tvar message string\n\tfor i := 0; i < 100000; i++ {\n\t\tmessage = "Hello World multi RabbitMQ!" + time.Now().String()\n\t\tmsg := map[string]interface{}{\n\t\t\t"message": message,\n\t\t}\n\t\tdata, _ := json.Marshal(msg)\n\t\tif err := rabbitmq.Publish(context.Background(), "test-multi", data, opts...); err != nil {\n\t\t\tlog.Fatalf("failed publish message: %s", err.Error())\n\t\t}\n\t}\n\n}\n'})}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsxs)(n.p,{children:["src: ",(0,a.jsx)(n.a,{href:"https://github.com/go-eagle/eagle/blob/master/examples/queue/rabbitmq/producer/main.go",children:"https://github.com/go-eagle/eagle/blob/master/examples/queue/rabbitmq/producer/main.go"})]}),"\n"]}),"\n",(0,a.jsx)(n.h3,{id:"\u6d88\u8d39\u8005",children:"\u6d88\u8d39\u8005"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:'package main\n\nimport (\n\t"context"\n\t"encoding/json"\n\t"os"\n\t"os/signal"\n\t"syscall"\n\n\t"github.com/go-eagle/eagle/pkg/queue/rabbitmq/options"\n\n\t"github.com/rabbitmq/amqp091-go"\n\n\teagle "github.com/go-eagle/eagle/pkg/app"\n\t"github.com/go-eagle/eagle/pkg/config"\n\n\t"github.com/spf13/pflag"\n\n\tlogger "github.com/go-eagle/eagle/pkg/log"\n\n\t"github.com/go-eagle/eagle/pkg/queue/rabbitmq"\n)\n\nvar (\n\tcfgDir = pflag.StringP("config dir", "c", "config", "config path.")\n\tenv    = pflag.StringP("env name", "e", "", "env var name.")\n)\n\n// cd examples/queue/rabbitmq/consumer/\n// go run main.go\nfunc main() {\n\tpflag.Parse()\n\n\t// init config\n\tc := config.New(*cfgDir, config.WithEnv(*env))\n\tvar cfg eagle.Config\n\tif err := c.Load("app", &cfg); err != nil {\n\t\tpanic(err)\n\t}\n\t// set global\n\teagle.Conf = &cfg\n\n\tlogger.Init()\n\n\trabbitmq.Load()\n\tdefer rabbitmq.Close()\n\n\tstopSig := make(chan os.Signal, 1)\n\tsignal.Notify(stopSig, syscall.SIGINT, syscall.SIGTERM)\n\n\tdone := make(chan struct{})\n\tstop := make(chan struct{}, 1)\n\n\t// \u81ea\u5b9a\u4e49\u6d88\u606f\u5904\u7406\u51fd\u6570\n\thandler := func(ctx context.Context, body amqp091.Delivery) (action rabbitmq.Action) {\n\t\tmsg := make(map[string]interface{})\n\t\terr := json.Unmarshal(body.Body, &msg)\n\t\tif err != nil {\n\t\t\tlogger.Errorf("consumer handler unmarshal msg err: %s", err.Error())\n\t\t\treturn rabbitmq.NackDiscard\n\t\t}\n\t\tlogger.Infof("consumer handler receive msg: %s", msg)\n\t\treturn rabbitmq.Ack\n\t}\n\n\t// rabbitmq consume message\n\tctx := context.Background()\n\n\topts := []options.ConsumerOption{\n\t\toptions.WithConsumerOptionConcurrency(1),\n\t}\n\n\tgo func() {\n\t\terr := rabbitmq.Consume(ctx, "test-demo", handler, opts...)\n\t\tif err != nil {\n\t\t\tlogger.Errorf("rabbitmq consume err: %s", err.Error())\n\t\t}\n\t}()\n\n\tfor {\n\t\tselect {\n\t\tcase <-stopSig:\n\t\t\tlogger.Info("received stop signal")\n\t\t\tstop <- struct{}{}\n\t\tcase <-stop:\n\t\t\tlogger.Info("stopping service")\n\t\t\tclose(done)\n\t\t\treturn\n\t\tcase <-done:\n\t\t\tlogger.Info("stopped service gracefully")\n\t\t\treturn\n\t\t}\n\t}\n}\n\n'})}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsxs)(n.p,{children:["src: ",(0,a.jsx)(n.a,{href:"https://github.com/go-eagle/eagle/blob/master/examples/queue/rabbitmq/consumer/main.go",children:"https://github.com/go-eagle/eagle/blob/master/examples/queue/rabbitmq/consumer/main.go"})]}),"\n"]}),"\n",(0,a.jsx)(n.h3,{id:"\u5ef6\u8fdf\u961f\u5217",children:"\u5ef6\u8fdf\u961f\u5217"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:'package main\n\nimport (\n\t"context"\n\t"encoding/json"\n\t"log"\n\t"time"\n\n\teagle "github.com/go-eagle/eagle/pkg/app"\n\t"github.com/go-eagle/eagle/pkg/config"\n\tlogger "github.com/go-eagle/eagle/pkg/log"\n\t"github.com/go-eagle/eagle/pkg/queue/rabbitmq"\n\t"github.com/go-eagle/eagle/pkg/queue/rabbitmq/options"\n)\n\n// \u542f\u52a8 rabbitmq\n// docker run -it  --name rabbitmq -p 5672:5672 -p 15672:15672 -v $PWD/plugins:/plugins rabbitmq:3.10-management\n// \u8bbf\u95eeui: http://127.0.0.1:15672/\n// cd examples/queue/rabbitmq/producer\n// go run delay_publish.go\nfunc main() {\n\tc := config.New(*cfgDir, config.WithEnv(*env))\n\tvar cfg eagle.Config\n\tif err := c.Load("app", &cfg); err != nil {\n\t\tpanic(err)\n\t}\n\t// set global\n\teagle.Conf = &cfg\n\n\tlogger.Init()\n\n\trabbitmq.Load()\n\tdefer rabbitmq.Close()\n\n\topts := []options.PublishOption{\n\t\toptions.WithPublishOptionContentType("application/json"),\n\t}\n\n\tvar message string\n\tfor i := 0; i < 100000; i++ {\n\t\tmessage = "Hello World RabbitMQ!" + time.Now().String()\n\t\tmsg := map[string]interface{}{\n\t\t\t"message": message,\n\t\t}\n\t\tdata, _ := json.Marshal(msg)\n\t\tif err := rabbitmq.PublishWithDelay(context.Background(), "test-demo", data, 10, opts...); err != nil {\n\t\t\tlog.Fatalf("failed publish message: %s", err.Error())\n\t\t}\n\t}\n}\n'})}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsxs)(n.p,{children:["src: ",(0,a.jsx)(n.a,{href:"https://github.com/go-eagle/eagle/blob/master/examples/queue/rabbitmq/producer/delay_publish.go",children:"https://github.com/go-eagle/eagle/blob/master/examples/queue/rabbitmq/producer/delay_publish.go"})]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"\u9644\u5f55",children:"\u9644\u5f55"}),"\n",(0,a.jsx)(n.p,{children:"\u57fa\u4e8eDocker\u90e8\u7f72RabbitMQ"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",children:"docker pull bitnami/rabbitmq:latest\n\ndocker run -itd \\\n    --hostname localhost \\\n    --name rabbitmq-test \\\n    -p 15672:15672 \\\n    -p 5672:5672 \\\n    -p 1883:1883 \\\n    -p 15675:15675 \\\n    -e RABBITMQ_PLUGINS=rabbitmq_top,rabbitmq_mqtt,rabbitmq_web_mqtt,rabbitmq_prometheus,rabbitmq_stomp,rabbitmq_auth_backend_http \\\n    bitnami/rabbitmq:latest\n\n# \u67e5\u770b\u63d2\u4ef6\u5217\u8868\nrabbitmq-plugins list\n# rabbitmq_peer_discovery_consul \nrabbitmq-plugins --offline enable rabbitmq_peer_discovery_consul\n# rabbitmq_mqtt \u63d0\u4f9b\u4e0e\u540e\u7aef\u670d\u52a1\u4ea4\u4e92\u4f7f\u7528\uff0c\u7aef\u53e31883\nrabbitmq-plugins enable rabbitmq_mqtt\n# rabbitmq_web_mqtt \u63d0\u4f9b\u4e0e\u524d\u7aef\u4ea4\u4e92\u4f7f\u7528\uff0c\u7aef\u53e315675\nrabbitmq-plugins enable rabbitmq_web_mqtt\n"})}),"\n",(0,a.jsxs)(n.p,{children:["\u7ba1\u7406\u540e\u53f0: ",(0,a.jsx)(n.a,{href:"http://localhost:15672",children:"http://localhost:15672"}),"\n\u9ed8\u8ba4\u8d26\u53f7: guest",(0,a.jsx)(n.br,{}),"\n","\u9ed8\u8ba4\u5bc6\u7801: guest"]}),"\n",(0,a.jsx)(n.h2,{id:"reference",children:"Reference"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://mp.weixin.qq.com/s/TN0HSUdy2UFaGhO5fCYutA",children:"https://mp.weixin.qq.com/s/TN0HSUdy2UFaGhO5fCYutA"})}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://mp.weixin.qq.com/s/_mFXvbwC0T05So8S_smA9A",children:"https://mp.weixin.qq.com/s/_mFXvbwC0T05So8S_smA9A"})}),"\n"]})]})}function m(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>l});var a=t(6540);const i={},r=a.createContext(i);function o(e){const n=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),a.createElement(r.Provider,{value:n},e.children)}}}]);