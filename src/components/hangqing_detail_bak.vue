<template>
	<div>
		<div id="content">
			<div class="router">
				<div class="container">
					<!-- <a href="###">首页</a>><a href="###">登录</a> -->
					<router-link to="/">首页</router-link>><a href="javascript:void(0)">行情参考</a>><a href="javascript:void(0)">{{info.brand_name}}</a>><a href="javascript:void(0)">{{info.goods_name}}</a>
				</div>
			</div>
			
			<div class="container">
				<!--主体上部分-->
				<div class="middle_top clear">
					<div class="middle_top_left">
						<div id="smll_box">
							<img :src="info.gallery[pic_index]"/>
							<div id="box1"></div>
						</div>
						<div id="box"></div>
						<div class="pro_list">
							 <ul :style="'width:'+(62*info.gallery.length)+'px'" ref="smallimg">
							 	<li v-for="(item,index) in info.gallery" :key="index+info.goods_id" @click="pic_index=index"><img :src="item"></li>
							 </ul>
						</div>
						<a class="prev" @click="toprev"></a>
						<a class="next" @click="tonext"></a>
					</div>

					<div class="middle_top_right">
							<div class="right_top" v-if="guanggaowei&&guanggaowei.ad_code">
								<img :src="guanggaowei.ad_code"/>
							</div>
							<div class="title">{{info.goods_name}}<span></span></div>
							<div class="price">参考价：<span>￥{{info.cenkaojia}}/件</span>  <small>(期货价：￥{{info.market_price}}  参考价更新于{{info.zygengxinshijian}})</small> </div>
							
							
							
							<div class="canshu">
								<ul>
									<li>品牌：{{info.brand_name}}</li>
									<li>年份:{{info.zygengxinshijian}}</li>
									<li>生成工艺：{{info.gongyi}}</li>
									<li>规格：{{info.goods_brief}}</li>
									<li>净含量：{{info.goods_weight}}kg</li>
									<li>公斤参考价：<span>￥450</span></li>
								</ul>
								<!-- <div v-html="info"></div> -->
							</div>

							<div class="zhishu">
								<div class="left">
									<div class="zhishu_list">
										<div class="label">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;质：</div>
										<div class="progess">
											<div class="progess_children red" :style="'width:'+info.pizhi+'%'"></div>
											<div class="progess_num">
												<ul>
													<li>0</li>
													<li>25</li>
													<li>50</li>
													<li>75</li>
													<li>100</li>
												</ul>
											</div>
										</div>
										<div class="fenshu">{{info.pizhi}}分</div>
									</div>
									<div class="zhishu_list">
										<div class="label">性 价 比:</div>
										<div class="progess">
											<div class="progess_children green" :style="'width:'+info.xjb+'%'"></div>
											<div class="progess_num">
												<ul>
													<li>0</li>
													<li>25</li>
													<li>50</li>
													<li>75</li>
													<li>100</li>
												</ul>
											</div>
										</div>
										<div class="fenshu">{{info.xjb}}分</div>
									</div>
									<div class="zhishu_list">
										<div class="label">收藏价值：</div>
										<div class="progess">
											<div class="progess_children blue" :style="'width:'+info.shoucang+'%'"></div>
											<div class="progess_num">
												<ul>
													<li>0</li>
													<li>25</li>
													<li>50</li>
													<li>75</li>
													<li>100</li>
												</ul>
											</div>
										</div>
										<div class="fenshu">{{info.shoucang}}分</div>
									</div>
								</div>
								<div class="right">
									<canvas id="canvas" width="96" height="96"></canvas>
								</div>
							</div>
							
							<div class="pingfen">
								<div class="btns"><a href="#pingfen_hfrf">我要评分</a></div>
								共{{info.pinglunshu}}条评分
							</div>
							<div class="btn_list_button">
								<div class="btns"><router-link to="/qiugou">发布出售</router-link></div>
								<div class="btns"><router-link to="/qiugou">发布求购</router-link></div>
								<div class="btns">存茶评估</div>
								<a href="###" style="margin-right:20px;" @click="guanzhu(info.id)"><img :src="isGz?'static/img/xin.png':'static/img/xin-normal.png'"/> {{gztext}}</a>
								<a href="###"><img src="static/img/fenxiang.png"/> 分享到
    <share :config="config" class="share"></share></a>
                                
							</div>
					</div>
				</div>
				<!--主体上部分 end-->
				<div class="chat">
					<div class="chat_title">
						行情参考
					</div>
					<div class="cat_list">
						<ul>
							<li v-for="(item,index) in cankao_tab"  @click="change_cankao_tab(index)" :class="tab_index==index?'active':''">{{item}}</li>
						</ul>
					</div>
					<div class="chat_name">
						<p>{{info.goods_name}}-参考价</p>
						<span>数据来源：puerpinpai.com 更新时间：{{info.zygengxinshijian}}</span>
					</div>
					<canvas id="line" width="1110" height="300"></canvas>
					
					<div class="timepick">
						
						 <el-date-picker
				      v-model="value5"
				      type="datetimerange"
				      value-format="yyyy-MM-dd"
				      format="yyyy-MM-dd"
				      :picker-options="pickerOptions2"
				      range-separator="至"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      align="right">
				    </el-date-picker>
						<div class="submit" @click="seach">查询</div>
					</div>
					
					<div class="tabless">
						<ul>
							<li>截止日期</li>
							<li>参考价</li>
							<li>涨跌额</li>
							<li>涨跌幅</li>
							<li>日均涨跌额</li>
							<li>日均涨跌幅</li>
						</ul>
						<ul v-for="(item,index) in shijian" >
							<li>{{item.h_jiezhisj}}</li>
							<li>￥{{item.h_cenkao}}</li>
							<li class="red">降￥{{item.h_zhangdiee}}</li>
							<li class="red">↓ {{item.h_zhangdief}}</li>
							<li class="red">降￥{{item.h_richangz}}</li>
							<li class="red">↓ {{item.h_richangd}}</li>
						</ul>
						
					</div>
					<!-- <div class="btn_other"><a href="###">展示全部</a></div> -->
				</div>
				<!-- <div class="chat">
					<div class="chat_title">
						出售求购信息
					</div>
					<div class="cat_list">
						<ul>
							<li class="active">出售信息</li>
							<li>求购信息</li>
						</ul>
					</div>
					
					
					<div class="table1">
						<ul>
							<li>产品名称</li>
							<li>价格</li>
							<li>数量</li>
							<li>联系电话</li>
							<li>微信号</li>
							<li>QQ</li>
							<li>发布时间</li>
						</ul>
						<ul>
							<li>1701 天地一流</li>
							<li>￥1650</li>
							<li>30</li>
							<li>13512455684</li>
							<li>13545215684</li>
							<li>13545215684</li>
							<li>2018-10-10</li>
						</ul>
						
					</div>
					<div class="btn_other"><a href="###">展示全部</a></div>
				</div> -->
				
				<div class="chat">
					<div class="chat_title">
						商品详情
					</div>
					
					
					
					<div class="table2">
						<ul>
							<li>品名</li>
							<li>{{info.goods_name}}</li>
							
						</ul>
						<ul>
							<li>生产工艺</li>
							<li>{{info.gongyi}}</li>
							
						</ul>
						<ul>
							<li>规格</li>
							<li>{{info.goods_brief}}</li>
							
						</ul>
						<ul>
							<li>生产日期</li>
							<li>{{info.shengchanriqi}}</li>
							
						</ul>
						<ul>
							<li>出品商</li>
							<li>{{info.brand_name}}</li>
							
						</ul>
						<ul>
							<li>储藏方式</li>
							<li>{{info.chucang}}</li>
							
						</ul>
						
					</div>
					
				</div>
				
				<div class="chat">
					<div class="chat_title" id="pingfen_hfrf">
						茶友点评
					</div>
					
					<div class="eva">
						<div class="zhishu">
							<div class="right">
									<canvas id="canvas1" width="130" height="130"></canvas>
								</div>
								<div class="left">
									<div class="zhishu_list">
										<div class="label">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;质：</div>
										<div class="progess">
											<el-slider v-model="value1"></el-slider>
										</div>
										<div class="fenshu">{{value1}}分</div>
									</div>
									<div class="zhishu_list">
										<div class="label">性 价 比:</div>
										<div class="progess">
											<el-slider v-model="value2"></el-slider>
										</div>
										<div class="fenshu">{{value2}}分</div>
									</div>
									<div class="zhishu_list">
										<div class="label">收藏价值：</div>
										<div class="progess">
											<el-slider v-model="value3"></el-slider>
										</div>
										<div class="fenshu">{{value3}}分</div>
									</div>
								</div>
								
							</div>
					
						<textarea class="eva_text" v-model="content" placeholder="请输入您的点评内容......"></textarea>
						<div class="orther_btn" @click="eva">
							发布评论
						</div>
					</div>
					<div class="eva_list">
						<ul>
							<li v-for="(item,index) in eva_list" >
								<div class="user_img"><img :src="item.headimgurl"/><p>{{item.user_name}}</p></div>
								<div class="right">
									<div class="eva_title">
										<div class="progess">
											<div class="progess_children red" :style="'width:'+item.zonghe+'%'"></div></div>
										<div class="fenshu">综合评分：{{item.zonghe}}分   &nbsp;&nbsp;&nbsp; 品质：{{item.pizhi}}分 &nbsp;&nbsp;   &nbsp;      性价比：{{item.xjb}}分      &nbsp;&nbsp;&nbsp;     收藏价值：{{item.shoucang}}分</div>
									</div>
									
									<div class="eva_content">
										<p>{{item.content}}</p>
										<span class="time">{{item.add_time}}</span>
										<span class="zan">赞（20）</span>
									</div>
								</div>
							</li>
							
						</ul>
						
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
			
			</div>
		
		</div>
		<div id="contant-m">
			<div class="swiper-container">
			<swiper :options="swiperOption" ref="mySwiper">
              <!-- slides -->
              <swiper-slide v-for="(item,index) in info.gallery"><img :src="item"></swiper-slide>
              <swiper-slide v-for="(item,index) in info.gallery"><img :src="item"></swiper-slide>
             
              <!-- Optional controls -->
              <div class="swiper-pagination" slot="pagination"></div>
	             <!--  <div class="swiper-button-prev" slot="button-prev"></div>
	              <div class="swiper-button-next" slot="button-next"></div> -->
              <div class="swiper-scrollbar"  slot="scrollbar"></div>
            </swiper>
			
			   
			    
			   
			</div>


			<div class="pro_info">
				<div class="container-m">
					<div class="title-m">1801 7542</div>
					<div class="p">年份： <span>2018年</span>	</div>
					<div class="p">批次： <span>1801</span>	</div>
					<div class="p">生产工艺： <span>生茶</span>	</div>
					<div class="p">规格： <span>357克/片   7片/提（竹壳）    6提/件（竹筐）</span>	</div>
					<div class="p">净含量： <span>15kg</span>	</div>
					<div class="p">公斤参考价： <span class="red">¥400/kg</span>	</div>
					<div class="p">参考价： <span class="red">¥6000/件</span>	</div>
					<div class="tip">（参考价更新与2018-04-26）</div>
				</div>
			</div>
			<div class="common-title"><div class="container-m">行情参考</div></div>
			<div class="hangqing-m">
				<div class="container-m">
					<div class="cat_list-m">
						<ul>
							<li class="active">最近一星期</li>
							<li>最近一个月</li>
							<li>最近三个月</li>
							<li>最近半年</li>
							<li>最近一年</li>
						</ul>
					</div>
					<div class="chat_title-m">1801 云期-参考价</div>
					<div class="chat_tip">数据来源：puerpinpai.com 更新时间：2018-04-20</div>
					<div class="canvas"><canvas id="line1"></canvas></div>
					<div class="timepick-m">
						<div class="btn">
							<input type="text"  value="2018-04-01"/>
						</div>
						至
						<div class="btn">
							<input type="text"  value="2018-04-01"/>
						</div>
						<div class="submit">查询</div>
					</div>
					<div class="table">
						<ul>
							<li>截止日期</li>
							<li>参考价</li>
							<li>涨跌额</li>
							<li>涨跌幅</li>
							<li>日均涨跌额</li>
							<li>日均涨跌幅</li>
						</ul>
						<ul>
							<li>2018-10-10</li>
							<li>￥14万</li>
							<li class="green">降￥4000</li>
							<li class="green">↓ 1.32%</li>
							<li class="green">降￥4000</li>
							<li class="green">↓ 1.32%</li>
						</ul>
						<ul>
							<li>2018-10-10</li>
							<li>￥14万</li>
							<li class="green">升￥4000</li>
							<li class="green">↑ 1.40%</li>
							<li class="green">升￥4000</li>
							<li class="green">↑ 1.40%</li>
						</ul>
						<ul>
							<li>2018-10-10</li>
							<li>￥14万</li>
							<li class="green">降￥4000</li>
							<li class="green">↓ 1.32%</li>
							<li class="green">降￥4000</li>
							<li class="green">↓ 1.32%</li>
						</ul>
						<ul>
							<li>2018-10-10</li>
							<li>￥14万</li>
							<li class="green">升￥4000</li>
							<li class="green">↑ 1.40%</li>
							<li class="green">升￥4000</li>
							<li class="green">↑ 1.40%</li>
						</ul>
						<ul>
							<li>2018-10-10</li>
							<li>￥14万</li>
							<li class="green">降￥4000</li>
							<li class="green">↓ 1.32%</li>
							<li class="green">降￥4000</li>
							<li class="green">↓ 1.32%</li>
						</ul>
						<ul>
							<li>2018-10-10</li>
							<li>￥14万</li>
							<li class="green">升￥4000</li>
							<li class="green">↑ 1.40%</li>
							<li class="green">升￥4000</li>
							<li class="green">↑ 1.40%</li>
						</ul>
						<ul>
							<li>2018-10-10</li>
							<li>￥14万</li>
							<li class="green">降￥4000</li>
							<li class="green">↓ 1.32%</li>
							<li class="green">降￥4000</li>
							<li class="green">↓ 1.32%</li>
						</ul>
						<ul>
							<li>2018-10-10</li>
							<li>￥14万</li>
							<li class="red">升￥4000</li>
							<li class="red">↑ 1.40%</li>
							<li class="red">升￥4000</li>
							<li class="red">↑ 1.40%</li>
						</ul>
					</div>
				</div>
			</div>


			<div class="xiangqing-m">
				<div class="common-title"><div class="container-m">商品详情</div></div>
				<div class="table2">
					<ul>
						<li>品名</li>
						<li>1801 7542</li>
						
					</ul>
					<ul>
						<li>生产工艺</li>
						<li>普洱饼茶 生茶</li>
						
					</ul>
					<ul>
						<li>规格</li>
						<li>357克/片   7片/提（竹壳）    6提/件（竹筐）</li>
						
					</ul>
					<ul>
						<li>生产日期</li>
						<li>2018年</li>
						
					</ul>
					<ul>
						<li>出品商</li>
						<li>大益</li>
						
					</ul>
					<ul>
						<li>储藏方式</li>
						<li>在通风、干燥无异味、常温环境下存储</li>
						
					</ul>
					
				</div>
			</div>
			<div class="common-title"><div class="container-m">茶友评论</div></div>
			<div class="eva_input">
				<input type="text" placeholder="我要评论..." name="">
				<button>评论</button>
			</div>
			<div class="eva_list-m">
				<div class="container-m">
					<ul>
						<li>
							<div class="img"><img src="static/img/user_img.png"></div>
							<div class="name">**yu</div>
							<div class="time">04-15 09:56</div>
							<div class="eva_text-m">
								如既往地秉承“诚信、公平、双赢”的核心价值观，为各大茶企、商家、消费者提供诚信、可靠的茶叶交易平台。
							</div>
						</li>
						
					</ul>
				</div>
			</div>	
			<!-- <div class="page-m">
					<ul>
						<li><</li>
						<li class="on">1</li>
						<li>2</li>
						<li>3</li>
						<li>4</li>
						<li>5</li>
						<li>></li>
					</ul>
				</div> -->
		</div>
	</div>
