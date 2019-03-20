<template>
	<div>
            <div id="content">
                <div class="router">
                    <div class="container">
                        <router-link to="/">首页</router-link>><a href="javascript:void(0)">指数参考</a>
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
                                    @click="change_band(index)">{{item.brand_name}}</li>
                            </ul>
                        </div>
                        
                    </div>
                    
                </div>
                <div class="product_">
                    <div class="container">
                        
                        <div class="product_right">
                            <div class="tab_list">
                              <ul>
                                <li 
                                  v-for="(item,index) in zhishu_tab"
                                  @click="click_zhishutab(index)"
                                  :data-index="index"
                                  :class="index==zhishutab_num?'active':''">{{item}}</li>
                              </ul>
                            </div>
                            <div class="shaixuan">
                                <ul>
                                    <li v-for="(item,index) in menuList" :class="item.active ? 'on' : ''" @click="paixu(index)">{{item.txt}}</li>
                                    <!-- <li>↑人气</li>
                                    <li>↓综合评分</li>
                                    <li>↓价格升降</li> -->
                                </ul>
                            </div>
                             <div class="table">
                                <table border="0" cellspacing="0" cellpadding="0">
                                        <thead>
                                          <td>品名</td>
                                          <td>参考价</td>
                                          <td>升跌</td>
                                          <td>升跌幅</td>
                                          <td>年份</td>
                                          <td>规格</td>
                                          <td>更新时间</td>
                                        </thead>
                                        <tbody>

                                          <tr v-for="(item,index) in zhishu" @click="go_hangqing(item.id)">
                                            <td>{{item.h_chanpingm}}</td>
                                            <td>{{item.h_cenkao}}</td>
                                            <td :class="item.zhishuji == 'down'?'green':'red'">{{item.wenzibd}}￥{{item.h_zhangdiee}}</td>
                                            <td :class="item.zhishuji == 'down'?'green':'red'">{{item.fuhaobd}}{{item.h_zhangdief}}</td>
                                            <td>{{item.nianxian}}</td>
                                            <td>{{item.goods_brief}}</td>
                                            <td>{{item.h_addtime}}</td>
                                          </tr>
                                         
                                        </tbody>
                                </table>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            </div>
            <div id="content-m">
                 <div id="content-m">
                <!--分类 end-->
                <div class="zhishu-m">
                   
                    <div class="container-m">
                        <div class="zhishu_tab">
                            <ul>
                                <li 
                                  v-for="(item,index) in zhishu_tab"
                                  @click="click_zhishutab(index)"
                                  :data-index="index"
                                  :class="index==zhishutab_num?'on':''">{{item}}</li>
                            </ul>
                        </div>
                        <div class="table-m">
                            <ul>
                                 <li>
                                    <div class="name">品名</div>
                                    <div class="price">参考价</div>
                                    <div class="shengdie">升跌</div>
                                    <div class="shengdie">升跌幅</div>
                                </li>
                                <li v-for="(item,index) in zhishu" @click="go_hangqing(item.id)">
                                    <div class="name">{{item.h_chanpingm}}</div>
                                    <div class="price">{{item.h_cenkao}}</div>
                                    <div class="shengdie">{{item.wenzibd}}{{item.h_zhangdiee}}</div>
                                    <div class="shengdie">{{item.wenzibd}}{{item.h_zhangdief}}</div>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            </div>   
    </div>
</template>

<script >
	import axios from 'axios'
	export default{
		name:'zhshu',
		data(){
			return {
                band_list:[],
                zhishu:[],
                zhishu_tab:['所有指数','当年茶指数','新茶指数','中茶指数'],
                zhishutab_num:0,
                brand:['',11,13,14],
                brand_index:0,
                menuList: [
                  {
                      txt: '↑默认',
                      active: true
                  },
                  {
                      txt: '↑人气',
                      active: false
                  },
                  {
                      txt: '↑综合评分',
                       active: false
                  },
                  {
                      txt: '↑价格升降',
                       active: false
                  }
              ],
			}
		},
		created(){
            this.getzhishuList()
            this.get_band()
            this.click_zhishutab(0)
		},
		methods:{
            //排序
            paixu: function (index) {
             console.log(index)
              this.menuList.map((item) => {
                item.active = false
              })
               this.menuList[index].active = !this.menuList[index].active
              
            },
            go_hangqing(id){
                this.$router.push({name:'hangqing_detail',query:{id:id}})
            },
            // 点击切换指数
            click_zhishutab(index){
              this.zhishutab_num = index;
              var that = this;
              axios.post(that.GLOBAL.url+`pcindex.php?Action=chayezhishu&shuzi=${index}&brand_id=${this.brand_index}`)
              .then((res) =>{
                console.log(res);
                this.zhishu = res.data
              })
              .catch((err) =>{
                console.log(err);
              });
            },
			get_band(){
                this.$axios({
                    url:'http://cy.gzziyu.com/mobile/ny_flow_goods.php?action=brand',
                    method:'post'
                })
                .then((res)=>{
                    console.log(res)
                    this.band_list = res.data
                })
            },
            change_band(index){
                this.band_list.map((e)=>{
                    e.selected = 0
                })
                this.zhishutab_num=0
                 this.brand_index=this.brand[index]
                 this.band_list[index].selected = 1;
                 this.$axios({
                    url:'http://cy.gzziyu.com/mobile/pcindex.php?Action=chayezhishu&shuzi=0',
                    method:'post',
                    params:{
                        brand_id:this.brand_index        
                    }
                 })
                 .then((res)=>{
                    console.log(res)
                    this.zhishu = res.data
                 })
            },
            get_band(){
                this.$axios({
                    url:'http://cy.gzziyu.com/mobile/ny_flow_goods.php?action=brand',
                    method:'post'
                })
                .then((res)=>{
                    console.log(res)
                    this.band_list = res.data
                })
            },
            // 指数列表
		    getzhishuList(){
              var that = this;
		      axios.post(that.GLOBAL.url+'pcindex.php?Action=chayezhishu&shuzi=0')
		      .then((res) =>{
		        console.log(res);
		        this.zhishu = res.data
		      })
		      .catch((err) =>{
		        console.log(err);
		      });
		    },
            go_detail(id){
                this.$router.push({path:'/shop_detail',query:{id:id}})
            }
		}
	}
