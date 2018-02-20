<template>
	<div>
		<!-- 顶部 -->
		<div class="header">
			<!-- 1.0 导航栏头部 -->
			<div class="head-top">
				<div class="section">
					<div class="left-box">
						<span>京东商城</span>
						<a target="_blank" href="#"></a>
						<a target="_blank" href="#"></a>
					</div>
					<div id="menu" class="right-box">
						<span v-show="!loginStatus">
							<router-link to="/site/login" class="">登录</router-link>
							<strong>|</strong>
							<a href="" class="">注册</a>
							<strong>|</strong>
						</span>
						<span v-show="loginStatus">
							<router-link to="/site/vipcenter" class="">会员中心</router-link>
							<strong>|</strong>
							<a href="javascript:;" @click="logout">退出</a>
							<strong>|</strong>
						</span>
						<router-link to="/site/buycart" class="">
							<i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount"><span>{{$store.getters.getBuyCount}}</span>
							</span>)
						</router-link>
					</div>
				</div>
			</div>

			<!-- 2.0 导航条 -->
			<div class="head-nav">
				<div class="section">
					<div id="menu2" class="nav-box menuhd">
						<ul>
							<li class="index">
								<a href="#" class="">
									<span class="out" style="top: 0px;">首页</span>
								</a>
							</li>
							<li class="news">
								<a href="#" class="">
									<span class="out" style="top: 0px;">每日精选</span>
								</a>
							</li>
							<li class="photo">
								<a href="#" class="">
									<span class="out" style="top: 0px;">秒杀专区</span>
								</a>
							</li>
							<li class="video">
								<a href="#" class="">
									<span class="out" style="top: 0px;">京东超市</span>
								</a>
							</li>
							<li class="down">
								<a href="#" class="">
									<span class="out" style="top: 0px;">会员权益</span>
								</a>
							</li>
							<li class="goods">
								<router-link to="/site/goodslist" class="router-link-exact-active ">
									<span class="out" style="top: 0px;">购物商城</span>
								</router-link>
							</li>
						</ul>
					</div>
					<div class="search-box">
						<div class="input-box">
							<input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
						</div>
						<a href="javascript:;">
							<i class="iconfont icon-search"></i>
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- 中间占位 -->
		<router-view></router-view>

		<!-- 底部 -->
		<div class="footer">
			<div class="section">
				<div class="foot-nav">
					<a href="">关于我们</a>
					<strong>|</strong>
					<a href="">联系我们</a>
					<strong>|</strong>
					<a href="">联系客服</a>
					<strong>|</strong>
					<a href="">合作招商</a>
					<strong>|</strong>
					<a href="">商家帮助</a>
					<strong>|</strong>
					<a href="">营销中心</a>
					<strong>|</strong>
					<a href="">隐私政策</a>
				</div>
				<div class="foot-box">
					<div class="copyright">
						<p>版权所有 京东商城 </p>
						<p>公司地址： 联系电话：</p>
						<p class="gray">Copyright © 2004 - 2018  京东JD.com 版权所有</p>
					</div>
					<div class="service">
						<p>周一至周日 9:00-24:00</p>
						<a href="#">
							<i class="iconfont icon-phone"></i>在线客服</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	@import '../statics/site/js/hoverNav/css/style.css';
</style>

<script>
// 导入组件通信
import {busKey, bus} from './common/bus.js'

export default {
	data () {
		return {
			loginStatus: false		// 登录状态
		}
	},
	created () {
		this.isLogin()

		// 组件通信
		bus.$on(busKey, (bool) => {
			this.loginStatus = bool
		})
	},
	mounted () {
		this.jqueryPlugins()
	},
	methods: {
		// 判断是否登录
		isLogin () {
			const url = `site/account/islogin`
			this.$axios.get(url).then(response => {
				if (response.data.code === 'logined') {
					this.loginStatus = true
				} else {
					this.loginStatus = false
				}
			})
		},
		// 登出账号
		logout () {
			this.$confirm('确定要退出登录吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				const url = `site/account/logout`
				this.$axios.get(url).then(response => {
					if (response.data.status === 1) {
						this.$message.error(response.data.message)
					} else {
						this.loginStatus = false
						this.$router.push({path: '/site/goodslist'})
						this.$message.success(response.data.message)
					}
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消退出'
				});          
			});
		},
		// jquery插件初始化
		jqueryPlugins () {
			setTimeout(() => {
				$("#menu2 li a").wrapInner( '<span class="out"></span>' );
				$("#menu2 li a").each(function() {
					$( '<span class="over">' +  $(this).text() + '</span>' ).appendTo( this );
				});

				$("#menu2 li a").hover(function() {
					$(".out",	this).stop().animate({'top':	'48px'},	300); // move down - hide
					$(".over",	this).stop().animate({'top':	'0px'},		300); // move down - show

				}, function() {
					$(".out",	this).stop().animate({'top':	'0px'},		300); // move up - show
					$(".over",	this).stop().animate({'top':	'-48px'},	300); // move up - hide
				});
			}, 400);
		}
	}
}
</script>
