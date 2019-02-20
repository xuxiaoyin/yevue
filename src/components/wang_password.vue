<template>
	<div id="content">
		<div class="router">
			<div class="container">
				<a href="###">首页</a>><a href="###">登录</a>
			</div>
		</div>
		<div class="password_01"  v-if="status == 0">
			<div class="container">
				<img src="static/img/get_password_01.png" class="get_password"/>
				<form action="" method="post">
						<div class="item">
							<div class="label">手机号码：</div>
							<div class="input">
								<input type="text" v-model="mobile_phone" placeholder="请输入绑定的手机号码" />
							</div>
						</div>
						<div class="item">
							<div class="label">验证码：</div>
							<div class="input_code">
								<input type="text" v-model="code" placeholder="请输入验证码" />
							</div>
							<div class="get_phone"  @click="get_code">获取验证码</div>
						</div>
						
						
						<button class="user_info" @click="yanzhen_code" type="button">提交</button>
					</form>
				
			</div>
		</div>
		<div class="password_02"  v-if="status == 1">
			<div class="container">
				<img src="static/img/get_password_02.png" class="get_password"/>
				<form action="" method="post">
						<div class="item">
							<div class="label">手机号码：</div>
							<span style="line-height: 40px;"> {{user_name}}</span>
						</div>
						<div class="item">
							<div class="label">新密码：</div>
							<div class="input">
								<input type="password" v-model="newmima1" value="" placeholder="请输入新密码"/>
							</div>
						</div>
						<div class="item">
							<div class="label">确认密码：</div>
							<div class="input">
								<input type="password" v-model="newmima2" placeholder="请输入确认密码"/>
							</div>
						</div>
						
						<button class="user_info" type="button" @click="set_password">提交</button>
					</form>
				
			</div>
		</div>
		<div class="password_03"  v-if="status == 2">
			<div class="container">
				<img src="static/img/get_password_03.png" class="get_password"/>
				<div class="tip">
					<img src="img/order_success.png"/>用户名{{user_name}}找回密码成功！
				</div>
				<div class="btn_list">
					<router-link to="/login">去登陆></router-link>
					<router-link to='/'>返回首页></router-link>
				</div>
			</div>
		</div>
	
	</div>
