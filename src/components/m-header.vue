<template>
	<div>
         <!--公共头部-->
        <div id="header">
          <div class="header_top">
            <div class="container">
            <div class="top_right_common">您好，欢迎来到品牌普洱报价网</div>
              <ul class="">
                <li><router-link to="/user/order?id=0">我的订单</router-link></li>
                <li><router-link to="user/user_info">个人中心</router-link></li>
                <li v-if="Infos">欢迎你，{{Infos.user_name}}</li>
                <li v-if="Infos" @click="un_login">退出登录</li>
                <li v-if="!Infos"><router-link to="/login?id=0"><img src="static/img/zhuce.png"/>注册</router-link></li>
                <li v-if="!Infos"><router-link to="/login?id=1"><img src="static/img/login.png"/>登录</router-link></li>
              </ul>
            </div>
          </div>
          <div class="header_content">
            <div class="container">
              <div class="logo"><router-link to="/"><img src="static/img/logo.jpg"/></router-link></div>
              <div class="seach">
                <div class="seach_input">
                  <div class="left"  @click="show_cat">
                    {{fenlei_change.cat_name}}<span>></span>
                    <div class="search_item" v-show="search_item" >
                          <ul id="search_item">
                            <li v-for="(item,index) in fenlei" :key="index" @click="change_cat(index)"><a href="javascript:void(0);" ref="fenlei">{{item.cat_name}}</a></li>
                              
                          </ul>
                      </div>
                  </div>
                  <div class="center">
                    <input type="text" 
                      v-model="kewords" placeholder="请输入搜索关键字" 
                      @focus="focue"
                      value="" ref="searchInput"/>
                    <ul class="select-options" v-show="isBulur">
                      <li 
                        v-for="(item,index) in isfenlei?options5:options6"
                        :key="index"
                         @click.stop="changekey(item.value)"
                      >
                          <span class="name">{{item.value}}</span>
                          <span class="price">￥{{item.label}}</span>
                      </li>
                    </ul>
                    <!-- <el-select
                      class="el-select"
                      v-model="value10"
                      @keyup.enter="seach_input"
                      size="medium"
                      filterable
                      allow-create
                      default-first-option
                      @change="changekey"
                      placeholder="请输入搜索关键字"
                      @blur="blur"
                      ref="elSelect">
                      <el-option
                        v-for="item in isfenlei?options5:options6"
                        :key="item.value"
                        :label="item.label"
                        :value="isclear? '' :item.value">
                      </el-option>
                    </el-select> -->
                  </div>
                  <div class="right"><button><img src="static/img/seach.png" @click="seach" />搜索</button></div>
                </div>
                <div class="seach_keyword">
                  <div class="label">你可能要搜：</div>
                  <div class="label_list">
                    <ul>
                      <li v-for="(item,index) in search_keyword[0]?search_keyword[0].split(','):''" :key="index" @click="get_key(item)">{{item}}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="kefu"><span>客服电话：</span>{{tel}}</div>
              <div class="cart"><router-link to="/cart"><img src="static/img/cart.png"/>购物车：  <span>{{cart_num}}</span>件</router-link></div>
            </div>
          </div>
          <div class="header_bottom">
            <div class="container" style="width:1300px;">
              <ul class="nav-list">
                <li class="nav" v-for="(item,index) in nav_list" 
                    :key="index"
                    :class="index==tab_num?'active':''"
                    @click="go_url(item,item.url,index)"
                    @mouseover="showsublist(item)"
                    @mouseout="hidesublist"><a href="javascript:void(0);">{{item.name}}</a>

                    <ul class="sublist" v-if="item.name==='咨询频道' && showsub" @mouseover="showsub=true">
                        <li 
                          v-for="(subnav,index1) in subnav_list"  
                          :key="index1"
                          @click.stop="go_url1(index,subnav.cat_id)"
                        >
                          {{subnav.cat_name}}
                        </li>

                    </ul>
                    
                </li>
                
              </ul>
            </div>
          </div>
          <div class="menu">
            <ul>
              <li>
                <a :href="kefuUrl" target="_blank"><img src="static/img/kefu.png" alt=""></a>
                <!-- <div class="chlid_div">联系客服：{{tel}}</div> -->
              </li>
              <li>
                <a href="javascript:void(0);"><img src="static/img/phone.png" alt=""></a>
                <div class="chlid_div">电话：{{tel}}</div>
              </li>
              <li>
                <a href="javascript:void(0);"><img src="static/img/qq.png" alt=""></a>
                <div class="chlid_div">qq：{{qq}}</div>
              </li>
              <li>
                <a href="javascript:void(0);"><img src="static/img/wechat.png" alt=""></a>
                <!-- <div class="chlid_div">微信：{{tel}}</div> -->
                <div class="chlid_div" style="height:130px"><img src="static/img/erweima.png" style="height:100px; width:100px;"></div>
              </li>
              <li>
                <a href="javascript:window.onscroll = 0;" @click="backTop" id="top"><img src="static/img/top.png" alt=""></a>
              </li>
            </ul>
          </div>
        </div> 

        <!--移动端-->
    
    <div id="header-m">
        <div class="nav_btn" @click="show_nav">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="logo">
            <img src="static/img/579067372783816491.png"/>
        </div>
        <div class="search">
            普洱品牌
        </div>
        <div class="nav_list" v-if="nav_bool">
            <ul>
                <li><router-link to="/">首页 <span>></span></router-link></li>
                <li><router-link to="/user">用户中心<span>></span></router-link></li>
                <li><router-link to="/cart">购物车<span>></span></router-link></li>
                <li><router-link to="/shop">全部商品<span>></span></router-link></li>
                <li><router-link to="/login">登录<span>></span></router-link></li>
                <li><router-link to="/login">注册<span>></span></router-link></li>
                
            </ul>
        </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import store from '@/store/store'
