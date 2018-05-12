import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store'
import index from '../components/index'
import navbar from '../components/navbar'
import login from '../components/login'
import signUp from '../components/signUp'
import dashboard from '../components/dashboard'
import dashboardLayout from '../components/dashboardLayout'
import upload from '../components/upload'
import refine from '../components/refine'
import projectList from '../components/projectList'

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

const requireAuth = (from, to, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  if (isAuthenticated) return next()
  next('/login')
}

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
    },
    {
      path: '/signUp',
      components: {
        default: signUp,
        nav: navbar
      }
    },
    {
      path: '/dashboard',
      components: {
        default: dashboard,
        nav: dashboardLayout
      },
      beforeEnter: requireAuth
    },
    {
      path: '/upload',
      components: {
        default: upload,
        nav: dashboardLayout
      },
      beforeEnter: requireAuth
    },
    {
      path: '/refine/:projectId',
      components: {
        default: refine,
        nav: dashboardLayout
      },
      beforeEnter: requireAuth
    },
    {
      path: '/list/:page?/:filter?/:category?',
      components: {
        default: projectList,
        nav: dashboardLayout
      },
      beforeEnter: requireAuth
    }
  ]
})
