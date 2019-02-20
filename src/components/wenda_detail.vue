<template>
	<div>
		<div id="content">
			<div class="router">
				<div class="container">
					<router-link to="/">首页</router-link>><a href="javascript:void(0)">问答详情</a>
				</div>
			</div>
			<div class="container">
				<div class="chat">
					<div class="chat_title">
						会员提问
					</div>
					<div class="user"><img :src="info.headimgurl" alt="">{{info.user_name}}</div>
					<div class="name"> {{info.msg_title}}</div>
					<p class="time">发布时间：{{info.msg_time}}</p>
					<div class="p" v-html="info.msg_content">
						
					</div>
                    <img :src="info.message_img">
				</div>
				
			</div>
		
		</div>

		<div id="content-m">
			<div class="container-m">
				<div class="chat">
					<div class="chat_title">
						会员提问
					</div>
					<div class="user"><img :src="info.headimgurl" alt="">{{info.user_name}}</div>
					<div class="name"> {{info.msg_title}}</div>
					<p class="time">发布时间：{{info.msg_time}}</p>
					<div class="p" v-html="info.msg_content">
						
					</div>

				</div>
				
			</div>
		</div>
	</div>

</template>


<script>
	export default {
		name:'wenda_detail',
		data(){
			return {
				info:{}
			}
		},
		created(){
			this.get_tuan(this.$route.query.id)
		},
        watch: {
            $route(to) {
                console.log(this.$route.query)
                this.get_tuan(this.$route.query.id)
                document.body.scrollTop = '0';
            }
        },
		methods:{
			get_tuan(id){
                console.log(id)
				this.$axios({
					url:'https://cy.gzziyu.com/mobile/ziyu.php?Action=wentidetail',
					method:'post',
					params:{
						msg_id:id
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
	.chat{
    clear: both;
    width: 100%;
    overflow: hidden;
    border:1px #e0e0e0 solid;
    margin-bottom: 30px;
    .chat_title{
        background: #F2F2F2;
        height: 40px;
        width: 100%;
        border-bottom: 1px #e0e0e0 solid;
        color: #000000;
        font-size: 18px;
        font-weight: bold;
        line-height: 40px;
        padding-left: 15px;
        box-sizing: border-box;
        span{
            font-weight: normal;
        }

        .tip{
            text-align: center;
            color: #999999;
            font-size: 12px;
        }
    }
    .p{
        font-size: 14px;
        color: #808080;
        padding: 15px;
        line-height: 26px;
    }
    .time{
        color: #808080;
        padding: 10px 15px;
        font-size: 12px;

    }
    .user{
        font-size: 14px;
        color: #000;
        line-height: 40px;
        padding: 0 15px;
        img{
            margin: 3px 5px;
            width:35px;
            height: 35px;
            float: left;
            border-radius: 50%;

        }
    }
    .name{
        font-size: 16px;
        color: #000;
        line-height: 30px;
        margin: 6px 0;
        padding: 0 15px;
    }
    .img{
        padding: 0 15px;
        margin-bottom: 10px;
    }
}

@media only screen and (max-width:750px){
    #content-m{
        padding-top: 0.87rem;
        padding-bottom: 0.98rem;
        width: 100%;
        .chat{
            clear: both;
            width: 100%;
            overflow: hidden;
            border:1px #e0e0e0 solid;
            margin-bottom: 0.3rem;
            .chat_title{
                background: #F2F2F2;
                height: 0.4rem;
                width: 100%;
                border-bottom: 1px #e0e0e0 solid;
                color: #000000;
                font-size: 0.18rem;
                font-weight: bold;
                line-height: 0.4rem;
                padding-left: 0.15rem;
                box-sizing: border-box;
                span{
                    font-weight: normal;
                }

                .tip{
                    text-align: center;
                    color: #999999;
                    font-size: 0.12rem;
                }
            }
            .p{
                font-size: 0.4rem;
                color: #808080;
                padding: 15px;
                line-height: 0.26rem;
                font-size:0.2rem;
            }
            .time{
                color: #808080;
                padding: 0.1rem 0.15rem;
                font-size: 0.12rem;

            }
            .user{
                font-size: 0.14rem;
                color: #000;
                line-height: 0.4rem;
                padding: 0 0.15rem;
                img{
                    margin: 0.03rem 0.05rem;
                    width:0.35rem;
                    height: 0.35rem;
                    float: left;
                    border-radius: 50%;

                }
            }
            .name{
                font-size: 0.16rem;
                color: #000;
                line-height: 0.3rem;
                margin: 0.06rem 0;
                padding: 0 0.15rem;
            }
            .img{
                padding: 0 0.15rem;
                margin-bottom: 0.1rem;
            }
        }
    }
}
</style>