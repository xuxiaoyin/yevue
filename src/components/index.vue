<template>
<div>
    <div id="content">
    
        <!--banner 轮播-->
        <div class="banner">
            <swiper :options="swiperOption" ref="mySwiper">
              <!-- slides -->
              <swiper-slide v-for="(item,index) in listImg" :key="index"><img :src="item.ad_code"></swiper-slide>
             
              <!-- Optional controls -->
              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
              <div class="swiper-scrollbar"  slot="scrollbar"></div>
            </swiper>
        </div>
        
        <!--banner 轮播 end-->

        <!--指数-->
        <div class="common_div zhishu">
          <div class="container">
            <div class="common_title">
              <img src="static/img/zhishu.png"/>
              茶叶指数 <span>Index of tde tea</span>
              <router-link to="/zhishu">查看更多>></router-link>
              <div class="ca_list">
                <ul>
                  <li :class="brand_index== 11?'active':''" @mousemove="change_band(11)">大益指数</li>
                  <li :class="brand_index== 13?'active':''" @mousemove="change_band(13)">陈升号指数</li>
                  <li :class="brand_index== 14?'active':''" @mousemove="change_band(14)">中茶指数</li>
                </ul>
              </div>
            </div>
            <div class="tab_list">
              <ul>
                <li 
                  v-for="(item,index) in zhishu_tab"
                  :key="index"
                  @mousemove="click_zhishutab(index)"
                  :data-index="index"
                  :class="index==zhishutab_num?'active':''">{{item}}</li>
              </ul>
            </div>
            <div class="table">
              <div class="table">
                <div class="thead">
                  <div class="td">品名</div>
                  <div class="td">参考价</div>
                  <div class="td">升跌</div>
                  <div class="td">升跌幅</div>
                  <div class="td">年份</div>
                  <div class="td">规格</div>
                  <div class="td">更新时间</div>
                </div>
                <div class="tbody" style="height:640px;overflow:hidden;">
                    <swiper :options="swiperOption2" ref="mySwiper" style="height:640px;overflow:hidden;">
                      <!-- slides -->
                      <swiper-slide v-for="(item,index) in zhishu" :key="index" @click="go_hangqing(item.id)">
                        <div class="tr" @click="go_zhishu(item.id)">
                            <div class="td">{{item.h_chanpingm}}</div>
                            <div class="td">{{item.h_cenkao}}</div>
                            <div class="td" :class="item.zhishuji == 'down'?'green':'red'">{{item.wenzibd}}￥{{item.h_zhangdiee}}</div>
                            <div class="td" :class="item.zhishuji == 'down'?'green':'red'">{{item.fuhaobd}}{{item.h_zhangdief}}</div>
                            <div class="td">{{item.nianxian}}</div>
                            <div class="td">{{item.goods_brief}}</div>
                            <div class="td">{{item.h_jiezhisj}}</div>
                          </div>
                      </swiper-slide>
                     
                     
                    </swiper>
                 
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--指数end-->

        <!--行情-->
        <div class="common_div hangqing">
          <div class="container">
            <div class="common_title">
              <img src="static/img/hangqing.png"/>
              新品行情 <span>The new quotation</span>
             <router-link to="/hangqing">查看更多>></router-link>
              
            </div>
            
            <div class="flash_sale_show clear">
              <swiper :options="swiperOption1" ref="mySwiper">
                <!-- slides -->
                <swiper-slide v-for="(item,index) in hangqing" :key="index">
                    <a href="javascript:void(0)" class="img" @click="go_hangqing(item.id)" ><img :src="item.goods_img"></a>
                    <div class="introduce">
                        <h4 class="name"><a href="javascript:void(0)" >{{item.goods_name}}</a></h4>
                        <div class="cost_price">{{item.shop_price}}{{item.seller_note}}</div>
                        <div class="status">升跌：<span>{{item.sjshuzhi}}</span></div>
                    </div>
                </swiper-slide>
               
                <!-- Optional controls -->
                <div class="swiper-pagination" slot="pagination"></div>
               <!--  <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div> -->
                <!-- <div class="swiper-scrollbar"  slot="scrollbar"></div> -->
              </swiper>
            </div>
          </div>
        </div>
        <!--行情 end-->
        <!--品牌 批发-->
        <div class="common_div pinpai">
            <div class="container">
                <div class="common_title">
                    <img src="static/img/pifa.png"/>
                    品牌商城  <span>Brand mall</span>
                    <router-link to="/shop">查看更多>></router-link>
                    
                </div>
                <div class="pinpai_list">
                    <div class="paiming_left">
                        <div class="left1">
                            <a href="javascript:void(0)" @click="go_shop_detail(pifa[0].id)">
                                <div class="img">
                                    <img :src="pifa[0].goods_img"/>
                                </div>
                                <div class="name">{{pifa[0].goods_name}}</div>
                                <div class="paizi">品牌：{{pifa[0].brand_name}}</div>
                                <div class="price">￥{{pifa[0].shop_price}} /件</div>
                            </a>
                        </div>
                        <div class="left2">
                            <a href="javascript:void(0)" @click="go_shop_detail(pifa[1].id)">
                                <div class="img">
                                    <img :src="pifa[1].goods_img"/>
                                </div>
                                <div class="name">{{pifa[1].goods_name}}</div>
                                <div class="paizi">品牌：{{pifa[1].brand_name}}</div>
                                <div class="price">￥{{pifa[1].shop_price}}/件</div>
                            </a>
                        </div>
                    </div>
                    <ul>
                        <li v-for="(item,index) in pifa_right" :key="index">
                            <a href="javascript:void(0)" @click="go_shop_detail(item.id)">
                                <div class="img">
                                    <img :src="item.goods_img"/>
                                </div>
                                <div class="name">{{item.goods_name}}</div>
                                <div class="paizi">品牌：{{item.brand_name}} 年份 2017</div>
                                <div class="price">￥{{item.shop_price}}/件</div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 批发 end-->
        

        <!--品牌团队-->
        <div class="common_div tuandui">
            <div class="container">
                <div class="common_title">
                    <img src="static/img/tuandui.png"/>
                    品牌团队 <span>The brand team</span>
                    <router-link to="/tuan">查看更多>></router-link>
                    
                </div>
                <div class="tuan_list">
                    <ul>
                        <li v-for="(item,index) in pinpai" :key="index">
                            <a href="javascript:void(0);" @click="go_tuandui(item.id)">
                                <img :src="item.file_url"/>
                                <div class="name">{{item.title}}</div>
                                <div class="phone">手机号码：{{item.mobile}}</div>
                                <div class="phone">微信号：{{item.wechat}}</div>
                                <div class="phone">服务品牌：{{item.author_email}}</div>
                            </a>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </div>
        <!--品牌团队 end-->
        

        <!-- 资讯频道 -->
        <div class="common_div zixun">
            <div class="container">
                <div class="common_title">
                    <img src="static/img/zixun.png"/>
                    资讯频道 <span>Information channel</span>
                    <router-link to="/zixun">查看更多>></router-link>
                    
                </div>
                <div class="zixun_list">
                    <ul>
                        <li v-for="(item,index) in zixun" :key="index">
                            <a href="javascript:void(0);" @click="go_zixun(item.id)">
                                <img :src="item.file_url"/>
                            </a>
                                <div class="title"  @click="go_zixun(item.id)">{{item.title}}</div>
                                <div class="detext">{{item.short_title}}</div>
                                <div class="time">
                                    {{item.add_time}}
                                    <a href="javascript:void(0)" @click="go_zixun(item.id)">查看详情>></a>
                                </div>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
  </div>

  

  <div id="content-m" > 
        <div class="banner">
            <swiper :options="swiperOption" ref="mySwiper">
              <!-- slides -->
              <swiper-slide v-for="(item,index) in listImg" :key="index"><img :src="item.ad_code"></swiper-slide>
             
              <!-- Optional controls -->
              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
              <div class="swiper-scrollbar"  slot="scrollbar"></div>
            </swiper>
        </div>
        
        <!--banner 轮播 end-->
        
         <search></search>
        <!--分类-->
        <div class="sortment">
            <ul>
                <li>
                    <router-link to="/shop">
                        <div class="img"><img src="static/img/m0.png" /></div>
                        <span>产品分类</span>
                    </router-link>
                </li>
                <li>
                   <router-link to="/hangqing">
                        <div class="img"><img src="static/img/m1.png" /></div>
                        <span>行情参考</span>
                    </router-link>
                </li>
                <li>
                   <router-link to="/zhishu" >
                        <div class="img"><img src="static/img/m2.png" /></div>
                        <span>指数变动</span>
                    </router-link>
                </li>
                <li>
                   <router-link to="/shop">
                        <div class="img"><img src="static/img/m3.png" /></div>
                        <span>品牌批发</span>
                    </router-link>
                </li>
                <li>
                   <router-link to="/zixun">
                        <div class="img"><img src="static/img/m4.png" /></div>
                        <span>资讯频道</span>
                    </router-link>
                </li>
                
            </ul>
        </div>
        <!--分类 end-->
        <div class="zhishu-m">
            <div class="common_title">
                <span>茶叶指数</span>
                <router-link to="/zhishu">查看更多>>></router-link>
            </div>
            <div class="container-m">
                <div class="zhishu_tab">
                    <ul>
                        <li 
                          v-for="(item,index) in zhishu_tab"
                          :key="index"
                          @click="click_zhishutab(index)"
                          :data-index="index"
                          :class="index==zhishutab_num?'on':''">{{item}}</li>
                    </ul>
                </div>
                <div class="table-m">
                    <ul style="height:6.58rem;overflow: hidden;">
                         <li style=" background: #f0f0f0;">
                            <div class="name">品名</div>
                            <div class="price">参考价</div>
                            <div class="shengdie">升跌</div>
                            <div class="shengdie">升跌幅</div>
                        </li>
                        <swiper :options="swiperOption2" ref="mySwiper" style="height:400px;overflow:hidden;">
                          <!-- slides -->
                          <swiper-slide v-for="(item,index) in zhishu" :key="index" @click="go_hangqing(item.id)">
                            <li>
                                <div class="name">{{item.h_chanpingm}}</div>
                                <div class="price">{{item.h_cenkao}}</div>
                                <div class="shengdie">{{item.wenzibd}}{{item.h_zhangdiee}}</div>
                                <div class="shengdie">{{item.wenzibd}}{{item.h_zhangdief}}</div>
                            </li>
                          </swiper-slide>
                        </swiper>
                        <li v-for="(item,index) in zhishu" :key="index">
                            <div class="name">{{item.h_chanpingm}}</div>
                            <div class="price">{{item.h_cenkao}}</div>
                            <div class="shengdie">{{item.wenzibd}}{{item.h_zhangdiee}}</div>
                            <div class="shengdie">{{item.wenzibd}}{{item.h_zhangdief}}</div>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </div>
        
        
        <div class="xinpin-m">
            <div class="container-m">
                <div class="common_title">
                    <span>新品行情</span>
                    <router-link to="/hangiqng">更多新品>>></router-link>
                </div>
                <div class="xinpin_list">
                    <ul>
                        <li v-for="(item,index) in hangqing" :key="index">
                            <a href="javascript:void(0)" @click="go_hangqing(item.id)">
                                <div class="img">
                                    <img :src="item.goods_img"/>
                                </div>
                                <div class="name">
                                   {{item.goods_name}}
                                </div>
                                <div class="price">
                                    {{item.shop_price}}
                                </div>
                                <div class="shengjiang"><span>{{item.sjshuzhi}}</span></div>
                            </a>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
        
        
        <div class="pifa-m">
            <div class="container-m">
                <div class="common_title">
                    <span>品牌批发  </span>
                    <router-link to="/shop">更多品牌>></router-link>
                </div>
                <div class="pifa_list">
                    <ul>
                        <li v-for="(item,index) in pifa" :key="index"  @click="go_shop_detail(item.id)">
                            <a href="javascript:void(0)">
                                <div class="img">
                                    <img :src="item.goods_img"/>
                                </div>
                                <div class="name">
                                    {{item.goods_name}}
                                </div>
                                <div class="price">
                                    品牌：{{item.brand_name}} 年份：2008年
                                </div>
                                
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    </div>
</div>



