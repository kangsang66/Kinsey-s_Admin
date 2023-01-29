import{f as e,g as a,h as s,i as t,j as o,k as l,l as n,m as i,n as r,c as u,o as c,p as d,q as m,r as f,s as p,e as h}from"./element-plus-203e699c.js";import{M as g}from"./index-b42814fb.js";import{u as v}from"./index-483d466e.js";import{u as _}from"./vue-router-3e87876c.js";import{C as b,r as j,w as k,s as x,o as y,Q as C,R as w,u as H,a as P,T as B,S as R,V as T,M as N,c as I,a5 as L,O as q,au as z,av as A,a7 as E,a1 as M}from"./@vue-44d974e2.js";import{_ as S}from"./_plugin-vue_export-helper-361d09b5.js";import{s as F}from"./screenfull-837d9584.js";import{C as K}from"./@element-plus-d8a2a1e5.js";import"./@vueuse-e4b4bc09.js";import"./dayjs-35bf6e11.js";import"./axios-baa3c49b.js";import"./lodash-es-b74e909d.js";import"./async-validator-d27e01f0.js";import"./@ctrl-a2a2eaea.js";import"./@popperjs-065daa60.js";import"./escape-html-21541a7f.js";import"./normalize-wheel-es-a8f75fb2.js";import"./pinia-3e26750f.js";import"./index-ac2b86c4.js";import"./default-passive-events-dc7439bc.js";import"./mockjs-8cc937cd.js";import"./moment-da921422.js";const O={class:"menu-title"},Q=(e=>(z("data-v-c911f3d1"),e=e(),A(),e))((()=>P("div",{class:"aside-top"},[P("img",{class:"aside-logo",src:"https://www.kangsang666.top/logo.png",alt:""}),P("span",{class:"aside-name"},"Kinsey's Admin")],-1))),V={class:"menu-svg"},D=S(b({__name:"HomeAside",setup(l){const n=_(),i=j(["user","setting","shop","tickets","pie-chart"]),r=j("/Home/Index");k((()=>n.currentRoute.value.fullPath),(()=>{r.value=n.currentRoute.value.fullPath}),{immediate:!0,deep:!0});const u=v().historicRecords,c=e=>{u.add(e)};return x((()=>{(async()=>{const e=await g();v().Permission=e.data})()})),(l,n)=>{const u=t,d=e,m=a,f=s,p=o;return y(),C(p,null,{default:w((()=>[H(v)().Permission[0]?(y(),C(f,{key:0,"background-color":"#001628",class:"el-menu-vertical-demo menu","default-active":r.value,"unique-opened":!0,"text-color":"#ffffffb3",router:""},{default:w((()=>[P("div",O,[Q,H(v)().Permission[0]?(y(),C(d,{key:0,index:"/Home/Index",onClick:n[0]||(n[0]=e=>c(H(v)().Permission[0].authName))},{default:w((()=>[B(u,null,{default:w((()=>[(y(),C(R(i.value[4])))])),_:1}),P("span",null,T(H(v)().Permission[0].authName),1)])),_:1})):N("",!0),(y(!0),I(q,null,L(H(v)().Permission.slice(1),((e,a)=>(y(),C(m,{index:e.path,key:a},{title:w((()=>[P("div",V,[B(u,null,{default:w((()=>[(y(),C(R(i.value[a])))])),_:2},1024)]),P("span",null,T(e.authName),1)])),default:w((()=>[(y(!0),I(q,null,L(e.children,(a=>(y(),C(d,{index:a.path,onClick:e=>c(a.authName),key:e.id},{default:w((()=>[P("span",null,T(a.authName),1)])),_:2},1032,["index","onClick"])))),128))])),_:2},1032,["index"])))),128))])])),_:1},8,["default-active"])):N("",!0)])),_:1})}}}),[["__scopeId","data-v-c911f3d1"]]),G={class:"Home"},J=["onClick"],U=E("退出"),W=S(b({__name:"Home",setup(e){const a=v().historicRecords,s=a,g=_(),b=_().getRoutes(),j=e=>{e&&(e.textContent.trim()===g.currentRoute.value.meta.title?(e.style.backgroundColor="#0960bd",e.style.color="#fff"):(e.style.backgroundColor="#fff",e.style.color="#000"))},k=()=>{p.confirm("你确定退出登录吗?",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",beforeClose:(e,a,s)=>{"confirm"===e?(a.confirmButtonLoading=!0,a.confirmButtonText="Loading...",setTimeout((()=>{s(),setTimeout((()=>{a.confirmButtonLoading=!1,g.push("/Login")}),300)}),1500)):s()}}).then((()=>{h({type:"success",message:"退出成功"})})).catch((()=>{h({type:"info",message:"取消退出"})}))},x=()=>{F.isEnabled&&F.toggle()};return(e,p)=>{const h=l,v=t,_=n,R=i,z=o,A=M("FullScreen"),E=r,S=u,F=c,O=d,Q=M("router-view"),V=m,W=f;return y(),I("div",G,[B(W,null,{default:w((()=>[B(h,{width:"210px"},{default:w((()=>[B(D)])),_:1}),B(W,null,{default:w((()=>[B(O,{class:"Home-header"},{default:w((()=>[B(F,{gutter:0},{default:w((()=>[B(z,{class:"Home-header-center",span:20},{default:w((()=>[B(R,null,{default:w((()=>[B(_,{class:"breadcrumbBox"},{default:w((()=>[(y(!0),I(q,null,L(H(s),((e,s)=>(y(),I("div",{class:"Breadcrumbs swing-in-left-bck",ref_for:!0,ref:j,key:s,onClick:a=>{return s=e,void b.forEach((e=>{e.meta.title===s&&g.push(e.path)}));var s}},[P("span",null,T(e),1),"首页"!=e?(y(),C(v,{key:0,onClick:s=>(e=>{"首页"!==e&&a.delete(e)})(e)},{default:w((()=>[B(H(K))])),_:2},1032,["onClick"])):N("",!0)],8,J)))),128))])),_:1})])),_:1})])),_:1}),B(z,{class:"Home-header-right",span:4},{default:w((()=>[P("span",{class:"Home-header-right-fullscreen",onClick:x},[B(A,{style:{width:"22px",color:"#0960bd",height:"22px"}})]),B(E,{size:30,src:"https://www.kangsang666.top/logo.png"}),B(S,{text:"",onClick:k},{default:w((()=>[U])),_:1})])),_:1})])),_:1})])),_:1}),B(V,{class:"fade-in-bottom"},{default:w((()=>[P("div",null,[B(Q)])])),_:1})])),_:1})])),_:1})])}}}),[["__scopeId","data-v-15650ecb"]]);export{W as default};
