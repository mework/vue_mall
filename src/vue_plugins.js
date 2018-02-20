// 导入vue
import Vue from 'vue'

// 导入vue-lazyload
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    loading: './statics/site/images/load.gif'
})

// 导入 axios
import axios from 'axios'
// 配置 axios
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://39.108.135.214:8899/'
axios.defaults.withCredentials = true


// 导入 moment
import moment from 'moment'
// 配置全局过滤器
Vue.filter('timeFmt', (value, formatStr = 'YYYY-MM-DD') => {
	return moment(value).format(formatStr)
})


// 导入 jquery
import $ from 'jquery'