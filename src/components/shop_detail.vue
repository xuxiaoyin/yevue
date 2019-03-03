<template>
	<div>
        <div id="content">
            <div class="router">
                <div class="container" style="margin-top:20px;">
                    <!-- <a href="###">首页</a>><a href="###">登录</a> -->
                    <router-link to="/">首页</router-link>><a href="javascript:void(0)">商品详情</a>>{{info.goods_name}}
                </div>
            </div>
            
            <div class="container">
                <!--主体上部分-->
                <div class="middle_top clear">
                    <div class="middle_top_left">
                        <div id="smll_box">
                            <img :src="info.gallery[0]"/>
                            <div id="box1"></div>
                        </div>
                        <div id="box"></div>
                        <div class="pro_list">
                            <ul>
                                <li v-for="(item,index) in info.gallery" :key="index"><img :src="item"></li>
                             </ul>
                        </div>
                        <a class="prev"></a>
                        <a class="next"></a>
                    </div>
                    <div class="middle_top_right">
                            <!-- <div class="right_top" v-if="guanggaowei.ad_code">
                                <img :src="guanggaowei.ad_code"/>
                            </div> -->
                            <div class="title">{{info.goods_name}}</div>
                            <div class="price">价格：<span>￥{{info.shop_price}}/件</span> </div>
                            
                            
                            
                            <div class="canshu">
                                <ul>
                                    <li>品牌：{{info.brand_name}}</li>
                                    <li>年份:{{info.shengchanriqi}}</li>
                                    <li>生成工艺：{{info.gongyi}}</li>
                                    <li>规格：{{info.goods_brief}}</li>
                                </ul>
                            </div>
                            <div class="num">
                                <div class="label">
                                    数量：
                                </div>
                                <div class="num_open">
                                    <div class="minu" @click="munu_num">-</div>
                                    <div class="input">
                                        <input type="text" @change="change_num" v-model="num" value="1" />
                                    </div>
                                    <div class="add_num"  @click="add_num">+</div>
                                </div>
                            </div>
                            <div class="button">
                                <a href="javascript:void(0)" @click="add_cart">加入购物车</a>
                                <a href="javascript:void(0)" @click="buy">立即购买</a>
                                
                            </div>
                            <div class="pingfen">
                                <div class="btn_pinfeng">我要评分</div>
                                共35条评分
                            </div>
                    </div>
                </div>
                <div class="chat">
                    <div class="chat_title">
                        商品详情
                    </div>
                    <div class="table2 left-red">
                        <ul>
                            <li>品名</li>
                            <li>{{info.goods_name}}</li>
                        </ul>
                        <ul>
                            <li>生产工艺</li>
                            <li>{{info.gongyi}}</li>
                        </ul>
                        <ul>
                            <li>规格</li>
                            <li>{{info.goods_brief}}</li> 
                        </ul>
                        <ul>
                            <li>生产日期</li>
                            <li>{{info.shengchanriqi}}</li>
                        </ul>
                        <ul>
                            <li>出品商</li>
                            <li>{{info.brand_name}}</li>
                        </ul>
                        <ul>
                            <li>储藏方式</li>
                            <li>{{info.chucang}}</li>
                        </ul>
                    </div>
                </div>
                
                <div class="chat">
                    <div class="chat_title">
                        茶友点评
                    </div>
                    <div class="eva">
                        <div class="zhishu" style="height: 0px;">
                           <!--  <div class="right">
                                    <canvas id="canvas1" width="130" height="130"></canvas>
                                </div>
                                <div class="left">
                                    <div class="zhishu_list">
                                        <div class="label">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;质：</div>
                                        <div class="progess">
                                            <el-slider v-model="value1"></el-slider>
                                        </div>
                                        <div class="fenshu">{{value1}}分</div>
                                    </div>
                                    <div class="zhishu_list">
                                        <div class="label">性 价 比:</div>
                                        <div class="progess">
                                            <el-slider v-model="value2"></el-slider>
                                        </div>
                                        <div class="fenshu">{{value2}}分</div>
                                    </div>
                                    <div class="zhishu_list">
                                        <div class="label">收藏价值：</div>
                                        <div class="progess">
                                            <el-slider v-model="value3"></el-slider>
                                        </div>
                                        <div class="fenshu">{{value3}}分</div>
                                    </div>
                                </div> -->
                            </div>
                        <textarea class="eva_text" v-model="content" placeholder="请输入您的点评内容......"></textarea>
                        <div class="orther_btn" @click="eva">
                            发布评论
                        </div>
                    </div>
                    <div class="eva_list">
                        <ul>
                            <li v-for="(item,index) in eva_list" :key="index">
                                <div class="user_img"><img :src="item.headimgurl"/><p>{{item.user_name}}</p></div>
                                <div class="right">
                                    <!-- <div class="eva_title">
                                        <div class="progess">
                                            <div class="progess_children red" :style="'width:'+item.zonghe+'%'"></div></div>
                                        <div class="fenshu">综合评分：{{item.zonghe}}分   &nbsp;&nbsp;&nbsp; 品质：{{item.pizhi}}分 &nbsp;&nbsp;   &nbsp;      性价比：{{item.xjb}}分      &nbsp;&nbsp;&nbsp;     收藏价值：{{item.shoucang}}分</div>
                                    </div> -->
                                    
                                    <div class="eva_content">
                                        <p>{{item.content}}</p>
                                        <span class="time">{{item.add_time}}</span>
                                        <span class="zan">赞（20）</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <!-- <div class="page">
                            <span>共235条记录</span>
                            <ul>
                                <li>上一页</li>
                                <li>第一页</li>
                                <li class="on">1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>5</li>
                                <li>...</li>
                                <li>最后一页</li>
                                <li>下一页</li>
                            </ul>
                        </div> -->
                    </div>
                </div>
                <!--主体上部分 end-->
                
            </div>
        
        </div>
        <div id="contant-m">
            <div class="swiper-container">
                <swiper :options="swiperOption" ref="mySwiper">
                  <!-- slides -->
                  <swiper-slide v-for="(item,index) in info.gallery" :key="index"><img :src="item"></swiper-slide>
                 
                  <!-- Optional controls -->
                  <div class="swiper-pagination" slot="pagination"></div>
                 <!--  <div class="swiper-button-prev" slot="button-prev"></div>
                  <div class="swiper-button-next" slot="button-next"></div> -->
                  <div class="swiper-scrollbar"  slot="scrollbar"></div>
                </swiper>
                
                   
                    
                   
            </div>


            <div class="pro_info">
                <div class="container-m">
                    <div class="price">¥{{info.shop_price}}</div>
                    <div class="name">{{info.goods_name}}</div>
                    <div class="attr">品牌：{{info.brand_name}} 年份：{{info.nianxian}}年</div>
                    <div class="num">购买数量   
                        <div class="num_bun">
                            <div class="minu"  @click="munu_num">-</div>
                            <input type="text" @change="change_num" v-model="num" value="1">
                            <div class="add"  @click="add_num">+</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="xiangqing-m">
                <div class="common-title"><div class="container-m">商品详情</div></div>
                <div class="table2">
                    <ul>
                        <li>品名</li>
                        <li>{{info.goods_name}}</li>
                        
                    </ul>
                    <ul>
                        <li>生产工艺</li>
                        <li>{{info.gongyi}}</li>
                        
                    </ul>
                    <ul>
                        <li>规格</li>
                        <li>{{info.goods_brief}}</li>
                        
                    </ul>
                    <ul>
                        <li>生产日期</li>
                        <li>{{info.nianxian}}</li>
                        
                    </ul>
                    <ul>
                        <li>出品商</li>
                        <li>{{info.brand_name}}</li>
                        
                    </ul>
                    <ul>
                        <li>储藏方式</li>
                        <li>{{info.chucang}}</li>
                        
                    </ul>
                    
                </div>
            </div>
            <div class="common-title"><div class="container-m">茶友评论</div></div>
            <div class="eva_input">
                <input type="text"  v-model="content" placeholder="我要评论..." name="">
                <button type="button" @click="eva">评论</button>
            </div>
            <div class="eva_list-m">
                <div class="container-m">
                    <ul>
                        <li v-for="(item,index) in eva_list" :key="index">
                            <div class="img"><img :src="item.headimgurl"></div>
                            <div class="name">{{item.user_name}}</div>
                            <div class="time">{{item.add_time}}</div>
                            <div class="eva_text-m">
                               {{item.content}}
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div>  
            

            <div class="btn_submit">
                <button class="add_cart"  @click="add_cart">加入购物车</button>
                <button class="pay">立即购买</button>
            </div>
        </div>   
    </div>
