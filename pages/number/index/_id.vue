<template lang="pug">
  #specific
    h1 0978
    ul
      li(v-for="item in searchResult") {{item.date}}
</template>
<script>
import axios from 'axios'
export default {
  fetch ({ store, params }) {
    return axios.get('https://api.notable.wushan.io/records', {
      params: {
        "filter": {
          "where": {
            "number": "53-(221)835-0257"
          }
        }
      }
    })
    .then(function (response) {
      // instance.$router.push('signup/ok')
      store.commit('SET_Result', response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  data () {
    return {

    }
  },
  components: {
  },
  computed: {
    searchResult () {
      return this.$store.state.searchResult
    }
  }
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';

</style>
