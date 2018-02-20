<template>
<div>
	<div class="section">
		<div class="location">
			<span>当前位置：</span>
			<a href="/index.html">首页</a> &gt;
			<a href="/cart.html">购物车</a>
		</div>
	</div>

	<div class="section">
		<div class="wrapper">
			<div class="bg-wrap">
				<!--购物车头部-->
				<div class="cart-head clearfix">
					<h2>
						<i class="iconfont icon-cart"></i>我的购物车</h2>
					<div class="cart-setp">
						<ul>
							<li class="first active">
								<div class="progress" style="text-align: center">
									<span>1</span>
									放进购物车
								</div>
							</li>
							<li>
								<div class="progress" style="text-align: center">
									<span>2</span>
									填写订单信息
								</div>
							</li>
							<li class="last">
								<div class="progress" style="text-align: center">
									<span>3</span>
									支付/确认订单
								</div>
							</li>
						</ul>
					</div>
				</div>
				<!--购物车头部-->
				<!--商品列表-->
				<div class="cart-box">
					<input id="jsondata" name="jsondata" type="hidden">
					<table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
						<tbody>
							<tr>
								<th width="48" align="center">
									<a>选择</a>
								</th>
								<th align="left" colspan="2">商品信息</th>
								<th width="84" align="left">单价</th>
								<th width="104" align="center">数量</th>
								<th width="104" align="left">金额(元)</th>
								<th width="54" align="center">操作</th>
							</tr>
							<tr v-for="item in goodsList" :key="item.id">
								<td width="48" align="center">
									<el-switch v-model="item.isSelect"></el-switch>
								</td>
								<td align="left" colspan="2">
									<img style="vertical-align: middle" width="50" height="50" :src="item.img_url" alt="">
									<span style="vertical-align: middle; padding-left: 20px">{{item.title}}</span>
								</td>
								<td width="84" align="left">{{item.sell_price}}</td>
								<td width="104" align="center">
									<inputNum v-on:totalBuyCount="computBuyCount" :goodsId="item.id" :goodsBuyCount="item.buycount"></inputNum>
									<!-- {{item.buycount}} -->
								</td>
								<td width="104" align="left">{{item.buycount * item.sell_price}}</td>
								<td width="54" align="center">
									<a href="javascript:;" @click="removeGoods(item.id)">删除</a>
								</td>
							</tr>
							<tr v-if="goodsList.length <= 0">
								<td colspan="10">
									<div class="msg-tips">
										<div class="icon warning">
											<i class="iconfont icon-tip"></i>
										</div>
										<div class="info">
											<strong>购物车没有商品！</strong>
											<p>您的购物车为空，
												<a href="/index.html">马上去购物</a>吧！</p>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th align="right" colspan="8">
									已选择商品
									<b class="red" id="totalQuantity">{{getGoodsTotalNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
									<span class="red">￥</span>
									<b class="red" id="totalAmount">{{getGoodsTotalCost}}</b>元
								</th>
							</tr>
						</tbody>
					</table>
				</div>
				<!--/商品列表-->
				<!--购物车底部-->
				<div class="cart-foot clearfix">
					<div class="right-box">
						<el-button @click="goToBuy" type="primary">继续购物</el-button>
						<el-button @click="goToClearing" type="success">立即结算</el-button>
					</div>
				</div>
				<!--购物车底部-->
			</div>
		</div>
	</div>
</div>
</template>

<script>
// 导入本地数据查询
import {getLocalData} from '../common/handleLocalData.js'

// 导入子组件
import inputNum from '../subComponents/inputNum.vue'

export default {
	data () {
		return {
			goodsList: []		// 购买商品列表
		}
	},
	created () {
		this.getGoodsList()
	},
	computed : {
		// 获取商品总件数
		getGoodsTotalNum () {
			let totalNum = 0
			this.goodsList.forEach(item => {
				if (item.isSelect) {
					totalNum += item.buycount
				}
			})
			return totalNum
		},
		// 获取商品总金额
		getGoodsTotalCost () {
			let totalCost = 0
			this.goodsList.forEach(item => {
				if (item.isSelect) {
					totalCost += item.buycount * item.sell_price
				}
			})
			return totalCost
		}
	},
	methods: {
		// 获取商品列表
		getGoodsList () {
			const localData = getLocalData()
			if (JSON.stringify(localData) === '{}') {
				return
			}
			let ids = ''
			for (var item in localData) {
				ids += item
				ids += ','
			}
			ids = ids.substr(0, ids.length - 1)
			const url = `site/comment/getshopcargoods/${ids}`
			this.$axios.get(url).then(response => {
				response.data.message.forEach(item => {
					// 添加开关属性
					item.isSelect = true

					// 添加总数量
					item.buycount = localData[item.id]
				})
				this.goodsList = response.data.message
			})
		},
		// 点击继续购物
		goToBuy () {
			this.$router.push({path: '/site/goodslist'})
		},
		// 变化购买的总数
		computBuyCount (subObj) {
			this.goodsList.forEach(item => {
				if (item.id === subObj.goodsId) {
					item.buycount = subObj.buycount
				}
			})
		},
		// 点击立即结算
		goToClearing () {
			if (this.goodsList.length <= 0) {
				this.$message.error('购物车列表为空')
				return
			}
			let ids = ''
			this.goodsList.forEach(item => {
				if (item.isSelect) {
					ids += item.id
					ids += ','
				}
			})
			ids = ids.substr(0, ids.length - 1)
			this.$router.push({path: `/site/placeorder/${ids}`})
		},
		// 删除购物车商品
		removeGoods (goodsId) {
			this.$confirm('是否从购物车删除此商品?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$message({
					type: 'success',
					message: '删除成功!'
				});

				this.$store.commit('deleteLocalDataById', goodsId)
				this.getGoodsList()
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		}
	},
	components: {
		inputNum
	}
}
</script>
