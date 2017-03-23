import axios from 'axios'
import qs from 'qs'
import Store from '~store/index'
export default {
  authCheck (user, token, cb) {
    axios.get(Store.state.baseurl + 'clients/' + user, {
      params: {
        access_token: token
      }
    })
    .then((res) => {
      Store.commit('SET_USERINFO', res)
      cb(null, res)
    })
    .catch((error) => {
      localStorage.removeItem('notable_token')
      localStorage.removeItem('notable_user')
      cb(error)
    })
  },
  login (email, password, cb) {
    axios.post(Store.state.baseurl + 'clients/login', qs.stringify({
        email: email,
        password: password
      }))
    .then(function (response) {
      Store.commit('SET_USER', response)
      var token = localStorage.getItem('notable_token')
      var user = localStorage.getItem('notable_user')
      if (token && user) {
        axios.get(Store.state.baseurl + 'clients/' + user, {
          params: {
            access_token: token
          }
        })
        .then((res) => {
          Store.commit('SET_USERINFO', res)
          cb(null, 'success')
        })
        .catch((error) => {
          localStorage.removeItem('notable_token')
          localStorage.removeItem('notable_user')
          cb(error)
        })
      } else {
        localStorage.removeItem('notable_token')
        localStorage.removeItem('notable_user')
      }
    })
    .catch(function (error) {
      cb(error)
    });
  },
  requestResetPassword (email, cb) {
    axios.post(Store.state.baseurl + 'clients/reset', {
      email: email
    })
    .then((response) => {
      cb(null, response)
    })
    .catch((error) => {
      cb(error)
    });
  },
  resetPassword (data, token, cb) {
    axios({
      method: 'post',
      url: Store.state.baseurl + 'clients/setPassword',
      data: data,
      params: {
        access_token: token
      }
    })
    .then((response) => {
      cb(null, response)
    })
    .catch((error) => {
      cb(error)
    });
  },
  signUp (data, cb) {
    axios.post(Store.state.baseurl + 'clients', qs.stringify(data))
    .then(function (response) {
      cb(null, response)
    })
    .catch(function (error) {
      cb(error)
    });
  }
}