<template>
	<div>
		<div id="content">
			<div class="router">
				<div class="container">
					<router-link to="/">首页</router-link>><a href="javascript:void(0)">购物车</a>
				</div>
			</div>
			<div class="container">
				<div class="cart_title">
					共 23 件商品
				</div>
				<div class="cart_list">
					<div class="cart_head">
						<div class="common_cart check" @click="selectAll">
							<img src="static/img/check.png" v-if="!allState" align="midden" alt="">
							<img src="static/img/check_active.png" v-if="allState" align="midden" alt="">
							全选
						</div>
						<div class="common_cart pro_info"><p>商品信息</p></div>
						<div class="common_cart attr"><p>属性</p></div>
						<div class="common_cart price"><p>单价</p></div>
						<div class="common_cart num"><p>数量</p></div>
						<div class="common_cart price"><p>小计</p></div>
						<div class="common_cart open"><p>操作</p></div>
					</div>
					<ul>
						<li v-for="(item,index) in lists">
							<div class="common_cart check" @click="select(index)">
								<img src="static/img/check.png" v-if="!item.radio"  alt="">
								<img src="static/img/check_active.png" v-if="item.radio"  alt="">
							</div>
							<div class="common_cart pro_info">
								<img :src="item.goods_thumb" alt="">
								<p>{{item.goods_name}}</p>
							</div>
							<div class="common_cart attr"><p>品牌：{{item.goods_sn}}</p></div>
							<div class="common_cart price"><p class="red">￥{{item.goods_price}} /件</p></div>
							<div class="common_cart num">
								<div class="num_open">
									<div class="minu" @click="sub(index)">-</div>
									<div class="input">
										<input type="text" name="" id="" value="1" v-model="item.goods_number" />
									</div>
									<div class="add_num" @click="add(item.rec_id,index)">+</div>
								</div>
							</div>
							<div class="common_cart price"><p class="red">￥{{item.subtotal}}</p></div>
							<div class="common_cart open"><p><a href="javascript:void(0)" @click="dele(item.rec_id)">删除</a></p></div>
						</li>
						<li v-if="lists.length == 0" style="text-align: center;">没有商品</li>
						
					</ul>
					<div class="cart_bottom">
						<div class="common_cart check" @click="selectAll">
							<img src="static/img/check.png" v-if="!allState" align="midden" alt="">
							<img src="static/img/check_active.png" v-if="allState" align="midden" alt="">
							全选
						</div>
						<div class="common_cart pro_info" @click="dele_check"><p>删除选中商品</p></div>
						<div class="common_cart all_num"><p>已选择1件商品</p></div>
						<div class="common_cart total"><p>合计：<span>￥{{allMoney}}</span></p></div>
						<div class="common_cart sumbit" @click="clearing">提交订单</div>
					</div>
				</div>
			</div>
		
		</div>
		<div id="contant-m">
			<div class="container-m">
				<div class="cart_list-m">
					<ul class="">
						<li v-for="(item,index) in lists">
							<div class=" check" @click="select(index)">
								<img src="static/img/check.png" v-if="!item.radio"  alt="">
								<img src="static/img/check_active.png" v-if="item.radio"  alt="">
							</div>
							<div class="img"><img :src="item.goods_thumb"/></div>
							<div class="pro_Info">
								<div class="name">{{item.goods_name}}</div>
								<div class="attr-m">品牌：{{item.goods_sn}} 年份：{{item.nianxian}}</div>
								<div class="price">¥{{item.goods_price}}</div>
								<div class="num">
									<div class="minu" @click="sub(index)">-</div>
									<input type="text" v-model="item.goods_number" value="1"/>
									<div class="add" @click="add(item.rec_id,index)">+</div>
								</div>
							</div>
						</li>
						
					</ul>
				</div>
				<div class="cart_bottom-m">
					<div class="common_cart check" @click="selectAll">
						<img src="static/img/check.png" v-if="!allState" align="midden" alt="">
						<img src="static/img/check_active.png" v-if="allState" align="midden" alt="">
						全选
					</div>
					<div class="total">
						合计：<span>￥{{allMoney}}</span>
					</div>
					<div class="pay" @click="clearing">去结算</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		name:'cart',
		data(){
			return {
				lists:[],
				allMoney:'',
				allState:false,
				allMoney:0
			}
		},
		created(){
			this.get_list()
			this.changeData()
			
		},
		watch: {
	        $route(to) {
	            this.get_list()
	            console.log(to)
	            if(to.path == '/cart'){
	            	this.gengxin()
	            	this.changeData()
	            }
	        }
	    },
		methods:{
			get_list(){
				console.log('获取商品')
				if (!sessionStorage.getItem('userInfos')) {
			    	
					alert('请先登录')
			      this.$router.push('login')
			      return false
			    }
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					url:'https://cy.gzziyu.com/mobile/ny_flow_cart.php?action=get_cart_info',
					method:'post',
					params:{
						openid:userInfo.openid
					}
				})
				.then((res)=>{
					console.log(res)
					res.data.goods_list.map((e)=>{
						e.radio = false
					})
					this.lists = res.data.goods_list
					this.allState = false
				})
			},
			// 减法
			 sub: function (idx) {
			 	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
			    this.lists[idx].goods_number--
			    if ( this.lists[idx].goods_number <= 0) {
			    	var con  = confirm('确定需要删除吗？')
			      if (con) {
			            this.$axios({
			            	method:'post',
			              url:  'https://cy.gzziyu.com/mobile/ny_flow_cart.php?action=delete_cart',
			              params: {
			                openid: userInfo.openid,
			                goods_id: this.lists[idx].rec_id
			              }
			             
			            })
			            .then((res)=>{
			            	console.log(res)
			            	this.get_list()
			    			this.calcMoney()
			            })
			            .catch((err)=>{
			            	console.log(err)
			            })
			          
			            
			          } else {
			            for (let i = 0; i < this.lists.length; i++) {
			              if (this.lists[i].goods_number <= 0) {
			                this.lists[i].goods_number = 1
			              }
			            }
			           
			          }
			    } else {
			       this.$axios({
				    	url:'https://cy.gzziyu.com/mobile/ny_flow_cart.php?action=update_cart',
				    	method:'post',
						params:{
							openid: userInfo.openid,
					        color_id: this.lists[idx].rec_id,
					        goods_number: this.lists[idx].goods_number
						}
				    })
				    .then((res)=>{
				    	console.log(res)
				    	// this.get_list()
			    			this.calcMoney()
				    })
			    }

			  },
						//加法
			add(id,index) {
				this.lists[index].goods_number++;
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				console.log(index,id)
				console.log(this.lists[index].goods_number)
				console.log(userInfo.openid)
			    this.$axios({
			    	url:'https://cy.gzziyu.com/mobile/ny_flow_cart.php?action=update_cart',
			    	method:'post',
					params:{
						openid: userInfo.openid,
				        color_id: id,
				        goods_number: this.lists[index].goods_number
					}
			    })
			    .then((res)=>{
			    	console.log(res)
			    	// this.get_list()
			    	this.calcMoney()
			    })
			},
			dele(id){
				var con = confirm("确认删除该商品吗？");
				console.log(id)
				if(con){
					var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
					this.$axios({
						method:'post',
						url:'https://cy.gzziyu.com//mobile/ny_flow_cart.php?action=delete_cart',
						params:{
							goods_id:id,
							openid:userInfo.openid
						}
					})
					.then((res)=>{
						console.log(res)
						if(res.data.msg == 'success'){
							alert('删除成功')
							this.get_list()
						}
					})
				}
				
			},
			deles(id){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					method:'post',
					url:'https://cy.gzziyu.com//mobile/ny_flow_cart.php?action=delete_cart',
					params:{
						goods_id:id,
						openid:userInfo.openid
					}
				})
				.then((res)=>{
					if(res.data.msg == 'success'){
							alert('删除成功')
							this.get_list()
						}
				})
				
			},
			dele_check(){

				this.lists.map((e,index)=>{
					if(e.radio){
						this.deles(e.rec_id)
						
					}
					
				})
				// alert('删除成功')
				
			},
			selectAll: function (e) {
			    let data = this.lists;
			    if (!this.allState) {
			      this.lists.map((item, i) => {
			        item.radio = true
			        item.is_checkout = 1
			      })
			     this.allState = true
			    } else {
			      this.lists.map((item, i) => {
			        item.radio = false
			        item.is_checkout = 0
			      })
			        this.allState = false
			    }
			    this.calcMoney()
			  },
			select(index) {
			   

			   this.lists[index].radio = !this.lists[index].radio
			    this.lists[index].is_checkout = this.lists[index].is_checkout=="0"?'1':'0'

			   console.log(this.lists)
			    this.calcMoney()
			    for (var i = 0; i <  this.lists.length; i++) {
			      if (! this.lists[i].radio) {
			       
			          this.allState = false
			        
			        this.calcMoney()
			        return
			      } else {
			         this.allState = true
			        this.calcMoney()
			      }
			  	}
		    },
		    calcMoney () {
			    let num = 0
			    this.lists.map((item, i) => {
			      if (item.radio) {
			        num += parseInt(item.goods_price) * parseInt(item.goods_number)
			      }
			    })
			    num = this.toDecimal2(num);
			    this.allMoney = num
			  },
			// 数字格式化
			toDecimal2(x) {
			    var f = parseFloat(x);
			    if (isNaN(f)) {
			      return false;
			    }
			    var f = Math.round(x * 100) / 100;
			    var s = f.toString();
			    var rs = s.indexOf('.');
			    if (rs < 0) {
			      rs = s.length;
			      s += '.';
			    }
			    while (s.length <= rs + 2) {
			      s += '0';
			    }
			    return Number(s);
			},
			clearing(){
				console.log(123)
			    let sendData = JSON.parse(JSON.stringify(this.lists))
			    var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));

			    sendData.map((item, i) => {
			      item.openid = userInfo.openid
			    })

			    sendData = sendData.filter((item, i) => {
			      return item.radio
			    })
			    

			    if (!sendData.length) {
			      alert('请选择商品')
			      return

			    }
			    console.log('shangpin')
 				console.log(sendData);
 				let arr = [];
 				sendData.map(function(item){
 					let obj = {};
 				  
 				  	obj.rec_id = item.rec_id 
 				  	obj.user_id = item.user_id 
 				  	arr.push(obj)
 				})
 				console.log(arr)
 				console.log(JSON.stringify(arr))
			    this.$axios({
			    	method:'get',
			    	url:'http://cy.gzziyu.com/mobile/ny_flow_cart.php?action=checkout_cart&name='+JSON.stringify(arr),
			    	
			    })
			    .then((res)=>{
			    	console.log(res)
			    	if(res.data.msg == "success"){
			    		this.$router.push('submit_order')
			    	}
			    })

			},
			// 更新
			gengxin(){
			
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));

				// this.$axios({
				// 	url:'https://cy.gzziyu.com//mobile/ny_flow_cart.php?action=gengxinzt',
				// 	method:'post',
				// 	params:{
				// 		openid:userInfo.openid
				// 	}
				// })
				// .then((res)=>{
				// 	console.log('sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
				// })
			}
		},

		
		
		
	}
