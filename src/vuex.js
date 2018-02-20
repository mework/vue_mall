// 导入vue
import Vue from 'vue'


// 导入 handleLocalData (本地操作数据)
import {getLocalData, getTotalNum, addLocalData, removeLocalDataById, removeLocalDataByIds, updateLocalDataByObj} from './components/common/handleLocalData.js'

// 导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 配置vuex
export const store = new Vuex.Store({
	state: {
		buycount: 0
	},
	getters: {
		getBuyCount: state => {
			if (state.buycount <= 0) {
				return getTotalNum()
			} else {
				return state.buycount
			}
		}
	},
	mutations: {
		// 添加本地数据
		addLocalData (state, goodsObj) {
			state.buycount = addLocalData(goodsObj)
		},
		// 通过id删除本地数据
		deleteLocalDataById (state, goodsId) {
			state.buycount = removeLocalDataById(goodsId)
		},
		// 通过ids删除本地数据
		deleteLocalDataByIds (state, goodsIds) {
			state.buycount = removeLocalDataByIds(goodsIds)
		},
		// 通过传过来的对象更改本地数据 
		updateLocalData (state, goodsObj) {
			state.buycount = updateLocalDataByObj(goodsObj)
		}
	}
})