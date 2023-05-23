"use strict";(self.webpackChunkgo_eagle_org_2=self.webpackChunkgo_eagle_org_2||[]).push([[4888],{3905:function(e,n,r){r.d(n,{Zo:function(){return c},kt:function(){return d}});var l=r(7294);function t(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function a(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,l)}return r}function o(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?a(Object(r),!0).forEach((function(n){t(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function i(e,n){if(null==e)return{};var r,l,t=function(e,n){if(null==e)return{};var r,l,t={},a=Object.keys(e);for(l=0;l<a.length;l++)r=a[l],n.indexOf(r)>=0||(t[r]=e[r]);return t}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(l=0;l<a.length;l++)r=a[l],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(t[r]=e[r])}return t}var s=l.createContext({}),p=function(e){var n=l.useContext(s),r=n;return e&&(r="function"==typeof e?e(n):o(o({},n),e)),r},c=function(e){var n=p(e.components);return l.createElement(s.Provider,{value:n},e.children)},g={inlineCode:"code",wrapper:function(e){var n=e.children;return l.createElement(l.Fragment,{},n)}},u=l.forwardRef((function(e,n){var r=e.components,t=e.mdxType,a=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=p(r),d=t,m=u["".concat(s,".").concat(d)]||u[d]||g[d]||a;return r?l.createElement(m,o(o({ref:n},c),{},{components:r})):l.createElement(m,o({ref:n},c))}));function d(e,n){var r=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var a=r.length,o=new Array(a);o[0]=u;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i.mdxType="string"==typeof e?e:t,o[1]=i;for(var p=2;p<a;p++)o[p]=r[p];return l.createElement.apply(null,o)}return l.createElement.apply(null,r)}u.displayName="MDXCreateElement"},4039:function(e,n,r){r.r(n),r.d(n,{contentTitle:function(){return s},default:function(){return u},frontMatter:function(){return i},metadata:function(){return p},toc:function(){return c}});var l=r(7462),t=r(3366),a=(r(7294),r(3905)),o=["components"],i={id:"logging",title:"\u65e5\u5fd7\u7ec4\u4ef6",description:"\u65e5\u5fd7\u7684\u5b9a\u4e49\u548c\u4f7f\u7528",keywords:["Go","Eagle","Toolkit","Framework","Microservices","HTTP"],slug:"/component/logging"},s=void 0,p={unversionedId:"component/logging",id:"component/logging",isDocsHomePage:!1,title:"\u65e5\u5fd7\u7ec4\u4ef6",description:"\u65e5\u5fd7\u7684\u5b9a\u4e49\u548c\u4f7f\u7528",source:"@site/docs/component/logging.md",sourceDirName:"component",slug:"/component/logging",permalink:"/docs/component/logging",editUrl:"https://github.com/go-eagle/go-eagle.org/edit/main/docs/component/logging.md",version:"current",frontMatter:{id:"logging",title:"\u65e5\u5fd7\u7ec4\u4ef6",description:"\u65e5\u5fd7\u7684\u5b9a\u4e49\u548c\u4f7f\u7528",keywords:["Go","Eagle","Toolkit","Framework","Microservices","HTTP"],slug:"/component/logging"},sidebar:"docs",previous:{title:"\u914d\u7f6e\u7ba1\u7406",permalink:"/docs/component/config"},next:{title:"\u9519\u8bef\u5904\u7406",permalink:"/docs/component/errors"}},c=[{value:"\u8bf4\u660e",id:"\u8bf4\u660e",children:[]},{value:"\u529f\u80fd\u70b9",id:"\u529f\u80fd\u70b9",children:[]},{value:"\u63a5\u53e3\u5b9a\u4e49",id:"\u63a5\u53e3\u5b9a\u4e49",children:[]},{value:"\u65e5\u5fd7\u914d\u7f6e",id:"\u65e5\u5fd7\u914d\u7f6e",children:[{value:"Development",id:"development",children:[]},{value:"DisableCaller",id:"disablecaller",children:[]},{value:"Encoding",id:"encoding",children:[]},{value:"Level",id:"level",children:[]},{value:"Name",id:"name",children:[]},{value:"Writers",id:"writers",children:[]}]},{value:"\u521d\u59cb\u5316\u65e5\u5fd7",id:"\u521d\u59cb\u5316\u65e5\u5fd7",children:[]},{value:"\u4f7f\u7528\u65b9\u5f0f",id:"\u4f7f\u7528\u65b9\u5f0f",children:[]},{value:"\u6570\u636e\u5e93\u65e5\u5fd7",id:"\u6570\u636e\u5e93\u65e5\u5fd7",children:[{value:"\u6253\u5370\u6240\u6709SQL",id:"\u6253\u5370\u6240\u6709sql",children:[]},{value:"\u6253\u5370\u6162SQL",id:"\u6253\u5370\u6162sql",children:[]}]}],g={toc:c};function u(e){var n=e.components,r=(0,t.Z)(e,o);return(0,a.kt)("wrapper",(0,l.Z)({},g,r,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"\u8bf4\u660e"},"\u8bf4\u660e"),(0,a.kt)("p",null,"\u65e5\u5fd7\u57fa\u4e8e zap \u8fdb\u884c\u5c01\u88c5\uff0c\u540c\u65f6\u4e5f\u652f\u6301\u5207\u5272\uff0c\u9ed8\u8ba4\u6309\u7167\u5929\u8fdb\u884c\u5207\u5272\u3002"),(0,a.kt)("h2",{id:"\u529f\u80fd\u70b9"},"\u529f\u80fd\u70b9"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u652f\u6301\u65e5\u5fd7\u5199\u5165\u5230\u591a\u4e2a\u6d41\u4e2d\uff0c\u63a7\u5236\u53f0\u6216\u65e5\u5fd7\u6587\u4ef6"),(0,a.kt)("li",{parentName:"ul"},"\u652f\u6301\u591a\u65e5\u5fd7\u7ea7\u522b\uff0c\u5305\u62ec\uff1aDEBUG,INFO,WARN,ERROR"),(0,a.kt)("li",{parentName:"ul"},"\u652f\u6301\u7ed3\u6784\u5316\u8f93\u51fa\uff0c\u9ed8\u8ba4json\uff0c\u65b9\u4fbf\u65e5\u5fd7\u6536\u96c6"),(0,a.kt)("li",{parentName:"ul"},"\u652f\u6301\u65e5\u5fd7\u5207\u5272\uff0c\u6309\u65f6\u95f4\u8fdb\u884c\u5207\u5272"),(0,a.kt)("li",{parentName:"ul"},"\u652f\u6301\u6253\u5370\u6587\u4ef6\u548c\u884c\u53f7")),(0,a.kt)("h2",{id:"\u63a5\u53e3\u5b9a\u4e49"},"\u63a5\u53e3\u5b9a\u4e49"),(0,a.kt)("p",null,"\u4e3a\u4e86\u65b9\u4fbf\u9002\u914d\u4e0d\u901a\u7684\u65e5\u5fd7\u63a5\u5165\uff0c\u8fd9\u91cc\u5b9a\u4e49\u4e86\u51e0\u4e2a\u63a5\u53e3"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},"// github.com/go-eagle/eagle/pkg/log/logger.go\n\ntype Logger interface {\n  Debug(args ...interface{})\n  Debugf(format string, args ...interface{})\n\n  Info(args ...interface{})\n  Infof(format string, args ...interface{})\n\n  Warn(args ...interface{})\n  Warnf(format string, args ...interface{})\n\n  Error(args ...interface{})\n  Errorf(format string, args ...interface{})\n\n  WithFields(keyValues Fields) Logger\n}\n")),(0,a.kt)("h2",{id:"\u65e5\u5fd7\u914d\u7f6e"},"\u65e5\u5fd7\u914d\u7f6e"),(0,a.kt)("p",null,"\u914d\u7f6e\u6587\u4ef6\u4f4d\u4e8e ",(0,a.kt)("inlineCode",{parentName:"p"},"config")," \u76ee\u5f55\u4e0b\uff0c\u6587\u4ef6\u540d\u4e3a\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"logger"),"\n\u5982\u679c\u662f\u591a\u73af\u5883\u914d\u7f6e\uff0c\u53ef\u4ee5\u662f ",(0,a.kt)("inlineCode",{parentName:"p"},"config/{env}/logger.yaml")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"# config/logger.yaml\n  Development: false\n  DisableCaller: false\n  DisableStacktrace: false\n  Encoding: json   # json or console\n  Level: info      # \u65e5\u5fd7\u7ea7\u522b\uff0cDEBUG\u3001INFO\u3001WARN\u3001ERROR\n  Name: eagle\n  Writers: console # file or console\n  LoggerFile: /tmp/log/eagle.log           # \u6240\u6709level\u7684\u65e5\u5fd7\u6587\u4ef6\n  LoggerWarnFile: /tmp/log/eagle.wf.log    # \u4ec5\u8bb0\u5f55warn\u7684\u65e5\u5fd7\u6587\u4ef6\n  LoggerErrorFile: /tmp/log/eagle.err.log  # \u4ec5\u8bb0\u5f55error\u7684\u65e5\u5fd7\u6587\u4ef6\n  LogRollingPolicy: daily   # \u65e5\u5fd7\u5207\u5272\u65b9\u5f0f: daily/hourly\uff0c\u9ed8\u8ba4\u6309\u5929(daily)\u8fdb\u884c\u5207\u5272\n  LogBackupCount: 7         # \u65e5\u5fd7\u5907\u4efd\u6570\n")),(0,a.kt)("p",null,"\u4e0b\u9762\u901a\u8fc7\u6253\u53705\u6761\u65e5\u5fd7\u6765\u67e5\u770b\u5404\u53c2\u6570\u7684\u6253\u5370\u6548\u679c"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'  logger.Debug("hello debug")\n    logger.Info("hello info")\n    logger.Warn("hello warn")\n    logger.Error("hello error")\n    logger.WithFields(logger.Fields{"key1": "val1", "key2": 100}).Info("test with multiple key")\n')),(0,a.kt)("h3",{id:"development"},"Development"),(0,a.kt)("p",null,"\u662f\u5426\u662f\u5f00\u53d1\u73af\u5883\uff0c\u53ef\u9009\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"true")," \u548c ",(0,a.kt)("inlineCode",{parentName:"p"},"false"),"\uff0c\u9ed8\u8ba4\u4e3a",(0,a.kt)("inlineCode",{parentName:"p"},"false"),", \u793a\u4f8b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'# \u8bbe\u4e3atrue\n{"L":"INFO","T":"2023-04-07T18:57:46.759+0800","C":"user-service/main.go:80","M":"hello info","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n\n# \u8bbe\u4e3afalse\n{"level":"info","ts":"2023-04-07T18:56:48.342+0800","caller":"user-service/main.go:80","msg":"hello info","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n')),(0,a.kt)("h3",{id:"disablecaller"},"DisableCaller"),(0,a.kt)("p",null,"\u662f\u5426\u6253\u5370\u65e5\u5fd7\u7684\u6587\u4ef6\u8c03\u7528\u6587\u4ef6\u548c\u884c\u53f7\uff0c\u5373\u65e5\u5fd7\u6587\u4ef6\u91cc\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"caller")," \u5b57\u6bb5\u3002"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u5f00\u542f\u540e\u4f1a\u6709\u4e00\u5b9a\u7684\u6027\u80fd\u635f\u8017\uff0c\u4f46\u57fa\u672c\u5927\u90e8\u5206\u573a\u666f\u53ef\u4ee5\u5ffd\u7565")),(0,a.kt)("h3",{id:"encoding"},"Encoding"),(0,a.kt)("p",null,"\u6253\u5370\u7684\u65e5\u5fd7\u683c\u5f0f\uff0c\u9ed8\u8ba4\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"json"),", \u4e5f\u53ef\u4ee5\u4fee\u6539\u4e3a\u5b58\u6587\u672c\u683c\u5f0f\uff0c\u53ef\u9009\u503c\u4e3a\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"json")," \u548c ",(0,a.kt)("inlineCode",{parentName:"p"},"console")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'# \u8bbe\u4e3a json\n{"level":"info","ts":"2023-04-07T18:56:48.342+0800","caller":"user-service/main.go:80","msg":"hello info","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n\n# \u8bbe\u4e3a console\n2023-04-07T19:09:27.773+0800    INFO    user-service/main.go:80 hello info      {"ip": "10.61.160.72", "app_id": "user-svc", "instance_id": "localhost"}\n')),(0,a.kt)("h3",{id:"level"},"Level"),(0,a.kt)("p",null,"\u914d\u7f6e\u7684\u65e5\u5fd7\u7ea7\u522b\uff0c\u672c\u5730\u548c\u6d4b\u8bd5\u53ef\u4ee5\u5f00\u542f\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"debug"),"\uff0c\u751f\u4ea7\u73af\u5883\u53ef\u4ee5\u914d\u7f6e\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"warn"),"\u3002"),(0,a.kt)("p",null,"\u5f00\u542f ",(0,a.kt)("inlineCode",{parentName:"p"},"debug")," \u7684\u65e5\u5fd7\u6548\u679c"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'{"level":"debug","ts":"2023-04-07T19:19:42.950+0800","caller":"user-service/main.go:79","msg":"hello debug","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n{"level":"info","ts":"2023-04-07T19:19:42.950+0800","caller":"user-service/main.go:80","msg":"hello info","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n{"level":"warn","ts":"2023-04-07T19:19:42.950+0800","caller":"user-service/main.go:81","msg":"hello warn","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n{"level":"error","ts":"2023-04-07T19:19:42.950+0800","caller":"user-service/main.go:82","msg":"hello error","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n')),(0,a.kt)("p",null,"\u5f00\u542f ",(0,a.kt)("inlineCode",{parentName:"p"},"warn")," \u7684\u65e5\u5fd7\u6548\u679c"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'{"level":"warn","ts":"2023-04-07T19:20:25.446+0800","caller":"user-service/main.go:81","msg":"hello warn","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n{"level":"error","ts":"2023-04-07T19:20:25.446+0800","caller":"user-service/main.go:82","msg":"hello error","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost"}\n')),(0,a.kt)("p",null,"\u5bf9\u6bd4\u53d1\u73b0\uff0c\u65e5\u5fd7\u53ea\u4f1a\u6253\u5370\u5f53\u524d\u53ca\u4ee5\u4e0b\u7ea7\u522b\u7684\u65e5\u5fd7\uff0c\u5177\u4f53\u5982\u4e0b\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"debug \u4f1a\u6253\u5370 debug\u3001info\u3001warn\u3001error \u7ea7\u522b\u7684\u65e5\u5fd7"),(0,a.kt)("li",{parentName:"ul"},"info \u4f1a\u6253\u5370 info\u3001warn\u3001error \u7ea7\u522b\u7684\u65e5\u5fd7"),(0,a.kt)("li",{parentName:"ul"},"warn \u4f1a\u6253\u5370 warn\u3001error \u7ea7\u522b\u7684\u65e5\u5fd7"),(0,a.kt)("li",{parentName:"ul"},"error \u53ea\u4f1a\u6253\u5370\u7ea7\u522b\u7684\u65e5\u5fd7")),(0,a.kt)("p",null,"\u6240\u4ee5\u5efa\u8bae\u751f\u4ea7\u73af\u5883\u5efa\u8bae\u5f00\u542f ",(0,a.kt)("inlineCode",{parentName:"p"},"warn")," \u6216 ",(0,a.kt)("inlineCode",{parentName:"p"},"error")," \u7ea7\u522b\u7684\u65e5\u5fd7\u3002 "),(0,a.kt)("h3",{id:"name"},"Name"),(0,a.kt)("p",null,"\u670d\u52a1\u540d\uff0c\u5bf9\u5e94\u5230\u65e5\u5fd7\u91cc\u5c31\u662f ",(0,a.kt)("inlineCode",{parentName:"p"},"app_id")," \u5b57\u6bb5\u3002"),(0,a.kt)("h3",{id:"writers"},"Writers"),(0,a.kt)("p",null,"\u5176\u4e2d ",(0,a.kt)("inlineCode",{parentName:"p"},"Writers")," \u662f\u65e5\u5fd7\u9700\u8981\u8f93\u51fa\u5230\u7684\u4f4d\u7f6e\uff0c\u503c\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"file")," \u6216 ",(0,a.kt)("inlineCode",{parentName:"p"},"console"),"\uff0c\u9009\u62e9file\u4f1a\u5c06\u65e5\u5fd7\u8bb0\u5f55\u5230logger_file\u6307\u5b9a\u7684\u65e5\u5fd7\u6587\u4ef6\u4e2d\uff0c\u9009\u62e9console\u4f1a\u5c06\u65e5\u5fd7\u8f93\u51fa\u5230\u6807\u51c6\u8f93\u51fa\uff0c\u5f53\u7136\u4e5f\u53ef\u4ee5\u4e24\u8005\u540c\u65f6\u9009\u62e9\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"LoggerFile")," \u9ed8\u8ba4\u8f93\u51fa\u7684\u65e5\u5fd7\u6587\u4ef6\u540d"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"LoggerWarnFile")," warn \u8f93\u51fa\u7684\u65e5\u5fd7\u6587\u4ef6\u540d"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"LoggerErrorFile")," error \u8f93\u51fa\u7684\u65e5\u5fd7\u6587\u4ef6\u540d")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u672c\u5730\u5f00\u53d1\u73af\u5883\u53ef\u4ee5\u5f00\u542fconsole\u3001\u5173\u95ed\u65e5\u5fd7\uff0c\u6d4b\u8bd5\u73af\u5883\u548c\u751f\u4ea7\u73af\u5883\u53ea\u8f93\u51fa\u5230\u6587\u4ef6")),(0,a.kt)("h2",{id:"\u521d\u59cb\u5316\u65e5\u5fd7"},"\u521d\u59cb\u5316\u65e5\u5fd7"),(0,a.kt)("p",null,"\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"main.go")," \u542f\u52a8\u65f6\u4f1a\u521d\u59cb\u5316\u65e5\u5fd7, \u4e4b\u540e\u53ef\u5168\u5c40\u4f7f\u7528\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},"// main.go\n...\n\nlogger.Init()\n\n...\n")),(0,a.kt)("h2",{id:"\u4f7f\u7528\u65b9\u5f0f"},"\u4f7f\u7528\u65b9\u5f0f"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'import (\n  ...\n  "github.com/go-eagle/eagle/pkg/log"\n  ...\n)\n\n// info\nlog.Info("this is a info log")\nlog.Infof("this is a info log from: %s", "eagle")\n\n// warn\nlog.Warn("this is a warn log")\nlog.Warnf("this is a warn log from: %s", "eagle")\n\n// error\nlog.Error("this is a error log")\n\nerr := errors.New("test error")\nlog.Errorf("this is a error log, err: %+v", err)\n\n// \u5e26\u6709 trace_id \u548cspan_id,\u53ef\u4ee5\u914d\u5408 \u94fe\u8def\u8ffd\u8e2a\u7ec4\u4ef6\u6392\u67e5\u95ee\u9898\nlog.WithContext(ctx).Info("this is a info log")\n\n// \u6253\u5370\u591a\u5b57\u6bb5\nlogger.WithFields(logger.Fields{"key1": "val1", "key2": 100}).Info("test with multiple key")\n// Output:\n// {"level":"info","ts":"2023-04-07T19:25:24.360+0800","caller":"user-service/main.go:83","msg":"test with multiple key","ip":"10.61.160.72","app_id":"user-svc","instance_id":"localhost","key1":"val1","key2":100}\n')),(0,a.kt)("h2",{id:"\u6570\u636e\u5e93\u65e5\u5fd7"},"\u6570\u636e\u5e93\u65e5\u5fd7"),(0,a.kt)("p",null,"\u5982\u679c\u60f3\u8981\u67e5\u770b\u6570\u636e\u5e93\u7684\u6267\u884cSQL, \u9700\u8981\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"database.yaml")," \u91cc\u8fdb\u884c\u914d\u7f6e"),(0,a.kt)("h3",{id:"\u6253\u5370\u6240\u6709sql"},"\u6253\u5370\u6240\u6709SQL"),(0,a.kt)("p",null,"\u5f00\u542f\u540e\uff0c\u6240\u6709SQL\u4f1a\u8f93\u51fa\u5230\u6807\u51c6\u8f93\u51fa\u91cc(\u63a7\u5236\u53f0)\uff0c\u914d\u7f6e\u5982\u4e0b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"# config/database.yaml\nShowLog: true\nSlowThreshold: 0\n")),(0,a.kt)("h3",{id:"\u6253\u5370\u6162sql"},"\u6253\u5370\u6162SQL"),(0,a.kt)("p",null,"\u4ee5\u6253\u5370\u6267\u884c\u8d85\u8fc7200ms\u7684\u4e3a\u4f8b\uff0cSQL\u4f1a\u8f93\u51fa\u5230\u6807\u51c6\u8f93\u51fa\u91cc(\u63a7\u5236\u53f0)\uff0c\u914d\u7f6e\u5982\u4e0b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"# config/database.yaml\nShowLog: false\nSlowThreshold: 200ms\n")))}u.isMDXComponent=!0}}]);