</template>

<script>
	 import store from '@/store/store'
	export default {
		name:'shop_detail',
		data(){
			return {
				info:{},
				// value1:0,
				// value2:0,
				// value3:0,
				content:'',
				eva_list:[],
                num:1,
                guanggaowei:[],
                swiperOption: {
                    autoplay: 3000,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                },
			}
		},
		created(){
            this.get_eva(this.$route.query.id)
			this.get_info(this.$route.query.id)
             this.guanggao()
		},
		watch: {
	        $route(to) {
	            this.get_info(this.$route.query.id)
                this.get_eva(this.$route.query.id)
               

	        }
	    },
		methods:{// 广告
            guanggao(){
                console.log('guanggao')
                this.$axios({
                    url:'https://cy.gzziyu.com/mobile/pcindex.php?Action=danzhang',
                    method:'post',
                    params:{
                        shuzi:9
                    }
                })
                .then((res)=>{
                    console.log('广告位,',res)
                    this.guanggaowei = res.data[0]
                })
            },
            buy(){
                if (!sessionStorage.getItem('userInfos')) {
                    
                    alert('请先登录')
                  this.$router.push('login')
                  return false
                }
                var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
                this.$axios({
                    url:'https://cy.gzziyu.com//mobile/ny_flow_cart.php?action=add_to_cart',
                    method:'post',
                    params:{
                        goods_id:this.info.goods_id,
                        goods_number:this.num,
                        openid:userInfo.openid
                    }
                })
                .then((res)=>{
                    console.log(res)
                    if(res.data.msg == "success"){
                       this.$router.push('cart')
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
            },
			add_cart(){
				if (!sessionStorage.getItem('userInfos')) {
			    	
					alert('请先登录')
			      this.$router.push('login')
			      return false
			    }
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					url:'https://cy.gzziyu.com//mobile/ny_flow_cart.php?action=add_to_cart',
					method:'post',
					params:{
						goods_id:this.info.goods_id,
						goods_number:this.num,
						openid:userInfo.openid
					}
				})
				.then((res)=>{
					console.log(res)
                    if(res.data.msg == "success"){
                        alert('加入购物车成功')
                        this.num = 1;
                        this.changeData()
                    }
				})
				.catch((err)=>{
					console.log(err)
				})
			},
            add_num(){
                this.num =parseInt(this.num)+1;
            },
            change_num(){
                if(this.num <0){
                    this.num = 1
                }else{
                    this.num = parseInt(this.num)
                }
            },
            munu_num(){
                if(this.num>1){
                    this.num =parseInt(this.num)-1;
                }else{
                    this.num = 1;
                }
            },
			eva(){
				if (!sessionStorage.getItem('userInfos')) {
			    	
					alert('请先登录')
			      this.$router.push('login')
			      return false
			    }
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=hangqingpinglun',
					method:'post',
					params:{
						goods_id:this.info.goods_id,
						openid:userInfo.openid,
						content:this.content,
						// pizhi:this.value1,
						// xjb:this.value2,
						// shoucang:this.value3
					}
				})
				.then((res)=>{
					console.log(res)
					if(res.data.success ==1){
						this.content = '';
						this.value1 = 0;
						this.value2 = 0;
						this.value3 = 0;
					}
					this.get_eva(this.info.goods_id)
				})
			},
			get_info(id){
				this.$axios({
					url:"http://cy.gzziyu.com/mobile/ny_flow_goods.php?action=detail",
					method:'post',
					params:{
						goods_id:id
					}
				})
				.then((res)=>{
					console.log(res)
					this.info = res.data
				})
			},
			get_eva(id){
				this.$axios({
                    url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=hangqingpinglunlist',
                    method:'post',
                    params:{
                        goods_id:id
                    }
                })
                .then((res)=>{
                    console.log(res)
                    
                    this.eva_list = res.data
                })
                .catch((err)=>{
                    console.log(err)
                })
			},
		}
	}
