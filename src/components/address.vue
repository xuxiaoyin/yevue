<template>
	<div>
		
		<div class="common_title">
			<div class="text">新增收货地址</div>
		</div>
		<form action="" method="post" class="form">
			<div class="item">
				<div class="label">收货人：</div>
				<div class="input">
					<input type="text" v-model="consignee" placeholder="张晓明" />
				</div>
			</div>
			<div class="item">
				<div class="label">手机号码：</div>
				<div class="input">
					<input type="text" v-model="tel" placeholder="手机号码（必填）" />
				</div>
			</div>
			<!-- <div class="item">
				<div class="label">电子邮箱：</div>
				<div class="input">
					<input type="text" v-model="email" placeholder="请输入电子邮箱" />
				</div>
			</div> -->
			<div class="item">
				<div class="label">配送区域：</div>
				<div class="select_div"  v-if="bool" style="line-height:18px;">
					<area-cascader type="text" :level='lev' v-model="selected" :data="pcaa"></area-cascader>
				</div>
			</div>
			<div class="item" style="overflow:hidden;">
				<div class="label">配送地址：</div>
				<div class="textarea_div">
					<textarea type="text"v-model="address" placeholder="详细地址（必填）" ></textarea>
						
				</div>
			</div>
		<!-- 	<div class="item">
				<div class="label">邮政编码：</div>
				<div class="input">
					<input type="text" v-model="code" placeholder="请输入邮政编码" />
				</div>
			</div>	 -->
			<button class="user_info" v-if="status == 0" type="button" @click="add_address">保存</button>
			<button class="user_info"  v-if="status == 1" type="button" @click="edit_address">修改</button>
		</form>
		<div class="address_list" >
			<div class="title">已存收货地址</div>
			<table border="0" cellspacing="0" cellpadding="0">
				<thead>
					<tr>
						<td>收货人姓名</td>
						<td>详细地址</td>
						<!-- <td>电子邮箱</td>
						<td>邮政编码</td> -->
						<td>手机号码</td>
						<td>操作</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in address_list">
						<td>{{item.consignee}}</td>
						<td>{{item.address_name}},{{item.address}}</td>
						<!-- <td>{{item.email}}</td>
						<td>{{item.zipcode}}</td> -->
						<td>{{item.tel}}</td>
						<td><a href="javascript:void(0)" @click="change_address(index)">修改</a> | <a href="javascript:void(0)" @click="del(item.address_id)">删除</a> | <a href="javascript:void(0)" v-if="moren_id != item.address_id" @click="moren(item.address_id,item.user_id)">设为默认</a></td>
					</tr>
					
				</tbody>
			</table>
		</div>



		<div id="content-m" >
			<div class="address_list-m" v-show="!change">
				<ul>
					<li v-for="(item,index) in address_list" >
						<div class="container-m">
							<div class="name">{{item.consignee}}<span>{{item.tel}}</span></div>
							<div class="address-m">{{item.address_name}},{{item.address}}</div>
							<div class="edit">
								<span @click="change_address(index)"><img src="static/img/edit.png">编辑</span>
								<span @click="del(item.address_id)"><img src="static/img/delete.png">删除</span>
							</div>
						</div>
					</li>
					
				</ul>
			</div>
			<div class="add_new_address" @click="add_new" v-show="!change">+新增收货地址</div>

			<form action="" method="post" class="form1" v-show="change">
						
				<div class="item">
					<div class="label">收货人：</div>
					<div class="input">
						<input type="text" v-model="consignee" placeholder="张晓明" />
					</div>
				</div>
				<div class="item">
					<div class="label">手机号码：</div>
					<div class="input">
						<input type="text" v-model="tel" placeholder="手机号码（必填）" />
					</div>
				</div>
				<!-- <div class="item">
					<div class="label">电子邮箱：</div>
					<div class="input">
						<input type="text" v-model="email" placeholder="请输入电子邮箱" />
					</div>
				</div> -->
				<div class="item">
					<div class="label">配送区域：</div>
					<div class="select_div"  v-if="bool">
						<area-cascader type="text" :level='lev' v-model="selected" :data="pcaa"></area-cascader>
					</div>
				</div>
				<div class="item" style="overflow:hidden;">
					<div class="label">配送地址：</div>
					<div class="textarea_div">
						<textarea type="text"v-model="address" placeholder="详细地址（必填）" ></textarea>
							
					</div>
				</div>
				<button class="user_info" v-if="status == 0" type="button" @click="add_address">保存</button>
			<button class="user_info"  v-if="status == 1" type="button" @click="edit_address">修改</button>
			</form>
		</div>

		
	</div>
