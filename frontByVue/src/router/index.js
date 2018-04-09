import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import navbar from '../components/navbar'

Vue.use(Router)

export default new Router({
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
