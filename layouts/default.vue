<template lang="pug">
  #wrapper
    my-header
    main#main
      nuxt
    my-footer
    script.
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-89853371-1', 'auto');
      ga('send', 'pageview');
</template>

<script>
import MyHeader from '~components/Header.vue'
import MyFooter from '~components/Footer.vue'
import axios from 'axios'
export default {
  head: {
    title: 'NOTABLE「嘸位la！」 - 小老闆團結！史上最絕奧客防治服務'
  },
  components: {
    MyHeader,
    MyFooter
  },
  beforeMount () {
    var instance = this
    var token = localStorage.getItem('notable_token')
    var user = localStorage.getItem('notable_user')
    if (token && user) {
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
        localStorage.removeItem('notable_token')
        localStorage.removeItem('notable_user')
      })
    } else {
      localStorage.removeItem('notable_token')
      localStorage.removeItem('notable_user')
    }
  }
}
</script>

<style lang="scss">
#main {
  min-height: calc( 100vh - 332px);
  display: flex;
  justify-content: center;
  align-items: center;
  &>div {
    width: 100%;
  }
}
</style>
