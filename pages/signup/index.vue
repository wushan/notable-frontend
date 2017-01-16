<template lang="pug">
  #signup
    section#signup-container
      .container.restrict
        form.frame(@submit.prevent.stop="postSignUp")
          h1.title 我要加入
          .columns
            .column
              .controlgroup
                .controls(v-bind:class="{error: $v.signup.email.$error}")
                  input(type="text", placeholder="電子郵件", v-model.trim="signup.email", v-bind:class="{active:signup.email}", @input="$v.signup.email.$touch()")
                  label 電子郵件
                  span.valid-notifier(v-if="!$v.signup.email.required") (必填欄位)
                  span.valid-notifier(v-if="!$v.signup.email.email") (格式不正確！)
              .controlgroup
                .controls(v-bind:class="{error: $v.signup.password.$error}")
                  input(type="password", placeholder="自訂密碼", v-model.trim="signup.password", v-bind:class="{active:signup.password}", @input="$v.signup.password.$touch()")
                  label 自訂密碼
                  span.valid-notifier(v-if="!$v.signup.password.required") (必填欄位)
                  span.valid-notifier(v-if="!$v.signup.password.minLength") 密碼至少 8 碼
              .controlgroup
                .controls(v-bind:class="{error: $v.signup.confirm.$error}")
                  input(type="password", placeholder="再次輸入密碼", v-model.trim="signup.confirm", v-bind:class="{active:signup.confirm}", @input="$v.signup.confirm.$touch()")
                  label 再次輸入密碼
                  span.valid-notifier(v-if="!$v.signup.password.sameAs") 密碼不吻合，請確認
              .controlgroup
                .controls(v-bind:class="{error: $v.signup.brand.$error}")
                  input(type="text", placeholder="您的店鋪名稱", v-model.trim="signup.brand", v-bind:class="{active:signup.brand}", @input="$v.signup.brand.$touch()")
                  label 您的店鋪名稱
                  span.valid-notifier(v-if="!$v.signup.brand.required") 必填
              .controlgroup
                .controls(v-bind:class="{error: $v.signup.vat.$error}")
                  input(type="text", placeholder="統一編號", v-model.trim="signup.vat", v-bind:class="{active:signup.vat}", @input="$v.signup.vat.$touch()")
                  label 統一編號
                  span.valid-notifier(v-if="!$v.signup.vat.required") 必填
                  span.valid-notifier(v-if="!$v.signup.vat.minLength") 請輸入統一編號 8 碼
              .controlgroup
                .controls(v-bind:class="{error: $v.signup.address.$error}")
                  input(type="text", placeholder="店舖地址", v-model.trim="signup.address", v-bind:class="{active:signup.address}", @input="$v.signup.address.$touch()")
                  label 店舖地址
                  span.valid-notifier(v-if="!$v.signup.address.required") 必填
              .call-action
                button.button.invert.full(type="submit", @click="$v.signup.$touch") 申請加入
              .gray-box
                p
                  | * 請注意，申請加入 notable 表示您已詳細閱讀並同意本服務之使用條款，並且同意本站其他會員在有限度的情況下使用您提供的資料，請見：
                  a(href="javascript:;") 我們如何使用您的資料。
              
            .column.icecream-shop
              img(src="~assets/img/icecream-shop.svg")

</template>

<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#signup {
  padding: 2em 0;
  .title {
    color: $pureblack;
  }
  .icecream-shop {
    position: relative;
    @include breakpoint(1024px) {
      img {
        position: absolute;
        top: -10%;
        right: -5%;
      }
    }
  }
}
</style>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
import qs from 'qs'
import { email, required, sameAs, between, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'SignUp',
  head: {
    // title: '小老闆團結！史上最絕奧客防治服務 - NOTABLE「嘸位la！」',
    title: '申請加入'
  },
  data () {
    return {
      signup: {
        email: '',
        password: '',
        confirm: '',
        brand: '',
        vat: '',
        address: ''
      }
    }
  },
  mounted () {
  },
  validations: {
    signup: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      },
      confirm: {
        sameAsPassword: sameAs('password')
      },
      brand: {
        required
      },
      vat: {
        required,
        minLength: minLength(8)
      },
      address: {
        required
      }
    }
  },
  methods: {
    postSignUp (e) {
      var instance = this
      if (this.$v.$error) {
        return console.log('There is still Errors')
      } else {
        console.log(this.signup)
        axios.post('https://api.notable.wushan.io/clients', qs.stringify({
            email: this.signup.email,
            password: this.signup.password,
            vat: this.signup.vat,
            brand: this.signup.brand,
            address: this.signup.address
          }))
        .then(function (response) {
          instance.$router.push('signup/ok')
        })
        .catch(function (error) {
          console.log(error);
        });
        console.log('submitted')
      }
    }
  }
}
</script>