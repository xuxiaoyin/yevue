<template>
	<div>
			<div id="content">
			
			
			<div class="router">
				<div class="container page">
					<!-- <a href="/">首页</a>><a href="about_me">关于我们</a> -->
					<router-link to="/">首页</router-link>><a href="javascript:void(0)">关于我们</a>
					<div class="about_text" v-html="text">
						
					</div>
				</div>
				
			</div>
			
		
		</div>

		<div id="contant-m">
			<div class="container-m">
				<div class="title">品牌普洱简介</div>
				<div class="p" v-html="text">
					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:"about_me",
		data(){
			return {
				text:''
			}
		},
		created(){
			this.get_about_me()
		},
		methods:{
			get_about_me(){
				this.$axios({
					url:"https://cy.gzziyu.com/mobile/pcindex.php?Action=article&id=52",
					method:'post'
				})
				.then((res)=>{
					console.log(res)
					this.text = res.data.content
				})
			}
		}
	}
</script>

<style lang="scss">
.page{
	width:1000px;
	margin: 0 auto;
}
#content{
    overflow: hidden;
    .router{
        font-size:14px;
        line-height:30px;
        color:#666666;
		margin: 15px 0 30px 0;
		
    }
    
}
#content{
	background: #fff;
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




@media only screen and (max-width:750px){
    #contant-m{
         padding-top: 0.87rem;
        padding-bottom: 0.98rem;
        width: 100%;
        .title{
        	font-size:.36rem;
        	text-align:center;
        	line-height:1.2rem;
        }
        .p{
        	color:#616161;
        	font-size:.26rem;
        	line-height:0.45rem;
        }
        img{
        	width:100%;
        }
    }
}

</style>