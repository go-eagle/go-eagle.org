"use strict";(self.webpackChunkgo_eagle_org_2=self.webpackChunkgo_eagle_org_2||[]).push([[8564],{3905:function(e,t,r){r.d(t,{Zo:function(){return c},kt:function(){return s}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),u=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(p.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=u(r),s=a,g=d["".concat(p,".").concat(s)]||d[s]||f[s]||i;return r?n.createElement(g,l(l({ref:t},c),{},{components:r})):n.createElement(g,l({ref:t},c))}));function s(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,l=new Array(i);l[0]=d;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var u=2;u<i;u++)l[u]=r[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},5845:function(e,t,r){r.r(t),r.d(t,{contentTitle:function(){return p},default:function(){return d},frontMatter:function(){return o},metadata:function(){return u},toc:function(){return c}});var n=r(7462),a=r(3366),i=(r(7294),r(3905)),l=["components"],o={id:"api-restful",title:"\u5f00\u53d1\u89c4\u8303 - RESTful",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",keywords:["Go","Eagle","Toolkit","Framework","Microservices","HTTP"],slug:"/guide/api-restful"},p=void 0,u={unversionedId:"guide/api-restful",id:"guide/api-restful",isDocsHomePage:!1,title:"\u5f00\u53d1\u89c4\u8303 - RESTful",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",source:"@site/docs/guide/api-restful.md",sourceDirName:"guide",slug:"/guide/api-restful",permalink:"/docs/guide/api-restful",editUrl:"https://github.com/go-eagle/go-eagle.org/edit/main/docs/guide/api-restful.md",version:"current",frontMatter:{id:"api-restful",title:"\u5f00\u53d1\u89c4\u8303 - RESTful",description:"Eagle \u4e00\u5957\u8f7b\u91cf\u7ea7 Go \u5fae\u670d\u52a1\u6846\u67b6\uff0c\u5305\u542b\u5927\u91cf\u5fae\u670d\u52a1\u76f8\u5173\u6846\u67b6\u53ca\u5de5\u5177",keywords:["Go","Eagle","Toolkit","Framework","Microservices","HTTP"],slug:"/guide/api-restful"},sidebar:"docs",previous:{title:"\u5f00\u53d1\u89c4\u8303 - Protobuf",permalink:"/docs/guide/api-protobuf"},next:{title:"\u5f00\u53d1\u6d41\u7a0b - gRPC",permalink:"/docs/guide/grpc-guide"}},c=[{value:"API\u98ce\u683c\u548c\u5a92\u4f53\u7c7b\u578b\u8bf4\u660e",id:"api\u98ce\u683c\u548c\u5a92\u4f53\u7c7b\u578b\u8bf4\u660e",children:[]},{value:"Reference",id:"reference",children:[]}],f={toc:c};function d(e){var t=e.components,r=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,n.Z)({},f,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"\u63a5\u53e3\u5b9e\u73b0\u5c42\uff0c\u53ef\u4ee5\u7406\u89e3\u6210 MVC \u7684\u63a7\u5236\u5668\u5c42\u3002\u4e3b\u8981\u63a5\u6536\u53c2\u6570\u3001\u9a8c\u8bc1\u53c2\u6570\u3001\u8c03\u7528service\u5c42\u7684\u4e1a\u52a1\u903b\u8f91\u5904\u7406\uff0c\u6700\u540e\u8fd4\u56de\u6570\u636e\u3002"),(0,i.kt)("p",null,"PS: \u5982\u679c\u9700\u8981\u8fdb\u884c\u8f6c\u6362\u6570\u636e\uff0c\u53ef\u4ee5\u8c03\u7528\u5bf9\u5e94\u7684 DTO \u8fdb\u884c\u7edf\u4e00\u6570\u636e\u8f6c\u6362\u3002"),(0,i.kt)("h2",{id:"api\u98ce\u683c\u548c\u5a92\u4f53\u7c7b\u578b\u8bf4\u660e"},"API\u98ce\u683c\u548c\u5a92\u4f53\u7c7b\u578b\u8bf4\u660e"),(0,i.kt)("p",null,"Go \u8bed\u8a00\u4e2d\u5e38\u7528\u7684 API \u98ce\u683c\u662f RPC \u548c REST\uff0c\u5e38\u7528\u7684\u5a92\u4f53\u7c7b\u578b\u662f JSON\u3001XML \u548c Protobuf\u3002",(0,i.kt)("br",{parentName:"p"}),"\n","\u5728 Go API \u5f00\u53d1\u4e2d\u5e38\u7528\u7684\u7ec4\u5408\u662f ",(0,i.kt)("inlineCode",{parentName:"p"},"gRPC + Protobuf")," (\u66f4\u9002\u5408\u8c03\u7528\u9891\u7e41\u7684\u5fae\u670d\u52a1\u573a\u666f) \u548c ",(0,i.kt)("inlineCode",{parentName:"p"},"REST + JSON"),"\u3002"),(0,i.kt)("p",null,"REST \u98ce\u683c\u867d\u7136\u9002\u7528\u4e8e\u5f88\u591a\u4f20\u8f93\u534f\u8bae\uff0c\u4f46\u5728\u5b9e\u9645\u5f00\u53d1\u4e2d\uff0cREST \u7531\u4e8e\u5929\u751f\u548c HTTP \u534f\u8bae\u76f8\u8f85\u76f8\u6210\uff0c\u56e0\u6b64 HTTP \u534f\u8bae\u5df2\u7ecf\u6210\u4e86\u5b9e\u73b0 RESTful API \u4e8b\u5b9e\u4e0a\u7684\u6807\u51c6\u3002",(0,i.kt)("br",{parentName:"p"}),"\n","\u5728 HTTP \u534f\u8bae\u4e2d\u901a\u8fc7 POST\u3001DELETE\u3001PUT\u3001GET \u65b9\u6cd5\u6765\u5bf9\u5e94 REST \u8d44\u6e90\u7684\u589e\u3001\u5220\u3001\u6539\u3001\u67e5\u64cd\u4f5c\uff0c\u5177\u4f53\u7684\u5bf9\u5e94\u5173\u7cfb\u5982\u4e0b\uff1a"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"HTTP\u65b9\u6cd5"),(0,i.kt)("th",{parentName:"tr",align:"left"},"\u884c\u4e3a"),(0,i.kt)("th",{parentName:"tr",align:"left"},"URI"),(0,i.kt)("th",{parentName:"tr",align:"left"},"\u793a\u4f8b\u8bf4\u660e"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"GET"),(0,i.kt)("td",{parentName:"tr",align:"left"},"\u83b7\u53d6\u8d44\u6e90\u5217\u8868"),(0,i.kt)("td",{parentName:"tr",align:"left"},"/users"),(0,i.kt)("td",{parentName:"tr",align:"left"},"\u83b7\u53d6\u7528\u6237\u5217\u8868")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"GET"),(0,i.kt)("td",{parentName:"tr",align:"left"},"\u83b7\u53d6\u4e00\u4e2a\u5177\u4f53\u7684\u8d44\u6e90"),(0,i.kt)("td",{parentName:"tr",align:"left"},"/users/admin"),(0,i.kt)("td",{parentName:"tr",align:"left"},"\u83b7\u53d6 admin \u7528\u6237\u7684\u8be6\u7ec6\u4fe1\u606f")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"POST"),(0,i.kt)("td",{parentName:"tr",align:"left"},"\u521b\u5efa\u4e00\u4e2a\u65b0\u7684\u8d44\u6e90"),(0,i.kt)("td",{parentName:"tr",align:"left"},"/users"),(0,i.kt)("td",{parentName:"tr",align:"left"},"\u521b\u5efa\u4e00\u4e2a\u65b0\u7528\u6237")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"PUT"),(0,i.kt)("td",{parentName:"tr",align:"left"},"\u66f4\u65b0\u4e00\u4e2a\u8d44\u6e90"),(0,i.kt)("td",{parentName:"tr",align:"left"},"/users/1"),(0,i.kt)("td",{parentName:"tr",align:"left"},"\u66f4\u65b0 id \u4e3a 1 \u7684\u7528\u6237")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},"DELETE"),(0,i.kt)("td",{parentName:"tr",align:"left"},"\u5220\u9664\u670d\u52a1\u5668\u4e0a\u7684\u4e00\u4e2a\u8d44\u6e90"),(0,i.kt)("td",{parentName:"tr",align:"left"},"/users/1"),(0,i.kt)("td",{parentName:"tr",align:"left"},"\u5220\u9664 id \u4e3a 1 \u7684\u7528\u6237")))),(0,i.kt)("h2",{id:"reference"},"Reference"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://cloud.google.com/apis/design/"},"Google API Design Guide"))))}d.isMDXComponent=!0}}]);