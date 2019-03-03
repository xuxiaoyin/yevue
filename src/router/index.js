import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import User from '@/components/user'
import m_user from '@/components/m-user'
import user_info from '@/components/user_info'
import change_password from '@/components/change_password'
import phone_bind from '@/components/phone_bind'
import address from '@/components/address'

import About from "@/components/about_me"
import footer_detail from "@/components/footer_detail"
import zixun from "@/components/zixun"
import zixun_detail from "@/components/zixun_detail"
import hangqingDetail from "@/components/hangqing_detail"
import hangqing from "@/components/hangqing"
import zhishu from "@/components/zhishu"
import tuan from "@/components/tuan"
import tuan_detail from "@/components/tuan_detail"
import shop from "@/components/shop"
import shop_detail from "@/components/shop_detail"
import cart from "@/components/cart"
import order from "@/components/order"
import order_detail from "@/components/order_detail"
// import order_eva from "@/components/order_eva"
import submit_order_success from "@/components/submit_order_success"
import submit_order from "@/components/submit_order"
import wenda from "@/components/wenda"
import wenda_detail from "@/components/wenda_detail"
import order_eva from "@/components/order_eva"
import qiugou from "@/components/qiugou"
import wang_password from "@/components/wang_password"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
    	path:'/login',
    	name:'Login',
    	component:Login
    },
     
    {
      path:'/about_me',
      name:'about_me',
      component:About
    },
     {
      path:'/footer_detail',
      name:'footer_detail',
      component:footer_detail
    },
    {
      path:'/hangqing_detail',
      name:'hangqing_detail',
      component:hangqingDetail,
      meta: {requiresAuth: true}
    },
    {
      path:'/hangqing',
      name:'hangqing',
      component:hangqing
    },
     {
      path:'/zhishu',
      name:'zhishu',
      component:zhishu
    },
    {
      path:'/shop',
      name:'shop',
      component:shop
    },
    {
      path:'/shop_detail',
      name:'shop_detail',
      component:shop_detail
    },
    {
      path:'/cart',
      name:'cart',
      component:cart
    },
    
    {
      path:'/order_eva',
      name:'order_eva',
      component:order_eva
    },
    {
      path:'/submit_order',
      name:'submit_order',
      component:submit_order
    },
      {
      path:'/submit_order_success',
      name:'submit_order_success',
      component:submit_order_success
    },
     {
      path:'/qiugou',
      name:'qiugou',
      component:qiugou
    },
    {
      path:'/zixun',
      name:'zixun',
      component:zixun,
    },
     {
      path:'/order_detail',
      name:'order_detail',
      component:order_detail
    },
    
    {
      path:'/zixun_detail',
      name:'zixun_detail',
      component:zixun_detail
    },
     {
      path:'/tuan',
      name:'tuan',
      component:tuan
    },
    {
      path:'/tuan_detail',
      name:'tuan_detail',
      component:tuan_detail
    },
    {
      path:'/wang_password',
      name:'wang_password',
      component:wang_password
    },
    {
      path:'/wenda',
      name:'wenda',
      component:wenda
    },
    {
      path:'/wenda_detail',
      name:'wenda_detail',
      component:wenda_detail
    },
    {
      path:'/m_user',
      name:'m_user',
      component:m_user
    },
    {
      path:'/user',
      name:'User',
      component:User,
      children:[
        {
          path:'/user/user_info',
          name:'user_info',
          component:user_info
        },
        {
          path:'/user/change_password',
          name:'change_password',
          component:change_password
        },
        {
          path:'/user/phone_bind',
          name:'phone_bind',
          component:phone_bind
        },
        {
          path:'/user/address',
          name:'address',
          component:address
        },
        {
          path:'/user/order',
          name:'order',
          component:order
        }
      ]
    }


  ]
})
