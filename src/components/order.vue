<template>

	<div>
     <div class="contant_right">
                <div class="common_title pc">
                    <div class="text" :class="status == 0?'active':''" @click=" change_tab(0)">所有订单</div>
                    <div class="text" :class="status == 1?'active':''"  @click=" change_tab(1)">待付款</div>
                    <div class="text" :class="status == 2?'active':''"  @click=" change_tab(2)">待发货</div>
                    <div class="text" :class="status == 3?'active':''"  @click=" change_tab(3)">待收货</div>
                    <div class="text" :class="status == 4?'active':''"  @click=" change_tab(4)">待评价</div>
                    <div class="form"><input type="text" v-model="keywords" placeholder="输入订单号或商品名称进行搜索"/> <button type="button" @click="search">订单搜索</button></div>
                </div>
                <div class="table_header pc">
                    <div class="li">商品信息</div>
                    <div class="li">单价</div>
                    <div class="li">数量</div>
                    <div class="li">订单总额</div>
                    <div class="li">订单状态</div>
                    <div class="li">操作</div>
                </div>
                <div class="order_list pc">
                    <ul>
                        <li v-for="(item,index) in list">
                            <div class="li_header"><span>{{item.order_time}}</span><span>订单号：{{item.order_sn}}</span></div>
                            <div class="line" >
                                <div class="pro_img li_common">
                                    <div class="one" v-for="(items,indexs) in item.goods_list" :key="indexs" >
                                        <img :src="items.goods_thumb" alt="">
                                        <p>{{items.goods_name}}</p>
                                        <span>品牌：黎明 ，年份：</span>
                                    </div>
                                </div>
                                <div class="price li_common" :style="'height:'+(100*item.goods_list.length)+'px'" ><p class="red" v-for="(items,indexs) in item.goods_list" :key="indexs" style="height:80px;">￥{{items.goods_price}} /件</p></div>
                                <div class="num li_common" :style="'height:'+(100*item.goods_list.length)+'px'"><p>{{item.zgoods_number}}</p></div>
                                <div class="price li_common" :style="'height:'+(100*item.goods_list.length)+'px'"><p class="red">￥{{item.total_fee}}</p></div>
                                <div class="status li_common" :style="'height:'+(100*item.goods_list.length)+'px'"><p>{{item.biaoti}}</p></div>
                                <div class="open li_common" :style="'height:'+(100*item.goods_list.length)+'px'">
                                    <a href="javascript:void(0)" class="pay" v-if="item.zhuangtai == 1" @click="go_detail(item.order_id)">去付款</a>
                                    <a href="javascript:void(0)" class="eva" v-if="item.zhuangtai == 2" @click="queren(item.order_id)">确认收货</a>
                                    <!-- <a href="javascript:void(0)" class="eva"  v-if="!(item.zhuangtai == 3)">去评价</a> -->
                                    <a href="javascript:void(0)" @click="cenel(item.order_id)" v-if="!(item.zhuangtai == 0)">取消订单</a>
                                    <a href="javascript:void(0)"  @click="go_detail(item.order_id)">查看订单</a>
                                </div>
                            </div>
                        </li>
                        
                    </ul>
                </div>
                

                <div class="container-m m">
                    <div class="tab-m">
                        <ul>
                            <li :class="status == 0?'on':''" @click=" change_tab(0)">全部</li>
                            <li :class="status == 1?'on':''" @click=" change_tab(1)">待支付</li>
                            <li :class="status == 2?'on':''" @click=" change_tab(2)">待发货</li>
                            <li :class="status == 3?'on':''" @click=" change_tab(3)">已发货</li>
                            <li :class="status == 4?'on':''" @click=" change_tab(4)">已完成</li>
                        </ul>
                    </div>
                </div>
                <div class="order_list-m m">
                    <ul>
                        <li v-for="(item,index) in list" :key="index">
                            <div class="order_title" >
                                <div class="container-m">
                                    订单编号：{{item.order_sn}}
                                    <span>{{item.biaoti}}</span>
                                </div>
                            </div>
                            <div class="order_center" v-for="(items,indexs) in item.goods_list" >
                                <div class="container-m">
                                    <div class="img"><img :src="'https://cy.gzziyu.com/'+items.goods_img"></div>
                                    <div class="center_center">
                                        <p>{{items.goods_name}}</p>
                                        <span>{{items.goods_attr}}</span>
                                    </div>
                                    <div class="center_right">
                                        <p>¥{{items.goods_price}}</p>
                                        <span>数量：x{{items.goods_num}}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="totol-order">
                                <span>共{{item.zgoods_number}}件商品</span>
                                <span>合计：¥{{item.total_fee}}</span>    
                            </div>
                            <div class="container-m">
                                <div class="btn">
                                
                                     <!-- <a href="javascript:void(0)" class="pay">去付款</a> -->
                                    <a href="javascript:void(0)" class="default" v-if="item.zhuangtai == 2" @click="queren(item.order_id)">确认收货</a>
                                    <!-- <a href="javascript:void(0)" class="eva"  v-if="!(item.zhuangtai == 1)">去评价</a> -->
                                    <a href="javascript:void(0)" class="default" @click="cenel(item.order_id)" v-if="!(item.zhuangtai == 0)">取消订单</a>
                                    <a href="javascript:void(0)"  @click="go_detail(item.order_id)">查看订单</a>
                                </div>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div>
       

          

    </div>	
	
	
