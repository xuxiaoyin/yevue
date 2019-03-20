// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element, { size: 'small', zIndex: 3000 });
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import 'vue-social-share/dist/client.css';
import store from './store/store'

import global_ from './components/global'//引用文件
Vue.prototype.GLOBAL = global_;//挂载到Vue实例上面
Vue.use(VueAwesomeSwiper)
import Search from "./components/search"   //引入组件

Vue.component("Search",Search);
Vue.use(require('vue-wechat-title'))

import VueAreaLinkage from 'vue-area-linkage';
import 'vue-area-linkage/dist/index.css';
Vue.use(VueAreaLinkage)


import Share from 'vue-social-share'
Vue.use(Share)

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;// 将axios配置成vue的原型
Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
	if(to.path == '/cart' || to.path.indexOf("/user") != -1){
		if (!sessionStorage.getItem('userInfos')) {
	    	console.log(store.state.userInfo)

	      next({ path: '/login?id=1' })
	    } else {
	      next()
	    }
	}else{
		next()
	}
  
})


Vue.prototype.changeData = function (){

	if (!sessionStorage.getItem('userInfos')) {
			    	
		store.commit('cart_num',0)
      return false
    }
	var userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
    axios({
		url:'https://cy.gzziyu.com/mobile/ny_flow_cart.php?action=get_cart_info',
		method:'post',
		params:{
			openid:userInfo.openid
		}
	})
	.then((res)=>{
		var len = res.data.goods_list?res.data.goods_list.length:0;
		console.log(res.data)
		console.log('len',len)
		store.commit('cart_num',len)
		
	})
	
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
