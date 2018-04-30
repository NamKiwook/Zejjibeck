// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { store } from './store'
import VueCarousel from 'vue-carousel'

Vue.use(VueCarousel)
Vue.prototype.$http = axios
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    var accessToken = localStorage.accessToken
    if (!accessToken)
      return next()
    store.dispatch('login',accessToken)
    next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
