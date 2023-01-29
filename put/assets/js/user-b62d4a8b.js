var e=Object.defineProperty,a=(a,l,o)=>(((a,l,o)=>{l in a?e(a,l,{enumerable:!0,configurable:!0,writable:!0,value:o}):a[l]=o})(a,"symbol"!=typeof l?l+"":l,o),o);import{a as l,b as o,c as t,i as s,d as u,C as d,L as i,F as r,x as n,G as p,H as c,J as m,s as f,e as h,K as b}from"./element-plus-203e699c.js";import{D as v}from"./@element-plus-d8a2a1e5.js";import{u as _}from"./index-483d466e.js";import{a as V}from"./axios-baa3c49b.js";import{C as g,Y as k,r as w,m as D,w as y,s as x,o as M,c as j,a as L,T as U,R as C,u as I,Q as S,M as N,au as z,av as K,a7 as P,af as Q,a1 as A}from"./@vue-44d974e2.js";import{_ as T}from"./_plugin-vue_export-helper-361d09b5.js";import"./@vueuse-e4b4bc09.js";import"./dayjs-35bf6e11.js";import"./lodash-es-b74e909d.js";import"./async-validator-d27e01f0.js";import"./@ctrl-a2a2eaea.js";import"./@popperjs-065daa60.js";import"./escape-html-21541a7f.js";import"./normalize-wheel-es-a8f75fb2.js";import"./pinia-3e26750f.js";import"./index-ac2b86c4.js";import"./vue-router-3e87876c.js";import"./default-passive-events-dc7439bc.js";import"./mockjs-8cc937cd.js";import"./moment-da921422.js";class G{constructor(){a(this,"MockData",[{shopId:0,shopName:"",shopMsg:"",salesPrice:0,salesQuantity:0,hasSaled:0,salesAllowance:0,shopLogo:"",shopKind:""}])}}class B{constructor(){a(this,"SearchData",{shopId:null,shopName:""})}}const E=e=>(z("data-v-da82a46a"),e=e(),K(),e),F={class:"main animate__fadeIn animate__animated"},H=E((()=>L("div",{class:"title"},[L("h3",null,"商品列表")],-1))),O={class:"formHeader"},R={class:"Search-left"},$=P("搜索"),q=P("添加"),J=P("删除"),Y=P("清除搜索条件"),W={class:"Search-right"},X=E((()=>L("span",null,"编辑",-1))),Z=E((()=>L("span",null,"删除",-1))),ee={class:"pagination"},ae={class:"addform"},le={class:"dialog-footer"},oe=P("取消"),te=P("完成"),se={class:"editform"},ue={class:"dialog-footer"},de=P("取消"),ie=P("完成"),re=T(g({__name:"user",setup(e){const a=k(new G),g=k(new B),z=()=>{a.MockData=_().userList},K=w(10),P=w(1),T=D((()=>a.MockData.slice((P.value-1)*K.value,P.value*K.value)));let E=k([]);const re=e=>{E=e},ne=()=>{E.forEach((e=>{_().userList.splice(_().userList.indexOf(e),1)})),a.MockData=_().userList},pe=w(!1),ce="140px",me=k(new G),fe=()=>{_().userList.unshift({shopId:0,shopName:"新增商品",shopMsg:"新增介绍xxxxxxxxxx",salesPrice:1234,salesQuantity:1111,hasSaled:123,salesAllowance:111,shopLogo:"https://www.kangsang666.top/logo.png",shopKind:"家用"}),pe.value=!1},he=w(!1);let be=w(null);const ve=w(null),_e=()=>{const e=b.service({text:"刷新中...",background:"#fff",fullscreen:!1,target:ve.value});setTimeout((()=>{e.close()}),2e3),Ve()};function Ve(){V.get("/GoodsList/list").then((e=>{_().userList=e.data.data.GoodsList,a.MockData=_().userList})).catch((e=>{throw e}))}return y((()=>_().userList),(()=>{_().userList&&(a.MockData=_().userList)})),x((()=>{Ve()})),(e,b)=>{const V=l,k=o,w=t,D=A("Refresh"),y=s,x=u,G=d,B=i,E=A("Edit"),Ve=A("CircleCloseFilled"),ge=r,ke=n,we=p,De=c,ye=m;return M(),j("div",F,[H,L("div",O,[U(x,{size:"large",inline:!0,model:g,class:"Search"},{default:C((()=>[L("div",R,[U(k,{label:"搜索商品ID"},{default:C((()=>[U(V,{modelValue:g.SearchData.shopId,"onUpdate:modelValue":b[0]||(b[0]=e=>g.SearchData.shopId=e),placeholder:"搜索商品ID"},null,8,["modelValue"])])),_:1}),U(k,{label:"搜索商品名称"},{default:C((()=>[U(V,{modelValue:g.SearchData.shopName,"onUpdate:modelValue":b[1]||(b[1]=e=>g.SearchData.shopName=e),placeholder:"搜索商品名称"},null,8,["modelValue"])])),_:1}),U(k,null,{default:C((()=>[U(w,{type:"primary",onClick:b[2]||(b[2]=e=>{return l=g.SearchData.shopId,o=g.SearchData.shopName,void(a.MockData&&(l?(g.SearchData.shopId=null,a.MockData=a.MockData.filter((e=>{if(e.shopId==l)return e}))):o&&(g.SearchData.shopName=null,a.MockData=a.MockData.filter((e=>{if(e.shopName==o)return e})))));var l,o})},{default:C((()=>[$])),_:1})])),_:1}),U(k,null,{default:C((()=>[U(w,{type:"info",onClick:b[3]||(b[3]=e=>pe.value=!0)},{default:C((()=>[q])),_:1})])),_:1}),U(k,null,{default:C((()=>[U(w,{type:"success",onClick:ne},{default:C((()=>[J])),_:1})])),_:1}),U(k,null,{default:C((()=>[U(w,{type:"warning",onClick:z},{default:C((()=>[Y])),_:1})])),_:1})]),L("div",W,[U(k,{class:"refersh",onClick:_e},{default:C((()=>[U(y,{size:28},{default:C((()=>[U(D)])),_:1})])),_:1})])])),_:1},8,["model"])]),L("div",{class:"table",ref_key:"table",ref:ve},[U(ge,{stripe:"","table-layout":"fixed","highlight-current-row":!0,border:!0,data:I(T),"default-sort":{prop:"shopId",order:"ascending"},onSelect:re},{default:C((()=>[U(G,{type:"selection",width:"45"}),U(G,{fixed:"",prop:"shopId",sortable:"",label:"商品ID",width:"100"}),U(G,{prop:"shopName",label:"商品名称(name)"}),U(G,{prop:"shopMsg",label:"商品介绍"}),U(G,{prop:"salesPrice",label:"商品价格(￥)"}),U(G,{prop:"shopKind",label:"商品类别"}),U(G,{prop:"salesQuantity",label:"商品数量(quantity)"}),U(G,{prop:"salesAllowance",label:"余量"}),U(G,{prop:"shopLogo",label:"图片"},{default:C((e=>[U(B,{style:{width:"100px",height:"40px"},src:e.row.shopLogo},null,8,["src"])])),_:1}),U(G,{align:"center",width:"120"},{default:C((e=>[U(w,{size:"small",onClick:a=>{return e.$index,l=e.row,be.value=l,void(he.value=!he.value);var l}},{default:C((()=>[U(y,null,{default:C((()=>[U(E)])),_:1}),X])),_:2},1032,["onClick"])])),_:1}),U(G,{align:"center",width:"120"},{default:C((e=>[U(w,{size:"small",type:"danger",onClick:l=>{return o=e.$index,void f.confirm("你确定要删除吗?","删除商品",{confirmButtonText:"确认",cancelButtonText:"取消",type:"warning",icon:Q(v)}).then((()=>{1===P.value?(_().userList.splice(o,1),a.MockData=_().userList):(_().userList.splice(o+(P.value-1)*K.value,1),a.MockData=_().userList),h({type:"success",message:"删除成功"})})).catch((()=>{h({type:"info",message:"取消删除"})}));var o}},{default:C((()=>[U(y,null,{default:C((()=>[U(Ve)])),_:1}),Z])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"]),L("div",ee,[U(ke,{"current-page":P.value,"onUpdate:current-page":b[4]||(b[4]=e=>P.value=e),"page-size":K.value,total:I(_)().userList.length,background:"",layout:"total,prev, pager, next"},null,8,["current-page","page-size","total"])]),L("div",ae,[U(ye,{modelValue:pe.value,"onUpdate:modelValue":b[10]||(b[10]=e=>pe.value=e),title:"新增商品",draggable:""},{footer:C((()=>[L("span",le,[U(w,{onClick:b[9]||(b[9]=e=>pe.value=!1)},{default:C((()=>[oe])),_:1}),U(w,{type:"primary",onClick:fe},{default:C((()=>[te])),_:1})])])),default:C((()=>[U(x,{modelValue:me.MockData,"onUpdate:modelValue":b[8]||(b[8]=e=>me.MockData=e)},{default:C((()=>[U(k,{label:"商品名","label-width":ce},{default:C((()=>[U(V,{modelValue:me.MockData,"onUpdate:modelValue":b[5]||(b[5]=e=>me.MockData=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),U(k,{label:"商品价格","label-width":ce},{default:C((()=>[U(V,{modelValue:me.MockData,"onUpdate:modelValue":b[6]||(b[6]=e=>me.MockData=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),U(k,{label:"商品类别","label-width":ce},{default:C((()=>[U(De,{modelValue:me.MockData,"onUpdate:modelValue":b[7]||(b[7]=e=>me.MockData=e),placeholder:"请选择商品类别"},{default:C((()=>[U(we,{label:"零食",value:"lingshi"}),U(we,{label:"日用",value:"riyong"}),U(we,{label:"家具",value:"jiaju"}),U(we,{label:"饮料",value:"yinliao"})])),_:1},8,["modelValue"])])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["modelValue"])]),L("div",se,[U(ye,{modelValue:he.value,"onUpdate:modelValue":b[22]||(b[22]=e=>he.value=e),title:"新增商品",draggable:""},{footer:C((()=>[L("span",ue,[U(w,{onClick:b[20]||(b[20]=e=>he.value=!1)},{default:C((()=>[de])),_:1}),U(w,{type:"primary",onClick:b[21]||(b[21]=e=>he.value=!1)},{default:C((()=>[ie])),_:1})])])),default:C((()=>[I(be)?(M(),S(x,{key:0,model:I(be)},{default:C((()=>[U(k,{label:"商品id","label-width":ce},{default:C((()=>[U(V,{modelValue:I(be).shopId,"onUpdate:modelValue":b[11]||(b[11]=e=>I(be).shopId=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),U(k,{label:"商品名","label-width":ce},{default:C((()=>[U(V,{modelValue:I(be).shopName,"onUpdate:modelValue":b[12]||(b[12]=e=>I(be).shopName=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),U(k,{label:"商品介绍","label-width":ce},{default:C((()=>[U(V,{modelValue:I(be).shopMsg,"onUpdate:modelValue":b[13]||(b[13]=e=>I(be).shopMsg=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),U(k,{label:"商品价格","label-width":ce},{default:C((()=>[U(V,{modelValue:I(be).salesPrice,"onUpdate:modelValue":b[14]||(b[14]=e=>I(be).salesPrice=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),U(k,{label:"商品数量","label-width":ce},{default:C((()=>[U(V,{modelValue:I(be).salesQuantity,"onUpdate:modelValue":b[15]||(b[15]=e=>I(be).salesQuantity=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),U(k,{label:"已售商品","label-width":ce},{default:C((()=>[U(V,{modelValue:I(be).hasSaled,"onUpdate:modelValue":b[16]||(b[16]=e=>I(be).hasSaled=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),U(k,{label:"剩余数量","label-width":ce},{default:C((()=>[U(V,{modelValue:I(be).salesAllowance,"onUpdate:modelValue":b[17]||(b[17]=e=>I(be).salesAllowance=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),U(k,{label:"图片信息","label-width":ce},{default:C((()=>[U(V,{modelValue:I(be).shopLogo,"onUpdate:modelValue":b[18]||(b[18]=e=>I(be).shopLogo=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),U(k,{label:"商品类别","label-width":ce},{default:C((()=>[U(V,{modelValue:I(be).shopKind,"onUpdate:modelValue":b[19]||(b[19]=e=>I(be).shopKind=e),autocomplete:"off"},null,8,["modelValue"])])),_:1})])),_:1},8,["model"])):N("",!0)])),_:1},8,["modelValue"])])],512)])}}}),[["__scopeId","data-v-da82a46a"]]);export{re as default};
