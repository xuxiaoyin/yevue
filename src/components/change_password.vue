<template>
	<div>
		<div class="common_title">
			<div class="text">修改密码</div>
		</div>
		<form action="" method="post" >
			
			<div class="item">
				<div class="label">旧密码：</div>
				<div class="input">
					<input type="password" v-model="oldmima1" placeholder="请输入旧密码" />
				</div>
			</div>
			<div class="item">
				<div class="label">新密码：</div>
				<div class="input">
					<input type="password"  v-model="oldmima2" placeholder="请输入新密码" />
				</div>
			</div>
			<div class="item">
				<div class="label">确认新密码：</div>
				<div class="input">
					<input type="password" v-model="newmima" placeholder="请输入确认新密码" />
				</div>
			</div>
			<button type="button" @click="change">提交</button>
		</form>
		<div id="contant-m">
			<form action="" method="post" >
						
				<div class="item">
					<div class="label">旧密码：</div>
					<div class="input">
						<input type="password" v-model="oldmima1"  placeholder="请输入旧密码" />
					</div>
				</div>
				<div class="item">
					<div class="label">新密码：</div>
					<div class="input">
						<input type="password" v-model="oldmima2" placeholder="请输入新密码" />
					</div>
				</div>
				<div class="item">
					<div class="label">确认新密码：</div>
					<div class="input">
						<input type="password" v-model="newmima" placeholder="请输入确认新密码" />
					</div>
				</div>
				<button type="button" @click="change">提交</button>
			</form>
		</div>
	</div>

</template>
<script >

	export default {
		name:"change_password",
		data(){
			return {
				oldmima1:'',
				oldmima2:'',
				newmima:''
			}
		},
		methods:{
			change(){
				var that = this;
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
				    method: 'post',
				    url:that.GLOBAL.url+'member.php?Action=xiugaimima',
				    params:{
				    	openid:userInfo.openid,
				    	oldmima1:that.oldmima1,
						oldmima2:that.oldmima2,
						newmima:that.newmima
				    }
				}).then((res)=>{
				    console.log(res);
				    alert(res.data.msg)
				    if(res.data.success == 1){
				    	 that.oldmima1 = ''
					    that.oldmima2 = ''
					    that.newmima = ''
				    }
				    sessionStorage.removeItem('userInfos');
          			location.reload()
				   

				}).catch((err) =>{
			        console.log(err);
			      });
			}
		}
	}
</script>
<style lang="scss">
@media only screen and (max-width:750px){
	.contant_right form{
		width:7.5rem;
		.label{
			width:1.3rem !important;
			margin-right:0.2rem !important;
		}
		.input{
			width:6rem !important;
		}
	}
}
</style>