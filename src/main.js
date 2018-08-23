import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import './assets/css/basic.scss'
import VueSocketio from 'vue-socket.io'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueSocketio, 'http://a.itying.com')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
