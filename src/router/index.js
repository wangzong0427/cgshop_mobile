import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Classify from '@/components/Classify'
import Vip from '@/components/Vip'
import My from '@/components/My'
import Order from '@/components/Order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/Classify',
      name: 'Classify',
      component: Classify
    }, {
      path: '/Vip',
      name: 'Vip',
      component: Vip
    }, {
      path: '/My',
      name: 'My',
      component: My
    },{
      path: '/Order',
      name: 'Order',
      component: Order
    }
  ]
})
