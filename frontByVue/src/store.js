import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

var enhanceAccessToeken = () => {
  const {accessToken} = localStorage
  if (!accessToken) return
  axios.defaults.headers.common['x-access-token'] = accessToken
}

enhanceAccessToeken()

export const store = new Vuex.Store({
  state: {
    isScrolled: false,
    menuVisible: false,
    accessToken: null
  },
  getters: {
    getScrolled (state) {
      return state.isScrolled
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
