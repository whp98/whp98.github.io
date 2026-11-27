import{p as at}from"./chunk-JWPE2WC7.KJxEK9R4.js";import{O as rt,q as it,r as nt,s as ot,g as st,c as lt,b as ct,_ as l,l as E,z as dt,h as gt,P as ht,T as pt,U as ft,V as U,k as ut,W as mt}from"../app.JZVgA4RE.js";import{p as vt}from"./cynefin-EF2NZ3EQ.VIkPK3i-.js";import{o as St}from"./d3-scale.DZ_Ijlg5.js";import"./framework.DLXsHQLa.js";import"./theme.ElU4hXtC.js";var V=rt.pie,R={sections:new Map,showData:!1,config:V},T=R.sections,W=R.showData,xt=structuredClone(V),wt=l(()=>structuredClone(xt),"getConfig"),$t=l(()=>{T=new Map,W=R.showData,dt()},"clear"),Ct=l(({label:t,value:a})=>{if(a<0)throw new Error(`"${t}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);T.has(t)||(T.set(t,a),E.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),Dt=l(()=>T,"getSections"),yt=l(t=>{W=t},"setShowData"),Tt=l(()=>W,"getShowData"),q={getConfig:wt,clear:$t,setDiagramTitle:it,getDiagramTitle:nt,setAccTitle:ot,getAccTitle:st,setAccDescription:lt,getAccDescription:ct,addSection:Ct,getSections:Dt,setShowData:yt,getShowData:Tt},bt=l((t,a)=>{at(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),At={parse:l(async t=>{const a=await vt("pie",t);E.debug(a),bt(a,q)},"parse")},kt=l(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieCircle.highlighted{
    scale: 1.05;
    opacity: 1;
  }
  .pieCircle.highlightedOnHover:hover{
    transition-duration: 250ms;
    scale: 1.05;
    opacity: 1;
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
`,"getStyles"),_t=kt,zt=l(t=>{const a=[...t.values()].reduce((o,m)=>o+m,0),L=[...t.entries()].map(([o,m])=>({label:o,value:m})).filter(o=>o.value/a*100>=1);return mt().value(o=>o.value).sort(null)(L)},"createPieArcs"),Et=l((t,a,L,O)=>{var I;E.debug(`rendering pie chart
`+t);const o=O.db,m=gt(),p=ht(o.getConfig(),m.pie),P=40,i=18,c=4,S=450,x=S,b=pt(a),C=b.append("g");C.attr("transform","translate("+x/2+","+S/2+")");const{themeVariables:n}=m;let[F]=ft(n.pieOuterStrokeWidth);F??(F=2);const X=p.legendPosition,H=p.textPosition,Z=p.donutHole>0&&p.donutHole<=.9?p.donutHole:0,f=Math.min(x,S)/2-P,j=U().innerRadius(Z*f).outerRadius(f),J=U().innerRadius(f*H).outerRadius(f*H),w=C.append("g");w.append("circle").attr("cx",0).attr("cy",0).attr("r",f+F/2).attr("class","pieOuterCircle");const D=o.getSections(),K=zt(D),Q=[n.pie1,n.pie2,n.pie3,n.pie4,n.pie5,n.pie6,n.pie7,n.pie8,n.pie9,n.pie10,n.pie11,n.pie12];let A=0;D.forEach(e=>{A+=e});const M=K.filter(e=>(e.data.value/A*100).toFixed(0)!=="0"),k=St(Q).domain([...D.keys()]);w.selectAll("mySlices").data(M).enter().append("path").attr("d",j).attr("fill",e=>k(e.data.label)).attr("class",e=>{let r="pieCircle";return p.highlightSlice==="hover"?r+=" highlightedOnHover":p.highlightSlice===e.data.label&&(r+=" highlighted"),r}),w.selectAll("mySlices").data(M).enter().append("text").text(e=>(e.data.value/A*100).toFixed(0)+"%").attr("transform",e=>"translate("+J.centroid(e)+")").style("text-anchor","middle").attr("class","slice");const Y=C.append("text").text(o.getDiagramTitle()).attr("x",0).attr("y",-(S-50)/2).attr("class","pieTitleText"),$=[...D.entries()].map(([e,r])=>({label:e,value:r})),u=C.selectAll(".legend").data($).enter().append("g").attr("class","legend");u.append("rect").attr("width",i).attr("height",i).style("fill",e=>k(e.label)).style("stroke",e=>k(e.label)),u.append("text").attr("x",i+c).attr("y",i-c).text(e=>o.getShowData()?`${e.label} [${e.value}]`:e.label);const v=Math.max(...u.selectAll("text").nodes().map(e=>(e==null?void 0:e.getBoundingClientRect().width)??0));let y=S,_=x+P;const s=i+c,z=$.length*s;switch(X){case"center":u.attr("transform",(e,r)=>{const d=s*$.length/2,g=-v/2-(i+c),h=r*s-d;return"translate("+g+","+h+")"});break;case"top":y+=z,u.attr("transform",(e,r)=>{const d=f,g=-v/2-(i+c),h=r*s-d;return`translate(${g}, ${h})`}),w.attr("transform",()=>`translate(0, ${z+s})`);break;case"bottom":y+=z,u.attr("transform",(e,r)=>{const d=-f-s,g=-v/2-(i+c),h=r*s-d;return"translate("+g+","+h+")"});break;case"left":_+=i+c+v,u.attr("transform",(e,r)=>{const d=s*$.length/2,g=-f-(i+c),h=r*s-d;return"translate("+g+","+h+")"}),w.attr("transform",()=>`translate(${v+i+c}, 0)`);break;case"right":default:_+=i+c+v,u.attr("transform",(e,r)=>{const d=s*$.length/2,g=12*i,h=r*s-d;return"translate("+g+","+h+")"});break}const G=((I=Y.node())==null?void 0:I.getBoundingClientRect().width)??0,tt=x/2-G/2,et=x/2+G/2,B=Math.min(0,tt),N=Math.max(_,et)-B;b.attr("viewBox",`${B} 0 ${N} ${y}`),ut(b,y,N,p.useMaxWidth)},"draw"),Rt={draw:Et},Gt={parser:At,db:q,renderer:Rt,styles:_t};export{Gt as diagram};
