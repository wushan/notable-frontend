<template lang="pug">
  #number
    section.hero-container.tiny
      .hero-content
        .restrict-small.container
          .controlgroup.centered
            form.controls(@submit.stop.prevent="startSearch", v-bind:class="{error: $v.number.$error}")
              input.phone-type(type="search", v-model.trim="number", v-bind:class="{active:number}", @input="$v.number.$touch()" @keyup="clearError")
              button(type="submit", @click="$v.$touch") 搜尋
              span 範例：手機： 0978978078；市話：0228785487 - 不用自己輸入空格
              span.valid-notifier(v-if="!$v.number.required") (必填欄位)
              span.valid-notifier(v-if="!$v.number.minLength") (電話格式不正確！)
              span.valid-notifier(v-if="!$v.number.maxLength") (號碼有點多！)
    nuxt-child
</template>
<script>
import axios from 'axios'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
var Cleave = require('cleave.js')
require('cleave.js/dist/addons/cleave-phone.tw')
export default {
  mounted () {
    var cleave = new Cleave('.phone-type', {
      phone: true,
      phoneRegionCode: 'tw'
    })
  },
  data () {
    return {
       number: null,
       error: null
    }
  },
  validations: {
    number: {
      required,
      minLength: minLength(9),
      maxLength: maxLength(12)
    }
  },
  components: {
  },
  methods: {
    startSearch () {
      if (this.number) {
        if (this.$v.$error) {
          return
        } else {
          this.$router.push('/number/' + this.cleanNumber)
        }
      } else {
        this.error = '你沒輸入，不要玩好嗎？'
      }
    },
    clearError () {
      this.error = null
    }
  },
  computed: {
    cleanNumber () {
      if (this.number) {
        return this.number.replace(/ /g, '')
      }
    }
  }
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#number {
  box-sizing: border-box;
  min-height: calc( 100vh - 391px);
}
</style>
