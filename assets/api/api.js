import axios from 'axios'
import Store from '~store'
import qs from 'qs'
export default {
  getUnsplashImages (cb) {
    axios({
      method: 'get',
      url: 'https://api.unsplash.com/search/photos',
      params: {
        client_id: '18399cc703b58fb798c5663595cbe1cde3958b0c3f495970106efc105f62f48b',
        query: 'restaurant'
      },
    })
    .then((response) => {
      cb(null, response)
    })
    .catch((error) => {
      cb(error)
    });
  },
  getRecentNumbers (cb) {
    axios({
      method: 'get',
      url: Store.state.baseurl + 'numbers',
      params: {
        filter: {
          limit: 4,
          order: 'updatedAt DESC'
        }
      },
    })
    .then((response) => {
      cb(null, response)
    })
    .catch((error) => {
      cb(error)
    });
  },
  submitRecord (data, token, cb) {
    axios({
      method: 'post',
      url: Store.state.baseurl + 'records',
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
  getReportHistory (userId, token, cb) {
    axios({
      method: 'get',
      url: Store.state.baseurl + 'records/getHistory',
      params: {
        id: userId,
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
  getMediaReports (cb) {
    axios({
      method: 'get',
      url: Store.state.baseurl + 'media',
    })
    .then((response) => {
      cb(null, response)
    })
    .catch((error) => {
      cb(error)
    });
  },
  sendForm (data, cb) {
    axios({
      method: 'post',
      url: Store.state.baseurl + 'clients/sendContact',
      data: data
    })
    .then((response) => {
      cb(null, response)
    })
    .catch((error) => {
      cb(error)
    });
  },
  getProvider (id, token, cb) {
    axios.get(Store.state.baseurl + 'records/' + id + '/provider', {
      params: {
        access_token: token
      }
    })
    .then((res) => {
      cb(null, res)
    })
    .catch((error) => {
      cb(error)
    })
  },
  patchClientProfile (data, token, cb) {
    axios({
      method: 'patch',
      url: Store.state.baseurl + 'clients',
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
  getScore (num, token, cb) {
    axios.get(Store.state.baseurl + 'numbers/score', {
      params: {
        number: num,
        access_token: token
      }
    })
    .then((res) => {
      cb(null, res.data)
    })
    .catch((error) => {
      cb(error)
    })
  }
}