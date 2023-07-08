import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入 bootstrap 全局样式
import 'bootstrap/dist/css/bootstrap.min.css'
// 1. 下载axios库, main.js - 全局绑定属性 (确保任意.vue文件可以都访问到这个axios方法)
import axios from 'axios'
// 2. 基础地址
axios.defaults.baseURL = 'https://applet-base-api-t.itheima.net'
// 3. axios方法添加到Vue的原型上
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