</script>

<style lang="scss">
.router{
        font-size:14px;
        line-height:30px;
        color:#666666;
        margin: 15px 0 30px 0;
    }
.product_right{
	width:1200px;
	margin-bottom:50px;
    .tab_list{
        width: 100%;
        overflow: hidden;
        margin: 24px auto;
        text-align: center;
        ul{
            overflow: hidden;
            text-align: center;
            li{
                cursor: pointer;
                display: inline-block;
                width: 112px;
                height: 34px;
                margin-right: 3px;
                line-height: 34px;
                color: #4a4a4a;
                background: #f0f0f0;
                &.active{
                    background: #eb1e24;
                    color: #fff;
                }
            }
        }
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
.shaixuan{
            width: 100%;
            height: 40px;
            border:1px #e6e6e6 solid;
            background: #f2f2f2;
            margin-bottom:20px;
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
	 .table{
        width: 100%;
        border:1px #ececec solid;
        box-shadow:1px 1px 1px #ececec,1px -1px 1px #ececec,-1px 1px 1px #ececec,-1px -1px 1px#ececec;
        table{
            width: 100%;
            td{
                font-size: 14px;
            }
            thead{
                background: #f1f1f1;
                td{
                    box-sizing: border-box;
                    color: #000;
                }
                td:nth-child(1){
                    width: 235px;
                    line-height: 40px;
                    padding-left: 25px;
                }
                td:nth-child(2){
                    width: 125px;
                    text-align: center;
                }
                td:nth-child(3){
                    width: 170px;
                    text-align: center;
                }
                td:nth-child(4){
                    width: 120px;
                    text-align: center;
                }
                
                td:nth-child(5){
                    width: 145px;
                    text-align: center;
                }
                td:nth-child(6){
                    width: 275px;
                    text-align: center;
                }
                td:nth-child(7){
                    width: 130px;
                }
            }
            tbody{
                tr{
                    
                    height: 40px;
                    width: 100%;
                    cursor:pointer;
                    td{
                        color: #666666;
                    }
                    td.green{
                        color: #4ab36f;
                    }
                    td.red{
                        color: #ec1d25;
                    }
                    td:nth-child(1){
                        width: 235px;
                        line-height: 40px;
                        padding-left: 20px;
                        
                    }
                    td:nth-child(2){
                        width: 125px;
                        text-align: center;
                    }
                    td:nth-child(3){
                        width: 170px;
                        text-align: center;
                    }
                    td:nth-child(4){
                        width: 120px;
                        text-align: center;
                    }
                    
                    td:nth-child(5){
                        width: 145px;
                        text-align: center;
                    }
                    td:nth-child(6){
                        width: 275px;
                        text-align: center;
                    }
                    td:nth-child(7){
                        width: 130px;
                    }
                }
                tr:nth-child(2n){
                        background: #f8f8f8;
                    }
            }
        }
    }


     .zhishu-m{
        width: 100%;
        overflow: hidden;
        .zhishu_tab{
            width: 100%;
            overflow: hidden;
            ul{
                width: 100%;
                li{
                    float: left;
                    width: 25%;
                    background: #aaa9a9;
                    height: 0.55rem;
                    color: #fff;
                    text-align: center;
                    line-height: 0.55rem;
                    font-size: 0.24rem;
                    &.on{
                        background: #eb1e24;
                    }
                }
                
            }
        }
        .table-m{
            width: 100%;
            ul{
                width:100%;
                li{
                    width: 100%;
                    height: 0.58rem;
                    div{
                        float: left;
                        width: 22%;
                         color: #000000;
                         font-size: 0.22rem;
                         line-height: .58rem;
                         text-align: center;
                    }
                    .name{
                        width: 34%;
                        text-align: left;
                        padding-left: 0.2rem;
                        box-sizing: border-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    &:nth-child(1){
                        background: #f0f0f0;
                    }
                    .red{
                        color: #eb1e24;
                    }
                    .green{
                        color: #036595;
                    }
                }
            }
        }
    }
</style>