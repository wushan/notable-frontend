<template lang="pug">
#wrapper
  transition(name="fade", mode="out-in")
    #notify(v-if="notifyMessage")
      .restrict.notify-box {{notifyMessage}}
  my-header
  main#main
    nuxt
  my-footer
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
  },
  computed: {
    notifyMessage () {
      return this.$store.state.notify
    }
  }
}
</script>

<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#main {
  // min-height: calc( 100vh - 332px);
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // &>div {
  //   width: 100%;
  // }
}
#notify {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1em;
  box-sizing: border-box;
  background-color: $secondary;
  text-align: center;
  color: $white;
  box-shadow: 0 0 6px rgba($black, .33);
  z-index: 99;
}
</style>
