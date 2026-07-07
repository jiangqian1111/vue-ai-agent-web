import{r as C,a0 as pt,a1 as O,a2 as i,a3 as I,a4 as le,a5 as Ie,a6 as mt,a7 as gt,n as X,a8 as Ue,a9 as ue,aa as bt,ab as xt,o as S,ac as yt,ad as wt,R as Me,H as be,ae as kt,af as ye,ag as _t,ah as we,A as $,ai as $t,aj as St,ak as Ct,al as zt,am as Pe,an as re,ao as de,ap as De,aq as Rt,ar as Tt,as as Vt,at as It,au as Mt,av as Dt,J as Bt,aw as Nt,C as At,D as Ee,u as H,v as Q,w as s,z as h,E as p,y as l,W as ce,G as k,Z as N,$ as A,x as Ut,B as L,ax as Pt,S as Et,T as jt,ay as Ft,t as Y,az as Ht,Q as je,p as Ot,K as ke,F as _e,aA as Lt,aB as Kt,aC as xe,aD as Wt,aE as Gt}from"./index-a65b6cba.js";function Be(n){return window.TouchEvent&&n instanceof window.TouchEvent}function Ne(){const n=C(new Map),o=f=>r=>{n.value.set(f,r)};return pt(()=>n.value.clear()),[n,o]}const Yt=O([i("slider",`
 display: block;
 padding: calc((var(--n-handle-size) - var(--n-rail-height)) / 2) 0;
 position: relative;
 z-index: 0;
 width: 100%;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 `,[I("reverse",[i("slider-handles",[i("slider-handle-wrapper",`
 transform: translate(50%, -50%);
 `)]),i("slider-dots",[i("slider-dot",`
 transform: translateX(50%, -50%);
 `)]),I("vertical",[i("slider-handles",[i("slider-handle-wrapper",`
 transform: translate(-50%, -50%);
 `)]),i("slider-marks",[i("slider-mark",`
 transform: translateY(calc(-50% + var(--n-dot-height) / 2));
 `)]),i("slider-dots",[i("slider-dot",`
 transform: translateX(-50%) translateY(0);
 `)])])]),I("vertical",`
 padding: 0 calc((var(--n-handle-size) - var(--n-rail-height)) / 2);
 width: var(--n-rail-width-vertical);
 height: 100%;
 `,[i("slider-handles",`
 top: calc(var(--n-handle-size) / 2);
 right: 0;
 bottom: calc(var(--n-handle-size) / 2);
 left: 0;
 `,[i("slider-handle-wrapper",`
 top: unset;
 left: 50%;
 transform: translate(-50%, 50%);
 `)]),i("slider-rail",`
 height: 100%;
 `,[le("fill",`
 top: unset;
 right: 0;
 bottom: unset;
 left: 0;
 `)]),I("with-mark",`
 width: var(--n-rail-width-vertical);
 margin: 0 32px 0 8px;
 `),i("slider-marks",`
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 22px;
 font-size: var(--n-mark-font-size);
 `,[i("slider-mark",`
 transform: translateY(50%);
 white-space: nowrap;
 `)]),i("slider-dots",`
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 50%;
 `,[i("slider-dot",`
 transform: translateX(-50%) translateY(50%);
 `)])]),I("disabled",`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `,[i("slider-handle",`
 cursor: not-allowed;
 `)]),I("with-mark",`
 width: 100%;
 margin: 8px 0 32px 0;
 `),O("&:hover",[i("slider-rail",{backgroundColor:"var(--n-rail-color-hover)"},[le("fill",{backgroundColor:"var(--n-fill-color-hover)"})]),i("slider-handle",{boxShadow:"var(--n-handle-box-shadow-hover)"})]),I("active",[i("slider-rail",{backgroundColor:"var(--n-rail-color-hover)"},[le("fill",{backgroundColor:"var(--n-fill-color-hover)"})]),i("slider-handle",{boxShadow:"var(--n-handle-box-shadow-hover)"})]),i("slider-marks",`
 position: absolute;
 top: 18px;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `,[i("slider-mark",`
 position: absolute;
 transform: translateX(-50%);
 white-space: nowrap;
 `)]),i("slider-rail",`
 width: 100%;
 position: relative;
 height: var(--n-rail-height);
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 border-radius: calc(var(--n-rail-height) / 2);
 `,[le("fill",`
 position: absolute;
 top: 0;
 bottom: 0;
 border-radius: calc(var(--n-rail-height) / 2);
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-fill-color);
 `)]),i("slider-handles",`
 position: absolute;
 top: 0;
 right: calc(var(--n-handle-size) / 2);
 bottom: 0;
 left: calc(var(--n-handle-size) / 2);
 `,[i("slider-handle-wrapper",`
 outline: none;
 position: absolute;
 top: 50%;
 transform: translate(-50%, -50%);
 cursor: pointer;
 display: flex;
 `,[i("slider-handle",`
 height: var(--n-handle-size);
 width: var(--n-handle-size);
 border-radius: 50%;
 overflow: hidden;
 transition: box-shadow .2s var(--n-bezier), background-color .3s var(--n-bezier);
 background-color: var(--n-handle-color);
 box-shadow: var(--n-handle-box-shadow);
 `,[O("&:hover",`
 box-shadow: var(--n-handle-box-shadow-hover);
 `)]),O("&:focus",[i("slider-handle",`
 box-shadow: var(--n-handle-box-shadow-focus);
 `,[O("&:hover",`
 box-shadow: var(--n-handle-box-shadow-active);
 `)])])])]),i("slider-dots",`
 position: absolute;
 top: 50%;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `,[I("transition-disabled",[i("slider-dot","transition: none;")]),i("slider-dot",`
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 transform: translate(-50%, -50%);
 height: var(--n-dot-height);
 width: var(--n-dot-width);
 border-radius: var(--n-dot-border-radius);
 overflow: hidden;
 box-sizing: border-box;
 border: var(--n-dot-border);
 background-color: var(--n-dot-color);
 `,[I("active","border: var(--n-dot-border-active);")])])]),i("slider-handle-indicator",`
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `,[Ie()]),i("slider-handle-indicator",`
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `,[I("top",`
 margin-bottom: 12px;
 `),I("right",`
 margin-left: 12px;
 `),I("bottom",`
 margin-top: 12px;
 `),I("left",`
 margin-right: 12px;
 `),Ie()]),mt(i("slider",[i("slider-dot","background-color: var(--n-dot-color-modal);")])),gt(i("slider",[i("slider-dot","background-color: var(--n-dot-color-popover);")]))]),Xt=0,Jt=Object.assign(Object.assign({},ue.props),{to:we.propTo,defaultValue:{type:[Number,Array],default:0},marks:Object,disabled:{type:Boolean,default:void 0},formatTooltip:Function,keyboard:{type:Boolean,default:!0},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:[Number,String],default:1},range:Boolean,value:[Number,Array],placement:String,showTooltip:{type:Boolean,default:void 0},tooltip:{type:Boolean,default:!0},vertical:Boolean,reverse:Boolean,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),Ae=X({name:"Slider",props:Jt,setup(n){const{mergedClsPrefixRef:o,namespaceRef:f,inlineThemeDisabled:r}=Ue(n),v=ue("Slider","-slider",Yt,bt,n,o),c=C(null),[d,x]=Ne(),[y,b]=Ne(),z=C(new Set),P=xt(n),{mergedDisabledRef:j}=P,K=S(()=>{const{step:e}=n;if(e<=0||e==="mark")return 0;const t=e.toString();let a=0;return t.includes(".")&&(a=t.length-t.indexOf(".")-1),a}),J=C(n.defaultValue),he=yt(n,"value"),q=wt(he,J),M=S(()=>{const{value:e}=q;return(n.range?e:[e]).map(ze)}),Z=S(()=>M.value.length>2),g=S(()=>n.placement===void 0?n.vertical?"right":"top":n.placement),_=S(()=>{const{marks:e}=n;return e?Object.keys(e).map(parseFloat):null}),m=C(-1),E=C(-1),B=C(-1),D=C(!1),ee=C(!1),ve=S(()=>{const{vertical:e,reverse:t}=n;return e?t?"top":"bottom":t?"right":"left"}),Fe=S(()=>{if(Z.value)return;const e=M.value,t=te(n.range?Math.min(...e):n.min),a=te(n.range?Math.max(...e):e[0]),{value:u}=ve;return n.vertical?{[u]:`${t}%`,height:`${a-t}%`}:{[u]:`${t}%`,width:`${a-t}%`}}),He=S(()=>{const e=[],{marks:t}=n;if(t){const a=M.value.slice();a.sort((T,V)=>T-V);const{value:u}=ve,{value:w}=Z,{range:R}=n,U=w?()=>!1:T=>R?T>=a[0]&&T<=a[a.length-1]:T<=a[0];for(const T of Object.keys(t)){const V=Number(T);e.push({active:U(V),label:t[T],style:{[u]:`${te(V)}%`}})}}return e});function Oe(e,t){const a=te(e),{value:u}=ve;return{[u]:`${a}%`,zIndex:t===m.value?1:0}}function $e(e){return n.showTooltip||B.value===e||m.value===e&&D.value}function Le(e){return D.value?!(m.value===e&&E.value===e):!0}function Ke(e){var t;~e&&(m.value=e,(t=d.value.get(e))===null||t===void 0||t.focus())}function We(){y.value.forEach((e,t)=>{$e(t)&&e.syncPosition()})}function Se(e){const{"onUpdate:value":t,onUpdateValue:a}=n,{nTriggerFormInput:u,nTriggerFormChange:w}=P;a&&De(a,e),t&&De(t,e),J.value=e,u(),w()}function Ce(e){const{range:t}=n;if(t){if(Array.isArray(e)){const{value:a}=M;e.join()!==a.join()&&Se(e)}}else Array.isArray(e)||M.value[0]!==e&&Se(e)}function fe(e,t){if(n.range){const a=M.value.slice();a.splice(t,1,e),Ce(a)}else Ce(e)}function pe(e,t,a){const u=a!==void 0;a||(a=e-t>0?1:-1);const w=_.value||[],{step:R}=n;if(R==="mark"){const V=ne(e,w.concat(t),u?a:void 0);return V?V.value:t}if(R<=0)return t;const{value:U}=K;let T;if(u){const V=Number((t/R).toFixed(U)),F=Math.floor(V),me=V>F?F:F-1,ge=V<F?F:F+1;T=ne(t,[Number((me*R).toFixed(U)),Number((ge*R).toFixed(U)),...w],a)}else{const V=Ye(e);T=ne(e,[...w,V])}return T?ze(T.value):t}function ze(e){return Math.min(n.max,Math.max(n.min,e))}function te(e){const{max:t,min:a}=n;return(e-a)/(t-a)*100}function Ge(e){const{max:t,min:a}=n;return a+(t-a)*e}function Ye(e){const{step:t,min:a}=n;if(t<=0||t==="mark")return e;const u=Math.round((e-a)/t)*t+a;return Number(u.toFixed(K.value))}function ne(e,t=_.value,a){if(!(t!=null&&t.length))return null;let u=null,w=-1;for(;++w<t.length;){const R=t[w]-e,U=Math.abs(R);(a===void 0||R*a>0)&&(u===null||U<u.distance)&&(u={index:w,distance:U,value:t[w]})}return u}function Re(e){const t=c.value;if(!t)return;const a=Be(e)?e.touches[0]:e,u=t.getBoundingClientRect();let w;return n.vertical?w=(u.bottom-a.clientY)/u.height:w=(a.clientX-u.left)/u.width,n.reverse&&(w=1-w),Ge(w)}function Xe(e){if(j.value||!n.keyboard)return;const{vertical:t,reverse:a}=n;switch(e.key){case"ArrowUp":e.preventDefault(),se(t&&a?-1:1);break;case"ArrowRight":e.preventDefault(),se(!t&&a?-1:1);break;case"ArrowDown":e.preventDefault(),se(t&&a?1:-1);break;case"ArrowLeft":e.preventDefault(),se(!t&&a?1:-1);break}}function se(e){const t=m.value;if(t===-1)return;const{step:a}=n,u=M.value[t],w=a<=0||a==="mark"?u:u+a*e;fe(pe(w,u,e>0?1:-1),t)}function Je(e){var t,a;if(j.value||!Be(e)&&e.button!==Xt)return;const u=Re(e);if(u===void 0)return;const w=M.value.slice(),R=n.range?(a=(t=ne(u,w))===null||t===void 0?void 0:t.index)!==null&&a!==void 0?a:-1:0;R!==-1&&(e.preventDefault(),Ke(R),qe(),fe(pe(u,M.value[R]),R))}function qe(){D.value||(D.value=!0,re("touchend",document,ie),re("mouseup",document,ie),re("touchmove",document,oe),re("mousemove",document,oe))}function ae(){D.value&&(D.value=!1,de("touchend",document,ie),de("mouseup",document,ie),de("touchmove",document,oe),de("mousemove",document,oe))}function oe(e){const{value:t}=m;if(!D.value||t===-1){ae();return}const a=Re(e);fe(pe(a,M.value[t]),t)}function ie(){ae()}function Qe(e){m.value=e,j.value||(B.value=e)}function Ze(e){m.value===e&&(m.value=-1,ae()),B.value===e&&(B.value=-1)}function et(e){B.value=e}function tt(e){B.value===e&&(B.value=-1)}Me(m,(e,t)=>void be(()=>E.value=t)),Me(q,()=>{if(n.marks){if(ee.value)return;ee.value=!0,be(()=>{ee.value=!1})}be(We)}),kt(()=>{ae()});const Te=S(()=>{const{self:{markFontSize:e,railColor:t,railColorHover:a,fillColor:u,fillColorHover:w,handleColor:R,opacityDisabled:U,dotColor:T,dotColorModal:V,handleBoxShadow:F,handleBoxShadowHover:me,handleBoxShadowActive:ge,handleBoxShadowFocus:nt,dotBorder:st,dotBoxShadow:at,railHeight:ot,railWidthVertical:it,handleSize:lt,dotHeight:rt,dotWidth:dt,dotBorderRadius:ct,fontSize:ut,dotBorderActive:ht,dotColorPopover:vt},common:{cubicBezierEaseInOut:ft}}=v.value;return{"--n-bezier":ft,"--n-dot-border":st,"--n-dot-border-active":ht,"--n-dot-border-radius":ct,"--n-dot-box-shadow":at,"--n-dot-color":T,"--n-dot-color-modal":V,"--n-dot-color-popover":vt,"--n-dot-height":rt,"--n-dot-width":dt,"--n-fill-color":u,"--n-fill-color-hover":w,"--n-font-size":ut,"--n-handle-box-shadow":F,"--n-handle-box-shadow-active":ge,"--n-handle-box-shadow-focus":nt,"--n-handle-box-shadow-hover":me,"--n-handle-color":R,"--n-handle-size":lt,"--n-opacity-disabled":U,"--n-rail-color":t,"--n-rail-color-hover":a,"--n-rail-height":ot,"--n-rail-width-vertical":it,"--n-mark-font-size":e}}),W=r?ye("slider",void 0,Te,n):void 0,Ve=S(()=>{const{self:{fontSize:e,indicatorColor:t,indicatorBoxShadow:a,indicatorTextColor:u,indicatorBorderRadius:w}}=v.value;return{"--n-font-size":e,"--n-indicator-border-radius":w,"--n-indicator-box-shadow":a,"--n-indicator-color":t,"--n-indicator-text-color":u}}),G=r?ye("slider-indicator",void 0,Ve,n):void 0;return{mergedClsPrefix:o,namespace:f,uncontrolledValue:J,mergedValue:q,mergedDisabled:j,mergedPlacement:g,isMounted:_t(),adjustedTo:we(n),dotTransitionDisabled:ee,markInfos:He,isShowTooltip:$e,shouldKeepTooltipTransition:Le,handleRailRef:c,setHandleRefs:x,setFollowerRefs:b,fillStyle:Fe,getHandleStyle:Oe,activeIndex:m,arrifiedValues:M,followerEnabledIndexSet:z,handleRailMouseDown:Je,handleHandleFocus:Qe,handleHandleBlur:Ze,handleHandleMouseEnter:et,handleHandleMouseLeave:tt,handleRailKeyDown:Xe,indicatorCssVars:r?void 0:Ve,indicatorThemeClass:G==null?void 0:G.themeClass,indicatorOnRender:G==null?void 0:G.onRender,cssVars:r?void 0:Te,themeClass:W==null?void 0:W.themeClass,onRender:W==null?void 0:W.onRender}},render(){var n;const{mergedClsPrefix:o,themeClass:f,formatTooltip:r}=this;return(n=this.onRender)===null||n===void 0||n.call(this),$("div",{class:[`${o}-slider`,f,{[`${o}-slider--disabled`]:this.mergedDisabled,[`${o}-slider--active`]:this.activeIndex!==-1,[`${o}-slider--with-mark`]:this.marks,[`${o}-slider--vertical`]:this.vertical,[`${o}-slider--reverse`]:this.reverse}],style:this.cssVars,onKeydown:this.handleRailKeyDown,onMousedown:this.handleRailMouseDown,onTouchstart:this.handleRailMouseDown},$("div",{class:`${o}-slider-rail`},$("div",{class:`${o}-slider-rail__fill`,style:this.fillStyle}),this.marks?$("div",{class:[`${o}-slider-dots`,this.dotTransitionDisabled&&`${o}-slider-dots--transition-disabled`]},this.markInfos.map(v=>$("div",{key:v.label,class:[`${o}-slider-dot`,{[`${o}-slider-dot--active`]:v.active}],style:v.style}))):null,$("div",{ref:"handleRailRef",class:`${o}-slider-handles`},this.arrifiedValues.map((v,c)=>{const d=this.isShowTooltip(c);return $($t,null,{default:()=>[$(St,null,{default:()=>$("div",{ref:this.setHandleRefs(c),class:`${o}-slider-handle-wrapper`,tabindex:this.mergedDisabled?-1:0,style:this.getHandleStyle(v,c),onFocus:()=>this.handleHandleFocus(c),onBlur:()=>this.handleHandleBlur(c),onMouseenter:()=>this.handleHandleMouseEnter(c),onMouseleave:()=>this.handleHandleMouseLeave(c)},Ct(this.$slots.thumb,()=>[$("div",{class:`${o}-slider-handle`})]))}),this.tooltip&&$(zt,{ref:this.setFollowerRefs(c),show:d,to:this.adjustedTo,enabled:this.showTooltip&&!this.range||this.followerEnabledIndexSet.has(c),teleportDisabled:this.adjustedTo===we.tdkey,placement:this.mergedPlacement,containerClass:this.namespace},{default:()=>$(Pe,{name:"fade-in-scale-up-transition",appear:this.isMounted,css:this.shouldKeepTooltipTransition(c),onEnter:()=>{this.followerEnabledIndexSet.add(c)},onAfterLeave:()=>{this.followerEnabledIndexSet.delete(c)}},{default:()=>{var x;return d?((x=this.indicatorOnRender)===null||x===void 0||x.call(this),$("div",{class:[`${o}-slider-handle-indicator`,this.indicatorThemeClass,`${o}-slider-handle-indicator--${this.mergedPlacement}`],style:this.indicatorCssVars},typeof r=="function"?r(v):v)):null}})})]})})),this.marks?$("div",{class:`${o}-slider-marks`},this.markInfos.map(v=>$("div",{key:v.label,class:`${o}-slider-mark`,style:v.style},v.label))):null))}}),qt=O([O("@keyframes spin-rotate",`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),i("spin-container",{position:"relative"},[i("spin-body",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[Rt()])]),i("spin-body",`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),i("spin",`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[I("rotate",`
 animation: spin-rotate 2s linear infinite;
 `)]),i("spin-description",`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),i("spin-content",`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[I("spinning",`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Qt={small:20,medium:18,large:16},Zt=Object.assign(Object.assign({},ue.props),{description:String,stroke:String,size:{type:[String,Number],default:"medium"},show:{type:Boolean,default:!0},strokeWidth:Number,rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0}}),en=X({name:"Spin",props:Zt,setup(n){const{mergedClsPrefixRef:o,inlineThemeDisabled:f}=Ue(n),r=ue("Spin","-spin",qt,Tt,n,o),v=S(()=>{const{size:d}=n,{common:{cubicBezierEaseInOut:x},self:y}=r.value,{opacitySpinning:b,color:z,textColor:P}=y,j=typeof d=="number"?Vt(d):y[It("size",d)];return{"--n-bezier":x,"--n-opacity-spinning":b,"--n-size":j,"--n-color":z,"--n-text-color":P}}),c=f?ye("spin",S(()=>{const{size:d}=n;return typeof d=="number"?String(d):d[0]}),v,n):void 0;return{mergedClsPrefix:o,compitableShow:Mt(n,["spinning","show"]),mergedStrokeWidth:S(()=>{const{strokeWidth:d}=n;if(d!==void 0)return d;const{size:x}=n;return Qt[typeof x=="number"?"medium":x]}),cssVars:f?void 0:v,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender}},render(){var n,o;const{$slots:f,mergedClsPrefix:r,description:v}=this,c=f.icon&&this.rotate,d=(v||f.description)&&$("div",{class:`${r}-spin-description`},v||((n=f.description)===null||n===void 0?void 0:n.call(f))),x=f.icon?$("div",{class:[`${r}-spin-body`,this.themeClass]},$("div",{class:[`${r}-spin`,c&&`${r}-spin--rotate`],style:f.default?"":this.cssVars},f.icon()),d):$("div",{class:[`${r}-spin-body`,this.themeClass]},$(Dt,{clsPrefix:r,style:f.default?"":this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,class:`${r}-spin`}),d);return(o=this.onRender)===null||o===void 0||o.call(this),f.default?$("div",{class:[`${r}-spin-container`,this.themeClass],style:this.cssVars},$("div",{class:[`${r}-spin-content`,this.compitableShow&&`${r}-spin-content--spinning`]},f),$(Pe,{name:"fade-in-transition"},{default:()=>this.compitableShow?x:null})):x}});function tn(){const n=new Date,o=n.getDate(),f=n.getMonth()+1;return`${n.getFullYear()}-${f}-${o}`}const nn={class:"p-4 space-y-5 min-h-[200px]"},sn={class:"space-y-6"},an={class:"flex items-center space-x-4"},on={class:"flex-shrink-0 w-[100px]"},ln={class:"flex-1"},rn={class:"flex items-center space-x-4"},dn={class:"flex-shrink-0 w-[100px]"},cn={class:"w-[200px]"},un={class:"flex items-center space-x-4"},hn={class:"flex-shrink-0 w-[100px]"},vn={class:"flex-1"},fn={class:"flex-shrink-0 w-[100px]"},pn={class:"flex flex-wrap items-center gap-4"},mn={class:"flex items-center space-x-4"},gn={class:"flex-shrink-0 w-[100px]"},bn={class:"flex flex-wrap items-center gap-4"},xn={class:"flex items-center space-x-4"},yn={class:"flex-shrink-0 w-[100px]"},wn={class:"flex flex-wrap items-center gap-4"},kn={class:"flex items-center space-x-4"},_n={class:"flex-shrink-0 w-[100px]"},$n=X({__name:"General",setup(n){const o=Bt(),f=Nt(),{isMobile:r}=At(),v=Ee(),c=S(()=>o.theme),d=S(()=>f.userInfo),x=C(d.value.avatar??""),y=C(d.value.name??""),b=C(d.value.description??""),z=S({get(){return o.language},set(g){o.setLanguage(g)}}),P=[{label:"Auto",key:"auto",icon:"ri:contrast-line"},{label:"Light",key:"light",icon:"ri:sun-foggy-line"},{label:"Dark",key:"dark",icon:"ri:moon-foggy-line"}],j=[{label:"English",key:"en-US",value:"en-US"},{label:"Español",key:"es-ES",value:"es-ES"},{label:"한국어",key:"ko-KR",value:"ko-KR"},{label:"Русский язык",key:"ru-RU",value:"ru-RU"},{label:"Tiếng Việt",key:"vi-VN",value:"vi-VN"},{label:"简体中文",key:"zh-CN",value:"zh-CN"},{label:"繁體中文",key:"zh-TW",value:"zh-TW"}];function K(g){f.updateUserInfo(g),v.success(Y("common.success"))}function J(){f.resetUserInfo(),v.success(Y("common.success")),window.location.reload()}function he(){const g=tn(),_=localStorage.getItem("chatStorage")||"{}",m=JSON.stringify(JSON.parse(_),null,2),E=new Blob([m],{type:"application/json"}),B=URL.createObjectURL(E),D=document.createElement("a");D.href=B,D.download=`chat-store_${g}.json`,document.body.appendChild(D),D.click(),document.body.removeChild(D)}function q(g){const _=g.target;if(!_||!_.files)return;const m=_.files[0];if(!m)return;const E=new FileReader;E.onload=()=>{try{const B=JSON.parse(E.result);localStorage.setItem("chatStorage",JSON.stringify(B)),v.success(Y("common.success")),location.reload()}catch{v.error(Y("common.invalidFileFormat"))}},E.readAsText(m)}function M(){localStorage.removeItem("chatStorage"),location.reload()}function Z(){const g=document.getElementById("fileInput");g&&g.click()}return(g,_)=>(H(),Q("div",nn,[s("div",sn,[s("div",an,[s("span",on,h(g.$t("setting.avatarLink")),1),s("div",ln,[p(l(ce),{value:x.value,"onUpdate:value":_[0]||(_[0]=m=>x.value=m),placeholder:""},null,8,["value"])]),p(l(A),{size:"tiny",text:"",type:"primary",onClick:_[1]||(_[1]=m=>K({avatar:x.value}))},{default:k(()=>[N(h(g.$t("common.save")),1)]),_:1})]),s("div",rn,[s("span",dn,h(g.$t("setting.name")),1),s("div",cn,[p(l(ce),{value:y.value,"onUpdate:value":_[2]||(_[2]=m=>y.value=m),placeholder:""},null,8,["value"])]),p(l(A),{size:"tiny",text:"",type:"primary",onClick:_[3]||(_[3]=m=>K({name:y.value}))},{default:k(()=>[N(h(g.$t("common.save")),1)]),_:1})]),s("div",un,[s("span",hn,h(g.$t("setting.description")),1),s("div",vn,[p(l(ce),{value:b.value,"onUpdate:value":_[4]||(_[4]=m=>b.value=m),placeholder:""},null,8,["value"])]),p(l(A),{size:"tiny",text:"",type:"primary",onClick:_[5]||(_[5]=m=>K({description:b.value}))},{default:k(()=>[N(h(g.$t("common.save")),1)]),_:1})]),s("div",{class:Ut(["flex items-center space-x-4",l(r)&&"items-start"])},[s("span",fn,h(g.$t("setting.chatHistory")),1),s("div",pn,[p(l(A),{size:"small",onClick:he},{icon:k(()=>[p(l(L),{icon:"ri:download-2-fill"})]),default:k(()=>[N(" "+h(g.$t("common.export")),1)]),_:1}),s("input",{id:"fileInput",type:"file",style:{display:"none"},onChange:q},null,32),p(l(A),{size:"small",onClick:Z},{icon:k(()=>[p(l(L),{icon:"ri:upload-2-fill"})]),default:k(()=>[N(" "+h(g.$t("common.import")),1)]),_:1}),p(l(Pt),{placement:"bottom",onPositiveClick:M},{trigger:k(()=>[p(l(A),{size:"small"},{icon:k(()=>[p(l(L),{icon:"ri:close-circle-line"})]),default:k(()=>[N(" "+h(g.$t("common.clear")),1)]),_:1})]),default:k(()=>[N(" "+h(g.$t("chat.clearHistoryConfirm")),1)]),_:1})])],2),s("div",mn,[s("span",gn,h(g.$t("setting.theme")),1),s("div",bn,[(H(),Q(Et,null,jt(P,m=>p(l(A),{key:m.key,size:"small",type:m.key===l(c)?"primary":void 0,onClick:E=>l(o).setTheme(m.key)},{icon:k(()=>[p(l(L),{icon:m.icon},null,8,["icon"])]),_:2},1032,["type","onClick"])),64))])]),s("div",xn,[s("span",yn,h(g.$t("setting.language")),1),s("div",wn,[p(l(Ft),{style:{width:"140px"},value:l(z),options:j,onUpdateValue:_[6]||(_[6]=m=>l(o).setLanguage(m))},null,8,["value"])])]),s("div",kn,[s("span",_n,h(g.$t("setting.resetUserInfo")),1),p(l(A),{size:"small",onClick:J},{default:k(()=>[N(h(g.$t("common.reset")),1)]),_:1})])])]))}}),Sn={class:"p-4 space-y-5 min-h-[200px]"},Cn={class:"space-y-6"},zn={class:"flex items-center space-x-4"},Rn={class:"flex-shrink-0 w-[120px]"},Tn={class:"flex-1"},Vn={class:"flex items-center space-x-4"},In={class:"flex-shrink-0 w-[120px]"},Mn={class:"flex-1"},Dn={class:"flex items-center space-x-4"},Bn={class:"flex-shrink-0 w-[120px]"},Nn={class:"flex-1"},An={class:"flex items-center space-x-4"},Un=s("span",{class:"flex-shrink-0 w-[120px]"}," ",-1),Pn=X({__name:"Advanced",setup(n){const o=Ht(),f=Ee(),r=C(o.systemMessage??""),v=C(o.temperature??.5),c=C(o.top_p??1);function d(y){o.updateSetting(y),f.success(Y("common.success"))}function x(){o.resetSetting(),f.success(Y("common.success")),window.location.reload()}return(y,b)=>(H(),Q("div",Sn,[s("div",Cn,[s("div",zn,[s("span",Rn,h(y.$t("setting.role")),1),s("div",Tn,[p(l(ce),{value:r.value,"onUpdate:value":b[0]||(b[0]=z=>r.value=z),type:"textarea",autosize:{minRows:1,maxRows:4}},null,8,["value"])]),p(l(A),{size:"tiny",text:"",type:"primary",onClick:b[1]||(b[1]=z=>d({systemMessage:r.value}))},{default:k(()=>[N(h(y.$t("common.save")),1)]),_:1})]),s("div",Vn,[s("span",In,h(y.$t("setting.temperature")),1),s("div",Mn,[p(l(Ae),{value:v.value,"onUpdate:value":b[2]||(b[2]=z=>v.value=z),max:2,min:0,step:.1},null,8,["value","step"])]),s("span",null,h(v.value),1),p(l(A),{size:"tiny",text:"",type:"primary",onClick:b[3]||(b[3]=z=>d({temperature:v.value}))},{default:k(()=>[N(h(y.$t("common.save")),1)]),_:1})]),s("div",Dn,[s("span",Bn,h(y.$t("setting.top_p")),1),s("div",Nn,[p(l(Ae),{value:c.value,"onUpdate:value":b[4]||(b[4]=z=>c.value=z),max:1,min:0,step:.1},null,8,["value","step"])]),s("span",null,h(c.value),1),p(l(A),{size:"tiny",text:"",type:"primary",onClick:b[5]||(b[5]=z=>d({top_p:c.value}))},{default:k(()=>[N(h(y.$t("common.save")),1)]),_:1})]),s("div",An,[Un,p(l(A),{size:"small",onClick:x},{default:k(()=>[N(h(y.$t("common.reset")),1)]),_:1})])])]))}}),En="nova-chat",jn="3.0.0",Fn="A modern AI chat portal — powered by Fetch ReadableStream, Vue 3, and TypeScript",Hn="",On=["chatgpt-web","chatgpt","chatbot","vue"],Ln={dev:"vite",build:"vite build",predeploy:"npm run build",deploy:"gh-pages -d dist",preview:"vite preview","build-only":"vite build","type-check":"vue-tsc --noEmit",lint:"eslint .","lint:fix":"eslint . --fix",bootstrap:"pnpm install && pnpm run common:prepare","common:cleanup":"rimraf node_modules && rimraf pnpm-lock.yaml","common:prepare":"husky install"},Kn={"@vscode/markdown-it-katex":"^1.0.3","@vueuse/core":"^9.13.0",dexie:"^4.4.4","highlight.js":"^11.7.0","html-to-image":"^1.11.11",katex:"^0.16.4","markdown-it":"^13.0.1","mermaid-it-markdown":"^1.0.8","naive-ui":"^2.34.3",pinia:"^2.0.33",vue:"^3.2.47","vue-i18n":"^9.2.2","vue-router":"^4.1.6"},Wn={"@antfu/eslint-config":"^0.35.3","@commitlint/cli":"^17.4.4","@commitlint/config-conventional":"^17.4.4","@iconify/vue":"^4.1.0","@types/crypto-js":"^4.1.1","@types/katex":"^0.16.0","@types/markdown-it":"^12.2.3","@types/markdown-it-link-attributes":"^3.0.1","@types/node":"^18.14.6","@vitejs/plugin-vue":"^4.0.0",autoprefixer:"^10.4.13",axios:"^1.3.4","crypto-js":"^4.1.1",eslint:"^8.35.0","gh-pages":"^6.3.0",husky:"^8.0.3",less:"^4.1.3","lint-staged":"^13.1.2","markdown-it-link-attributes":"^4.0.1","npm-run-all":"^4.1.5",postcss:"^8.4.21",rimraf:"^4.3.0",tailwindcss:"^3.2.7",typescript:"~4.9.5",vite:"^4.2.0","vite-plugin-pwa":"^0.14.4","vue-tsc":"^1.2.0"},Gn={name:En,version:jn,private:!0,description:Fn,author:Hn,keywords:On,scripts:Ln,dependencies:Kn,devDependencies:Wn,"lint-staged":{"*.{ts,tsx,vue}":["pnpm lint:fix"]}},Yn={class:"p-4 space-y-5"},Xn={class:"text-center"},Jn=s("h2",{class:"text-xl font-bold text-neutral-800"}," Nova Chat ",-1),qn={class:"text-sm text-neutral-400 mt-1"},Qn=s("div",{class:"p-3 space-y-2 rounded-xl bg-neutral-50 border border-neutral-100"},[s("p",{class:"text-xs font-semibold text-neutral-400 uppercase tracking-wide"},"Tech Stack"),s("div",{class:"flex flex-wrap gap-1.5"},[s("span",{class:"px-2 py-0.5 text-xs rounded-md bg-white border border-neutral-200 text-neutral-600"},"Vue 3"),s("span",{class:"px-2 py-0.5 text-xs rounded-md bg-white border border-neutral-200 text-neutral-600"},"TypeScript"),s("span",{class:"px-2 py-0.5 text-xs rounded-md bg-white border border-neutral-200 text-neutral-600"},"Vite"),s("span",{class:"px-2 py-0.5 text-xs rounded-md bg-white border border-neutral-200 text-neutral-600"},"Pinia"),s("span",{class:"px-2 py-0.5 text-xs rounded-md bg-white border border-neutral-200 text-neutral-600"},"Tailwind CSS"),s("span",{class:"px-2 py-0.5 text-xs rounded-md bg-white border border-neutral-200 text-neutral-600"},"Naive UI"),s("span",{class:"px-2 py-0.5 text-xs rounded-md bg-white border border-neutral-200 text-neutral-600"},"Dexie.js"),s("span",{class:"px-2 py-0.5 text-xs rounded-md bg-white border border-neutral-200 text-neutral-600"},"Fetch + ReadableStream")])],-1),Zn={class:"space-y-2.5"},es={class:"flex items-center justify-between text-sm"},ts={class:"text-neutral-400"},ns={class:"font-mono text-neutral-600"},ss={key:0,class:"flex items-center justify-between text-sm"},as={class:"text-neutral-400"},os={class:"font-mono text-neutral-600"},is={key:1,class:"flex items-center justify-between text-sm"},ls={class:"text-neutral-400"},rs={class:"font-mono text-neutral-600"},ds={class:"flex items-center justify-between text-sm"},cs={class:"text-neutral-400"},us={class:"font-mono text-neutral-600"},hs=X({__name:"About",setup(n){const o=je(),f=C(!1),r=C(),v=S(()=>!!o.isChatGPTAPI);async function c(){try{f.value=!0;const{data:d}=await Lt();r.value=d}finally{f.value=!1}}return Ot(()=>{c()}),(d,x)=>(H(),ke(l(en),{show:f.value},{default:k(()=>{var y,b,z,P;return[s("div",Yn,[s("div",Xn,[Jn,s("p",qn," v"+h(l(Gn).version)+" · MIT ",1)]),Qn,s("div",Zn,[s("div",es,[s("span",ts,h(d.$t("setting.api")),1),s("span",ns,h(((y=r.value)==null?void 0:y.apiModel)??"-"),1)]),l(v)?(H(),Q("div",ss,[s("span",as,h(d.$t("setting.monthlyUsage")),1),s("span",os,h(((b=r.value)==null?void 0:b.usage)??"-"),1)])):_e("",!0),l(v)?_e("",!0):(H(),Q("div",is,[s("span",ls,h(d.$t("setting.reverseProxy")),1),s("span",rs,h(((z=r.value)==null?void 0:z.reverseProxy)??"-"),1)])),s("div",ds,[s("span",cs,h(d.$t("setting.timeout")),1),s("span",us,h(((P=r.value)==null?void 0:P.timeoutMs)??"-")+"ms",1)])])])]}),_:1},8,["show"]))}}),vs={class:"ml-2"},fs={class:"min-h-[100px]"},ps={class:"ml-2"},ms={class:"min-h-[100px]"},gs={class:"ml-2"},xs=X({__name:"index",props:{visible:{type:Boolean}},emits:["update:visible"],setup(n,{emit:o}){const f=n,r=je(),v=S(()=>!!r.isChatGPTAPI),c=C("General"),d=S({get(){return f.visible},set(x){o("update:visible",x)}});return(x,y)=>(H(),ke(l(Gt),{show:l(d),"onUpdate:show":y[1]||(y[1]=b=>Wt(d)?d.value=b:null),"auto-focus":!1,preset:"card",style:{width:"95%","max-width":"640px"}},{default:k(()=>[s("div",null,[p(l(Kt),{value:c.value,"onUpdate:value":y[0]||(y[0]=b=>c.value=b),type:"line",animated:""},{default:k(()=>[p(l(xe),{name:"General",tab:"General"},{tab:k(()=>[p(l(L),{class:"text-lg",icon:"ri:file-user-line"}),s("span",vs,h(x.$t("setting.general")),1)]),default:k(()=>[s("div",fs,[p($n)])]),_:1}),l(v)?(H(),ke(l(xe),{key:0,name:"Advanced",tab:"Advanced"},{tab:k(()=>[p(l(L),{class:"text-lg",icon:"ri:equalizer-line"}),s("span",ps,h(x.$t("setting.advanced")),1)]),default:k(()=>[s("div",ms,[p(Pn)])]),_:1})):_e("",!0),p(l(xe),{name:"Config",tab:"Config"},{tab:k(()=>[p(l(L),{class:"text-lg",icon:"ri:list-settings-line"}),s("span",gs,h(x.$t("setting.config")),1)]),default:k(()=>[p(hs)]),_:1})]),_:1},8,["value"])])]),_:1},8,["show"]))}});export{xs as default};
