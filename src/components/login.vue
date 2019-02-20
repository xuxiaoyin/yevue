<template>
	<div>
        <div id="content">
            <div class="router">
                <div class="container">
                    <a href="###">首页</a>><a href="###">登录</a>
                    
                </div>
                
            </div>
            <div class="login">
                <div class="tab">
                    <ul>
                        <li @click="change_active(0)" :class="active_num==0?'active':''">注册</li>
                        <li @click="change_active(1)" :class="active_num==1?'active':''">登录</li>
                    </ul>
                </div>
                <div class="tab_div" :class="active_num==0?'tab_active':''">
                    <div class="title">手机扫码，安全注册</div>
                    <div class="erweima_img">
                        <img src="https://cy.gzziyu.com//mobile//erweima//1544095924.jpg"/>
                    </div>
                    <div class="reg_tip">
                        打开<span>微信</span> <br>扫一扫注册
                    </div>
                </div>
                <div class="tab_div " :class="active_num==1?'tab_active':''">
                    <form action="">
                        <div class="item">
                            <div class="label">
                                用户名:
                            </div>
                            <div class="input">
                                <input type="text" v-model="user_name" name="" id="" value="" placeholder="请输入用户名或者手机号码" />
                            </div>
                        </div>
                        <div class="item">
                            <div class="label">
                                密码:
                            </div>
                            <div class="input">
                                <input type="password" v-model="password" name="" id="" value=""  placeholder="请输入密码"/>
                            </div>
                        </div>
                        <!-- <div class="item">
                            <div class="label">
                                验证码:
                            </div>
                            <div class="input_code">
                                <input type="text" name="" id="" value="" placeholder="请输入验证码" />
                            </div>
                            <div class="code_img"><img src="img/code.png"/></div>
                        </div> -->
                            <button type="button" @click="login" >登录</button>
                    </form>
                    <div class="tip">还不是会员？  <a href="javascript:void(0)" @click="change_active(0)">立即注册</a>  <router-link to="/wang_password"> 忘记密码？</router-link></div>
                </div>
                
            </div>
            
            
            
        
        </div>
        <div id="contant-m">
            <div class="login">
                <div class="tab1">
                    <ul>
                       <li @click="change_active(0)" :class="active_num==0?'active':''">注册</li>
                        <li @click="change_active(1)" :class="active_num==1?'active':''">登录</li>
                    </ul>
                </div>
                <div class="tab_div1 " :class="active_num==0?'tab_active':''">
                    <div class="title">手机扫码，安全注册</div>
                    <div class="erweima_img">
                        <img src="img/erweima.png"/>
                    </div>
                    <div class="reg_tip">
                        打开<span>微信</span> <br>扫一扫注册
                    </div>
                </div>
                <div class="tab_div1" :class="active_num==1?'tab_active':''">
                    <form action="">
                        <div class="item">
                            <div class="label">
                                用户名:
                            </div>
                            <div class="input">
                                <input type="text" v-model="user_name" name="" id="" placeholder="请输入用户名或者手机号码" />
                            </div>
                        </div>
                        <div class="item">
                            <div class="label">
                                密码:
                            </div>
                            <div class="input">
                                <input type="password" v-model="password" name="" id="" value="" placeholder="请输入密码"/>
                            </div>
                        </div>
                       
                            <button type="button"  @click="login" >登录</button>
                    </form>
                     <div class="tip">还不是会员？  <a href="javascript:void(0)" @click="change_active(0)">立即注册</a>  <router-link to="/wang_password"> 忘记密码？</router-link></div>
                </div>
                
            </div>
        </div>   
    </div>
</template>
<script>
    import axios from "axios"
     import store from '@/store/store'
    export default {
        name:"login",
        data(){
            return {
                password:'',
                user_name:'',
                active_num:0
            }
        },
        watch: {
            $route(to,next) {
                console.log(to)
                this.active_num = to.query.id
            }
        },
        methods:{
            change_active(index){
                this.active_num = index
            },
            login(){
                var that = this;
                
                axios.get('https://cy.gzziyu.com/mobile/pcindex.php?Action=login',{
                    params:{
                        username:that.user_name,
                        password:that.password
                    }
                })
                .then((res)=>{
                    console.log(res);
                    if(res.data.success == 1){
                        var Info = {
                            user_name:that.user_name,
                            openid:res.data.openid
                        };
                        sessionStorage.setItem('userInfos',JSON.stringify(Info));
                        store.commit('userInfos',Info)
                        that.$router.push('/')
                         location.reload()
                    }else{
                        alert(res.data.msg)
                    }
                })
                .catch((res)=>{
                    console.log(res);
                })
            }
        }
    }
</script>
<style lang="scss">
	#content{
        background: #f2f2f2;
        width: 100%;
        height: 700px;
    }

