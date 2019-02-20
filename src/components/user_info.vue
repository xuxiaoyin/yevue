<template>
	<div>
		<div class="common_title">
    		<div class="text">个人资料</div>
    	</div>
    	<form action="" class="pc" method="post">
    		<div class="item">
    			<div class="label">用户名：</div>
    			<div class="input">
    				<input type="text" v-model="nicheng" placeholder="小明123xm" />
    			</div>
    		</div>
    		<!-- <div class="item">
    			<div class="label">手机号码：</div>
    			<div class="input">
    				<input type="text" v-model="mobile" placeholder="手机号码（必填）" />
    			</div>
    		</div> -->
    		<div class="item">
    			<div class="label">电子邮箱：</div>
    			<div class="input">
    				<input type="text" v-model="email" placeholder="请输入电子邮箱" />
    			</div>
    		</div>
    		<div class="item">
    			<div class="label">微信：</div>
    			<div class="input">
    				<input type="text" v-model="weixin" placeholder="请输入微信" />
    			</div>
    		</div>
    		<div class="item">
    			<div class="label">微博：</div>
    			<div class="input">
    				<input type="text" v-model="weibo" placeholder="请输入微博" />
    			</div>
    		</div>
    		<div class="item">
    			<div class="label">详细地址：</div>
    			<div class="textarea_div">
    				<textarea type="text" v-model="address" placeholder="请输入联系地址" ></textarea>
    					
    			</div>
    		</div>
    		<button class="user_info" type="button" @click="change">保存</button>
    	</form>
        <div id="contant-m">
            <form action="" method="post">
                <div class="item">
                    <div class="label">用户名：</div>
                    <div class="input">
                        <input type="text" v-model="nicheng" placeholder="小明123xm" />
                    </div>
                </div>
               <!--  <div class="item">
                    <div class="label">手机号码：</div>
                    <div class="input">
                        <input type="text" v-model="mobile" placeholder="手机号码（必填）" />
                    </div>
                </div> -->
                <div class="item">
                    <div class="label">电子邮箱：</div>
                    <div class="input">
                        <input type="text" v-model="email" placeholder="请输入电子邮箱" />
                    </div>
                </div>
                <div class="item">
                    <div class="label">微信：</div>
                    <div class="input">
                        <input type="text" v-model="weixin" placeholder="请输入微信" />
                    </div>
                </div>
                <div class="item">
                    <div class="label">微博：</div>
                    <div class="input">
                        <input type="text" v-model="weibo" placeholder="请输入微博" />
                    </div>
                </div>
                <div class="item">
                    <div class="label">详细地址：</div>
                    <div class="textarea_div">
                        <textarea type="text" v-model="address"  placeholder="请输入联系地址" ></textarea>
                            
                    </div>
                </div>
                <button class="user_info" type="button" @click="change">保存</button>
            </form>
        </div>
	</div>
   
</template>

<script >
	import store from '@/store/store'
	export default {
		name:"user_info",
		data(){
			return {
				nicheng:'',
				email:'',
				// mobile:'',
				weixin:'',
				weibo:'',
				address:'',

			}
		},
		created(){
			this.get_info()
		},
		methods:{
			get_info(){
				var that = this;
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));

				this.$axios({
				    method: 'post',
				    url:that.GLOBAL.url+'ziyu.php?Action=huiyuanxinxi',
				    params:{
				    	openid:userInfo.openid
				    }
				}).then((res)=>{
				    console.log(res.data);
				    that.nicheng = res.data.nicheng
				    that.email = res.data.email
				    that.mobile = res.data.mobile_phone
				    that.weixin = res.data.weixin
				    that.weibo = res.data.weibo
				    that.address = res.data.address

				}).catch((err) =>{
			        console.log(err);
			      });
			},
			change(){
				var that = this;
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
				    method: 'post',
				    url:that.GLOBAL.url+'ziyu.php?Action=xiugaixinxi',
				    params:{
				    	openid:userInfo.openid,
				    	nicheng:that.nicheng,
						email:that.email,
						mobile:that.mobile,
						weixin:that.weixin,
						weibo:that.weibo,
						address:that.address
				    }
				}).then((res)=>{
				    console.log(res);
				    alert(res.data.msg)
				    this.get_info()

				}).catch((err) =>{
			        console.log(err);
			      });
			}
		}
	}
