<template>
	<div style="overflow: hidden;">
        <div id="content">
            <div class="router">
                <div class="container">
                    <router-link to="/">首页</router-link>><a href="javascript:void(0)">资讯频道</a>
                </div>
            </div>
            <div class="container">
                <div class="zixun_list">
                        <ul>
                            <li v-for="(item,inde) in zixun_list">
                                <a href="javascript:void(0);">
                                    <img :src="item.file_url"/>
                                </a>
                                    <div class="title">{{item.title}}</div>
                                    <div class="detext">{{item.short_title}}</div>
                                    <div class="time">
                                        {{item.add_time}} 
                                        <a href="javascript:void(0)" @click="go_detail(item.id)">查看详情>></a>
                                    </div>
                            </li>
                            

                        </ul>
                    </div>
                    <!--分页-->
                    <!--分页-->
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
        <div id="contant-m">
            <div class="container-m">
                <div class="zixun_list-m">
                    <ul>
                       
                        <li v-for="(item,index) in zixun_list"  @click="go_detail(item.id)">
                            <div class="img">  <img :src="item.file_url"/></div>
                            <div class="zixun_title">{{item.title}}</div>
                            <div class="time">{{item.add_time}} </div>
                        </li>
                      
                    </ul>
                </div>


                <div class="page-m">
                    <!-- <ul>
                        <li><</li>
                        <li class="on">1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>></li>
                    </ul> -->
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
</template>
<script>
	export default {
		name:'zixun',
		data(){
			return {
				zixun_list:[],
                data_info:{},
                id:12
			}
        },
		created(){
            this.get_list(1,this.id)
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
			get_list(page,id){
				var that = this;
			      this.$axios({
			      	method:'post',
			      	url:"http://cy.gzziyu.com/mobile/pcindex.php?Action=article_cat",
			      	params:{
			      		id:id,
                        page:page
			      	}

			      })
			      .then((res) =>{
			        console.log("咨询频道")
                    console.log(res);
			    	this.zixun_list = res.data
			      })
			      .catch((err) =>{
			        console.log(err);
                   });
                this.$axios({
                    method:'post',
                    url:"http://cy.gzziyu.com/mobile/ziyu.php?id=&Action=xwyemian",
                    params:{
                        id:id,
                        page:page
                    }

                  })
                  .then((res) =>{
                    console.log("咨询频道fenye")
                    console.log(res);
                    this.data_info = res.data
                  })
                  .catch((err) =>{
                    console.log(err);
                   });
                
			},
			go_detail(id){
				this.$router.push({ name: 'zixun_detail', query: {id:id }})
			}
		},
		watch: {
          $route(to){
            if(this.$route.query.id){
                this.id=this.$route.query.id
             }else{
             	this.id=12
             }
           this.get_list(1,this.id)
          }
        },
	}
</script>

<style lang="scss">

#content{
    overflow: hidden;
    .router{
        font-size:14px;
        line-height:30px;
        color:#666666;
        margin: 15px 0 30px 0;
    }
    
}
	.zixun_list{
    width: 100%;
    margin-bottom: 50px;
    ul{
        width: 100%;
        overflow: hidden;
        li{
            width: 592px;
            height: 150px;
            background: #f5f5f5;
            float: left;
            margin: 0 16px 18px 0;
            a{
                float: left;
                margin: 11px;
                width: 216px;
                height:128px;
                background: #fff;
                text-align: center;
                vertical-align: middle;
            }
            img{
                max-width: 216px; 
                min-height: 128px;    
            }
            .title{
                font-size: 16px;
                color: #333333;
                width: 354px;
                font-weight: bold;
                line-height: 50px;
                float: left;
            }
            .detext{
                width: 354px;
                float: left;
                height: 60px;
                line-height: 30px;
                color: #999999;
                font-size: 12px;
                border-bottom: 1px #cfcfcf solid;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .time{
                 width: 354px;
                float: left;
                font-size: 12px;
                color: #999999;
                line-height: 40px;
                a{
                    color: #ee0a0d;
                    float: right;
                    margin-right: 5px;
                }
            }
        }
        li:nth-child(2n){
            margin-right: 0;
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



@media only screen and (max-width:750px){
    #contant-m{
        padding-top: 0.87rem;
        padding-bottom: 0.98rem;
        width: 100%;
        .zixun_list-m{
            width:100%;
            ul{
                width:100%;
                li{
                    width:100%;
                    border-bottom:#fcdbdc solid 1px;
                    overflow:hidden;
                    .img{
                        float:left;
                        width:2.15rem;
                        height:1.3rem;
                        float:left;
                        margin:.3rem .15rem 0.15rem 0;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    .zixun_title{
                        font-size:0.26rem;
                        color:#3b3b3b;
                        line-height:.38rem;
                        float:left;
                        width:4.6rem;
                         margin:.3rem 0 0.15rem 0;
                    }
                    .time{
                        font-size:.22rem;
                        color:#a9a9a9;
                        float:left;
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
}
</style>