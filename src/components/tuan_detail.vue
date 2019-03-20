<template>
	<div id="content">
		<div class="router">
			<div class="container location page">
				<router-link to="/">首页</router-link>><router-link to="/tuan">品牌团队</router-link>><a href="javascript:void(0)">{{info.title}}</a>
			</div>
		</div>
		<div class="container page">
			<div class="detail">
			
				<div class="img">
					<img :src="'https://cy.gzziyu.com/'+info.file_url"/>
				</div>
				<div class="detail_info">
                    <p class="name">{{info.title}}</p>
                    <div class="top">
                        <p class="phone">手机号码：{{info.mobile}}</p>
                        <p class="phone">微信号：{{info.wechat}}</p>
                        <p class="phone">服务品牌：{{info.author_email}}</p>
                    </div>
                    <div class="contant">
						<h4 class="contant_title">经纪人简介：</h4>
						<div v-html="info.content"></div>
					</div>
                    <div class="prev_next">
                        <a v-if="next.pid" href="javascript:void(0)" @click="go_detail(next.pid)">上一个：{{next.ptitle}}</a>
                        <a v-if="next.nid" href="javascript:void(0)" @click="go_detail(next.nid)">下一个：{{next.ntitle}} </a>
                    </div>
					
				</div>
			</div>
		</div>
	
	</div>
</template>

<script>
	export default {
		name:'tuandui_detail',
		data(){
			return {
				info:{},
                next:{}
			}
		},
		created(){
            this.get_next(this.$route.query.id)
			this.get_tuan(this.$route.query.id)
		},
        watch: {
            $route(to) {
                console.log(to)
                this.get_tuan(this.$route.query.id)
            }
        },
		methods:{
            get_next(id){
                this.$axios({
                    method:'post',
                    url:"http://cy.gzziyu.com/mobile/pcindex.php?Action=pnext",
                    params:{
                        id:id
                    }

                })
                .then((res) =>{
                    console.log(res);
                    this.next = res.data
                })
                .catch((err) =>{
                  console.log(err);
                });
            },
            go_detail(id){
                console.log(123)
                this.get_tuan(id)
                this.get_next(id)
                
            },
			get_tuan(id){
				this.$axios({
					url:'https://cy.gzziyu.com/mobile/pcindex.php?Action=article',
					method:'post',
					params:{
						id:id
					}
				})
				.then((res)=>{
					console.log(res)
					this.info = res.data
				})
			}
		}
	}
</script>


<style lang="scss">
    .page{
        width: 1000px;
        margin: 0 auto;
    }
    .location{
        margin:20px auto;
    }
	.detail{
    width: 100%;
    min-height: 405px;
    margin: 0 0 65px 0;
    border-bottom: 1px #f2f2f2 solid;
    .img{
        float: left;
        width: 275px;
        height: 380px;
        box-shadow:1px 1px 1px #ececec,1px -1px 1px #ececec,-1px 1px 1px #ececec,-1px -1px 1px#ececec;
        img{
            width: 260px;
            height: 360px;
            margin: auto auto;
        }
    }
    .detail_info{
        float: left;
        width: 700px;
        margin-left: 22px;
        .top{
            height: 40px;
            p{
                float: left;
                margin-right: 20px;
            }
        }
        .name{
            color: #000000;
            font-size: 18px;
           font-weight: bold;
           line-height: 40px;
              
        }
        .contant{
            height: 204px;
            .contant_title{
                font-size: 18px;
               font-weight: bold;
               line-height: 40px;
            }
            p{
                color: #999999;
                line-height: 35px;
                font-size: 12px;
            }
        }
        .prev_next{
            margin-top: 66px;
           a{
               margin-right: 20px;
               color: #999999;
                line-height: 35px;
                font-size: 12px;
                
           }
        }
    }
}

@media only screen and (max-width:750px){
    #contant-m{
        padding-top: 0.87rem;
        padding-bottom: 0.98rem;
        width: 100%;
        .detail{
            width: 100%;
            margin: 0 0 0.65rem 0;
            border-bottom: 1px #f2f2f2 solid;
            height: auto !important;
            overflow: hidden;
            .img{
                
                width: 100%;
                height: auto;
                box-shadow:1px 1px 1px #ececec,1px -1px 1px #ececec,-1px 1px 1px #ececec,-1px -1px 1px#ececec;
                img{
                    width: 100%;
                    height: auto;
                    margin: auto auto;
                }
            }
            .detail_info{
                overflow: hidden;
                width: 100%;
                margin-left: 22px;
                .name{
                    color: #000000;
                    font-size: 0.18rem;
                   font-weight: bold;
                   line-height: 0.4rem;
                      
                }
                .phone{
                    font-size: 0.20rem;
                    
                }
                .contant{
                    height: 2.04rem;
                    margin-bottom: 0.5rem;
                    .contant_title{
                        font-size: 0.18rem;
                       font-weight: bold;
                       line-height: 0.4rem;
                    }
                    p{
                        color: #999999;
                        line-height: 0.35rem;
                        font-size: 0.18rem;
                    }
                }
                .prev_next{
                    margin-top: 0.66rem;
                   a{
                       margin-right: 0.2rem;
                       color: #999999;
                        line-height: 0.35rem;
                        font-size: 0.12rem;
                        
                   }
                }
            }
        }

    }



}    

</style>