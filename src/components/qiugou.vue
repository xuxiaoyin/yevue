<template>
	<div>
        <div id="content">
            <div class="router">
                <div class="container">
                    <router-link to="/">首页</router-link>><a href="javascript:void(0)">求购</a>
                </div>
            </div>
            <!--弹出层-->
            <div class="model" v-if="form_status">
                <div class="title">
                    发布求购
                </div>
                <form action="" method="post" >
                        
                    <div class="item">
                        <div class="label">产品名称：</div>
                        <div class="input">
                            <input type="text" v-model="productname" placeholder="请输入产品名称（必填）" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">价格：</div>
                        <div class="input">
                            <input type="text" v-model="price" placeholder="请输入价格" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">茶叶年份：</div>
                        <div class="input">
                            <input type="text" v-model="years" placeholder="请输入年份（必填）" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">茶叶品相：</div>
                        <div class="input">
                            <input type="text" v-model="pinxiang" placeholder="请输入茶叶品相" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">仓储情况：</div>
                        <div class="input">
                            <input type="text" v-model="cangchu" placeholder="请输入仓储情况（必填）" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">货品所在地：</div>
                        <div class="input">
                            <input type="text" v-model="address" placeholder="请输入货品所在地（必填）" />
                        </div>
                    </div>
                    <!-- <div class="item">
                        <div class="label">茶叶年份：</div>
                        <div class="input">
                            <input type="text" v-model="name" placeholder="请输入（必填）" />
                        </div>
                    </div> -->
                    <div class="item">
                        <div class="label">姓名：</div>
                        <div class="input">
                            <input type="text" v-model="name" placeholder="请输入姓名（必填）" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">手机：</div>
                        <div class="input">
                            <input type="text" v-model="mobile" placeholder="请输入手机号码（必填）" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">微信：</div>
                        <div class="input">
                            <input type="text" v-model="weixin" placeholder="请输入微信号（必填）" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">QQ：</div>
                        <div class="input">
                            <input type="text" v-model="qq" placeholder="请输入qq号码" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">出售说明：</div>
                        <div class="textarea_div">
                                <textarea type="text" v-model="chushou" placeholder="请输入联系地址" ></textarea>
                                    
                            </div>
                    </div>
                    <div class="item">
                        <div class="label">专家：</div>
                        <div class="select_div">
                            <select v-model="zuanjia">
                                <option :value="item.id" v-for="(item,index) in tuan">{{item.title}}</option>
                            </select>
                        </div>
                    </div>
                    <button v-if="types == 0" type="button" @click="submit_qiugou(0)" >提交出货信息</button>
                    <button  v-if="types == 1"  type="button" @click="submit_qiugou(1)" >提交入货信息</button>
                </form>
            </div>
            <div class="zhe" @click="hide" v-if="form_status"></div>
            <div class="container">
                <div class="btn">
                    <ul>
                        <li><a href="javascript:void(0)" @click="show_form(0)">免费发布出货信息</a></li>
                        <li><a href="javascript:void(0)"  @click="show_form(1)">免费发布求购信息</a></li>
                        <li><a target="new_window" :href="'http://wpa.qq.com/msgrd?v=3&uin='+kefuqq+'&site=qq&menu=yes'">免费评估</a></li>
                    </ul>
                </div>
                <div class="img">
                    <img src="static/img/qiugou_detail.png"/>
                </div>
                <div class="chat">
                    
                    <div class="cat_list">
                        <ul>
                            <li :class='tab_index==0?"active":""' @click="change_tab(0)">出售信息</li>
                            <li :class='tab_index==1?"active":""' @click="change_tab(1)">求购信息</li>
                        </ul>
                    </div>
                    
                    
                    <div class="table1">
                        <ul>
                            <li>产品名称</li>
                            <li>年份</li>
                            <li>仓储</li>
                            <li>货品所在地</li>
                            <li>价格</li>
                            <li>发布时间</li>
                        </ul>
                        <ul  v-for="(item,index) in list">
                            <li>{{item.productname}}</li>
                            <li>{{item.years}}</li>
                            <li>{{item.cangchu}}</li>
                            <li>{{item.address}}</li>
                            <li>{{item.price}}</li>
                            <li>{{item.addtime}}</li>               
                        </ul>
                    </div>
                    
                    <div class="page">
                        <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page="parseInt(data_info.current_page)"
                          :page-sizes="[10, 20, 30, 40]"
                          :page-size="parseInt(data_info.page_limit)"
                          :page-count="parseInt(data_info.page_total)"
                          layout="total, prev, pager, next, jumper"
                          :total="parseInt(data_info.count)">
                        </el-pagination> 
                    </div>
                </div>
                
        
            </div>
        </div>
        <div id="contant-m">
            
            <div class="container-m" v-if="!form_status">
                <div class="btn">
                    <ul>
                        <li><a href="javascript:void(0)" @click="show_form(0)">免费发布出货信息</a></li>
                        <li><a href="javascript:void(0)"  @click="show_form(1)">免费发布求购信息</a></li>
                        <li><a target="new_window" :href="'http://wpa.qq.com/msgrd?v=3&uin='+kefuqq+'&site=qq&menu=yes'">免费评估</a></li>
                    </ul>
                </div>
                <div class="img">
                    <img src="static/img/qiugou_detail.png"/>
                </div>
                <div class="chat">
                    
                    <div class="cat_list">
                        <ul>
                            <li :class='tab_index==0?"active":""' @click="change_tab(0)">出售信息</li>
                            <li :class='tab_index==1?"active":""' @click="change_tab(1)">求购信息</li>
                        </ul>
                    </div>
                    
                    
                    <div class="table1">
                        <ul>
                             <li>产品名称</li>
                            <li>年份</li>
                            <li>仓储</li>
                            <li style="width: 20%;">货品所在地</li>
                            <li>价格</li>
                            <li>发布时间</li>
                        </ul>
                         <ul  v-for="(item,index) in list">
                            <li>{{item.productname}}</li>
                            <li>{{item.years}}</li>
                            <li>{{item.cangchu}}</li>
                            <li  style="width: 20%;">{{item.address}}</li>
                            <li>{{item.price}}</li>
                            <li>{{item.addtime}}</li>               
                        </ul>
                    </div>
                    
                    <div class="page-m">
                        <ul>
                           <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page="parseInt(data_info.current_page)"
                          :page-sizes="[10, 20, 30, 40]"
                          :page-size="parseInt(data_info.page_limit)"
                          :page-count="parseInt(data_info.page_total)"
                          layout="total, prev, pager, next, jumper"
                          :total="parseInt(data_info.count)">
                        </el-pagination> 
                        </ul>
                    </div>
                </div>
                
            

            </div>

            <div class="container-m"  v-if="form_status">
                <form action="" method="post" >
                        
                    <div class="item">
                        <div class="label">产品名称：</div>
                        <div class="input">
                            <input type="text" v-model="productname" placeholder="请输入产品名称（必填）" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">价格：</div>
                        <div class="input">
                            <input type="text" v-model="price" placeholder="请输入价格" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">茶叶年份：</div>
                        <div class="input">
                            <input type="text" v-model="years" placeholder="请输入年份（必填）" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">茶叶品相：</div>
                        <div class="input">
                            <input type="text" v-model="pinxiang" placeholder="请输入茶叶品相" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">仓储情况：</div>
                        <div class="input">
                            <input type="text" v-model="cangchu" placeholder="请输入仓储情况（必填）" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">货品所在地：</div>
                        <div class="input">
                            <input type="text" v-model="address" placeholder="请输入货品所在地（必填）" />
                        </div>
                    </div>
                    <!-- <div class="item">
                        <div class="label">茶叶年份：</div>
                        <div class="input">
                            <input type="text" v-model="name" placeholder="请输入（必填）" />
                        </div>
                    </div> -->
                    <div class="item">
                        <div class="label">姓名：</div>
                        <div class="input">
                            <input type="text" v-model="name" placeholder="请输入姓名（必填）" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">手机：</div>
                        <div class="input">
                            <input type="text" v-model="mobile" placeholder="请输入手机号码（必填）" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">微信：</div>
                        <div class="input">
                            <input type="text" v-model="weixin" placeholder="请输入微信号（必填）" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">QQ：</div>
                        <div class="input">
                            <input type="text" v-model="qq" placeholder="请输入qq号码" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">出售说明：</div>
                        <div class="textarea_div">
                                <textarea type="text" v-model="chushou" placeholder="请输入联系地址" ></textarea>
                                    
                            </div>
                    </div>
                    <div class="item">
                        <div class="label">专家：</div>
                        <div class="select_div">
                            <select v-model="zuanjia">
                                <option :value="item.id" v-for="(item,index) in tuan">{{item.title}}</option>
                            </select>
                        </div>
                    </div>
                    <button v-if="types == 0" type="button" @click="submit_qiugou(0)" >提交出货信息</button>
                    <button  v-if="types == 1"  type="button" @click="submit_qiugou(1)" >提交入货信息</button>
                </form>
            </div>
        </div>

    </div>
