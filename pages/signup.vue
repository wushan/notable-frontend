<template lang="pug">
  #signup
    section#signup-container
      .container.restrict
        form(@submit.prevent.stop="postSignUp").frame
          h1.title 我要加入
          .columns
            .column
              .controlgroup
                .controls
                  input(type="text", placeholder="電子郵件", v-model="signup.email", v-bind:class="{active:signup.email}")
                  label 電子郵件
              .controlgroup
                .controls
                  input(type="password", placeholder="自訂密碼", v-model="signup.password", v-bind:class="{active:signup.password}")
                  label 自訂密碼
              .controlgroup
                .controls
                  input(type="password", placeholder="再次輸入密碼", v-model="signup.confirm", v-bind:class="{active:signup.confirm}")
                  label 再次輸入密碼
              .controlgroup
                .controls
                  input(type="text", placeholder="您的店鋪名稱", v-model="signup.brand", v-bind:class="{active:signup.brand}")
                  label 您的店鋪名稱
              .controlgroup
                .controls
                  input(type="text", placeholder="統一編號", v-model="signup.vat", v-bind:class="{active:signup.vat}")
                  label 統一編號
              .controlgroup
                .controls
                  input(type="text", placeholder="店舖地址", v-model="signup.address", v-bind:class="{active:signup.address}")
                  label 店舖地址
              .call-action
                button.button.invert.full(type="submit") 申請加入
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
export default {
  name: 'SignUp',
  data () {
    return {
      signup: {
        email: null,
        password: null,
        confirm: null,
        brand: null,
        var: null,
        address: null
      }
    }
  },
  // data (params) {
  //   return axios.get('//localhost:35687/api/records', {
  //     params: {
  //       filter: {
  //         limit: 5
  //       }
  //     }
  //   })
  //   .then((res) => {
  //     return { records: res.data }
  //   })
  //   .catch((e) => {
  //     console.log(e)
  //   })
  // }
  methods: {
    postSignUp (e) {
      console.log(e)
    }
  }
}
</script>