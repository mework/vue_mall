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
							<li class="active">
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
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" style="padding-left: 50px">
					<h2 class="slide-tit">
						<span>1、收货地址</span>
					</h2>
					<div id="orderForm" name="orderForm" url="">
						<div class="form-box address-info">
							<dl class="form-group">
								<el-form-item label="收货人姓名：" prop="accept_name">
									<el-input v-model="ruleForm.accept_name" style="width: 500px"></el-input>
								</el-form-item>
							</dl>
							<dl class="form-group">
								<el-form-item label="所属地区：" prop="area">
								<v-distpicker :province="ruleForm.area.province.value" :city="ruleForm.area.city.value" :area="ruleForm.area.area.value"></v-distpicker>
								</el-form-item>
							</dl>
							<dl class="form-group">
								<el-form-item label="详细地址：" prop="address">
									<el-input v-model="ruleForm.address" style="width: 500px"></el-input>
								</el-form-item>
							</dl>
							<dl class="form-group">
								<el-form-item label="手机号码：" prop="mobile">
									<el-input v-model="ruleForm.mobile" style="width: 500px"></el-input>
								</el-form-item>
							</dl>
							<dl class="form-group">
								<el-form-item label="电子邮箱：">
									<el-input v-model="ruleForm.email" style="width: 500px"></el-input>
								</el-form-item>
							</dl>
							<dl class="form-group">
								<el-form-item label="邮政编码：">
									<el-input v-model="ruleForm.post_code" style="width: 200px"></el-input>
								</el-form-item>
							</dl>
						</div>
						<h2 class="slide-tit">
							<span>2、支付方式</span>
						</h2>
						<ul class="item-box clearfix">
							<!--取得一个DataTable-->
							<li>
								<label>
									<el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>
									<em>手续费：0.00元</em>
								</label>
							</li>
						</ul>
						<h2 class="slide-tit">
							<span>3、配送方式</span>
						</h2>
						<ul class="item-box clearfix">
							<!--取得一个DataTable-->
							<li>
								<el-radio-group v-model="ruleForm.express_id">
									<el-radio label="1">顺丰快递&nbsp;&nbsp;&nbsp;<em>费用：20.00</em> </el-radio>
									<el-radio label="2">圆通快递&nbsp;&nbsp;&nbsp;<em>费用：10.00</em> </el-radio>
									<el-radio label="3">韵达快递&nbsp;&nbsp;&nbsp;<em>费用：8.00</em> </el-radio>
								</el-radio-group>
							</li>
						</ul>
						<h2 class="slide-tit">
							<span>4、商品清单</span>
						</h2>
						<div class="line15"></div>
						<table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
							<tbody>
								<tr>
									<th colspan="2" align="left">商品信息</th>
									<th width="84" align="left">单价</th>
									<th width="84" align="center">购买数量</th>
									<th width="104" align="left">金额(元)</th>
								</tr>
								<tr v-for="item in goodsList" :key="item.id">
									<td width="68" style="padding-left: 20px">
										<a target="_blank" href="/goods/show-89.html">
											<img width="50" height="50" :src="item.img_url" class="img">
										</a>
									</td>
									<td>
										<a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
									</td>
									<td>
										<span class="red">
											￥{{item.sell_price}}.00
										</span>
									</td>
									<td align="center">{{item.buycount}}</td>
									<td>
										<span class="red">
											￥{{item.buycount * item.sell_price}}.00
										</span>
									</td>
								</tr>
							</tbody>
						</table>
						<div class="line15"></div>
						<h2 class="slide-tit">
							<span>5、结算信息</span>
						</h2>
						<div class="buy-foot clearfix">
							<div class="left-box">
								<dl>
									<dt>订单备注(100字符以内)</dt>
									<dd>
										<textarea name="message" v-model="ruleForm.message" class="input" style="height:35px;"></textarea>
									</dd>
								</dl>
							</div>
							<div class="right-box">
								<p>
									商品
									<label class="price">{{getGoodsTotalNum}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
									<label id="goodsAmount" class="price">{{getGoodsTotalCost}}.00</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
								</p>
								<p>
									运费：￥
									<label id="expressFee" class="price">{{getExpressCost}}.00</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
								</p>
								<p class="txt-box">
									应付总金额：￥
									<label id="totalAmount" class="price">{{getExpressCost + getGoodsTotalCost}}.00</label>&nbsp;&nbsp;&nbsp;
								</p>
								<p class="btn-box">
									<el-button @click="goToBuyCart" type="primary">返回购物车</el-button>
									<el-button @click="affirmSubmit" type="success">确认提交</el-button>&nbsp;&nbsp;&nbsp;
								</p>
							</div>
						</div>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</div>
</template>

<script>
// 局部导入省市区联动
import VDistpicker from 'v-distpicker'

// 导入本地数据获取
import {getLocalData} from '../common/handleLocalData.js'

export default {
	data () {
		return {
			goodsList: [],					// 商品清单
			ruleForm: {						// 需要提交的数据
				accept_name: '张三',		// 收货人姓名
				area: {					// 所属地区
					'province': {'code': '440000', 'value': '广东省'},
					'city': {'code': '440000', 'value': '深圳市'},
					'area': {'code': '440000', 'value': '宝安区'},
				},
				address: '地王大厦',			// 详细地址
				mobile: '13800138000',			// 手机号码
				email: '123@qq.com',			// 电子邮箱
				post_code: '518112',			// 邮政编码
				payment_id: '6',				// 支付方式
				express_id: '1',				// 快递方式
				goodsAmount: 0,					// 商品总额
				expressMoment: 0,				// 快递费
				message: '请尽快发货',			// 订单备注信息
				goodsids: null,					// 购买的商品的id
				cargoodsobj: {}					// 购买商品对象
			},
			rules: {					// 定义规则
				accept_name:[
            		{ required: true, message: '请输入收货人姓名', trigger: 'blur' }
				],
				area: [
					{ required: true, message: '请选择所在地区', trigger: 'blur' }
				],
				address: [
					{ required: true, message: '请输入详细地址', trigger: 'blur' }
				],
				mobile: [
					{ required: true, message: '请输入手机号码', trigger: 'blur' }
				]
			}
		}
	},
	// 初始化组件
	components: {
		// 省市区联动组件
		VDistpicker
	},
	created () {
		this.getGoodsList()
	},
	computed: {
		// 获取商品总件数
		getGoodsTotalNum () {
			let totalNum = 0
			this.goodsList.forEach(item => {
				totalNum += item.buycount
			})
			return totalNum
		},
		// 获取商品总金额
		getGoodsTotalCost () {
			let totalCost = 0
			this.goodsList.forEach(item => {
				totalCost += item.buycount * item.sell_price
			})
			this.ruleForm.goodsAmount = totalCost
			return totalCost
		},
		// 获取运费金额
		getExpressCost () {
			let expressCost = 0
			switch (this.ruleForm.express_id) {
				case "1":
					expressCost = 20
					break;
				case "2":
					expressCost = 10
					break;
				case "3":
					expressCost = 8
					break;
			}
			this.ruleForm.expressMoment = expressCost

			return expressCost
		}
	},
	methods: {
		// 获取商品清单
		getGoodsList () {
			// 赋值商品的id
			this.ruleForm.goodsids = this.$route.params.goodsIds

			// 购买商品的对象
			const goodsObj = {}

			const localData = getLocalData()
			const url = `site/validate/order/getgoodslist/${this.$route.params.goodsIds}`
			this.$axios.get(url).then(response => {
				response.data.message.forEach(item => {
					item.buycount = localData[item.id]
					goodsObj[item.id] = item.buycount
				})
				this.goodsList = response.data.message
				this.ruleForm.cargoodsobj = goodsObj
			})
		},
		// 返回购物车
		goToBuyCart () {
			this.$router.push({path: '/site/buycart'})
		},
		// 确认提交
		affirmSubmit () {
			const url = `site/validate/order/setorder`
			this.$axios.post(url, this.ruleForm).then(response => {
				if (response.data.status === 1) {
					this.$message.error(response.data.message)
				} else {
					
					// 完成支付购物车对应商品下架
					let goodsIds = this.ruleForm.goodsids
					this.$store.commit('deleteLocalDataByIds', goodsIds)

					// 跳转支付中心
					this.$router.push({path: `/site/payinfo/${response.data.message.orderid}`})
				}
			})
		}
	}
}
</script>