</template>
<script >
    export default {
        name:'qiugou',
        data(){
            return {
                tuan:[],
                list:[],
                types:0,
                tab_index:0,
                productname:'',
                price:'',
                years:'',
                pinxiang:'',
                cangchu:'',
                address:'',
                name:'',
                mobile:'',
                weixin:'',
                qq:'',
                chushou:'',
                zuanjia:'',
                form_status:false,
                data_info:{},
                kefuqq:''
            }
        },
        created(){
            this.get_info()
            this.get_qiugou(0)
            this.get_tuan(26)
        },
        methods:{
            get_info(){
              let that = this;
              this.$axios({
                url:'http://cy.gzziyu.com/mobile/pcindex.php?Action=siteweb',
                method:'post'
              })
              .then((res)=>{
                console.log(res)
                res.data.map(function (item) {
                  
                  if(item.code == "qq"){
                    that.kefuqq = item.value
                  }
                  
                })
               
              })
            },
             handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
             handleCurrentChange(val) {
                var that = this;
                console.log(`当前页: ${val}`);
                this.get_qiugou(this.types)
                
                
            },
            change_tab(index){
                this.tab_index = index
                this.types = index
                this.get_qiugou(this.types)
            },
            show_form(index){
                this.types = index
                this.form_status = true
            },
            get_tuan(id){
                this.$axios({
                    url:'http://cy.gzziyu.com/mobile/pcindex.php?Action=article_cat',
                    method:'post',
                    params:{
                        id:id
                    }
                })
                .then((res)=>{
                    console.log(res)
                    this.tuan = res.data
                })
            },
            hide(){
                this.form_status = false
            },
            get_qiugou(id){
                this.$axios({
                    url:'https://cy.gzziyu.com/mobile/purchase.php?Action=qiugoulist',
                    method:'post',
                    params:{
                        types:id,
                        page:1
                    }
                })
                .then((res)=>{
                    console.log(res)
                    this.list = res.data
                })
                .catch((err)=>{
                    console.log(err)
                })
                this.$axios({
                    url:'https://cy.gzziyu.com/mobile/purchase.php?Action=qiugouyema',
                    method:'post',
                    params:{
                        types:id,
                        page:1
                    }
                })
                .then((res)=>{
                    console.log(res)
                    this.data_info = res.data
                })
                .catch((err)=>{
                    console.log(err)
                })
            },
            submit_qiugou(type){
                var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
                console.log(this)
                if(this.price == ""){
                    alert('请输入价格')
                     return false
                }
                if(this.productname == ""){
                    alert('请输入价格')
                     return false
                }
                if(this.years == ""){
                    alert('请输入年份')
                     return false
                }
                if(this.cangchu == ""){
                    alert('请输入仓储情况')
                     return false
                }
                if(this.address == ""){
                    alert('请输入货品所在地')
                     return false
                }
                 if(this.name == ""){
                    alert('请输入商品名称')
                     return false
                }
                 if(this.mobile == ""){
                    alert('请输入手机号码')
                     return false
                }
                 if(this.weixin == ""){
                    alert('请输入微信')
                     return false
                }
                  if(this.qq == ""){
                    alert('请输入qq')
                     return false
                }
                  if(this.chushou == ""){
                    alert('请填写出售信息')
                     return false
                }
                  if(this.zuanjia == ""){
                    alert('请选择专家')
                    return false
                }
                this.$axios({
                    url:"https://cy.gzziyu.com/mobile/purchase.php?Action=baocunqiugou",
                    method:'post',
                    params:{
                        types:type,
                        openid:userInfo.openid,
                        productname:this.productname,
                        price:this.price,
                        years:this.years,
                        pinxiang:this.pinxiang,
                        cangchu:this.cangchu,
                        address:this.address,
                        name:this.name,
                        mobile:this.mobile,
                        weixin:this.weixin,
                        qq:this.qq,
                        chushou:this.chushou,
                        zuanjia:this.zuanjia
                    }
                })
                .then((res)=>{
                    console.log(res)
                    alert('提交成功')
                    this.form_status = false
                })
            }
        }
    }
