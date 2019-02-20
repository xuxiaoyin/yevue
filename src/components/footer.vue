<template>
<div>
    <!--公共底部-->
  <div id="footer">
    <div class="footer_top">
      <div class="container">
        <div class="list">
          <ul>
          <li>
              <dl>
                <dt>客服电话</dt>
                <dd>{{tel}}</dd>
                <dt>服务时间</dt>
                <dd>9:00-20:00</dd>
              </dl>
            </li>
            <li v-for="item in footerList">
              <dl>
                <dt>{{item.cat_name}}</dt>
                <dd v-for="items in item.article" @click="go_footer(items.article_id)">{{items.title}}</dd>
              </dl>
            </li>
            
          </ul>
        </div>
        <div class="sao_code">
          <img src="static/img/gongzhonghao.jpg"/>
          <p>扫一扫 关注我们 <br>搜索微信公众账号：大益品牌普洱报价</p>
        </div>
        <div class="sao_code">
          <img src="static/img/xiaochengxu.jpg"/>
          <p>扫一扫 关注我们 <br>搜索微信小程序：大益品牌普洱行情</p>
        </div>
        <div class="kouhao">
          <ul>
            <li><span>快</span>行情报价更快</li>
            <li><span>准</span>行情报价更准</li>
            <li><span>全</span>行情分析更全</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer_bottom">
      <div class="container">
        <div class="gognshang">© 品牌普洱报价网版权所有，并保留所有权利。<br/>品牌普洱报价网品牌行情报价仅供参考，网站文章、评论纯属茶友观点，与我们无关。<br/>
 地址：广州市荔湾区芳村南方茶叶市场洞企石路10号  普洱茶批发热线:17665067575 &nbsp; 备案号： <a href="http://www.miitbeian.gov.cn/">粤ICP备18114873号</a><br/>合作伙伴：广东省茶叶流通协会 南方茶叶协会</div>
      </div>
    </div>
  </div>
  <!--底部-->
  <div id="bottom-m">
    <ul>
      <li class="on">
        <router-link to="/"><img src="static/img/index.png">首页</router-link>
      </li>
      <li>
        <router-link to="/shop"><img src="static/img/pifa-tab.png">品牌批发</router-link>
      </li>
      <li>
        <router-link to="/hangqing"><img src="static/img/kefu-tab.png">行情</router-link>
      </li>
      <li>
        <router-link to="/cart"><img src="static/img/cart-tab.png">购物车</router-link>
      </li>
      <li>
        <router-link to="/m_user"><img src="static/img/user-tab.png">我的</router-link>
      </li>
      
    </ul>
  </div>
  <!--底部 end-->
</div>
</template>
<script type="text/javascript">
    import axios from "axios"
    export default {
        name:"footer",
        data () {
            return {
                footerList:[],
                tel:''
            }
        },
        mounted(){
            this.get_footer()
            this.get_info()
        },
        methods:{
            go_footer(id){
              this.$router.push({path:'/footer_detail',query:{id:id}})
            },
            get_footer(){
                var that = this;
                axios.post(that.GLOBAL.url+'pcindex.php?Action=help')
                .then((res) =>{
                    console.log(res.data);
                    that.footerList = res.data
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
                console.log(res)
                res.data.map(function (item) {
                  
                   if(item.code == "service_phone"){
                    that.tel = item.value
                  }
                })
               
              })
            }
        }
    }
</script>
<style lang="scss">
	#footer {
  width: 100%;
  height: 413px; }
  #footer .footer_top {
    width: 100%;
    height: 333px;
    background: #990202;
    padding-top: 50px; }
    #footer .footer_top .list {
      float: left;
      margin-bottom: 90px; }
      #footer .footer_top .list ul li {
        float: left;
        width: 140px; }
        #footer .footer_top .list ul li dl {
          width: 100%; }
          #footer .footer_top .list ul li dl dt {
            font-size: 16px;
            color: #fff;
            line-height: 34px; }
          #footer .footer_top .list ul li dl dd {
            font-size: 12px;
            color: #daa4a4;
            margin: 0;
            line-height: 25px; }
     #footer .footer_top .sao_code{
      float: left;
      width: 240px;
     }
    #footer .footer_top .sao_code img {
      width: 130px;
      margin:0 auto;
      display: block;
     }
    #footer .footer_top .sao_code p {
      // float: left;
      color: #fff;
      text-align: center;
      line-height: 26px;
      margin-left: 10px;
      margin-top: 30px; }
    #footer .footer_top .kouhao {
      width: 100%;
      clear: both; 
      // padding-top: 15px;
    }
      #footer .footer_top .kouhao ul {
        overflow: hidden;
        width: 100%; }
        #footer .footer_top .kouhao ul li {
          float: left;
          width: 33.33%;
          color: #fff;
          font-size: 24px;
          height: 90px;
          line-height: 90px; }
          #footer .footer_top .kouhao ul li span {
            font-size: 48px;
            border-radius: 50%;
            display: inline-block;
            box-sizing:border-box;
            width: 90px;
            height: 90px;
            border: 1px #fff solid;
            color: #fff;
            line-height: 90px;
            text-align: center;
            margin-right: 5px; }
  #footer .footer_bottom {
    width: 100%;
    // height: 80px;
    padding: 6px 0;
    background: #f3f3f3;
    overflow: hidden; }
    #footer .footer_bottom .gognshang {
     
      margin: 0 auto;
      font-size: 12px;
      color: #8e8e8e;
      text-align: center;
      line-height: 25px;
         }

</style>