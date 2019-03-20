<template>
	<div>
         <div id="content">
            <div class="router">
                <div class="container">
                    <a href="###">首页</a>><a href="###">提交订单成功</a>
                </div>
            </div>
            <div class="container">
                <div class="tip_submit">
                    <img src="static/img/order_success.png"/>
                    订单<span>{{order_num}}</span>提交成功！
                </div>
                <div class="add">货物寄送至：{{address}} {{consignee}} 收  {{tel}}</div>
                <div class="btn_list">
                    <router-link :to="'/order_detail?id='+order_id">查看详情</router-link>
                    <router-link to="/shop">继续购买></router-link>
                    <div v-html='pay_online' class="topay"></div>
                </div>
            </div>
        </div>
        <div id="content-m">
            <div class="container-m">
                <div class="nn">
                    <div class="tip-m"><img src="static/img/success.png">订单提交成功</div>
                    <div class="p"><span>订单编号：</span><div>{{order_num}}</div></div>
                    <div class="p"><span>付款金额：</span><div>¥{{order_price}}</div></div>
                    <div class="p"><span>收货人：</span>  <div> {{consignee}} {{tel}}</div></div>
                    <div class="p"><span>收货地址：</span><div>{{address}}</div></div>
                </div>
                <div class="link_list"> 
                    <router-link :to="'/order_detail?id='+order_id">查看详情</router-link>
                    <router-link to="/">返回首页</router-link>

                </div>
            </div>
        </div>   
    </div>
</template>
<script type="text/javascript">
    export default {
        name:'order_success',
        data(){
            return{
                address: "",
                consignee: "",
                order_num: "",
                order_price: "",
                tel:'',
                pay_online:'',
                order_id:''
            }
        },
        created(){
            console.log(this.$route.query)
            this.address = this.$route.query.address
            this.consignee = this.$route.query.consignee
            this.order_num = this.$route.query.order_num
            this.order_price = this.$route.query.order_price
            this.tel = this.$route.query.tel
            this.pay_online = this.$route.query.pay_online
            console.log(this.pay_online)
            this.order_id = this.$route.query.order_id
                
        },
        watch: {
            $route(to) {
                console.log(to)
               if(to.path == "/submit_order_success"){
                console.log(this.$route.query)
               }
            }
        },
    }
</script>
<style lang="scss">
.topay{
    display: inline-block;
}
.topay div{
    display: inline-block;
}
.topay input{
    height: 30px;
    background: #fff;
    border: #ee0a0d 1px solid;
    padding: 0 20px;
    color: #ee0a0d;
}
.router{
        font-size:14px;
        line-height:30px;
        color:#666666;
        margin: 15px 0 30px 0;
    }
	.tip_submit{
    width: 100%;
    font-size: 24px;
    color: #606060;
    
    span{
        color: #cc080b;
    }
    img{
        width: 33px;
        height: 33px;
        float: left;
        margin-right: 10px;
    }
}
.add{
    font-size: 14px;
    color: #858585;
    margin: 15px 0;
}
.btn_list{
    margin-bottom: 300px;
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
    #content-m{
        padding-top: 0.87rem;
        padding-bottom: 1.96rem;
        width: 100%;
        .nn{
           overflow:hidden;
           padding-bottom:0.3rem;
           border-bottom:1px solid #ffd6d6;
        }
        .tip-m{
            line-height:1.3rem;
            font-size:0.36rem;
            color:#78bb58;
            img{
                width:0.5rem;
                height:0.5rem;
                display:inline-block;
                float:left;
                margin:0.4rem 0.1rem 0.4rem 0.2rem; 
            }
        }
        .p{
            color:#727272;
            font-size:0.28rem;
            line-height:0.48rem;
            width:100%;
            overflow:hidden;
            span{
                float:left;
                width:1.5rem;
            }
            div{
                width:5rem;
                float:left;
            }
        }
        .link_list{
            width:100%;
            text-align:center;
            a{
                width:2.07rem;
                height:0.64rem;
                text-align:center;
                display:inline-block;
                line-height:0.64rem;
                border:1px solid #dddcdc;
                border-radius:0.05rem;
                font-size:0.28rem;
                color:#929292;
                background:#fff;
                margin-right:0.3rem;
            }
        }
    }
}

</style>