<template>
  <div>
    <div id="content">
        <div class="router1">
          <div class="container">
                <router-link to="/">首页</router-link>><a href="javascript:void(0)">品牌商城</a>
          </div>
        </div>
        <div class="container">
          <div class="classify">
            <div class="class_list">
              <div class="label">品牌：</div>
              <ul>
                <li 
                    v-for="(item,index) in band_list" 
                    :class="item.selected ==1?'active':''"
                    @click="change_band(index)">{{item.cat_name}}</li>
              </ul>
            </div>
            
          </div>
          
        </div>
        <div class="product_">
          <div class="container">
            <div class="product_left">
              <div class="two">
                <div class="title">浏览记录</div>
                    <ul>
                        <li v-for="(item,index) in youlanjilv" @click="go_detail(item.goods_id)">
                            <a href="javascrpt:void(0)">
                                <img :src="item.goods_img"/>
                            </a>
                            <div class="name">{{item.goods_name}}</div>
                            <div class="price">￥{{item.shop_price}} /件</div>
                            <!-- <div class="status">升跌：
                                <span 
                                    :class="item.zhishuji"
                                >{{item.sjshuzhi}}</span></div> -->
                        </li>
                        
                    </ul>
              </div>
            </div>
            <div class="product_right">
              <div class="shaixuan">
                <ul>
                  <li :class="paidui_index == 0?'on':''" @click="change_paidui(0)">↑默认</li>
                    <li :class="paidui_index == 1?'on':''" @click="change_paidui(1)">↑人气</li>
                    <li :class="paidui_index == 2?'on':''" @click="change_paidui(2)">↓综合评分</li>
                    <li :class="paidui_index == 3?'on':''" @click="change_paidui(3)">↓价格升降</li>
                </ul>
              </div>
              <div class="product_list">
                <ul>
                  <li v-for="(item,index) in lists" @click="go_detail(item.goods_id)">
                    <a href="javascript:void(0)">
                      <img :src="item.goods_img"/>
                    </a>
                    <div class="name1">{{item.goods_name}}</div>
                    <div class="price1">￥{{item.shop_price}} /件</div>
                    <!-- <div class="status">升跌：<span class="green">升￥200  ↑  1.80%</span></div> -->
                  </li>
                  
                  
                </ul>
              </div>
              
            </div>
            <div class="page">
                 <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="parseInt(data_info.current_page)"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="20"
                  :page-count="parseInt(data_info.page_total)"
                  layout="total, prev, pager, next, jumper"
                  :total="parseInt(data_info.count)">
                </el-pagination> 
            </div>
          </div>
        </div>
      </div>

      <div id="contant-m">
            <search></search>
            <div class="fenlei">
                <div class="container-m">
                    <ul>
                        <li class="list" v-for="(item,index) in attr">
                            <div class="fenlei_title">{{item.filter_attr_name}}</div>
                            <ol>
                                <li
                                    :class="items.active?'on':''"
                                @click="change_attr(index,indexs,items.attr_id)" 
                                v-for="(items,indexs) in item.attr_list">{{items.attr_value}}</li>
                            </ol>
                        </li>
                       
                        
                    </ul>
                </div>
            </div>
        
          <div class="shaixuan-m">
              <ul>
                  <li class="on">↑默认</li>
                  <li>↓人气</li>
                  <li>↓综合评分</li>
                  <li>↓价格升降</li>
              </ul>
          </div>
        <div class="pro_list-m">
          <div class="container-m">
            <ul>
              <li v-for="(item,index) in lists" @click="go_detail(item.goods_id)">
                <a href="javascript:void(0)">
                  <div class="img">
                    <img :src="item.goods_img"/>
                  </div>
                  <div class="name">
                    {{item.goods_name}}
                  </div>
                  <div class="price">
                    ¥{{item.shop_price}}/件
                  </div>
                  <div class="shengjiang"><span>{{item.sjshuzhi}}¥500</span><span>↑0.4</span></div>
                </a>
              </li>
             
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script >
	import axios from 'axios'
    import Search from "./search"   //引入组件

	export default{
		name:'shop',
		data(){
			return {
                lists :[],
                band_list:[],
                attr:[],
                commonSend:[0,0,0,0],
                paidui_index:0,
                youlanjilv:[],
                data_info:{}
			}
		},
        components: {Search},
		created(){
			this.get_list(1)
            this.get_band()
            this.get_cat_list()
            this.get_liulan()
		},
         watch: {
              $route(){
                this.pjtid = this.$route.query.id
                if(this.$route.query.keyword){
                    this.seach(this.$route.query.keyword)
                }
              },
              pjtid() {
                console.log(this.$route.query.id)
                this.change_attr(0,this.$route.query.id,this.$route.query.attrs_id)
              },
        },
		methods:{
             handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
             handleCurrentChange(val) {
                var that = this;
                console.log(`当前页: ${val}`);
                this.get_list(val)
                
                
            },
            // 浏览记录
              get_liulan(){
               
                this.$axios({
                   url:'https://cy.gzziyu.com/mobile/ziyu.php?Action=youlanjilv&shuzi=2',
                   method:'post'
                })
                .then((res)=>{
                    console.log('浏览记录')
                    console.log(res)
                    this.youlanjilv = res.data
                })
            },
            seach(key){
                 this.$axios({
                    url:'http://cy.gzziyu.com/mobile/ny_flow.php?action=search',
                    method:'post',
                    params:{
                        cat_id:2,
                        keywords:key
                    }
                })
                .then((res)=>{
                    console.log(res)
                    this.lists = res.data
                })
            },
            change_paidui(index){
                this.paidui_index = index;
                switch(index){
                case 0:
                    this.$axios({
                        url:'http://cy.gzziyu.com/mobile/category.php?id=1',
                        method:'post',
                        params:{
                            brand:0
                        }
                    })
                    .then((res)=>{
                        console.log(res)
                        
                        this.lists = res.data
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                    break;
                case 1:
                    this.$axios({
                        url:'http://cy.gzziyu.com/mobile/ny_flow_goods.php?action=renqi',
                        method:'post',
                        params:{
                            id:2
                        }
                    })
                    .then((res)=>{
                        console.log(res)
                        
                        this.$axios({
                            url:'http://cy.gzziyu.com/mobile/'+res.data,
                            method:'post',
                        })
                        .then((ress)=>{
                            console.log(ress)
                            
                            this.lists = ress.data
                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                    break;
                case 2:
                    this.$axios({
                        url:'http://cy.gzziyu.com/mobile/ny_flow_goods.php?action=xiaoliang',
                        method:'post',
                        params:{
                            id:2
                        }
                    })
                    .then((res)=>{
                        console.log(res)
                        
                         this.$axios({
                            url:'http://cy.gzziyu.com/mobile/'+res.data,
                            method:'post',
                        })
                        .then((ress)=>{
                            console.log(ress)
                            
                            this.lists = ress.data
                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                    break;
                case 3:
                    this.$axios({
                        url:'http://cy.gzziyu.com/mobile/ny_flow_goods.php?action=jiage',
                        method:'post',
                        params:{
                            id:2
                        }
                    })
                    .then((res)=>{
                        console.log(res)
                        
                         this.$axios({
                            url:'http://cy.gzziyu.com/mobile/'+res.data,
                            method:'post',
                        })
                        .then((ress)=>{
                            console.log(ress)
                            
                            this.lists = ress.data
                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                    break;
                }
            },
            change_attr(index,childindex,id){
              console.log(123)
                this.commonSend[index] = id;
                this.attr[index].attr_list.map((item)=>{
                    item.active = false
                })
                this.attr[index].attr_list[childindex].active = !this.attr[index].attr_list[childindex].active;
                console.log(this.commonSend);
                console.log(this.attr)
                this.$axios({
                    url:"https://cy.gzziyu.com/mobile/category.php?id=1&price_min=0&price_max=0&filter_attr=",
                    method:'post',
                    params:{
                        id:2,
                        price_min:0,
                        price_max:0,
                        filter_attr:this.commonSend.join('.')
                    }
                })
                .then((res)=>{
                    console.log(res)
                    this.lists = res.data
                })
            },
            // 获取分类列表
            get_cat_list(){
                this.$axios({
                    url:'http://cy.gzziyu.com/mobile/ny_flow_goods.php?action=cat_filter_attr',
                    method:'post',
                    params:{
                        id:2
                    }
                })
                .then((res)=>{
                    console.log(res)
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].attr_list[0].active = true
                    }
                    this.attr = res.data
                })
                .catch((err)=>{
                    console.log(err)
                })
            },
            change_band(index){
                this.band_list.map((e)=>{
                    e.selected = 0
                })
                 this.band_list[index].selected = 1;
                 this.$axios({
                   // url:'http://cy.gzziyu.com/mobile/category.php',
                    url:'http://cy.gzziyu.com/mobile/category.php',
                    method:'post',
                    params:{
                        id:this.band_list[index].cat_id,
                       // brand: 
                    }
                 })
                 .then((res)=>{
                    console.log(res)
                    this.lists = res.data
                 })
                 this.$axios({
                    url:'http://cy.gzziyu.com/mobile/category.php&Action=yemian',
                    method:'post',
                    params:{
                        //id:this.band_list[index].cat_id
                       // brand: this.band_list[index].cat_id
                        brand:this.band_list[index].cat_id
                    }
                 })
                 .then((res)=>{
                    console.log(res)
                    this.data_info = res.data
                 })
            },
            get_band(){
                this.$axios({
                    url:'http://cy.gzziyu.com/mobile/pcindex.php?Action=chanpinfenlei',
                    method:'post',
                    params:{
                        id:2
                    }
                })
                .then((res)=>{
                    console.log(res)
                    this.band_list = res.data
                })
            },
            get_list(page,id){
                var that = this;
                this.$axios({
                    url:that.GLOBAL.url+'category.php?id=2',
                    method:'post',
                    params:{
                        //page:page,
                        brand:id,
                        page:page,
                        filter_attr:this.commonSend.join('.')
                    }
                })
                .then((res)=>{
                    console.log('品牌信息')
                    console.log(res)
                    this.lists = res.data
                })
                this.$axios({
                    url:that.GLOBAL.url+'category.php?id=2&Action=yemian',
                    method:'post',
                    params:{
                        page:page,
                        brand:id,
                        page:page,
                        price_min:0,
                        price_max:0,
                        filter_attr:this.commonSend.join('.')

                    }
                })
                .then((res)=>{
                    console.log(res)
                    this.data_info = res.data
                })
               
               
            },
            go_detail(id){
                this.$router.push({path:'/shop_detail',query:{id:id}})
            }
		}
	}
</script>
<style lang="scss">
	
@media only screen and (max-width:750px){
    #contant-m{
         padding-top: 0.87rem;
        padding-bottom: 0.98rem;
        width: 100%;
       
    }
}
#content{
    background: #f2f2f2;    
}
#content{
    overflow: hidden;
    .router1{
        font-size:14px;
        line-height:30px;
        color:#666666;
        padding: 15px 0 30px 0;
        background: #f2f2f2;
    }
    
}
.classify{
    width: 100%;
    background: #fff;
    margin-bottom: 30px;
    .class_list{
        height: 50px;
        line-height: 50px;
        border-bottom:1px #eeeeee solid;
        ul{
            float: left;
            width: 1100px;
            li{
                float: left;
                padding: 0 10px;
                color: #1a1a1a;
                font-size: 14px;
                width: 60px;
                text-align: center;
                &.active{
                    color: #ec1d25;
                }
            }
        }
        .label{
            float: left;
            width: 100px;
            font-size: 14px;
            color: #666666;
            padding-left: 20px;
            box-sizing: border-box;
        }
    }
}
.product_{
    width: 100%;
    background: #fff;
    overflow: hidden;
    .product_left{
            float:left;
            width:220px;
            
            margin-bottom: 30px;
            margin-right: 25px;
            margin-top: 25px;
       .one{
            margin-bottom: 25px;
            border:1px #e0e0e0 solid;
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
                        border-bottom:1px #e0e0e0 solid;
                        .nav_title{
                            width: 100%;
                            font-size: 12px;
                            color: #999999;
                            padding-left: 15px;
                            box-sizing: border-box;
                            line-height: 45px;
                            span{
                                display: inline-block;
                                width: 14px;
                                height: 14px;
                                text-align: center;
                                line-height: 14px;
                                border:1px #f37176 solid;
                                border-radius:50% ;
                                color: #f37176;
                                margin-right: 5px;
                            }
                            
                        }
                        .p{
                                font-size: 12px;
                                width: 100%;
                                color: #999999;
                                line-height: 20px;
                                padding:0 15px;
                                box-sizing: border-box;
                                margin-bottom: 10px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 3;
                                -webkit-box-orient: vertical;
                            }
                    }
                    a{
                        width: 100px;
                        height: 30px;
                        display: block;
                        margin: 18px auto;
                        border:1px #ee0a0d solid;
                        border-radius: 5px;
                        text-align: center;
                        line-height: 30px;
                        color: #ee0a0d;
                    }
                }
            }
        }
        .two{
             margin-bottom: 25px;
            border:1px #e0e0e0 solid;
            .title{
                width:100%;
                height:40px;
                background:#f1f1f1;
                line-height: 40px;
                text-align: center;
            }
            ul{
                width: 100%;
                padding: 10px 0 150px 0;
                li{
                    width: 205px;
                    height: 305px;
                    margin: 0 auto 16px;
                    border:1px #e0e0e0 solid;
                    img{
                        width: 100%;
                        
                    }
                    .name{
                        line-height: 30px;
                        font-size: 16px;
                        color: #333333;
                        border-top:1px #e0e0e0 solid;
                         width: 100%;
                        padding: 0 5px;
                        box-sizing: border-box;
                         overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }
                    .price{
                        color: #ee0a0d;
                        margin-bottom: 10px;
                        width: 100%;
                        padding: 0 5px;
                        box-sizing: border-box;
                    }
                    .status{
                        font-size: 12px;
                        color: #7f7f7f;
                         width: 100%;
                        padding: 0 5px;
                        box-sizing: border-box;
                        span.red{
                            color: #ee0a0d;
                        }
                        span.green{
                            color: #0d993f;
                        }
                    }
                }
            }
        }
    
    }
    .product_right{
        float: left;
        width: 955px;
        margin-top: 25px;
        .shaixuan{
            width: 100%;
            height: 40px;
            border:1px #e6e6e6 solid;
            background: #f2f2f2;
            ul{
                width: 100%;
                height: 100%;
                li{
                    float: left;
                    line-height: 40px;
                    color: #666666;
                    font-size: 14px;
                    width: 90px;
                    text-align: center;
                    &.on{
                        color: #ee0a0d;
                    }
                }
            }
        }
        .product_list{
            width: 100%;
            margin-top: 20px;
            ul{
                width: 100%;
                li{
                    width: 218px;
                    height: 330px;
                    border:1px #e0e0e0 solid;
                    margin: 0 25px 25px 0;
                    float: left;
                    img{
                        width: 100%;
                        
                    }
                    .name1{
                        line-height: 40px;
                        font-size: 16px;
                        color: #333333;
                        border-top:1px #e0e0e0 solid;
                         width: 100%;
                        padding: 0 5px;
                        box-sizing: border-box;
                        text-align: center;
                         overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }
                    .price1{
                        color: #ee0a0d;
                        line-height: 40px;
                        margin-bottom: 10px;
                        font-size: 18px;
                        text-align: center;
                        width: 100%;
                        padding: 0 5px;
                        box-sizing: border-box;
                    }
                    .status{
                        font-size: 12px;
                        color: #7f7f7f;
                         width: 100%;
                        padding: 0 5px;
                        box-sizing: border-box;
                        span.red{
                            color: #ee0a0d;
                        }
                        span.green{
                            color: #0d993f;
                        }
                    }
                    &:nth-child(4n){
                        margin-right: 0;
                    }
                }
            }
        }
        
    }
    .page{
        margin-left: 230px;
            clear: both;
            margin-bottom: 60px;
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


@media only screen and (max-width:750px){
    #contant-m{
          padding-top: 0.87rem;
                padding-bottom: 0.98rem;
         .seach-m{
               width: 100%;
               height:1.06rem;
               background: #f0f0f0;
               
              
               .input{
                   width: 5.76rem;
                   float: left;
                   margin: 0.2rem 0 0 0.23rem;
                   background: #fff;
                   border-radius: 0.05rem;
                   height: 0.6rem;
                   .select{
                       float: left;
                       width: 1.55rem;
                       height: 0.4rem;
                       margin-top: 0.1rem;
                       select{
                           float: left;
                           border: none;
                           text-align: center;
                           width: 100%;
                           height: 100%;
                           border-right:1px solid #d2d2d2;
                           option{
                               text-align: center;
                           }
                       }
                   }
                   .keword{
                       width: 3.6rem;
                       float: left;
                       height: 0.4rem;
                       margin-top: 0.1rem;
                       border: none;
                       input{
                           border: none;
                           background: none;
                           width: 100%;
                           height: 100%;
                           float: left;
                           line-height: 0.4rem;
                           padding: 0 0.1rem;
                           box-sizing: border-box;
                       }
                   }
                   .seach_button{
                       width: 0.4rem;
                       height: 0.4rem;
                       float: right;
                       margin: 0.1rem 0.1rem 0 0 ;
                       img{
                           width: 100%;
                           height: 100%;
                           float: left;
                       }
                   }
               }
               .kefu_m{
                   float: right;
                   width: 0.75rem;
                   height: 0.62rem;
                   margin: 0.17rem 0.25rem 0 0;
                   img{
                       width: 100%;
                       height: 100%;
                       float: left;
                   }
               }
           }
        .fenlei{
            ul{
                width: 100%;
                li.list{
                    width: 100%;
                    overflow: hidden;
                    border-bottom: 1px solid #fcdbdc;
                    .fenlei_title{
                        width: 100%;
                        font-size: .24rem;
                        line-height: .56rem;
                        margin: 0.25rem 0 .1rem 0 ;
                        font-weight: bold;
                    }
                    ol{
                        width: 100%;
                        margin: 0;
                        padding: 0;
                        li{
                            float: left;
                            width: 1.35rem;
                            height: .4rme;
                            text-align: center;
                            background: #f0f0f0;
                            color: #4a4a4a;
                            font-size: .22rem;
                            line-height: .4rem;
                            margin-right: 0.05rem;
                            margin-bottom: 0.15rem; 
                            &.on{
                                background: #eb1e24;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
        .shaixuan-m{
            width: 100%;
            height: .6rem;
            background: #f0f0f0;
            margin:0.4rem 0;
            ul{
                width: 100%;
                overflow: hidden;
                li{
                    float: left;
                    width: 25%;
                    text-align: center;
                    font-size: .24rem;
                    color: #7d7d7d;
                    line-height: .6rem;
                    &.on{
                        color: #c61821;
                    }
                }
            }
        }
        .pro_list-m{
            width: 100%;
            
            ul{
                width: 100%;
                overflow: hidden;
                li{
                    float: left;
                    width: 3.4rem;
                    height: 4.7rem;
                    background: #fff;
                    margin:0 0.20rem 0.22rem 0;
                    &:nth-child(2n){
                        margin-right: 0;
                    }
                    .img{
                        width: 100%;
                        height: 3.38rem;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .name{
                        font-size: .28rem;
                        color: #696969;
                        text-align: center;
                        height: 0.4rem;
                        margin-top: 0.1rem;
                        overflow: hidden;

                        text-overflow: ellipsis;

                        white-space: nowrap;
                    }
                    .price{
                        color: #a10408;
                        font-size: 0.22rem;
                        text-align: center;
                        width: 100%;
                        margin: 0.1rem 0 0.05rem 0;
                    }
                    .shengjiang{
                        color: #eb1e24;
                        font-size: 0.22rem;
                        width: 100%;
                        text-align: center;
                        span{
                            margin-right: 0.2rem;
                        }
                    }
                    .green{
                        color: #036595;
                    }
                }
            }
        }
    }
}

</style>