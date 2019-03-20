<template>
	<div>
        <div id="content">
            <div class="router">
                <div class="container">
                    <router-link to="/">首页</router-link>><a href="javascript:void(0)">订单详情</a>
                </div>
            </div>
            <div class="container">
                <div class="img"><img :src='"static/img/"+info.zhuangtai+".png"' alt=""></div>
                <div class="chat">
                    <div class="chat_title" v-if="info.order.order_sn">
                        订单编号：<span>{{info.order.order_sn}}</span>
                    </div>
                    <div class="order_info">
                        <p>当前订单状态：<span>{{info.biaoti}}</span></p>
                        <p v-if="info.zhuangtai == 3">请你在收到货后<a href="javascript:void(0)" @click="queren(info.order.order_id)">确认收货</a>，若有其他疑问请咨询在线客服。</p>
                           <div v-if="info.biaoti == '待支付'" v-html="info.order.pay_online"></div>
                    </div>
                </div>
                <div class="chat">
                    <div class="chat_title">
                        订单信息
                    </div>
                    <div class="table_order">
                        <ul>
                            <li v-if="info.order.order_sn">订单编号：<span>{{info.order.order_sn}}</span></li>
                            <li>付款方式：<span>{{info.order.pay_name}}</span></li>
                            <li>收货信息：<span>{{info.order.address}}{{info.order.address_name}}</span></li>
                            <li>下单时间：<span>{{info.order.formated_add_time}}</span></li>
                            <li>物流信息：<span>
                                {{info.order.shipping_name}}     <!--单号：24587962147 -->
                            </span></li>
                            <li>付款时间：<span>{{info.order.pay_time}}</span></li>
                            <li>发货时间：<span>{{info.order.pay_time}}</span></li>
                            <li>买家留言：<span>
                                <!-- 送货请提前通知 -->
                            </span></li>
                        </ul>
                    </div>
                </div>
                <div class="chat product-info" style="border-bottom:none; margin-bottom:0;">
                    <div class="chat_title">
                        商品信息
                    </div>
                    
                    <div class="order_list">
                        <ul class="order_head">
                            <li>商品信息</li>
                            <li>属性</li>
                            <li>单价</li>
                            <li>数量</li>
                            <li>小计</li>
                        </ul>
                        <ul v-for="(item,index) in info.goods_list">
                            <li>
                                <img :src="item.goods_thumb"/>
                                <span>{{item.goods_name}}</span>
                            </li>
                            <li>
                                <p>品牌：黎明 ，年份：2007年</p>
                            </li>
                            <li>
                                <p class="red">￥{{item.goods_price}}/件</p>
                            </li>
                            <li>
                                <p>{{item.goods_number}}</p>
                            </li>
                            <li>
                                <p class="red">￥{{item.subtotal}}</p>
                            </li>
                        </ul>
                        <!-- <div class="total">
                            <span class="num"><span class="red">{{info.goods_list.length}}</span>件商品</span>
                            <span class="total_">商品总金额：</span>
                            <span class="total_price">￥{{info.order.goods_amount}}</span>
                        </div> -->
                        
                    </div>
                </div>
                <div class="huizong total">
                    <p><span>{{info.goods_list.length}}</span>件商品，商品总金额：<span class="price">￥{{info.order.goods_amount}}</span></p>
                    <!-- <p>运费：<span class="price">+￥10 .00</span></p> -->
                    <p>应付总额：<span class="price total_price">￥{{info.order.goods_amount}}</span></p>
                    
                </div>
            </div>
        
        </div>
        <div class="contant-m">
            <div class="status-m">
                <img src="static/img/order-status1.png">
                {{info.biaoti}}
            </div>
            <div class="order_info-m">
                <div class="container-m">
                    <div class="name"><b>收货人：</b>{{info.order.consignee}}    <span>{{info.order.mobile}}</span>    </div>
                    <div class="address"><span>收货地址：</span><div>{{info.order.address}}</div></div>
                </div>
            </div>

            <div class="order_list-m">
                <ul>
                    <li>
                        <div class="order_title">
                            <div class="container-m" v-if="info.order.order_sn">
                                订单编号：{{info.order.order_sn}}
                                <span>{{info.biaoti}}</span>
                            </div>
                        </div>
                        <div class="order_center" v-for="(item,index) in info.goods_list">
                            <div class="container-m">
                                <div class="img"><img :src="'https://cy.gzziyu.com/'+item.goods_thumb"></div>
                                <div class="center_center">
                                    <p>{{item.goods_name}}</p>
                                    <span>{{item.goods_attr}} </span>
                                </div>
                                <div class="center_right">
                                    <p>¥{{item.goods_price}}</p>
                                    <span>数量：x{{item.goods_number}}</span>
                                </div>
                            </div>
                        </div>
                       
                        <div class="container-m">
                            <div class="btn">
                            
                                <a v-if="info.biaoti != '已取消'" href="javascript:void(0)" class="default">取消订单</a>
                                <a v-if="info.biaoti != '已取消'" href="javascript:void(0)" class="default pay">去支付</a>
                            </div>
                        </div>
                    </li>
                    
                </ul>
            </div>

            <div class="order_other">
                <p v-if="info.order.order_sn">订单编号 {{info.order.order_sn}}</p>
                <p>创建时间 {{info.order.formated_add_time}}</p>
                <!-- <p>成交时间 2018-01-24  10:25:54</p> -->
            </div>
        </div>   
    </div>
