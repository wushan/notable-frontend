import axios from 'axios'
import Store from '~store/index'
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
  }
}