</template>
<script>
	export default {
		name:'wang_password',
		data(){
			return {
				status:0,
				mobile_phone:'',
				code:'',
                openid:'',
                user_name:'',
                newmima1:'',
                newmima2:''
			}
		},
		methods:{
			get_code(){
				this.$axios({
					url:'https://cy.gzziyu.com/mobile/member.php?Action=shenfengyanzhengma',
					method:'post',
					params:{
						mobile_phone:this.mobile_phone
					}
				})
				.then((res)=>{
					console.log(res)
					if(res.data.success == 1){
						alert('验证码发送成功，请注意查收')
					}else{
						alert(res.data.msg)
                        
					}
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			yanzhen_code(){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					url:'https://cy.gzziyu.com/mobile/member.php?Action=shenfengrenzheng',
					method:'post',
					params:{
						mobile_phone:this.mobile_phone,
						code:this.code
					}
				})
				.then((res)=>{
					console.log(res)
					if(res.data.success == 1){
						this.status = 1
                        this.openid = res.data.openid
                        this.user_name = res.data.user_name
                        console.log(123)
					}else{
						alert(res.data.msg)
					}
				})
				.catch((err)=>{
					console.log(err)
				})
			},
            set_password(){
                this.$axios({
                    method:'post',
                    url:'https://cy.gzziyu.com/mobile/member.php?Action=shezhimima',
                    params:{
                        openid:this.openid,
                        newmima1:this.newmima1,
                        newmima2:this.newmima2
                    }
                })
                .then((res)=>{
                    if(res.data.success == 1){
                        this.status = 2
                        console.log(res)
                    }else{
                         console.log(res)
                         alert(res.data.msg)
                    }
                })
            }

		}
	}
</script>
<style lang="scss" scoped>
	img.get_password{
    width:856px;
    display: block;
    margin: 0 auto 73px;
}
 form{
        width: 680px;
        margin: 0 auto;
        margin-top: 30px;
            .item{
                width: 100%;
                overflow: hidden;
                margin-bottom: 21px;
                .label{
                    width: 100px;
                    float: left;
                    text-align: right;
                    color: #616161;
                    line-height: 40px;
                    margin-right: 20px;
                    font-size: 14px;
                }
                .input{
                    float: left;
                    width: 520px;
                    box-sizing: border-box;
                    border:1px #cbcaca solid;
                    height: 40px;
                    line-height: 40px;
                     border-radius: 5px;
                    input{
                        width: 100%;
                        height: 100%;
                        float: left;
                        border: none;
                        background: none;
                        padding: 0 10px;
                        line-height: 40px;
                        
                    }
                    
                }
                .textarea_div{
                    float: left;
                    width: 520px;
                    box-sizing: border-box;
                    border:1px #cbcaca solid;
                    height: 130px;
                    line-height: 40px;
                     border-radius: 5px;
                     textarea{
                         border:none;
                        width: 100%;
                        padding: 5px 10px;
                        resize: none;
                        height: 100%;
                        box-sizing: border-box;
                    }
                }
                .select_div{
                     float: left;
                    width: 520px;
                    height: 39px;
                    line-height: 40px;
                     border-radius: 5px;
                     select{
                         width: 257px;
                         height: 100%;
                         border:1px #cbcaca solid;
                         border-radius: 5px;
                         box-sizing: border-box;
                     }
                }
                .input_code{
                    float: left;
                    width: 397px;
                    box-sizing: border-box;
                    border:1px #cbcaca solid;
                    height: 40px;
                    line-height: 40px;
                    border-radius: 5px;
                    input{
                        width: 100%;
                        height: 100%;
                        float: left;
                        border: none;
                        background: none;
                        padding: 0 10px;
                        line-height: 40px;
                        
                    }
                    
                }
                .get_phone{
                    width: 100px;
                    height: 40px;
                    float: left;
                    background: #ee0a0d;
                    color: #fff;
                    text-align: center;
                    line-height: 40px;
                    margin-left: 25px;
                    border-radius:5px ;
                    
                }
                .btn{
                    float: left;
                    width: 110px;
                    height: 40px;
                    background: #ee0a0d;
                    color: #fff;
                    border:none;
                    float: left;
                    margin: 0;
                    margin-left:10px ;
                    font-size: 14px;
                }
            }
            button{
                width: 116px;
                height: 40px;
                background: #ee0a0d;
                border: none;
                color: #fff;
                font-size: 16px;
                border-radius: 5px;
                display: block;
                margin: 60px auto 290px;
                cursor: pointer;
                
            }
        }
        .tip{
            text-align: center;
            color: #999999;
            font-size: 12px;
        }

.tip{
    width: 100%;
    font-size: 24px;
    color: #606060;
    span{
        color: #cc080b;
    }
    img{
        width: 33px;
        height: 33px;
        display: inline-block;
        margin-right: 10px;
    }
}

.btn_list{
    margin-bottom: 300px;
    text-align: center;
    margin-top: 40px;
    a{
        display: inline-block;
        width: 100px;
        height: 30px;
        border: #ee0a0d 1px solid;
        color: #ee0a0d;
        text-align: center;
        line-height: 30px;
        margin-right: 50px;
        font-size: 14px;
    }
}



@media only screen and (max-width:750px){
    #content{
        display:block !important;
        padding-top: 0.87rem;
        padding-bottom: 0.98rem;
        width: 7.5rem;
        .router{
            display:none;
        }
        .password_01{
            width:100%;
        }
        .container{
            width:100%;
        }
        img.get_password{
            width:100%;
        }
        form{
            width:7.5rem;
        }
        .label{
            width:1.3rem !important;
            margin-right:0.2rem !important;
        }
        .input{
            width:6rem !important;
        }
        .input_code{
            width:4rem;
        }


    }
}

</style>