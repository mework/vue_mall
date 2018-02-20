// 导入vue
import Vue from 'vue'
// 导入根组件
import App from './App.vue'
// 导入路由组件
import {router} from './router.js'
// 导入element-ui
import './ElementUI.js'
// 导入vuex组件
import {store} from './vuex.js'
// 导入vue_plugins 组件
import './vue_plugins.js'

// 导入全局css样式
import './statics/site/css/style.css'

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
