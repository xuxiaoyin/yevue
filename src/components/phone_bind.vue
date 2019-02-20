<template>
	<div>
		<div class="common_title">
			<div class="text">绑定手机号</div>
		</div>
		<form action="" method="post" v-if='!status'>
			<div class="item">
				<div class="label">手机号码：</div>
				<div class="input_code">
					<input type="text" v-model="mobile_phone" placeholder="请输入手机号码" />
				</div>
				<button class="btn" type="button" @click="SendCode">获取验证码</button>
			</div>
			<div class="item">
				<div class="label">验证码：</div>
				<div class="input">
					<input type="text" v-model="code" placeholder="请输入验证码" />
				</div>
			</div>
			<button type="button" @click="submit">确认绑定</button>
			<div class="tip">绑定手机号可用于找回密码、手机号码登录。</div>
		</form>
		<!--绑定成功-->
		<div class="bang_success" v-if='status'>
			<p>用户名:{{user_name}}</p>
			<p>已绑定手机：{{phone}}</p>
		</div>
	</div>
</template>
<script >
	export default {
		name:'phone',
		data(){
			return {
				mobile_phone:'',
				status:false,
				code:''
			}
		},
		created(){
			this.getstatus()
		},
		methods:{
			getstatus(){
				var that = this;

				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				console.log(userInfo)
				this.$axios({
				    method: 'post',
				    url:that.GLOBAL.url+'member.php?Action=bangdingchaxun',
				    params:{
				    	openid:userInfo.openid
				    }
				}).then((res)=>{
				    console.log(res);
				    if(res.data.success == 1){
				    	that.status = true
				    	that.phone = res.data.mobile_phone
				    	that.user_name = res.data.user_name
				    }else{
				    	that.status = false
				    }

				}).catch((err) =>{
			        console.log(err);
			      });
			},
			SendCode(){
				var that = this;

				var userInfo = JSON.parse(localStorage.getItem('userInfos'));
				this.$axios({
				    method: 'post',
				    url:that.GLOBAL.url+'member.php?Action=yanzhengma',
				    params:{
				    	openid:userInfo.openid,
				    	mobile_phone:that.mobile_phone
				    }
				}).then((res)=>{
				    console.log(res);
				    if(res.data.success == 1){
				    	alert('发送成功')
				    }else if(res.data.success == 2){
				    	alert('手机号码不正确')
				    }else if(res.data.success == 3){
				    	alert('手机号码已经存在')
				    }else{
				    	alert('发送失败')
				    }

				}).catch((err) =>{
			        console.log(err);
			      });
			},
			submit(){
				var that = this;

				var userInfo = JSON.parse(localStorage.getItem('userInfos'));
				console.log(userInfo)
				this.$axios({
				    method: 'post',
				    url:that.GLOBAL.url+'member.php?Action=bangdingshouji',
				    params:{
				    	openid:userInfo.openid,
				    	mobile_phone:that.mobile_phone,
				    	code:that.code
				    }
				}).then((res)=>{
				    console.log(res);
				    if(res.data.success == 1){
				    	alert('绑定成功')
				    	that.getstatus()
				    }else if(res.data.success == 0){
				    	alert('手机号码不正确')
				    }else if(res.data.success == 3){
				    	alert('验证码已过期')
				    }else{
				    	alert('非法操作')
				    }

				}).catch((err) =>{
			        console.log(err);
			      });
			}
		}
	}
</script>
