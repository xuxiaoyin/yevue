<template>
	<div>
			<div id="content">
			
			
			<div class="router">
				<div class="container">
					<a href="###">首页</a>><a href="javascript:void(0)">{{info.title}}</a>
					<div class="about_text" v-html="info.content">
						
					</div>
				</div>
				
			</div>
			
		
		</div>

		<div id="contant-m">
			<div class="container-m">
				<!-- <div class="title">品牌普洱简介</div> -->
				<div class="p" v-html="info.content">
					
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
				text:'',
				pjtid:'',
				info:{}
			}
		},
		created(){
			console.log(this.$route.query.id)
			this.get_about_me(this.$route.query.id)
		},
		watch: {
		      $route(){
		        this.pjtid = this.$route.query.id
		        this.get_about_me(this.$route.query.id)
		      },
		      pjtid() {
		        this.get_about_me(this.$route.query.id)
		      },
		},
		methods:{
			get_about_me(id){
				this.$axios({
					url:"https://cy.gzziyu.com/mobile/pcindex.php?Action=article",
					params:{
						id:id
					},
					method:'post'
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