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
            .columns.is-mobile
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
import Auth from '~assets/api/auth'
import { email, required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  head: {
    title: '登入'
  },
  data () {
    return {
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
  methods: {
    clearError () {
      this.error = null
    },
    postLogin (e) {
      if (this.$v.$error) {
        return console.log('There is still Errors')
      } else {
        Auth.login(this.login.email, this.login.password, (err, res) => {
          if (err) {
            this.error = err
          } else {
            this.$nuxt.$router.push('/member')
          }
        })
        console.log('submitted')
      }
    }
  }
}
</script>
