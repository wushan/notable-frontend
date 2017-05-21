<template lang="pug">
  #login
    section#login-container
      .container.restrict-small
        form.frame(@submit.prevent.stop="postLogin")
          h1.title.centered 管理
          p.centered
            | Warning: Users shouldn't access this page. please go 
            nuxt-link(to="/") Home
          transition(name="fade", mode="out-in")
            .notification-bar.error-message(v-if="error")
              | 登入失敗!
              span {{error.response.status}} {{error.response.statusText}} / {{error.response.data.error.message}}
          .controlgroup
            .controls(v-bind:class="{error: $v.login.email.$error}")
              input(type="email", placeholder="電子郵件", v-model.trim="login.email", v-bind:class="{active:login.email}", @input="$v.login.email.$touch()", @keyup="clearError")
              label 電子郵件
              span.valid-notifier(v-if="!$v.login.email.required") (必填欄位)
              span.valid-notifier(v-if="!$v.login.email.email") (格式不正確！)
          .controlgroup
            .controls(v-bind:class="{error: $v.login.password.$error}")
              input(type="password", placeholder="密碼", v-model.trim="login.password", v-bind:class="{active:login.password}", @input="$v.login.password.$touch()", @keyup="clearError")
              label 密碼
              span.valid-notifier(v-if="!$v.login.password.required") (必填欄位)
              span.valid-notifier(v-if="!$v.login.password.minLength") (至少 8 碼)
          .call-action
            button.button.invert.full(type="submit", @click="$v.login.$touch") 登入
          .gray-box
            .columns
              .column
                span 還不是會員？
                nuxt-link(to="/signup") 點此加入
              .column.text-right
                nuxt-link(to="/auth/getpassword") 忘記密碼？
</template>
<script>
import axios from 'axios'
import { email, required, minLength } from 'vuelidate/lib/validators'
import qs from 'qs'
export default {
  created () {
  },
  mounted () {
  },
  data () {
    return {
      login: {
        email: null,
        password: null
      },
      error: null
    }
  },
  validations: {
    login: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  },
  methods: {
    clearError () {
      this.error = null
    },
    postLogin (e) {
      var instance = this
      if (this.$v.$error) {
        return console.log('There is still Errors')
      } else {
        console.log(this.login)
        axios.post('https://api.notable.wushan.io/clients/login', qs.stringify({
          email: this.login.email,
          password: this.login.password
        }))
        .then(function (response) {
          // instance.$router.push('signup/ok')
          console.log(response)
          instance.$store.commit('SET_USER', response)
          var token = localStorage.getItem('notable_token')
          var user = localStorage.getItem('notable_user')
          if (token && user) {
            axios.get('https://api.notable.wushan.io/clients/' + user, {
              params: {
                access_token: token
              }
            })
            .then((res) => {
              instance.$store.commit('SET_USERINFO', res)
              instance.$router.push('/member')
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
        })
        .catch(function (error) {
          instance.error = error
        })
        console.log('submitted')
      }
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