</script>


<style lang="scss" scoped>
	

button.user_info{
    width: 81px !important;
    height: 40px;
    background: #ee0a0d;
    border: none;
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
    display: block;
    margin: 0 !important;
    margin-top:25px !important;
    margin-left:28px !important;
}


@media only screen and (max-width:750px){
    .pc{
        display: none;
    }
    .contant_right{
        width: 7.5rem;
    }
    #contant-m{
        padding-top: 0.87rem;
        padding-bottom: 0.98rem;
        width: 100%;
          form{
                width: 6.8rem;
                margin: 0 auto;
                margin-top: 0.3rem;
                    .item{
                        width: 100%;
                        overflow: hidden;
                        margin-bottom: 0.21rem;
                        .label{
                            width: 100px;
                            float: left;
                            text-align: right;
                            color: #616161;
                            line-height: 0.4rem;
                            margin-right: 0.2rem;
                            font-size: 0.14rem;
                        }
                        .input{
                            float: left;
                            width: 5.2rem;
                            box-sizing: border-box;
                            border:1px #cbcaca solid;
                            height: 0.4rem;
                            line-height: 0.4rem;
                             border-radius: 0.05rem;
                            input{
                                width: 100%;
                                height: 100%;
                                float: left;
                                border: none;
                                background: none;
                                padding: 0 0.1rem;
                                line-height: 0.4rem;
                                
                            }
                            
                        }
                        .textarea_div{
                            float: left;
                            width: 5.2rem;
                            box-sizing: border-box;
                            border:1px #cbcaca solid;
                            height: 1.3rem;
                            line-height: 0.4rem;
                             border-radius: 0.05rem;
                             textarea{
                                 border:none;
                                width: 100%;
                                padding: 0.05rem 0.1rem;
                                resize: none;
                                height: 100%;
                                box-sizing: border-box;
                            }
                        }
                        .select_div{
                             float: left;
                            width: 5.2rem;
                            height: 0.39rem;
                            line-height: 0.4rem;
                             border-radius: 0.05rem;
                             select{
                                 width: 2.57rem;
                                 height: 100%;
                                 border:1px #cbcaca solid;
                                 border-radius: 0.05rem;
                                 box-sizing: border-box;
                             }
                        }
                        .input_code{
                            float: left;
                            width: 3.97rem;
                            box-sizing: border-box;
                            border:1px #cbcaca solid;
                            height: 0.4rem;
                            line-height: 0.4rem;
                            border-radius: 0.05rem;
                            input{
                                width: 100%;
                                height: 100%;
                                float: left;
                                border: none;
                                background: none;
                                padding: 0 0.1rem;
                                line-height: 0.4rem;
                                
                            }
                            
                        }
                        .get_phone{
                            width: 1rem;
                            height: 0.4rem;
                            float: left;
                            background: #ee0a0d;
                            color: #fff;
                            text-align: center;
                            line-height: 0.4rem;
                            margin-left: 0.25rem;
                            border-radius:0.05rem ;
                            font-size: 0.16rem;
                            
                        }
                        .btn{
                            float: left;
                            width: 1.1rem;
                            height: 0.4rem;
                            background: #ee0a0d;
                            color: #fff;
                            border:none;
                            float: left;
                            margin: 0;
                            margin-left:0.1rem ;
                            font-size: 0.14rem;
                        }
                    }
                    button{
                        width: 1.16rem;
                        height: 0.4rem;
                        background: #ee0a0d;
                        border: none;
                        color: #fff;
                        font-size: 0.16rem;
                        border-radius: 0.05rem;
                        display: block;
                        margin: 0.6rem auto 2.9rem !important;
                        cursor: pointer;
                        
                    }
                }
                .tip{
                    text-align: center;
                    color: #999999;
                    font-size: 0.12rem;
                }

    }
}
</style>