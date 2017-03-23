import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from 'axios'

const store = new Vuex.Store({
  state: {
    authUser: null,
    User: null,
    searchResult: [],
    notify: null,
    count: 0,
    baseurl: 'https://api.notable.wushan.io/'
    // baseurl: 'http://localhost:3003/' // Production: https://api.notable.wushan.io/
  },
  mutations: {
    SET_USER: function (state, user) {
      state.authUser = user
      localStorage.setItem('notable_token', user.data.id)
      localStorage.setItem('notable_user', user.data.userId)
    },
    SET_USERINFO: (state, user) => {
      state.User = user
    },
    SET_Result: (state, data) => {
      state.searchResult = data
    },
    SET_NOTIFY: (state, data) => {
      state.notify = data
    },
    SET_Count: (state, data) => {
      state.count = data
    },
    SET_USERPHOTO: (state, url) => {
      state.User.data.photo = url
    },
    SET_BRAND: (state, data) => {
      state.User.data.brand = data
    },
    SET_VAT: (state, data) => {
      state.User.data.vat = data
    },
    SET_ADDRESS: (state, data) => {
      state.User.data.address = data
    },
    SET_FB: (state, data) => {
      state.User.data.fanpage = data
    }
  },
  actions: {
    nuxtServerInit ({ commit }, { req }) {
      // if (req.authUser) {
      //   commit('user', req.authUser)
      // } else {
      //   commit('user', 'oo')
      // }
    },
    searchNumber ({ commit }) {
      commit('SET_Result', 'abc')
    }
  }
})

export default store