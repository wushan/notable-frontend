<template lang="pug">
  #contact
    section#contact-container
      .restrict.container
        .frame
          h1.title.centered 聯絡我們
          p.centered 有任何建議嗎？請用下列表單聯繫我們
          form(@submit.prevent.stop="sendForm")
            transition(name="fade", mode="out-in")
              .notification-bar.success-message(v-if="success") 表單已寄出
            .columns
              .column
                .controlgroup
                  .controls(v-bind:class="{error: $v.name.$error}")
                    input(type="text", placeholder="姓名", v-model.trim="name", v-bind:class="{active:name, required:!$v.name.required}", @input="$v.name.$touch()")
                    label 姓名
              .column
                .controlgroup
                  .controls(v-bind:class="{error: $v.mail.$error}")
                    input(type="email", placeholder="連絡信箱", v-model.trim="mail", v-bind:class="{active:mail, required:!$v.mail.required}", @input="$v.mail.$touch()")
                    label 連絡信箱
                    span.valid-notifier(v-if="!$v.mail.email") (格式不正確！)
            .controlgroup
              .controls(v-bind:class="{error: $v.subject.$error}")
                input(type="text", placeholder="主旨", v-model.trim="subject", v-bind:class="{active:subject, required:!$v.subject.required}", @input="$v.subject.$touch()")
                label 主旨
            .controlgroup
              .controls(v-bind:class="{error: $v.message.$error}")
                textarea(placeholder="您的建議", v-model.trim="message", v-bind:class="{active:message, required:!$v.message.required}", @input="$v.message.$touch()")
                label 您的建議
            .call-action
              button.button.full.invert#submit(type="submit", @click="$v.$touch") 送出
    nuxt-child
</template>
<script>
import Api from '~assets/api/api'
import { email, required } from 'vuelidate/lib/validators'
export default {
  head: {
    title: '聯絡我們'
  },
  created () {
  },
  mounted () {
  },
  data () {
    return {
      success: false,
      name: '',
      mail: '',
      subject: '',
      message: ''
    }
  },
  validations: {
    name: {
      required
    },
    mail: {
      required,
      email
    },
    subject: {
      required
    },
    message: {
      required
    }
  },
  components: {
  },
  methods: {
    sendForm () {
      var btn = document.querySelector('#submit')
      btn.disabled = true
      if (this.$v.$error) {
        btn.disabled = false
        return
      } else {
        var data = {
          name: this.name,
          mail: this.mail,
          subject: this.subject,
          message: this.message
        }
        Api.sendForm(data, (err, res) => {
          if (err) {
            console.log(err)
            btn.disabled = false
          } else {
            this.success = true
            this.name = ''
            this.mail = ''
            this.subject = ''
            this.message = ''
            btn.disabled = false
            setTimeout(() => {
              this.success = false
            }, 1000)
          }
        })
        // axios({
        //   method: 'post',
        //   url: 'https://api.notable.wushan.io/clients/sendContact',
        //   data: {
        //     "name": this.name,
        //     "mail": this.mail,
        //     "subject": this.subject,
        //     "message": this.message
        //   }
        // })
        // .then((response) => {
        //   this.success = true
        //   this.name = ''
        //   this.mail = ''
        //   this.subject = ''
        //   this.message = ''
        //   btn.disabled = false
        //   setTimeout(() => {
        //     this.success = false
        //   }, 1000)
        // })
        // .catch((error) => {
        //   console.log(error)
        //   btn.disabled = false
        // });
      }
    }
  }
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#contact {
  min-height: calc( 100vh - 391px);
  padding: 2em 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
#contact-container {
  width: 100%;
  .title {
    text-align: center;
    color: $pureblack;
  }
}
</style>
