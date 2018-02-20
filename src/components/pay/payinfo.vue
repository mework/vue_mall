<template>
<div>
	<div class="section">
		<div class="location">
			<span>当前位置：</span>
			<a href="/index.html">首页</a> &gt;
			<a href="javascript:;">支付中心</a>
		</div>
	</div>

	<div class="section">
		<div class="wrapper">
			<div class="bg-wrap">
				<div class="nav-tit pay">
					<a href="javascript:;" class="selected">支付中心</a>
				</div>
				<div class="form-box payment">
					<div class="el-row">
						<div class="el-col el-col-16">
							<div class="el-row">
								<div class="el-col el-col-12">
									<dl class="form-group">
										<dt>订 单 号：</dt>
										<dd>{{payInfo.order_no}}</dd>
									</dl>
								</div>
								<div class="el-col el-col-12">
									<dl class="form-group">
										<dt>收货人姓名：</dt>
										<dd>{{payInfo.accept_name}}</dd>
									</dl>
								</div>
							</div>
							<div class="el-row">
								<div class="el-col el-col-12">
									<dl class="form-group">
										<dt>送货地址：</dt>
										<dd>{{payInfo.area}}&nbsp;&nbsp;{{payInfo.address}}
										</dd>
									</dl>
								</div>
								<div class="el-col el-col-12">
									<dl class="form-group">
										<dt>手机号码：</dt>
										<dd>{{payInfo.mobile}}</dd>
									</dl>
								</div>
							</div>
							<div class="el-row">
								<div class="el-col el-col-12">
								<dl class="form-group">
									<dt>支付金额：</dt>
									<dd>{{payInfo.order_amount}} 元</dd>
								</dl>
								</div>
								<div class="el-col el-col-12">
									<dl class="form-group">
										<dt>支付方式：</dt>
										<dd>在线支付</dd>
									</dl>
								</div>
							</div>
							<div class="message">
								<span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
								<span>{{payInfo.message}}</span>
							</div>
						</div>
						<div class="el-col el-col-8">
							<img id="imgLogo" src="../../statics/site/images/alipay.png" hidden>
							<div id="container2">
								<canvas width="300" height="300"></canvas>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
// 导入二维码插件
import '../../statics/site/js/qrcode/qrcode.js'

export default {
	data () {
		return {
			payInfo: {}
		}
	},
	created () {
		this.getPayInfo()
	},
	mounted () {
		this.qrCodePlugins()
		this.isAccomplishPay()
	},
	methods: {
		// 获取支付中心数据
		getPayInfo () {
			const url = `site/validate/order/getorder/${this.$route.params.orderId}`
			this.$axios.get(url).then(response=> {
				this.payInfo = response.data.message[0]
			})
		},
		// 检查是否支付完成
		isAccomplishPay () {
			const url = `site/validate/order/getorder/${this.$route.params.orderId}`
			let timeId = setInterval(() => {
				this.$axios.get(url).then(response=> {
					if (response.data.message[0].status === 2) {
						clearInterval(timeId)
						// 跳转到支付完成界面
						this.$router.push({path: '/site/accomplishPay'})
					}
				})
			}, 2000)
		},
		// 二维码初始化
		qrCodePlugins () {
			//图片logo
			setTimeout(() => {
				$('#container2').erweima({
					mode: 4,
					mSize:25,
					text: `http://39.108.135.214:8899/site/validate/pay/alipay/${this.$route.params.orderId}`,
					image: $("#imgLogo")[0]
				});
			}, 500);
		}
	}
}
</script>
