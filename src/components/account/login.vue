<template>
<div>
	<div class="section">
		<div class="location">
			<span>当前位置：</span>
			<a href="/index.html">首页</a> &gt;
			<a href="/login.html">会员登录</a>
		</div>
	</div>
	<div class="section">
		<div class="wrapper">
			<div class="bg-wrap">
				<div class="nav-tit">
					<a class="selected" href="javascript:;">账户登录</a>
					<i>|</i>
					<a href="/register.html">免费注册</a>
				</div>

				<div id="loginform" name="loginform" class="login-box">
					<div class="input-box">
						<input id="txtUserName" v-model="userName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
					</div>
					<div class="input-box">
						<input id="txtPassword" v-model="password" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
					</div>
					<div class="btn-box">
						<input id="btnSubmit" @click="login" name="btnSubmit" type="submit" value="立即登录">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<style>
input {
	outline: none;
}
</style>


<script>
// 导入组件通信
import {busKey, bus} from '../common/bus.js'

export default {
	data () {
		return {
			userName: '',
			password: ''
		}
	},
	methods: {
		// 验证登录
		login () {
			const url = `site/account/login`
			this.$axios.post(url, {
				user_name: this.userName,
				password: this.password
			}).then(response => {
				if (response.data.status === 1) {
					this.$message.error(response.data.message)
				} else {
					// 提示登录成功
					this.$message.success(response.data.message)

					// 传递登录成功给 layout 组件
					bus.$emit(busKey, true)

					// 登录成功返回对应的地方
					this.$router.push({path: localStorage.getItem('lastPath')})
				}
			})
		},

	}
}
</script>