</script>
<style lang="scss">
#content{
	background:#fff;
	.router{
        font-size:14px;
        line-height:30px;
        color:#666666;
        margin: 15px 0 30px 0;
    }
}
	.cart_list{
	width: 100%;
	margin-bottom: 60px;
	.cart_head{
		width: 100%;
		height: 40px;
		background: #f2f2f2;
		.common_cart{
			float: left;
			p{
				line-height: 40px;
				font-size: 12px;
			}
		}
		.check{
			line-height: 40px;
			width: 75px;
			font-size: 12px;
			img{
				display: inline-block;
				margin: 0 5px 0 10px
			}
		}
		.pro_info{
			width: 310px;
			padding-left: 20px;
			box-sizing:border-box;
		}
		.attr{
			width: 200px;
			text-align: center;
		}
		.price{
			width: 130px;
			text-align: center;
		}
		.num{
			width: 200px;
			text-align: center;

		}
		.open{
			width: 150px;
			text-align: center;
		}
	}
	ul{
		li{
			width: 100%;
			height: 100px;
			border:1px solid #f2f2f2;
			.common_cart{
				float: left;
				p{
					line-height: 40px;
					font-size: 14px;
					color: #7f7f7f;
					margin:23px 0 0 0;
				}
				p.red{
					color: #ee0a0d;
				}
			}
			.check{
				width: 75px;
				height: 100%;
				img{
					display: inline-block;
					margin: 30px 12px;
				}
			}
			.pro_info{
				width: 310px;
				img{
					float: left;
					width: 75px;
					height: 75px;
					margin: 12px;
				}
				p{
					float: left;
					width: 200px;
					margin:23px 0 0 0;
				}
			}
			.attr{
				width: 200px;
				text-align: center;
			}
			.price{
				width: 130px;
				text-align: center;
			}
			.num{
				width: 200px;
				text-align: center;
				.num_open{
	            width: 155px;
	            overflow: hidden;	
	            margin: 22px auto 0;
	            .add_num{
	                width: 55px;
	                background: #e5e5e5;
	                text-align: center;
	                line-height: 26px;
	                float: left;
	            }
	            .input{
	                width: 45px;
	                height: 26px;
	                border:1px #e5e5e5 solid;
	                box-sizing: border-box;
	                float: left;
	                input{
	                    width: 100%;
	                    height: 100%;
	                    border: none;
	                    text-align: center;
	                    background: none;
	                }
	            }
	            .minu{
	                width: 55px;
	                background: #e5e5e5;
	                text-align: center;
	                line-height: 26px;
	                float: left;
	            }
	        }
			}
			.open{
				width: 150px;
				text-align: center;
			}
		}
	}
	.cart_bottom{
		width: 100%;
		height: 40px;
		background: #f2f2f2;
		.common_cart{
			float: left;
			p{
				line-height: 40px;
				font-size: 12px;
			}
		}
		.check{
			line-height: 40px;
			width: 75px;
			font-size: 12px;
			img{
				display: inline-block;
				margin: 0 5px 0 10px
			}
		}
		.pro_info{
			width: 550px;
			padding-left: 20px;
			box-sizing:border-box;
		}
		.all_num{
			width: 200px;
			padding-left: 20px;
			box-sizing:border-box;
		}
		.total{
			width: 200px;
			padding-left: 20px;
			box-sizing:border-box;
			color: #666666;
			span{
				font-size: 20px;
				color: #ee0a0d;
			}
		}
		.sumbit{
			float: right;
			width: 150px;
			text-align: center;
			color: #fff;
			cursor:pointer;
			background: #ee0a0d;
			font-weight: bold;
			height: 100%;
			border: none;
			line-height: 40px;

		}
	}
}
@media only screen and (max-width:750px){
    #contant-m{
         padding-top: 0.87rem;
            padding-bottom: 0.98rem;
        width: 100%;
        .cart_list-m{
            width: 100%;
            ul{
                width: 100%;
                li{
                    width: 100%;
                    height: 2.6rem;
                    border-bottom: 1px solid #ffd6d6;
                    .check{
                        // background: url(../../static/img/check.png) no-repeat;
                        background-position: left center;
                        width: 0.5rem;
                        height: 100%;
                        float: left;
                        
                    }
                    .img{
                        width: 1.96rem;
                        height: 100%;
                        float: left;
                        img{
                            width: 1.80rem;
                            height: 1.80rem;
                            float: left;
                            margin: 0.08rem;
                        }
                    }
                    .pro_Info{
                        font-size: .3rem;
                        color: #000;
                        float: left;
                        width: 4.5rem;
                        .name{
                            
                        }
                        .price{
                            color: #eb1e24;
                        }
                        .attr-m{
                            font-size: .2rem;
                            color: #b5b5b5;
                            margin-bottom: 0.9rem;
                        }
                        .num{
                            width: 1.7rem;
                            height: .43rem;
                            float: right;
                            .minu,.add{
                                width: .56rem;
                                float: left;
                                height: 100%;
                                text-align: center;
                                background: #dfdfdf;
                                line-height: .43rem;
                            }
                            input{
                                width:.58rem ;
                                height: 100%;
                                border: none;
                                float: left;
                                text-align: center;
                                line-height: .43rem;
                                color: #000;
                                background: #f5f5f5;
                                font-size: 0.24rem;
                                
                            }
                        }
                    }
                }
            }
        }
        .cart_bottom-m{
            width: 100%;
            height: 0.98rem;
            background: #f0f0f0;
            position: fixed;
            z-index: 100;
            left: 0;
            bottom: 0;
             .check{
                // background: url(../../static/img/check.png) no-repeat;
                background-position: left center;
                width: 1.5rem;
                height: 100%;
                float: left;
                font-size: .28rem;
                line-height: .98rem;
                padding-left: .3rem;
                box-sizing: border-box;
                margin-left: 0.3rem;
                
                
            }
            .total{
                font-size: .28rem;
                color: #3c3c3c;
                float: left;
                line-height: .98rem;
                margin-left: 0.7rem;
                span{
                    color: #eb1e24;
                }
            }
            .pay{
                width: 2.25rem;
                height: .64rem;
                float: right;
                margin: .17rem;
                border-radius: .64rem;
                background:#eb1e24 ;
                line-height: 0.64rem;
                color: #fff;
                font-size: .28rem;
                text-align: center;
            }
        }
    }
}
</style>