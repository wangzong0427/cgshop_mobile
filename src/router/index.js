import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Classify from '@/components/Classify'
import Vip from '@/components/Vip'
import Shop from '@/components/Shop'
import My from '@/components/My'

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
      path: '/Shop',
      name: 'Shop',
      component: Shop
    }, {
      path: '/My',
      name: 'My',
      component: My
    }
  ]
})
