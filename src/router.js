import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Layout from '@/components/Layout.vue'

import Home from '@/views/home'
import Member from '@/views/member'
import Banner from '@/views/banner'
import Version from '@/views/version'
Vue.use(Router)

export default new Router({
  mode: 'history', // 会省略url里的#/hash，url能好看点
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/home', // 默认重定向，当打开路由/时，会自动重定向到其子路由Home

      // 定义子路由方式1
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: { title: '首页' }
        }

      ]
    },

    // 定义子路由方式2, 访问方式： /member/
    {
      path: '/member',
      component: Layout,
      children: [
        {
          path: '/',
          component: Member,
          meta: { title: '会员管理' }
        }
      ]
    },
   
   
    {
      path: '/banner',
      component: Layout,
      children: [
        {
          path: '/',
          component: Banner,
          meta: { title: '轮播图管理' }
        }
      ]
    },
  
    
    {
      path: '/version',
      component: Layout,
      children: [
        {
          path: '/',
          component: Version,
          meta: { title: '应用升级' }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }

  ]
})
