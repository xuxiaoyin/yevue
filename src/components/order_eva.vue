<template>
	<div id="content">
		<div class="router">
			<div class="container">
				<a href="###">首页</a>><a href="###">订单评价</a>
			</div>
		</div>
		<div class="eva_list">
			<div class="container">
				<div class="li">
					<div class="order_info">
						<img src="img/pro_01.png" alt="" />
						<span class="name">2007年 黎明7540</span>
						<span class="attr">品牌：黎明 ，年份：2007年</span>
						<span class="price">￥3450 /件</span>
					</div>
					<div class="eva_text">
						<textarea name="" rows="" cols=""></textarea>
					</div>
					<button type="submit">提交</button>
				</div>
				<div class="li">
					<div class="order_info">
						<img src="img/pro_01.png" alt="" />
						<span class="name">2007年 黎明7540</span>
						<span class="attr">品牌：黎明 ，年份：2007年</span>
						<span class="price">￥3450 /件</span>
					</div>
					<div class="eva_text">
						<textarea name="" rows="" cols=""></textarea>
					</div>
					<button type="submit">提交</button>
				</div>
			</div>
		</div>
	
	</div>
</template>
<style lang="scss" scoped>
    #content{
        background:#fff;
        .router{
            font-size:14px;
            line-height:30px;
            color:#666666;
            margin: 15px 0 30px 0;
        }
    }
	.eva_list{
        width: 100%;
        .li{
            width: 100%;
            border: #f2f2f2 1px solid;
            margin-bottom: 35px;
            .order_info{
                width: 100%;
                border-bottom: #f2f2f2 1px solid;
                height: 100px;
                img{
                    margin: 8px 0 0 8px;
                    width: 75px;
                    height: 75px;
                    float: left;
                }
                span{
                    display: inline-block;
                    color: #333333;
                    font-size: 14px;
                    margin-top: 32px;
                }
                .name{
                    margin: 32px 180px 0 40px;
                }
                .attr{
                    color: #7f7f7f;
                    margin: 32px 100px 0 0;
                }
                .price{
                    color: #ee0a0d;
                }
            }
            .eva_text{
                width: 100%;
                padding: 0 22px;
                box-sizing: border-box;
                margin: 10px 0;
                textarea{
                    width: 100%;
                    height: 123px;
                    resize: none;
                    background: #f2f2f2;
                    border: none;
                    padding: 10px;
                    box-sizing: border-box;
                    line-height: 20px;
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
                    margin: 0px auto 15px;
                    cursor: pointer;
                    
                }
         
        }
}

@media only screen and (max-width:750px){
    #contant-m{
        padding-top: 0.87rem;
        padding-bottom: 0.98rem;
        width: 100%;
       ul{
            width:100%;
            li{
                width:100%;
                img{
                    width:0.8rem;
                    height:0.8rem;
                    float:left;
                    margin:0.15rem 0 0.15rem 0;
                }
                .title{
                    float:left;
                    font-size:0.28rem;
                    color:#2d2d2d;
                    margin:0.15rem;
                    line-height:0.8rem;
                }
                textarea{
                    width:100%;
                    height:3.6rem;
                    background:#f0f0f0;
                    padding:0.25rem;
                    box-sizing:border-box;
                    resize:none;
                    border:none;
                    border-radius:0.05rem;
                }
                .eva_btn{
                    width:3rem;
                    height:0.65rem;
                    background:#ffffff;
                    border:1px solid #ff0707;
                    color:#ff0707;
                    text-align:center;
                    line-height:0.65rem;
                    margin:0.7rem auto;
                    font-size:0.28rem;
                    border-radius:0.1rem;
                }
            }
       }
    }
}

</style>