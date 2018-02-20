// 导入vue
import Vue from 'vue'

// 导入 axios
import axios from 'axios'

// 导入layout组件
const layout = () => import('./components/layout.vue')
// 导入 goodslist (商品列表) 组件
const goodslist = () => import('./components/goods/goodslist.vue')
// 导入 goodsinfo (商品详细) 组件
const goodsinfo = () => import('./components/goods/goodsinfo.vue')
// 导入 buycart (购物车) 组件
const buycart = () => import('./components/buycart/buycart.vue')
// 导入 login (登录) 组件
const login = () => import('./components/account/login.vue')
// 导入 placeorder (下订单) 组件
const placeorder = () => import('./components/order/placeorder.vue')
// 导入 payinfo (支付中心) 组件
const payinfo = () => import('./components/pay/payinfo.vue')
// 导入 accomplish (支付完成) 组件
const accomplishPay = () => import('./components/pay/accomplishPay.vue')
// 导入 vipcenter (会员中心) 组件
const vipcenter = () => import('./components/vip/vipcenter.vue')
// 导入 viporderlist (会员订单列表) 组件
const viporderlist = () => import('./components/vip/viporderlist.vue')
// 导入 orderinfo (订单详细) 组件
const orderinfo = () => import('./components/order/orderinfo.vue')


// 导入 vue-router
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 配置路由规则
export const router = new VueRouter({
	routes: [
		{
			path: '/', redirect: '/site/goodslist'
		},
		{
			path: '/site', component: layout, children: [
				{
					path: 'goodslist', component: goodslist
				},
				{
					path: 'goodsinfo/:goodsId', component: goodsinfo
				},
				{
					path: 'buycart', component: buycart
				},
				{
					path: 'login', component: login
				},
				// 以下为需要登录的组件
				{
					path: 'placeorder/:goodsIds', component: placeorder, meta: {needLogin: true}
				},
				{
					path: 'payinfo/:orderId', component: payinfo, meta: {needLogin: true}
				},
				{
					path: 'accomplishPay', component: accomplishPay, meta: {needLogin: true}
				},
				{
					path: 'vipcenter', component: vipcenter, meta: {needLogin: true}
				},
				{
					path: 'viporderlist', component: viporderlist, meta: {needLogin: true}
				},
				{
					path: 'orderinfo/:orderId', component: orderinfo, meta: {needLogin: true}
				}
			]
		}
	]
})

// 配置路由守卫
router.beforeEach((to, from, next) => {
	// 保存跳转到登录的最后一个路径
	if (to.path !== '/site/login') {
		localStorage.setItem('lastPath', to.path)
	}
	// 判断是否需要登录
	if (to.meta.needLogin) {
		// 验证是否有登录
		const url = `site/account/islogin`
		axios.get(url).then(response => {
			if (response.data.code === 'logined') {
				next()
			} else {
				router.push({path: '/site/login'})
			}
		})
	} else {
		next()
	}
})