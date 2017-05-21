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
import Auth from '~assets/api/auth'
export default {
  components: {
    MyHeader,
    MyFooter
  },
  beforeMount () {
    var token = localStorage.getItem('notable_token')
    var user = localStorage.getItem('notable_user')
    if (token && user) {
      Auth.authCheck(user, token, (err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log(res)
        }
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
#main {}
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