</script>
<style lang="scss" >
#content {
    background: #fff;
}
	.btn{
    width: 100%;
    padding-bottom: 33px;
    border-bottom:1px #ececec solid;
    ul{
        width: 100%;
        text-align: center;
        li{
            a{
                color: #ee0a0d;
            }
            width: 180px;
            height: 40px;
            border-radius: 5px;
            color: #ee0a0d;
            font-size: 14px;
            border:1px #ee0a0d solid;
            display: inline-block; 
            margin-right: 40px;
            line-height: 40px;
            
        }
    }
}
.img{
    width: 100%;
    img{
        width: 100%;
    }
}
.chat{
    clear: both;
    width: 100%;
    overflow: hidden;
    margin-bottom: 30px;
   
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


.zhe{
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,0.5);
    left: 0;
    top: 0;
}
.model{
    width: 600px;
    height:700px;

    position: fixed;
    background: #fff;
    left: 50%;
    top: 50%;
    margin: -350px 0 0 -300px;
    overflow: auto;
    z-index: 10;
     .title{
        background: #F2F2F2;
        height: 40px;
        width: 100%;
        border-bottom: 1px #e0e0e0 solid;
        color: #000000;
        font-size: 18px;
        font-weight: bold;
        line-height: 40px;
        text-align: center;
        box-sizing: border-box;
    }
    form{
        width: 100%;
        margin-top: 30px;
            .item{
                width: 100%;
                overflow: hidden;
                margin-bottom: 15px;
                .label{
                    width: 20%;
                    float: left;
                    text-align: right;
                    color: #616161;
                    line-height: 40px;
                    margin-right: 5%;
                    font-size: 14px;
                }
                .input{
                    float: left;
                    width: 75%;
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
                    width: 75%;
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
                    width: 320px;
                    height: 39px;
                    line-height: 40px;
                     border-radius: 5px;
                     select{
                        float:left;
                         width: 257px;
                         height: 100%;
                         border:1px #cbcaca solid;
                         border-radius: 5px;
                         box-sizing: border-box;
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
    #contant-m{
        display:block;
        padding-top: 0.87rem;
        padding-bottom: 0.98rem;
        width: 100%;

        .btn{
            width: 100%;
            padding-bottom: 0.33rem;
            border-bottom:1px #ececec solid;
            ul{
                width: 100%;
                text-align: center;
                font-size: 0;
                li{
                    a{
                        color: #ee0a0d;
                    }
                    width: 1.8rem;
                    height: 0.4rem;
                    border-radius: 0.05rem;
                    color: #ee0a0d;
                    font-size: 0.14rem;
                    border:1px #ee0a0d solid;
                    display: inline-block; 
                    margin-right: 0.4rem;
                    line-height: 0.4rem;
                    
                }
            }
        }
        .img{
            width: 100%;
            img{
                width: 100%;
            }
        }
        .chat{
            clear: both;
            width: 100%;
            overflow: hidden;
            margin-bottom: 0.3rem;
           
            .cat_list{
                width: 100%;
                ul{
                    width: 100%;
                    text-align:center;
                    margin: 0.25rem 0;
                    font-size: 0;
                    li{
                        display: inline-block;
                        width: 1.22rem;
                        height: 0.35rem;
                        text-align: center;
                        line-height: 0.35rem;
                        background: #f0f0f0;
                        color: #4a4a4a;
                        margin-right: 0.03rem;
                        font-size: 0.14rem;
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
                    font-size: 0.18rem;
                }
                span{
                    font-size: 0.12rem;
                    color: #aaa9a9;
                    display: block;
                    
                    text-align: center;
                }
            }
           
           
            .table1{
                width: 100%;
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
                        font-size: 0.16rem;
                        height:0.4rem;
                        text-align:  center;
                        line-height:0.4rem; 
                        color:#666666; 
                        box-sizing: border-box;
                         &:last-child{
                            border-right: none;
                        }
                        
                    }
                }
            }
              .page-m{
                width:100%;
               margin:0.8rem 0 0.3rem 0;
                // ul{
                //     width:100%;
                //     text-align:center;
                //     font-size: 0;
                //     li{
                //         width:0.48rem;
                //         height:0.48rem;
                //         border:1px solid #c7c7c7;
                //         border-radius:0.05rem;
                //         line-height:0.48rem;
                //         text-align:center;
                //         display:inline-block;
                //         font-size:0.24rem;
                //         color:#c7c7c7;
                //         margin-right:0.15rem;
                //         &.on{
                //             color:#fff;
                //             background:#eb1e24;
                //              border:1px solid #eb1e24;
                //         }
                //         &:nth-child(1), &:last-child{
                //             width:0.75rem;

                //         }
                //     }
                // }
        }
            
         }
         
       
         form{
                width: 6.8rem;
                margin: 0 auto;
                margin-top: 0.3rem;
                    .item{
                        width: 100%;
                        overflow: hidden;
                        margin-bottom: 0.21rem;
                        .label{
                            width: 100px;
                            float: left;
                            text-align: right;
                            color: #616161;
                            line-height: 0.4rem;
                            margin-right: 0.2rem;
                            font-size: 0.14rem;
                        }
                        .input{
                            float: left;
                            width: 4.2rem;
                            box-sizing: border-box;
                            border:1px #cbcaca solid;
                            height: 0.4rem;
                            line-height: 0.4rem;
                             border-radius: 0.05rem;
                            input{
                                width: 100%;
                                height: 100%;
                                float: left;
                                border: none;
                                background: none;
                                padding: 0 0.1rem;
                                line-height: 0.4rem;
                                
                            }
                            
                        }
                        .textarea_div{
                            float: left;
                            width: 4.2rem;
                            box-sizing: border-box;
                            border:1px #cbcaca solid;
                            height: 1.3rem;
                            line-height: 0.4rem;
                             border-radius: 0.05rem;
                             textarea{
                                 border:none;
                                width: 100%;
                                padding: 0.05rem 0.1rem;
                                resize: none;
                                height: 100%;
                                box-sizing: border-box;
                            }
                        }
                        .select_div{
                             float: left;
                            width: 4.2rem;
                            height: 0.39rem;
                            line-height: 0.4rem;
                             border-radius: 0.05rem;
                             select{
                                float:left;
                                 width: 2.57rem;
                                 height: 100%;
                                 border:1px #cbcaca solid;
                                 border-radius: 0.05rem;
                                 box-sizing: border-box;
                             }
                        }
                        .input_code{
                            float: left;
                            width: 3.97rem;
                            box-sizing: border-box;
                            border:1px #cbcaca solid;
                            height: 0.4rem;
                            line-height: 0.4rem;
                            border-radius: 0.05rem;
                            input{
                                width: 100%;
                                height: 100%;
                                float: left;
                                border: none;
                                background: none;
                                padding: 0 0.1rem;
                                line-height: 0.4rem;
                                
                            }
                            
                        }
                        .get_phone{
                            width: 1rem;
                            height: 0.4rem;
                            float: left;
                            background: #ee0a0d;
                            color: #fff;
                            text-align: center;
                            line-height: 0.4rem;
                            margin-left: 0.25rem;
                            border-radius:0.05rem ;
                            font-size: 0.16rem;
                            
                        }
                        .btn{
                            float: left;
                            width: 1.1rem;
                            height: 0.4rem;
                            background: #ee0a0d;
                            color: #fff;
                            border:none;
                            float: left;
                            margin: 0;
                            margin-left:0.1rem ;
                            font-size: 0.14rem;
                        }
                    }
                    button{
                        padding:0 0.2rem;
                        height: 0.4rem;
                        background: #ee0a0d;
                        border: none;
                        color: #fff;
                        font-size: 0.16rem;
                        border-radius: 0.05rem;
                        display: block;
                        margin: 0.6rem auto 2.9rem;
                        cursor: pointer;
                        
                    }
                }
                .tip{
                    text-align: center;
                    color: #999999;
                    font-size: 0.12rem;
                }

    }


}

</style>