</template>
<script >
	export default {
		name:'order_detail',
		data(){
			return {
				info:{}
			}
		},
		watch: {
	        $route(to) {
	            console.log(to)
	            this.get_detail(this.$route.query.id)
	        }
	    },
	    created(){
	    	this.get_detail(this.$route.query.id)
	    },
		methods:{
            queren(id){
                  var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
                  this.$axios({
                        url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=querenshouhuo',
                        method:'post',
                        params:{
                            openid:userInfo.openid,
                             orderid:id
                        }
                    }) 
                    .then((res)=>{
                        console.log(res)
                        alert('确认收货成功')
                        this.get_detail(this.$route.query.id)
                    })
            },
			get_detail(id){
				this.$axios({
					url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=order_detail',
					params:{
						order_id:id
					}
				})
				.then((res)=>{
                    console.log('订单信息')
					console.log(res)
					this.info = res.data
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
   .router{
        font-size:14px;
        line-height:30px;
        color:#666666;
        margin: 15px 0 30px 0;
    }
.contant-m{
    display:none;
}
	.chat{
    clear: both;
    width: 100%;
    overflow: hidden;
    border:1px #e0e0e0 solid;
    margin-bottom: 30px;
    .product-info{
        border-bottom: none;
    }
    .chat_title{
        background: #F2F2F2;
        height: 40px;
        width: 100%;
        border-bottom: 1px #e0e0e0 solid;
        color: #000000;
        font-size: 18px;
        font-weight: bold;
        line-height: 40px;
        padding-left: 15px;
        box-sizing: border-box;
        span{
            font-weight: normal;
        }
        .btn{
            width: 135px;
            height: 30px;
            float: right;
            background: #fff;
            text-align: center;
            color: #6f6f6f;
            font-size: 14px;
            line-height: 30px;
            margin-right: 13px;
            margin-top: 5px;
        }
    }
    .order_info{
        width: 100%;
        padding: 10px 0;
        p{
            line-height: 45px;
            color: #a7a7a7;
            padding-left: 20px;
            box-sizing:border-box;
            span{
                font-size: 24px;color: #ee0a0d;
                font-weight: bold;
            }
            a{
                display: inline-block;
                width: 70px;
                height: 25px;
                border-radius: 5px;
                border:1px solid #ee0a0d;
                text-align: center;
                line-height: 25px;
                color: #ee0a0d;
                font-size: 14px
            }
        }
    }
    .cat_list{
        width: 100%;
        ul{
            width: 100%;
            text-align:center;
            margin: 25px 0;
            li{
                display: inline-block;
                width: 122px;
                height: 35px;
                text-align: center;
                line-height: 35px;
                background: #f0f0f0;
                color: #4a4a4a;
                margin-right: 3px;
                font-size: 14px;
                &.active{
                    background: #eb1e24;
                    color: #fff;
                }
            }
        }
        
    }
    .chat_name{
        p{
            text-align: center;
            color: #000000;
            font-size: 18px;
        }
        span{
            font-size: 12px;
            color: #aaa9a9;
            display: block;
            
            text-align: center;
        }
    }
    .address_list{
        width: 1175px;
        margin: 0 auto;
        margin-bottom: 25px;
        ul{
            width: 100%;
            margin-top: 20px;
            li {
                width: 100%;
                height: 40px;
                border:1px solid #e5e5e5;
                margin-bottom: 10px;
                position: relative;
                border:none;
                .name{
                    float: left;
                    line-height: 40px;
                    font-size: 16px;
                    color: #666666;
                    font-weight: bold;
                    width: 80px;
                    text-align: center;
                }
                .phone{
                    float: left;
                    line-height: 40px;
                    font-size: 16px;
                    color: #666666;
                    padding: 0 20px;
                    text-align: center;
                }
                .add_adress{
                    display: none;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 22px;
                    height: 23px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                &.active{
                    border:1px #cc080b solid;
                    .add_adress{
                        display: block;
                    }
                }
            }
        }
    }
    .radio_list{
        
        width: 100%;
        height: 70px;
        ul{
            width: 100%;
            padding-left: 15px;
            li{
                float: left;
                width: 120px;
                height: 70px;
                line-height: 70px;
                font-size: 14px;
                color: #666666;
                position: relative;
                padding-left: 20px;
                background: url(../../static/img/check.png) no-repeat;
                background-position: left center;
                margin-right: 20px;
                input{
                   
                }
            }
            li.check{
                background: url(../../static/img/check_active.png) no-repeat;
                background-position: left center;
            }
        }
    }
    .order_list{
        width: 100%;
        
        ul{
            overflow: hidden;
            border-bottom: 1px #E0E0E0 solid;
            li{
                float: left;
                height: 98px;
                text-align: center;
                color: #7f7f7f;
                font-size: 14px;
                box-sizing:border-box;
                border: none;
                &.red{
                    color: #ee0a0d;
                    
                }
                p{
                    margin-top: 22px;
                }
                p.red{
                    color: #ee0a0d;
                }
                &:nth-child(1){
                    width: 340px;
                    img{
                        width: 75px;
                        height: 75px;
                        display: block;
                        float: left;
                        margin: 12px 20px;
                    }
                    span{
                        float: left;
                        margin-top: 22px;
                    }
                   
                }
                &:nth-child(2){
                    width: 300px;
                   
                }
                &:nth-child(3){
                    width: 190px;
                   
                }
                &:nth-child(4){
                    width: 160px;
                   
                }
                &:nth-child(5){
                    width: 210px;
                   
                }
            }
        }
        ul.order_head{
            height: 40px;
            li{
                height: 40px;
                line-height: 40px;
                color: #000;
                font-size: 12px;
                box-sizing:border-box;
                border-bottom:none;
                &:nth-child(1){
                    padding-left: 60px;
                    box-sizing: border-box;
                    text-align: left;
                   
                }
            }
        }
        .total{
            width: 100%;
            height: 55px;
            line-height: 55px;
            text-align: right;
            border-bottom: 1px #E0E0E0 solid;
            span{
                display: inline-block;
                margin-right: 10px;
            }
            span.num{
                display: inline-block;
                color: #000000;
                font-size: 12px;
            }
            span.total_{
                color: #666666;
                 font-size: 12px;
            }
            span.total_price{
                font-size: 20px;
                color: #ee0a0d;
                margin-right: 50px;
            }
        }
        .liuyan{
            width: 100%;
            padding: 0 22px;
            box-sizing: border-box;
            .liu_title{
                line-height: 55px;
                margin: 10px 0 0 0;
                font-size: 18px;
                color: #000000;
                font-weight: bold;
            }
            textarea{
                width: 100%;
                height: 123px;
                resize: none;
                background: #f2f2f2;
                border: none;
                padding: 10px;
                box-sizing: border-box;
                line-height: 20px;
                margin-bottom: 30px;
            }
        }
    }
    .timepick{
        width:100% ;
        text-align: center;
        color: #aaa9a9;
        margin-bottom: 30px;
        .btn{
            display: inline-block;
            width: 135px;
            height: 32px;
            border:1px #aaa9a9 solid;
            border-radius:5px ;
            margin: 0 22px;
            input{
                width: 100%;
                border: none;
                background: none;
                 line-height: 32px;
                text-align: center;
                color: #aaa9a9;
            }
        }
        .submit{
            width: 130px;
            height: 32px;
            border-radius:5px ;
             display: inline-block;
             background: #ee0a0d;
             line-height: 32px;
             color: #fff;
        }
    }
    .table_order{
        width: 1177px;
        overflow: hidden;
        margin: 0 auto;
        // border: 1px #e0e0e0 solid;
        
        ul{
            width: 100%;
            li{
               
                
                float: left;
                width: 50%;
                padding-left: 20px;
                box-sizing:border-box;
                height:40px;
                text-align:  left;
                line-height:40px; 
                color:#000; 
                font-size: 14px;
                span{
                    color: #5f5f5f;
                }
                 &:last-child{
                    border-right: none;
                }
                
            }
        }
    }
  
   

 }
 .huizong{
     width: 1202px;
     box-sizing: border-box;
     padding: 15px;
     border: 1px #e0e0e0 solid;
     border-top: none;
     margin-bottom: 60px;
     p{
         width: 100%;
         text-align: right;
         color: #666666;
         font-size: 14px;
         line-height: 31px;
         span.price{
             width: 160px;
             display: inline-block;
         }
         span.total_price{
             font-size: 18px;
             font-weight: bold;
         }
         span{
             color: #ee0a0d;
         }
     }
 
 
 }


.img{
    width: 1000px;
    margin: 0 auto 50px;
    img{
        width: 100%;
    }
}



@media only screen and (max-width:750px){
    .contant-m{
        padding-top: 0.87rem;
        padding-bottom: 0.98rem;
        width: 100%;
        display:block;
        .status-m{
            background:#eb1e24;
            line-height:2.1rem;
            width:100%;
            height:2.1rem;
            font-size:0.32rem;
            color:#fff;
            padding-left:0.5rem;
            box-sizing:border-box;
            img{
                float:left;
                width:0.96rem;
                margin:0.6rem 0.2rem 0 0;
            }
        }
        .order_info-m{
            border-bottom:0.15rem #f0f0f0 solid;
            overflow:hidden;
            .name{
                color:#6f6f6f;
                font-size:0.28rem;
                line-height:0.5rem;
                margin-top:0.3rem;
                b{
                    color:#000000;
                }
            }
            .address{
                color:#6f6f6f;
                font-size:0.28rem;
                 line-height:0.5rem;
                 margin-bottom:0.15rem;
                 overflow:hidden;
                span{
                    display:inline-block;
                    width:1.5rem;
                    float:left;
                }
                div {
                    float:left;
                    width:5.5rem;
                }
            }
        }
         .order_list-m{
            margin-bottom:0.3rem;
            ul {
                width:100%;
                li{
                    width:100%;
                    border-bottom:0.15rem #f0f0f0 solid;
                    .order_title{
                        width:100%;
                        height:.7rem;
                        margin-top:.2rem;
                        font-size:.24rem;
                        color:#575757;
                        line-height:.7rem;
                        span{
                            color:#eb1e24;
                            float:right;
                            display:block;
                            height:100%
                        }
                    }
                    .order_center{
                        width:100%;
                        height:1.8rem;
                        background:#f5f5f5;
                        .img{
                            width:1.6rem;
                            height:1.6rem;
                            margin:0.1rem;
                            float:left;
                            img{
                                width:100%;
                                height:100%;
                            }
                        }
                        .center_center{
                            float:left;
                            width:3.5rem;
                            margin-left:0.2rem;
                            p{
                                font-size:.28rem;
                                color:#4a4a4a;
                                line-height:.55rem;
                            }
                            span{
                                font-size:.2rem;
                                color:#b5b5b5;
                                float:left;
                            }
                        }
                        .center_right{
                            float:right;
                            width:1.5rem;
                             p{
                                font-size:.28rem;
                                color:#4a4a4a;
                                line-height:.55rem;
                                text-align:right
                            }
                            span{
                                display:block;
                                font-size:.28rem;
                                color:#b5b5b5;
                                 float:left;
                                 width:100%;
                                  text-align:right
                            }
                        }
                    }
                    .totol-order{
                        line-height:.5rem;
                        width:7.1rem;
                        margin:.2rem auto 0;
                        box-sizing:border-box;
                        font-size:.24rem;
                        color:#777777;
                        border-bottom:1px solid #ffd6d6;
                        text-align:right;
                        span{
                            margin-left:.3rem;
                        }
                    }
                    .btn{
                        width:100%;
                        height:.96rem;
                        line-height:.96rem;
                        text-align:right;
                        overflow:hidden;
                        a{
                            margin-top:.23rem;
                            width:1.6rem;
                            height:.5rem;
                            border-radius:.1rem;
                            border:1px solid #aaa9a9;
                            display:inline-block;
                            text-align:center;
                            line-height:.5rem;
                            font-size:.24rem;
                            float:right;
                            margin-left:.4rem;

                            &.pay{
                                color:#eb252b;
                                border:1px solid #eb252b;
                            }
                        }
                    }
                }
            }
        }
         .order_other{
            width:100%;
             font-size:0.26rem;
             padding:0.25rem 0.25rem;
             box-sizing:border-box;
            p{
                font-size:0.26rem;
                line-height:0.36rem;
                color:#4e4e4e;
            }
        }
    }
}
</style>