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
    isLoading: false,
    isScrolled: true,
    menuVisible: false,
    accessToken: null,
    username: null,
    userProfile: null
  },
  getters: {
    getIsLoading (state) {
      return state.isLoading
    },
    getScrolled (state) {
      return state.isScrolled
    },
    getUsername (state) {
      state.username = state.username || localStorage.username
      return state.username
    },
    getUserProfile (state) {
      state.userProfile = state.userProfile || localStorage.userProfile
      return state.userProfile
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
    isLoadingTrue (state) {
      state.isLoading = true
    },
    isLoadingFalse (state) {
      state.isLoading = false
    },
    scrollIsTrue (state) {
      state.isScrolled = true
    },
    username (state, username) {
      state.username = username
      localStorage.username = username
    },
    userProfile (state, userProfile) {
      state.userProfile = userProfile
      localStorage.userProfile = userProfile
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
      delete localStorage.userProfile
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
