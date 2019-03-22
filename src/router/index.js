import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/about',
      component: function (resolve) {
        require(['@/components/About'], resolve)
      }
    },
    {
      path: '/uncertainty',
      component: function (resolve) {
        require(['@/components/Uncertainty/Uncertainty'], resolve)
      }
    },
    {
      path: '/uncertainty/single',
      component: function (resolve) {
        require(['@/components/Uncertainty/Single'], resolve)
      }
    },
    {
      path: '/regression',
      component: function (resolve) {
        require(['@/components/Regression/Regression'], resolve)
      }
    },
    {
      path: '/regression/linear',
      component: function (resolve) {
        require(['@/components/Regression/Linear'], resolve)
      }
    },
    {
      path: '/stat',
      component: function (resolve) {
        require(['@/components/Stat/Stat'], resolve)
      }
    },
    {
      path: '/stat/sd',
      component: function (resolve) {
        require(['@/components/Stat/Sd'], resolve)
      }
    },
    {
      path: '/pedia',
      component: function (resolve) {
        require(['@/components/Pedia/Pedia'], resolve)
      }
    },
    {
      path: '/pedia/constants',
      component: function (resolve) {
        require(['@/components/Pedia/Constants'], resolve)
      }
    },
    /* {
      path: '/pedia/solver',
      component: function (resolve) {
        require(['@/components/Pedia/Solver'], resolve)
      }
    }, TODO */
    {
      path: '*',
      component: function (resolve) {
        require(['@/components/NotFound'], resolve)
      }
    }
  ]
})
