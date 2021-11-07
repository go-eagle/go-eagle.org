"use strict";(self.webpackChunkgo_eagle_org_2=self.webpackChunkgo_eagle_org_2||[]).push([[7002],{3905:function(e,n,t){t.d(n,{Zo:function(){return d},kt:function(){return s}});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=r.createContext({}),l=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},d=function(e){var n=l(e.components);return r.createElement(p.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),u=l(t),s=o,g=u["".concat(p,".").concat(s)]||u[s]||m[s]||i;return t?r.createElement(g,a(a({ref:n},d),{},{components:t})):r.createElement(g,a({ref:n},d))}));function s(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=u;var c={};for(var p in n)hasOwnProperty.call(n,p)&&(c[p]=n[p]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var l=2;l<i;l++)a[l]=t[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},1848:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return c},contentTitle:function(){return p},metadata:function(){return l},toc:function(){return d},default:function(){return u}});var r=t(7462),o=t(3366),i=(t(7294),t(3905)),a=["components"],c={id:"component",title:"\u7ec4\u4ef6",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",keywords:["Go","Eagle","Toolkit","Framework","Microservices","HTTP"],slug:"/component/tracing/component"},p=void 0,l={unversionedId:"component/tracing/component",id:"component/tracing/component",isDocsHomePage:!1,title:"\u7ec4\u4ef6",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",source:"@site/docs/component/tracing/component.md",sourceDirName:"component/tracing",slug:"/component/tracing/component",permalink:"/docs/component/tracing/component",editUrl:"https://github.com/go-eagle/go-eagle.org/edit/main/docs/component/tracing/component.md",version:"current",frontMatter:{id:"component",title:"\u7ec4\u4ef6",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",keywords:["Go","Eagle","Toolkit","Framework","Microservices","HTTP"],slug:"/component/tracing/component"},sidebar:"docs",previous:{title:"\u6982\u89c8",permalink:"/docs/component/tracing/overview"},next:{title:"\u7b80\u4ecb",permalink:"/docs/component/middleware/overview"}},d=[{value:"\u652f\u6301\u7684\u7ec4\u4ef6",id:"\u652f\u6301\u7684\u7ec4\u4ef6",children:[{value:"HTTP Client",id:"http-client",children:[]},{value:"HTTP Server",id:"http-server",children:[]},{value:"\u65e5\u5fd7",id:"\u65e5\u5fd7",children:[]},{value:"\u6570\u636e\u5e93",id:"\u6570\u636e\u5e93",children:[]},{value:"Redis",id:"redis",children:[]},{value:"\u81ea\u5b9a\u4e49\u51fd\u6570",id:"\u81ea\u5b9a\u4e49\u51fd\u6570",children:[]}]}],m={toc:d};function u(e){var n=e.components,t=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"\u652f\u6301\u7684\u7ec4\u4ef6"},"\u652f\u6301\u7684\u7ec4\u4ef6"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Tracing")," \u7684\u5b9e\u65bd\u5c5e\u4e8e\u67b6\u6784\u5c42\u9762\u7684\u4e8b\u60c5\uff0c\u4ec5\u4ec5\u9760\u4fee\u6539\u4e00\u4e24\u4e2a\u7ec4\u4ef6\u662f\u65e0\u6cd5\u6210\u6548\u7684\uff0c\u800c\u662f\u5fc5\u987b\u5728\u7edf\u4e00\u5f00\u53d1\u6846\u67b6\u524d\u63d0\u4e0b\uff0c\u9700\u8981\u4e00\u6574\u5957\u6846\u67b6\u8054\u52a8\u7684\u4e8b\u60c5\u3002\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"Eagle")," \u5f00\u53d1\u6846\u67b6\u5c42\u9762\uff0c\u5bf9\u63a5\u7684\u662f ",(0,i.kt)("inlineCode",{parentName:"p"},"OpenTelemetry")," \u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"Go API")," \u63a5\u53e3\uff0c\u7531\u4e8e ",(0,i.kt)("inlineCode",{parentName:"p"},"OpenTelemetry")," \u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"Go API")," \u53ea\u662f\u6807\u51c6\u534f\u8bae\u7684\u63a5\u53e3\u5c42\uff0c\u5e76\u65e0\u5177\u4f53\u7684\u4e1a\u52a1\u903b\u8f91\u5b9e\u73b0\uff0c\u56e0\u6b64\u5728\u6ca1\u6709\u5b9e\u4f8b\u5316\u6ce8\u5165\u5177\u4f53\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"TracerProvider")," \u7684\u60c5\u51b5\u4e0b\uff0c\u4e0d\u4f1a\u5bf9\u6267\u884c\u6027\u80fd\u9020\u6210\u5f71\u54cd\u3002",(0,i.kt)("inlineCode",{parentName:"p"},"Eagle")," \u5927\u90e8\u5206\u7ec4\u4ef6\u4f1a\u81ea\u52a8\u68c0\u6d4b\u662f\u5426\u5f00\u542f ",(0,i.kt)("inlineCode",{parentName:"p"},"Tracing"),"\uff0c\u6ca1\u6709\u5f00\u542f ",(0,i.kt)("inlineCode",{parentName:"p"},"Tracing")," \u7279\u6027\u7684\u60c5\u51b5\u4e0b\u7ec4\u4ef6\u4ec0\u4e48\u90fd\u4e0d\u4f1a\u505a\u3002\u90e8\u5206\u7ec4\u4ef6\u9700\u8981\u5f00\u53d1\u8005\u624b\u52a8\u6ce8\u5165 ",(0,i.kt)("inlineCode",{parentName:"p"},"Tracing")," \u62e6\u622a\u5668\u6765\u542f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"Tracing")," \u7279\u6027\uff08\u5982 ",(0,i.kt)("inlineCode",{parentName:"p"},"HTTP")," \u8bf7\u6c42\u62e6\u622a\u5668\uff09\u3002"),(0,i.kt)("h3",{id:"http-client"},"HTTP Client"),(0,i.kt)("p",null,"\u542f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"Tracing")," \u529f\u80fd\u540e\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"HTTP")," \u5ba2\u6237\u7aef\u4f1a\u81ea\u52a8\u6ce8\u5165\uff0c\u7528\u6237\u65e0\u9700\u5173\u5fc3\u5177\u4f53\u7ec6\u8282"),(0,i.kt)("p",null,"\u4f7f\u7528\u65b9\u5f0f\u548c\u539f\u6765\u4fdd\u6301\u4e0d\u53d8"),(0,i.kt)("h3",{id:"http-server"},"HTTP Server"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"HTTP")," \u670d\u52a1\u7aef\u901a\u8fc7\u63d0\u4f9b\u53ef\u9009\u62e9\u7684\u62e6\u622a\u5668/\u4e2d\u95f4\u4ef6\u7684\u5f62\u5f0f\u6ce8\u5165\u548c\u542f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"Tracing")," \u7279\u6027\u3002"),(0,i.kt)("p",null,"\u4e2d\u95f4\u4ef6\u65b9\u5f0f\uff0c\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"p"},"Use")," \u65b9\u6cd5\u8bbe\u7f6e\u670d\u52a1\u7aef\u4e2d\u95f4\u4ef6\u5373\u53ef\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-go"},'  g := gin.New()\n  g.Use(middleware.Tracing("eagle-service"))\n')),(0,i.kt)("h3",{id:"\u65e5\u5fd7"},"\u65e5\u5fd7"),(0,i.kt)("h3",{id:"\u6570\u636e\u5e93"},"\u6570\u636e\u5e93"),(0,i.kt)("h3",{id:"redis"},"Redis"),(0,i.kt)("h3",{id:"\u81ea\u5b9a\u4e49\u51fd\u6570"},"\u81ea\u5b9a\u4e49\u51fd\u6570"))}u.isMDXComponent=!0}}]);