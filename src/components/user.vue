<template>
	<div>
         <div id="content">
            <div class="router">
                <div class="container">
                     <router-link to="/">首页</router-link>>
                     <router-link to="/user/user_info">个人中心</router-link>>
                     <router-link to="/" v-if="num>0&&num<6">我的订单></router-link>
                     <router-link to="/" v-if="num>5&&num<10">个人信息></router-link>
                    <router-link :to="{path:'/user/order',query:{id:0}}" v-if="num==1">所有订单</router-link>
                    <router-link :to="{path:'/user/order',query:{id:1}}" v-if="num==2">待付款</router-link>
                    <router-link :to="{path:'/user/order',query:{id:2}}" v-if="num==3">待发货</router-link>
                    <router-link :to="{path:'/user/order',query:{id:3}}" v-if="num==4">待收货</router-link>
                    <router-link :to="{path:'/user/order',query:{id:4}}" v-if="num==5">待评价</router-link>
                    <router-link to="/user/user_info" v-if="num==6">个人资料</router-link>
                    <router-link to="/user/address" v-if="num==7">收货地址</router-link>
                    <router-link to="/user/change_password" v-if="num==8">修改密码</router-link>
                    <router-link to="/user/phone_bind" v-if="num==9">绑定手机号</router-link>
                </div>
                
            </div>
            <div class="container">
                <div class="contant_left">
                    <div class="title">个人中心</div>
                    <div class="nav">
                        <ul>
                            <li>
                                <dl>
                                    <dt  @click="change_menu(0)" :class="num == 0?'active':''"><router-link to="/cart">我的购物车</router-link></dt>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>我的订单</dt>
                                    <dd @click="change_menu(1)"  :class="num == 1?'active':''"><router-link :to="{path:'/user/order',query:{id:0}}">所有订单</router-link></dd>
                                    <dd @click="change_menu(2)"  :class="num == 2?'active':''"><router-link :to="{path:'/user/order',query:{id:1}}">待付款</router-link></dd>
                                    <dd @click="change_menu(3)"  :class="num == 3?'active':''"><router-link :to="{path:'/user/order',query:{id:2}}">待发货</router-link></dd>
                                    <dd @click="change_menu(4)"  :class="num == 4?'active':''"><router-link :to="{path:'/user/order',query:{id:3}}">待收货</router-link></dd>
                                    <dd @click="change_menu(5)"  :class="num == 5?'active':''"><router-link :to="{path:'/user/order',query:{id:4}}">待评价</router-link></dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>个人信息</dt>
                                    <dd @click="change_menu(6)"  :class="num == 6?'active':''"><router-link to="/user/user_info">个人资料</router-link></dd>
                                    <dd @click="change_menu(7)"  :class="num == 7?'active':''"><router-link to="/user/address">收货地址</router-link></dd>
                                    <dd @click="change_menu(8)"  :class="num == 8?'active':''"><router-link to="/user/change_password">修改密码</router-link></dd>
                                    <dd @click="change_menu(9)"  :class="num == 9?'active':''"><router-link to="/user/phone_bind">绑定手机号</router-link></dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt><router-link to="/wenda">在线咨询</router-link></dt>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </div>  
                <div class="contant_right">
                    <router-view></router-view>
                </div>
            </div>
        
        </div> 
        <div id="contant-m">
            <ul>
                <li>
                    <dl>
                        <dt  @click="change_menu(0)" :class="num == 0?'active':''"><router-link to="/cart">我的购物车</router-link></dt>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>我的订单</dt>
                        <!-- <dd @click="change_menu(1)"  :class="num == 1?'active':''"><router-link to="/user/order">所有订单</router-link></dd>
                        <dd @click="change_menu(2)"  :class="num == 2?'active':''"><router-link to="/user/order">待付款</router-link></dd>
                        <dd @click="change_menu(3)"  :class="num == 3?'active':''"><router-link to="/user/order">待发货</router-link></dd>
                        <dd @click="change_menu(4)"  :class="num == 4?'active':''"><router-link to="/user/order">待收货</router-link></dd>
                        <dd @click="change_menu(5)"  :class="num == 5?'active':''"><router-link to="/user/order">待评价</router-link></dd> -->
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>个人信息</dt>
                        <dd @click="change_menu(6)"  :class="num == 6?'active':''"><router-link to="/user/user_info">个人资料</router-link></dd>
                        <dd @click="change_menu(7)"  :class="num == 7?'active':''"><router-link to="/user/address">收货地址</router-link></dd>
                        <dd @click="change_menu(8)"  :class="num == 8?'active':''"><router-link to="/user/change_password">修改密码</router-link></dd>
                        <dd @click="change_menu(9)"  :class="num == 9?'active':''"><router-link to="/user/phone_bind">绑定手机号</router-link></dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt><router-link to="/wenda">在线咨询</router-link></dt>
                    </dl>
                </li>
            </ul>
        </div>  
    </div>
