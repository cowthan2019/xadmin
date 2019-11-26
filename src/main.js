import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from '@/store'

Vue.use(ElementUI)
Vue.config.productionTip = process.env.NODE_ENV === 'production'
console.log('process.env.NODE_ENV = ' + process.env.NODE_ENV)
console.log('process.env.BASE_URL = ' + process.env.BASE_URL)

import '@/permission.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

