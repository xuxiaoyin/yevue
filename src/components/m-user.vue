<template>
	<div>
		 <div id="contant-m" style="display: block;">
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
<script>
	export default{
		name:''
	}
</script>
<style lang="scss" scoped>
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
        display:block;
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
                   

                    margin: 0 0 0.1rem 0;
                    dt{
                        width: 100%;
                         background:#f2f2f2;
                        height:  0.82rem;
                        padding:0 0.3rem;
                        line-height: 0.82rem;
                        text-align: left;
                        font-size: 0.22rem;
                        color: #1a1a1a;
                        margin: 0;
                        margin: 0 0 0.1rem 0;
                    }
                    dd{
                         background:#f2f2f2;

                        color: #8c8c8c;
                        width: 100%;    
                        height: 0.6rem;
                        line-height: 0.6rem;
                        text-align: left;
                        font-size: 0.22rem;
                         padding-left:0.5rem;
                        margin: 0 0 0.1rem 0;
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