webpackJsonp([7],{337:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(353),r=s(383),i=s(194),l=Object(i.a)(a.a,r.a,r.b,!1,null,null,null);l.options.__file="src\\components\\order\\placeorder.vue",e.default=l.exports},353:function(t,e,s){"use strict";var a=s(196),r=s.n(a),i=s(195);e.a={data:function(){return{goodsList:[],ruleForm:{accept_name:"张三",area:{province:{code:"440000",value:"广东省"},city:{code:"440000",value:"深圳市"},area:{code:"440000",value:"宝安区"}},address:"地王大厦",mobile:"13800138000",email:"123@qq.com",post_code:"518112",payment_id:"6",express_id:"1",goodsAmount:0,expressMoment:0,message:"请尽快发货",goodsids:null,cargoodsobj:{}},rules:{accept_name:[{required:!0,message:"请输入收货人姓名",trigger:"blur"}],area:[{required:!0,message:"请选择所在地区",trigger:"blur"}],address:[{required:!0,message:"请输入详细地址",trigger:"blur"}],mobile:[{required:!0,message:"请输入手机号码",trigger:"blur"}]}}},components:{VDistpicker:r.a},created:function(){this.getGoodsList()},computed:{getGoodsTotalNum:function(){var t=0;return this.goodsList.forEach(function(e){t+=e.buycount}),t},getGoodsTotalCost:function(){var t=0;return this.goodsList.forEach(function(e){t+=e.buycount*e.sell_price}),this.ruleForm.goodsAmount=t,t},getExpressCost:function(){var t=0;switch(this.ruleForm.express_id){case"1":t=20;break;case"2":t=10;break;case"3":t=8}return this.ruleForm.expressMoment=t,t}},methods:{getGoodsList:function(){var t=this;this.ruleForm.goodsids=this.$route.params.goodsIds;var e={},s=Object(i.b)(),a="site/validate/order/getgoodslist/"+this.$route.params.goodsIds;this.$axios.get(a).then(function(a){a.data.message.forEach(function(t){t.buycount=s[t.id],e[t.id]=t.buycount}),t.goodsList=a.data.message,t.ruleForm.cargoodsobj=e})},goToBuyCart:function(){this.$router.push({path:"/site/buycart"})},affirmSubmit:function(){var t=this;this.$axios.post("site/validate/order/setorder",this.ruleForm).then(function(e){if(1===e.data.status)t.$message.error(e.data.message);else{var s=t.ruleForm.goodsids;t.$store.commit("deleteLocalDataByIds",s),t.$router.push({path:"/site/payinfo/"+e.data.message.orderid})}})}}}},383:function(t,e,s){"use strict";s.d(e,"a",function(){return a}),s.d(e,"b",function(){return r});var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._m(0),t._v(" "),s("div",{staticClass:"section"},[s("div",{staticClass:"wrapper"},[s("div",{staticClass:"bg-wrap"},[t._m(1),t._v(" "),s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",staticStyle:{"padding-left":"50px"},attrs:{model:t.ruleForm,rules:t.rules,"label-width":"150px"}},[s("h2",{staticClass:"slide-tit"},[s("span",[t._v("1、收货地址")])]),t._v(" "),s("div",{attrs:{id:"orderForm",name:"orderForm",url:""}},[s("div",{staticClass:"form-box address-info"},[s("dl",{staticClass:"form-group"},[s("el-form-item",{attrs:{label:"收货人姓名：",prop:"accept_name"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.ruleForm.accept_name,callback:function(e){t.$set(t.ruleForm,"accept_name",e)},expression:"ruleForm.accept_name"}})],1)],1),t._v(" "),s("dl",{staticClass:"form-group"},[s("el-form-item",{attrs:{label:"所属地区：",prop:"area"}},[s("v-distpicker",{attrs:{province:t.ruleForm.area.province.value,city:t.ruleForm.area.city.value,area:t.ruleForm.area.area.value}})],1)],1),t._v(" "),s("dl",{staticClass:"form-group"},[s("el-form-item",{attrs:{label:"详细地址：",prop:"address"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.ruleForm.address,callback:function(e){t.$set(t.ruleForm,"address",e)},expression:"ruleForm.address"}})],1)],1),t._v(" "),s("dl",{staticClass:"form-group"},[s("el-form-item",{attrs:{label:"手机号码：",prop:"mobile"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.ruleForm.mobile,callback:function(e){t.$set(t.ruleForm,"mobile",e)},expression:"ruleForm.mobile"}})],1)],1),t._v(" "),s("dl",{staticClass:"form-group"},[s("el-form-item",{attrs:{label:"电子邮箱："}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.ruleForm.email,callback:function(e){t.$set(t.ruleForm,"email",e)},expression:"ruleForm.email"}})],1)],1),t._v(" "),s("dl",{staticClass:"form-group"},[s("el-form-item",{attrs:{label:"邮政编码："}},[s("el-input",{staticStyle:{width:"200px"},model:{value:t.ruleForm.post_code,callback:function(e){t.$set(t.ruleForm,"post_code",e)},expression:"ruleForm.post_code"}})],1)],1)]),t._v(" "),s("h2",{staticClass:"slide-tit"},[s("span",[t._v("2、支付方式")])]),t._v(" "),s("ul",{staticClass:"item-box clearfix"},[s("li",[s("label",[s("el-radio",{attrs:{label:"6"},model:{value:t.ruleForm.payment_id,callback:function(e){t.$set(t.ruleForm,"payment_id",e)},expression:"ruleForm.payment_id"}},[t._v("在线支付")]),t._v(" "),s("em",[t._v("手续费：0.00元")])],1)])]),t._v(" "),s("h2",{staticClass:"slide-tit"},[s("span",[t._v("3、配送方式")])]),t._v(" "),s("ul",{staticClass:"item-box clearfix"},[s("li",[s("el-radio-group",{model:{value:t.ruleForm.express_id,callback:function(e){t.$set(t.ruleForm,"express_id",e)},expression:"ruleForm.express_id"}},[s("el-radio",{attrs:{label:"1"}},[t._v("顺丰快递   "),s("em",[t._v("费用：20.00")])]),t._v(" "),s("el-radio",{attrs:{label:"2"}},[t._v("圆通快递   "),s("em",[t._v("费用：10.00")])]),t._v(" "),s("el-radio",{attrs:{label:"3"}},[t._v("韵达快递   "),s("em",[t._v("费用：8.00")])])],1)],1)]),t._v(" "),s("h2",{staticClass:"slide-tit"},[s("span",[t._v("4、商品清单")])]),t._v(" "),s("div",{staticClass:"line15"}),t._v(" "),s("table",{staticClass:"cart-table",attrs:{width:"100%",border:"0",align:"center",cellpadding:"8",cellspacing:"0"}},[s("tbody",[s("tr",[s("th",{attrs:{colspan:"2",align:"left"}},[t._v("商品信息")]),t._v(" "),s("th",{attrs:{width:"84",align:"left"}},[t._v("单价")]),t._v(" "),s("th",{attrs:{width:"84",align:"center"}},[t._v("购买数量")]),t._v(" "),s("th",{attrs:{width:"104",align:"left"}},[t._v("金额(元)")])]),t._v(" "),t._l(t.goodsList,function(e){return s("tr",{key:e.id},[s("td",{staticStyle:{"padding-left":"20px"},attrs:{width:"68"}},[s("a",{attrs:{target:"_blank",href:"/goods/show-89.html"}},[s("img",{staticClass:"img",attrs:{width:"50",height:"50",src:e.img_url}})])]),t._v(" "),s("td",[s("a",{attrs:{target:"_blank",href:"/goods/show-89.html"}},[t._v(t._s(e.title))])]),t._v(" "),s("td",[s("span",{staticClass:"red"},[t._v("\r\n\t\t\t\t\t\t\t\t\t\t\t￥"+t._s(e.sell_price)+".00\r\n\t\t\t\t\t\t\t\t\t\t")])]),t._v(" "),s("td",{attrs:{align:"center"}},[t._v(t._s(e.buycount))]),t._v(" "),s("td",[s("span",{staticClass:"red"},[t._v("\r\n\t\t\t\t\t\t\t\t\t\t\t￥"+t._s(e.buycount*e.sell_price)+".00\r\n\t\t\t\t\t\t\t\t\t\t")])])])})],2)]),t._v(" "),s("div",{staticClass:"line15"}),t._v(" "),s("h2",{staticClass:"slide-tit"},[s("span",[t._v("5、结算信息")])]),t._v(" "),s("div",{staticClass:"buy-foot clearfix"},[s("div",{staticClass:"left-box"},[s("dl",[s("dt",[t._v("订单备注(100字符以内)")]),t._v(" "),s("dd",[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.ruleForm.message,expression:"ruleForm.message"}],staticClass:"input",staticStyle:{height:"35px"},attrs:{name:"message"},domProps:{value:t.ruleForm.message},on:{input:function(e){e.target.composing||t.$set(t.ruleForm,"message",e.target.value)}}})])])]),t._v(" "),s("div",{staticClass:"right-box"},[s("p",[t._v("\r\n\t\t\t\t\t\t\t\t\t商品\r\n\t\t\t\t\t\t\t\t\t"),s("label",{staticClass:"price"},[t._v(t._s(t.getGoodsTotalNum))]),t._v(" 件     商品金额：￥\r\n\t\t\t\t\t\t\t\t\t"),s("label",{staticClass:"price",attrs:{id:"goodsAmount"}},[t._v(t._s(t.getGoodsTotalCost)+".00")]),t._v(" 元    \r\n\t\t\t\t\t\t\t\t")]),t._v(" "),s("p",[t._v("\r\n\t\t\t\t\t\t\t\t\t运费：￥\r\n\t\t\t\t\t\t\t\t\t"),s("label",{staticClass:"price",attrs:{id:"expressFee"}},[t._v(t._s(t.getExpressCost)+".00")]),t._v(" 元    \r\n\t\t\t\t\t\t\t\t")]),t._v(" "),s("p",{staticClass:"txt-box"},[t._v("\r\n\t\t\t\t\t\t\t\t\t应付总金额：￥\r\n\t\t\t\t\t\t\t\t\t"),s("label",{staticClass:"price",attrs:{id:"totalAmount"}},[t._v(t._s(t.getExpressCost+t.getGoodsTotalCost)+".00")]),t._v("   \r\n\t\t\t\t\t\t\t\t")]),t._v(" "),s("p",{staticClass:"btn-box"},[s("el-button",{attrs:{type:"primary"},on:{click:t.goToBuyCart}},[t._v("返回购物车")]),t._v(" "),s("el-button",{attrs:{type:"success"},on:{click:t.affirmSubmit}},[t._v("确认提交")]),t._v("   \r\n\t\t\t\t\t\t\t\t")],1)])])])])],1)])])])},r=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"section"},[s("div",{staticClass:"location"},[s("span",[t._v("当前位置：")]),t._v(" "),s("a",{attrs:{href:"/index.html"}},[t._v("首页")]),t._v(" >\r\n\t\t\t"),s("a",{attrs:{href:"/cart.html"}},[t._v("购物车")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"cart-head clearfix"},[s("h2",[s("i",{staticClass:"iconfont icon-cart"}),t._v("我的购物车")]),t._v(" "),s("div",{staticClass:"cart-setp"},[s("ul",[s("li",{staticClass:"first active"},[s("div",{staticClass:"progress",staticStyle:{"text-align":"center"}},[s("span",[t._v("1")]),t._v("\r\n\t\t\t\t\t\t\t\t\t放进购物车\r\n\t\t\t\t\t\t\t\t")])]),t._v(" "),s("li",{staticClass:"active"},[s("div",{staticClass:"progress",staticStyle:{"text-align":"center"}},[s("span",[t._v("2")]),t._v("\r\n\t\t\t\t\t\t\t\t\t填写订单信息\r\n\t\t\t\t\t\t\t\t")])]),t._v(" "),s("li",{staticClass:"last"},[s("div",{staticClass:"progress",staticStyle:{"text-align":"center"}},[s("span",[t._v("3")]),t._v("\r\n\t\t\t\t\t\t\t\t\t支付/确认订单\r\n\t\t\t\t\t\t\t\t")])])])])])}];a._withStripped=!0}});