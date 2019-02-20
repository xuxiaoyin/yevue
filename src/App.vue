<template>
 <div id="app"  v-wechat-title="title">
    <m-header></m-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <m-footer></m-footer>
  </div>
</template>

<script>
import MHeader from '@/components/m-header'
import MFooter from '@/components/footer'

export default {
  name: 'App',
  components: {
    MHeader,
    MFooter
  },
  data(){
    return {
      title:''
    }
  },
  created(){
    this.get_title()
  },
  methods:{
    get_title(){
        this.$axios({
            url:'http://cy.gzziyu.com/mobile/pcindex.php?Action=siteweb',
            method:'post'
        })
        .then((res)=>{
            console.log(res)
            this.title = res.data[20].value
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
body, ul, html {
  margin: 0;
  padding: 0; }

a {
  text-decoration: none;
  color: #666666; }

p {
  margin: 0; }

li {
  list-style: none; }

input, textarea, button, select {
  outline: none; }

.container {
  width: 1200px;
  margin: 0 auto; font-size: 12px; }
</style>
