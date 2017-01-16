<template lang="pug">
#addRecord
  .container.restrict
    .frame
      h3.title.centered 回報奧客，幫助其他小老闆不再傷心
      form(@submit.stop.prevent="addRecord")
        .columns
          .column
            .controlgroup
              .controls
                input.number-type(type="tel", v-bind:class="{active:blacklist.number, error: error}", @keydown="clearError", placeholder="輸入號碼：0987987987", v-model.trim="blacklist.number")
                label 電話

          .column
            .controlgroup
              .controls
                .select-wrapper
                  select(v-model.trim="blacklist.voice", v-bind:class="{active:blacklist.voice}")
                    option(value="male") 男聲
                    option(value="female") 女聲
                  label 性別

          .column
            .controlgroup
              .controls
                input.date-type(v-model.trim="blacklist.date", type="text", placeholder="YYYY/MM/DD", v-bind:class="{active:blacklist.date}")
                label 發生時間

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

        .call-action.container.restrict-small.centered
          button.button.invert#submit(type="submit", @click="$v.blacklist.$touch") {{btnMsg}}
        transition(name="fade", mode="out-in")
          .successView(v-if="successMsg")
            .successView-inner
              h2 通報成功
              p 感謝
</template>
<script>
import axios from 'axios'
import { email, required, sameAs, between, minLength, maxLength } from 'vuelidate/lib/validators'
import qs from 'qs'
export default {
  head: {
    title: '回報奧客'
  },
  mounted () {
  },
  methods: {
    addRecord () {
      var btn = document.getElementById('submit')
      btn.disabled = true
      if (this.$v.$error || !this.startWith) {
        btn.disabled = false
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 200)
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
        // this.timer = setTimeout(() => {
        //   this.successMsg = false
        // }, 3000)
        btn.disabled = false
      });
    },
    showSuccessMsg () {
      this.successMsg = true
      this.timer = setTimeout(() => {
        this.successMsg = false
      }, 3000)
    },
    clearError (e) {
      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
           // Allow: Ctrl+A
          (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
           // Allow: Ctrl+C
          (e.keyCode == 67 && e.ctrlKey === true) ||
           // Allow: Ctrl+X
          (e.keyCode == 88 && e.ctrlKey === true) ||
           // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)) {
               // let it happen, don't do anything
               return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 200)
      }
    }
  },
  data () {
    return {
      error: false,
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
    },
    startWith () {
      if (this.blacklist.number) {
        var string = this.blacklist.number.split('')
        if (string[0] === '0') {
          // First number must be 0
          if (string[1] === '9') {
            // Mobile (second number 9)
            if (string.length === 10) {
              return true
            } else {
              return false
            }
          } else {
            // City
            if (string.length >= 9 && string.length <=10) {
              return true
            } else {
              return false
            }
          }
        } else {
          return false
        }
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
#addRecord {
  margin: 4em 0;
  .frame {
    position: relative; 
  }
  .title {
    margin: 1em 0 3em 0;
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
}
</style>
