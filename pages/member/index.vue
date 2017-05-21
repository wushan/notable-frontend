<template lang="pug">
  #member
    section.hero-container.tiny
      .hero-content
        .restrict-small.container
          .controlgroup.centered
            searchNumb
    nuxt-child(v-if="user")
</template>
<script>
import Auth from '~assets/api/auth'
import searchNumb from '~components/searchNumb.vue'
export default {
  beforeMount () {
    var token = localStorage.getItem('notable_token')
    var user = localStorage.getItem('notable_user')
    if (token && user) {
      Auth.authCheck(user, token, (err, res) => {
        if (err) {
          console.log(err)
          this.$nuxt.$router.push('/login')
        } else {
          console.log(res)
        }
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
  },
  computed: {
    user () {
      return this.$store.state.User
    }
  }
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#member {
}
</style>
