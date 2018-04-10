import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import navbar from '../components/navbar'
import login from '../components/login'

import VueScrollTo from 'vue-scrollto'

// You can also pass in the default options
Vue.use(Router)
Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        default: index,
        nav: navbar
      }
    },
    {
      path: '/login',
      components: {
        default: login,
        nav: navbar
      }
    }
  ]
})