</template>
<script >
    export default {
        name:'user',
        data(){
            return {
                num : 6
            }
        },
        methods:{
            change_menu(index){
                this.num = index
            }
        }
    }
</script>
<style lang="scss" scoped>
#content{
    overflow: hidden;
    .router{
        font-size:14px;
        line-height:30px;
        color:#666666;
        margin: 15px 0 30px 0;
    }
    
}
#contant-m{
    display:none
}
.contant_left{
	float:left;
	width:120px;
	border:1px #e0e0e0 solid;
	margin-bottom: 125px;
	margin-right: 25px;
	.title{
		width:100%;
		height:40px;
		background:#f1f1f1;
		line-height: 40px;
		text-align: center;
	}
	.nav{
	    width: 100%;
	    ul{
	        width: 100%;
	        li{
	            width: 100%;
	            border:1px #e0e0e0 solid;
	            dl{
	                width: 100%;
	                margin: 0;
	                dt{
	                    width: 100%;
	                    height: 42px;
	                    line-height: 42px;
	                    text-align: center;
	                    font-size: 14px;
                        color: #000;
                        font-weight: bold;
	                    margin: 0;
	                }
	                dd{
	                    color: #8c8c8c;
	                    width: 100%;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        font-size: 12px;
                        margin: 0;
                        &.active{
                            a{
                                color: #ee0a0d;
                            }
                        }
	                }
	            }
	        }
	    }
	}
}
.contant_right{
    width: 1050px;
    float: left;
    .common_title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom:1px #f2f2f2 solid;
        .text{
            font-size: 16px;
            width: 100px;
            text-align: center;
            height: 100%;
            border-bottom:1px solid #ee0a0d;
            color: #ee0a0d;
            float: left;
        }
    }
    form{
        width: 680px;
        margin-top: 30px;
            .item{
                width: 100%;
                clear:both;
                min-height:40px;
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
                        margin-bottom:20px;
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
                margin: 40px auto 15px;
                cursor: pointer;
                
            }
        }
        .tip{
            text-align: center;
            color: #999999;
            font-size: 12px;
        }
    .bang_success{
        margin-top: 30px;
        margin-left: 15px;
        p{
            font-size: 14px;
            color: #616161;
            line-height: 28px;
            
        }
    }
}


@media only screen and (max-width:750px){
    #content{
        display: block;
        .contant_left{
            display:none;
        }
        .common_title{
            display: none;
        }
    }
    #contant-m{
        padding-top: 0.87rem;
        padding-bottom: 0.98rem;
        width: 100%;
        // display:block;
         .bang_success{
            margin-top: 0.3rem;
            margin-left: 0.15rem;
            p{
                text-align: center;
                font-size: 0.20rem;
                color: #616161;
                line-height: 0.4rem;
                
            }
        }
        ul{
            width: 100%;
            li{
                width: 100%;
                dl{
                    width: 100%;
                    margin: 0;
                    dt{
                        width: 100%;
                        height:  0.82rem;
                        padding:0 0.3rem;
                        line-height: 0.82rem;
                        text-align: left;
                        font-size: 0.22rem;
                        color: #1a1a1a;
                        margin: 0;
                    }
                    dd{
                        color: #8c8c8c;
                        width: 100%;
                         padding:0 0.3rem;
                        height: 0.6rem;
                        line-height: 0.6rem;
                        text-align: left;
                        font-size: 0.22rem;
                        margin: 0;
                        &.active{
                            a{
                                color: #ee0a0d;
                            }
                        }
                    }
                }
            }
        }

    }
}


</style>