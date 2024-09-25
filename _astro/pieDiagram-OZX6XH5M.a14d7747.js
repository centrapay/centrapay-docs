import{p as U}from"./chunk-OQCM5LHU.23b06714.js";import{Y as y,Q as z,aE as j,G as q,q as H,r as Q,s as Y,g as Z,c as J,b as K,_ as p,l as G,t as X,d as tt,H as et,L as at,a6 as rt,k as nt}from"./mermaid.core.8d1bc1c8.js";import{p as it}from"./mermaid-parser.core.e2130ded.js";import{d as O}from"./arc.55b17f80.js";import{o as st}from"./ordinal.b935e931.js";import"./preload-helper.cf010ec4.js";import"./_commonjsHelpers.725317a4.js";import"./_baseUniq.7679efbb.js";import"./_basePickBy.5ac65030.js";import"./clone.df9fdede.js";import"./init.77b53fdd.js";function ot(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function lt(t){return t}function ct(){var t=lt,a=ot,m=null,s=y(0),d=y(z),x=y(0);function i(e){var r,l=(e=j(e)).length,c,A,h=0,u=new Array(l),n=new Array(l),v=+s.apply(this,arguments),w=Math.min(z,Math.max(-z,d.apply(this,arguments)-v)),f,T=Math.min(Math.abs(w)/l,x.apply(this,arguments)),$=T*(w<0?-1:1),g;for(r=0;r<l;++r)(g=n[u[r]=r]=+t(e[r],r,e))>0&&(h+=g);for(a!=null?u.sort(function(S,C){return a(n[S],n[C])}):m!=null&&u.sort(function(S,C){return m(e[S],e[C])}),r=0,A=h?(w-l*$)/h:0;r<l;++r,v=f)c=u[r],g=n[c],f=v+(g>0?g*A:0)+$,n[c]={data:e[c],index:r,value:g,startAngle:v,endAngle:f,padAngle:T};return n}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:y(+e),i):t},i.sortValues=function(e){return arguments.length?(a=e,m=null,i):a},i.sort=function(e){return arguments.length?(m=e,a=null,i):m},i.startAngle=function(e){return arguments.length?(s=typeof e=="function"?e:y(+e),i):s},i.endAngle=function(e){return arguments.length?(d=typeof e=="function"?e:y(+e),i):d},i.padAngle=function(e){return arguments.length?(x=typeof e=="function"?e:y(+e),i):x},i}var P=q.pie,F={sections:new Map,showData:!1,config:P},b=F.sections,W=F.showData,ut=structuredClone(P),pt=p(()=>structuredClone(ut),"getConfig"),dt=p(()=>{b=new Map,W=F.showData,X()},"clear"),gt=p(({label:t,value:a})=>{b.has(t)||(b.set(t,a),G.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),ft=p(()=>b,"getSections"),mt=p(t=>{W=t},"setShowData"),ht=p(()=>W,"getShowData"),R={getConfig:pt,clear:dt,setDiagramTitle:H,getDiagramTitle:Q,setAccTitle:Y,getAccTitle:Z,setAccDescription:J,getAccDescription:K,addSection:gt,getSections:ft,setShowData:mt,getShowData:ht},vt=p((t,a)=>{U(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),St={parse:p(async t=>{const a=await it("pie",t);G.debug(a),vt(a,R)},"parse")},yt=p(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),xt=yt,At=p(t=>{const a=[...t.entries()].map(s=>({label:s[0],value:s[1]})).sort((s,d)=>d.value-s.value);return ct().value(s=>s.value)(a)},"createPieArcs"),wt=p((t,a,m,s)=>{G.debug(`rendering pie chart
`+t);const d=s.db,x=tt(),i=et(d.getConfig(),x.pie),e=40,r=18,l=4,c=450,A=c,h=at(a),u=h.append("g");u.attr("transform","translate("+A/2+","+c/2+")");const{themeVariables:n}=x;let[v]=rt(n.pieOuterStrokeWidth);v??=2;const w=i.textPosition,f=Math.min(A,c)/2-e,T=O().innerRadius(0).outerRadius(f),$=O().innerRadius(f*w).outerRadius(f*w);u.append("circle").attr("cx",0).attr("cy",0).attr("r",f+v/2).attr("class","pieOuterCircle");const g=d.getSections(),S=At(g),C=[n.pie1,n.pie2,n.pie3,n.pie4,n.pie5,n.pie6,n.pie7,n.pie8,n.pie9,n.pie10,n.pie11,n.pie12],D=st(C);u.selectAll("mySlices").data(S).enter().append("path").attr("d",T).attr("fill",o=>D(o.data.label)).attr("class","pieCircle");let L=0;g.forEach(o=>{L+=o}),u.selectAll("mySlices").data(S).enter().append("text").text(o=>(o.data.value/L*100).toFixed(0)+"%").attr("transform",o=>"translate("+$.centroid(o)+")").style("text-anchor","middle").attr("class","slice"),u.append("text").text(d.getDiagramTitle()).attr("x",0).attr("y",-(c-50)/2).attr("class","pieTitleText");const M=u.selectAll(".legend").data(D.domain()).enter().append("g").attr("class","legend").attr("transform",(o,k)=>{const E=r+l,_=E*D.domain().length/2,B=12*r,V=k*E-_;return"translate("+B+","+V+")"});M.append("rect").attr("width",r).attr("height",r).style("fill",D).style("stroke",D),M.data(S).append("text").attr("x",r+l).attr("y",r-l).text(o=>{const{label:k,value:E}=o.data;return d.getShowData()?`${k} [${E}]`:k});const I=Math.max(...M.selectAll("text").nodes().map(o=>o?.getBoundingClientRect().width??0)),N=A+e+r+l+I;h.attr("viewBox",`0 0 ${N} ${c}`),nt(h,c,N,i.useMaxWidth)},"draw"),Ct={draw:wt},Lt={parser:St,db:R,renderer:Ct,styles:xt};export{Lt as diagram};
