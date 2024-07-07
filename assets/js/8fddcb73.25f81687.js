"use strict";(self.webpackChunkgo_eagle_org_3=self.webpackChunkgo_eagle_org_3||[]).push([[9488],{1816:(e,n,l)=>{l.r(n),l.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>t,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var r=l(4848),i=l(8453);const s={id:"logging",title:"\u65e5\u5fd7\u7ec4\u4ef6",description:"\u65e5\u5fd7\u7684\u5b9a\u4e49\u548c\u4f7f\u7528",keywords:["Go","Eagle","Toolkit","Framework","Microservices","HTTP"],slug:"/component/logging"},o=void 0,c={id:"component/logging",title:"\u65e5\u5fd7\u7ec4\u4ef6",description:"\u65e5\u5fd7\u7684\u5b9a\u4e49\u548c\u4f7f\u7528",source:"@site/docs/component/logging.md",sourceDirName:"component",slug:"/component/logging",permalink:"/docs/component/logging",draft:!1,unlisted:!1,editUrl:"https://github.com/go-eagle/go-eagle.org/edit/main/docs/component/logging.md",tags:[],version:"current",frontMatter:{id:"logging",title:"\u65e5\u5fd7\u7ec4\u4ef6",description:"\u65e5\u5fd7\u7684\u5b9a\u4e49\u548c\u4f7f\u7528",keywords:["Go","Eagle","Toolkit","Framework","Microservices","HTTP"],slug:"/component/logging"},sidebar:"docs",previous:{title:"\u914d\u7f6e\u7ba1\u7406",permalink:"/docs/component/config"},next:{title:"\u9519\u8bef\u5904\u7406",permalink:"/docs/component/errors"}},a={},d=[{value:"\u8bf4\u660e",id:"\u8bf4\u660e",level:2},{value:"\u529f\u80fd\u70b9",id:"\u529f\u80fd\u70b9",level:2},{value:"\u63a5\u53e3\u4e0e\u6846\u67b6\u8bbe\u8ba1",id:"\u63a5\u53e3\u4e0e\u6846\u67b6\u8bbe\u8ba1",level:2},{value:"\u63a5\u53e3\u5b9a\u4e49",id:"\u63a5\u53e3\u5b9a\u4e49",level:2},{value:"\u65e5\u5fd7\u914d\u7f6e",id:"\u65e5\u5fd7\u914d\u7f6e",level:2},{value:"Development",id:"development",level:3},{value:"DisableCaller",id:"disablecaller",level:3},{value:"Encoding",id:"encoding",level:3},{value:"Level",id:"level",level:3},{value:"Name",id:"name",level:3},{value:"Writers",id:"writers",level:3},{value:"log \u5b9e\u4f8b\u5316\u6d41\u7a0b",id:"log-\u5b9e\u4f8b\u5316\u6d41\u7a0b",level:2},{value:"\u521d\u59cb\u5316\u65e5\u5fd7",id:"\u521d\u59cb\u5316\u65e5\u5fd7",level:2},{value:"\u6253\u5370\u65e5\u5fd7\u6d41\u7a0b\u56fe",id:"\u6253\u5370\u65e5\u5fd7\u6d41\u7a0b\u56fe",level:2},{value:"\u4f7f\u7528\u65b9\u5f0f",id:"\u4f7f\u7528\u65b9\u5f0f",level:2},{value:"\u6570\u636e\u5e93\u65e5\u5fd7",id:"\u6570\u636e\u5e93\u65e5\u5fd7",level:2},{value:"\u6253\u5370\u6240\u6709SQL",id:"\u6253\u5370\u6240\u6709sql",level:3},{value:"\u6253\u5370\u6162SQL",id:"\u6253\u5370\u6162sql",level:3},{value:"References",id:"references",level:2}];function g(e){const n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"\u8bf4\u660e",children:"\u8bf4\u660e"}),"\n",(0,r.jsx)(n.p,{children:"\u65e5\u5fd7\u57fa\u4e8e zap \u8fdb\u884c\u5c01\u88c5\uff0c\u540c\u65f6\u4e5f\u652f\u6301\u5207\u5272\uff0c\u9ed8\u8ba4\u6309\u7167\u5929\u8fdb\u884c\u5207\u5272\u3002"}),"\n",(0,r.jsx)(n.h2,{id:"\u529f\u80fd\u70b9",children:"\u529f\u80fd\u70b9"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u652f\u6301\u65e5\u5fd7\u5199\u5165\u5230\u591a\u4e2a\u6d41\u4e2d\uff0c\u63a7\u5236\u53f0\u6216\u65e5\u5fd7\u6587\u4ef6"}),"\n",(0,r.jsx)(n.li,{children:"\u652f\u6301\u591a\u65e5\u5fd7\u7ea7\u522b\uff0c\u5305\u62ec\uff1aDEBUG,INFO,WARN,ERROR"}),"\n",(0,r.jsx)(n.li,{children:"\u652f\u6301\u7ed3\u6784\u5316\u8f93\u51fa\uff0c\u9ed8\u8ba4json\uff0c\u65b9\u4fbf\u65e5\u5fd7\u6536\u96c6"}),"\n",(0,r.jsx)(n.li,{children:"\u652f\u6301\u65e5\u5fd7\u5207\u5272\uff0c\u6309\u65f6\u95f4\u8fdb\u884c\u5207\u5272"}),"\n",(0,r.jsx)(n.li,{children:"\u652f\u6301\u6253\u5370\u6587\u4ef6\u548c\u884c\u53f7"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u63a5\u53e3\u4e0e\u6846\u67b6\u8bbe\u8ba1",children:"\u63a5\u53e3\u4e0e\u6846\u67b6\u8bbe\u8ba1"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"logger-arch-design",src:l(149).A+"",width:"2127",height:"1071"})}),"\n",(0,r.jsx)(n.h2,{id:"\u63a5\u53e3\u5b9a\u4e49",children:"\u63a5\u53e3\u5b9a\u4e49"}),"\n",(0,r.jsx)(n.p,{children:"\u4e3a\u4e86\u65b9\u4fbf\u9002\u914d\u4e0d\u901a\u7684\u65e5\u5fd7\u63a5\u5165\uff0c\u8fd9\u91cc\u5b9a\u4e49\u4e86\u51e0\u4e2a\u63a5\u53e3"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"// github.com/go-eagle/eagle/pkg/log/logger.go\n\ntype Logger interface {\n  Debug(args ...interface{})\n  Debugf(format string, args ...interface{})\n\n  Info(args ...interface{})\n  Infof(format string, args ...interface{})\n\n  Warn(args ...interface{})\n  Warnf(format string, args ...interface{})\n\n  Error(args ...interface{})\n  Errorf(format string, args ...interface{})\n\n  WithFields(keyValues Fields) Logger\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u65e5\u5fd7\u914d\u7f6e",children:"\u65e5\u5fd7\u914d\u7f6e"}),"\n",(0,r.jsxs)(n.p,{children:["\u914d\u7f6e\u6587\u4ef6\u4f4d\u4e8e ",(0,r.jsx)(n.code,{children:"config"})," \u76ee\u5f55\u4e0b\uff0c\u6587\u4ef6\u540d\u4e3a\uff1a",(0,r.jsx)(n.code,{children:"logger"}),"\n\u5982\u679c\u662f\u591a\u73af\u5883\u914d\u7f6e\uff0c\u53ef\u4ee5\u662f ",(0,r.jsx)(n.code,{children:"config/{env}/logger.yaml"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"# config/logger.yaml\n  Development: false\n  DisableCaller: false\n  DisableStacktrace: false\n  Encoding: json   # json or console\n  Level: info      # \u65e5\u5fd7\u7ea7\u522b\uff0cDEBUG\u3001INFO\u3001WARN\u3001ERROR\n  Name: eagle\n  Writers: console # file or console\n  LoggerFile: /tmp/log/eagle.log           # \u6240\u6709level\u7684\u65e5\u5fd7\u6587\u4ef6\n  LoggerWarnFile: /tmp/log/eagle.wf.log    # \u4ec5\u8bb0\u5f55warn\u7684\u65e5\u5fd7\u6587\u4ef6\n  LoggerErrorFile: /tmp/log/eagle.err.log  # \u4ec5\u8bb0\u5f55error\u7684\u65e5\u5fd7\u6587\u4ef6\n  LogRollingPolicy: daily   # \u65e5\u5fd7\u5207\u5272\u65b9\u5f0f: daily/hourly\uff0c\u9ed8\u8ba4\u6309\u5929(daily)\u8fdb\u884c\u5207\u5272\n  LogBackupCount: 7         # \u65e5\u5fd7\u5907\u4efd\u6570\n"})}),"\n",(0,r.jsx)(n.p,{children:"\u4e0b\u9762\u901a\u8fc7\u6253\u53705\u6761\u65e5\u5fd7\u6765\u67e5\u770b\u5404\u53c2\u6570\u7684\u6253\u5370\u6548\u679c"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'  logger.Debug("hello debug")\n\tlogger.Info("hello info")\n\tlogger.Warn("hello warn")\n\tlogger.Error("hello error")\n\tlogger.WithFields(logger.Fields{"key1": "val1", "key2": 100}).Info("test with multiple key")\n'})}),"\n",(0,r.jsx)(n.h3,{id:"development",children:"Development"}),"\n",(0,r.jsxs)(n.p,{children:["\u662f\u5426\u662f\u5f00\u53d1\u73af\u5883\uff0c\u53ef\u9009\u503c\uff1a",(0,r.jsx)(n.code,{children:"true"})," \u548c ",(0,r.jsx)(n.code,{children:"false"}),"\uff0c\u9ed8\u8ba4\u4e3a",(0,r.jsx)(n.code,{children:"false"}),", \u793a\u4f8b"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'# \u8bbe\u4e3atrue\n{"L":"INFO","T":"2023-04-07T18:57:46.759+0800","C":"user-service/main.go:80","M":"hello info","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n\n# \u8bbe\u4e3afalse\n{"level":"info","ts":"2023-04-07T18:56:48.342+0800","caller":"user-service/main.go:80","msg":"hello info","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n'})}),"\n",(0,r.jsx)(n.h3,{id:"disablecaller",children:"DisableCaller"}),"\n",(0,r.jsxs)(n.p,{children:["\u662f\u5426\u6253\u5370\u65e5\u5fd7\u7684\u6587\u4ef6\u8c03\u7528\u6587\u4ef6\u548c\u884c\u53f7\uff0c\u5373\u65e5\u5fd7\u6587\u4ef6\u91cc\u7684 ",(0,r.jsx)(n.code,{children:"caller"})," \u5b57\u6bb5\u3002"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"\u5f00\u542f\u540e\u4f1a\u6709\u4e00\u5b9a\u7684\u6027\u80fd\u635f\u8017\uff0c\u4f46\u57fa\u672c\u5927\u90e8\u5206\u573a\u666f\u53ef\u4ee5\u5ffd\u7565"}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"encoding",children:"Encoding"}),"\n",(0,r.jsxs)(n.p,{children:["\u6253\u5370\u7684\u65e5\u5fd7\u683c\u5f0f\uff0c\u9ed8\u8ba4\u4e3a ",(0,r.jsx)(n.code,{children:"json"}),", \u4e5f\u53ef\u4ee5\u4fee\u6539\u4e3a\u5b58\u6587\u672c\u683c\u5f0f\uff0c\u53ef\u9009\u503c\u4e3a\uff1a",(0,r.jsx)(n.code,{children:"json"})," \u548c ",(0,r.jsx)(n.code,{children:"console"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'# \u8bbe\u4e3a json\n{"level":"info","ts":"2023-04-07T18:56:48.342+0800","caller":"user-service/main.go:80","msg":"hello info","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n\n# \u8bbe\u4e3a console\n2023-04-07T19:09:27.773+0800    INFO    user-service/main.go:80 hello info      {"ip": "10.61.160.72", "app_id": "user-svc", "instance_id": "localhost"}\n'})}),"\n",(0,r.jsx)(n.h3,{id:"level",children:"Level"}),"\n",(0,r.jsxs)(n.p,{children:["\u914d\u7f6e\u7684\u65e5\u5fd7\u7ea7\u522b\uff0c\u672c\u5730\u548c\u6d4b\u8bd5\u53ef\u4ee5\u5f00\u542f\u4e3a ",(0,r.jsx)(n.code,{children:"debug"}),"\uff0c\u751f\u4ea7\u73af\u5883\u53ef\u4ee5\u914d\u7f6e\u4e3a ",(0,r.jsx)(n.code,{children:"warn"}),"\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u5f00\u542f ",(0,r.jsx)(n.code,{children:"debug"})," \u7684\u65e5\u5fd7\u6548\u679c"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'{"level":"debug","ts":"2023-04-07T19:19:42.950+0800","caller":"user-service/main.go:79","msg":"hello debug","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n{"level":"info","ts":"2023-04-07T19:19:42.950+0800","caller":"user-service/main.go:80","msg":"hello info","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n{"level":"warn","ts":"2023-04-07T19:19:42.950+0800","caller":"user-service/main.go:81","msg":"hello warn","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n{"level":"error","ts":"2023-04-07T19:19:42.950+0800","caller":"user-service/main.go:82","msg":"hello error","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n'})}),"\n",(0,r.jsxs)(n.p,{children:["\u5f00\u542f ",(0,r.jsx)(n.code,{children:"warn"})," \u7684\u65e5\u5fd7\u6548\u679c"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'{"level":"warn","ts":"2023-04-07T19:20:25.446+0800","caller":"user-service/main.go:81","msg":"hello warn","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n{"level":"error","ts":"2023-04-07T19:20:25.446+0800","caller":"user-service/main.go:82","msg":"hello error","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n'})}),"\n",(0,r.jsx)(n.p,{children:"\u5bf9\u6bd4\u53d1\u73b0\uff0c\u65e5\u5fd7\u53ea\u4f1a\u6253\u5370\u5f53\u524d\u53ca\u4ee5\u4e0b\u7ea7\u522b\u7684\u65e5\u5fd7\uff0c\u5177\u4f53\u5982\u4e0b\uff1a"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"debug \u4f1a\u6253\u5370 debug\u3001info\u3001warn\u3001error \u7ea7\u522b\u7684\u65e5\u5fd7"}),"\n",(0,r.jsx)(n.li,{children:"info \u4f1a\u6253\u5370 info\u3001warn\u3001error \u7ea7\u522b\u7684\u65e5\u5fd7"}),"\n",(0,r.jsx)(n.li,{children:"warn \u4f1a\u6253\u5370 warn\u3001error \u7ea7\u522b\u7684\u65e5\u5fd7"}),"\n",(0,r.jsx)(n.li,{children:"error \u53ea\u4f1a\u6253\u5370\u7ea7\u522b\u7684\u65e5\u5fd7"}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["\u6240\u4ee5\u5efa\u8bae\u751f\u4ea7\u73af\u5883\u5efa\u8bae\u5f00\u542f ",(0,r.jsx)(n.code,{children:"warn"})," \u6216 ",(0,r.jsx)(n.code,{children:"error"})," \u7ea7\u522b\u7684\u65e5\u5fd7\u3002"]}),"\n",(0,r.jsx)(n.h3,{id:"name",children:"Name"}),"\n",(0,r.jsxs)(n.p,{children:["\u670d\u52a1\u540d\uff0c\u5bf9\u5e94\u5230\u65e5\u5fd7\u91cc\u5c31\u662f ",(0,r.jsx)(n.code,{children:"app_id"})," \u5b57\u6bb5\u3002"]}),"\n",(0,r.jsx)(n.h3,{id:"writers",children:"Writers"}),"\n",(0,r.jsxs)(n.p,{children:["\u5176\u4e2d ",(0,r.jsx)(n.code,{children:"Writers"})," \u662f\u65e5\u5fd7\u9700\u8981\u8f93\u51fa\u5230\u7684\u4f4d\u7f6e\uff0c\u503c\u4e3a ",(0,r.jsx)(n.code,{children:"file"})," \u6216 ",(0,r.jsx)(n.code,{children:"console"}),"\uff0c\u9009\u62e9file\u4f1a\u5c06\u65e5\u5fd7\u8bb0\u5f55\u5230logger_file\u6307\u5b9a\u7684\u65e5\u5fd7\u6587\u4ef6\u4e2d\uff0c\u9009\u62e9console\u4f1a\u5c06\u65e5\u5fd7\u8f93\u51fa\u5230\u6807\u51c6\u8f93\u51fa\uff0c\u5f53\u7136\u4e5f\u53ef\u4ee5\u4e24\u8005\u540c\u65f6\u9009\u62e9\u3002"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"LoggerFile"})," \u9ed8\u8ba4\u8f93\u51fa\u7684\u65e5\u5fd7\u6587\u4ef6\u540d"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"LoggerWarnFile"})," warn \u8f93\u51fa\u7684\u65e5\u5fd7\u6587\u4ef6\u540d"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"LoggerErrorFile"})," error \u8f93\u51fa\u7684\u65e5\u5fd7\u6587\u4ef6\u540d"]}),"\n"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"\u672c\u5730\u5f00\u53d1\u73af\u5883\u53ef\u4ee5\u5f00\u542fconsole\u3001\u5173\u95ed\u65e5\u5fd7\uff0c\u6d4b\u8bd5\u73af\u5883\u548c\u751f\u4ea7\u73af\u5883\u53ea\u8f93\u51fa\u5230\u6587\u4ef6"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"log-\u5b9e\u4f8b\u5316\u6d41\u7a0b",children:"log \u5b9e\u4f8b\u5316\u6d41\u7a0b"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"logger-instance",src:l(6293).A+"",width:"1740",height:"1215"})}),"\n",(0,r.jsx)(n.h2,{id:"\u521d\u59cb\u5316\u65e5\u5fd7",children:"\u521d\u59cb\u5316\u65e5\u5fd7"}),"\n",(0,r.jsxs)(n.p,{children:["\u5728 ",(0,r.jsx)(n.code,{children:"main.go"})," \u542f\u52a8\u65f6\u4f1a\u521d\u59cb\u5316\u65e5\u5fd7, \u4e4b\u540e\u53ef\u5168\u5c40\u4f7f\u7528\u3002"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"// main.go\n...\n\nlogger.Init()\n\n...\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u6253\u5370\u65e5\u5fd7\u6d41\u7a0b\u56fe",children:"\u6253\u5370\u65e5\u5fd7\u6d41\u7a0b\u56fe"}),"\n",(0,r.jsx)(n.p,{children:"\u6574\u4e2a\u6253\u5370\u65e5\u5fd7\u7684\u8fc7\u7a0b\u5982\u4e0b\uff1a"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"logger-flow",src:l(4204).A+"",width:"2538",height:"1869"})}),"\n",(0,r.jsx)(n.h2,{id:"\u4f7f\u7528\u65b9\u5f0f",children:"\u4f7f\u7528\u65b9\u5f0f"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:'import (\n  ...\n  "github.com/go-eagle/eagle/pkg/log"\n  ...\n)\n\n// info\nlog.Info("this is a info log")\nlog.Infof("this is a info log from: %s", "eagle")\n\n// warn\nlog.Warn("this is a warn log")\nlog.Warnf("this is a warn log from: %s", "eagle")\n\n// error\nlog.Error("this is a error log")\n\nerr := errors.New("test error")\nlog.Errorf("this is a error log, err: %+v", err)\n\n// \u5e26\u6709 trace_id \u548cspan_id,\u53ef\u4ee5\u914d\u5408 \u94fe\u8def\u8ffd\u8e2a\u7ec4\u4ef6\u6392\u67e5\u95ee\u9898\nlog.WithContext(ctx).Info("this is a info log")\n\n// \u6253\u5370\u591a\u5b57\u6bb5\nlogger.WithFields(logger.Fields{"key1": "val1", "key2": 100}).Info("test with multiple key")\n// Output:\n// {"level":"info","ts":"2023-04-07T19:25:24.360+0800","caller":"user-service/main.go:83","msg":"test with multiple key","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost","key1":"val1","key2":100}\n'})}),"\n",(0,r.jsx)(n.h2,{id:"\u6570\u636e\u5e93\u65e5\u5fd7",children:"\u6570\u636e\u5e93\u65e5\u5fd7"}),"\n",(0,r.jsxs)(n.p,{children:["\u5982\u679c\u60f3\u8981\u67e5\u770b\u6570\u636e\u5e93\u7684\u6267\u884cSQL, \u9700\u8981\u5728 ",(0,r.jsx)(n.code,{children:"database.yaml"})," \u91cc\u8fdb\u884c\u914d\u7f6e"]}),"\n",(0,r.jsx)(n.h3,{id:"\u6253\u5370\u6240\u6709sql",children:"\u6253\u5370\u6240\u6709SQL"}),"\n",(0,r.jsx)(n.p,{children:"\u5f00\u542f\u540e\uff0c\u6240\u6709SQL\u4f1a\u8f93\u51fa\u5230\u6807\u51c6\u8f93\u51fa\u91cc(\u63a7\u5236\u53f0)\uff0c\u914d\u7f6e\u5982\u4e0b"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"# config/database.yaml\nShowLog: true\nSlowThreshold: 0\n"})}),"\n",(0,r.jsx)(n.h3,{id:"\u6253\u5370\u6162sql",children:"\u6253\u5370\u6162SQL"}),"\n",(0,r.jsx)(n.p,{children:"\u4ee5\u6253\u5370\u6267\u884c\u8d85\u8fc7200ms\u7684\u4e3a\u4f8b\uff0cSQL\u4f1a\u8f93\u51fa\u5230\u6807\u51c6\u8f93\u51fa\u91cc(\u63a7\u5236\u53f0)\uff0c\u914d\u7f6e\u5982\u4e0b"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"# config/database.yaml\nShowLog: false\nSlowThreshold: 200ms\n"})}),"\n",(0,r.jsx)(n.h2,{id:"references",children:"References"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://zhuanlan.zhihu.com/p/672671600",children:"https://zhuanlan.zhihu.com/p/672671600"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.luozhiyun.com/archives/542",children:"https://www.luozhiyun.com/archives/542"})}),"\n"]})]})}function t(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(g,{...e})}):g(e)}},149:(e,n,l)=>{l.d(n,{A:()=>r});const r=l.p+"assets/images/logger-arch-design-16bbe2a62abda958a2c1326ae4057446.png"},4204:(e,n,l)=>{l.d(n,{A:()=>r});const r=l.p+"assets/images/logger-flow-71faddf3b0aab2ef493376c005adebe2.png"},6293:(e,n,l)=>{l.d(n,{A:()=>r});const r=l.p+"assets/images/logger-instance-52120b78f39b83aad28c1ce98d6411b9.png"},8453:(e,n,l)=>{l.d(n,{R:()=>o,x:()=>c});var r=l(6540);const i={},s=r.createContext(i);function o(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);