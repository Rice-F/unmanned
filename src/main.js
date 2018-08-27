import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import './assets/css/basic.scss'
import VueSocketio from 'vue-socket.io'
import storage from './model/storage'

// 获取url传来的桌号
let roomId = window.location.hash.split('=')[1]
// 将桌号保存在localstorage中
storage.set('roomId', roomId)

Vue.config.productionTip = false
Vue.use(VueResource)
// 建立连接时拼接桌号roomId
Vue.use(VueSocketio, 'http://a.itying.com?roomid=' + roomId)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
