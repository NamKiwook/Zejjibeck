import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import navbar from '../components/navbar'
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

/* const scrollBehavior = function (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
} */

export default new Router({
  mode: 'history',
  // scrollBehavior,
  routes: [
    {
      path: '/',
      components: {
        default: index,
        nav: navbar
      }
    }
  ]
})
