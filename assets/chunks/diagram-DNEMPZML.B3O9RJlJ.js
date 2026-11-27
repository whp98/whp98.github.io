import{p as z}from"./chunk-JWPE2WC7.KJxEK9R4.js";import{O as P,s as E,g as F,q as A,r as W,b as _,c as N,_ as f,P as B,Q as L,z as M,l as $,T as O,k as Y}from"../app.JZVgA4RE.js";import{p as I}from"./cynefin-EF2NZ3EQ.VIkPK3i-.js";import"./framework.DLXsHQLa.js";import"./theme.ElU4hXtC.js";var j=P.packet,b,C=(b=class{constructor(){this.packet=[],this.setAccTitle=E,this.getAccTitle=F,this.setDiagramTitle=A,this.getDiagramTitle=W,this.getAccDescription=_,this.setAccDescription=N}getConfig(){const t=B({...j,...L().packet});return t.showBits&&(t.paddingY+=10),t}getPacket(){return this.packet}pushWord(t){t.length>0&&this.packet.push(t)}clear(){M(),this.packet=[]}},f(b,"PacketDB"),b),q=1e4,G=f((e,t)=>{z(e,t);let s=-1,r=[],i=1;const{bitsPerRow:l}=t.getConfig();for(let{start:a,end:o,bits:d,label:g}of e.blocks){if(a!==void 0&&o!==void 0&&o<a)throw new Error(`Packet block ${a} - ${o} is invalid. End must be greater than start.`);if(a??(a=s+1),a!==s+1)throw new Error(`Packet block ${a} - ${o??a} is not contiguous. It should start from ${s+1}.`);if(d===0)throw new Error(`Packet block ${a} is invalid. Cannot have a zero bit field.`);for(o??(o=a+(d??1)-1),d??(d=o-a+1),s=o,$.debug(`Packet block ${a} - ${s} with label ${g}`);r.length<=l+1&&t.getPacket().length<q;){const[c,p]=H({start:a,end:o,bits:d,label:g},i,l);if(r.push(c),c.end+1===i*l&&(t.pushWord(r),r=[],i++),!p)break;({start:a,end:o,bits:d,label:g}=p)}}t.pushWord(r)},"populate"),H=f((e,t,s)=>{if(e.start===void 0)throw new Error("start should have been set during first phase");if(e.end===void 0)throw new Error("end should have been set during first phase");if(e.start>e.end)throw new Error(`Block start ${e.start} is greater than block end ${e.end}.`);if(e.end+1<=t*s)return[e,void 0];const r=t*s-1,i=t*s;return[{start:e.start,end:r,label:e.label,bits:r-e.start},{start:i,end:e.end,label:e.label,bits:e.end-i}]},"getNextFittingBlock"),S={parser:{yy:void 0},parse:f(async e=>{var r;const t=await I("packet",e),s=(r=S.parser)==null?void 0:r.yy;if(!(s instanceof C))throw new Error("parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");$.debug(t),G(t,s)},"parse")},K=f((e,t,s,r)=>{const i=r.db,l=i.getConfig(),{rowHeight:a,paddingY:o,bitWidth:d,bitsPerRow:g}=l,c=i.getPacket(),p=i.getDiagramTitle(),m=a+o,n=m*(c.length+1)-(p?0:a),h=d*g+2,k=O(t);k.attr("viewBox",`0 0 ${h} ${n}`),Y(k,n,h,l.useMaxWidth);for(const[x,u]of c.entries())Q(k,u,x,l);k.append("text").text(p).attr("x",h/2).attr("y",n-m/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),Q=f((e,t,s,{rowHeight:r,paddingX:i,paddingY:l,bitWidth:a,bitsPerRow:o,showBits:d,bitOrder:g})=>{const c=e.append("g"),p=s*(r+l)+l,m=g==="descending";for(const n of t){const h=n.end-n.start+1,k=n.start%o,u=(m?o-k-h:k)*a+1,w=h*a-i;if(c.append("rect").attr("x",u).attr("y",p).attr("width",w).attr("height",r).attr("class","packetBlock"),c.append("text").attr("x",u+w/2).attr("y",p+r/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(n.label),!d)continue;const[T,D]=m?[n.end,n.start]:[n.start,n.end],v=h===1,y=p-2;c.append("text").attr("x",u+(v?w/2:0)).attr("y",y).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",v?"middle":"start").text(T),v||c.append("text").attr("x",u+w).attr("y",y).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(D)}},"drawWord"),U={draw:K},X={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},J=f(({packet:e}={})=>{const t=B(X,e);return`
	.packetByte {
		font-size: ${t.byteFontSize};
	}
	.packetByte.start {
		fill: ${t.startByteColor};
	}
	.packetByte.end {
		fill: ${t.endByteColor};
	}
	.packetLabel {
		fill: ${t.labelColor};
		font-size: ${t.labelFontSize};
	}
	.packetTitle {
		fill: ${t.titleColor};
		font-size: ${t.titleFontSize};
	}
	.packetBlock {
		stroke: ${t.blockStrokeColor};
		stroke-width: ${t.blockStrokeWidth};
		fill: ${t.blockFillColor};
	}
	`},"styles"),at={parser:S,get db(){return new C},renderer:U,styles:J};export{at as diagram};
