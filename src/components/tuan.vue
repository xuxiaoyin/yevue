<template>
	<div id="content">
		<div class="router">
			<div class="container">
				<router-link to="/">首页</router-link>><a href="javascript:void(0)">品牌团队</a>
			</div>
		</div>
		<div class="container">
			<div class="tuan_list">
					<ul>
						<li v-for="(item,index) in list" @click="go_tuan_detail(item.id)">
							<a href="javascript:void(0);">
								<img :src="item.file_url"/>
								<div class="name">{{item.title}}</div>
								<div class="phone">手机号码：{{item.mobile}}</div>
								<div class="phone">微信号：{{item.wechat}}</div>
								<div class="phone">
									服务品牌：{{item.author}}
								</div>
							</a>
						</li>
						
					</ul>
					
				</div>
			
	
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
</template>
<script>
	export default {
		name:'tuandui',
		data(){
			return {
				list:[]
			}
		},
		created(){
			this.get_tuan(26)
		},
		methods:{
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
					this.list = res.data
				})
			},
			go_tuan_detail(id){
				this.$router.push({name:'tuan_detail',query:{id:id}})
			}
		}
	}
</script>

<style lang="scss" scoped>
.router{
        font-size:14px;
        line-height:30px;
        color:#666666;
        margin: 15px 0 30px 0;
    }
	.tuan_list{
        overflow: hidden;
        margin-top: 25px;
        width: 100%;
        ul{
            width: 110%;
            overflow: hidden;
            li{
                border:1px #ececec solid;
                box-shadow:1px 1px 1px #ececec,1px -1px 1px #ececec,-1px 1px 1px #ececec,-1px -1px 1px#ececec;
                float: left;
                width: 220px;
                height: 420px;
                margin-right: 22px;
                margin-bottom: 25px;
                img{
                    display: block;
                    width: 200px;
                    height: 290px;
                    margin: 10px auto;
                }
                .name{
                    padding-left: 10px;
                    line-height: 40px;
                    font-size: 16px;
                    color: #000000;
                    font-weight: bold;
                }
                .phone{
                    padding-left: 10px;
                    line-height: 20px;
                    font-size: 12px;
                    color: #676767;
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


@media only screen and (max-width:750px){
    #contant-m{
        padding-top: 0.87rem;
        padding-bottom: 0.98rem;
        width: 100%;
        .tuan_list{
            overflow: hidden;
            margin-top: 0.25rem;
            width: 100%;
            ul{
                width: 110%;
                overflow: hidden;
                li{
                    border:1px #ececec solid;
                    box-shadow:1px 1px 1px #ececec,1px -1px 1px #ececec,-1px 1px 1px #ececec,-1px -1px 1px#ececec;
                    float: left;
                    width: 3.25rem;
                    height: 5.6rem;
                    margin-right: 0.22rem;
                    margin-bottom: 0.25rem;
                    img{
                        display: block;
                        width: 3rem;
                        height: 4rem;
                        margin: 0.1rem auto;
                    }
                    .name{
                        padding-left: 0.1rem;
                        line-height: 0.4rem;
                        font-size: 0.16rem;
                        color: #000000;
                        font-weight: bold;
                    }
                    .phone{
                        padding-left: 0.1rem;
                        line-height: 0.2rem;
                        font-size: 0.12rem;
                        color: #676767;
                    }
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