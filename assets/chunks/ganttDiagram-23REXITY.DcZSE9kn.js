import{b1 as St,b2 as Ct,_ as l,b8 as q,h as dt,s as ve,g as xe,q as Te,r as be,c as we,b as _e,z as De,p as Se,l as st,m as vt,k as Ce,d as Me,x as Ee}from"../app.JZVgA4RE.js";import{t as Ie,m as Ye,a as $e,l as Ae,h as Fe,c as Xt,d as Ut,e as qt,g as Zt,i as Qt,s as Kt,j as Jt,k as Le,n as Oe,p as We,q as Ve,r as Pe,u as ze,v as Re}from"./d3-scale.DZ_Ijlg5.js";import"./framework.DLXsHQLa.js";import"./theme.ElU4hXtC.js";function Ne(t){return t}var Tt=1,Et=2,Yt=3,xt=4,te=1e-6;function He(t){return"translate("+t+",0)"}function Be(t){return"translate(0,"+t+")"}function Ge(t){return e=>+t(e)}function je(t,e){return e=Math.max(0,t.bandwidth()-e*2)/2,t.round()&&(e=Math.round(e)),s=>+t(s)+e}function Xe(){return!this.__axis}function ie(t,e){var s=[],n=null,r=null,g=6,y=6,b=3,S=typeof window<"u"&&window.devicePixelRatio>1?0:.5,L=t===Tt||t===xt?-1:1,_=t===xt||t===Et?"x":"y",W=t===Tt||t===Yt?He:Be;function w(D){var N=n??(e.ticks?e.ticks.apply(e,s):e.domain()),P=r??(e.tickFormat?e.tickFormat.apply(e,s):Ne),k=Math.max(g,0)+b,M=e.range(),V=+M[0]+S,O=+M[M.length-1]+S,B=(e.bandwidth?je:Ge)(e.copy(),S),H=D.selection?D.selection():D,I=H.selectAll(".domain").data([null]),x=H.selectAll(".tick").data(N,e).order(),h=x.exit(),E=x.enter().append("g").attr("class","tick"),f=x.select("line"),T=x.select("text");I=I.merge(I.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),x=x.merge(E),f=f.merge(E.append("line").attr("stroke","currentColor").attr(_+"2",L*g)),T=T.merge(E.append("text").attr("fill","currentColor").attr(_,L*k).attr("dy",t===Tt?"0em":t===Yt?"0.71em":"0.32em")),D!==H&&(I=I.transition(D),x=x.transition(D),f=f.transition(D),T=T.transition(D),h=h.transition(D).attr("opacity",te).attr("transform",function(v){return isFinite(v=B(v))?W(v+S):this.getAttribute("transform")}),E.attr("opacity",te).attr("transform",function(v){var p=this.parentNode.__axis;return W((p&&isFinite(p=p(v))?p:B(v))+S)})),h.remove(),I.attr("d",t===xt||t===Et?y?"M"+L*y+","+V+"H"+S+"V"+O+"H"+L*y:"M"+S+","+V+"V"+O:y?"M"+V+","+L*y+"V"+S+"H"+O+"V"+L*y:"M"+V+","+S+"H"+O),x.attr("opacity",1).attr("transform",function(v){return W(B(v)+S)}),f.attr(_+"2",L*g),T.attr(_,L*k).text(P),H.filter(Xe).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===Et?"start":t===xt?"end":"middle"),H.each(function(){this.__axis=B})}return w.scale=function(D){return arguments.length?(e=D,w):e},w.ticks=function(){return s=Array.from(arguments),w},w.tickArguments=function(D){return arguments.length?(s=D==null?[]:Array.from(D),w):s.slice()},w.tickValues=function(D){return arguments.length?(n=D==null?null:Array.from(D),w):n&&n.slice()},w.tickFormat=function(D){return arguments.length?(r=D,w):r},w.tickSize=function(D){return arguments.length?(g=y=+D,w):g},w.tickSizeInner=function(D){return arguments.length?(g=+D,w):g},w.tickSizeOuter=function(D){return arguments.length?(y=+D,w):y},w.tickPadding=function(D){return arguments.length?(b=+D,w):b},w.offset=function(D){return arguments.length?(S=+D,w):S},w}function Ue(t){return ie(Tt,t)}function qe(t){return ie(Yt,t)}var re={exports:{}};(function(t,e){(function(s,n){t.exports=n()})(St,function(){var s="day";return function(n,r,g){var y=function(L){return L.add(4-L.isoWeekday(),s)},b=r.prototype;b.isoWeekYear=function(){return y(this).year()},b.isoWeek=function(L){if(!this.$utils().u(L))return this.add(7*(L-this.isoWeek()),s);var _,W,w,D,N=y(this),P=(_=this.isoWeekYear(),W=this.$u,w=(W?g.utc:g)().year(_).startOf("year"),D=4-w.isoWeekday(),w.isoWeekday()>4&&(D+=7),w.add(D,s));return N.diff(P,"week")+1},b.isoWeekday=function(L){return this.$utils().u(L)?this.day()||7:this.day(this.day()%7?L:L-7)};var S=b.startOf;b.startOf=function(L,_){var W=this.$utils(),w=!!W.u(_)||_;return W.p(L)==="isoweek"?w?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):S.bind(this)(L,_)}}})})(re);var Ze=re.exports;const Qe=Ct(Ze);var ae={exports:{}};(function(t,e){(function(s,n){t.exports=n()})(St,function(){var s={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},n=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,r=/\d/,g=/\d\d/,y=/\d\d?/,b=/\d*[^-_:/,()\s\d]+/,S={},L=function(k){return(k=+k)+(k>68?1900:2e3)},_=function(k){return function(M){this[k]=+M}},W=[/[+-]\d\d:?(\d\d)?|Z/,function(k){(this.zone||(this.zone={})).offset=function(M){if(!M||M==="Z")return 0;var V=M.match(/([+-]|\d\d)/g),O=60*V[1]+(+V[2]||0);return O===0?0:V[0]==="+"?-O:O}(k)}],w=function(k){var M=S[k];return M&&(M.indexOf?M:M.s.concat(M.f))},D=function(k,M){var V,O=S.meridiem;if(O){for(var B=1;B<=24;B+=1)if(k.indexOf(O(B,0,M))>-1){V=B>12;break}}else V=k===(M?"pm":"PM");return V},N={A:[b,function(k){this.afternoon=D(k,!1)}],a:[b,function(k){this.afternoon=D(k,!0)}],Q:[r,function(k){this.month=3*(k-1)+1}],S:[r,function(k){this.milliseconds=100*+k}],SS:[g,function(k){this.milliseconds=10*+k}],SSS:[/\d{3}/,function(k){this.milliseconds=+k}],s:[y,_("seconds")],ss:[y,_("seconds")],m:[y,_("minutes")],mm:[y,_("minutes")],H:[y,_("hours")],h:[y,_("hours")],HH:[y,_("hours")],hh:[y,_("hours")],D:[y,_("day")],DD:[g,_("day")],Do:[b,function(k){var M=S.ordinal,V=k.match(/\d+/);if(this.day=V[0],M)for(var O=1;O<=31;O+=1)M(O).replace(/\[|\]/g,"")===k&&(this.day=O)}],w:[y,_("week")],ww:[g,_("week")],M:[y,_("month")],MM:[g,_("month")],MMM:[b,function(k){var M=w("months"),V=(w("monthsShort")||M.map(function(O){return O.slice(0,3)})).indexOf(k)+1;if(V<1)throw new Error;this.month=V%12||V}],MMMM:[b,function(k){var M=w("months").indexOf(k)+1;if(M<1)throw new Error;this.month=M%12||M}],Y:[/[+-]?\d+/,_("year")],YY:[g,function(k){this.year=L(k)}],YYYY:[/\d{4}/,_("year")],Z:W,ZZ:W};function P(k){var M,V;M=k,V=S&&S.formats;for(var O=(k=M.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(f,T,v){var p=v&&v.toUpperCase();return T||V[v]||s[v]||V[p].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(a,d,m){return d||m.slice(1)})})).match(n),B=O.length,H=0;H<B;H+=1){var I=O[H],x=N[I],h=x&&x[0],E=x&&x[1];O[H]=E?{regex:h,parser:E}:I.replace(/^\[|\]$/g,"")}return function(f){for(var T={},v=0,p=0;v<B;v+=1){var a=O[v];if(typeof a=="string")p+=a.length;else{var d=a.regex,m=a.parser,u=f.slice(p),C=d.exec(u)[0];m.call(T,C),f=f.replace(C,"")}}return function(i){var Y=i.afternoon;if(Y!==void 0){var o=i.hours;Y?o<12&&(i.hours+=12):o===12&&(i.hours=0),delete i.afternoon}}(T),T}}return function(k,M,V){V.p.customParseFormat=!0,k&&k.parseTwoDigitYear&&(L=k.parseTwoDigitYear);var O=M.prototype,B=O.parse;O.parse=function(H){var I=H.date,x=H.utc,h=H.args;this.$u=x;var E=h[1];if(typeof E=="string"){var f=h[2]===!0,T=h[3]===!0,v=f||T,p=h[2];T&&(p=h[2]),S=this.$locale(),!f&&p&&(S=V.Ls[p]),this.$d=function(u,C,i,Y){try{if(["x","X"].indexOf(C)>-1)return new Date((C==="X"?1e3:1)*u);var o=P(C)(u),j=o.year,c=o.month,$=o.day,A=o.hours,R=o.minutes,F=o.seconds,G=o.milliseconds,z=o.zone,it=o.week,at=new Date,yt=$||(j||c?1:at.getDate()),lt=j||at.getFullYear(),X=0;j&&!c||(X=c>0?c-1:at.getMonth());var K,Z=A||0,ot=R||0,J=F||0,rt=G||0;return z?new Date(Date.UTC(lt,X,yt,Z,ot,J,rt+60*z.offset*1e3)):i?new Date(Date.UTC(lt,X,yt,Z,ot,J,rt)):(K=new Date(lt,X,yt,Z,ot,J,rt),it&&(K=Y(K).week(it).toDate()),K)}catch{return new Date("")}}(I,E,x,V),this.init(),p&&p!==!0&&(this.$L=this.locale(p).$L),v&&I!=this.format(E)&&(this.$d=new Date("")),S={}}else if(E instanceof Array)for(var a=E.length,d=1;d<=a;d+=1){h[1]=E[d-1];var m=V.apply(this,h);if(m.isValid()){this.$d=m.$d,this.$L=m.$L,this.init();break}d===a&&(this.$d=new Date(""))}else B.call(this,H)}}})})(ae);var Ke=ae.exports;const Je=Ct(Ke);var oe={exports:{}};(function(t,e){(function(s,n){t.exports=n()})(St,function(){return function(s,n){var r=n.prototype,g=r.format;r.format=function(y){var b=this,S=this.$locale();if(!this.isValid())return g.bind(this)(y);var L=this.$utils(),_=(y||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(W){switch(W){case"Q":return Math.ceil((b.$M+1)/3);case"Do":return S.ordinal(b.$D);case"gggg":return b.weekYear();case"GGGG":return b.isoWeekYear();case"wo":return S.ordinal(b.week(),"W");case"w":case"ww":return L.s(b.week(),W==="w"?1:2,"0");case"W":case"WW":return L.s(b.isoWeek(),W==="W"?1:2,"0");case"k":case"kk":return L.s(String(b.$H===0?24:b.$H),W==="k"?1:2,"0");case"X":return Math.floor(b.$d.getTime()/1e3);case"x":return b.$d.getTime();case"z":return"["+b.offsetName()+"]";case"zzz":return"["+b.offsetName("long")+"]";default:return W}});return g.bind(this)(_)}}})})(oe);var tn=oe.exports;const en=Ct(tn);var ce={exports:{}};(function(t,e){(function(s,n){t.exports=n()})(St,function(){var s,n,r=1e3,g=6e4,y=36e5,b=864e5,S=31536e6,L=2628e6,_=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,W=/\[([^\]]+)]|YYYY|YY|Y|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS/g,w={years:S,months:L,days:b,hours:y,minutes:g,seconds:r,milliseconds:1,weeks:6048e5},D=function(I){return I instanceof B},N=function(I,x,h){return new B(I,h,x.$l)},P=function(I){return n.p(I)+"s"},k=function(I){return I<0},M=function(I){return k(I)?Math.ceil(I):Math.floor(I)},V=function(I){return Math.abs(I)},O=function(I,x){return I?k(I)?{negative:!0,format:""+V(I)+x}:{negative:!1,format:""+I+x}:{negative:!1,format:""}},B=function(){function I(h,E,f){var T=this;if(this.$d={},this.$l=f,h===void 0&&(this.$ms=0,this.parseFromMilliseconds()),E)return N(h*w[P(E)],this);if(typeof h=="number")return this.$ms=h,this.parseFromMilliseconds(),this;if(typeof h=="object")return Object.keys(h).forEach(function(a){T.$d[P(a)]=h[a]}),this.calMilliseconds(),this;if(typeof h=="string"){var v=h.match(_);if(v){var p=v.slice(2).map(function(a){return a!=null?Number(a):0});return this.$d.years=p[0],this.$d.months=p[1],this.$d.weeks=p[2],this.$d.days=p[3],this.$d.hours=p[4],this.$d.minutes=p[5],this.$d.seconds=p[6],this.calMilliseconds(),this}}return this}var x=I.prototype;return x.calMilliseconds=function(){var h=this;this.$ms=Object.keys(this.$d).reduce(function(E,f){return E+(h.$d[f]||0)*w[f]},0)},x.parseFromMilliseconds=function(){var h=this.$ms;this.$d.years=M(h/S),h%=S,this.$d.months=M(h/L),h%=L,this.$d.days=M(h/b),h%=b,this.$d.hours=M(h/y),h%=y,this.$d.minutes=M(h/g),h%=g,this.$d.seconds=M(h/r),h%=r,this.$d.milliseconds=h},x.toISOString=function(){var h=O(this.$d.years,"Y"),E=O(this.$d.months,"M"),f=+this.$d.days||0;this.$d.weeks&&(f+=7*this.$d.weeks);var T=O(f,"D"),v=O(this.$d.hours,"H"),p=O(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3,a=Math.round(1e3*a)/1e3);var d=O(a,"S"),m=h.negative||E.negative||T.negative||v.negative||p.negative||d.negative,u=v.format||p.format||d.format?"T":"",C=(m?"-":"")+"P"+h.format+E.format+T.format+u+v.format+p.format+d.format;return C==="P"||C==="-P"?"P0D":C},x.toJSON=function(){return this.toISOString()},x.format=function(h){var E=h||"YYYY-MM-DDTHH:mm:ss",f={Y:this.$d.years,YY:n.s(this.$d.years,2,"0"),YYYY:n.s(this.$d.years,4,"0"),M:this.$d.months,MM:n.s(this.$d.months,2,"0"),D:this.$d.days,DD:n.s(this.$d.days,2,"0"),H:this.$d.hours,HH:n.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:n.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:n.s(this.$d.seconds,2,"0"),SSS:n.s(this.$d.milliseconds,3,"0")};return E.replace(W,function(T,v){return v||String(f[T])})},x.as=function(h){return this.$ms/w[P(h)]},x.get=function(h){var E=this.$ms,f=P(h);return f==="milliseconds"?E%=1e3:E=f==="weeks"?M(E/w[f]):this.$d[f],E||0},x.add=function(h,E,f){var T;return T=E?h*w[P(E)]:D(h)?h.$ms:N(h,this).$ms,N(this.$ms+T*(f?-1:1),this)},x.subtract=function(h,E){return this.add(h,E,!0)},x.locale=function(h){var E=this.clone();return E.$l=h,E},x.clone=function(){return N(this.$ms,this)},x.humanize=function(h){return s().add(this.$ms,"ms").locale(this.$l).fromNow(!h)},x.valueOf=function(){return this.asMilliseconds()},x.milliseconds=function(){return this.get("milliseconds")},x.asMilliseconds=function(){return this.as("milliseconds")},x.seconds=function(){return this.get("seconds")},x.asSeconds=function(){return this.as("seconds")},x.minutes=function(){return this.get("minutes")},x.asMinutes=function(){return this.as("minutes")},x.hours=function(){return this.get("hours")},x.asHours=function(){return this.as("hours")},x.days=function(){return this.get("days")},x.asDays=function(){return this.as("days")},x.weeks=function(){return this.get("weeks")},x.asWeeks=function(){return this.as("weeks")},x.months=function(){return this.get("months")},x.asMonths=function(){return this.as("months")},x.years=function(){return this.get("years")},x.asYears=function(){return this.as("years")},I}(),H=function(I,x,h){return I.add(x.years()*h,"y").add(x.months()*h,"M").add(x.days()*h,"d").add(x.hours()*h,"h").add(x.minutes()*h,"m").add(x.seconds()*h,"s").add(x.milliseconds()*h,"ms")};return function(I,x,h){s=h,n=h().$utils(),h.duration=function(T,v){var p=h.locale();return N(T,{$l:p},v)},h.isDuration=D;var E=x.prototype.add,f=x.prototype.subtract;x.prototype.add=function(T,v){return D(T)?H(this,T,1):E.bind(this)(T,v)},x.prototype.subtract=function(T,v){return D(T)?H(this,T,-1):f.bind(this)(T,v)}}})})(ce);var nn=ce.exports;const sn=Ct(nn);var $t=function(){var t=l(function(p,a,d,m){for(d=d||{},m=p.length;m--;d[p[m]]=a);return d},"o"),e=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],s=[1,26],n=[1,27],r=[1,28],g=[1,29],y=[1,30],b=[1,31],S=[1,32],L=[1,33],_=[1,34],W=[1,9],w=[1,10],D=[1,11],N=[1,12],P=[1,13],k=[1,14],M=[1,15],V=[1,16],O=[1,19],B=[1,20],H=[1,21],I=[1,22],x=[1,23],h=[1,25],E=[1,35],f={trace:l(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:l(function(a,d,m,u,C,i,Y){var o=i.length-1;switch(C){case 1:return i[o-1];case 2:this.$=[];break;case 3:i[o-1].push(i[o]),this.$=i[o-1];break;case 4:case 5:this.$=i[o];break;case 6:case 7:this.$=[];break;case 8:u.setWeekday("monday");break;case 9:u.setWeekday("tuesday");break;case 10:u.setWeekday("wednesday");break;case 11:u.setWeekday("thursday");break;case 12:u.setWeekday("friday");break;case 13:u.setWeekday("saturday");break;case 14:u.setWeekday("sunday");break;case 15:u.setWeekend("friday");break;case 16:u.setWeekend("saturday");break;case 17:u.setDateFormat(i[o].substr(11)),this.$=i[o].substr(11);break;case 18:u.enableInclusiveEndDates(),this.$=i[o].substr(18);break;case 19:u.TopAxis(),this.$=i[o].substr(8);break;case 20:u.setAxisFormat(i[o].substr(11)),this.$=i[o].substr(11);break;case 21:u.setTickInterval(i[o].substr(13)),this.$=i[o].substr(13);break;case 22:u.setExcludes(i[o].substr(9)),this.$=i[o].substr(9);break;case 23:u.setIncludes(i[o].substr(9)),this.$=i[o].substr(9);break;case 24:u.setTodayMarker(i[o].substr(12)),this.$=i[o].substr(12);break;case 27:u.setDiagramTitle(i[o].substr(6)),this.$=i[o].substr(6);break;case 28:this.$=i[o].trim(),u.setAccTitle(this.$);break;case 29:case 30:this.$=i[o].trim(),u.setAccDescription(this.$);break;case 31:u.addSection(i[o].substr(8)),this.$=i[o].substr(8);break;case 33:u.addTask(i[o-1],i[o]),this.$="task";break;case 34:this.$=i[o-1],u.setClickEvent(i[o-1],i[o],null);break;case 35:this.$=i[o-2],u.setClickEvent(i[o-2],i[o-1],i[o]);break;case 36:this.$=i[o-2],u.setClickEvent(i[o-2],i[o-1],null),u.setLink(i[o-2],i[o]);break;case 37:this.$=i[o-3],u.setClickEvent(i[o-3],i[o-2],i[o-1]),u.setLink(i[o-3],i[o]);break;case 38:this.$=i[o-2],u.setClickEvent(i[o-2],i[o],null),u.setLink(i[o-2],i[o-1]);break;case 39:this.$=i[o-3],u.setClickEvent(i[o-3],i[o-1],i[o]),u.setLink(i[o-3],i[o-2]);break;case 40:this.$=i[o-1],u.setLink(i[o-1],i[o]);break;case 41:case 47:this.$=i[o-1]+" "+i[o];break;case 42:case 43:case 45:this.$=i[o-2]+" "+i[o-1]+" "+i[o];break;case 44:case 46:this.$=i[o-3]+" "+i[o-2]+" "+i[o-1]+" "+i[o];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:s,13:n,14:r,15:g,16:y,17:b,18:S,19:18,20:L,21:_,22:W,23:w,24:D,25:N,26:P,27:k,28:M,29:V,30:O,31:B,33:H,35:I,36:x,37:24,38:h,40:E},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:36,11:17,12:s,13:n,14:r,15:g,16:y,17:b,18:S,19:18,20:L,21:_,22:W,23:w,24:D,25:N,26:P,27:k,28:M,29:V,30:O,31:B,33:H,35:I,36:x,37:24,38:h,40:E},t(e,[2,5]),t(e,[2,6]),t(e,[2,17]),t(e,[2,18]),t(e,[2,19]),t(e,[2,20]),t(e,[2,21]),t(e,[2,22]),t(e,[2,23]),t(e,[2,24]),t(e,[2,25]),t(e,[2,26]),t(e,[2,27]),{32:[1,37]},{34:[1,38]},t(e,[2,30]),t(e,[2,31]),t(e,[2,32]),{39:[1,39]},t(e,[2,8]),t(e,[2,9]),t(e,[2,10]),t(e,[2,11]),t(e,[2,12]),t(e,[2,13]),t(e,[2,14]),t(e,[2,15]),t(e,[2,16]),{41:[1,40],43:[1,41]},t(e,[2,4]),t(e,[2,28]),t(e,[2,29]),t(e,[2,33]),t(e,[2,34],{42:[1,42],43:[1,43]}),t(e,[2,40],{41:[1,44]}),t(e,[2,35],{43:[1,45]}),t(e,[2,36]),t(e,[2,38],{42:[1,46]}),t(e,[2,37]),t(e,[2,39])],defaultActions:{},parseError:l(function(a,d){if(d.recoverable)this.trace(a);else{var m=new Error(a);throw m.hash=d,m}},"parseError"),parse:l(function(a){var d=this,m=[0],u=[],C=[null],i=[],Y=this.table,o="",j=0,c=0,$=2,A=1,R=i.slice.call(arguments,1),F=Object.create(this.lexer),G={yy:{}};for(var z in this.yy)Object.prototype.hasOwnProperty.call(this.yy,z)&&(G.yy[z]=this.yy[z]);F.setInput(a,G.yy),G.yy.lexer=F,G.yy.parser=this,typeof F.yylloc>"u"&&(F.yylloc={});var it=F.yylloc;i.push(it);var at=F.options&&F.options.ranges;typeof G.yy.parseError=="function"?this.parseError=G.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function yt(Q){m.length=m.length-2*Q,C.length=C.length-Q,i.length=i.length-Q}l(yt,"popStack");function lt(){var Q;return Q=u.pop()||F.lex()||A,typeof Q!="number"&&(Q instanceof Array&&(u=Q,Q=u.pop()),Q=d.symbols_[Q]||Q),Q}l(lt,"lex");for(var X,K,Z,ot,J={},rt,tt,jt,pt;;){if(K=m[m.length-1],this.defaultActions[K]?Z=this.defaultActions[K]:((X===null||typeof X>"u")&&(X=lt()),Z=Y[K]&&Y[K][X]),typeof Z>"u"||!Z.length||!Z[0]){var Mt="";pt=[];for(rt in Y[K])this.terminals_[rt]&&rt>$&&pt.push("'"+this.terminals_[rt]+"'");F.showPosition?Mt="Parse error on line "+(j+1)+`:
`+F.showPosition()+`
Expecting `+pt.join(", ")+", got '"+(this.terminals_[X]||X)+"'":Mt="Parse error on line "+(j+1)+": Unexpected "+(X==A?"end of input":"'"+(this.terminals_[X]||X)+"'"),this.parseError(Mt,{text:F.match,token:this.terminals_[X]||X,line:F.yylineno,loc:it,expected:pt})}if(Z[0]instanceof Array&&Z.length>1)throw new Error("Parse Error: multiple actions possible at state: "+K+", token: "+X);switch(Z[0]){case 1:m.push(X),C.push(F.yytext),i.push(F.yylloc),m.push(Z[1]),X=null,c=F.yyleng,o=F.yytext,j=F.yylineno,it=F.yylloc;break;case 2:if(tt=this.productions_[Z[1]][1],J.$=C[C.length-tt],J._$={first_line:i[i.length-(tt||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(tt||1)].first_column,last_column:i[i.length-1].last_column},at&&(J._$.range=[i[i.length-(tt||1)].range[0],i[i.length-1].range[1]]),ot=this.performAction.apply(J,[o,c,j,G.yy,Z[1],C,i].concat(R)),typeof ot<"u")return ot;tt&&(m=m.slice(0,-1*tt*2),C=C.slice(0,-1*tt),i=i.slice(0,-1*tt)),m.push(this.productions_[Z[1]][0]),C.push(J.$),i.push(J._$),jt=Y[m[m.length-2]][m[m.length-1]],m.push(jt);break;case 3:return!0}}return!0},"parse")},T=function(){var p={EOF:1,parseError:l(function(d,m){if(this.yy.parser)this.yy.parser.parseError(d,m);else throw new Error(d)},"parseError"),setInput:l(function(a,d){return this.yy=d||this.yy||{},this._input=a,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:l(function(){var a=this._input[0];this.yytext+=a,this.yyleng++,this.offset++,this.match+=a,this.matched+=a;var d=a.match(/(?:\r\n?|\n).*/g);return d?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),a},"input"),unput:l(function(a){var d=a.length,m=a.split(/(?:\r\n?|\n)/g);this._input=a+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-d),this.offset-=d;var u=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),m.length-1&&(this.yylineno-=m.length-1);var C=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:m?(m.length===u.length?this.yylloc.first_column:0)+u[u.length-m.length].length-m[0].length:this.yylloc.first_column-d},this.options.ranges&&(this.yylloc.range=[C[0],C[0]+this.yyleng-d]),this.yyleng=this.yytext.length,this},"unput"),more:l(function(){return this._more=!0,this},"more"),reject:l(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:l(function(a){this.unput(this.match.slice(a))},"less"),pastInput:l(function(){var a=this.matched.substr(0,this.matched.length-this.match.length);return(a.length>20?"...":"")+a.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:l(function(){var a=this.match;return a.length<20&&(a+=this._input.substr(0,20-a.length)),(a.substr(0,20)+(a.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:l(function(){var a=this.pastInput(),d=new Array(a.length+1).join("-");return a+this.upcomingInput()+`
`+d+"^"},"showPosition"),test_match:l(function(a,d){var m,u,C;if(this.options.backtrack_lexer&&(C={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(C.yylloc.range=this.yylloc.range.slice(0))),u=a[0].match(/(?:\r\n?|\n).*/g),u&&(this.yylineno+=u.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:u?u[u.length-1].length-u[u.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+a[0].length},this.yytext+=a[0],this.match+=a[0],this.matches=a,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(a[0].length),this.matched+=a[0],m=this.performAction.call(this,this.yy,this,d,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),m)return m;if(this._backtrack){for(var i in C)this[i]=C[i];return!1}return!1},"test_match"),next:l(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var a,d,m,u;this._more||(this.yytext="",this.match="");for(var C=this._currentRules(),i=0;i<C.length;i++)if(m=this._input.match(this.rules[C[i]]),m&&(!d||m[0].length>d[0].length)){if(d=m,u=i,this.options.backtrack_lexer){if(a=this.test_match(m,C[i]),a!==!1)return a;if(this._backtrack){d=!1;continue}else return!1}else if(!this.options.flex)break}return d?(a=this.test_match(d,C[u]),a!==!1?a:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:l(function(){var d=this.next();return d||this.lex()},"lex"),begin:l(function(d){this.conditionStack.push(d)},"begin"),popState:l(function(){var d=this.conditionStack.length-1;return d>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:l(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:l(function(d){return d=this.conditionStack.length-1-Math.abs(d||0),d>=0?this.conditionStack[d]:"INITIAL"},"topState"),pushState:l(function(d){this.begin(d)},"pushState"),stateStackSize:l(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:l(function(d,m,u,C){switch(u){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),31;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),33;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 43;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return p}();f.lexer=T;function v(){this.yy={}}return l(v,"Parser"),v.prototype=f,f.Parser=v,new v}();$t.parser=$t;var rn=$t;q.extend(Qe);q.extend(Je);q.extend(en);var ee={friday:5,saturday:6},et="",Ot="",Wt=void 0,Vt="",ht=[],mt=[],Pt=new Map,zt=[],_t=[],kt="",Rt="",le=["active","done","crit","milestone","vert"],Nt=[],ut="",gt=!1,Ht=!1,Bt="sunday",Dt="saturday",At=0,an=l(function(){zt=[],_t=[],kt="",Nt=[],bt=0,Lt=void 0,wt=void 0,U=[],et="",Ot="",Rt="",Wt=void 0,Vt="",ht=[],mt=[],gt=!1,Ht=!1,At=0,Pt=new Map,ut="",De(),Bt="sunday",Dt="saturday"},"clear"),on=l(function(t){ut=t},"setDiagramId"),cn=l(function(t){Ot=t},"setAxisFormat"),ln=l(function(){return Ot},"getAxisFormat"),un=l(function(t){Wt=t},"setTickInterval"),dn=l(function(){return Wt},"getTickInterval"),fn=l(function(t){Vt=t},"setTodayMarker"),hn=l(function(){return Vt},"getTodayMarker"),mn=l(function(t){et=t},"setDateFormat"),kn=l(function(){gt=!0},"enableInclusiveEndDates"),yn=l(function(){return gt},"endDatesAreInclusive"),gn=l(function(){Ht=!0},"enableTopAxis"),pn=l(function(){return Ht},"topAxisEnabled"),vn=l(function(t){Rt=t},"setDisplayMode"),xn=l(function(){return Rt},"getDisplayMode"),Tn=l(function(){return et},"getDateFormat"),ue=l((t,e)=>{const s=e.toLowerCase().split(/[\s,]+/).filter(n=>n!=="");return[...new Set([...t,...s])]},"mergeTokens"),bn=l(function(t){ht=ue(ht,t)},"setIncludes"),wn=l(function(){return ht},"getIncludes"),_n=l(function(t){mt=ue(mt,t)},"setExcludes"),Dn=l(function(){return mt},"getExcludes"),Sn=l(function(){return Pt},"getLinks"),Cn=l(function(t){kt=t,zt.push(t)},"addSection"),Mn=l(function(){return zt},"getSections"),En=l(function(){let t=ne();const e=10;let s=0;for(;!t&&s<e;)t=ne(),s++;return _t=U,_t},"getTasks"),de=l(function(t,e,s,n){const r=t.format(e.trim()),g=t.format("YYYY-MM-DD");return n.includes(r)||n.includes(g)?!1:s.includes("weekends")&&(t.isoWeekday()===ee[Dt]||t.isoWeekday()===ee[Dt]+1)||s.includes(t.format("dddd").toLowerCase())?!0:s.includes(r)||s.includes(g)},"isInvalidDate"),In=l(function(t){Bt=t},"setWeekday"),Yn=l(function(){return Bt},"getWeekday"),$n=l(function(t){Dt=t},"setWeekend"),fe=l(function(t,e,s,n){if(!s.length||t.manualEndTime)return;let r;t.startTime instanceof Date?r=q(t.startTime):r=q(t.startTime,e,!0),r=r.add(1,"d");let g;t.endTime instanceof Date?g=q(t.endTime):g=q(t.endTime,e,!0);const[y,b]=An(r,g,e,s,n);t.endTime=y.toDate(),t.renderEndTime=b},"checkTaskDates"),An=l(function(t,e,s,n,r){let g=!1,y=null;const b=e.add(1e4,"d");for(;t<=e;){if(g||(y=e.toDate()),g=de(t,s,n,r),g&&(e=e.add(1,"d"),e>b))throw new Error("Failed to find a valid date that was not excluded by `excludes` after 10,000 iterations.");t=t.add(1,"d")}return[e,y]},"fixTaskDates"),he=l(function(t,e){st.warn(`Gantt: the "${t}" statement references unknown task id(s): ${e.join(", ")}. Make sure the referenced tasks exist and declare an id. Milestones need both an id and a duration, e.g. "Milestone :milestone, m1, 2023-01-01, 0d".`)},"warnAboutUnknownTaskIds"),Ft=l(function(t,e,s){if(s=s.trim(),l(b=>{const S=b.trim();return S==="x"||S==="X"},"isTimestampFormat")(e)&&/^\d+$/.test(s))return new Date(Number(s));const g=/^after\s+(?<ids>[\d\w- ]+)/.exec(s);if(g!==null){let b=null;const S=[],L=g.groups.ids.split(" ").filter(W=>W!=="");for(const W of L){const w=ct(W);if(w===void 0){S.push(W);continue}(!b||w.endTime>b.endTime)&&(b=w)}if(S.length>0&&he("after",S),b)return b.endTime;const _=new Date;return _.setHours(0,0,0,0),_}let y=q(s,e.trim(),!0);if(y.isValid())return y.toDate();{st.debug("Invalid date:"+s),st.debug("With date format:"+e.trim());const b=new Date(s);if(b===void 0||isNaN(b.getTime())||b.getFullYear()<-1e4||b.getFullYear()>1e4)throw new Error("Invalid date:"+s);return b}},"getStartDate"),me=l(function(t){const e=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return e!==null?[Number.parseFloat(e[1]),e[2]]:[NaN,"ms"]},"parseDuration"),ke=l(function(t,e,s,n=!1){s=s.trim();const g=/^until\s+(?<ids>[\d\w- ]+)/.exec(s);if(g!==null){let _=null;const W=[],w=g.groups.ids.split(" ").filter(N=>N!=="");for(const N of w){const P=ct(N);if(P===void 0){W.push(N);continue}(!_||P.startTime<_.startTime)&&(_=P)}if(W.length>0&&he("until",W),_)return _.startTime;const D=new Date;return D.setHours(0,0,0,0),D}let y=q(s,e.trim(),!0);if(y.isValid())return n&&(y=y.add(1,"d")),y.toDate();let b=q(t);const[S,L]=me(s);if(Number.isNaN(S))st.warn(`Gantt: "${s}" is neither a valid date for the "${e.trim()}" date format nor a valid duration (e.g. "3d"), so it is ignored and the task gets a zero duration. Milestones need a duration too, e.g. "Milestone :milestone, m1, 2023-01-01, 0d".`);else{const _=b.add(S,L);_.isValid()&&(b=_)}return b.toDate()},"getEndDate"),bt=0,ft=l(function(t){return t===void 0?(bt=bt+1,"task"+bt):t},"parseId"),Fn=l(function(t,e){let s;e.substr(0,1)===":"?s=e.substr(1,e.length):s=e;const n=s.split(","),r={};Gt(n,r,le);for(let y=0;y<n.length;y++)n[y]=n[y].trim();let g="";switch(n.length){case 1:r.id=ft(),r.startTime=t.endTime,g=n[0];break;case 2:r.id=ft(),r.startTime=Ft(void 0,et,n[0]),g=n[1];break;case 3:r.id=ft(n[0]),r.startTime=Ft(void 0,et,n[1]),g=n[2];break}return g&&(r.endTime=ke(r.startTime,et,g,gt),r.manualEndTime=q(g,"YYYY-MM-DD",!0).isValid(),fe(r,et,mt,ht)),r},"compileData"),Ln=l(function(t,e){let s;e.substr(0,1)===":"?s=e.substr(1,e.length):s=e;const n=s.split(","),r={};Gt(n,r,le);for(let g=0;g<n.length;g++)n[g]=n[g].trim();switch(n.length){case 1:r.id=ft(),r.startTime={type:"prevTaskEnd",id:t},r.endTime={data:n[0]};break;case 2:r.id=ft(),r.startTime={type:"getStartDate",startData:n[0]},r.endTime={data:n[1]};break;case 3:r.id=ft(n[0]),r.startTime={type:"getStartDate",startData:n[1]},r.endTime={data:n[2]};break}return r},"parseData"),Lt,wt,U=[],ye={},On=l(function(t,e){const s={section:kt,type:kt,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:e},task:t,classes:[]},n=Ln(wt,e);s.raw.startTime=n.startTime,s.raw.endTime=n.endTime,s.id=n.id,s.prevTaskId=wt,s.active=n.active,s.done=n.done,s.crit=n.crit,s.milestone=n.milestone,s.vert=n.vert,s.vert?s.order=-1:(s.order=At,At++);const r=U.push(s);wt=s.id,ye[s.id]=r-1},"addTask"),ct=l(function(t){const e=ye[t];return U[e]},"findTaskById"),Wn=l(function(t,e){const s={section:kt,type:kt,description:t,task:t,classes:[]},n=Fn(Lt,e);s.startTime=n.startTime,s.endTime=n.endTime,s.id=n.id,s.active=n.active,s.done=n.done,s.crit=n.crit,s.milestone=n.milestone,s.vert=n.vert,Lt=s,_t.push(s)},"addTaskOrg"),ne=l(function(){const t=l(function(s){const n=U[s];let r="";switch(U[s].raw.startTime.type){case"prevTaskEnd":{const g=ct(n.prevTaskId);n.startTime=g.endTime;break}case"getStartDate":r=Ft(void 0,et,U[s].raw.startTime.startData),r&&(U[s].startTime=r);break}return U[s].startTime&&(U[s].endTime=ke(U[s].startTime,et,U[s].raw.endTime.data,gt),U[s].endTime&&(U[s].processed=!0,U[s].manualEndTime=q(U[s].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),fe(U[s],et,mt,ht))),U[s].processed},"compileTask");let e=!0;for(const[s,n]of U.entries())t(s),e=e&&n.processed;return e},"compileTasks"),Vn=l(function(t,e){let s=e;dt().securityLevel!=="loose"&&(s=Se(e)),t.split(",").forEach(function(n){ct(n)!==void 0&&(pe(n,()=>{window.open(s,"_self")}),Pt.set(n,s))}),ge(t,"clickable")},"setLink"),ge=l(function(t,e){t.split(",").forEach(function(s){let n=ct(s);n!==void 0&&n.classes.push(e)})},"setClass"),Pn=l(function(t,e,s){if(dt().securityLevel!=="loose"||e===void 0)return;let n=[];if(typeof s=="string"){n=s.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let g=0;g<n.length;g++){let y=n[g].trim();y.startsWith('"')&&y.endsWith('"')&&(y=y.substr(1,y.length-2)),n[g]=y}}n.length===0&&n.push(t),ct(t)!==void 0&&pe(t,()=>{Ee.runFunc(e,...n)})},"setClickFun"),pe=l(function(t,e){Nt.push(function(){const s=ut?`${ut}-${t}`:t,n=document.querySelector(`[id="${s}"]`);n!==null&&n.addEventListener("click",function(){e()})},function(){const s=ut?`${ut}-${t}`:t,n=document.querySelector(`[id="${s}-text"]`);n!==null&&n.addEventListener("click",function(){e()})})},"pushFun"),zn=l(function(t,e,s){t.split(",").forEach(function(n){Pn(n,e,s)}),ge(t,"clickable")},"setClickEvent"),Rn=l(function(t){Nt.forEach(function(e){e(t)})},"bindFunctions"),Nn={getConfig:l(()=>dt().gantt,"getConfig"),clear:an,setDateFormat:mn,getDateFormat:Tn,enableInclusiveEndDates:kn,endDatesAreInclusive:yn,enableTopAxis:gn,topAxisEnabled:pn,setAxisFormat:cn,getAxisFormat:ln,setTickInterval:un,getTickInterval:dn,setTodayMarker:fn,getTodayMarker:hn,setAccTitle:ve,getAccTitle:xe,setDiagramTitle:Te,getDiagramTitle:be,setDiagramId:on,setDisplayMode:vn,getDisplayMode:xn,setAccDescription:we,getAccDescription:_e,addSection:Cn,getSections:Mn,getTasks:En,addTask:On,findTaskById:ct,addTaskOrg:Wn,setIncludes:bn,getIncludes:wn,setExcludes:_n,getExcludes:Dn,setClickEvent:zn,setLink:Vn,getLinks:Sn,bindFunctions:Rn,parseDuration:me,isInvalidDate:de,setWeekday:In,getWeekday:Yn,setWeekend:$n};function Gt(t,e,s){let n=!0;for(;n;)n=!1,s.forEach(function(r){const g="^\\s*"+r+"\\s*$",y=new RegExp(g);t[0].match(y)&&(e[r]=!0,t.shift(1),n=!0)})}l(Gt,"getTaskTags");q.extend(sn);var Hn=l(function(){st.debug("Something is calling, setConf, remove the call")},"setConf"),se={monday:Le,tuesday:Oe,wednesday:We,thursday:Ve,friday:Pe,saturday:ze,sunday:Re},Bn=l((t,e)=>{let s=[...t].map(()=>-1/0),n=[...t].sort((g,y)=>g.startTime-y.startTime||g.order-y.order),r=0;for(const g of n)for(let y=0;y<s.length;y++)if(g.startTime>=s[y]){s[y]=g.endTime,g.order=y+e,y>r&&(r=y);break}return r},"getMaxIntersections"),nt,It=1e4,Gn=l(function(t,e,s,n){const r=dt().gantt;n.db.setDiagramId(e);const g=dt().securityLevel;let y;g==="sandbox"&&(y=vt("#i"+e));const b=g==="sandbox"?vt(y.nodes()[0].contentDocument.body):vt("body"),S=g==="sandbox"?y.nodes()[0].contentDocument:document,L=S.getElementById(e);nt=L.parentElement.offsetWidth,nt===void 0&&(nt=1200),r.useWidth!==void 0&&(nt=r.useWidth);const _=n.db.getTasks(),W=_.filter(f=>!f.vert);let w=[];for(const f of W)w.push(f.type);w=E(w);const D={};let N=2*r.topPadding;if(n.db.getDisplayMode()==="compact"||r.displayMode==="compact"){const f={};for(const v of W)f[v.section]===void 0?f[v.section]=[v]:f[v.section].push(v);let T=0;for(const v of Object.keys(f)){const p=Bn(f[v],T)+1;T+=p,N+=p*(r.barHeight+r.barGap),D[v]=p}}else{N+=W.length*(r.barHeight+r.barGap);for(const f of w)D[f]=W.filter(T=>T.type===f).length}L.setAttribute("viewBox","0 0 "+nt+" "+N);const P=b.select(`[id="${e}"]`),k=Ie().domain([Ye(_,function(f){return f.startTime}),$e(_,function(f){return f.endTime})]).rangeRound([0,nt-r.leftPadding-r.rightPadding]);function M(f,T){const v=f.startTime,p=T.startTime;let a=0;return v>p?a=1:v<p&&(a=-1),a}l(M,"taskCompare"),_.sort(M),V(_,nt,N),Ce(P,N,nt,r.useMaxWidth),P.append("text").text(n.db.getDiagramTitle()).attr("x",nt/2).attr("y",r.titleTopMargin).attr("class","titleText");function V(f,T,v){const p=r.barHeight,a=p+r.barGap,d=r.topPadding,m=r.leftPadding,u=Ae().domain([0,w.length]).range(["#00B9FA","#F95002"]).interpolate(Fe);B(a,d,m,T,v,f,n.db.getExcludes(),n.db.getIncludes()),I(m,d,T,v),O(f,a,d,m,p,u,T),x(a,d),h(m,d,T,v)}l(V,"makeGantt");function O(f,T,v,p,a,d,m){f.sort((c,$)=>c.vert===$.vert?0:c.vert?1:-1);const u=f.filter(c=>!c.vert),i=[...new Set(u.map(c=>c.order))].map(c=>u.find($=>$.order===c));P.append("g").selectAll("rect").data(i).enter().append("rect").attr("x",0).attr("y",function(c,$){return $=c.order,$*T+v-2}).attr("width",function(){return m-r.rightPadding/2}).attr("height",T).attr("class",function(c){for(const[$,A]of w.entries())if(c.type===A)return"section section"+$%r.numberSectionStyles;return"section section0"}).enter();const Y=P.append("g").selectAll("rect").data(f).enter(),o=n.db.getLinks();if(Y.append("rect").attr("id",function(c){return e+"-"+c.id}).attr("rx",3).attr("ry",3).attr("x",function(c){return c.milestone?k(c.startTime)+p+.5*(k(c.endTime)-k(c.startTime))-.5*a:k(c.startTime)+p}).attr("y",function(c,$){return $=c.order,c.vert?r.gridLineStartPadding:$*T+v}).attr("width",function(c){return c.milestone?a:c.vert?.08*a:k(c.renderEndTime||c.endTime)-k(c.startTime)}).attr("height",function(c){return c.vert?u.length*(r.barHeight+r.barGap)+r.barHeight*2:a}).attr("transform-origin",function(c,$){return $=c.order,(k(c.startTime)+p+.5*(k(c.endTime)-k(c.startTime))).toString()+"px "+($*T+v+.5*a).toString()+"px"}).attr("class",function(c){const $="task";let A="";c.classes.length>0&&(A=c.classes.join(" "));let R=0;for(const[G,z]of w.entries())c.type===z&&(R=G%r.numberSectionStyles);let F="";return c.active?c.crit?F+=" activeCrit":F=" active":c.done?c.crit?F=" doneCrit":F=" done":c.crit&&(F+=" crit"),F.length===0&&(F=" task"),c.milestone&&(F=" milestone "+F),c.vert&&(F=" vert "+F),F+=R,F+=" "+A,$+F}),Y.append("text").attr("id",function(c){return e+"-"+c.id+"-text"}).text(function(c){return c.task}).attr("font-size",r.fontSize).attr("x",function(c){let $=k(c.startTime),A=k(c.renderEndTime||c.endTime);if(c.milestone&&($+=.5*(k(c.endTime)-k(c.startTime))-.5*a,A=$+a),c.vert)return k(c.startTime)+p;const R=this.getBBox().width;return R>A-$?A+R+1.5*r.leftPadding>m?$+p-5:A+p+5:(A-$)/2+$+p}).attr("y",function(c,$){return c.vert?r.gridLineStartPadding+u.length*(r.barHeight+r.barGap)+60:($=c.order,$*T+r.barHeight/2+(r.fontSize/2-2)+v)}).attr("text-height",a).attr("class",function(c){const $=k(c.startTime);let A=k(c.endTime);c.milestone&&(A=$+a);const R=this.getBBox().width;let F="";c.classes.length>0&&(F=c.classes.join(" "));let G=0;for(const[it,at]of w.entries())c.type===at&&(G=it%r.numberSectionStyles);let z="";return c.active&&(c.crit?z="activeCritText"+G:z="activeText"+G),c.done?c.crit?z=z+" doneCritText"+G:z=z+" doneText"+G:c.crit&&(z=z+" critText"+G),c.milestone&&(z+=" milestoneText"),c.vert&&(z+=" vertText"),R>A-$?A+R+1.5*r.leftPadding>m?F+" taskTextOutsideLeft taskTextOutside"+G+" "+z:F+" taskTextOutsideRight taskTextOutside"+G+" "+z+" width-"+R:F+" taskText taskText"+G+" "+z+" width-"+R}),dt().securityLevel==="sandbox"){let c;c=vt("#i"+e);const $=c.nodes()[0].contentDocument;Y.filter(function(A){return o.has(A.id)}).each(function(A){var R=$.querySelector("#"+CSS.escape(e+"-"+A.id)),F=$.querySelector("#"+CSS.escape(e+"-"+A.id+"-text"));const G=R.parentNode;var z=$.createElement("a");z.setAttribute("xlink:href",o.get(A.id)),z.setAttribute("target","_top"),G.appendChild(z),z.appendChild(R),z.appendChild(F)})}}l(O,"drawRects");function B(f,T,v,p,a,d,m,u){if(m.length===0&&u.length===0)return;let C,i;for(const{startTime:A,endTime:R}of d)(C===void 0||A<C)&&(C=A),(i===void 0||R>i)&&(i=R);if(!C||!i)return;if(q(i).diff(q(C),"year")>5){st.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}const Y=n.db.getDateFormat(),o=[];let j=null,c=q(C);for(;c.valueOf()<=i;)n.db.isInvalidDate(c,Y,m,u)?j?j.end=c:j={start:c,end:c}:j&&(o.push(j),j=null),c=c.add(1,"d");P.append("g").selectAll("rect").data(o).enter().append("rect").attr("id",A=>e+"-exclude-"+A.start.format("YYYY-MM-DD")).attr("x",A=>k(A.start.startOf("day"))+v).attr("y",r.gridLineStartPadding).attr("width",A=>k(A.end.endOf("day"))-k(A.start.startOf("day"))).attr("height",a-T-r.gridLineStartPadding).attr("transform-origin",function(A,R){return(k(A.start)+v+.5*(k(A.end)-k(A.start))).toString()+"px "+(R*f+.5*a).toString()+"px"}).attr("class","exclude-range")}l(B,"drawExcludeDays");function H(f,T,v,p){if(v<=0||f>T)return 1/0;const a=T-f,d=q.duration({[p??"day"]:v}).asMilliseconds();return d<=0?1/0:Math.ceil(a/d)}l(H,"getEstimatedTickCount");function I(f,T,v,p){const a=n.db.getDateFormat(),d=n.db.getAxisFormat();let m;d?m=d:a==="D"?m="%d":m=r.axisFormat??"%Y-%m-%d";let u=qe(k).tickSize(-p+T+r.gridLineStartPadding).tickFormat(Xt(m));const i=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(n.db.getTickInterval()||r.tickInterval);if(i!==null){const Y=parseInt(i[1],10);if(isNaN(Y)||Y<=0)st.warn(`Invalid tick interval value: "${i[1]}". Skipping custom tick interval.`);else{const o=i[2],j=n.db.getWeekday()||r.weekday,c=k.domain(),$=c[0],A=c[1],R=H($,A,Y,o);if(R>It)st.warn(`The tick interval "${Y}${o}" would generate ${R} ticks, which exceeds the maximum allowed (${It}). This may indicate an invalid date or time range. Skipping custom tick interval.`);else switch(o){case"millisecond":u.ticks(Jt.every(Y));break;case"second":u.ticks(Kt.every(Y));break;case"minute":u.ticks(Qt.every(Y));break;case"hour":u.ticks(Zt.every(Y));break;case"day":u.ticks(qt.every(Y));break;case"week":u.ticks(se[j].every(Y));break;case"month":u.ticks(Ut.every(Y));break}}}if(P.append("g").attr("class","grid").attr("transform","translate("+f+", "+(p-50)+")").call(u).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),n.db.topAxisEnabled()||r.topAxis){let Y=Ue(k).tickSize(-p+T+r.gridLineStartPadding).tickFormat(Xt(m));if(i!==null){const o=parseInt(i[1],10);if(isNaN(o)||o<=0)st.warn(`Invalid tick interval value: "${i[1]}". Skipping custom tick interval.`);else{const j=i[2],c=n.db.getWeekday()||r.weekday,$=k.domain(),A=$[0],R=$[1];if(H(A,R,o,j)<=It)switch(j){case"millisecond":Y.ticks(Jt.every(o));break;case"second":Y.ticks(Kt.every(o));break;case"minute":Y.ticks(Qt.every(o));break;case"hour":Y.ticks(Zt.every(o));break;case"day":Y.ticks(qt.every(o));break;case"week":Y.ticks(se[c].every(o));break;case"month":Y.ticks(Ut.every(o));break}}}P.append("g").attr("class","grid").attr("transform","translate("+f+", "+T+")").call(Y).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}l(I,"makeGrid");function x(f,T){let v=0;const p=Object.keys(D).map(a=>[a,D[a]]);P.append("g").selectAll("text").data(p).enter().append(function(a){const d=a[0].split(Me.lineBreakRegex),m=-(d.length-1)/2,u=S.createElementNS("http://www.w3.org/2000/svg","text");u.setAttribute("dy",m+"em");for(const[C,i]of d.entries()){const Y=S.createElementNS("http://www.w3.org/2000/svg","tspan");Y.setAttribute("alignment-baseline","central"),Y.setAttribute("x","10"),C>0&&Y.setAttribute("dy","1em"),Y.textContent=i,u.appendChild(Y)}return u}).attr("x",10).attr("y",function(a,d){if(d>0)for(let m=0;m<d;m++)return v+=p[d-1][1],a[1]*f/2+v*f+T;else return a[1]*f/2+T}).attr("font-size",r.sectionFontSize).attr("class",function(a){for(const[d,m]of w.entries())if(a[0]===m)return"sectionTitle sectionTitle"+d%r.numberSectionStyles;return"sectionTitle"})}l(x,"vertLabels");function h(f,T,v,p){const a=n.db.getTodayMarker();if(a==="off")return;const d=P.append("g").attr("class","today"),m=new Date,u=d.append("line");u.attr("x1",k(m)+f).attr("x2",k(m)+f).attr("y1",r.titleTopMargin).attr("y2",p-r.titleTopMargin).attr("class","today"),a!==""&&u.attr("style",a.replace(/,/g,";"))}l(h,"drawToday");function E(f){const T={},v=[];for(let p=0,a=f.length;p<a;++p)Object.prototype.hasOwnProperty.call(T,f[p])||(T[f[p]]=!0,v.push(f[p]));return v}l(E,"checkUnique")},"draw"),jn={setConf:Hn,draw:Gn},Xn=l(t=>`
  .mermaid-main-font {
        font-family: ${t.fontFamily};
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${t.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  /* Done task text displayed outside the bar sits against the diagram background,
     not against the done-task bar, so it must use the outside/contrast color. */
  .doneText0.taskTextOutsideLeft,
  .doneText0.taskTextOutsideRight,
  .doneText1.taskTextOutsideLeft,
  .doneText1.taskTextOutsideRight,
  .doneText2.taskTextOutsideLeft,
  .doneText2.taskTextOutsideRight,
  .doneText3.taskTextOutsideLeft,
  .doneText3.taskTextOutsideRight {
    fill: ${t.taskTextOutsideColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  /* Done-crit task text outside the bar — same reasoning as doneText above. */
  .doneCritText0.taskTextOutsideLeft,
  .doneCritText0.taskTextOutsideRight,
  .doneCritText1.taskTextOutsideLeft,
  .doneCritText1.taskTextOutsideRight,
  .doneCritText2.taskTextOutsideLeft,
  .doneCritText2.taskTextOutsideRight,
  .doneCritText3.taskTextOutsideLeft,
  .doneCritText3.taskTextOutsideRight {
    fill: ${t.taskTextOutsideColor} !important;
  }

  .vert {
    stroke: ${t.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${t.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: ${t.fontFamily};
  }
`,"getStyles"),Un=Xn,Jn={parser:rn,db:Nn,renderer:jn,styles:Un};export{Jn as diagram};
