<template lang="pug">
form.controls(@submit.stop.prevent="startSearch")
  input(type="tel", v-model.trim="number", v-bind:class="{active:number, error: error}", @input="$v.number.$touch()" @keydown="clearError",  placeholder="輸入號碼：0987987987")
  button(type="submit", @click="$v.$touch") 搜尋
  //- span.valid-notifier(v-if="!$v.number.required") (電話格式不正確！)
  //- span.valid-notifier(v-if="!$v.number.alphaNum") (電話格式不正確！)
  //- span.valid-notifier(v-if="!$v.number.minLength") (電話格式不正確！)
  //- span.valid-notifier(v-if="!$v.number.maxLength") (電話格式不正確！)
</template>
<script>
// import Vue from 'vue'
// import VueNotifications from 'vue-notifications'
// var VueTyper = window.VueTyper.VueTyper
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  name: 'SearchField',
  head: {
    title: '小老闆團結！史上最絕奧客防治服務',
    meta: [
      { hid: 'description', content: "奧客查詢、顧客負評，最強奧客電話查詢服務，小老闆拒絕再迎合奧客！" },
      { hid: 'keywords', content: "靠北奧客 拒絕奧客 奧客查詢 澳洲來的客人 奧客電話查詢 用餐紀錄 餐廳黑名單 餐飲業奧客 訂位不接電話 NOSHOW"}
    ]
  },
  mounted () {
  },
  data () {
    return {
      number: null,
      error: null,
      windowAv: false
    }
  },
  validations: {
    number: {
      required,
      minLength: minLength(9),
      maxLength: maxLength(11)
    }
  },
  components: {
  },
  methods: {
    startSearch () {
      if (this.$v.$error) {
        this.error = true
      } else {
        this.$router.push('/number/' + this.number)
      }
    },
    clearError (e) {
      // if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      //     e.preventDefault();
      //     this.error = true
      //     setTimeout(() => {
      //       this.error = false
      //     }, 200)
      // }
      // Allow: backspace, delete, tab, escape, enter and .
      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode == 65 && e.ctrlKey === true) ||
          // Allow: Ctrl+C
          (e.keyCode == 67 && e.ctrlKey === true) ||
          // Allow: Ctrl+X
          (e.keyCode == 88 && e.ctrlKey === true) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39) ||
          //Allow numbers and numbers + shift key
          ((e.shiftKey && (e.keyCode >= 48 && e.keyCode <= 57)) || (e.keyCode >= 96 && e.keyCode <= 105))) {
          // let it happen, don't do anything
          return;
      }
      // Ensure that it is a number and stop the keypress
      if ((!e.shiftKey && (e.keyCode < 48 || e.keyCode > 57)) || (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault()
          this.error = true
      }
    }
  },
  computed: {
  }
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
</style>