</template>

<script>
    export default{
        name:'order',
        data(){
            return {
                list:[],
                status:0,
                keywords:''
            }   
        },
        created(){
            this.get_order()
        },
       watch: {
            $route(to) {
               if(to.path == "/user/order"){
                this.change_tab(this.$route.query.id)
               }
            }
        },
        methods:{
            search(){
                 var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
                
                   this.$axios({
                        url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=order_list',
                        method:'post',
                        params:{
                            openid:userInfo.openid,
                            order_sn:this.keywords
                        }
                    }) 
                    .then((res)=>{
                        console.log('订单')
                        console.log(res)
                        this.list = res.data
                    })
            },
            change_tab(index){
                this.status = index;
                if(index == 0){
                    this. get_order()
                }else{
                     this.get_order(index)
                }
            },
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
                        this.get_order()
                    })
            },
            cenel:function (id) {
                

                    var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
                  this.$axios({
                        url:'http://cy.gzziyu.com/mobile/ny_flow_cart.php?action=cancel_order',
                        method:'post',
                        params:{
                            openid:userInfo.openid,
                             order_id:id
                        }
                    }) 
                    .then((res)=>{
                        console.log(res)
                        alert('取消成功')
                        this.get_order()
                    })
            },
            go_detail(id){
                this.$router.push({name:'order_detail',query:{id:id}})
            },
            get_order(id){
                 var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
                 console.log(id)
                 var id = id || '';
                   this.$axios({
                        url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=order_list',
                        method:'post',
                        params:{
                            openid:userInfo.openid,
                            type:id
                        }
                    }) 
                    .then((res)=>{
                        console.log("订单")
                        console.log(res)
                        this.list = res.data
                        .filter(item=>{
                            return item.zgoods_number>0
                        })
                    })
               
                
            }
        }
    }
</script>
<style lang="scss" >
#content{
    background:#fff;
}
#contant-m{
    display:none;
    background:#fff;
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
	                    color: #1a1a1a;
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
                            color: #ee0a0d;
                        }
	                }
	            }
	        }
	    }
	}
}
.m{
    display:none;
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
    .pc{
        display: none;
    }
    .m{
        display:block;
    }
    .contant_right{
        width:7.5rem;
        padding-bottom: 0.98rem;
    }
    #contant-m{
        padding-top: 0.87rem;
        padding-bottom: 0.98rem;
        width: 100%;
        display:block
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

    }
}


