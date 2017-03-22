<template lang="pug">
  #member
    section.hero-container.tiny
      .hero-content
        .restrict-small.container
          .controlgroup.centered
            searchNumb
    nuxt-child
</template>
<script>
import axios from 'axios'
import searchNumb from '~components/searchNumb.vue'
export default {
  beforeMount () {
    var instance = this
    var token = localStorage.getItem('notable_token')
    var user = localStorage.getItem('notable_user')
    if (token && user) {
      axios.get('http://localhost:3003/clients/' + user, {
        params: {
          access_token: token
        }
      })
      .then((res) => {
        this.$store.commit('SET_USERINFO', res)
      })
      .catch((error) => {
        console.log(error)
        this.$nuxt.$router.push('/login')
        localStorage.removeItem('notable_token')
        localStorage.removeItem('notable_user')
      })
    } else {
      localStorage.removeItem('notable_token')
      localStorage.removeItem('notable_user')
      this.$nuxt.$router.push('/login')
    }
  },
  mounted () {
  },
  data () {
    return {}
  },
  components: {
    searchNumb
  },
  methods: {
  }
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#member {
}
</style>
