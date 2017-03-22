<template lang="pug">
  #forget
    section#forget-container
      .container.restrict-small
        form.frame(@submit.prevent.stop="getAuthToken")
          h1.title.centered 忘記密碼
          p 請輸入註冊時使用的電子郵件信箱，我們會將帶有重置密碼的連結傳送給您。信件寄出後請等待 3 - 5 分鐘，並請檢查廣告、垃圾信件夾。如果還是沒有收到信，請與我們聯繫。
          transition(name="fade", mode="out-in")
            .notification-bar.success-message(v-if="success") 連結已寄出，請查看信箱
          transition(name="fade", mode="out-in")
            .notification-bar.error-message(v-if="error") 錯誤！此 E-mail 信箱不存在，請重新確認
          .controlgroup
            .controls(v-bind:class="{error: $v.email.$error}")
              input(type="text", placeholder="電子郵件", v-model.trim="email", v-bind:class="{active:email}", @input="$v.$touch")
              label 電子郵件
              span.valid-notifier(v-if="!$v.email.email") (格式不正確！)
          .call-action
            button.button.invert.full(type="submit", @click="$v.$touch") 寄送 E-mail
</template>

<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#forget {
  min-height: calc( 100vh - 391px);
  padding: 2em 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
#forget-container {
  width: 100%;
  .title {
    text-align: center;
    color: $pureblack;
  }
}
</style>
<script>
import Auth from '~assets/api/auth'
import { email, required, sameAs, between, minLength } from 'vuelidate/lib/validators'
// import qs from 'qs'
export default {
  name: 'getPassword',
  head: {
    title: '忘記密碼'
  },
  data ({req}) {
    return {
      email: null,
      error: false,
      success: false
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  created () {
    // this.$store.dispatch('getRecords')
  },
  mounted () {
  },
  fetch ({ store }) {
    // store.commit('increment')
  },
  computed: {
  },
  methods: {
    getAuthToken () {
      if (this.$v.$error) {
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 3000)
      } else {
        Auth.requestResetPassword(this.email, (err, res) => {
          if (err) {
            console.log(err)
            this.error = true
            setTimeout(() => {
              this.error = false
            }, 3000)
          } else {
            this.success = true
          }
        })
      }
    }
  }
}
</script>