"use strict";(self.webpackChunklabel_front=self.webpackChunklabel_front||[]).push([[891],{8891:function(e,t,n){n.r(t),n.d(t,{default:function(){return Fe}});var o,r,i=n(1413),a=n(4165),s=n(5861),c=n(9439),l=n(4569),u=n.n(l),d=n(2791),h=n(6871),g=(n(8890),n(5671)),f=n(3144),p=n(136),m=n(9388),x=n(9407),v=n(548),y=n(5712),_=n(5003),k=n(641),N=n(5141),S=n(6983),w=n(3126),b=n(381),I=n(6337),j=n(8789),Z=n(4428),P=n(184),L=function(e){(0,p.Z)(n,e);var t=(0,m.Z)(n);function n(e){var r;return(0,g.Z)(this,n),r=t.call(this,e),o=(0,Z.ZP)("https://tradingstudy.shop:443",{transports:["websocket"],query:{userId:String(r.props.userIdx),pdfId:String(r.props.pdfIdx)}}),r.state={fp:{},flag:!1},o.on("connect",(function(){o.once("updateEditorOnce",(function(e){r.setState({fp:e,flag:!0})}))})),r}return(0,f.Z)(n,[{key:"render",value:function(){return(0,P.jsx)("div",{children:this.state.flag&&(0,P.jsx)(F,{readOnly:this.props.readOnly,value:this.state.fp,markdownValue:this.props.markdownValue,commitIdx:this.props.commitIdx,userIdx:this.props.userIdx,pdfIdx:this.props.pdfIdx})})}},{key:"componentWillUnmount",value:function(){null!=o&&!0===o.connected&&o.disconnect()}}]),n}(d.Component);function B(e,t,n){r=setTimeout((function(){o.emit("updateEditor",{id:e,pdfId:t,text:n},clearTimeout(r))}),700)}function C(e,t,n){return E.apply(this,arguments)}function E(){return(E=(0,s.Z)((0,a.Z)().mark((function e(t,n,o){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r?(clearTimeout(r),B(t,n,o)):B(t,n,o);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function R(e,t){return H.apply(this,arguments)}function H(){return(H=(0,s.Z)((0,a.Z)().mark((function e(t,n){var o,r,i,s,c;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O(n);case 2:return o=e.sent,r=o.preSignedUrl,i=o.fileName,e.next=7,D(t,i);case 7:return s=e.sent,c="https://label-editor.s3.ap-northeast-2.amazonaws.com/".concat(i),e.next=11,U(r.signedUrlPut,s);case 11:return e.abrupt("return",c);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e){return T.apply(this,arguments)}function T(){return(T=(0,s.Z)((0,a.Z)().mark((function e(t){var n,o,r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=Math.random().toString(36).substring(2,11),o="".concat(t,"_").concat(n,".png"),e.next=5,u().post("https://tradingstudy.shop:443/users/sign",{fileName:o});case 5:return r=e.sent,e.abrupt("return",{preSignedUrl:r.data,fileName:o});case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function D(e,t){return M.apply(this,arguments)}function M(){return(M=(0,s.Z)((0,a.Z)().mark((function e(t,n){var o,r,i,s,c;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(o=t.split(","),r=o[0].match(/:(.*?);/)[1],i=atob(o[1]),s=i.length,c=new Uint8Array(s);s--;)c[s]=i.charCodeAt(s);return e.abrupt("return",new File([c],n,{type:r}));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function U(e,t){return A.apply(this,arguments)}function A(){return(A=(0,s.Z)((0,a.Z)().mark((function e(t,n){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t,{method:"PUT",body:n,headers:{"x-amz-acl":"public-read","Content-Type":"image/png"}});case 2:e.sent;case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var F=function(e){var t=e.readOnly,n=e.value,o=e.markdownValue,r=e.commitIdx,i=e.userIdx,c=e.pdfIdx,l=(0,k.jE)((function(e,l){0!==Object.keys(o).length&&(console.log("heloooooooooo",o),-1===t&&C(i,c,o));var u=x.ML.make().config((function(t){t.set(x.KP,e),-1===r&&0!==n.length?(console.log("-------1. \ub864\ubc31 x",n),t.set(x.Dn,{type:"json",value:n})):-1===r&&0===Object.keys(n).length?(console.log("-------2. \ub864\ubc31 x + \uc544\ubb34\ub7f0 value\uac00 \uc5c6\uc744 \ub54c",n),t.set(x.Dn,"")):(console.log("-------3. \ub864\ubc31",o),t.set(x.Dn,{type:"json",value:o})),t.get(v.QC).updated(function(){var e=(0,s.Z)((0,a.Z)().mark((function e(t,o,r){var s,l,u,d,h,g,f,p,m;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s=o.toJSON(),console.log("jsonOutput: ",s),l=s.content,u=0;case 4:if(!(u<l.length)){e.next=31;break}if(!l[u].content){e.next=28;break}d=0;case 7:if(!(d<l[u].content.length)){e.next=28;break}if(h=l[u].content[d],g=h.type,f=h.attrs,console.log("contentAttr",f,h),void 0===f||f.title||"image"!==g){e.next=23;break}return f.title="try",console.log("it is not stored yet!!"),p=f.src,e.next=18,R(p,i);case 18:m=e.sent,console.log("imagesrc:",m),f.src=m,e.next=24;break;case 23:"image"===g&&console.log("it is alread loaded!!");case 24:console.log(l[u],h,g);case 25:d++,e.next=7;break;case 28:u++,e.next=4;break;case 31:return console.log(s),e.next=34,C(i,c,s);case 34:return e.abrupt("return",n);case 35:case"end":return e.stop()}}),e)})));return function(t,n,o){return e.apply(this,arguments)}}())})).use(-1===t?S.Ge:_.Md).use(b.GI).use(N.Qn).use(j.m8).use(I.r0).use(w.mA).use(y.M).use(v.X3);return u}),[r,o]),u=l.editor;l.loading,l.getInstance;return(0,d.useEffect)((function(){var e,n,o,r;null===(e=document.querySelector(".ProseMirror.editor"))||void 0===e||e.setAttribute("ondrop","drop_handler(event)"),null===(n=document.querySelector(".ProseMirror.editor"))||void 0===n||n.setAttribute("ondragover","dragover_handler(event)");var i,a,s=null===(o=document.querySelector(".PersonalReading__mainPage"))||void 0===o?void 0:o.clientHeight;null!=s&&(null===(i=document.querySelector(".milkdown"))||void 0===i||i.setAttribute("style","height: ".concat(s-240,"px")));1===t&&(null===(a=document.querySelector(".ProseMirror.editor"))||void 0===a||a.setAttribute("contenteditable","false"));null===(r=document.querySelector(".editor"))||void 0===r||r.setAttribute("style","overflow: scroll !important")})),(0,P.jsx)(k.F3,{editor:u})};var G=function(e){return(0,P.jsx)("div",{dangerouslySetInnerHTML:{__html:e.html}})},q="HighlightList_wrap__5AIyL",Y="HighlightList_container__aHWyH",V="HighlightList_title__hmW+d",z="HighlightList_pageNumberInfo__WUuxT",K="HighlightList_pageNumberInput__XFaQe",W="HighlightList_highlightInfo__StQzz",Q={searchBar:"SearchBar_searchBar__nTkuX",search:"SearchBar_search__rUkCI",searchButton:"SearchBar_searchButton__kyrsF",searchInput:"SearchBar_searchInput__64lOR"},X=n(4483),J=n(3174);var $=function(e){return(0,P.jsxs)("form",{className:Q.searchBar,onSubmit:function(e){!function(e){e.preventDefault()}(e)},children:[(0,P.jsx)("button",{className:Q.searchButton,children:(0,P.jsx)(X.G,{icon:J.Y$T,className:Q.searchIcon})}),(0,P.jsx)("input",{className:Q.searchInput,type:"text",id:"search",onChange:function(t){if(""===t.target.value){var n=function(){var t=(0,s.Z)((0,a.Z)().mark((function t(){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u().get("https://inkyuoh.shop/highlights/pdfs/".concat(e.pdfIdx,"/pages/").concat(e.currentPageNumber)).then((function(t){console.log("Search highlight data response:",t),e.setHighlightData(t.data.result)})).catch((function(e){console.log("Search highlight data Fail, error:",e)}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();n()}else{var o=function(){var n=(0,s.Z)((0,a.Z)().mark((function n(){return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,u().get("https://inkyuoh.shop/pdfs/".concat(e.pdfIdx,"/highlights/search?keyword=").concat(t.target.value)).then((function(t){console.log("Search highlight data response:",t),e.setHighlightData(t.data.result.sort((function(e,t){return e.pageNum-t.pageNum})))})).catch((function(e){console.log("Search highlight data Fail, error:",e)}));case 2:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();o()}},placeholder:"\uac80\uc0c9\uc5b4\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694."})]})};var ee=n(7621),te=n(9504),ne=n(9585),oe=n(890),re=n(3044),ie=n(5130),ae=n(3400);function se(e){var t;function n(){return(n=(0,s.Z)((0,a.Z)().mark((function t(n,o,r,i,c,l){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u().delete("https://inkyuoh.shop/highlights/".concat(o)).then((function(e){console.log("highlight delete response:",e)})).catch((function(e){console.log("highlight delete error:",e)})).then((0,s.Z)((0,a.Z)().mark((function t(){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u().get("https://inkyuoh.shop/highlights/pdfs/".concat(e.pdfIdx,"/pages/").concat(l)).then((function(e){r(e.data.result),c(!i);for(var t=document.getElementsByClassName("highlight"+o),n=0;n<t.length;n++)!0===t[n].classList.contains("highlightedGreen")&&t[n].classList.remove("highlightedGreen"),!0===t[n].classList.contains("highlightedPurple")&&t[n].classList.remove("highlightedPurple"),!0===t[n].classList.contains("highlightedYellow")&&t[n].classList.remove("highlightedYellow")}));case 2:case"end":return t.stop()}}),t)}))));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return(0,P.jsx)(P.Fragment,{children:null===(t=e.highlightData)||void 0===t?void 0:t.map((function(t,o){return(0,P.jsx)(P.Fragment,{children:(0,P.jsxs)(ee.Z,{sx:{width:"100%",minWidth:275,marginBottom:1},children:[(0,P.jsx)(ne.Z,{sx:{paddingBottom:0},avatar:(0,P.jsx)(re.Z,{sx:{width:10,height:10,bgcolor:0===t.color?"#93E7A2":1===t.color?"#9747FF":2===t.color?"#FFD644":null},"aria-label":"recipe",children:""}),title:"p."+"".concat(t.pageNum),action:-1===e.readOnly?(0,P.jsx)(ae.Z,{onClick:function(){!function(e,t,o,r,i,a){n.apply(this,arguments)}(e.commitIdx,t.highlightIdx,e.setHighlightData,e.updateHighlightList,e.setUpdateHighlightList,e.currentPageNumber)},children:(0,P.jsx)(ie.Z,{fontSize:"small"})}):null}),(0,P.jsx)(te.Z,{sx:{paddingTop:"4px"},children:(0,P.jsx)(oe.Z,{sx:{fontSize:14},color:"text.secondary",draggable:-1===e.readOnly?"true":null,onDragStart:function(e){!function(e){e.dataTransfer.setData("text/plain",e.target.innerHTML)}(e)},children:t.data})})]},o)})}))})}var ce=function(e){var t=(0,d.useState)([]),n=(0,c.Z)(t,2),o=n[0],r=n[1];return(0,d.useEffect)((function(){if(-1===e.readOnly){var t=function(){var t=(0,s.Z)((0,a.Z)().mark((function t(){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u().get("https://inkyuoh.shop/highlights/pdfs/".concat(e.pdfIdx,"/pages/").concat(e.currentPageNumber)).then((function(e){r(e.data.result)}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}if(1===e.readOnly){var n=function(){var t=(0,s.Z)((0,a.Z)().mark((function t(){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u().get("https://inkyuoh.shop/highlights/pages/".concat(e.currentPageNumber,"/commitIdx/").concat(e.commitIdx)).then((function(e){r(e.data.result)}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();n()}}),[e.currentPageNumber,e.updateHighlightList,e.commitIdx,e.forceUpdate]),(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,P.jsx)("div",{className:V,children:"Highlights"}),!1===e.mode?(0,P.jsx)("div",{className:z,children:(0,P.jsxs)("p",{children:[(0,P.jsx)("input",{className:K,placeholder:e.currentPageNumber,onKeyUp:function(t){t.preventDefault(),13===window.event.keyCode&&1<=t.target.value&&t.target.value<=e.totalPage&&(e.setCurrentPageNumber(Number(t.target.value)),t.target.value=null)}})," / ",e.totalPage]})}):null]}),(0,P.jsx)($,{pdfIdx:e.pdfIdx,currentPageNumber:e.currentPageNumber,highlightData:o,setHighlightData:r}),(0,P.jsx)("div",{className:W}),(0,P.jsx)("aside",{className:q,children:(0,P.jsx)("div",{className:Y,children:(0,P.jsx)(se,{readOnly:e.readOnly,commitIdx:e.commitIdx,pdfIdx:e.pdfIdx,highlightData:o,setHighlightData:r,style:{overflow:"scroll"},updateHighlightList:e.updateHighlightList,setUpdateHighlightList:e.setUpdateHighlightList,currentPageNumber:e.currentPageNumber})})})]})},le=n(1171),ue=n(1034),de=((0,le.ZP)((function(e){return(0,P.jsx)(ue.Z,(0,i.Z)({focusVisibleClassName:".Mui-focusVisible",disableRipple:!0},e))}))((function(e){var t=e.theme;return{width:42,height:26,padding:0,"& .MuiSwitch-switchBase":{padding:0,margin:2,transitionDuration:"300ms","&.Mui-checked":{transform:"translateX(16px)",color:"#fff","& + .MuiSwitch-track":{backgroundColor:"dark"===t.palette.mode?"#2ECA45":"#93E8DE",opacity:1,border:0},"&.Mui-disabled + .MuiSwitch-track":{opacity:.5}},"&.Mui-focusVisible .MuiSwitch-thumb":{color:"#33cf4d",border:"6px solid #fff"},"&.Mui-disabled .MuiSwitch-thumb":{color:"light"===t.palette.mode?t.palette.grey[100]:t.palette.grey[600]},"&.Mui-disabled + .MuiSwitch-track":{opacity:"light"===t.palette.mode?.7:.3}},"& .MuiSwitch-thumb":{boxSizing:"border-box",width:22,height:22},"& .MuiSwitch-track":{borderRadius:13,backgroundColor:"light"===t.palette.mode?"#E9E9EA":"#39393D",opacity:1,transition:t.transitions.create(["background-color"],{duration:500})}}})),"SideBar_sideBarContents__KmwNy"),he="SideBar_bookInfo__+AGC2",ge="SideBar_bookImage__o80DQ",fe="SideBar_bookTitle__4hT75",pe="SideBar_historyContainer__laxyt",me="SideBar_historyTitle__iYLbi",xe="SideBar_historyInput__3t5Oq",ve="SideBar_historyWrap__Ih9xV",ye="SideBar_historyUnorderedListTag__KWQHM",_e="SideBar_historyMessage__kdmFK",ke="SideBar_historyDateAndIcon__Ihenq",Ne="SideBar_historyDate__Vax62",Se="SideBar_historyIcon__-+mfK",we="SideBar_readOnly__TgCzT",be="SideBar_rollBack__ETisR",Ie="SideBar_sideBarToggleButton__D3HGR",je=n(7892),Ze=n.n(je),Pe=n(3767),Le=n(9525),Be=n(9658);function Ce(e){var t;function n(t){e.setCommitIdx(t.commitIdx),e.setReadOnly(1)}return(0,P.jsx)(P.Fragment,{children:null===(t=e.commitsInfo)||void 0===t?void 0:t.map((function(t,o){return(0,P.jsx)("ul",{className:ye,children:(0,P.jsxs)("li",{children:[(0,P.jsx)("p",{className:_e,onClick:function(){n(t)},children:t.commitMessage}),(0,P.jsxs)("div",{className:ke,children:[(0,P.jsx)("p",{className:Ne,onClick:function(){n(t)},children:t.createdAt.substring(2)}),(0,P.jsxs)("div",{className:Se,children:[(0,P.jsx)(X.G,{className:we,icon:J.Mdf,onClick:function(){n(t)}}),(0,P.jsx)(X.G,{className:be,style:{marginLeft:"4px"},icon:J.paY,onClick:function(){!function(t){function n(){return n=(0,s.Z)((0,a.Z)().mark((function t(n){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u().post("https://inkyuoh.shop/commits/rollback",{commitHighlightLog:JSON.parse(n.logs),userBookIdx:n.userBookIdx}).then((function(t){console.log(t),e.setForceUpdate(e.forceUpdate+1)}));case 2:case"end":return t.stop()}}),t)}))),n.apply(this,arguments)}e.setCommitIdx(t.commitIdx),e.setReadOnly(-1),function(e){n.apply(this,arguments)}(t)}(t)}})]})]})]})},o)}))})}var Ee=function(e){var t=(0,d.useState)(!1),n=(0,c.Z)(t,2),o=n[0],r=n[1],a=(0,d.useState)([]),s=(0,c.Z)(a,2),l=s[0],h=s[1],g=(0,d.useRef)(),f=Ze()().format("YYYY-MM-DD HH:mm:ss");(0,d.useEffect)((function(){u().get("https://inkyuoh.shop/commits/users/".concat(58,"/books/").concat(e.currentBookInfo.pdfIdx)).then((function(e){var t,n;console.log(e),h(null===e||void 0===e||null===(t=e.data)||void 0===t||null===(n=t.result)||void 0===n?void 0:n.reverse())})).catch((function(e){console.log(e)}))}),[o]);var p=(0,d.useState)(!1),m=(0,c.Z)(p,2),x=m[0],v=m[1],y=(0,d.useState)(!1),_=(0,c.Z)(y,2),k=_[0],N=_[1],S=function(e,t){"clickaway"!==t&&(v(!1),N(!1))},w=d.forwardRef((function(e,t){return(0,P.jsx)(Be.Z,(0,i.Z)({elevation:6,ref:t,variant:"filled"},e))}));return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)("div",{className:de,style:!0===o?{}:{display:"none"},children:[(0,P.jsxs)("div",{className:he,children:[(0,P.jsx)("div",{className:ge,style:{backgroundImage:"url("+"".concat(""+"".concat(e.currentBookInfo.firstPageLink))}}),(0,P.jsx)("p",{className:fe,children:e.currentBookInfo.pdfName})]}),(0,P.jsx)("hr",{style:{width:"100%",marginTop:24,marginBottom:24,marginLeft:24,marginRight:16}}),(0,P.jsxs)("div",{className:pe,children:[(0,P.jsx)("div",{className:me,children:"History"}),(0,P.jsx)("form",{onSubmit:function(t){!function(t){t.preventDefault(),""!==g.current.value?(u().post("https://inkyuoh.shop/commits",{pdfIdx:e.currentBookInfo.pdfIdx,userIdx:58,createdAt:f,commitMessage:g.current.value}).then((function(t){console.log("Commit response:",t),u().get("https://inkyuoh.shop/commits/users/".concat(58,"/books/").concat(e.currentBookInfo.pdfIdx)).then((function(e){var t,n;console.log("Reset commitsInfo response:",e),h(null===e||void 0===e||null===(t=e.data)||void 0===t||null===(n=t.result)||void 0===n?void 0:n.reverse()),v(!0)})).catch((function(e){console.log("Reset commitsInfo Fail, error:",e)}))})).catch((function(e){console.log("Commit Fail, error:",e)})),g.current.value=null):N(!0)}(t)},children:(0,P.jsx)("input",{ref:g,className:xe,placeholder:"\uae30\ub85d\uc744 \ub0a8\uae30\uc138\uc694."})}),(0,P.jsx)("div",{className:ve,children:(0,P.jsx)(Ce,{readOnly:e.readOnly,setReadOnly:e.setReadOnly,forceUpdate:e.forceUpdate,setForceUpdate:e.setForceUpdate,commitIdx:e.commitIdx,setCommitIdx:e.setCommitIdx,commitsInfo:l})})]}),(0,P.jsxs)(Pe.Z,{spacing:2,sx:{width:"100%"},children:[(0,P.jsx)(Le.Z,{open:x,autoHideDuration:4500,onClose:S,children:(0,P.jsx)(w,{onClose:S,severity:"success",sx:{width:"100%"},children:"\uc800\uc7a5\uc774 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4."})}),(0,P.jsx)(Le.Z,{open:k,autoHideDuration:4500,onClose:S,children:(0,P.jsx)(w,{onClose:S,severity:"error",sx:{width:"100%"},children:"\uae30\ub85d \ub0b4\uc6a9\uc744 \uc791\uc131\ud574\uc8fc\uc2dc\uae30 \ubc14\ub78d\ub2c8\ub2e4."})})]})]}),(0,P.jsx)(X.G,{icon:!0===o?J.EyR:J.yOZ,className:Ie,onClick:function(){r(!o)}})]})},Re=n(5498),He=n.n(Re),Oe=n(5125);function Te(e,t,n,o,r,i,a){null===a||void 0===a||a.stopPropagation();for(var s=window.getSelection().toString().trim(),c=window.getSelection().getRangeAt(0),l=window.getSelection().getRangeAt(0).startContainer,d=window.getSelection().getRangeAt(0).endContainer,h=l.parentElement,g=d.parentElement,f=c.startOffset,p=0,m=0;m<h.childNodes.length;m++)h.childNodes[m]===l&&(p=m);for(var x=c.endOffset,v=0,y=0;y<g.childNodes.length;y++)g.childNodes[y]===d&&(v=y);function _(e,t){return!0===e.classList.toString().includes("y")?e.classList:_(e.parentElement,t+1)}var k,N=_(h,0)[4],S=_(g,0)[4];"highlightedGreen"===i&&(k=0),"highlightedPurple"===i&&(k=1),"highlightedYellow"===i&&(k=2);var w={pdfIdx:e,pageNum:t,startLine:N,startOffset:f,startNode:p,endLine:S,endOffset:x,endNode:v,data:s,color:k};u().post("https://inkyuoh.shop/highlights",{pdfIdx:e,pageNum:t,startLine:N,startOffset:f,startNode:p,endLine:S,endOffset:x,endNode:v,data:s,color:k}).then((function(e){console.log("Highlight POST Success\nresponse:",e),r(!o)})).catch((function(e){console.log("Highlight POST Fail\nerror:",e)})).then((function(){u().get("https://inkyuoh.shop/highlights/pdfs/".concat(e,"/pages/").concat(t)).then((function(e){De(w,e.data.result[e.data.result.length-1].highlightIdx)}))})),n.current.style.display="none"}function De(e,t){var n,o=e.startLine,r=e.startOffset,i=e.startNode,a=e.endLine,s=e.endOffset,c=e.endNode,l=parseInt(o.slice(1),16),u=parseInt(a.slice(1),16);0===e.color&&(n="highlightedGreen"),1===e.color&&(n="highlightedPurple"),2===e.color&&(n="highlightedYellow");for(var d=l;d<=u;d++){var h=document.getElementsByClassName("y".concat(d.toString(16)))[0],g=document.createRange(),f=document.createElement("span");if(f.classList.add(n),f.classList.add("highlight"+t),l===u)return g.setStart(null===h||void 0===h?void 0:h.childNodes[i],r),g.setEnd(null===h||void 0===h?void 0:h.childNodes[c],s),void Me(g,f);d===l?(g.setStart(null===h||void 0===h?void 0:h.childNodes[i],r),g.setEnd(null===h||void 0===h?void 0:h.childNodes[h.childNodes.length-1],h.childNodes[h.childNodes.length-1].length)):d===u?(g.setStart(null===h||void 0===h?void 0:h.childNodes[0],0),g.setEnd(null===h||void 0===h?void 0:h.childNodes[c],s)):(g.setStart(null===h||void 0===h?void 0:h.childNodes[0],0),g.setEnd(null===h||void 0===h?void 0:h.childNodes[h.childNodes.length-1],h.childNodes[h.childNodes.length-1].length)),Me(g,f)}}function Me(e,t){t.appendChild(e.extractContents()),e.insertNode(t)}function Ue(e,t,n,o){if("back"===e){if(1===t)return;n((function(e){return e-1}))}if("go"===e){if(t===o)return;n((function(e){return e+1}))}}var Ae=n(3239);var Fe=function(e){var t=(0,h.TH)().state,n=t.pdfIdx,o=t.recentlyReadPage,r=(0,d.useState)(""),l=(0,c.Z)(r,2),g=l[0],f=l[1],p=(0,d.useState)(!0),m=(0,c.Z)(p,2),x=m[0],v=m[1],y=(0,d.useState)(-1),_=(0,c.Z)(y,2),k=_[0],N=_[1],S=(0,d.useState)({}),w=(0,c.Z)(S,2),b=w[0],I=w[1],j=(0,d.useState)([]),Z=(0,c.Z)(j,2),B=Z[0],C=Z[1],E=(0,d.useState)(!1),R=(0,c.Z)(E,2),H=R[0],O=R[1],T=(0,d.useState)(0),D=(0,c.Z)(T,2),M=D[0],U=D[1],A=(0,d.useState)(-1),F=(0,c.Z)(A,2),q=F[0],Y=F[1],V=(0,d.useRef)(),z=(0,d.useRef)(),K=(0,d.useRef)(),W=(0,d.useRef)(),Q=(0,d.useState)(o),$=(0,c.Z)(Q,2),ee=$[0],te=$[1],ne=(0,d.useState)({}),oe=(0,c.Z)(ne,2),re=oe[0],ie=oe[1];return console.log("------------",n),(0,d.useEffect)((function(){u().get("https://inkyuoh.shop/users/".concat(58,"/pdfs")).then((function(e){console.log("TotalPage GET response:",e);var t=e.data.result.find((function(e){return e.pdfIdx===n}));ie(t)})).catch((function(e){console.log("TotalPage GET Fail, error:",e)}))}),[n]),(0,d.useEffect)((function(){if(-1===q){var e=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){var t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u().get("https://inkyuoh.shop/pdfs/".concat(n,"/pages/").concat(ee)).then((function(e){return e.data.result.pageLink}));case 2:return t=e.sent,e.next=5,u().get("".concat(t)).then((function(e){f(e.data)}));case 5:return e.sent,e.next=8,u().get("https://inkyuoh.shop/highlights/pdfs/".concat(n,"/pages/").concat(ee)).then((function(e){C(e.data.result)}));case 8:e.sent;case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}if(1===q){var t=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){var t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u().get("https://inkyuoh.shop/pdfs/".concat(n,"/pages/").concat(ee)).then((function(e){return e.data.result.pageLink}));case 2:return t=e.sent,e.next=5,u().get("".concat(t)).then((function(e){f(e.data)}));case 5:return e.sent,e.next=8,u().get("https://inkyuoh.shop/highlights/pages/".concat(ee,"/commitIdx/").concat(k)).then((function(e){C(e.data.result)}));case 8:e.sent;case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();t()}}),[ee,e.mode,k,M]),(0,d.useEffect)((function(){f((0,i.Z)({},g)),-1!==k&&u().post("https://inkyuoh.shop/commits/books/2/2",{commitIdx:k}).then((function(e){return JSON.parse(e.data.result[0].editorLog)})).then((function(e){console.log("Text Editor markdownValue response:",e),I(e)}))}),[k,M]),(0,d.useEffect)((function(){try{for(var e=0;e<B.length;e++)De(B[e],B[e].highlightIdx)}catch(t){}}),[B,k,M,q]),(0,d.useEffect)((function(){function e(e){var t=V.current;setTimeout((function(){if(0!=window.getSelection().toString().trim()){var n=e.pageX,o=e.pageY,r=Number(getComputedStyle(t).width.slice(0,-2)),i=Number(getComputedStyle(t).width.slice(0,-2));t.style.left="".concat(n-.5*r,"px"),t.style.top="".concat(o-1*i,"px"),t.style.display="flex",t.classList.add("btnEntrance")}}),0)}var t=document.querySelectorAll(".PersonalReading__mainPage--readingPage");function n(e){var t=V.current;"flex"===t.style.display&&!1===e.target.classList.contains("specific")&&(t.style.display="none",t.classList.remove("btnEntrance"),window.getSelection().empty())}return null===t||void 0===t||t.forEach((function(t){-1===q&&(null===t||void 0===t||t.addEventListener("mouseup",e),null===t||void 0===t||t.addEventListener("touchend",e,!1))})),document.addEventListener("mousedown",n),document.addEventListener("touchstart",n,!1),document.querySelectorAll(".c").forEach((function(e){e.style.height="110%"})),document.querySelectorAll(".t").forEach((function(e){e.style.height="2.1em"})),function(){null===t||void 0===t||t.forEach((function(t){null===t||void 0===t||t.removeEventListener("mouseup",e),null===t||void 0===t||t.removeEventListener("touchend",e)})),document.removeEventListener("mousedown",n),document.removeEventListener("touchstart",n)}}),[g]),console.log("commitIdx",k),(0,P.jsxs)("main",{className:"PersonalReading",children:[H&&(0,P.jsx)(Ae.Z,{className:"CircularProgress"}),(0,P.jsxs)("div",{ref:V,className:"HighlightButton__wrap",children:[(0,P.jsx)("button",{ref:z,className:"HighlightButton specific",onTouchStart:function(e){Te(n,ee,V,x,v,"highlightedGreen",e)},onClick:function(){Te(n,ee,V,x,v,"highlightedGreen")}}),(0,P.jsx)("button",{ref:K,className:"HighlightButton__purple specific",onTouchStart:function(e){Te(n,ee,V,x,v,"highlightedPurple",e)},onClick:function(){Te(n,ee,V,x,v,"highlightedPurple")}}),(0,P.jsx)("button",{ref:W,className:"HighlightButton__yellow specific",onTouchStart:function(e){Te(n,ee,V,x,v,"highlightedYellow",e)},onClick:function(){Te(n,ee,V,x,v,"highlightedYellow")}})]}),(0,P.jsxs)("div",{className:"PersonalReading__container",style:!0===H?{opacity:.8}:null,children:[(0,P.jsx)("aside",{className:"PersonalReading__sideBar",children:(0,P.jsx)(Ee,{readOnly:q,setReadOnly:Y,forceUpdate:M,setForceUpdate:U,commitIdx:k,setCommitIdx:N,currentBookInfo:re})}),(0,P.jsxs)("div",{className:"PersonalReading__mainPage",style:!0===e.mode?{flex:3}:{flex:1},children:[!0===e.mode?(0,P.jsxs)("article",{className:"PersonalReading__mainPage--readingPage",style:!0===e.mode?{flex:2}:{flex:0},children:[(0,P.jsx)(G,{className:"PageRendered",html:g}),(0,P.jsxs)("div",{className:"PersonalReading__mainPage--goBackButtons",children:[(0,P.jsx)(X.G,{icon:J.Uu6,className:"backButton",onClick:function(){Ue("back",ee,te,re.totalPage)}}),(0,P.jsx)(X.G,{icon:J.I4f,className:"goButton",onClick:function(){Ue("go",ee,te,re.totalPage)}})]}),(0,P.jsx)("div",{className:"PersonalReading__mainPage--info",children:(0,P.jsxs)("p",{children:[(0,P.jsx)("input",{className:"PersonalReading__mainPage--info--input",placeholder:ee,onKeyUp:function(e){e.preventDefault(),13===window.event.keyCode&&1<=e.target.value&&e.target.value<=re.totalPage&&(te(Number(e.target.value)),e.target.value=null)}})," / ",re.totalPage]})})]}):null,(0,P.jsxs)("aside",{className:"PersonalReading__highlightList",style:(e.mode,{flex:1}),children:[(0,P.jsx)(ce,{readOnly:q,forceUpdate:M,setForceUpdate:U,mode:e.mode,setCurrentPageNumber:te,commitIdx:k,setCommitIdx:N,pdfIdx:n,totalPage:re.totalPage,currentPageNumber:ee,updateHighlightList:x,setUpdateHighlightList:v}),!1===e.mode?(0,P.jsxs)("div",{className:"PersonalReading__highlightList--goBackButtons",children:[(0,P.jsx)(X.G,{icon:J.Uu6,className:"backButton--highlightList",onClick:function(){Ue("back",ee,te,re.totalPage)}}),(0,P.jsx)(X.G,{icon:J.I4f,className:"goButton--highlightList",onClick:function(){Ue("go",ee,te,re.totalPage)}})]}):null]})]}),(0,P.jsxs)("article",{className:"PersonalReading__mainPage--textEditor",style:(e.mode,{flex:1}),children:[(0,P.jsxs)("div",{className:"PersonalReading__mainPage--textEditor--wrap",children:[(0,P.jsxs)("div",{className:"PersonalReading__mainPage--textEditor--info",children:[(0,P.jsx)("h1",{children:re.pdfName}),(0,P.jsx)("p",{children:re.author})]}),(0,P.jsx)(X.G,{className:"ToPdfButton",icon:J.gSj,onClick:function(){O(!0),setTimeout((function(){!function(e){var t,n,o,r;null===(t=document.querySelector(".editor"))||void 0===t||t.setAttribute("style","overflow: visible !important"),null===(n=document.querySelector(".editor"))||void 0===n||n.setAttribute("style","height: auto !important"),He()(document.querySelector(".editor")).then((function(t){var n=t.toDataURL("image/png"),o=180,r=1.414*o,i=t.height*o/t.width,a=i,s=new Oe.ZP("p","mm","a4"),c=0;for(s.addImage(n,"PNG",20,c,o,i),a-=r;a>=0;)c=a-i,s.addPage(),s.addImage(n,"PNG",20,c,o,i),a-=r;s.save("".concat(e,".pdf"))})),null===(o=document.querySelector(".editor"))||void 0===o||o.setAttribute("style","overflow: scroll !important"),null===(r=document.querySelector(".editor"))||void 0===r||r.setAttribute("style","height: 100% !important")}(re.pdfName),setTimeout((function(){O(!1)}),500)}),100)}})]}),(0,P.jsx)(L,{readOnly:q,markdownValue:b,commitIdx:k,userIdx:String(58),pdfIdx:String(n)})]})]})]})}}}]);
//# sourceMappingURL=891.b47cbe50.chunk.js.map