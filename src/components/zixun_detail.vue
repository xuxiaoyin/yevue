<template>
	<div id="content">
		<div class="router">
			<div class="container localtion">
				<router-link to="/">首页</router-link>><router-link to="/zixun">资讯频道</router-link>><a href="javascript:void(0)">{{info.title}}</a>			</div>
		</div>
		<div class="detail">
			<div class="container container1">
				<div class="title">{{info.title}}</div>
				<div class="beizhu"><span>来源：{{info.author}}</span><span>作者：{{info.author}}</span><span>阅读：{{info.is_open}}</span><span>发布时间：{{info.add_time}}</span>
					<!-- <span><img src="static/img/fenxiang.png"/>分享到</span> -->

				</div>
				<div v-html="info.content"></div>
				
			</div>
		</div>
		<div class="page">
			<div class="container">
				<div class="prev" v-if="next.pid">
					<a href="javascript:void(0)" @click="go_detail(next.pid)">上一篇：{{next.ptitle}}</a>
				</div>
				<div class="prev" v-if="next.nid">
					<a href="javascript:void(0)" @click="go_detail(next.nid)">下一篇：{{next.ntitle}}</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script >
	
	export default{
		name:'zixun_detail',
		data(){
			return {
				info:{},
				next:{}
			}
		},
		mounted(){
			this.get_next(this.$route.query.id)
			this.get_detail(this.$route.query.id)
		},
         watch: {
            $route(to) {
                console.log(to)
                this.get_detail(this.$route.query.id)
            }
        },
		methods:{
			get_detail(id){
				console.log(this.$route.params.id)
				this.$axios({
			      	method:'post',
			      	url:"https://cy.gzziyu.com/mobile/pcindex.php?Action=article",
			      	params:{
			      		id:id
			      	}

			     })
			    .then((res) =>{
			        console.log(res);
			    	this.info = res.data
			    })
			    .catch((err) =>{
			        console.log(err);
                });
				
			},
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
				this.get_detail(id)
				this.get_next(id)
				
			}
		}
	}
</script>
<style lang="scss">
	.localtion{
        width: 1000px;
        margin: 20px auto;
    }
	.detail{
    width: 100%;
    border-bottom: 1px #d6d6d6 solid;
        .container1{
            width: 1000px;
            line-height: 1.5;
        }
            img{
                max-width: 100%;
            }
    .title{
        font-size: 30px;
        font-weight: bold;
        text-align: center;
        color: #333333;
    }
    .beizhu{
        font-size: 12px;
        color: #666666;
        text-align: center;
        margin-bottom: 45px;
        margin-top: 24px;
        span{
            margin-right: 35px;
        }
    }
    .img{
        width: 732px;
        height: 540px;
        margin: 0 auto;
        img{
            width: 100%;
        }
    }
    .about_text{
        width: 100%;
        margin: 50px 0;
        p{
            font-size: 16px;
            color: #666666;
            line-height: 40px;
            margin-bottom: 30px;
        }
    }
}
.page{
    width: 100%;
    .prev,.next{
        a{
            color: #999999;
            font-size: 14px;
            line-height: 35px;
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
            border-bottom: 1px #d6d6d6 solid;
            .title{
                font-size: 0.3rem;
                font-weight: bold;
                text-align: left;
                color: #333333;
            }
            .beizhu{
                font-size: 0.12rem;
                color: #666666;
                text-align: center;
                margin-bottom: 0.45rem;
                margin-top: 0.24rem;
                span{
                    margin-right: 0.35rem;
                }
            }
            .img{
                width: 100%;
                height: 5.45rem;
                margin: 0 auto;
                img{
                    width: 100%;
                }
            }
            .about_text{
                width: 100%;
                margin: 0.5rem 0;
                p{
                    font-size: 0.16rem;
                    color: #666666;
                    line-height: 0.4rem;
                    margin-bottom: 0.3rem;
                }
            }
        }
    }
}

</style>