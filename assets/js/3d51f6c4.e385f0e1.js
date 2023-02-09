"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1986],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>g});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),m=p(n),g=a,f=m["".concat(l,".").concat(g)]||m[g]||u[g]||o;return n?r.createElement(f,i(i({ref:t},s),{},{components:n})):r.createElement(f,i({ref:t},s))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4340:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const o={title:"AST \ubd84\uc11d\uc744 \ud65c\uc6a9\ud574\uc11c \ucef4\ud3ec\ub10c\ud2b8 \ucd94\uc801\ud574\ubcf4\uae30",description:"Webpack Plugin\uc744 \ud65c\uc6a9\ud574\uc11c Component \uc0ac\uc6a9 \ub0b4\uc5ed \ud655\uc778\ud558\ub294 \ud504\ub85c\uc81d\ud2b8",slug:"component-tracking-with-ast",authors:"jiho",tags:["ast","webpack","design-system","react"],toc_min_heading_level:2,toc_max_heading_level:5},i="AST \ubd84\uc11d\uc744 \ud65c\uc6a9\ud574\uc11c \ucef4\ud3ec\ub10c\ud2b8 \ucd94\uc801\ud574\ubcf4\uae30",c={permalink:"/component-tracking-with-ast",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2023-01-17-component-tracking-using-ast.md",source:"@site/blog/2023-01-17-component-tracking-using-ast.md",title:"AST \ubd84\uc11d\uc744 \ud65c\uc6a9\ud574\uc11c \ucef4\ud3ec\ub10c\ud2b8 \ucd94\uc801\ud574\ubcf4\uae30",description:"Webpack Plugin\uc744 \ud65c\uc6a9\ud574\uc11c Component \uc0ac\uc6a9 \ub0b4\uc5ed \ud655\uc778\ud558\ub294 \ud504\ub85c\uc81d\ud2b8",date:"2023-01-17T00:00:00.000Z",formattedDate:"January 17, 2023",tags:[{label:"ast",permalink:"/tags/ast"},{label:"webpack",permalink:"/tags/webpack"},{label:"design-system",permalink:"/tags/design-system"},{label:"react",permalink:"/tags/react"}],readingTime:23.53,hasTruncateMarker:!0,authors:[{name:"Jiho Shon",title:"Frontend Developer in miso.inc",url:"https://github.com/peanut-lover",imageURL:"https://avatars.githubusercontent.com/u/20085849?v=4",key:"jiho"}],frontMatter:{title:"AST \ubd84\uc11d\uc744 \ud65c\uc6a9\ud574\uc11c \ucef4\ud3ec\ub10c\ud2b8 \ucd94\uc801\ud574\ubcf4\uae30",description:"Webpack Plugin\uc744 \ud65c\uc6a9\ud574\uc11c Component \uc0ac\uc6a9 \ub0b4\uc5ed \ud655\uc778\ud558\ub294 \ud504\ub85c\uc81d\ud2b8",slug:"component-tracking-with-ast",authors:"jiho",tags:["ast","webpack","design-system","react"],toc_min_heading_level:2,toc_max_heading_level:5},prevItem:{title:"Setting React Native on Mono Repo(Nx)",permalink:"/react-native-on-mono-repo"},nextItem:{title:"\ube14\ub85c\uadf8 \uc2dc\uc791\uc744 \uc54c\ub9ac\uba70...",permalink:"/20230-intro"}},l={authorsImageUrls:[void 0]},p=[],s={toc:p};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"2022 \ud328\uc2a4\ud2b8 \ucea0\ud37c\uc2a4\uc5d0\uc11c \uc9c4\ud589\ud558\ub294 inner circle \ub514\uc790\uc778\uc2dc\uc2a4\ud15c(\uae40\ubbfc\ud0dc \uba58\ud1a0\ub2d8) \uc2a4\ud130\ub514\uc5d0\uc11c \uc9c4\ud589\ud588\ub358 \ub0b4\uc6a9\uc744 \uae30\ubc18\uc73c\ub85c \uc791\uc131\ud55c \uae00\uc785\ub2c8\ub2e4."),(0,a.kt)("p",null,"\ud504\ub85c\uc81d\ud2b8\ub97c \uc9c4\ud589\ud558\uae30 \uc55e\uc11c \uc8fc\uc81c\ub97c \uc815\ud558\uae30\uae4c\uc9c0 \ud55c\ub2ec \uc815\ub3c4\ub97c \uace0\ubbfc\ud588\uc5c8\uc2b5\ub2c8\ub2e4."),(0,a.kt)("p",null,"\uc65c\ub0d0\ud558\uba74 \ub514\uc790\uc778 \uc2dc\uc2a4\ud15c\uc758 \uc815\uc758 \uc790\uccb4\uac00 \uc870\uc9c1, \ud504\ub85c\uc81d\ud2b8\ub9c8\ub2e4 \ub2ec\ub77c\uc9c8\ub9cc\ud07c \ucd94\uc0c1\uc801\uc778 \uc8fc\uc81c\uc774\uae30\uc5d0 \ud300\uc6d0\ub4e4\uac04\uc758 \ud569\uc758\uc810\uc744 \ucc3e\ub294 \uac83\uc774 \uc5b4\ub824\uc6e0\uc2b5\ub2c8\ub2e4."),(0,a.kt)("p",null,"\uadf8\ub798\uc11c \ub2e4\ub978 \uc870\uc9c1\uc774 \uc0ac\uc6a9\ud558\ub294 \ub514\uc790\uc778 \uc2dc\uc2a4\ud15c \uc790\uccb4\ub97c \uc9d1\uc911\ud558\uae30\ubcf4\ub2e4\ub294 \ud604\uc7ac \uac1c\ubc1c\uc790\uc640 \ub514\uc790\uc774\ub108\uac00 \ud611\uc5c5\ud558\ub294\ub370\uc5d0 \uc788\uc5b4\uc11c \ubc29\ud574\uac00 \ub418\ub294 \ubb38\uc81c\uc5d0 \ub300\ud55c \ubb38\uc81c\uc815\uc758\ub97c \ud574\ubcf4\uace0 \uadf8 \ubb38\uc81c\ub97c \ud574\uacb0\ud558\ub294 \ub3c4\uad6c \ud639\uc740 \uc6cc\ud06c\ud50c\ub85c\uc6b0\ub97c \ud55c\ubc88 \uac1c\uc120\ud574\ubcf4\ub294 \ubc29\ud5a5\uc73c\ub85c \uace0\ubbfc\uc744 \uc2dc\uc791\ud574\ubcf4\uc558\uc2b5\ub2c8\ub2e4."))}u.isMDXComponent=!0}}]);