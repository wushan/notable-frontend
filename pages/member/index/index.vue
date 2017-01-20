<template lang="pug">
#addRecord
  .container.restrict
    .frame
      p 親愛的老闆，您好！本服務之顧客評等是基於您提供的資訊，您的資訊將可有效避免其他老闆們再有類似的遭遇。本於人性本善的精神，未經舉報的電話號碼一率顯示 10 分滿分，再次感謝您的提供，下次遇到有疑慮的訂位，先來查看看，更重要的是：再有遇到不好的客人，也一定要來回報喔！
      p.small.centered 本服務本於互助的精神，提供此平台給您檢舉素行不佳的顧客，相信您在舉報之前，已仔細了解並試圖與顧客理性溝通，並且不是基於情緒而惡意舉報他人
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
                date-picker.full(v-bind:date="startTime", v-bind:option="option", v-bind:limit="limit")

        .columns
          .column
            .controlgroup
              .controls
                .select-wrapper
                  select(@change="filldecription")
                    option(value="0") 預約未到也沒通知
                    option(value="1") 預約時間很逼進才臨時取消
                    option(value="2") 貪小便宜，要求眾多，理直氣壯
                    option(value="3") 就是奧客
                  label 快選
            .controlgroup
              .controls(v-bind:class="{error: $v.blacklist.description.$error}")
                input(type="text", v-model.trim="blacklist.description", v-bind:class="{active:blacklist.description, required:!$v.blacklist.description.required}", placeholder="請填寫舉報原因或選擇上方預設值")
                label 事蹟

        .call-action.container.restrict-small.centered
          button.button.invert#submit(type="submit", @click="$v.blacklist.$touch") {{btnMsg}}
        transition(name="fade", mode="out-in")
          .successView(v-if="successMsg")
            .successView-inner
              h2 通報成功
              p 感謝
  .container.restrict
    .frame
      h3.title.centered
        | 歷史紀錄
        span 編輯功能即將推出
      ul.history(v-if="records.data && records.data.length !== 0")
        li(v-for="record in records.data")
          span {{record.date | momentD}}
          span {{record.numberId}}
      p.centered(v-else) 暫無資料
</template>
<script>
import moment from 'moment'
import axios from 'axios'
import { email, required, sameAs, between, minLength, maxLength } from 'vuelidate/lib/validators'
import qs from 'qs'
import myDatepicker from 'vue-datepicker'
export default {
  head: {
    title: '回報奧客'
  },
  name: 'Member',
  mounted () {
    this.getHistory()
  },
  methods: {
    addRecord () {
      var btn = document.getElementById('submit')
      btn.disabled = true
      if (!this.startWith) {
        btn.disabled = false
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 200)
        return
      } else if (this.$v.$error || this.$v.$invalid || !this.startTime.time) {
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
          "date": moment(this.startTime.time).format('X'),
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
    },
    getHistory () {
      var userId = localStorage.getItem('notable_user')
      var token = localStorage.getItem('notable_token')
      axios({
        method: 'get',
        url: 'https://api.notable.wushan.io/records/getHistory',
        // url: 'http://localhost:3003/records/getHistory',
        params: {
          id: userId,
          access_token: token
        }
      })
      .then((response) => {
        console.log(response)
        this.records = response.data
      })
      .catch((error) => {
        console.log(error)
      });
    },
    filldecription (e) {
      console.log(e)
      this.blacklist.description = this.presets[e.target.value]
    }
  },
  data () {
    return {
      error: false,
      blacklist: {
        number: null,
        voice: 'male',
        date: '',
        description: ''
      },
      records: {},
      successMsg: null,
      btnMsg: '希望你不要再出來害了～送出！',
      timer: null,
      presets: ['預約未到也沒通知', '預約時間很逼進才臨時取消', '貪小便宜，要求眾多，理直氣壯', '就是奧客'],
      startTime: {
        time: moment().format('YYYY-MM-DD')
      },
      endtime: {
        time: ''
      },
      option: {
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        format: 'YYYY-MM-DD',
        placeholder: '請選擇日期',
        // inputStyle: {
        //   'display': 'inline-block',
        //   'padding': '6px',
        //   'line-height': '22px',
        //   'font-size': '16px',
        //   'border': '2px solid #fff',
        //   'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
        //   'border-radius': '2px',
        //   'color': '#5F5F5F'
        // },
        color: {
          header: '#ccc',
          headerText: '#f00'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      timeoption: {
        type: 'min',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm'
      },
      multiOption: {
        type: 'multi-day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format:"YYYY-MM-DD HH:mm"
      },
      limit: [
        {
          type: 'fromto',
          from: '2015-01-01',
          to: moment().format('YYYY-MM-DD')
        }
      ]
    }
  },
  validations: {
    blacklist: {
      number: {
        required,
        minLength: minLength(9),
        maxLength: maxLength(12)
      },
      description: {
        required
      }
    }
  },
  components: {
    'date-picker': myDatepicker
  },
  filters: {
    momentD (arg) {
      return moment.unix(arg).format('LL')
    }
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
          } else if (string[1] === '0' || string[1] === '1') {
            return false
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
.history {
  display: block;
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    display: flex;
    border-bottom: 1px solid $lightgray;
    padding: .5em 0;
    &:last-child {
      border-bottom: 0;
    }
    span {
      &:last-child {
        text-align: right;
        flex: 1;
      }
      &:first-child {
        width: 180px;
        overflow: hidden;
      }
    }
  }
}
</style>
