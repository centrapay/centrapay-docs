import{x as m,O as T,A as p,q as D,P as V,C as g,Q as b,R as c,S as B,u as j,T as k,j as v,J as y,U as N,k as A,b as L,a as O,V as $,v as x,d as e,_ as r,B as M,W as z,X as C,Y as q,D as H,y as w,f as F}from"./entry.037aaeff.js";import{u as U}from"./asyncData.fc7fd8eb.js";/* empty css                                                  *//* empty css                                               */import"./ContentDoc.e8dccc0f.js";import"./ContentList.2518597b.js";import"./ContentQuery.b463e1b8.js";import"./ContentRenderer.7caef65f.js";import"./ContentRendererMarkdown.4c5bf6bf.js";import"./ContentSlot.3c58956a.js";import"./DocumentDrivenEmpty.6f049327.js";import"./DocumentDrivenNotFound.fd18f939.js";import"./Markdown.8cf12198.js";import"./index.79d08244.js";import"./_commonjsHelpers.a192a79e.js";const W=m({props:{name:String},async setup(t,i){const n=await T[t.name]().then(a=>a.default||a);return()=>p(n,{},i.slots)}}),J=m({props:{name:{type:[String,Boolean,Object],default:null}},setup(t,i){const n=B("_route"),a=n===D()?V():n,u=g(()=>{var o,_;return(_=(o=j(t.name))!=null?o:a.meta.layout)!=null?_:"default"});return()=>{var d;const o=u.value&&u.value in T,_=(d=a.meta.layoutTransition)!=null?d:b;return c(k,o&&_,{default:()=>c(W,o&&{key:u.value,name:u.value,hasTransition:void 0},i.slots).default()}).default()}}}),Q=Object.freeze(Object.defineProperty({__proto__:null,default:J},Symbol.toStringTag,{value:"Module"})),X=m({emits:{error(t){return!0}},setup(t,{slots:i,emit:n}){const a=v(null),u=y();return N(o=>{if(!u.isHydrating)return n("error",o),a.value=o,!1}),()=>{var o,_;return a.value?(o=i.error)==null?void 0:o.call(i,{error:a}):(_=i.default)==null?void 0:_.call(i)}}}),Y=Object.freeze(Object.defineProperty({__proto__:null,default:X},Symbol.toStringTag,{value:"Module"})),G=m({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(t,{slots:i,attrs:n}){const a=v(!1);return A(()=>{a.value=!0}),u=>{var l;if(a.value)return(l=i.default)==null?void 0:l.call(i);const o=i.fallback||i.placeholder;if(o)return o();const _=u.fallback||u.placeholder||"",d=u.fallbackTag||u.placeholderTag||"span";return L(d,n,_)}}}),E=new WeakMap;function K(t){if(E.has(t))return E.get(t);const i={...t};return i.render?i.render=(n,...a)=>{var u;if(n.mounted$){const o=t.render(n,...a);return o.children===null||typeof o.children=="string"?O(o.type,o.props,o.children,o.patchFlag,o.dynamicProps,o.shapeFlag):p(o)}else return p("div",(u=n.$attrs)!=null?u:n._.attrs)}:i.template&&(i.template=`
      <template v-if="mounted$">${t.template}</template>
      <template v-else><div></div></template>
    `),i.setup=(n,a)=>{var o;const u=v(!1);return A(()=>{u.value=!0}),Promise.resolve(((o=t.setup)==null?void 0:o.call(t,n,a))||{}).then(_=>typeof _!="function"?{..._,mounted$:u}:(...d)=>{if(u.value){const l=_(...d);return l.children===null||typeof l.children=="string"?O(l.type,l.props,l.children,l.patchFlag,l.dynamicProps,l.shapeFlag):p(l)}else return p("div",a.attrs)})},E.set(t,i),i}const Z=Object.freeze(Object.defineProperty({__proto__:null,default:G,createClientOnly:K},Symbol.toStringTag,{value:"Module"})),tt=m({name:"DevOnly",setup(t,i){return()=>null}}),et=Object.freeze(Object.defineProperty({__proto__:null,default:tt},Symbol.toStringTag,{value:"Module"})),rt=m({name:"ServerPlaceholder",render(){return L("div")}}),it=Object.freeze(Object.defineProperty({__proto__:null,default:rt},Symbol.toStringTag,{value:"Module"})),ot=m({name:"NuxtLoadingIndicator",props:{throttle:{type:Number,default:200},duration:{type:Number,default:2e3},height:{type:Number,default:3},color:{type:String,default:"repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"}},setup(t,{slots:i}){const n=nt({duration:t.duration,throttle:t.throttle}),a=y();return a.hook("page:start",n.start),a.hook("page:finish",n.finish),$(()=>n.clear),()=>p("div",{class:"nuxt-loading-indicator",style:{position:"fixed",top:0,right:0,left:0,pointerEvents:"none",width:`${n.progress.value}%`,height:`${t.height}px`,opacity:n.isLoading.value?1:0,background:t.color,backgroundSize:`${100/n.progress.value*100}% auto`,transition:"width 0.1s, height 0.4s, opacity 0.4s",zIndex:999999}},i)}});function nt(t){const i=v(0),n=v(!1),a=g(()=>1e4/t.duration);let u=null,o=null;function _(){l(),i.value=0,n.value=!0,t.throttle?o=setTimeout(P,t.throttle):P()}function d(){i.value=100,S()}function l(){clearInterval(u),clearTimeout(o),u=null,o=null}function I(R){i.value=Math.min(100,i.value+R)}function S(){l(),setTimeout(()=>{n.value=!1,setTimeout(()=>{i.value=0},400)},500)}function P(){u=setInterval(()=>{I(a.value)},100)}return{progress:i,isLoading:n,start:_,finish:d,clear:l}}const at=Object.freeze(Object.defineProperty({__proto__:null,default:ot},Symbol.toStringTag,{value:"Module"})),ut=t=>Object.fromEntries(Object.entries(t).filter(([,i])=>i!==void 0)),f=(t,i)=>(n,a)=>(x(()=>t({...ut(n),...a.attrs},a)),()=>{var u,o;return i?(o=(u=a.slots).default)==null?void 0:o.call(u):null}),h={accesskey:String,autocapitalize:String,autofocus:{type:Boolean,default:void 0},class:String,contenteditable:{type:Boolean,default:void 0},contextmenu:String,dir:String,draggable:{type:Boolean,default:void 0},enterkeyhint:String,exportparts:String,hidden:{type:Boolean,default:void 0},id:String,inputmode:String,is:String,itemid:String,itemprop:String,itemref:String,itemscope:String,itemtype:String,lang:String,nonce:String,part:String,slot:String,spellcheck:{type:Boolean,default:void 0},style:String,tabindex:String,title:String,translate:String},_t=m({name:"NoScript",inheritAttrs:!1,props:{...h,title:String,body:Boolean,renderPriority:[String,Number]},setup:f((t,{slots:i})=>{var u;const n={...t},a=(((u=i.default)==null?void 0:u.call(i))||[]).filter(({children:o})=>o).map(({children:o})=>o).join("");return a&&(n.children=a),{noscript:[n]}})}),lt=m({name:"Link",inheritAttrs:!1,props:{...h,as:String,crossorigin:String,disabled:Boolean,fetchpriority:String,href:String,hreflang:String,imagesizes:String,imagesrcset:String,integrity:String,media:String,prefetch:{type:Boolean,default:void 0},referrerpolicy:String,rel:String,sizes:String,title:String,type:String,methods:String,target:String,body:Boolean,renderPriority:[String,Number]},setup:f(t=>({link:[t]}))}),mt=m({name:"Base",inheritAttrs:!1,props:{...h,href:String,target:String},setup:f(t=>({base:t}))}),dt=m({name:"Title",inheritAttrs:!1,setup:f((t,{slots:i})=>{var a,u,o;return{title:((o=(u=(a=i.default)==null?void 0:a.call(i))==null?void 0:u[0])==null?void 0:o.children)||null}})}),pt=m({name:"Meta",inheritAttrs:!1,props:{...h,charset:String,content:String,httpEquiv:String,name:String,body:Boolean,renderPriority:[String,Number]},setup:f(t=>{const i={...t};return i.httpEquiv&&(i["http-equiv"]=i.httpEquiv,delete i.httpEquiv),{meta:[i]}})}),st=m({name:"Style",inheritAttrs:!1,props:{...h,type:String,media:String,nonce:String,title:String,scoped:{type:Boolean,default:void 0},body:Boolean,renderPriority:[String,Number]},setup:f((t,{slots:i})=>{var u,o,_;const n={...t},a=(_=(o=(u=i.default)==null?void 0:u.call(i))==null?void 0:o[0])==null?void 0:_.children;return a&&(n.children=a),{style:[n]}})}),ft=m({name:"Head",inheritAttrs:!1,setup:(t,i)=>()=>{var n,a;return(a=(n=i.slots).default)==null?void 0:a.call(n)}}),ht=m({name:"Html",inheritAttrs:!1,props:{...h,manifest:String,version:String,xmlns:String,renderPriority:[String,Number]},setup:f(t=>({htmlAttrs:t}),!0)}),vt=m({name:"Body",inheritAttrs:!1,props:{...h,renderPriority:[String,Number]},setup:f(t=>({bodyAttrs:t}),!0)}),s=Object.freeze(Object.defineProperty({__proto__:null,NoScript:_t,Link:lt,Base:mt,Title:dt,Meta:pt,Style:st,Head:ft,Html:ht,Body:vt},Symbol.toStringTag,{value:"Module"}));e(()=>r(()=>import("./ProseA.e6289e49.js"),["./ProseA.e6289e49.js","./ExternalLink.12449d86.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseBlockquote.d6ba8604.js"),["./ProseBlockquote.d6ba8604.js","./InformationCircle.5b3ec245.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseCode.3da1b19a.js"),["./ProseCode.3da1b19a.js","./Checkmark.c90d62de.js","./entry.037aaeff.js","./entry.82955944.css","./Clipboard.176cf36e.js","./_commonjsHelpers.a192a79e.js","./ProseCode.c791fba1.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./Carat.6c099b78.js"),["./Carat.6c099b78.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./entry.037aaeff.js").then(t=>t.ao),["./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./Checkmark.c90d62de.js"),["./Checkmark.c90d62de.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./Clipboard.176cf36e.js"),["./Clipboard.176cf36e.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./entry.037aaeff.js").then(t=>t.ak),["./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./Connections.4817e525.js"),["./Connections.4817e525.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./Dashboard.146ce92b.js"),["./Dashboard.146ce92b.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./entry.037aaeff.js").then(t=>t.al),["./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ExternalLink.12449d86.js"),["./ExternalLink.12449d86.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./FacebookLogo.6b885da2.js"),["./FacebookLogo.6b885da2.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./GithubLogo.3a6c0385.js"),["./GithubLogo.3a6c0385.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./InformationCircle.5b3ec245.js"),["./InformationCircle.5b3ec245.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./InstagramLogo.31df1fae.js"),["./InstagramLogo.31df1fae.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./LinkedInLogo.7e13159f.js"),["./LinkedInLogo.7e13159f.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./entry.037aaeff.js").then(t=>t.ai),["./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./entry.037aaeff.js").then(t=>t.an),["./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./Receipt.75fe1960.js"),["./Receipt.75fe1960.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./Rocket.f9b78688.js"),["./Rocket.f9b78688.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./Settings.b6039f09.js"),["./Settings.b6039f09.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./TwitterLogo.07ab44c7.js"),["./TwitterLogo.07ab44c7.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./VerifiedCheck.63ea8f82.js"),["./VerifiedCheck.63ea8f82.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./entry.037aaeff.js").then(t=>t.ap),["./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./Card.b33a97d6.js"),["./Card.b33a97d6.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./entry.037aaeff.js").then(t=>t.aj),["./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./LandingPageCard.a0fe3bdc.js"),["./LandingPageCard.a0fe3bdc.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./Layout.3b9d737e.js"),["./Layout.3b9d737e.js","./Prose.cb107de2.js","./entry.037aaeff.js","./entry.82955944.css","./Layout.cb0cecc9.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./Prose.cb107de2.js"),["./Prose.cb107de2.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./entry.037aaeff.js").then(t=>t.am),["./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ContentDoc.e8dccc0f.js"),["./ContentDoc.e8dccc0f.js","./entry.037aaeff.js","./entry.82955944.css","./ContentRenderer.7caef65f.js","./ContentRendererMarkdown.4c5bf6bf.js","./index.79d08244.js","./_commonjsHelpers.a192a79e.js","./ContentQuery.b463e1b8.js","./asyncData.fc7fd8eb.js"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ContentList.2518597b.js"),["./ContentList.2518597b.js","./ContentQuery.b463e1b8.js","./entry.037aaeff.js","./entry.82955944.css","./asyncData.fc7fd8eb.js"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>Promise.resolve().then(()=>gt),void 0,import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ContentQuery.b463e1b8.js"),["./ContentQuery.b463e1b8.js","./entry.037aaeff.js","./entry.82955944.css","./asyncData.fc7fd8eb.js"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ContentRenderer.7caef65f.js"),["./ContentRenderer.7caef65f.js","./ContentRendererMarkdown.4c5bf6bf.js","./entry.037aaeff.js","./entry.82955944.css","./index.79d08244.js","./_commonjsHelpers.a192a79e.js"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ContentRendererMarkdown.4c5bf6bf.js"),["./ContentRendererMarkdown.4c5bf6bf.js","./entry.037aaeff.js","./entry.82955944.css","./index.79d08244.js","./_commonjsHelpers.a192a79e.js"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ContentSlot.3c58956a.js"),["./ContentSlot.3c58956a.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./DocumentDrivenEmpty.6f049327.js"),["./DocumentDrivenEmpty.6f049327.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./DocumentDrivenNotFound.fd18f939.js"),["./DocumentDrivenNotFound.fd18f939.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./Markdown.8cf12198.js"),["./Markdown.8cf12198.js","./ContentSlot.3c58956a.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseCodeInline.d2db9f5a.js"),["./ProseCodeInline.d2db9f5a.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseEm.7581d570.js"),["./ProseEm.7581d570.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseH1.eed3f7a3.js"),["./ProseH1.eed3f7a3.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseH2.d46f3f40.js"),["./ProseH2.d46f3f40.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseH3.78ee3f80.js"),["./ProseH3.78ee3f80.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseH4.ca494c18.js"),["./ProseH4.ca494c18.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseH5.c1aafd6a.js"),["./ProseH5.c1aafd6a.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseH6.3f65e1bc.js"),["./ProseH6.3f65e1bc.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseHr.7b5b7948.js"),["./ProseHr.7b5b7948.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseImg.4c7544de.js"),["./ProseImg.4c7544de.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseLi.be5390e9.js"),["./ProseLi.be5390e9.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseOl.679975d6.js"),["./ProseOl.679975d6.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseP.5e9d9ebe.js"),["./ProseP.5e9d9ebe.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseStrong.75d53a8d.js"),["./ProseStrong.75d53a8d.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseTable.4f137d8e.js"),["./ProseTable.4f137d8e.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseTbody.37240262.js"),["./ProseTbody.37240262.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseTd.3ae4d4d0.js"),["./ProseTd.3ae4d4d0.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseTh.18f2c950.js"),["./ProseTh.18f2c950.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseThead.ae3b8e3f.js"),["./ProseThead.ae3b8e3f.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseTr.2175068f.js"),["./ProseTr.2175068f.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseUl.c80f4382.js"),["./ProseUl.c80f4382.js","./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./welcome.0f8e50c6.js"),["./welcome.0f8e50c6.js","./entry.037aaeff.js","./entry.82955944.css","./asyncData.fc7fd8eb.js","./ContentDoc.e8dccc0f.js","./ContentRenderer.7caef65f.js","./ContentRendererMarkdown.4c5bf6bf.js","./index.79d08244.js","./_commonjsHelpers.a192a79e.js","./ContentQuery.b463e1b8.js","./ContentList.2518597b.js","./ContentSlot.3c58956a.js","./DocumentDrivenEmpty.6f049327.js","./DocumentDrivenNotFound.fd18f939.js","./Markdown.8cf12198.js","./ProseCode.c791fba1.css","./Layout.cb0cecc9.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>Promise.resolve().then(()=>Q),void 0,import.meta.url).then(t=>t.default||t));e(()=>r(()=>Promise.resolve().then(()=>Y),void 0,import.meta.url).then(t=>t.default||t));e(()=>r(()=>Promise.resolve().then(()=>Z),void 0,import.meta.url).then(t=>t.default||t));e(()=>r(()=>Promise.resolve().then(()=>et),void 0,import.meta.url).then(t=>t.default||t));e(()=>r(()=>Promise.resolve().then(()=>it),void 0,import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./entry.037aaeff.js").then(t=>t.ag),["./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>Promise.resolve().then(()=>at),void 0,import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./entry.037aaeff.js").then(t=>t.ah),["./entry.037aaeff.js","./entry.82955944.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>Promise.resolve().then(()=>s),void 0,import.meta.url).then(t=>t.NoScript));e(()=>r(()=>Promise.resolve().then(()=>s),void 0,import.meta.url).then(t=>t.Link));e(()=>r(()=>Promise.resolve().then(()=>s),void 0,import.meta.url).then(t=>t.Base));e(()=>r(()=>Promise.resolve().then(()=>s),void 0,import.meta.url).then(t=>t.Title));e(()=>r(()=>Promise.resolve().then(()=>s),void 0,import.meta.url).then(t=>t.Meta));e(()=>r(()=>Promise.resolve().then(()=>s),void 0,import.meta.url).then(t=>t.Style));e(()=>r(()=>Promise.resolve().then(()=>s),void 0,import.meta.url).then(t=>t.Head));e(()=>r(()=>Promise.resolve().then(()=>s),void 0,import.meta.url).then(t=>t.Html));e(()=>r(()=>Promise.resolve().then(()=>s),void 0,import.meta.url).then(t=>t.Body));const Et=m({name:"ContentNavigation",props:{query:{type:Object,required:!1,default:void 0}},async setup(t){const{query:i}=M(t),n=g(()=>{var u;return typeof((u=i.value)==null?void 0:u.params)=="function"?i.value.params():i.value});if(!n.value&&z("dd-navigation").value){const{navigation:u}=C();return{navigation:u}}const{data:a}=await U(`content-navigation-${H(n.value)}`,()=>q(n.value));return{navigation:a}},render(t){const i=w(),{navigation:n}=t,a=_=>p(F,{to:_._path},()=>_.title),u=(_,d)=>p("ul",d?{"data-level":d}:null,_.map(l=>l.children?p("li",null,[a(l),u(l.children,d+1)]):p("li",null,a(l)))),o=_=>u(_,0);return i!=null&&i.default?i.default({navigation:n,...this.$attrs}):o(n)}}),gt=Object.freeze(Object.defineProperty({__proto__:null,default:Et},Symbol.toStringTag,{value:"Module"}));export{Et as default};