.common_title{
     .text{
        font-size: 16px;
        width: 100px;
        text-align: center;
        border: none !important;
        height: 100%;
        color: #ee0a0d;
        float: left;
    }
    .active{
        border-bottom:1px solid #ee0a0d !important;
    }
    .form{
        float: right;
        input{
            width: 300px;
            height: 30px;
            border:1px solid #F0F0F0;
            padding: 5px 10px;
            line-height: 30px;
            box-sizing: border-box;
        }
        button{
            width: 100px;
            border:1px solid #F2F2F2;
            color: #090909;
            background: #F2F2F2;
            height: 30px;
            border:1px #E0E0E0 solid
        }
    }
}
.table_header{
    width: 100%;
    height: 42px;
    background: #f0f0f0;
    margin: 10px 0;
    .li{
        &:nth-child(1){
            width: 400px;
            padding-left: 20px;
            text-align: left;
        };
        
        float: left;
        width: 130px;
        line-height: 42px;
        box-sizing: border-box;
        color: #000000;
        font-size: 12px;
        text-align: center;
        
    }
    
}
.order_list{
    width: 100%;
    ul{
        width: 100%;
        li{
            width: 100%;
            margin-bottom:15px;
            border:1px solid #E0E0E0;
            .li_header{
                width: 100%;
                height: 30px;
                background: #f0f0f0;
                line-height: 30px;
                span{
                    color: #000;
                    font-size: 12px;
                    margin-left: 20px
                }
            }
            .line{
                width: 100%;
                overflow: hidden;
                border: 1px solid #E0E0E0;
                .li_common{
                    &:nth-child(1){
                        width: 400px;
                    }
                    // min-height:100px;
                    float: left;
                    width: 130px;
                    box-sizing: border-box;
                    color: #000000;
                    font-size: 12px;
                    text-align: center;
                    border-right: 1px solid  #E0E0E0;
                    p{
                         font-size: 14px;
                        color: #000;
                        float: left;
                        width: 100%;
                        margin-top: 22px;
                        margin-bottom: 5px;
                        text-align: center;
                    }
                    p.red{
                        color: #ee0a0d;
                    }
                }
                .pro_img{
                    .one{
                        overflow: hidden;
                        // border-bottom: 1px solid  #E0E0E0;
                    }
                    img{
                        float: left;
                        width: 75px;
                        height: 75px;
                        margin: 12px;
                    }
                    p{
                        font-size: 14px;
                        color: #000;
                        float: left;
                        margin-top: 22px;
                        margin-bottom: 5px;
                        width: 200px;
                         text-align: left;
                    }
                    span{
                        font-size: 12px;
                        color: #7f7f7f;
                        float: left;
                         width: 200px;
                         text-align: left;
                    }
                }
                .open{
                    padding: 5px 0;
                    a{
                        width: 80px;
                        height: 22px;
                        text-align: center;
                        line-height: 22px;
                        display: block;
                        margin-bottom: 5px;
                        border-radius: 5px;
                        margin:0 auto 5px;
                        box-sizing:border-box;
                        &.pay{
                            background: #fff;
                            color: #ee0a0d;
                            border:1px solid #ee0a0d;
                            border-radius: 0;
                        }
                         &.eva{
                            border:1px solid #ee0a0d;
                            color: #ee0a0d;
                            border-radius: 0;
                        }
                    }
                }
            }
        }
    }
}
.page{
margin-left: 230px;
    clear: both;
    margin-bottom: 45px;
    margin-top: 45px;
    overflow: hidden;
    span{
        display: block;
        float: left;
        color: #4c4c4c;
        line-height: 30px;
        margin-right: 15px;
    }
    ul{
        float: left;
        li{
            padding: 0px 15px;
            height: 30px;
            border:1px #e1e1e1 solid;
            cursor: pointer;
            float: left;
            margin-right: 10px;
            line-height: 30px;
            text-align: center;
            color: #4c4c4c;
            &.on{
                background: #ee0a0d;
                color: #fff;
                border:none
            }
        }
    }
}


@media only screen and (max-width:750px){
     
        .tab-m{
            width:100%;
            margin:0.15rem 0;
            ul{
                width:100%;
                overflow:hidden;
                li{
                    float:left;
                    width:1.35rem;
                    height:.6rem;
                    background:#f0f0f0;
                    font-size:.24rem;
                    color:#4a4a4a;
                    text-align:center;
                    line-height:.6rem;
                    margin-right:0.05rem;
                    &:nth-child(5){
                        margin-right:0
                    }
                    &.on{
                        background:#eb1e24;
                        color:#fff;
                    }
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
       
}

</style>