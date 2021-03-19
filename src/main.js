import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui'
import JsonExcel from 'vue-json-excel'
import NProgress from 'nprogress'
import vuetify from './plugins/vuetify'
import * as echarts from 'echarts'
import 'echarts-extension-amap'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import './assets/font/iconfont.css'
import 'nprogress/nprogress.css'

import axios from 'axios'
// axios.defaults.baseURL = 'localhost:5000'
axios.interceptors.request.use((config) => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

axios.interceptors.response.use((config) => {
  NProgress.done()
  if (config.data.meta.msg === 'invalidToken') {
    window.sessionStorage.clear()
    return router.push('/login')
  } else {
    return config
  }
})
Vue.prototype.$AMap = window.AMap
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.component('downloadExcel', JsonExcel)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
