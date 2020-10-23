import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || null
  },
  actions: {
    UpdateToken (context, token) {
      context.commit('UPDATETOKEN', token)
    }
  },
  mutations: {
    UPDATETOKEN (state, token) {
      state.token = token
    }
  },
  getters: {
    token: state => state.token
  }
})
