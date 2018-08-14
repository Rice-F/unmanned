import Vue from 'vue'
// 1.引入路由
import Router from 'vue-router'

// 3.创建、引入组件
import Cart from 'components/Cart'
import Home from 'components/Home'
import Hot from 'components/Hot'
import Order from 'components/Order'
import Particulars from 'components/Particulars'
import Search from 'components/Search'
import Start from 'components/Start'
import EditOrderInfo from 'components/EditOrderInfo'

// 2.use路由
Vue.use(Router)

// 4.配置路由
export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'start'
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/hot',
      component: Hot
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/particulars',
      component: Particulars
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/start',
      component: Start
    },
    {
      path: '/editorderinfo',
      component: EditOrderInfo
    }
  ]
})