</script>


<style lang="scss">
	  .middle_top{
    padding-top: 50px;
//  overflow: hidden;
}
#content{
	overflow:hidden;
	background:#fff !important;
	height:auto;
	overflow:hidden;
}


  .middle_top .middle_top_left{
    float: left;
    position: relative;
    width: 500px;
    height: 610px;
    margin-right: 50px;
}
  .middle_top .middle_top_left #smll_box{
      border:1px #e0e0e0 solid;
        display: block;
        width: 500px;
        height: 500px;
}
  .middle_top .middle_top_left #smll_box img{
    width: 500px;
    height: 500px;
}
.swiper-slide{
    img{
        width:100%;
        height:100%;
    }
}
  .middle_top .middle_top_left #smll_box #box1{
    position:absolute;
    width:160px;
    height:160px;
    background:#cccccc;
    opacity:0.5;
    display:none;
    top:0;
}
  .middle_top .middle_top_left #box{
    z-index: 1000;
    width:500px;
    height:518px;
    border:1px solid #999999; 
    overflow:hidden;
    position:absolute;
    left: 560px;
    top: 0;
    display:none;
}
  .middle_top .middle_top_left a.prev,  .middle_top .middle_top_left a.next{
    display: inline-block;
    width: 40px;
    height: 40px;
    cursor: pointer;
    
}
  .middle_top .middle_top_left a.prev{
    position: absolute;
   bottom: 32px;
    left: -11px;
    background: url(../../static/img/prev_gray.png) no-repeat;
}

  .middle_top .middle_top_left a.next{
    position: absolute;
       bottom: 32px;
    right: -11px;
    background: url(../../static/img/next_gray.png) no-repeat;
}

  .middle_top .middle_top_left .pro_list{
    width: 450px;
    margin: 0 auto;
    text-align: center;
    overflow: hidden;
    position: relative;
}
  .middle_top .middle_top_left .pro_list ul{
    display: inline-block;
    margin-right: -28px;
    padding: 0;
    margin-top: 23px;
    overflow: hidden;
    position: relative;
    height: 62px;
    margin-left: 14px;
    width:100%;
}
  .middle_top .middle_top_left .pro_list ul li{
    cursor: pointer;
    width: 62px;
    height: 62px;
    float: left;
    padding: 1px;
    position: absolute;
    
}
  .middle_top .middle_top_left .pro_list ul li.on{
    border: 1px solid #ff0000;
    box-sizing: border-box;
    padding: 0;
}
  .middle_top .middle_top_left .pro_list ul li:hover{
    border: 1px solid #ff0000;
    box-sizing: border-box;
    padding: 0;
}
  .middle_top .middle_top_left .pro_list ul li  img{
    width: 60px;
    height: 60px;
}


  .middle_top .middle_top_right{
    float: left;
    margin-left: 15px;
    width: 635px;
    position: relative;
    .right_top{
        width: 190px;
        height: 68px;
        position: absolute;
        right: -15px;
        top: 0;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .canshu{
        width: 650px;
        height: 95px;
        border:1px #d9d9d9 solid;
        margin: 30px 0 45px 0;
        padding: 10px 0;
        ul{
            li{
                width: 50%;
                line-height: 35px;
                float: left;
                padding: 0 10px;
                box-sizing: border-box;
                color: #666666;
                span{
                    color: #ee0a0d;
                }
            }
        }
    }
    .pingfen{
         width: 650px;
        height: 45px;
        font-size: 14px;
        color: #666666;
         line-height:30px;
         margin: 10px 0;
        .btn_pinfeng{
            margin-right: 25px;
            float: left;
            width: 100px;
            height: 30px;
            font-size: 14px;
            text-align: center;
            line-height:30px;
            color: #ee0a0d;
            border: 1px #ee0a0d solid;
            border-radius: 5px;
            
        }
    }
    .btn_list{
        width: 650px;
        height: 45px;
        font-size: 14px;
        color: #666666;
         line-height:30px;
        .btn{
            margin-right: 25px;
            float: left;
            width: 100px;
            height: 30px;
            font-size: 14px;
            text-align: center;
            line-height:30px;
            color: #fff;
            background:#ee0a0d ;
            border-radius: 5px;
            
        }
    }
    .num{
        width: 100%;
        margin-bottom: 40px;
       clear: both;
       overflow: hidden;
        .label{
            width: 70px;
            float: left;
            line-height: 26px;
            
        }
        .num_open{
            width: 200px;
            float: left;
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
    
    .zhishu{
        width: 650px;
        height: 181px;
        .left{
            float: left;
            .zhishu_list{
                line-height: 45px;
                height: 45px;
                .label{
                    float: left;
                    font-size: 14px;
                    color: #333333;
                     margin-top: 12px;
                     margin-left: 12px;
                     width: 70px
                }
                .progess{
                    width: 216px;
                    height: 12px;
                    float: left;
                    margin-top: 28px;
                    position: relative;
                    .progess_children{
                        width: 70%;
                        height: 100%;

                    }
                    .red{
                        background: #e67373;
                    }
                    .green{
                        background: #73e673;
                    }
                    .blue{
                        background: #7373e6;
                    }
                    .progess_num{
                        width: 100%;
                        position: absolute;
                        top: 12px;
                        left: 0;
                        ul{
                            width: 130%;
                            overflow: hidden;
                            li{
                                width: 18%;
                                float: left;
                                font-size: 10px;
                                color: #999999;
                                height: 12px;
                                line-height: 12px;
                                text-align: left;
                               
                            }
                        }
                    }
                }
                .fenshu{
                    float: left;
                    font-size: 14px;
                    color: #333333;
                     margin-top: 12px;
                     margin-left: 12px
                }
            }
        }
        .right{
            float: left;
            margin: 27px 0 0 80px
        }
    }
    
}

  .middle_top .middle_top_right  .title{
    font-size: 26px;
    color: #1b1b1b;
    line-height: 25px;
    margin: 0;
    line-height: 70px;
    span{
        a{
            font-size: 14px;
            color: #036595;
            
        }
    }
}
  .middle_top .middle_top_right  .price{
    font-size: 12px;
    color: #666666;
    line-height: 25px;
    margin: 0;
    span{
        font-size: 24px;
        color: #ee0a0d;
    }
}


 
  .middle_top .middle_top_right .button{
    width: 430px;
    margin-top: 30px;
}
  .middle_top .middle_top_right .button a{
    cursor: pointer;
    display: inline-block;
    text-align: center;
    line-height: 50px;
    width: 200px;
    height: 50px;
    border: none;
    background: #FF0000;
    margin-right: 10px;
    padding: 0;
    color: #FFFFFF;
}
.chat{
    clear: both;
    width: 100%;
    overflow: hidden;
    border:1px #e0e0e0 solid;
    margin-bottom: 30px;
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
    .table{
        width: 1177px;
        overflow: hidden;
        margin: 0 auto;
        border: 1px #e0e0e0 solid;
        
        ul{
            width: 100%;
            li{
                &:nth-child(1){
                    width: 25%;
                }
                &.green{
                    color: #4ab36f;
                }
                &.red{
                    color: #ec1d25;
                }
                
                float: left;
                width: 15%;
                height:40px;
                text-align:  center;
                line-height:40px; 
                color:#696555; 
                border-bottom: 1px #e0e0e0 solid;
                border-right: 1px #e0e0e0 solid;
                box-sizing: border-box;
                 &:last-child{
                    border-right: none;
                }
                
            }
        }
    }
    .table1{
        width: 1177px;
        overflow: hidden;
        margin: 0 auto;
        border: 1px #e0e0e0 solid;
        
        ul{
           
            &:nth-child(1){
                background: #e9e9e9;
            }
            &:nth-child(2n-1){
                background: #f5f5f5;
            }
            width: 100%;
             overflow: hidden;
            li{
                &:nth-child(1){
                    width: 16%;
                }
                &.green{
                    color: #4ab36f;
                }
                &.red{
                    color: #ec1d25;
                }
                
                float: left;
                width: 14%;
                height:40px;
                text-align:  center;
                line-height:40px; 
                color:#666666; 
                box-sizing: border-box;
                 &:last-child{
                    border-right: none;
                }
                
            }
        }
    }
    .table2{
        width: 1177px;
        overflow: hidden;
        margin: 30px auto;
        border: 1px #e0e0e0 solid;
        text-align: center;
        color: red;
        
        ul{
           
            
            &:nth-child(2n-1){
                background: #f5f5f5;
            }
            width: 100%;
             overflow: hidden;
            li{
                &:nth-child(1){
                    width: 20%;
                    padding: 0 20px;
                    box-sizing: border-box;
                    text-align: center;
                    color: red;
                    font-size: 14px;
                    font-weight: bold;
                }
                
                
                float: left;
                width: 80%;
                height:40px;
                
                text-align:  left;
                line-height:40px; 
                color:#000; 
                font-size: 14px;
                font-weight: 800;
                box-sizing: border-box;
                 &:last-child{
                    border-right: none;
                }
                
            }
        }
    }
    
    .btn_other{
        width: 302px;
        height: 40px;
        background: #e6e6e6;
        text-align: center;
        line-height: 40px;
        color: #333333;
        font-size: 14px;
        margin: 24px auto;
    }
    
    .eva{
        width: 1177px;
        margin: 22px auto;
        padding: 0 38px;
        box-sizing: border-box;
        overflow:hidden;
        background: #f5f5f5;
        .zhishu{
            width: 100%;
            height: 181px;
            margin: 35px 0;
            .left{
                float: left;
                .zhishu_list{
                    line-height: 45px;
                    height: 45px;
                    .label{
                        float: left;
                        font-size: 14px;
                        color: #333333;
                         margin-top: 12px;
                         margin-left: 12px;
                         width: 70px;
                         line-height: 44px;
                    }
                    .progess{
                        width: 440px;
                        height: 12px;
                        float: left;
                        margin-top: 18px;
                        position: relative;
                        .progess_children{
                            width: 70%;
                            height: 100%;
                            background: #e67373;
    
                        }
                        .red{
                            background: #e67373;
                        }
                        .green{
                            background: #73e673;
                        }
                        .blue{
                            background: #7373e6;
                        }
                        .progess_num{
                            width: 100%;
                            position: absolute;
                            top: 12px;
                            left: 0;
                            ul{
                                width: 130%;
                                overflow: hidden;
                                li{
                                    width: 18%;
                                    float: left;
                                    font-size: 10px;
                                    color: #999999;
                                    height: 12px;
                                    line-height: 12px;
                                    text-align: left;
                                   
                                }
                            }
                        }
                    }
                    .fenshu{
                        float: left;
                        font-size: 14px;
                        color: #333333;
                         margin-top: 12px;
                         margin-left: 12px;
                         line-height: 44px;
                    }
                }
            }
            .right{
                float: left;
                margin: 10px 0 0 80px
            }
        }
        .eva_text{
            width: 1100px;
            height: 140px;
            display: block;
            margin: 0 auto;
            background: #fff;
            resize: none;
            border:none;
            line-height: 25px;
            padding: 10px 15px;
            box-sizing: border-box;
        }
        .orther_btn{
            width: 130px;
            height: 32px;
            border-radius:5px ;
            margin: 25px auto;
             display: block;
             background: #ee0a0d;
             line-height: 32px;
             color: #fff;
             text-align: center;
        }
            
    }
    .eva_list{
        width: 1175px;
        margin: 0 auto;
        
        ul{
            li{
                padding-top: 26px;
                height: 155px;
              border-bottom: 1px #e0e0e0 solid;
              overflow: hidden;
            .user_img{
                float: left;
                width: 130px;
                img{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: block;
                    margin: 0 auto 12px;
                }
                p{
                    
                    color: #787878;
                    font-size: 14px;
                    text-align: center;
                }
            }
            .right{
                float: left;
                width: 1045px;
                .eva_title{
                    width: 100%;
                    height: 30px;
                    overflow: hidden;
                    background: #f5f5f5;
                    .progess{
                        width: 216px;
                        height: 12px;
                        float: left;
                        margin-top: 9px;
                        margin-left: 20px;
                        position: relative;
                        .progess_children{
                            width: 70%;
                            height: 100%;
                            background: #ffcc33;
    
                        }
                        
                    }
                    .fenshu{
                        float: left;
                        font-size: 14px;
                        color: #999999;
                         margin-top: 8px;
                         margin-left: 12px
                    }
                }
                .eva_content{
                    width: 100%;
                    p{
                        font-size: 14px;
                        color: #666666;
                        line-height: 40px;
                        padding: 10px 0;
                        height: 100px;
                        box-sizing: border-box;
                    }
                    span.time{
                        float: left;
                        color: #a5a5a5;
                        font-size: 12px;
                    }
                    span.zan{
                        float: right;
                        color: #a5a5a5;
                        font-size: 12px;
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
    }
 }



 @media only screen and (max-width:750px){
    #contant-m{
        padding-top: 0.87rem;
        padding-bottom: 1.96rem;
        width: 100%;

        .swiper-container{
            width:100%;
            height:7rem;
        }
        .pro_info{
            width:100%;
            border-bottom:0.15rem solid #f2f2f2;
           .name{
                font-size:0.3rem;
                color:#000000;
                line-height:0.4rem;
           }
           .price{
                color:#eb1e24;
                font-size:0.36rem;
                line-height:0.78rem;
           }
           .attr{
                font-size:0.2rem;
                color:#b5b5b5;
           }
           .num{
                margin:0.43rem 0;
                font-size:0.3rem;
                color:#000000;
                overflow:hidden;
                .num_bun{
                    float:right;
                    width:1.98rem;
                    height:0.46rem;
                    .minu,.add{
                        width:0.64rem;
                        float:left;
                        height:100%;
                        background:#dfdfdf;
                        text-align:center
                    }
                    input{
                        width:0.7rem;
                        height:100%;
                        float:left;
                        text-align:center;
                        border:none;
                        background:#f5f5f5;
                    }
                }
           }
        }
        .common-title{
            width:100%;
            height:0.75rem;
            line-height:0.75rem;
            font-size:0.28rem;
            font-weight:bold;
            color:#000;
        }
        .hangqing-m{
            width:100%;
            padding-bottom:0.3rem;
            border-bottom:0.15rem #f0f0f0 solid;

            .cat_list-m{
                width: 100%;
                ul{
                    width: 100%;
                    text-align:center;
                    margin: 0.3rem 0;
                    font-size:0;
                    li{
                        display: inline-block;
                        width: 1.3rem;
                        height: 0.48rem;
                        text-align: center;
                        line-height:  0.48rem;
                        background: #f0f0f0;
                        color: #4a4a4a;
                        margin-right:  0.05rem;
                        font-size: 0.2rem;
                        &.active{
                            background: #eb1e24;
                            color: #fff;
                        }
                    }
                }
            }
            .chat_title-m{
                color:#000000;
                font-size:0.24rem;
                text-align:center;
            }
            .chat_tip{
                color:#aaa9a9;
                font-size:0.18rem;
                text-align:center;
            }
            #line1{
                width:100%;
                height:2.8rem;
            }
            .timepick-m{
                width:100% ;
                text-align: center;
                color: #aaa9a9;
                font-size:0.24rem;
                margin-bottom: 0.3rem;
                .btn{
                    display: inline-block;
                    width: 1.35rem;
                    height: 0.32rem;
                    border:1px #aaa9a9 solid;
                    border-radius:0.05rem ;
                    margin: 0 0.22rem;
                    input{
                        width: 100%;
                        border: none;
                        background: none;
                         line-height: 0.32rem;
                        text-align: center;
                        color: #aaa9a9;
                    }
                }
                .submit{
                    width: 1.3rem;
                    height: 0.32rem;
                    border-radius:0.05rem ;
                     display: inline-block;
                     background: #ee0a0d;
                     line-height: 0.32rem;
                     color: #fff;
                }
            }
            .table{
                width: 100%;
                overflow: hidden;
                margin: 0 auto;
                border: 1px #e0e0e0 solid;
                
                ul{
                    width: 100%;
                    li{
                        &:nth-child(1){
                            width: 25%;
                        }
                        &.green{
                            color: #4ab36f;
                        }
                        &.red{
                            color: #ec1d25;
                        }
                        
                        float: left;
                        width: 15%;
                        height:0.4rem;
                        font-size:0.18rem;
                        text-align:  center;
                        line-height:0.4rem; 
                        color:#696555; 
                        border-bottom: 1px #e0e0e0 solid;
                        border-right: 1px #e0e0e0 solid;
                        box-sizing: border-box;
                         &:last-child{
                            border-right: none;
                        }
                        
                    }
                }
            }
             
        }
        .xiangqing-m{
            width:100%;
            padding-bottom:0.3rem;
            border-bottom:0.15rem #f0f0f0 solid;

              .table2{
                    width: 100%;
                    overflow: hidden;
                    margin: 0 auto;
                    border: 1px #e0e0e0 solid;
                    
                    ul{
                       
                        
                        &:nth-child(2n-1){
                            background: #f5f5f5;
                        }
                        width: 100%;
                         overflow: hidden;
                        li{
                            &:nth-child(1){
                                width: 20%;
                                padding: 0 0.2rem;
                                box-sizing: border-box;
                            }
                            
                            
                            float: left;
                            width: 80%;
                            height:0.4rem;
                            font-size:0.18rem;
                            text-align:  left;
                            line-height:0.4rem; 
                            color:#666666; 
                            box-sizing: border-box;
                             &:last-child{
                                border-right: none;
                            }
                            
                        }
                    }
                }
        }

       
        .eva_input{
            width:100%;
            height:0.64rem;
            background:#f0f0f0;
            input{
                float:left;
                width:5.8rem;
                height:0.48rem;
                background:#fff;
                border-radius:0.48rem;
                margin:0.08rem;
                border:none;
                padding:0 0.4rem;
                box-sizing:border-box;
            }
            button{
                float:right;
                width:1.2rem;
                height:0.48rem;
                text-align:center;
                background:#eb1e24;
                color:#fff;
                margin:0.08rem 0.15rem 0.08rem 0.08rem;
                line-height:0.48rem;
                border:none;
                border-radius:0.1rem;
            }
        }
        .eva_list-m{
            width:100%;
            ul{
                li{
                    width:100%;
                    font-size:0.18rem;
                    overflow:hidden;
                    border-bottom:1px solid #fcdbdc;
                    .img{
                        width:0.85rem;
                        float:left;
                        img{
                            width:.47rem;
                            height:0.47rem;
                            margin:0.15rem;
                        }
                    }
                    .name{
                        width:6.1rem;
                        float:left;
                        font-size:0.24rem;
                        color:#787878;
                        margin-bottom:0.08rem;
                    }
                    .time{
                         width:6.1rem;
                        float:left;
                        font-size:0.18rem;
                        color:#a5a5a5;
                         margin-bottom:0.05rem;
                    }
                    .eva_text-m{
                         width:6.1rem;
                        float:left;
                        font-size:0.22rem;
                        color:#1d1d1d;
                        line-height:0.38rem;
                         margin-bottom:0.1rem;
                    }
                }
            }
        }
        .btn_submit{
            width:100%;
            height:0.97rem;
            background:#f0f0f0;
            position:fixed;
            bottom:0.98rem;
            left:0;
            padding:0 0.20rem;
            box-sizing:border-box;
            button{
                width:3.5rem;
                height:0.64rem;
                float:left;
                border-radius:0.64rem;
                border:none;
                color:#fff;
                margin-top:0.17rem;
                &:nth-child(1){
                    margin-right:0.05rem;
                    background:#ebb41e;
                }
                &:nth-child(2){
                    background:#eb1e24;
                }
            }
        }
        .page-m{
            width:100%;
           margin:0.8rem 0 0.3rem 0;
            ul{
                width:100%;
                text-align:center;
                font-size: 0;
                li{
                    width:0.48rem;
                    height:0.48rem;
                    border:1px solid #c7c7c7;
                    border-radius:0.05rem;
                    line-height:0.48rem;
                    text-align:center;
                    display:inline-block;
                    font-size:0.24rem;
                    color:#c7c7c7;
                    margin-right:0.15rem;
                    &.on{
                        color:#fff;
                        background:#eb1e24;
                         border:1px solid #eb1e24;
                    }
                    &:nth-child(1), &:last-child{
                        width:0.75rem;

                    }
                }
            }
        }
    }
}

</style>