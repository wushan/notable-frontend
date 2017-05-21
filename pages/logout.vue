<template lang="pug">
  #logut
    section#login-container
      .container.restrict-small
        .frame.centered
          p(v-if="success") 登出成功
          p(v-else) 登出中..
</template>

<style lang="scss">
#logut {
  min-height: calc( 100vh - 391px);
  padding: 2em 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<script>
import Auth from '~assets/api/auth'
export default {
  name: 'Login',
  head: {
    // title: '小老闆團結！史上最絕奧客防治服務 - NOTABLE「嘸位la！」',
    title: '登出'
  },
  data () {
    return {
      success: false,
      timer: null
    }
  },
  created () {
    // this.$store.dispatch('getRecords')
  },
  mounted () {
    this.logout()
  },
  fetch ({ store }) {
    // store.commit('increment')
  },
  computed: {
  },
  methods: {
    logout () {
      var instance = this
      var token = localStorage.getItem('notable_token')
      if (token) {
        Auth.logout(token, (err, res) => {
          if (err) {
            console.log(err)
            this.$nuxt.$router.replace('/')
            localStorage.removeItem('notable_token')
            localStorage.removeItem('notable_user')
            this.$store.commit('SET_USERINFO', null)
          } else {
            console.log('first Success')
            this.success = true
            localStorage.removeItem('notable_token')
            localStorage.removeItem('notable_user')
            this.$store.commit('SET_USERINFO', null)
            this.timer = setTimeout(() => {
              this.$nuxt.$router.replace('/')
            }, 1500)
          }
        })
      } else {
        instance.$nuxt.$router.replace('/')
      }
    }
  }
}
</script>
