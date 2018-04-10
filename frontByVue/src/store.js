import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isScrolled: false
  },
  getters: {
    getScrolled (state) {
      return state.isScrolled
    }
  },
  mutations: {
    scrollIsTrue (state) {
      state.isScrolled = true
    },
    scrollIsFalse (state) {
      state.isScrolled = false
    }
  }
})
