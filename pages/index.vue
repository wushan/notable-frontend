<template lang="pug">
#intro
  section.hero-container.search-wrapper
    .hero-content
      .restrict.container
        h1.title.centered 你好，不管你要訂哪一天，
          vue-typer(:text='["都沒位子","都不可能","都公休"]', :repeat='Infinity', :shuffle='false', initial-action='typing', :pre-type-delay='300', :type-delay='300', :pre-erase-delay='2000', :erase-delay='550', erase-style='select-all', :erase-on-complete='false', caret-animation='blink', v-if="windowAv")
      .restrict-small.container
        .controlgroup.centered
          form.controls(@submit.stop.prevent="startSearch", v-bind:class="{error: $v.number.$error}")
            input.phone-type(type="search", v-model.trim="number", v-bind:class="{active:number}", @input="$v.number.$touch()" @keyup="clearError")
            button(type="submit", @click="$v.$touch") 搜尋
            span 範例：手機： 0978978078；市話：0228785487 - 不用自己輸入空格
            span.valid-notifier(v-if="!$v.number.required") (必填欄位)
            span.valid-notifier(v-if="!$v.number.minLength") (電話格式不正確！)
            span.valid-notifier(v-if="!$v.number.maxLength") (號碼有點多！)
  section.service-intro
    .restrict.container
      .hero-table
        img(src="~assets/img/table.svg")
      .intro-poem
        p 
          | 我是一位小老闆
          br
          | 我有一個小生意
        p
          | 平日馬馬又乎乎
          br
          | 只有假日還可以
        p
          | 有天你打來很豪氣
          br
          | 我有親友大小共二八
          br
          | 位子全部留給我

        p
          | 小老闆(他)很高興
          br
          | 假日臉色不再綠
          br
          | 人手趕緊添兩位
          br
          | 食材數量不能缺
          br
          | 桌子擦了一遍又一遍
          br
          | 就等大爺來消費

        p
          | 哪裡知道
        p
          | 最後你們沒出現
          br
          | 我讓你永遠訂沒位
        p
          | - Shit
</template>
<script>
// import Vue from 'vue'
// import VueNotifications from 'vue-notifications'
// var VueTyper = window.VueTyper.VueTyper
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  name: 'Home',
  head: {
    title: '小老闆團結！史上最絕奧客防治服務',
    meta: [
      { hid: 'description', content: "奧客查詢、顧客負評，最強奧客電話查詢服務，小老闆拒絕再迎合奧客！" },
      { hid: 'keywords', content: "靠北奧客 拒絕奧客 奧客查詢 澳洲來的客人 奧客電話查詢 用餐紀錄 餐廳黑名單 餐飲業奧客 訂位不接電話 NOSHOW"}
    ]
  },
  mounted () {
    this.windowAv = true
    var Cleave = require('cleave.js')
    require('cleave.js/dist/addons/cleave-phone.tw')
    this.$nextTick(() => {
      var cleave = new Cleave('.phone-type', {
        phone: true,
        phoneRegionCode: 'tw'
      })
    })
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
      maxLength: maxLength(12)
    }
  },
  components: {
  },
  methods: {
    startSearch () {
      this.$router.push('/number/' + this.cleanNumber)
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
#intro {
  .intro-poem {
    text-align: center;
  }
  .service-intro {
    position: relative;
    padding-top: 20%;
    .hero-table {
      position: absolute;
      top: -20vh;
      left: 0;
      right: 0;
      pointer-events: none;
    }
    @include breakpoint(1024px) {
      padding-top: 10%;
    }
  }
}
.search-wrapper {
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-image: url('~assets/img/search-bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 0 0 100% 100%;
    transform-origin: center bottom;
    transform: scaleX(1.5);
  }
  .title {
    @include breakpoint(768px) {
     h1 {
      font-size: 3em;
     }
    }
  }
}
// @keyframes rocking {
//   0%,100% {transform: rotateZ(-10deg);},
//   50%     {transform: rotateZ(10deg);}
// }
</style>