</template>
<script>
	import { AreaCascader } from "vue-area-linkage"
    import { pca, pcaa } from 'area-data'
	export default {
		name:"adress",
		data(){
			return {
				address_list:[],
				selected: [], //数组对应的就是选中的那个省市区。根据type来确定是省市区汉字的数组还是编码组成的数组。
              //selected[0]省。selected[1]市。selected[2]区。
				pca: pca,
				pcaa: pcaa,
				lev:1,
				consignee:'',
				address:'',
				tel:'',
				email:'',
				code:'',
				status:0,
				moren_id:'',
				this_id:'',
				bool:true,
				change:false


			}
		},
		created(){
			this.get_address()
		},
		methods:{
			moren(add_id,user_id){
				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					method:'post',
					url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=morendizhi',
					params:{
						address_id:add_id,
						user_id:user_id
					}
				})
				.then((res)=>{
					console.log(res)
					this.get_address()
					if(res.data.success == 1){
						alert(res.data.msg)
						
					}
				})
			},
			add_new(){
				this.change = true;
			},
			change_address(index){
				this.bool = false;
				this.change = true;
				this.selected = [];
				this.status = 1;
				this.selected = this.address_list[index].address_name.split(',');
				this.this_id = this.address_list[index].address_id;
				this.consignee = this.address_list[index].consignee
				this.address = this.address_list[index].address
				this.tel = this.address_list[index].tel
				this.consignee = this.address_list[index].consignee;
				
				 var t = setTimeout(() => {this.bool = true},0);
				
			},
			edit_address(){
				if(this.selected.length == 0){
					alert('请选择收货区域')
					return false
				}
				if(this.consignee == ''){
					alert('请填写姓名')
					return false
				}
				if(this.tel == ''){
					alert('请填写联系电话')
					return false
				}
				if(this.address == ''){
					alert('请填写具体收货地址')
					return false
				}

				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					method:'post',
					url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=act_edit_address',
					params:{
						address_id:this.this_id,
						address_name:this.selected.join(','),
						consignee:this.consignee,
						address:this.address,
						tel:this.tel,
						openid:userInfo.openid
					}
				})
				.then((res)=>{
					console.log(res)
					if(res.data.success == 1){
						alert(res.data.msg)
						this.get_address()
						this.change = false
					}
				})
			},
			add_address(){
				if(this.selected.length == 0){
					alert('请选择收货区域')
					return false
				}
				if(this.consignee == ''){
					alert('请填写姓名')
					return false
				}
				if(this.tel == ''){
					alert('请填写联系电话')
					return false
				}
				if(this.address == ''){
					alert('请填写具体收货地址')
					return false
				}

				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
					method:'post',
					url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=act_edit_address',
					params:{
						address_id:0,
						address_name:this.selected.join(','),
						consignee:this.consignee,
						address:this.address,
						tel:this.tel,
						openid:userInfo.openid
					}
				})
				.then((res)=>{
					console.log(res)
					if(res.data.success == 1){
						alert(res.data.msg)
						this.get_address()
						this.change = false
					}
				})
			},
			get_address(){
				var that = this;

				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				this.$axios({
				    method: 'post',
				    url:that.GLOBAL.url+'ziyu.php?Action=address_list',
				    params:{
				    	openid:userInfo.openid
				    }
				}).then((res)=>{
				    console.log(res);
				    that.address_list = res.data;
				    this.$axios({
				    	method:'post',
				    	url:'http://cy.gzziyu.com/mobile/ziyu.php?Action=address_id',
				    	params:{
				    		openid:userInfo.openid
				    	}
				    })
				    .then((res)=>{
				    	console.log(res)
				    	this.moren_id = res.data
				    })
				    

				}).catch((err) =>{
			        console.log(err);
			      });
			},
			del(id){

				var that = this;

				var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
				var con = confirm('确定删除吗？')
				if(!con){
					return false
				}
				this.$axios({
				    method: 'post',
				    url:that.GLOBAL.url+'ziyu.php?Action=drop_consignee',
				    params:{
				    	address_id:id,

				    }
				}).then((res)=>{
				    console.log(res);
				    alert(res.data.msg)
				    that.get_address()

				}).catch((err) =>{
			        console.log(err);
			      });
			}
		}
	}
</script>
<style lang="scss"  scoped>


