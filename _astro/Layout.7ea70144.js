import{_ as v}from"./_plugin-vue_export-helper.c27b6911.js";import{o,c as s,r as b,a as f,b as x,d as g,e as r,f as d,t as m,g as w,w as C,F as N,h as S,n as y}from"./runtime-core.esm-bundler.66a12463.js";const q={},I={class:"prose prose-slate max-w-none prose-headings:font-display prose-headings:font-normal prose-h2:scroll-mt-16 prose-h2:mt-8 prose-h2:pt-8 prose-h2:border-t prose-h3:scroll-mt-20 prose-lead:text-slate-500 prose-a:no-underline prose-a:text-content-primary hover:prose-a:no-underline prose-img:mb-8 prose-img:mx-auto prose-img:object-contain"};function j(a,p){return o(),s("div",I,[b(a.$slots,"default")])}const E=v(q,[["render",j]]),O={__name:"Layout",props:{collectionName:{type:String,required:!0},headings:{type:Object,required:!0},title:{type:String,required:!0},img:{type:String,required:!0}},setup(a,{expose:p}){p();const n=a,e=f("");let l=null;x(()=>{const i={threshold:0,rootMargin:"-20% 0px -80% 0px"};l=new IntersectionObserver(c=>{c.forEach(_=>{const k=_.target.firstElementChild.id;_.isIntersecting&&(e.value=k)})},i);const h=document.querySelectorAll("section");if(h.length){const c=h[0].firstElementChild.id;e.value=c}h.forEach(c=>{l.observe(c)})}),g(()=>{l.disconnect()});function u(i){e.value=i}const t={props:n,visibleHeadingId:e,get observer(){return l},set observer(i){l=i},handleTocClick:u,ref:f,onMounted:x,onUnmounted:g,Prose:E};return Object.defineProperty(t,"__isScriptSetup",{enumerable:!1,value:!0}),t}},B={key:0,class:"flex items-center max-h-72 overflow-hidden"},H=["src"],L={class:"relative mx-auto desktop-gutters flex justify-center"},P={class:"min-w-0 max-w-2xl flex-auto px-8 pb-16 pt-8 xl:pt-16 lg:max-w-none"},V={key:0,class:"mb-9 space-y-1"},F={key:0,class:"type-overline text-content-primary"},M={key:1,class:"font-display text-3xl tracking-tight text-slate-900"},T={class:"hidden xl:sticky border-none xl:top-[4.5rem] xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:py-16 xl:pr-6 overflow-y-auto"},z={key:0,"aria-labelledby":"on-this-page-title",class:"w-56"},A=r("h2",{id:"on-this-page-title",class:"type-overline text-content-primary"}," On this page ",-1),D={class:"mt-4 text-sm"},U=["href","onClick"],G={key:1,class:"w-56"};function J(a,p,n,e,l,u){return o(),s("div",null,[e.props.img?(o(),s("div",B,[r("img",{src:e.props.img,"aria-hidden":"true",class:"object-cover m-0 w-full h-24 md:h-full"},null,8,H)])):d("",!0),r("div",L,[r("div",P,[r("article",null,[e.props.title||n.collectionName?(o(),s("header",V,[n.collectionName?(o(),s("p",F,m(n.collectionName),1)):d("",!0),e.props.title?(o(),s("h1",M,m(e.props.title),1)):d("",!0)])):d("",!0),w(e.Prose,null,{default:C(()=>[b(a.$slots,"default")]),_:3})])]),r("div",T,[e.props.headings&&e.props.headings.length?(o(),s("nav",z,[A,r("ol",D,[(o(!0),s(N,null,S(n.headings,t=>(o(),s("li",{key:t.slug,class:y(t.depth===3?"pl-5":"")},[r("a",{href:`#${t.slug}`,onClick:i=>e.handleTocClick(t.slug)},[r("h3",{class:y(["border-l-2 p-squish-2 hover:text-content-primary hover:border-content-primary",[e.visibleHeadingId===t.slug?"text-content-primary border-brand-accent":"font-normal text-content-tertiary",t.depth===3?"pl-5":""]])},m(t.text),3)],8,U)],2))),128))])])):(o(),s("div",G))])])])}const R=v(O,[["render",J]]);export{R as default};