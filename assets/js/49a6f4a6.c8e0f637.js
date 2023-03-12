"use strict";(self.webpackChunkgo_eagle_org_2=self.webpackChunkgo_eagle_org_2||[]).push([[4038],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return m}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=r.createContext({}),s=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},p=function(e){var n=s(e.components);return r.createElement(i.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},g=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),g=s(t),m=a,d=g["".concat(i,".").concat(m)]||g[m]||u[m]||o;return t?r.createElement(d,l(l({ref:n},p),{},{components:t})):r.createElement(d,l({ref:n},p))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=g;var c={};for(var i in n)hasOwnProperty.call(n,i)&&(c[i]=n[i]);c.originalType=e,c.mdxType="string"==typeof e?e:a,l[1]=c;for(var s=2;s<o;s++)l[s]=t[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}g.displayName="MDXCreateElement"},4851:function(e,n,t){t.r(n),t.d(n,{contentTitle:function(){return i},default:function(){return g},frontMatter:function(){return c},metadata:function(){return s},toc:function(){return p}});var r=t(7462),a=t(3366),o=(t(7294),t(3905)),l=["components"],c={id:"grpc-benchmark",title:"gRPC \u57fa\u51c6\u548c\u8d1f\u8f7d\u6d4b\u8bd5",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",keywords:["Go","Eagle","Toolkit","Framework","Microservices","HTTP"],slug:"/guide/grpc-benchmark"},i=void 0,s={unversionedId:"guide/grpc-benchmark",id:"guide/grpc-benchmark",isDocsHomePage:!1,title:"gRPC \u57fa\u51c6\u548c\u8d1f\u8f7d\u6d4b\u8bd5",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",source:"@site/docs/guide/grpc-benchmark.md",sourceDirName:"guide",slug:"/guide/grpc-benchmark",permalink:"/docs/guide/grpc-benchmark",editUrl:"https://github.com/go-eagle/go-eagle.org/edit/main/docs/guide/grpc-benchmark.md",version:"current",frontMatter:{id:"grpc-benchmark",title:"gRPC \u57fa\u51c6\u548c\u8d1f\u8f7d\u6d4b\u8bd5",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",keywords:["Go","Eagle","Toolkit","Framework","Microservices","HTTP"],slug:"/guide/grpc-benchmark"},sidebar:"docs",previous:{title:"Swagger \u6587\u6863",permalink:"/docs/guide/swagger-doc"},next:{title:"\u8d21\u732e\u6307\u5357",permalink:"/docs/community/contribution"}},p=[{value:"gRPC \u6027\u80fd\u538b\u6d4b",id:"grpc-\u6027\u80fd\u538b\u6d4b",children:[{value:"\u6982\u8981",id:"\u6982\u8981",children:[]},{value:"\u5b89\u88c5 ghz",id:"\u5b89\u88c5-ghz",children:[]},{value:"\u4f7f\u7528",id:"\u4f7f\u7528",children:[]}]},{value:"Reference",id:"reference",children:[]}],u={toc:p};function g(e){var n=e.components,t=(0,a.Z)(e,l);return(0,o.kt)("wrapper",(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"grpc-\u6027\u80fd\u538b\u6d4b"},"gRPC \u6027\u80fd\u538b\u6d4b"),(0,o.kt)("h3",{id:"\u6982\u8981"},"\u6982\u8981"),(0,o.kt)("p",null,"\u4f7f\u7528gRPC\u5f00\u53d1\u5b8c\u6210\u540e\uff0c\u6211\u4eec\u9700\u8981\u5bf9\u5176\u8fdb\u884c\u57fa\u51c6\u6d4b\u8bd5\u548c\u8d1f\u8f7d\u6d4b\u8bd5\u3002\u8fd9\u91cc\u4e3b\u8981\u662f\u5bf9gRPC\u670d\u52a1\u5668\u7aef\u7684\u8d1f\u8f7d\u8fdb\u884c\u6d4b\u8bd5\u3002"),(0,o.kt)("p",null,"\u8fd9\u91cc\u6211\u4eec\u63a8\u8350\u4e00\u4e2a\u5de5\u5177 ghz."),(0,o.kt)("p",null,"ghz \u5c31\u662f\u8fd9\u6837\u7684\u8d1f\u8f7d\u6d4b\u8bd5\u5de5\u5177\uff0c\u5b83\u662f\u4f7f\u7528 Go \u8bed\u8a00\u5b9e\u73b0\u7684\u547d\u4ee4\u884c\u5de5\u5177\u3002\u5b83\u80fd\u591f\u5728\u672c\u5730\u5bf9\u670d\u52a1\u8fdb\u884c\u6d4b\u8bd5\u548c\u8c03\u8bd5\uff0c\u4e5f\u80fd\u7528\u5728\u81ea\u52a8\u5316\u6301\u7eed\u96c6\u6210\u73af\u5883\u4e2d\uff0c\u5b9e\u73b0\u6027\u80fd\u56de\u5f52\u6d4b\u8bd5."),(0,o.kt)("h3",{id:"\u5b89\u88c5-ghz"},"\u5b89\u88c5 ghz"),(0,o.kt)("h4",{id:"macoshomebrew"},"macOS(Homebrew)"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"brew install ghz\n")),(0,o.kt)("h4",{id:"\u7f16\u8bd1\u5b89\u88c5"},"\u7f16\u8bd1\u5b89\u88c5"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/bojand/ghz\n\ncd ghz\n\n# \u8fd9\u91cc\u7f16\u8bd1\u5305\u542b ghz\u672c\u8eab\u548cghz-web\nmake build\n\ncp ./dist/ghz /usr/local/bin/\n\n# \u67e5\u770b\u5e2e\u52a9\nghz -h\n")),(0,o.kt)("h3",{id:"\u4f7f\u7528"},"\u4f7f\u7528"),(0,o.kt)("h4",{id:"a-simple-insecure-unary-call"},"A simple insecure unary call"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'ghz --insecure \\\n    --proto ./helloworld/greeter.proto \\\n    --call helloworld.Greeter/SayHello \\\n    -d \'{"name": "Eagle"}\' \\\n    -n 10000 \\\n    -c 100  \\\n    0.0.0.0:9090\n')),(0,o.kt)("p",null,"\u8f93\u51fa\u7ed3\u679c"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"Summary:\n  Count:        10000\n  Total:        949.45 ms\n  Slowest:      44.86 ms\n  Fastest:      0.12 ms\n  Average:      4.36 ms\n  Requests/sec: 10532.46\n\nResponse time histogram:\n  0.118  [1]    |\n  4.591  [6064] |\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\n  9.065  [3006] |\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\u220e\n  13.539 [601]  |\u220e\u220e\u220e\u220e\n  18.013 [239]  |\u220e\u220e\n  22.486 [43]   |\n  26.960 [19]   |\n  31.434 [23]   |\n  35.908 [3]    |\n  40.381 [0]    |\n  44.855 [1]    |\n\nLatency distribution:\n  10 % in 0.67 ms \n  25 % in 1.46 ms \n  50 % in 3.38 ms \n  75 % in 6.20 ms \n  90 % in 8.80 ms \n  95 % in 11.56 ms \n  99 % in 17.54 ms \n\nStatus code distribution:\n  [OK]   10000 responses\n")),(0,o.kt)("p",null,"\u66f4\u591aexample\u53ef\u4ee5\u67e5\u770b ",(0,o.kt)("a",{parentName:"p",href:"https://ghz.sh/docs/examples"},"https://ghz.sh/docs/examples")),(0,o.kt)("h4",{id:"\u7ed3\u679c\u8f93\u51fa\u5230web\u67e5\u770b"},"\u7ed3\u679c\u8f93\u51fa\u5230web\u67e5\u770b"),(0,o.kt)("p",null,"\u6253\u5f00ghz-web\u63a7\u5236\u53f0"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"./dist/ghz-web\n\n# \u53ef\u4ee5\u770b\u5230web\u8fd0\u884c\u572880\u7aef\u53e3\n...\n\u21e8 http server started on [::]:80\n...\n")),(0,o.kt)("p",null,"\u63a7\u5236\u53f0\u9996\u9875\n",(0,o.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/3043638/155119046-edd3f5a0-a69d-4edf-8728-57fc73260fd6.png",alt:"image"})),(0,o.kt)("p",null,"\u65b0\u5efa\u9879\u76ee"),(0,o.kt)("p",null,"\u5728web\u63a7\u5236\u53f0\u521b\u5efa\u4e00\u4e2a\u9879\u76ee\uff0c\u4f9b\u4e0b\u9762\u4f7f\u7528\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'ghz --insecure \\\n    --proto ./helloworld/greeter.proto \\\n    --call helloworld.Greeter/SayHello \\\n    -d \'{"name": "Eagle"}\' \\\n    -n 10000 \\\n    -c 100  \\\n    --tags \'{"env": "staging", "created by":"Go Developer"}\' \\\n    --name \'Greeter SayHello\' \\\n    -O json \\\n    0.0.0.0:9090 | curl -H "Content-Type:application/json" -XPOST -d @- "http://localhost:80/api/projects/1/ingest"\n')),(0,o.kt)("p",null,"\u4e4b\u540e\u5c31\u53ef\u4ee5\u5728\u63a7\u5236\u53f0\u67e5\u770b\uff0c\u6548\u679c\u5982\u4e0b\n",(0,o.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/3043638/155119480-b7d55c1a-1471-4b85-80e2-465451cb566f.png",alt:"image"})),(0,o.kt)("h2",{id:"reference"},"Reference"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://ghz.sh/"},"ghz\u5b98\u7f51")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/bojand/ghz"},"bojand/ghz")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://ghz.sh/docs/examples"},"Exmaples"))))}g.isMDXComponent=!0}}]);