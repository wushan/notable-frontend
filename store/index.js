import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from 'axios'

const store = new Vuex.Store({
  state: {
    authUser: null,
    User: null
  },
  mutations: {
    SET_USER: function (state, user) {
      state.authUser = user
      localStorage.setItem('notable_token', user.data.id)
      localStorage.setItem('notable_user', user.data.userId)
    },
    SET_USERINFO: (state, user) => {
      state.User = user
    }
  },
  actions: {
    nuxtServerInit ({ commit }, { req }) {
      // if (req.authUser) {
      //   commit('user', req.authUser)
      // } else {
      //   commit('user', 'oo')
      // }
      console.log('AAKKAKAK')
    },
    auth () {

    }
  }
})

export default store