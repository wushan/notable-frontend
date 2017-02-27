<template lang="pug">
  #login
    section#login-container
      .container.restrict-small
        form.frame(@submit.prevent.stop="postLogin")
          h1.title 登入
          transition(name="fade", mode="out-in")
            .notification-bar.error-message(v-if="error")
              | 登入失敗!
              span {{error.response.status}} {{error.response.statusText}} / {{error.response.data.error.message}}
          .controlgroup
            .controls(v-bind:class="{error: $v.login.email.$error}")
              input(type="email", placeholder="電子郵件", v-model.trim="login.email", v-bind:class="{active:login.email}", @input="$v.login.email.$touch()", @keyup="clearError")
              label 電子郵件
              span.valid-notifier(v-if="!$v.login.email.required && $v.login.email.$dirty") (必填欄位)
              span.valid-notifier(v-if="!$v.login.email.email") (格式不正確！)
          .controlgroup
            .controls(v-bind:class="{error: $v.login.password.$error}")
              input(type="password", placeholder="密碼", v-model.trim="login.password", v-bind:class="{active:login.password}", @input="$v.login.password.$touch()", @keyup="clearError")
              label 密碼
              span.valid-notifier(v-if="!$v.login.password.required && $v.login.password.$dirty") (必填欄位)
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

<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#login {
  min-height: calc( 100vh - 391px);
  padding: 2em 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
#login-container {
  width: 100%;
  .title {
    text-align: center;
    color: $pureblack;
  }
}
</style>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { email, required, sameAs, between, minLength } from 'vuelidate/lib/validators'
import qs from 'qs'
export default {
  name: 'Login',
  head: {
    // title: '小老闆團結！史上最絕奧客防治服務 - NOTABLE「嘸位la！」',
    title: '登入'
  },
  data ({req}) {
    return {
      name: req ? 'server' : 'client',
      login: {
        email: '',
        password: ''
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
  created () {
    // this.$store.dispatch('getRecords')
  },
  fetch ({ store }) {
    // store.commit('increment')
  },
  computed: mapState([
    // 'counter',
    // 'user',
    // 'records'
  ]),
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
              instance.$nuxt.$router.push('/member')
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
        });
        console.log('submitted')
      }
    }
  }
}
</script>