.contant_right{
    width: 1050px;
    float: left;
    .common_title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom:1px #f2f2f2 solid;
        .text{
            font-size: 16px;
            width: 100px;
            text-align: center;
            height: 100%;
            border-bottom:1px solid #ee0a0d;
            color: #ee0a0d;
            float: left;
        }
    }
    form{
        width: 680px;
        margin-top: 30px;
            .item{
                width: 100%;
                clear:both;
                min-height:40px;
                margin-bottom: 21px;
                overflow:visible;
                .label{
                    width: 100px;
                    float: left;
                    text-align: right;
                    color: #616161;
                    line-height: 40px;
                    margin-right: 20px;
                    font-size: 14px;
                }
                .input{
                    float: left;
                    width: 520px;
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
                    width: 520px;
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
                        margin-bottom:20px;
                    }
                }
                .select_div{
                     float: left;
                    width: 520px;
                    height: 39px;
                    line-height: 40px;
                     border-radius: 5px;
                     select{
                         width: 257px;
                         height: 100%;
                         border:1px #cbcaca solid;
                         border-radius: 5px;
                         box-sizing: border-box;
                     }
                }
                .input_code{
                    float: left;
                    width: 397px;
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
.area-select .area-selected-trigger{
	    padding: 0 20px 0 12px;
}

	button.user_info{
    width: 81px !important;
    height: 40px;
    background: #ee0a0d;
    border: none;
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
    display: block;
    margin: 0 !important;
    margin-top:25px !important;
    margin-left:28px !important;
}
.address_list{
    width: 1060px;
    margin-top: 45px;
    .title{
        width: 100%;
        height: 45px;
        color: #090909;
        line-height: 45px;
        font-size: 16px;
    }
    table{
        border:1px #ebe8e8 solid;
        width: 100%;
        margin-bottom: 50px;
        thead{
            tr{
                background: #f0f0f0;
                height: 40px;
                td{
                    color: #191919;
                    text-align: center;
                    height: 40px;
                }
            }
        }
        tr{
            width: 100%;
            td{
                
            }
            td:nth-child(1){
                width: 125px;
            }
            td:nth-child(2){
                width: 300px;
            }
            td:nth-child(3){
                width: 200px;
            }
            td:nth-child(4){
                width: 120px;
            }
            td:nth-child(5){
                width: 150px;
            }
            td:nth-child(6){
                width: 155px;
            }
        }
        tbody{
            tr{
                
              td{
                  height: 85px;
                  text-align: center;
                  color: #767676;
                  border-bottom: 1px #e5e5e5 solid;
              }  
            }
        }
       
    }
}
#content-m{
	display:none
}

@media only screen and (max-width:750px){
	ul.cascader-menu-list{
		min-width:2rem;
		width:2rem;
	}
	.contant_right{
		width:7.5rem;
	}
	#content{
		display:none
	}
	#contant-m{
		display:block !important;
	}
	.contant_right{
		width:7.5rem;
	}
	.form{
		display:none;
	}
	.address_list{
		display:none;
	}
	.common_title{
		display:none;
	}

    #content-m{
    	display:block;
         padding-top: 0.87rem;
        padding-bottom: 0.98rem;
        width: 7.5rem;
        .address_list-m{
            width:100%;
            ul{
                 width:100%;
                li{
                     width:100%;
                     background:#fff;
                     height:2.45rem;
                     border-bottom:0.15rem solid #f3f3f3;
                     .name{
                        width:100%;
                        font-size:.28rem;
                        color:#474747;
                        line-height:1rem;
                        span{
                            float:right;
                            
                        }
                     }
                     .address-m{
                        width:100%;
                        font-size:.28rem;
                        color:#474747;
                        line-height:0.6rem;
                        border-bottom:1px solid #e9e9e9;
                     }
                     .edit{
                         font-size:.28rem;
                        color:#474747;
                        text-align:right;
                        line-height:0.9rem;
                        span{
                            display:inline-block;
                            margin-left:0.5rem;
                            img{
                                width:0.27rem;
                                height:0.27rem;
                                margin-right:0.05rem;
                            }
                        }
                     }

                }
            }
        }
        .add_new_address{
            width:2.95rem;
            height:0.64rem;
            background:#eb1e24;
            line-height:0.64rem;
            text-align:center;
            color:#fff;
            font-size:0.32rem;
            border-radius:0.1rem;
            margin:0.88rem auto;
        }
    }

    .label{
			width:1.3rem !important;
			margin-right:0.2rem !important;
		}
		.input{
			width:6rem !important;
		}
}


</style>