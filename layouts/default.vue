<template lang="pug">
#wrapper
  transition(name="fade", mode="out-in")
    #notify(v-if="notify")
      .restrict.notify-box
        | {{notify.message}}
        nuxt-link(:to="notify.link") {{notify.linkText}}
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
          // Return User
          console.log(res)
        }
      })
    } else {
      localStorage.removeItem('notable_token')
      localStorage.removeItem('notable_user')
    }
  },
  computed: {
    notify () {
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
  top: 0;
  left: 0;
  right: 0;
  padding: 1em;
  box-sizing: border-box;
  background-color: darken($primary, 15%);
  text-align: center;
  color: $white;
  font-size: .85em;
  z-index: 99;
  a {
    color: $white;
  }
}
</style>
