<template>
	<div>
        <div id="content">
            <div class="router">
                <div class="container">
                    <a href="###">首页</a>><a href="###">登录</a>
                </div>
            </div>
            <div class="container">
                <div class="chat">
                    <div class="chat_title">
                        收货人信息
                        <div class="btn">
                            <router-link to="user/address">+新增收货人地址</router-link> 
                        </div>
                    </div>
                    
                    
                    
                    <div class="address_list">
                        <ul>
                            <li v-for="(item,index) in address_list" :class="moren_id == item.address_id?'on':''" @click="moren(item.address_id,item.user_id)">
                                <div class="name">
                                    {{item.consignee}}
                                </div>
                                <div class="phone">{{item.tel}}</div>
                                <div class="phone">{{item.address_name}}{{item.address}}</div>
                                <div class="add_adress"><img src="img/address_right.png"/></div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
        
                <!-- <div class="chat">
                    <div class="chat_title">
                        收货人信息
                    </div>
                    
                    <div class="radio_list">
                        <ul>
                            <li class="check">中通快递</li>
                            <li>中通快递</li>
                            <li>中通快递</li>
                        </ul>
                    </div>
                    
                    
                </div> -->
                <div class="chat">
                    <div class="chat_title">
                        支付方式
                    </div>
                    
                    <div class="radio_list">
                        <ul>
                            <li :class="zhifu_index == 0?'check':''" @click="change_zhifu(0)" >微信支付</li>
                            <li :class="zhifu_index == 1?'check':''" @click="change_zhifu(1)">支付宝支付</li>
                            <li :class="zhifu_index == 2?'check':''" @click="change_zhifu(2)">银联支付</li>
                        </ul>
                    </div>
                </div>
                <div class="chat">
                    <div class="chat_title">
                        商品信息
                    </div>
                    
                    <div class="order_lists">
                        <ul class="order_head">
                            <li>商品信息</li>
                            <li>属性</li>
                            <li>单价</li>
                            <li>数量</li>
                            <li>小计</li>
                        </ul>
                        <ul v-for="(item,index) in pro_list">
                            <li>
                                <img :src="item.goods_thumb"/>
                                <span>{{item.goods_name}}</span>
                            </li>
                            <li>
                                <p>品牌：{{item.goods_sn}}</p>
                            </li>
                            <li>
                                <p class="red">￥{{item.shop_price}} /件</p>
                            </li>
                            <li>
                                <p>{{item.goods_number}}</p>
                            </li>
                            <li>
                                <p class="red">￥{{item.subtotal}}</p>
                            </li>
                        </ul>
                        <div class="total">
                            <span class="num">共{{total.total_number}}件商品</span>
                            <span class="total_">商品总金额：</span>
                            <span class="total_price">￥{{total.goods_price}}</span>
                        </div>
                        <div class="liuyan">
                            <div class="liu_title">
                                买家留言：
                            </div>
                            <textarea name="" v-model="customer_msg" rows="" cols=""></textarea>
                        </div>
                    </div>
                    
                    
                </div>
                <div class="huizong">
                    <p><span>{{total.total_number}}</span>件商品，商品总金额：<span class="price">￥{{total.goods_price}}</span></p>
                    <!-- <p>运费：<span class="price">+￥10 .00</span></p> -->
                    <p>应付总额：<span class="price">￥{{total.goods_price}}</span></p>
                    
                </div>
                <div class="submit_btn">
                    <a href="jacascript:void(0)" @click="suss">提交订单</a>
                </div>
            </div>  
        </div>
        <div id="contant-m">
            <div class="address_info" >
                <div class="name">收货人：张小明   <span>154****6985</span></div>
                <div class="address_name">收货地址：广东省广州市天河区江湾五路博览A座765路博览A</div>
            </div>
            <div class="pro_info_list">
                <ul>
                    <li v-for="(item,index) in pro_list">
                        <div class="container-m">
                            <div class="shang">
                                <div class="img"><img :src="'https://cy.gzziyu.com/'+item.goods_thumb"/></div>
                                <div class="pro_name">{{item.goods_name}}</div>
                                <div class="attr">品牌：{{item.goods_sn}} 年份：{{item.nianxian}}</div>
                                <div class="price">¥{{item.shop_price}} <span>x{{item.goods_number}}</span></div>
                            </div>
                            <div class="total">共{{item.total_number}}件商品 小计： <span>¥{{item.goods_price}}</span></div>
                        </div>
                    </li>
                   
                </ul>
            </div>
            <div class="form">
                <div class="container-m">
                    <form >
                        <div class="item">
                            <div class="label">买家留言：</div>
                            <div class="input"><input type="text" v-model="customer_msg" placeholder="选填：填写内容已和卖家协商"></div>
                        </div>
                        <div class="item">
                            <div class="label">配送方式</div>
                            <div class="select">
                                <div v-for="(item,index) in sp_list"><input type="radio" @change="change_sp" :checked='sp_id == item.shipping_id' :value="item.shipping_id" name="kuaidi">{{item.shipping_name}}</div>
                            </div>

                        </div>
                        <div class="item">
                            <div class="label">支付方式</div>
                            <div class="select">
                                <div v-for="(item,index) in pay_list" ><input @change="change_pay" type="radio" :checked='pay_id == item.pay_id' name="zhifu" :value="item.pay_id">{{item.pay_name}}</div>
                                
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div> 
        <div class="order_bottom">
            <div class="total">合计： <span>¥125610</span></div>
            <div class="button" @click="suss">提交订单</div>
        </div>  
    </div>