</template>

<script>
	var echarts = require('echarts');
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import GitHubBadge from 'vue-github-badge'
	export default {
		name:'hangqing',
		data(){
			return {
				shijian:[],
				info:{},
				cankao_tab:['最近一星期','最近一个月','最近三个月','最近半年','最近一年'],
				tab_index:0,
				swiperOption: {
		            autoplay: 3000,
		            pagination: {
		                el: '.swiper-pagination',
		            },
		            navigation: {
		                nextEl: '.swiper-button-next',
		                prevEl: '.swiper-button-prev',
		            }
		        },
			    cankao:[],
			    eva_list:[],
			    value1:0,
				value2:0,
				value3:0,
				content:'',
                eva_list:[],
                isGz:false,
				num:1,
				guanggaowei:'',
				pickerOptions2: {
		          shortcuts: [{
		            text: '最近一周',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', [start, end]);
		            }
		          }, {
		            text: '最近一个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
		              picker.$emit('pick', [start, end]);
		            }
		          }, {
		            text: '最近三个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
		              picker.$emit('pick', [start, end]);
		            }
		          }]
		        },
		        value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                value5:  ["2016-12-06", "2019-01-25"],
            config:{
                // url                 : '', // 网址，默认使用 window.location.href
                // source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
                // title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
                // description         : '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
                // image               : '', // 图片, 默认取网页中第一个img标签
                // sites               : ['qzone', 'qq', 'weibo','wechat', 'douban'], // 启用的站点
                // disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
                // wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
                // wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
            },
            pic_index:0,
		}
        },
        computed: {
            gztext() {
                return this.isGz?'取消关注':'加关注'
            }
        },
		 components: {
	      swiper,
          swiperSlide,
          'github-badge': GitHubBadge
	     },
		created(){
			this.get_info(this.$route.query.id)
			this.get_eva(this.$route.query.id)
			this.change_cankao_tab(0)
			this.seach()
			this.guanggao()
	
		},
		mounted(){
            this.echarts()
			//console.log(this.info)
			
		
		},
		watch: {
	        $route(to) {
	            //console.log(to)
	            document.body.scrollTop = 0
            	document.documentElement.scrollTop = 0
	            this.get_info(this.$route.query.id)
	            this.get_eva(this.$route.query.id)
	            this.change_cankao_tab(0)
	            this.seach()
	           	console.log(to)
	            if(to.path == '/hangqing_detail'){
	            	console.log('行情详情')
	            	this.echarts()
	            	this.guanggao()
	            }
	        }
	    },
		methods:{
            toprev(){
                let left=this.$refs.smallimg.offsetLeft;
                if(left<=0){
                    return
                }else{
                    left-=62
                }
                this.$refs.smallimg.style.left=left+'px'
            },
            tonext(){
                let left=0
                let width=this.$refs.smallimg.offsetWidth
                if(width<=340){
                    return
                }else{
                    left+=62
                    if(left+340>width){
                        return
                    }
                }
                this.$refs.smallimg.style.left=left+'px'
            },
            //关注
            guanzhu(info_id){
                if (!sessionStorage.getItem('userInfos')) {
                    
                    alert('请先登录')
                this.$router.push('login')
                return false
                }
                var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
                this.$axios({
                    url:'http://cy.gzziyu.com/mobile/pcindex.php?Action=guanzhu',
                    method:'post',
                    params:{
                        goods_id:info_id,
                        openid:userInfo.openid
                    }
                })
                .then((res)=>{
                    console.log('关注')
                    console.info(res)
                    if(res.data.msg == "已关注"){
                        this.isGz=true;
                    }else{
                    this.isGz=false;
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
            },
			// 广告
			guanggao(){
				console.log('guanggao')
				this.$axios({
					url:'https://cy.gzziyu.com/mobile/pcindex.php?Action=danzhang',
					method:'post',
					params:{
						shuzi:10
					}
				})
				.then((res)=>{
					console.log('广告位,',res)
					this.guanggaowei = res.data[0]
				})
			},
			echarts(){
				// console.log(123)
				var myChart = echarts.init(document.getElementById('line'));
				let data1 = []; 
				let data2 = []; 
				this.cankao.map(function(item){
					data1.push(item.h_cenkao)
					data2.push(item.h_jiezhisj)
				})
				// console.log(data1,data2)
				// 绘制图表
				// console.log(echarts)
				myChart.setOption({
				    title: {
				        text: '行情参考图'
				    },
				    tooltip: {
				    	 trigger: 'axis'
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    toolbox: {
				        feature: {
				            saveAsImage: {}
				        }
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: data2
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [
				        {
				            name:this.info.gengxinshijian,
				            type:'line',
				            stack: '总量',
				            data:data1
				        },
				        
				    ]
				});
			},
			drawCircle(_options){
			  	// console.log(_options)
			    var options = _options || {};    //获取或定义options对象;
			    options.angle = options.angle || 1;    //定义默认角度1为360度(角度范围 0-1);
			    options.color = options.color || '#fff';    //定义默认颜色（包括字体和边框颜色）;
			    options.lineWidth = options.lineWidth || 10;    //定义默认圆描边的宽度;
			    options.lineCap = options.lineCap || 'square';    //定义描边的样式，默认为直角边，round 为圆角
			 
			    var oBoxOne = document.getElementById(options.id);
			    var sCenter = oBoxOne.width / 2;    //获取canvas元素的中心点;
			    var ctx = oBoxOne.getContext('2d');
			    var nBegin = Math.PI / 2;    //定义起始角度;
			    var nEnd = Math.PI * 2;    //定义结束角度;
			    var grd = ctx.createLinearGradient(0, 0, oBoxOne.width, 0);    //grd定义为描边渐变样式;
			    grd.addColorStop(0, 'red');
			    grd.addColorStop(0.5, 'yellow');
			    grd.addColorStop(1, 'green');
			 
			    ctx.textAlign = 'center';    //定义字体居中;
			     ctx.fillStyle = '#333333';
			    ctx.font = '12px ';
			    ctx.fillText("综合评分", sCenter, sCenter-12);
			    ctx.font = 'normal normal bold 20px Arial';    //定义字体加粗大小字体样式;
			    ctx.fillStyle = options.color == 'grd' ? grd : options.color;    //判断文字填充样式为颜色，还是渐变色;

			    ctx.fillText((options.angle * 100) , sCenter, sCenter+12);    //设置填充文字;


			    /*ctx.strokeStyle = grd;    //设置描边样式为渐变色;
			    ctx.strokeText((options.angle * 100) + '%', sCenter, sCenter);    //设置描边文字(即镂空文字);*/
			    ctx.lineCap = options.lineCap;
			    ctx.strokeStyle = options.color == 'grd' ? grd : options.color;
			    ctx.lineWidth = options.lineWidth;
			 
			    ctx.beginPath();    //设置起始路径，这段绘制360度背景;
			    ctx.strokeStyle = '#D8D8D8';
			    ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, nEnd, false);
			    ctx.stroke();
			 
			    var imd = ctx.getImageData(0, 0, 240, 240);
			    function draw(current) {    //该函数实现角度绘制;
			        ctx.putImageData(imd, 0, 0);
			        ctx.beginPath();
			        ctx.strokeStyle = options.color == 'grd' ? grd : options.color;
			        ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, (nEnd * current) - nBegin, false);
			        ctx.stroke();
			    }
			 
			    var t = 0;
			    var timer = null;
			    function loadCanvas(angle) {    //该函数循环绘制指定角度，实现加载动画;
			        timer = setInterval(function(){
			            if (t > angle) {
			                draw(options.angle);
			                clearInterval(timer);
			            }else{
			                draw(t);
			                t += 0.02;
			            }
			        }, 20);
			    }
			    loadCanvas(options.angle);    //载入百度比角度  0-1 范围;
			    timer = null;
			 
			},
			seach(){
				this.$axios({
					url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=hangqingchaxun',
					method:'post',
					params:{
						goods_id:this.$route.query.id,
						start_time:this.value5[0],
						end_time:this.value5[1]
					}
				})
				.then((res)=>{
					// console.log(res)
					this.shijian = res.data
				})
			},
			change_cankao_tab(index){
				this.tab_index = index
					this.$axios({
					url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=hangqingtu',
					method:'post',
					params:{
						goods_id:this.info.goods_id,
						type:(index+1)
					}
				})
				.then((res)=>{
					// console.log(res)
					this.cankao = res.data
					this.echarts()
				})
				.catch((err)=>{
					console.log(err)
				})

			},
			get_eva(id){
				this.$axios({
                    url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=hangqingpinglunlist',
                    method:'post',
                    params:{
                        goods_id:id
                    }
                })
                .then((res)=>{
                    // console.log(res)
                    
                    this.eva_list = res.data
                })
                .catch((err)=>{
                    console.log(err)
                })
			},
			eva(){
				if (!sessionStorage.getItem('userInfos')) {
			    	
					alert('请先登录')
			      this.$router.push('login')
			      return false
			    }
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=hangqingpinglun',
					method:'post',
					params:{
						goods_id:this.info.goods_id,
						openid:userInfo.openid,
						content:this.content,
						pizhi:this.value1,
						xjb:this.value2,
						shoucang:this.value3
					}
				})
				.then((res)=>{
					console.log(res)
					if(res.data.success ==1){
						this.content = '';
						this.value1 = 0;
						this.value2 = 0;
						this.value3 = 0;
					}
					this.get_eva(this.info.goods_id)
				})
			},
			
			get_eva(id){
				this.$axios({
                    url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=hangqingpinglunlist',
                    method:'post',
                    params:{
                        goods_id:id
                    }
                })
                .then((res)=>{
                    // console.log(res)
                    
                    this.eva_list = res.data
                })
                .catch((err)=>{
                    console.log(err)
                })
			},
			get_info(id){
				this.$axios({
                    url:'http://cy.gzziyu.com/mobile/ny_flow_goods.php?action=detail',
                    method:'post',
                    params:{
                        goods_id:id
                    }
                })
                .then((res)=>{
                    console.log(res)
                    
                    this.info = res.data
                    let angle = this.info.zonghe/100;                   
					console.log(angle)
					this.drawCircle({
					    id: 'canvas',
					    color: '#ffcc33',
					    angle: angle,
					    lineWidth: 8
					})
					this.drawCircle({
					    id: 'canvas1',
					    color: '#ffcc33',
					    angle:angle,
					    lineWidth: 8
					})
                })
                .catch((err)=>{
                    // console.log(err)
                })
			}
		}
	}
