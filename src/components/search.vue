<template>
    <div class="seach-m">
            <div class="input">
                <div class="select">
                    <select name="" v-model="fenlei_id">
                        <option value="0">行情参考</option>
                        <option value="1">品牌批发</option>
                    </select>
                </div>
                <div class="keword">
                    <input type="text" placeholder="请输入关键字"  v-model="kewords"/>
                </div>
                <div class="seach_button"  @click="seach">
                    <img src="static/img/seach-m.png"/>
                </div>
            </div>
            <div class="kefu_m">
                <a  target="new_window" :href="'http://wpa.qq.com/msgrd?v=3&uin='+kefuqq+'&site=qq&menu=yes'"><img src="static/img/kefu_m.png"/></a>
            </div>
        </div>
</template>
<script>
    export default{
    	name:'search',
      data(){
        return {
          kewords:'',
          fenlei_id:0,
          kefuqq:''
        }
      },
      created(){
        this.get_info()
      },
      methods:{
        get_info(){
              let that = this;
              this.$axios({
                url:'http://cy.gzziyu.com/mobile/pcindex.php?Action=siteweb',
                method:'post'
              })
              .then((res)=>{
                console.log(res)
                res.data.map(function (item) {
                  
                  if(item.code == "qq"){
                    that.kefuqq = item.value
                  }
                  
                })
               
              })
            },
         seach(){
          if(this.fenlei_id ==1){
             this.$router.push({name:'hangqing',query:{keyword:this.kewords}})
          }else{
            this.$router.push({name:'shop',query:{keyword:this.kewords}})
          }
         
        },
      }
    }
</script>
<style lang="scss" scoped>
	 .seach-m{
               width: 100%;
               height:1.06rem;
               background: #f0f0f0;
               
              
               .input{
                   width: 5.76rem;
                   float: left;
                   margin: 0.2rem 0 0 0.23rem;
                   background: #fff;
                   border-radius: 0.05rem;
                   height: 0.6rem;
                   .select{
                       float: left;
                       width: 1.55rem;
                       height: 0.4rem;
                       margin-top: 0.1rem;
                       select{
                           float: left;
                           border: none;
                           text-align: center;
                           width: 100%;
                           height: 100%;
                           border-right:1px solid #d2d2d2;
                           option{
                               text-align: center;
                           }
                       }
                   }
                   .keword{
                       width: 3.6rem;
                       float: left;
                       height: 0.4rem;
                       margin-top: 0.1rem;
                       border: none;
                       input{
                           border: none;
                           background: none;
                           width: 100%;
                           height: 100%;
                           float: left;
                           line-height: 0.4rem;
                           padding: 0 0.1rem;
                           box-sizing: border-box;
                       }
                   }
                   .seach_button{
                       width: 0.4rem;
                       height: 0.4rem;
                       float: right;
                       margin: 0.1rem 0.1rem 0 0 ;
                       img{
                           width: 100%;
                           height: 100%;
                           float: left;
                       }
                   }
               }
               .kefu_m{
                   float: right;
                   width: 0.75rem;
                   height: 0.62rem;
                   margin: 0.17rem 0.25rem 0 0;
                   img{
                       width: 100%;
                       height: 100%;
                       float: left;
                   }
               }
           }
</style>