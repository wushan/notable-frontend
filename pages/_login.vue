<template lang="pug">
  #login
    input(type="text")
    ul(v-if="records")
      li(v-for="record in records") {{record.number}} / {{record.voice}}
    div(v-for="n in 10")
      button(@click="increment") {{ counter }}
    nuxt-link(to="/about") About
</template>

<style lang="scss">
</style>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'Login',
  // data (params) {
  //   return axios.get('//localhost:35687/api/records', {
  //     params: {
  //       filter: {
  //         limit: 5
  //       }
  //     }
  //   })
  //   .then((res) => {
  //     return { records: res.data }
  //   })
  //   .catch((e) => {
  //     console.log(e)
  //   })
  // }
  data ({req}) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  created () {
    this.$store.dispatch('getRecords')
  },
  fetch ({ store }) {
    store.commit('increment')
  },
  computed: mapState([
    'counter',
    'user',
    'records'
  ]),
  methods: {
    increment () { this.$store.commit('increment') }
  }
}
</script>