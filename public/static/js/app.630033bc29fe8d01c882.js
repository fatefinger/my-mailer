webpackJsonp([1],{23:function(e,t,n){"use strict";var a=n(2),l=n(94),i=n(90),o=n.n(i);a.default.use(l.a),t.a=new l.a({routes:[{path:"/",name:"conf",component:o.a}]})},36:function(e,t){},37:function(e,t){},38:function(e,t){},39:function(e,t){},40:function(e,t){},41:function(e,t){},42:function(e,t){},43:function(e,t){},44:function(e,t){},45:function(e,t){},46:function(e,t){},47:function(e,t){},48:function(e,t){},49:function(e,t){},50:function(e,t,n){function a(e){n(88)}var l=n(18)(n(73),n(91),a,null,null);e.exports=l.exports},72:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(42),l=(n.n(a),n(29)),i=n.n(l),o=n(48),s=(n.n(o),n(34)),r=n.n(s),u=n(39),c=(n.n(u),n(26)),m=n.n(c),d=n(49),f=(n.n(d),n(35)),p=n.n(f),v=n(46),b=(n.n(v),n(32)),g=n.n(b),_=n(47),h=(n.n(_),n(33)),y=n.n(h),F=n(43),x=(n.n(F),n(9)),w=n.n(x),S=n(40),k=(n.n(S),n(27)),M=n.n(k),j=n(41),V=(n.n(j),n(28)),$=n.n(V),O=n(44),P=(n.n(O),n(30)),q=n.n(P),z=n(38),A=(n.n(z),n(25)),C=n.n(A),D=n(37),E=(n.n(D),n(24)),R=n.n(E),T=n(45),L=(n.n(T),n(36)),J=(n.n(L),n(31)),W=n.n(J),B=n(2),G=n(50),H=n.n(G),I=n(23);B.default.use(W.a),B.default.use(R.a),B.default.use(C.a),B.default.use(q.a),B.default.use($.a),B.default.use(M.a),B.default.use(w.a),B.default.use(y.a),B.default.use(g.a),B.default.use(p.a),B.default.use(m.a),B.default.use(r.a),B.default.use(i.a),B.default.config.productionTip=!1,new B.default({el:"#app",router:I.a,template:"<App/>",components:{App:H.a}})},73:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"app"}},74:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"addMailer",data:function(){return{mailForm:{name:"",address:"",time:"",images:[]},rule:{name:[{required:!0,message:"请输入收件人名称",trigger:"submit"}],address:[{required:!0,message:"请输入收件人地址",trigger:"submit"},{type:"email",message:"请输入正确的邮箱格式",trigger:"submit"}],time:[{type:"date",required:!0,message:"请选择时间",trigger:"submit"}]}}},methods:{formatForm:function(e){return e.time&&(e.time=e.time.toLocaleTimeString()),e},initForm:function(){this.mailForm={name:"",address:"",time:"",images:[]}},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.$emit("on-success",t.formatForm(t.mailForm)),t.initForm()})},handleSuccess:function(e,t,n){console.log(t),console.log(e),console.log(n)},handleChange:function(e,t){console.log(e),console.log(t)}}}},75:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(89),l=n.n(a);t.default={components:{AddMailer:l.a},name:"conf",data:function(){return{tableData:[],dialogVisible:!1}},methods:{onSuccess:function(e){console.log(e),this.dialogVisible=!1,this.tableData.push(e)}}}},88:function(e,t){},89:function(e,t,n){var a=n(18)(n(74),n(93),null,null,null);e.exports=a.exports},90:function(e,t,n){var a=n(18)(n(75),n(92),null,null,null);e.exports=a.exports},91:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}},92:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"conf"}},[n("el-row",[n("el-col",{attrs:{span:24}},[n("h1",[e._v("my-mailer操作台")]),e._v(" "),n("el-row",{staticStyle:{"padding-bottom":"10px"},attrs:{gutter:20}},[n("el-col",{attrs:{span:4,offset:15}},[n("el-button",{attrs:{type:"primary",icon:"plus"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("新建任务")])],1)],1),e._v(" "),n("el-row",[n("el-col",{attrs:{span:18,offset:3}},[n("el-table",{attrs:{border:"",data:e.tableData}},[n("el-table-column",{attrs:{type:"index",width:"50"}}),e._v(" "),n("el-table-column",{attrs:{property:"name",label:"收件人姓名",width:"120"}}),e._v(" "),n("el-table-column",{attrs:{property:"address",label:"收件人地址","header-align":"left",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-icon",{attrs:{name:"message"}}),e._v(" "),n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.address))])]}}])}),e._v(" "),n("el-table-column",{attrs:{property:"time",label:"预约发送时间","header-align":"left",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-icon",{attrs:{name:"time"}}),e._v(" "),n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.time))])]}}])}),e._v(" "),n("el-table-column",{attrs:{property:"images",label:"图片列表"}})],1)],1)],1)],1)],1),e._v(" "),n("el-dialog",{attrs:{title:"新建任务",visible:e.dialogVisible,size:"tiny"},on:{"update:visible":function(t){e.dialogVisible=t}}},[n("add-mailer",{on:{"on-success":e.onSuccess}})],1)],1)},staticRenderFns:[]}},93:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"addMailer"}},[n("el-form",{ref:"mailForm",attrs:{labelWidth:"120px",model:e.mailForm,rules:e.rule}},[n("el-form-item",{attrs:{label:"收件人名称",prop:"name"}},[n("el-input",{model:{value:e.mailForm.name,callback:function(t){e.mailForm.name=t},expression:"mailForm.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"收件人地址",prop:"address"}},[n("el-input",{model:{value:e.mailForm.address,callback:function(t){e.mailForm.address=t},expression:"mailForm.address"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"预约发送时间",prop:"time"}},[n("el-time-picker",{staticStyle:{float:"left"},attrs:{placeholder:"选择发送时间点"},model:{value:e.mailForm.time,callback:function(t){e.mailForm.time=t},expression:"mailForm.time"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"上传图片",prop:"images"}},[n("el-upload",{staticStyle:{float:"left"},attrs:{action:"https://jsonplaceholder.typicode.com/posts/","on-success":e.handleSuccess,"on-change":e.handleChange,fileList:e.mailForm.images,listType:"picture"}},[n("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")]),e._v(" "),n("div",{staticClass:"el-upload__tip",slot:"tip"},[e._v("只能上传jpg/png文件")])],1)],1),e._v(" "),n("el-button",{staticStyle:{width:"80%"},attrs:{type:"primary",size:"large"},on:{click:function(t){e.submitForm("mailForm")}}},[e._v("\n      创建任务\n    ")])],1)],1)},staticRenderFns:[]}}},[72]);
//# sourceMappingURL=app.630033bc29fe8d01c882.js.map