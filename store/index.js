import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from 'axios'
const store = new Vuex.Store({
  state: {
    counter: 0,
    user: null,
    records: null
  },
  mutations: {
    increment (state) {
      state.counter++
    },
    user: function (state, user) {
      state.user = user
    },
    records: function (state, records) {
      state.records = records
    }
  },
  actions: {
    nuxtServerInit ({ commit }, { req }) {
      if (req.authUser) {
        commit('user', req.authUser)
      } else {
        commit('user', 'oo')
      }
    },
    getRecords ({ commit }) {
      axios.get('//localhost:35687/api/records', {
        params: {
          filter: {
            limit: 5
          }
        }
      })
      .then((res) => {
        commit('records', res.data)
      })
      .catch((e) => {
        console.log(e)
      })
    }
  }
})

export default store