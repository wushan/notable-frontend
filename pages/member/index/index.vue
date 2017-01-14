<template lang="pug">
form#addRecord
  .container.restrict
    .frame
      h4.title 加入黑名單，幫助小老闆不再傷心
      form(@submit.stop.prevent="addRecord")
        .columns
          .column
            .controlgroup
              .controls(v-bind:class="{error: $v.blacklist.number.$error}")
                input.number-type(type="text", placeholder="電話", v-model.trim="blacklist.number", v-bind:class="{active:blacklist.number}", @input="$v.blacklist.number.$touch()")
                label 電話
                span.valid-notifier(v-if="!$v.blacklist.number.required") (必填欄位)
                span.valid-notifier(v-if="!$v.blacklist.number.minLength") (電話格式不正確！)
                span.valid-notifier(v-if="!$v.blacklist.number.maxLength") (號碼有點多！)
                span 範例：手機： 0978978078；市話：0228785487 - 不用自己輸入空格
          .column
            .controlgroup
              .controls
                .select-wrapper
                  select(v-model.trim="blacklist.voice", v-bind:class="{active:blacklist.voice}")
                    option(value="male") 男聲
                    option(value="female") 女聲
                  label 性別
                span 電話聽起來像男聲女聲呢？
          .column
            .controlgroup
              .controls
                input.date-type(v-model.trim="blacklist.date", type="text", placeholder="YYYY/MM/DD", v-bind:class="{active:blacklist.date}")
                label 發生時間
                span 他們的惡形惡狀是多久之前發生的？
        .columns
          .column
            .controlgroup
              .controls
                .select-wrapper
                  select(v-model.trim="blacklist.description", v-bind:class="{active:blacklist.description}")
                    option(value="0") 預約未到也沒通知
                    option(value="1") 預約時間很逼進才臨時取消
                    option(value="2") 貪小便宜，要求眾多，理直氣壯
                    option(value="3") 就是奧客
                  label 事蹟
                span 我知道他們很壞，但是到底有多壞，你說說看？
        .call-action.container.restrict-small.centered
          transition(name="fade", mode="out-in")
            button.button.primary#submit(v-if="successMsg", type="submit", @click="$v.blacklist.$touch") {{successMsg}}
          transition(name="fade", mode="out-in")
            button.button.invert#submit(v-if="!successMsg", type="submit", @click="$v.blacklist.$touch") {{btnMsg}}
</template>
<script>
import axios from 'axios'
import { email, required, sameAs, between, minLength, maxLength } from 'vuelidate/lib/validators'
import qs from 'qs'
export default {
  mounted () {
    var Cleave = require('cleave.js')
    require('cleave.js/dist/addons/cleave-phone.tw')
    var testA = document.querySelector('.date-type')
    var testB = document.querySelector('.number-type')
    console.log(testA, testB)
    var cleaveDate = new Cleave('.date-type', {
      date: true,
      datePattern: ['Y', 'm', 'd']
    })
    var cleavePhone = new Cleave('.number-type', {
      phone: true,
      phoneRegionCode: 'tw'
    })
  },
  methods: {
    addRecord () {
      var btn = document.getElementById('submit')
      btn.disabled = true
      if (this.$v.$error) {
        btn.disabled = false
        return
      } else {
        this.submitRecord()
      }
    },
    submitRecord() {
      var userId = localStorage.getItem('notable_user')
      var token = localStorage.getItem('notable_token')
      var btn = document.getElementById('submit')
      axios({
        method: 'post',
        url: 'https://api.notable.wushan.io/records',
        // url: 'http://localhost:3003/records',
        data: {
          "voice": this.blacklist.voice,
          "date": Date.parse(this.blacklist.date.replace(/\//g, '-')),
          "description": this.blacklist.description,
          "providerId": userId,
          "numberId": this.cleanNumber
        },
        params: {
          access_token: token
        }
      })
      .then((response) => {
        console.log(response)
        btn.disabled = false
        this.showSuccessMsg()
        // 清除
        this.blacklist.number = null
      })
      .catch((error) => {
        this.error = error
        btn.disabled = false
      });
    },
    showSuccessMsg () {
      this.successMsg = "感謝提供"
      this.timer = setTimeout(() => {
        this.successMsg = null
      }, 3000)
    }
  },
  data () {
    return {
      blacklist: {
        number: null,
        voice: 'male',
        date: '2017/01/01',
        description: '0'
      },
      successMsg: null,
      btnMsg: '希望你不要再出來害了～送出！',
      timer: null
    }
  },
  validations: {
    blacklist: {
      number: {
        required,
        minLength: minLength(9),
        maxLength: maxLength(12)
      }
    }
  },
  components: {
  },
  computed: {
    cleanNumber () {
      if (this.blacklist.number) {
        return this.blacklist.number.replace(/ /g, '')
      }
    }
  }
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#addRecord {
  margin: 4em 0;
}
</style>