</script>
<style lang="scss" scoped>
	  .middle_top{
    padding-top: 50px;
//  overflow: hidden;
    overflow: '';
}
 .router{
        font-size:14px;
        line-height:30px;
        color:#666666;
        margin: 15px 0 30px 0;
    }
#content{
	overflow:hidden;
	background:#fff;
	height:auto;
	overflow:hidden;
}
    
    .middle_top{
        //overflow: hidden;
        position: relative;
    }

  .middle_top .middle_top_left{
    float: left;
    width: 300px;
    margin-right: 50px;
    position: relative;
}
  .middle_top .middle_top_left #smll_box{
      border:1px #e0e0e0 solid;
        display: block;
        width: 300px;
        height: 300px;
}

.swiper-slide{
	img{
		width:100%;
		height:100%;
	}
}
  .middle_top .middle_top_left #smll_box img{
    width: 300px;
    height: 300px;
}
  .middle_top .middle_top_left #smll_box #box1{
    position:absolute;
    width:160px;
    height:160px;
    background:#cccccc;
    opacity:0.5;
    display:none;
    top:0;
}
  .middle_top .middle_top_left #box{
    z-index: 1000;
    width:500px;
    height:518px;
    border:1px solid #999999; 
    overflow:hidden;
    position:absolute;
    left: 560px;
    top: 0;
    display:none;
}
  .middle_top .middle_top_left a.prev,  .middle_top .middle_top_left a.next{
    display: inline-block;
    width: 40px;
    height: 40px;
    cursor: pointer;
    
}
  .middle_top .middle_top_left a.prev{
    position: absolute;
   bottom: 16px;
    left: -20px;
    background: url(../../static/img/prev_gray.png) no-repeat;
}

  .middle_top .middle_top_left a.next{
    position: absolute;
    bottom: 16px;
    right: -20px;
    background: url(../../static/img/next_gray.png) no-repeat;
}

  .middle_top .middle_top_left .pro_list{
    width: 300px;
    margin: 0 auto;
    text-align: center;
    overflow: hidden;
    position: relative;
    height: 62px;
    margin-top: 23px;
}
  .middle_top .middle_top_left .pro_list ul{
    // display: inline-block;
    margin-right: -28px;
    padding: 0 20px;
    overflow: hidden;
    position: absolute;
    height: 62px;
    min-width: 100%;
    top:0;
    left:0;
}
  .middle_top .middle_top_left .pro_list ul li{
    cursor: pointer;
    width: 62px;
    height: 62px;
    float: left;
    padding: 1px;
    
}


  .middle_top .middle_top_left .pro_list ul li.on{
    border: 1px solid #ff0000;
    box-sizing: border-box;
    padding: 0;
}
  .middle_top .middle_top_left .pro_list ul li:hover{
    border: 1px solid #ff0000;
    box-sizing: border-box;
    padding: 0;
}
  .middle_top .middle_top_left .pro_list ul li  img{
    width: 60px;
    height: 60px;
}


  .middle_top .middle_top_right{
    float: left;
    margin-left: 15px;
    width: 635px;
    position: relative;
    .right_top{
        width: 190px;
        height: 68px;
        position: absolute;
        right: -15px;
        top: 0;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .canshu{
        width: 650px;
        height: 95px;
        border:1px #d9d9d9 solid;
        margin: 30px 0 45px 0;
        padding: 10px 0;
        ul{
            li{
                width: 50%;
                line-height: 35px;
                float: left;
                padding: 0 10px;
                box-sizing: border-box;
                color: #666666;
                span{
                    color: #ee0a0d;
                }
            }
        }
    }
    .pingfen{
         width: 650px;
        height: 45px;
        font-size: 14px;
        color: #666666;
         line-height:30px;
         margin: 10px 0;
        .btns{
        	a{
        		 color: #ee0a0d;
        	}
            margin-right: 25px;
            float: left;
            width: 100px;
            height: 30px;
            font-size: 14px;
            text-align: center;
            line-height:30px;
           	 color: #ee0a0d;
           	 padding-bottom:0;
            border: 1px #ee0a0d solid;
            border-radius: 5px;
            
        }
    }
    .btn_list_button{
        width: 650px;
        height: 100px;
        font-size: 14px;
        color: #666666;
         line-height:30px;
         .share{
             margin-top:10px;
             margin-left: 100px;
         }
        .btns{
        	a{
        		color: #fff;
        	}
            margin-right: 25px;
            float: left;
            width: 100px;
            height: 30px;
            font-size: 14px;
            text-align: center;
            line-height:30px;
            color: #fff;
            padding-bottom:0;
            background:#ee0a0d ;
            border-radius: 5px;
            
        }
    }
    .num{
        width: 100%;
        margin-bottom: 40px;
       clear: both;
       overflow: hidden;
        .label{
            width: 70px;
            float: left;
            line-height: 26px;
            
        }
        .num_open{
            width: 200px;
            float: left;
            .add{
                width: 55px;
                background: #e5e5e5;
                text-align: center;
                line-height: 26px;
                float: left;
            }
            .input{
                width: 45px;
                height: 26px;
                border:1px #e5e5e5 solid;
                box-sizing: border-box;
                float: left;
                input{
                    width: 100%;
                    height: 100%;
                    border: none;
                    text-align: center;
                    background: none;
                }
            }
            .minu{
                width: 55px;
                background: #e5e5e5;
                text-align: center;
                line-height: 26px;
                float: left;
            }
        }
    }
    
    .zhishu{
        width: 650px;
        height: 181px;
        .left{
            float: left;
            .zhishu_list{
                line-height: 45px;
                height: 45px;
                .label{
                    float: left;
                    font-size: 14px;
                    color: #333333;
                     margin-top: 12px;
                     margin-left: 12px;
                     width: 70px
                }
                .progess{
                    width: 216px;
                    height: 12px;
                    float: left;
                    margin-top: 28px;
                    background: #ddd;
                    position: relative;
                    .progess_children{
                        width: 70%;
                        height: 100%;

                    }
                    .red{
                        background: #e67373;
                    }
                    .green{
                        background: #73e673;
                    }
                    .blue{
                        background: #7373e6;
                    }
                    .progess_num{
                        width: 100%;
                        position: absolute;
                        top: 12px;
                        left: 0;
                        ul{
                            width: 130%;
                            overflow: hidden;
                            li{
                                width: 18%;
                                float: left;
                                font-size: 10px;
                                color: #999999;
                                height: 12px;
                                line-height: 12px;
                                text-align: left;
                               
                            }
                        }
                    }
                }
                .fenshu{
                    float: left;
                    font-size: 14px;
                    color: #333333;
                     margin-top: 12px;
                     margin-left: 12px
                }
            }
        }
        .right{
            float: left;
            margin: 27px 0 0 80px
        }
    }
    
}

  .middle_top .middle_top_right  .title{
    font-size: 26px;
    color: #1b1b1b;
    line-height: 25px;
    margin: 0;
    line-height: 70px;
    span{
        a{
            font-size: 14px;
            color: #036595;
            
        }
    }
}
  .middle_top .middle_top_right  .price{
    font-size: 12px;
    color: #666666;
    line-height: 25px;
    margin: 0;
    span{
        font-size: 24px;
        color: #ee0a0d;
    }
}


 
  .middle_top .middle_top_right .button{
    width: 430px;
    margin-top: 30px;
}
  .middle_top .middle_top_right .button a{
    cursor: pointer;
    display: inline-block;
    text-align: center;
    line-height: 50px;
    width: 200px;
    height: 50px;
    border: none;
    background: #FF0000;
    margin-right: 10px;
    padding: 0;
    color: #FFFFFF;
}
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
    }
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
    .timepick{
        width:100% ;
        text-align: center;
        color: #aaa9a9;
        margin-bottom: 30px;
        .btn{
            display: inline-block;
            width: 135px;
            height: 32px;
            border:1px #aaa9a9 solid;
            border-radius:5px ;
            padding-bottom:0;
            margin: 0 22px;
            input{
                width: 100%;
                border: none;
                background: none;
                 line-height: 32px;
                text-align: center;
                color: #aaa9a9;
            }
        }
        .submit{
            width: 130px;
            height: 32px;
            border-radius:5px ;
             display: inline-block;
             background: #ee0a0d;
             line-height: 32px;
             color: #fff;
        }
    }
    .tabless{
        width: 1177px;
        overflow: hidden;
        margin: 0 auto;
        border: 1px #e0e0e0 solid;
        
        ul{
            width: 100%;
            li{
                &:nth-child(1){
                    width: 25%;
                }
                &.green{
                    color: #4ab36f;
                }
                &.red{
                    color: #ec1d25;
                }
                
                float: left;
                width: 15%;
                height:40px;
                text-align:  center;
                line-height:40px; 
                color:#696555; 
                border-bottom: 1px #e0e0e0 solid;
                border-right: 1px #e0e0e0 solid;
                box-sizing: border-box;
                 &:last-child{
                    border-right: none;
                }
                
            }
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
    .table2{
        width: 1177px;
        overflow: hidden;
        margin: 30px auto;
        border: 1px #e0e0e0 solid;
        
        ul{
           
            
            &:nth-child(2n-1){
                background: #f5f5f5;
            }
            width: 100%;
             overflow: hidden;
            li{
                &:nth-child(1){
                    width: 20%;
                    padding: 0 20px;
                    box-sizing: border-box;
                    text-align: center;
                    font-size: 14px;
                    color: red;
                    font-weight: bold;
                }
                
                
                float: left;
                width: 80%;
                height:40px;
                
                text-align:  left;
                line-height:40px; 
                color:#000; 
                font-size: 14px;
                font-weight: bold;
                box-sizing: border-box;
                 &:last-child{
                    border-right: none;
                }
                
            }
        }
    }
    
    .btn_other{
        width: 302px;
        height: 40px;
        background: #e6e6e6;
        text-align: center;
        line-height: 40px;
        color: #333333;
        font-size: 14px;
        margin: 24px auto;
    }
    
    .eva{
        width: 1177px;
        margin: 22px auto;
        padding: 0 38px;
        box-sizing: border-box;
        overflow:hidden;
        background: #f5f5f5;
        .zhishu{
            width: 100%;
            height: 181px;
            margin: 35px 0;
            .left{
                float: left;
                .zhishu_list{
                    line-height: 45px;
                    height: 45px;
                    .label{
                        float: left;
                        font-size: 14px;
                        color: #333333;
                         margin-top: 12px;
                         margin-left: 12px;
                         width: 70px;
                         line-height: 44px;
                    }
                    .progess{
                        width: 440px;
                        height: 12px;
                        float: left;
                        margin-top: 18px;
                        position: relative;
                        .progess_children{
                            width: 70%;
                            height: 100%;
                            background: #e67373;
    
                        }
                        .red{
                            background: #e67373;
                        }
                        .green{
                            background: #73e673;
                        }
                        .blue{
                            background: #7373e6;
                        }
                        .progess_num{
                            width: 100%;
                            position: absolute;
                            top: 12px;
                            left: 0;
                            ul{
                                width: 130%;
                                overflow: hidden;
                                li{
                                    width: 18%;
                                    float: left;
                                    font-size: 10px;
                                    color: #999999;
                                    height: 12px;
                                    line-height: 12px;
                                    text-align: left;
                                   
                                }
                            }
                        }
                    }
                    .fenshu{
                        float: left;
                        font-size: 14px;
                        color: #333333;
                         margin-top: 12px;
                         margin-left: 12px;
                         line-height: 44px;
                    }
                }
            }
            .right{
                float: left;
                margin: 10px 0 0 80px
            }
        }
        .eva_text{
            width: 1100px;
            height: 140px;
            display: block;
            margin: 0 auto;
            background: #fff;
            resize: none;
            border:none;
            line-height: 25px;
            padding: 10px 15px;
            box-sizing: border-box;
        }
        .orther_btn{
            width: 130px;
            height: 32px;
            border-radius:5px ;
            margin: 25px auto;
             display: block;
             background: #ee0a0d;
             line-height: 32px;
             color: #fff;
             text-align: center;
        }
            
    }
    .eva_list{
        width: 1175px;
        margin: 0 auto;
        
        ul{
            li{
                padding-top: 26px;
                height: 155px;
              border-bottom: 1px #e0e0e0 solid;
              overflow: hidden;
            .user_img{
                float: left;
                width: 130px;
                img{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: block;
                    margin: 0 auto 12px;
                }
                p{
                    
                    color: #787878;
                    font-size: 14px;
                    text-align: center;
                }
            }
            .right{
                float: left;
                width: 1045px;
                .eva_title{
                    width: 100%;
                    height: 30px;
                    overflow: hidden;
                    background: #f5f5f5;
                    .progess{
                        width: 216px;
                        height: 12px;
                        float: left;
                        margin-top: 9px;
                        margin-left: 20px;
                        position: relative;
                        .progess_children{
                            width: 70%;
                            height: 100%;
                            background: #ffcc33;
    
                        }
                        
                    }
                    .fenshu{
                        float: left;
                        font-size: 14px;
                        color: #999999;
                         margin-top: 8px;
                         margin-left: 12px
                    }
                }
                .eva_content{
                    width: 100%;
                    p{
                        font-size: 14px;
                        color: #666666;
                        line-height: 40px;
                        padding: 10px 0;
                        height: 100px;
                        box-sizing: border-box;
                    }
                    span.time{
                        float: left;
                        color: #a5a5a5;
                        font-size: 12px;
                    }
                    span.zan{
                        float: right;
                        color: #a5a5a5;
                        font-size: 12px;
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
    }
 }



 @media only screen and (max-width:750px){
    #contant-m{
        padding-top: 0.87rem;
        padding-bottom: 1.96rem;
        width: 100%;
        font-size:0.22rem;
        .swiper-container{
            width:100%;
            height:7rem;
        }
        .pro_info{
            width:100%;
            border-bottom:0.15rem solid #f2f2f2;
           .name{
                font-size:0.3rem;
                color:#000000;
                line-height:0.4rem;
           }
           .price{
                color:#eb1e24;
                font-size:0.36rem;
                line-height:0.78rem;
           }
           .attr{
                font-size:0.2rem;
                color:#b5b5b5;
           }
           .num{
                margin:0.43rem 0;
                font-size:0.3rem;
                color:#000000;
                overflow:hidden;
                .num_bun{
                    float:right;
                    width:1.98rem;
                    height:0.46rem;
                    .minu,.add{
                        width:0.64rem;
                        float:left;
                        height:100%;
                        background:#dfdfdf;
                        text-align:center
                    }
                    input{
                        width:0.7rem;
                        height:100%;
                        float:left;
                        text-align:center;
                        border:none;
                        background:#f5f5f5;
                    }
                }
           }
        }
        .common-title{
            width:100%;
            height:0.75rem;
            line-height:0.75rem;
            font-size:0.28rem;
            font-weight:bold;
            color:#000;
        }
        .hangqing-m{
            width:100%;
            padding-bottom:0.3rem;
            border-bottom:0.15rem #f0f0f0 solid;

            .cat_list-m{
                width: 100%;
                ul{
                    width: 100%;
                    text-align:center;
                    margin: 0.3rem 0;
                    font-size:0;
                    li{
                        display: inline-block;
                        width: 1.3rem;
                        height: 0.48rem;
                        text-align: center;
                        line-height:  0.48rem;
                        background: #f0f0f0;
                        color: #4a4a4a;
                        margin-right:  0.05rem;
                        font-size: 0.2rem;
                        &.active{
                            background: #eb1e24;
                            color: #fff;
                        }
                    }
                }
            }
            .chat_title-m{
                color:#000000;
                font-size:0.24rem;
                text-align:center;
            }
            .chat_tip{
                color:#aaa9a9;
                font-size:0.18rem;
                text-align:center;
            }
            #line1{
                width:100%;
                height:2.8rem;
            }
            .timepick-m{
                width:100% ;
                text-align: center;
                color: #aaa9a9;
                font-size:0.24rem;
                margin-bottom: 0.3rem;
                .btn{
                    display: inline-block;
                    width: 1.35rem;
                    height: 0.32rem;
                    border:1px #aaa9a9 solid;
                    border-radius:0.05rem ;
                    margin: 0 0.22rem;
                    input{
                        width: 100%;
                        border: none;
                        background: none;
                         line-height: 0.32rem;
                        text-align: center;
                        color: #aaa9a9;
                    }
                }
                .submit{
                    width: 1.3rem;
                    height: 0.32rem;
                    border-radius:0.05rem ;
                     display: inline-block;
                     background: #ee0a0d;
                     line-height: 0.32rem;
                     color: #fff;
                }
            }
            .table{
                width: 100%;
                overflow: hidden;
                margin: 0 auto;
                border: 1px #e0e0e0 solid;
                
                ul{
                    width: 100%;
                    li{
                        &:nth-child(1){
                            width: 25%;
                        }
                        &.green{
                            color: #4ab36f;
                        }
                        &.red{
                            color: #ec1d25;
                        }
                        
                        float: left;
                        width: 15%;
                        height:0.4rem;
                        font-size:0.18rem;
                        text-align:  center;
                        line-height:0.4rem; 
                        color:#696555; 
                        border-bottom: 1px #e0e0e0 solid;
                        border-right: 1px #e0e0e0 solid;
                        box-sizing: border-box;
                         &:last-child{
                            border-right: none;
                        }
                        
                    }
                }
            }
             
        }
        .xiangqing-m{
            width:100%;
            padding-bottom:0.3rem;
            border-bottom:0.15rem #f0f0f0 solid;

              .table2{
                    width: 100%;
                    overflow: hidden;
                    margin: 0 auto;
                    border: 1px #e0e0e0 solid;
                    
                    ul{
                       
                        
                        &:nth-child(2n-1){
                            background: #f5f5f5;
                        }
                        width: 100%;
                         overflow: hidden;
                        li{
                            &:nth-child(1){
                                width: 20%;
                                padding: 0 0.2rem;
                                box-sizing: border-box;
                            }
                            
                            
                            float: left;
                            width: 80%;
                            height:0.4rem;
                            font-size:0.18rem;
                            text-align:  left;
                            line-height:0.4rem; 
                            color:#666666; 
                            box-sizing: border-box;
                             &:last-child{
                                border-right: none;
                            }
                            
                        }
                    }
                }
        }

       
        .eva_input{
            width:100%;
            height:0.64rem;
            background:#f0f0f0;
            input{
                float:left;
                width:5.8rem;
                height:0.48rem;
                background:#fff;
                border-radius:0.48rem;
                margin:0.08rem;
                border:none;
                padding:0 0.4rem;
                box-sizing:border-box;
            }
            button{
                float:right;
                width:1.2rem;
                height:0.48rem;
                text-align:center;
                background:#eb1e24;
                color:#fff;
                margin:0.08rem 0.15rem 0.08rem 0.08rem;
                line-height:0.48rem;
                border:none;
                border-radius:0.1rem;
            }
        }
        .eva_list-m{
            width:100%;
            ul{
                li{
                    width:100%;
                    font-size:0.18rem;
                    overflow:hidden;
                    border-bottom:1px solid #fcdbdc;
                    .img{
                        width:0.85rem;
                        float:left;
                        img{
                            width:.47rem;
                            height:0.47rem;
                            margin:0.15rem;
                        }
                    }
                    .name{
                        width:6.1rem;
                        float:left;
                        font-size:0.24rem;
                        color:#787878;
                        margin-bottom:0.08rem;
                    }
                    .time{
                         width:6.1rem;
                        float:left;
                        font-size:0.18rem;
                        color:#a5a5a5;
                         margin-bottom:0.05rem;
                    }
                    .eva_text-m{
                         width:6.1rem;
                        float:left;
                        font-size:0.22rem;
                        color:#1d1d1d;
                        line-height:0.38rem;
                         margin-bottom:0.1rem;
                    }
                }
            }
        }
        .btn_submit{
            width:100%;
            height:0.97rem;
            background:#f0f0f0;
            position:fixed;
            bottom:0.98rem;
            left:0;
            padding:0 0.20rem;
            box-sizing:border-box;
            button{
                width:3.5rem;
                height:0.64rem;
                float:left;
                border-radius:0.64rem;
                border:none;
                color:#fff;
                margin-top:0.17rem;
                &:nth-child(1){
                    margin-right:0.05rem;
                    background:#ebb41e;
                }
                &:nth-child(2){
                    background:#eb1e24;
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
.middle_top .middle_top_left #smll_box img{
    width: 300px;
    height: 300px;
}

</style>