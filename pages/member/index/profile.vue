<template lang="pug">
#profile
  .container.restrict
    form.frame(@submit.prevent.stop="saveProfile")
      h1.title 店舖檔案
      p {{error.vat}}
      p {{error.address}}
      p {{error.brand}}
      .columns
        .column
          .controlgroup
            .controls
              input.active(type="email", placeholder="電子郵件", :value="User.email" readonly)
              label 電子郵件
        .column
          .controlgroup
            .controls(v-bind:class="{error: !brandValid}")
              input.active(type="text", placeholder="店舖/公司名稱", :value="User.brand", @input="updateBrand")
              label 店舖/公司名稱
              span.valid-notifier(v-if="!brandValid") 店舖/公司名稱有誤
        .column
          .controlgroup
            .controls(v-bind:class="{error: !vatValid}")
              input.active(type="text", placeholder="統一編號", :value="User.vat", @input="updateVat")
              label 統一編號
              span.valid-notifier(v-if="!vatValid") 統一編號錯誤
      .columns
        .column
          .controlgroup
            .controls(v-bind:class="{error: !addressValid}")
              input.active(type="text", placeholder="地址", :value="User.address", @input="updateAddress")
              label 地址
              span.valid-notifier(v-if="!addressValid") 地址有誤
        .column
          .controlgroup
            .controls
              input.active(type="text", placeholder="Facebook 粉絲專頁", :value="User.fanpage", @input="updateFb")
              label Facebook 粉絲專頁
      .columns
        .column
          .preview-wrapper
            .preview
              img(v-bind:src="UserPhoto")
        .column
          .controlgroup
            .controls
              input.active(type="text", placeholder="顯示圖片", :value="User.photo", @keyup="updateUserPhoto")
              label 顯示圖片
              .tips 貼上您的圖片網址如：https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png
      .gray-box.centered
        .container.restrict-small
          h3 您是否願意在首頁公開顯示您的店名及 Facebook 連結等資料，告訴大家您已加入 NOTABLE「嘸位la！」？
          .controlgroup
            .controls.check-group
              .check-item
                label
                  input(type="radio", v-model="isPublic", @change="updatePublic", :value="true", name="isPublic")
                  span 願意
              .check-item
                label
                  input(type="radio", v-model="isPublic", @change="updatePublic", :value="false", name="isPublic")
                  span 不願意
          p
            | 本站使用資料僅限於您主動提供之店家資料，包含營業登記名稱 / 統一編號 / 登記地址 / Facebook 粉絲專頁 等公開資料，如有相關疑慮，請先參閱
            nuxt-link(to="/legal/privacy", active-class="active") 隱私權
            | 及
            nuxt-link(to="/legal/tou", active-class="active") 使用條款
            | 說明。
      .call-action.centered
        button.button.invert(type="submit") 更新店舖資料
      transition(name="fade", mode="out-in")
        .successView(v-if="successMsg")
          .successView-inner
            h2 店舖資料已更新
            p 感謝
</template>
<script>
import Api from '~assets/api/api'
export default {
  data () {
    return {
      photoUrl: null,
      successMsg: null,
      timer: null,
      error: {
        vat: '',
        address: '',
        brand: ''
      },
      isPublic: null
    }
  },
  mounted () {
    if (this.$store.state.User.data.public !== false) {
      this.isPublic = true
    } else {
      this.isPublic = this.$store.state.User.data.public
    }
  },
  methods: {
    updateUserPhoto (e) {
      this.$store.commit('SET_USERPHOTO', e.target.value)
    },
    updateBrand (e) {
      this.$store.commit('SET_BRAND', e.target.value)
    },
    updateVat (e) {
      this.$store.commit('SET_VAT', e.target.value)
    },
    updateAddress (e) {
      this.$store.commit('SET_ADDRESS', e.target.value)
    },
    updateFb (e) {
      this.$store.commit('SET_FB', e.target.value)
    },
    updatePublic () {
      console.log('event')
      this.$store.commit('SET_PUBLIC', this.isPublic)
    },
    saveProfile () {
      if (this.vatValid && this.brandValid && this.addressValid) {
        var token = localStorage.getItem('notable_token')
        var readyToPatch = {
          brand: this.$store.state.User.data.brand,
          vat: this.$store.state.User.data.vat,
          address: this.$store.state.User.data.address,
          fanpage: this.$store.state.User.data.fanpage,
          photo: this.$store.state.User.data.photo,
          email: this.$store.state.User.data.email,
          id: this.$store.state.User.data.id,
          public: this.isPublic
        }
        Api.patchClientProfile(readyToPatch, token, (err, res) => {
          if (err) {
            console.log(err)
          } else {
            console.log(res)
            if (res.data.public) {
              this.$store.commit('SET_NOTIFY', null)
            }
            this.showSuccessMsg()
          }
        })
      }
    },
    showSuccessMsg () {
      this.successMsg = true
      this.timer = setTimeout(() => {
        this.successMsg = false
      }, 3000)
    },
    vatCheck (taxId) {
      var invalidList = '00000000,11111111'
      if (/^\d{8}$/.test(taxId) === false || invalidList.indexOf(taxId) !== -1) {
        return false
      }
      var validateOperator = [1, 2, 1, 2, 1, 2, 4, 1]
      var sum = 0
      var calculate = function (product) { // 個位數 + 十位數
        var ones = product % 10
        var tens = (product - ones) / 10
        return ones + tens
      }
      for (var i = 0; i < validateOperator.length; i++) {
        sum += calculate(taxId[i] * validateOperator[i])
      }
      return sum % 10 === 0 || (taxId[6] === '7' && (sum + 1) % 10 === 0)
    }
  },
  computed: {
    User () {
      console.log('uu')
      return this.$store.state.User.data
    },
    UserPhoto () {
      console.log('exed')
      return this.$store.state.User.data.photo
    },
    vatValid () {
      var result = this.vatCheck(this.$store.state.User.data.vat)
      console.log(result)
      return result
    },
    brandValid () {
      if (this.$store.state.User.data.brand) {
        return true
      } else {
        return false
      }
    },
    addressValid () {
      if (this.$store.state.User.data.address) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#profile {
  margin: 4em 0;
  .frame {
    position: relative; 
  }
  .successView {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    -webkit-align-content: center;
            align-content: center;
    -webkit-justify-content: center;
            justify-content: center;
    background-color: $white;
    z-index: 9999;
    text-align: center;
    .successView-inner {
        align-self: center;
    }
  }
  .preview-wrapper {
    text-align: center;
  }
  .preview {
    display: inline-block;
    vertical-align: middle;
    border: 1px solid $gray;
    padding: 1em;
    img {
    }
  }
}
</style>