.login{
    font-size:12px;
    width: 802px;
    height: 462px;
    background: #fff;
    margin: 0 auto;
    .tab{
      width: 100%;
      height: 44px;
      border:2px #f2f2f2 solid;
      ul{
          width: 100%;
          height: 100%;
          text-align: center;
          li{
              display: inline-block;
              width: 100px;
              color: #7f7f7f;
              line-height: 44px;
              cursor: pointer;
              &.active{
                  color:#ee0a0d ;
                  border-bottom:2px #ee0a0d solid;
              }
          }
      }  
    }
    
    .tab_div{
        display: none;
        width: 410px;
        margin: 50px auto;
        .title{
            width: 100%;
            text-align: center;
            font-size: 16px;
            color: #333333;
            font-weight: bold;
            margin: 40px 0 20px 0;
            
        }
        .erweima_img{
            width: 195px;
            height: 195px;
            margin: 0 auto;
            border:1px #ececec solid;
                box-shadow:1px 1px 1px #ececec,1px -1px 1px #ececec,-1px 1px 1px #ececec,-1px -1px 1px#ececec;
            img{
                width: 140px ;
                height: 140px;
                margin: 27px;
            }
        }
        .reg_tip{
            text-align: center;
            font-size: 14px;
            color: #999999;
            margin-top: 24px;
            span{
                color: #ee0a0d;
            }
        }
        form{
            .item{
                width: 100%;
                height: 40px;
                margin-bottom: 21px;
                .label{
                    width: 70px;
                    float: left;
                    text-align: right;
                    color: #616161;
                    line-height: 40px;
                    margin-right: 20px;
                }
                .input{
                    float: left;
                    width: 320px;
                    box-sizing: border-box;
                    border:1px #cbcaca solid;
                    height: 40px;
                    line-height: 40px;
                    overflow:hidden;
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
                .input_code{
                    float: left;
                    width: 190px;
                    box-sizing: border-box;
                    border:1px #cbcaca solid;
                    height: 40px;
                    line-height: 40px;
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
                .code_img{
                    float: left;
                    width: 120px;
                    height: 40px;
                    margin-left:10px ;
                    img{
                        width: 100%;
                        height: 40px;
                    }
                }
            }
            button{
                cursor:pointer;
                width: 116px;
                height: 40px;
                background: #ee0a0d;
                border: none;
                color: #fff;
                font-size: 16px;
                border-radius: 5px;
                display: block;
                margin: 40px auto;
            }
        }
        .tip{
            text-align: center;
            color: #ee0a0d;
            font-size: 12px;
        }
       
    }
    .tab_active{
        display: block;
    }
}



@media only screen and (max-width:750px){
    #contant-m{
        padding-top: 0.87rem;
        padding-bottom: 0.98rem;
        width: 100%;
        .login{
            width: 100%;
            height: 4.62rem;
            background: #fff;
            margin: 0 auto;
            .tab1{
              width: 100%;
              height: 0.44rem;
              border:2px #f2f2f2 solid;
              ul{
                  width: 2rem;
                  margin: 0 auto;
                  height: 100%;
                  text-align: center;
                  li{
                      float: left;
                      width: 1rem;
                      color: #7f7f7f;
                      line-height: 0.44rem;
                      font-size: 0.16rem;
                      cursor: pointer;
                      &.active{
                          color:#ee0a0d ;
                          border-bottom:2px #ee0a0d solid;
                      }
                  }
              }  
            }
            
            .tab_div1{
                display: none;
                width: 4.1rem;
                margin: 0.5rem auto;
                .title{
                    width: 100%;
                    text-align: center;
                    font-size: 0.16rem;
                    color: #333333;
                    font-weight: bold;
                    margin: 0.4rem 0 0.2rem 0;
                    
                }
                .erweima_img{
                    width: 1.95rem;
                    height: 1.95rem;
                    margin: 0 auto;
                    border:1px #ececec solid;
                        box-shadow:1px 1px 1px #ececec,1px -1px 1px #ececec,-1px 1px 1px #ececec,-1px -1px 1px#ececec;
                    img{
                        width: 1.4rem ;
                        height: 1.4rem ;
                        margin: 0.27rem;
                    }
                }
                .reg_tip{
                    text-align: center;
                    font-size: 0.14rem;
                    color: #999999;
                    margin-top: 0.24rem;
                    span{
                        color: #ee0a0d;
                    }
                }
                form{
                    .item{
                        width: 100%;
                        height: 0.4rem;
                        margin-bottom: 0.21rem;
                        .label{
                            width: 0.7rem;
                            float: left;
                            text-align: right;
                            color: #616161;
                            line-height: 0.4rem;
                            margin-right: 0.2rem;
                            font-size: 0.16rem;
                        }
                        .input{
                            float: left;
                            width: 3.2rem;
                            box-sizing: border-box;
                            border:1px #cbcaca solid;
                            height: 0.4rem;
                            line-height: 0.4rem;
                            input{
                                width: 100%;
                                height: 100%;
                                float: left;
                                border: none;
                                background: none;
                                padding: 0 0.1rem;
                                line-height: 0.4rem;;
                                
                            }
                        }
                        .input_code{
                            float: left;
                            width: 1.9rem;
                            box-sizing: border-box;
                            border:1px #cbcaca solid;
                            height: 0.4rem;
                            line-height: 0.4rem;
                            input{
                                width: 100%;
                                height: 100%;
                                float: left;
                                border: none;
                                background: none;
                                padding: 0 0.1rem;
                                line-height: 0.4rem;
                                
                            }
                            
                        }
                        .code_img{
                            float: left;
                            width: 1.2rem;
                            height: 0.4rem;
                            margin-left:0.1rem ;
                            img{
                                float: left;
                                width: 100%;
                                height: 0.4rem;
                            }
                        }
                    }
                    button{
                        width: 1.16rem;
                        height: 0.4rem;
                        background: #ee0a0d;
                        border: none;
                        color: #fff;
                        font-size: 0.16rem;
                        border-radius: 0.05rem;
                        display: block;
                        margin: 0.4rem auto;
                    }
                }
                .tip{
                    text-align: center;
                    color: #ee0a0d;
                    font-size: 0.12rem;
                }
               
            }
            .tab_active{
                display: block;
            }
        }


    }
}

</style>