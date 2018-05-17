import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store'
import index from '../components/index'
import navbar from '../components/navbar'
import login from '../components/login'
import signUp from '../components/signUp'
import loginedNavbar from '../components/loginedNavbar'
import dashboard from '../components/dashboard'
import upload from '../components/upload'
import refine from '../components/refine'
import projectList from '../components/projectList'
import collect from '../components/collect'

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
        nav: loginedNavbar
      },
      beforeEnter: requireAuth
    },
    {
      path: '/upload',
      components: {
        default: upload,
        nav: loginedNavbar
      },
      beforeEnter: requireAuth
    },
    {
      path: '/refine/:projectId?',
      components: {
        default: refine,
        nav: loginedNavbar
      },
      beforeEnter: requireAuth
    },
    {
      path: '/collect/:projectId?',
      components: {
        default: collect,
        nav: loginedNavbar
      },
      beforeEnter: requireAuth
    },
    {
      path: '/list/:page?/:filter?/:category?/:sortedBy?',
      components: {
        default: projectList,
        nav: loginedNavbar
      },
      beforeEnter: requireAuth
    }
  ]
})
