import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

var enhanceAccessToken = function () {
  var accessToken = localStorage.accessToken
  if (!accessToken) return
  axios.defaults.headers.common['x-access-token'] = accessToken
}

enhanceAccessToken()

export const store = new Vuex.Store({
  state: {
    isScrolled: true,
    menuVisible: false,
    accessToken: null,
    username: null
  },
  getters: {
    getScrolled (state) {
      return state.isScrolled
    },
    getUsername (state) {
      state.username = state.username || localStorage.username
      return state.username
    },
    menuIsVisible (state) {
      return state.menuVisible
    },
    isAuthenticated (state) {
      state.accessToken = state.accessToken || localStorage.accessToken
      if (state.accessToken != null) {
        return true
      } else {
        return false
      }
    }
  },
  mutations: {
    scrollIsTrue (state) {
      state.isScrolled = true
    },
    username (state, username) {
      state.username = username
      localStorage.username = username
    },
    scrollIsFalse (state) {
      state.isScrolled = false
    },
    menuToggle (state) {
      state.menuVisible = !state.menuVisible
    },
    login (state, accessToken) {
      state.accessToken = accessToken
      localStorage.accessToken = accessToken
    },
    logout (state) {
      state.accessToken = null
      delete localStorage.accessToken
      delete localStorage.username
    }
  },
  actions: {
    login ({commit}, accessToken) {
      axios.defaults.headers.common['x-access-token'] = accessToken
      commit('login', accessToken)
    },
    logout ({commit}) {
      axios.defaults.headers.common['x-access-token'] = undefined
      commit('logout')
    }
  }
})
