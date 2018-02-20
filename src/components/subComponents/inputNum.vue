<template>
<div>
	<span @click="subBuyCount">-</span>
	<input type="text" v-model="buycount">
	<span @click="addBuyCount">+</span>
</div>
</template>

<style scoped>
span, input {
	display: inline-block;
	vertical-align: middle;
	width: 30px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	border: 1px solid rgba(0, 0, 0, .3);
}

span {
	cursor: pointer;
}
</style>


<script>
export default {
	data () {
		return {
			buycount: 1
		}
	},
	props: ['goodsBuyCount', 'goodsId'],
	created () {
		this.getBuyCount()
	},
	methods: {
		// 从父组件中获取值给子组件
		getBuyCount () {
			this.buycount = this.goodsBuyCount
		},
		// 添加总数量
		addBuyCount () {
			this.buycount += 1
			this.updateBuyCount()
		},
		// 减少总数量
		subBuyCount () {
			if (this.buycount > 1) {
				this.buycount -= 1
				this.updateBuyCount()
			}
		},
		// 当更改总数量需进行的操作
		updateBuyCount () {
			let subObj = {
				buycount: this.buycount,
				goodsId: this.goodsId
			}
			// 更改购物车的数组
			this.$emit('totalBuyCount', subObj)

			// 更改本地数据
			this.$store.commit('updateLocalData', subObj)
		}
	}
}
</script>
