"use strict";(self.webpackChunkgo_eagle_org_2=self.webpackChunkgo_eagle_org_2||[]).push([[4390],{3905:function(e,r,n){n.d(r,{Zo:function(){return u},kt:function(){return s}});var t=n(7294);function o(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function c(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function a(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?c(Object(n),!0).forEach((function(r){o(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function i(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},c=Object.keys(e);for(t=0;t<c.length;t++)n=c[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(t=0;t<c.length;t++)n=c[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=t.createContext({}),l=function(e){var r=t.useContext(p),n=r;return e&&(n="function"==typeof e?e(r):a(a({},r),e)),n},u=function(e){var r=l(e.components);return t.createElement(p.Provider,{value:r},e.children)},m={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},f=t.forwardRef((function(e,r){var n=e.components,o=e.mdxType,c=e.originalType,p=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),f=l(n),s=o,g=f["".concat(p,".").concat(s)]||f[s]||m[s]||c;return n?t.createElement(g,a(a({ref:r},u),{},{components:n})):t.createElement(g,a({ref:r},u))}));function s(e,r){var n=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var c=n.length,a=new Array(c);a[0]=f;var i={};for(var p in r)hasOwnProperty.call(r,p)&&(i[p]=r[p]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var l=2;l<c;l++)a[l]=n[l];return t.createElement.apply(null,a)}return t.createElement.apply(null,n)}f.displayName="MDXCreateElement"},7134:function(e,r,n){n.r(r),n.d(r,{contentTitle:function(){return p},default:function(){return f},frontMatter:function(){return i},metadata:function(){return l},toc:function(){return u}});var t=n(7462),o=n(3366),c=(n(7294),n(3905)),a=["components"],i={id:"custom",title:"\u81ea\u5b9a\u4e49\u62e6\u622a\u5668",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",keywords:["Go","Eagle","custom gRPC interceptor","Toolkit","Framework","Microservices","HTTP"],slug:"/component/interceptor/custom"},p=void 0,l={unversionedId:"component/interceptor/custom",id:"component/interceptor/custom",isDocsHomePage:!1,title:"\u81ea\u5b9a\u4e49\u62e6\u622a\u5668",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",source:"@site/docs/component/interceptor/custom.md",sourceDirName:"component/interceptor",slug:"/component/interceptor/custom",permalink:"/docs/component/interceptor/custom",editUrl:"https://github.com/go-eagle/go-eagle.org/edit/main/docs/component/interceptor/custom.md",version:"current",frontMatter:{id:"custom",title:"\u81ea\u5b9a\u4e49\u62e6\u622a\u5668",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",keywords:["Go","Eagle","custom gRPC interceptor","Toolkit","Framework","Microservices","HTTP"],slug:"/component/interceptor/custom"},sidebar:"docs",previous:{title:"\u65e5\u5fd7\u62e6\u622a\u5668",permalink:"/docs/component/interceptor/logging"},next:{title:"\u6982\u89c8",permalink:"/docs/component/transport/overview"}},u=[{value:"\u81ea\u5b9a\u4e49server\u4e2d\u95f4\u4ef6",id:"\u81ea\u5b9a\u4e49server\u4e2d\u95f4\u4ef6",children:[{value:"\u6b65\u9aa4\u4e00\uff1a\u7f16\u5199\u62e6\u622a\u5668",id:"\u6b65\u9aa4\u4e00\u7f16\u5199\u62e6\u622a\u5668",children:[]},{value:"\u6b65\u9aa4\u4e8c\uff1a\u5c06\u62e6\u622a\u5668\u52a0\u5165\u5230server\u4e2d",id:"\u6b65\u9aa4\u4e8c\u5c06\u62e6\u622a\u5668\u52a0\u5165\u5230server\u4e2d",children:[]},{value:"\u62e6\u622a\u5668\u987a\u5e8fdemo",id:"\u62e6\u622a\u5668\u987a\u5e8fdemo",children:[]}]}],m={toc:u};function f(e){var r=e.components,n=(0,o.Z)(e,a);return(0,c.kt)("wrapper",(0,t.Z)({},m,n,{components:r,mdxType:"MDXLayout"}),(0,c.kt)("p",null,"\u5982\u679c\u6846\u67b6\u81ea\u5e26\u7684\u62e6\u622a\u5668\u90fd\u6ca1\u6709\u6ee1\u8db3\u9700\u6c42\u7684\uff0c\u5219\u53ef\u4ee5\u81ea\u5b9a\u4e49\u6216\u8005\u4f7f\u7528\u793e\u533a\u63d0\u4f9b\u7684\u62e6\u622a\u5668\u3002"),(0,c.kt)("h2",{id:"\u81ea\u5b9a\u4e49server\u4e2d\u95f4\u4ef6"},"\u81ea\u5b9a\u4e49server\u4e2d\u95f4\u4ef6"),(0,c.kt)("h3",{id:"\u6b65\u9aa4\u4e00\u7f16\u5199\u62e6\u622a\u5668"},"\u6b65\u9aa4\u4e00\uff1a\u7f16\u5199\u62e6\u622a\u5668"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-go"},'import (\n  ...\n  grpc2 "google.golang.org/grpc"\n  ...\n)\nfunc UnaryServerInterceptorDemo() grpc2.UnaryServerInterceptor {\n    return func(ctx context.Context, req interface{}, info *grpc2.UnaryServerInfo, handler grpc2.UnaryHandler) (_ interface{}, err error) {\n\n      fmt.Println("======= demo before=======")\n      defer func() {\n        if err := recover(); err != nil {\n          //\u6253\u5370\u9519\u8bef\u5806\u6808\u4fe1\u606f\n          fmt.Println(err)\n\n        }\n      }()\n\n      resp, err := handler(ctx, req)\n\n      fmt.Println("======= demo after=======")\n\n      return resp, err\n    }\n}\n\n')),(0,c.kt)("h3",{id:"\u6b65\u9aa4\u4e8c\u5c06\u62e6\u622a\u5668\u52a0\u5165\u5230server\u4e2d"},"\u6b65\u9aa4\u4e8c\uff1a\u5c06\u62e6\u622a\u5668\u52a0\u5165\u5230server\u4e2d"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-go"},'import (\n  "github.com/go-eagle/eagle/pkg/transport/grpc"\n)\n  grpcServer := grpc.NewServer(\n      grpc.Network("tcp"),\n      grpc.Address(":9000"),\n      grpc.Timeout(3*time.Second),\n      grpc.UnaryInterceptor(UnaryServerInterceptorDemo()),\n    )\n')),(0,c.kt)("p",null,"\u5230\u6b64\u81ea\u5b9a\u4e49\u62e6\u622a\u5668\u5f00\u53d1\u5b8c\u6bd5\uff0c\u8fd9\u91cc\u9700\u8981\u6ce8\u610f\u62e6\u622a\u5668\u7684\u987a\u5e8f\u95ee\u9898\u3002"),(0,c.kt)("h3",{id:"\u62e6\u622a\u5668\u987a\u5e8fdemo"},"\u62e6\u622a\u5668\u987a\u5e8fdemo"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-go"},'import (\n  ...\n  grpc2 "google.golang.org/grpc"\n  ...\n)\n\nfunc UnaryServerInterceptorDemo() grpc2.UnaryServerInterceptor {\n    return func(ctx context.Context, req interface{}, info *grpc2.UnaryServerInfo, handler grpc2.UnaryHandler) (_ interface{}, err error) {\n\n        fmt.Println("======= demo before=======")\n        defer func() {\n            if err := recover(); err != nil {\n                //\u6253\u5370\u9519\u8bef\u5806\u6808\u4fe1\u606f\n                fmt.Println(err)\n\n            }\n        }()\n\n        resp, err := handler(ctx, req)\n\n        fmt.Println("======= demo after=======")\n\n        return resp, err\n    }\n}\n\nfunc UnaryServerInterceptorDemo2() grpc2.UnaryServerInterceptor {\n    return func(ctx context.Context, req interface{}, info *grpc2.UnaryServerInfo, handler grpc2.UnaryHandler) (_ interface{}, err error) {\n\n        fmt.Println("======= demo2 before=======")\n\n        defer func() {\n            if err := recover(); err != nil {\n                //\u6253\u5370\u9519\u8bef\u5806\u6808\u4fe1\u606f\n                fmt.Println(err)\n\n            }\n        }()\n\n        resp, err := handler(ctx, req)\n\n        fmt.Println("======= demo2 after=======")\n        return resp, err\n    }\n}\n')),(0,c.kt)("p",null,"\u8f93\u51fa\u7ed3\u679c"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-bash"},"======= demo before=======\n======= demo2 before======\n======= demo2 after=======\n======= demo after========\n")))}f.isMDXComponent=!0}}]);