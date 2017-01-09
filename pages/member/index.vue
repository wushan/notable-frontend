<template lang="pug">
  #member
    .restrict-small.container
      .controlgroup.centered
        .controls
          input(type="search")
          button 肉搜你
    nuxt-child
</template>
<script>
// import Vue from 'vue'
// import VueNotifications from 'vue-notifications'
// var VueTyper = window.VueTyper.VueTyper
import axios from 'axios'
export default {
  mounted () {
    console.log('created')
    console.log(window)
    var instance = this
    var token = localStorage.getItem('notable_token')
    var user = localStorage.getItem('notable_user')
    axios.get('https://api.notable.wushan.io/clients/' + user, {
      params: {
        access_token: token
      }
    })
    .then((res) => {
      this.$store.commit('SET_USERINFO', res)
    })
    .catch((error) => {
      console.log(error)
      console.log(this)
      this.$router.replace('/login')
    })
  },
  data () {
    return {

    }
  },
  components: {
  }
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
</style>
