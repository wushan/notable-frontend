<template lang="pug">
  #forget
    section#forget-container
      .container.restrict-small
        form.frame(@submit.prevent.stop="resetPassword")
          h1.title.centered 重置密碼
          p 請輸入您的新密碼，密碼至少 8 碼英文數字組合。
          .controlgroup
            .controls(v-bind:class="{error: $v.password.$error}")
              input(type="password", placeholder="自訂密碼", v-model.trim="password", v-bind:class="{active:password}", @input="$v.password.$touch()")
              label 自訂密碼
              span.valid-notifier(v-if="!$v.password.required") (必填欄位)
              span.valid-notifier(v-if="!$v.password.minLength") 密碼至少 8 碼
          .controlgroup
            .controls(v-bind:class="{error: $v.confirm.$error}")
              input(type="password", placeholder="再次輸入密碼", v-model.trim="confirm", v-bind:class="{active:confirm}", @input="$v.confirm.$touch()")
              label 再次輸入密碼
              span.valid-notifier(v-if="!$v.confirm.sameAsPassword") 密碼不吻合，請確認
          .call-action
            button.button.invert.full(type="submit", @click="$v.$touch") 設定新密碼
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
import axios from 'axios'
import { email, required, sameAs, between, minLength } from 'vuelidate/lib/validators'
// import qs from 'qs'
export default {
  name: 'getPassword',
  head: {
    title: '重置密碼'
  },
  data ({req}) {
    return {
      password: null,
      confirm: null,
      error: false,
      success: false
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(8)
    },
    confirm: {
      sameAsPassword: sameAs('password')
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
    resetPassword () {
      if (this.$v.$error) {
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 3000)
      } else {
        axios({
          method: 'post',
          // url: 'http://localhost:3003/clients/setPassword',
          url: 'https://api.notable.wushan.io/clients/setPassword',
          data: {
            "password": this.password,
            "confirmation": this.confirm
          },
          params: {
            access_token: this.$route.query.access_token
          }
        })
        .then((response) => {
          // instance.$router.push('signup/ok')
          this.success = true
          setTimeout(() => {
            this.success = false
          }, 6000)
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 3000)
        });
      }
    }
  }
}
</script>