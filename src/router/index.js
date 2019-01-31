import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import About from '@/components/About'
import Uncertainty from '@/components/Uncertainty/Uncertainty'
import UncertaintySingle from '@/components/Uncertainty/Single'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/uncertainty',
      component: Uncertainty,
    },
    {
      path: '/uncertainty/single',
      component: UncertaintySingle
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
