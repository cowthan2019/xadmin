/**
 * 权限校验
 * 用router的beforeEach拦截器
 *
 * to 即将要进入的路由对象
 * from：即将要离开的路由对象
 * next：是一个函数，可以指定路由地址进行跳转
 *
 */
import router from '@/router'
import { format } from 'url'

var pagesFree = ['/login', '/dam']

router.beforeEach((to, from, next) => {
  console.log('路由拦截 -- to ' + to.path + ' from ' + from.path)
  const token = localStorage.getItem('login-token')
  if (token) {
    if (pagesFree.indexOf(to.path) >= 0) {
      next()
    } else {
      // 登录了，且进入的是需要登录的页面
      // 这里的逻辑可能需要验证token，拉取userinfo等，基于具体业务
      next()
    }
  } else {
    // 拿不到登录的token
    if (pagesFree.indexOf(to.path) >= 0) {
      next()
    } else {
      // 是需要登录的页面
      next({ path: '/login' })
    }
  }
})