export default {
     name:"MHeader",
     data () {
      return {
        search_item:false,
        isfenlei:false,
        isBulur:false,
        hangqing:[],
        pifa:[],
        fenlei:[],
        fenlei_change:{},
        search_keyword:[],
        kewords:"",
        nav_list:[],
        subnav_list:[],
        nav_bool:false,
        tab_num:0,
        qq:'',
        tel:'',
        logo:'',
        showsub:false,
        options5: [],
        options6:[],
        value10: [],
        kefuUrl:''
      }
     },
     mounted(){
      this.get_class();
      this.get_search_title()
      this.get_nav(),
      this.get_subnav(),
      this.gethangqingsList(),
      this.getpifasList()
     },
     created(){
      this.get_info()
     },
     watch: {
          $route(to) {
             this.changeData()
          }
      },
     computed:{
        Infos(){
          return  JSON.parse(sessionStorage.getItem('userInfos'))
        },
        cart_num(){
           return this.$store.state.cart_num
        }
    },
     methods:{
      get_key(key){
        this.kewords = key;
        this.seach()
      },
      focue(){
        this.isBulur=true;
      },
      changekey(key){
        this.$refs.searchInput.value=key;
        this.kewords = key;
        this.isBulur=false;
      },
        seach(){
          this.keywords=this.$refs.searchInput.value
          if(this.fenlei_id ==1){
             this.$router.push({name:'hangqing',query:{keyword:this.kewords}})
          }else{
            this.$router.push({name:'shop',query:{keyword:this.kewords}})
          }
         this.isBulur=false;
        },
        go_url(item,url,index){
          this.$router.replace({path:url})
          this.tab_num = index
        },
        go_url1(index,cat_id){
          console.log(cat_id)
          this.$router.push({name:'zixun',query:{id:cat_id}})  
          //this.$router.replace({path:`/zixun/${cat_id}`})
//        this.$router.push({
//          path:`/zixun/${cat_id}`
//        })
          this.tab_num = index
        },
        showsublist(item){
          clearTimeout(this.timer)
          if(item.name==="咨询频道"){
            this.showsub=true;
          }
        },
        hidesublist(){
          this.timer=setTimeout(() => {
            this.showsub=false;
            console.log(this.showsub)
          }, 200);
        },
        backTop() {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
        un_login(){
          sessionStorage.removeItem('userInfos');
          location.reload()
        },
        show_cat(){
          this.search_item = !this.search_item
        },
        show_nav(){
            this.nav_bool = !this.nav_bool
        },
        // 分类列表
        get_class(){
           var that = this;
          axios.post(that.GLOBAL.url+'ny_flow.php?action=get_category')
          .then((res) =>{
            //console.log(res.data);
            that.fenlei = res.data;
            that.fenlei_change = res.data[0];
            that.fenlei_id = res.data[0].cat_id
          })
          .catch((err) =>{
            console.log(err);
          });
        },
        change_cat(index){
          this.fenlei_change = this.fenlei[index];
          this.fenlei_id = this.fenlei[index].cat_id;
          this.isfenlei=!this.isfenlei;
        },
        get_search_title(){
           var that = this;
            axios.post(that.GLOBAL.url+'pcindex.php?Action=searchkeywords')
            .then((res) =>{
              //console.log(res.data);
              this.search_keyword = res.data;
            })
            .catch((err) =>{
              console.log(err);
            });
        },
        seach_input(){
          var that = this;
            axios.post(that.GLOBAL.url+'ny_flow.php?action=search',{
              cat_id:that.cat_id,
              keywords:that.kewords
            })
            .then((res) =>{
              //console.log(res);
              console.log(that.kewords,that.cat_id);
            })
            .catch((err) =>{
              console.log(err);
            });
        },
        get_nav(){
          var that = this;
            axios.post(that.GLOBAL.url+'pcindex.php?Action=ctype')
            .then((res) =>{
              //console.log(res);
              that.nav_list = res.data
            })
            .catch((err) =>{
              console.log(err);
            });
        },
        get_subnav(){
          var that = this;
            axios.post(that.GLOBAL.url+'pcindex.php?Action=fenlei')
            .then((res) =>{
              that.subnav_list = res.data
              //console.log('subnav_list'+that.subnav_list)
            })
            .catch((err) =>{
              console.log(err);
            });
        },
        get_info(){
          let that = this;
          this.$axios({
            url:'http://cy.gzziyu.com/mobile/pcindex.php?Action=siteweb',
            method:'post'
          })
          .then((res)=>{
            console.log('信息')
            console.info(res.data)
            res.data.map(function (item) {
              if(item.code == "shop_logo"){
                that.logo = item.value
              }
              if(item.code == "qq"){
                that.qq = item.value
              }
               if(item.code == "service_phone"){
                that.tel = item.value
              }
              if(item.code == "kefuwebsite"){
                that.kefuUrl = item.value
              }
            })
           
          })
        },
        // 行情列表
        gethangqingsList(){
          var that = this;
          //console.log(12333333333)
          axios.post(that.GLOBAL.url+'pcindex.php?Action=xinpinhangqing&id=20')
          .then((res) =>{
            //console.log("行情")
            //console.log(res);
            this.hangqing = res.data
            for(var i=0; i<res.data.length;i++){
                var _obj={
                    value: res.data[i].goods_name,
                    label: res.data[i].shop_price+'/'+res.data[i].seller_note
                }
              this.options6.push(_obj)
            }
            console.log("行情")
            console.info(this.hangqing)
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
            //this.pifa_right = res.data.slice(1,2)
            //console.log("批发")
            for(var i=0; i<res.data.length;i++){
                var _obj1={
                    value: res.data[i].goods_name,
                    label:res.data[i].shop_price+'/'+res.data[i].seller_note
                }
              this.options5.push(_obj1)
            }
            
          })
          .catch((err) =>{
            console.log(err);
          });
        }
     }
    
  }
</script>
<style lang="scss">
.top_right_common{
  float: left;
  // color: #fff;
  font-size: 12px;
  line-height:30px;
}
#header{
  width: 100%;
  
   .header_top{
    height: 30px;
    width: 100%;
    background: #f1f1f1;
    ul{
        float: right;
        li{
            float: left;
            line-height: 30px;
            font-size: 12px;
           
            padding: 0 15px;
            a{
                display: block;
                line-height: 30px;
                height: 100%;
                 color: #666666;
                 img{
                     width: 15px;
                     height: 15px;
                     line-height: 30px;
                     margin-right: 3px;
                     display: inline-block;
                 }
            }
        }
    }
   }
   .header_content{
       height: 110px;
       .logo{
           width: 196px;
           height: 66px;
           float: left;
           margin-top: 22px;
       }
       .seach{
           width: 480px;
           margin-top: 23px;
           float: left;
           margin-left: 105px;
           .seach_input{
               
               width: 100%;
               height: 40px;
               box-sizing: border-box;
               border:1px #dadada solid;
               .left{
                   float: left;
                   width: 105px;height: 32px;
                   line-height: 32px;
                   text-align: center;
                   border-right: 1px #DADADA solid;
                   margin-top: 4px;
                   color: #666666;
                   cursor: pointer;
                   position: relative;
                   span{
                       display: inline-block;
                       transform: rotate(90deg);
                   }
                   .search_item{
                       width:100%; 
                       position:absolute; 
                       left:-1px; 
                       top:34px; 
                       background:#fff; 
                       text-align:center;
                       border:1px solid #DADADA;
                       border-top:1px solid #fff; 
                       z-index:2;
                       li{line-height:30px;}
                   }

               }
               .center{
                   position: relative;
                   float: left;
                   width:280px;
                   height: 100%;
                   .el-select{
                     width: 100%;
                     line-height: 38px;
                   }
                   .select-options{
                     position: absolute;
                     width: 100%;
                     box-sizing: border-box;
                     left: 0;
                     top: 38px;
                     z-index: 99999;
                     background: rgba(255, 255, 255, 0.9);
                     border:1px solid red;
                     max-height: 200px;
                     overflow: auto;
                   }
                   .select-options li{
                     padding: 0 10px;
                     height: 40px;
                     line-height: 40px;
                     overflow: hidden;
                     text-overflow: ellipsis;
                     white-space: nowrap;
                     cursor: pointer;
                   }
                   .select-options li .name{
                     float: left;
                   }
                   .select-options li .price{
                     float: right;
                     color: red;
                   }
                   input{
                       height: 100%;
                       border: none;
                       padding: 0 10px;
                       box-sizing: border-box;
                   }
               }
               .right{
                   float: left;
                   width: 92px;
                   height: 100%;
                   button{
                       width: 100%;
                       height: 100%;
                       background: #ee0a0d;
                       border:none;
                       color: #fff;
                       text-align: center;
                       line-height: 40px;
                       img{
                           margin: 6px 0 0 10px;
                           display: inline-block;
                           float: left;
                           width: 24px;height: 24px;
                           
                           
                       }
                   }
               }
           }
           .seach_keyword{
               width: 100%;
               .label{
                   float: left;
                   font-size: 12px;
                   color: #999999;
                   line-height: 27px;
               }
               .label_list{
                   float: left;
                   ul{
                       li{
                          cursor:pointer;
                           float: left;
                           color: #ee0a0d;
                           font-size: 12px;
                           line-height: 27px;
                           padding: 0 8px;
                       }
                   }
               }
           }
       }
       .kefu{
           float: left;
           font-size: 14px;
           color: #666666;
           margin-top: 36px;
           margin-left: 7px;
           span{
               color: #999999;
           }
       }
       .cart{
           width: 170px;
           height: 40px;
           border:1px solid #d9d9d9;
           float: right;
           margin-top: 28px;
           color: #000000;
           line-height: 40px;
             text-align: center;
           span{
               color: #EE0A0D;
               margin: 0 2px;
           }
           
           img{
               margin-right: 4px;
           }
       }
       
   }
   .header_bottom{
       width: 100%;
       height: 40px;
       background: #cc080b;
       .nav-list{
           width: 100%;
           .nav{
              position: relative;
               width: 120px;
               height: 32px;
               text-align: center;
               float: left;
               margin-top: 4px;
               margin-right: 15px;
               color: #fff;
               text-align: center;
               line-height: 32px;
               border-radius: 5px;
               cursor:pointer;
               font-size: 14px;
               a{
                   color: #fff;
                   font-size: 16px;
                   font-weight: bold;
               }
               .sublist{
                 position: absolute;
                 bottom: -68px;
                 left: 0;
                 right: 0;
                 z-index: 999;
                 background: rgba(172,21,23,0.9)
               }
           }
           li.active{
               background: #ac1517;
           }
       }
   }
   .menu{
       width: 50px;
       background: #940000;
       position: fixed;
       right: 0;
       top:50%;
       margin-top: -120px;
       border-top-left-radius:5px;
       border-bottom-left-radius:5px;
       z-index: 100;
       font-size:16px;
       // overflow: hidden;
       ul{
           width: 100%;
           li{
            float: left;
               width: 100%;
               height: 60px;
               border-bottom: 1px #b65252 solid;
               position: relative;
               // overflow: hidden;
               box-sizing:border-box;
               margin: 0;
               a{
          overflow: hidden;
               }
               img{
                width: 25px;
                height: 25px;
                margin: 13px auto;
                display: block;
               }
               .chlid_div{
                height: 60px;
                padding: 0 15px;
                background: #EC1D25;
                color: #fff;
                position: absolute;
                right: 50px;
                top: 0;
                min-width:200px;
                line-height: 50px;
                text-align: center;
                display: none;
                border-top-left-radius:5px;
            border-bottom-left-radius:5px;
               }
               &:hover{
                background: #EC1D25;
               }
               &:hover .chlid_div{
                display: block;
               }
           }
       }
   }

}
@media only screen and (max-width:750px){
     #header{
        display: none;
        
    }
     #content{
        display: none;
        
    }
    .common_div{
        display: none;
    }
    #footer{
        display: none;
    }
    #header-m{
            width: 100%;
            height: 0.87rem;
            background: #FFF;
            position: fixed;
            top: 0;
            z-index: 1;
            .next{
                width: 0.6rem;
                height: 0.6rem;
                font-size: 0.57rem;
                color: #616161;
                line-height: 0.6rem;
                height: 0.65rem;
                overflow: hidden;
                position: absolute;
                left: 0.16rem ;
                top: 0.16rem ;
            }
        }
        #header-m .nav_btn{
            width: 0.6rem;
            height: 0.55rem;
            overflow: hidden;
           
            position: absolute;
            right: 0.16rem ;
            top: 0.16rem ;
        }
        #header-m .nav_btn span{
            display:block;
            width: 100%;
            height: 0.04rem;
            background: #ee0a0d;
            margin-bottom: 0.13rem;
        }
        #header-m .search{
            width: 100%;
            height: 0.87rem;
            overflow: hidden;
            text-align: center;
            background: #FFFFFF;
              font-size: 0.3rem;
              line-height: 0.87rem;
               color: #999999;
        }
        #header-m .logo{
            width: 0.6rem;
            height: 0.6rem;
            overflow: hidden;
            position: absolute;
            left: 0.16rem ;
            top: 0.16rem ;
            img{
                width: 100%;
                height: 100%;
                float: left;
            }
        }
        
        #header-m .search img{
            width: 0.48rem;
            height: 0.48rem;
            margin-right: 0.2rem;
            margin-top: 0.05rem;
            float: right;
            
        }
        #header-m .nav_list{
            position: fixed;
            width: 4.64rem;
            background: #a3a6a8;
            top: 0.87rem;
            right: 0;
            z-index: 100;
        }
        #header-m .nav_list ul{
            padding: 0;
            margin: 0;
            overflow: hidden;
            background:#770003;
        }
        #header-m .nav_list ul li{
            width: 3.82rem;
            height: 0.6rem;
            margin: 0 auto;
            border-bottom: 1px solid #8d292c;
            line-height: 0.6rem;
            
        }
        #header-m .nav_list ul li a{
            font-size: 0.24rem;
            text-align: left;
            color: #fff;
            float: left;
            display: block;
            width: 100%;
            span{
                color: #9d484a;
                float: right;
            }
        }
         .container-m{
            width: 7rem;
            margin: 0 auto;
        }
        
        
        #bottom-m{
        width: 100%;
        height: 0.98rem;
        background: #770003;
        position: fixed;
        z-index: 1;
        bottom: 0;
    }
    #bottom-m ul{
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    #bottom-m ul li {
        width: 20%;
        float: left;
        list-style-type: none;
        height: 100%;
    }
//  #bottom-m ul li.on{
//      background: #658888;
//  }

    #content-m{
          padding-top: 0.87rem;
                padding-bottom: 0.98rem;
    }
    #bottom-m ul li img:nth-child(1){
        margin-top: 0.13rem;
    }
    #bottom-m ul li a img{
        display: block;
        margin: 0 auto;
        width: 0.5rem;
        height: 0.42rem;
        margin-bottom: 0.05rem;
    }
    #bottom-m ul li a img:nth-child(1){
        margin-top: 0.10rem;
    }
    #bottom-m ul li a{
        width: 100%;
        height: 100%;
        font-size: 0.2rem;
        text-align: center;
        text-decoration: none;
        display: block;
        margin: 0 auto;
        color: #fdfbfb;
    }
    
}

@media only screen and (min-width:751px){
    #header-m{
        display: none;
    }
    #seach-m{
        display: none;
    }
    #content-m{
        display: none;
    }
    #contant-m{
        display: none;
    }
    #bottom-m{
        display: none;
    }
}
</style>