</template>

<script>
import axios from "axios"
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import store from '@/store/store'
 import Search from "./search"   //引入组件
export default {
  name: 'HelloWorld',
  components: {
      swiper,
      swiperSlide,
      Search
     },
  data () {
    return {
        show:true,
        zhishu:[],//指数列表
        zhishu_tab:['所有指数','当年茶指数','新茶指数','中期茶指数','老茶指数'],
        zhishutab_num:0,
        zhishu_index:0,
        brand_index:11,
        listImg:[],//轮播列表
        hangqing:[],//行情列表
        pifa:[],//批发列表
        pinpai:[],//品牌团队
        zixun:[],//资讯列表
        swiperOption: {
            autoplay: 3000,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        },
        swiperOption1: {
            autoplay:true,
             loop : true,
            slidesPerView : 'auto',
            // pagination: {
            //     el: '.swiper-pagination',
            // },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        },
        swiperOption2:{
            speed:500,
            autoplay: {
                delay: 500,//1秒切换一次
              },
            direction: 'vertical',
            slidesPerView: 16,
            loop:true
        }
    }

  },
  mounted:function(){
    this.getzhishuList()
    this.get_lunbo()
    this.gethangqingsList()
    this.getpifasList()
    this.getpinpaiList()
    this.get_zixunList()

  },
   computed:{
        cart_num(){
           return this.$store.state.cart_num
        }
    },
    created(){
        this.changeData()
    },
    watch: {
            $route(to) {
                console.log(this.$router)
                 document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
            }
        },
  methods:{
    go_zixun(id){
      this.$router.push({name:'zixun_detail',query:{id:id}})  
    },
    go_zhishu(id){
        console.log('zhishu')
        this.$router.push({name:'hangqing_detail',query:{id:id}})  
    },
    go_tuandui(id){
        this.$router.push({name:'tuan_detail',query:{id:id}})
    },
    go_hangqing(id){
        this.$router.push({name:'hangqing_detail',query:{id:id}})
    },
     go_shop_detail(id){
        this.$router.push({name:'shop_detail',query:{id:id}})
    },
    change_band(index){
       this.brand_index = index;
       this.zhishutab_num=0
        this.$axios({
        url:'http://cy.gzziyu.com/mobile/pcindex.php?Action=chayezhishu&shuzi=',
        method:'post',
        params:{
            brand_id:index
        }
        })
        .then((res)=>{
        console.log(res)
        this.zhishu = res.data
        })
    },
    // 点击切换指数
    click_zhishutab(index){
      this.zhishutab_num = index;
      var that = this;
      axios.post(that.GLOBAL.url+`pcindex.php?Action=chayezhishu&shuzi=${index}&brand_id=${this.brand_index}`)
      .then((res) =>{
        console.log(res);
        this.zhishu = [];
        res.data.map((item)=>{
            this.zhishu.push(item)
        })
        
      })
      .catch((err) =>{
        console.log(err);
      });
    },
    // 轮播列表
    get_lunbo(){
       var that = this;
      axios.post(that.GLOBAL.url+'pcindex.php?Action=touch_ad')
      .then((res) =>{
        console.log('轮播')
        console.log(res.data);
        this.listImg = res.data
      })
      .catch((err) =>{
        console.log(err);
      });
    },

    // 指数列表
    getzhishuList(){
      var that = this;
      axios.post(that.GLOBAL.url+'pcindex.php?Action=chayezhishu&shuzi=&brand_id=11')
      .then((res) =>{
        console.log(res);
        this.zhishu = res.data
      })
      .catch((err) =>{
        console.log(err);
      });
    },
    // 行情列表
    gethangqingsList(){
      var that = this;
      console.log(12333333333)
      axios.post(that.GLOBAL.url+'pcindex.php?Action=xinpinhangqing&id=20')
      .then((res) =>{
        console.log("行情")
        console.log(res);
        this.hangqing = res.data
      })
      .catch((err) =>{
        console.log("行情错误")
        console.log(err);
      });
    },
    // 批发列表
    getpifasList(){
      var that = this;
      axios.post(that.GLOBAL.url+'pcindex.php?Action=pinpaipifa')
      .then((res) =>{
        this.pifa = res.data;
        this.pifa_right = res.data.slice(1,2)
      })
      .catch((err) =>{
        console.log(err);
      });
    },
    // 品牌团队
    getpinpaiList(){
      var that = this;
      axios.post('http://cy.gzziyu.com/mobile/pcindex.php?Action=article_cat&id=26')
      .then((res) =>{
        console.log(res);
        this.pinpai = res.data;
      })
      .catch((err) =>{
        console.log(err);
      });
    },
    // 资讯列表
    get_zixunList(){
        var that = this;
        axios.post('http://cy.gzziyu.com/mobile/pcindex.php?Action=article_cat&id=12&shuzi=10')
         .then((res) =>{
        console.log('咨询')
        console.log(res);
        this.zixun = res.data;
      })
      .catch((err) =>{
        console.log(err);
      });
    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/*banner样式*/
@import './css/index.scss';
.swiper-slide{
    height: 600px;
    overflow: hidden;
}
.swiper-slide img{
    min-width: 100%;
    max-height: 600px;
}
.zixun_list ul li a{
    float: left;
    margin: 11px;
    width: 216px;
    height:128px;
    background: #fff;
    text-align: center;
    vertical-align: middle;

}
.zixun_list ul li img{
    width: auto;
    height: auto;
    max-width: 216px;
    min-height: 128px;
    float: none;
    margin: 0;
}
.zixun_list ul li .detext{
    height: 60px;
}
.tuandui .tuan_list ul li{
    height: 420px;
}
.ca_list li{
    cursor: pointer;
}
</style>
