(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{20:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var o=t(15),a=t.n(o),c=t(3),r=t(1),i=(t(20),t(0)),u=function(e){var n=e.onChange,t=e.value,o=e.text;return Object(i.jsxs)("div",{children:[o,": ",Object(i.jsx)("input",{onChange:n,value:t})]})},s=function(e){var n=e.onChange,t=e.value,o=e.text;return Object(i.jsx)(i.Fragment,{children:Object(i.jsx)(u,{onChange:n,value:t,text:o})})},d=function(e){var n=e.text,t=e.type,o=e.onClick;return Object(i.jsx)(i.Fragment,{children:Object(i.jsx)("button",{type:t,onClick:o,children:n})})},l=function(e){var n=e.notificationType,t=e.notificationMessage;return t?Object(i.jsx)("div",{className:n,children:t}):null},h=function(e){var n=e.handleNameChange,t=e.handlePhoneChange,o=e.newName,a=e.newPhone,c=e.addPerson,r=e.notificationMessage,s=e.notificationType;return Object(i.jsxs)("div",{children:[Object(i.jsx)(l,{notificationMessage:r,notificationType:s}),Object(i.jsx)("h2",{children:"add new"}),Object(i.jsxs)("form",{onSubmit:c,children:[Object(i.jsx)(u,{onChange:n,text:"name",value:o}),Object(i.jsx)(u,{onChange:t,text:"number",value:a}),Object(i.jsx)(d,{type:"submit",text:"add"})]})]})},b=function(e){var n=e.persons,t=e.handleDelete;return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Numbers"}),n.map((function(e){return Object(i.jsxs)("div",{children:[e.name," ",e.number," ",Object(i.jsx)(d,{onClick:function(){return t(e)},type:"button",text:"Delete"})," "]},e.id)}))]})},f=t(4),j=t.n(f),m="/api/persons",O={getAll:function(){return j()({method:"GET",baseURL:m}).then((function(e){return e.data}))},addToPhonebook:function(e){return j()({method:"POST",baseURL:m,data:e}).then((function(e){return e.data}))},deletePerson:function(e){return j()({method:"DELETE",baseURL:"".concat(m,"/").concat(e.id)}).then((function(e){return e}))},updatePerson:function(e){return j()({method:"PUT",baseURL:m,data:e}).then((function(e){return e.data}))}},v=function(){var e=Object(r.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],a=Object(r.useState)(""),u=Object(c.a)(a,2),d=u[0],l=u[1],f=Object(r.useState)(""),j=Object(c.a)(f,2),m=j[0],v=j[1],x=Object(r.useState)(!1),g=Object(c.a)(x,2),p=g[0],w=g[1],C=Object(r.useState)(""),y=Object(c.a)(C,2),P=y[0],L=y[1],k=Object(r.useState)(null),T=Object(c.a)(k,2),S=T[0],E=T[1];Object(r.useEffect)((function(){O.getAll().then((function(e){o(e)}))}),[]);var D=function(e,n){return E({message:e,type:n}),setTimeout((function(){E(null)}),15e3)},N=p?t.filter((function(e){return e.name.toLocaleLowerCase().includes(P.toLocaleLowerCase())})):t;return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(s,{onChange:function(e){P.length?w(!0):w(!1),L(e.target.value)},text:"Filter shown with",value:P}),Object(i.jsx)(h,{addPerson:function(e){e.preventDefault();var n={name:d,number:m};if(n.name.length<3||n.number.length<8)D("name should be 3 characters min and number 8 characters min","error");else{var a=t.find((function(e){return e.name.toLocaleLowerCase()===n.name.toLocaleLowerCase()}));if(a)return n.id=a.id,void(window.confirm("".concat(d," is already added to phonebook, replace old number with a new one?"))&&O.updatePerson(n).then((function(e){e?(o(t.map((function(e){return e.id!==n.id?e:n}))),D("Entry successfully updated","success")):D("information of ".concat(d," has already been removed from server"),"error"),l(""),v("")})).catch((function(e){D(e.message,"error")})));O.addToPhonebook(n).then((function(e){return e.id?(o(t.concat(e)),D("Entery  for ".concat(n.name," successfully created"),"success"),l(""),void v("")):void D(e.message,"error")})).catch((function(e){return D("Something went wrong","error")}))}},handleNameChange:function(e){l(e.target.value)},handlePhoneChange:function(e){v(e.target.value)},newName:d,newPhone:m,notificationMessage:null===S||void 0===S?void 0:S.message,notificationType:null===S||void 0===S?void 0:S.type}),Object(i.jsx)(b,{persons:N,handleDelete:function(e){window.confirm("Delete ".concat(e.name,"?"))&&O.deletePerson(e).then((function(n){o(t.filter((function(n){return n.id!==e.id})))}))}})]})};a.a.render(Object(i.jsx)(v,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.a466d607.chunk.js.map