</template>
<script>
    export default{
        name:'submit_order',
        data(){
            return {
                pro_list:[],
                total:{},
                address_list:[],
                pay_list:[],
                pay_id:5,
                customer_msg:'',
                sp_list:[],
                sp_id:'',
                zhifu_index:0,
                moren_id:''
            }
        },
        created(){
            this.get_product()
            this.get_address()
            this.get_pay()
            this.get_sp()
        },
        watch: {
            $route(to) {
                this.get_product()
                this.get_address()
                this.get_pay()
                this.get_sp()
            }
        },
        methods:{
            moren(add_id,user_id){
                var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
                this.$axios({
                    method:'post',
                    url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=morendizhi',
                    params:{
                        address_id:add_id,
                        user_id:user_id
                    }
                })
                .then((res)=>{
                    console.log(res)
                    this.get_address()
                    if(res.data.success == 1){
                        alert(res.data.msg)
                        
                    }
                })
            },
            change_zhifu(index){
                this.zhifu_index = index
            },
            change_pay(e){

                this.pay_id = e.target.value
            },
            change_sp(e){

                this.sp_id = e.target.value
            },
            get_product(){
                var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
                this.$axios({
                    method:'post',
                    url:'http://cy.gzziyu.com//mobile/ny_flow_cart.php?action=get_checkout_info',
                    params:{
                        openid:userInfo.openid
                    }
                })
                .then((res)=>{
                    console.log(res)
                    delete  res.data.goods_list.goods_count;
                    this.pro_list = res.data.goods_list
                    this.total = res.data.total
                })
                .catch((err)=>{
                    console.log(err)
                })
            },
            get_address_moren(){
                var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
                console.log(userInfo.openid)
                this.$axios({
                    method:'post',
                    url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=address_id',
                    params:{
                        openid:userInfo.openid
                    }
                })
                .then((res)=>{
                    console.log(res)
                    this.moren_id = res.data
                })
                .catch((err)=>{
                    console.log(err)
                })
            },
            get_address(){
                var that = this;

                var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
                this.$axios({
                    method: 'post',
                    url:that.GLOBAL.url+'ziyu.php?Action=address_list',
                    params:{
                        openid:userInfo.openid
                    }
                }).then((res)=>{
                    console.log(res);
                    that.address_list = res.data
                    this.get_address_moren()
                    

                }).catch((err) =>{
                    console.log(err);
                  });
            },
            get_pay(){
                this.$axios({
                    method: 'post',
                    url:this.GLOBAL.url+'ny_flow_cart.php?action=orderpayment'
                }).then((res)=>{
                    console.log(res);
                    this.pay_list = res.data
                    

                }).catch((err) =>{
                    console.log(err);
                  });
            },

            suss(){
                var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
                console.log('openid')
                console.log(userInfo.openid)
                console.log('customer_msg')
                console.log(this.customer_msg)
                console.log('sp_id')
                console.log(this.sp_id)
                let that = this;
                this.$axios({
                    method: 'post',
                    url:this.GLOBAL.url+'ny_flow_pay.php?action=pre_wxpay2',
                    params:{
                        openid: userInfo.openid,
                        customer_msg: this.customer_msg,
                        shipping_id: this.sp_id
                    }
                }).then((res)=>{
                    console.log(res);
// address: "天津市,市辖区,和平区东城国际"
// consignee: "冯"
// order_amount: "0.00"
// order_sn: "20190105174643632383"
// pay_config: "a:4:{i:0;a:3:{s:4:"name";s:14:"alipay_account";s:4:"type";s:4:"text";s:5:"value";s:0:"";}i:1;a:3:{s:4:"name";s:10:"alipay_key";s:4:"type";s:4:"text";s:5:"value";s:0:"";}i:2;a:3:{s:4:"name";s:14:"alipay_partner";s:4:"type";s:4:"text";s:5:"value";s:0:"";}i:3;a:3:{s:4:"name";s:17:"alipay_pay_method";s:4:"type";s:6:"select";s:5:"value";s:1:"0";}}"
// pay_id: 4
// pay_online: null
// tel: "15889832298"
                    
                    // console.log(that.$router)
                    if(res.data){
                        that.$router.push({name:'submit_order_success',query:{order_num:res.data.order_sn,order_price:res.data.order_amount,address:res.data.address,consignee:res.data.consignee,tel:res.data.tel,pay_online:res.data.pay_online,order_id:res.data.order_id}})
                    }
                    
                }).catch((err) =>{
                    console.log(err);
                  });

            },
            get_sp(){
                var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
                this.$axios({
                    method: 'post',
                    url:this.GLOBAL.url+'ny_flow_cart.php?action=get_shipping',
                    params:{
                        openid: userInfo.openid
                    }
                }).then((res)=>{
                    console.log(res);
                    this.sp_list = res.data
                    this.sp_id = res.data[0].shipping_id

                }).catch((err) =>{
                    console.log(err);
                  });
            }
        }
    }
</script>
<style lang="scss">
 @import "./submit_order.scss"
</style>