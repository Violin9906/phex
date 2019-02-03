import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import About from '@/components/About'

import Uncertainty from '@/components/Uncertainty/Uncertainty'
import UncertaintySingle from '@/components/Uncertainty/Single'

import Regression from '@/components/Regression/Regression'
import RegressionLinear from '@/components/Regression/Linear'

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
      component: Uncertainty
    },
    {
      path: '/uncertainty/single',
      component: UncertaintySingle
    },
    {
      path: '/regression',
      component: Regression
    },
    {
      path: '/regression/linear',
      component: RegressionLinear
    }
  ]
})
