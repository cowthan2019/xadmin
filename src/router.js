import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Layout from '@/components/Layout.vue'

import Home from '@/views/home'
import Member from '@/views/member'
import Banner from '@/views/banner'
import Version from '@/views/version'
import DevConfFileOss from '@/views/devconf/index-file-oss'
import DevConfFileQiniu from '@/views/devconf/index-file-qiniu'
import DevConfMailDirectMail from '@/views/devconf/index-email-aliyun'
import DevConfMailSendCloud from '@/views/devconf/index-email-sendcloud'
import DevConfMailQQ from '@/views/devconf/index-email-qq'
import DevConfSmsAliyun from '@/views/devconf/index-sms-aliyun'
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
      path: '/devconf-file-oss',
      component: Layout,
      children: [
        {
          path: '/',
          component: DevConfFileOss,
          meta: { title: '文件系统-OSS' }
        }
      ]
    },
    {
      path: '/devconf-file-qiniu',
      component: Layout,
      children: [
        {
          path: '/',
          component: DevConfFileQiniu,
          meta: { title: '文件系统-七牛' }
        }
      ]
    },
    {
      path: '/devconf-email-sendcloud',
      component: Layout,
      children: [
        {
          path: '/',
          component: DevConfMailSendCloud,
          meta: { title: '邮件-阿里云DirectMail' }
        }
      ]
    },
    {
      path: '/devconf-email-aliyun',
      component: Layout,
      children: [
        {
          path: '/',
          component: DevConfMailDirectMail,
          meta: { title: '邮件-阿里云DirectMail' }
        }
      ]
    },
    {
      path: '/devconf-email-qq',
      component: Layout,
      children: [
        {
          path: '/',
          component: DevConfMailQQ,
          meta: { title: '邮件-QQ邮箱' }
        }
      ]
    },
    {
      path: '/devconf-sms-aliyun',
      component: Layout,
      children: [
        {
          path: '/',
          component: DevConfSmsAliyun,
          meta: { title: '短信-阿里云' }
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
