<template lang="pug">
  section#results.results-wrapper(itemscope, v-bind:itemtype="'https://notable.wushan.io/number/' + this.$route.params.id")
    .container.restrict
      .providing-blacklist
        | 怎麼可能這麼高分？
        nuxt-link(to="/member") 我要回報這個人！
      .frame
        .columns.reverse
          .column.grade
            h3 綜合評分
            .score-wrapper
              .score
                .points(v-bind:class="scoresLevel", v-if="scoreResult") {{scoreResult.score}}
                .description(v-bind:class="scoresLevel")
                  span(v-if="scoreDescription") {{scoreDescription.name}}
                  span(v-if="scoreDescription") {{scoreDescription.notify}}
          .column.target
            h3 查詢標的
            .number(itemprop="name") {{this.$route.params.id}}
            .additional
              .voice
                | 電話持有人很可能是 
                span(v-bind:class="voice") {{voiceText}}
            .provider-wrapper(v-if="provider")
              .provider-inner
                .provider-info
                  h4 最近的提供者
                  .provider
                    .brand
                      | 「{{scoreResult.provider[0].brand}}」
                      a(:href="'https://company.g0v.ronny.tw/id/' + scoreResult.provider[0].vat", title="g0v台灣公司資料查詢", target="_blank") 公司查詢
                    .address 地址：{{scoreResult.provider[0].address}}
                  .provider-message
                    i.zmdi.zmdi-comment-alert
                    |  {{scoreResult.description}}
                .provider-footer
                  .tips 提供者資訊僅提供店家會員參考，非店家會員無法看到此訊息
            .ads-wrapper(v-if="windowEl")
              script(async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js")
              ins.adsbygoogle(style="display:block", data-ad-client="ca-pub-7684683541536230", data-ad-slot="9848245811", data-ad-format="auto")
              script.
                (adsbygoogle = window.adsbygoogle || []).push({});
           
        footer
          p 注意！本服務旨在提供小老闆互助，避免紀錄不佳的顧客影響您正常的生意，請勿利用本站資訊對當事人進行任何有損其利益之行為，亦不得在本站之外以任何方式公開此評分資訊。
</template>
<script>
import Api from '~assets/api/api'
export default {
  // fetch ({ store, params }) {
  //   return axios.get(store.state.baseurl + 'numbers/' + params.id + '/blacklist')
  //   .then(function (response) {
  //     store.commit('SET_Result', response.data)
  //   })
  //   .catch(function (error) {
  //     store.commit('SET_Result', [])
  //     console.log(error)
  //   })
  // },
  watch: {
    '$route.params.id': 'getScore'
  },
  mounted () {
    this.windowEl = true
    this.getScore()
  },
  data () {
    return {
      number: null,
      windowEl: false,
      latestProvider: null,
      scoreResult: {
        description: '',
        gender: 'unknow',
        genderText: '未知',
        lastProvider: 0,
        number: '00000000',
        score: 10,
        scoreDescription: {
          name: '表現優異',
          notify: '也可能是還沒有人回報...'
        }
      }
    }
  },
  head () {
    return {
      title: '查詢號碼：' + this.$route.params.id
    }
  },
  components: {
  },
  methods: {
    getScore () {
      // this.number = this.$route.params.id
      var token = localStorage.getItem('notable_token')
      var user = localStorage.getItem('notable_user')
      if (token && user) {
        Api.getScore(this.$route.params.id, token, (err, res) => {
          if (err) {
            console.log(err)
          } else {
            this.scoreResult = res.data
          }
        })
      } else {
        Api.getScore(this.$route.params.id, null, (err, res) => {
          if (err) {
            console.log(err)
          } else {
            this.scoreResult = res.data
          }
        })
      }
    }
  },
  computed: {
    provider () {
      if (this.scoreResult) {
        if (this.scoreResult.provider) {
          return true
        } else {
          return false
        }
      }
    },
    voice () {
      if (this.scoreResult) {
        return this.scoreResult.gender
      }
    },
    voiceText () {
      if (this.scoreResult) {
        return this.scoreResult.genderText
      }
    },
    scoresLevel () {
      if (this.scoreResult) {
        if (this.scoreResult.score <= 0) {
          return 'bad'
        } else if (this.scoreResult.score > 0 && this.scoreResult.score < 6) {
          return 'serious'
        } else if (this.scoreResult.score === 10) {
          return 'nice'
        } else {
          return 'normal'
        }
      }
    },
    scoreDescription () {
      if (this.scoreResult) {
        return this.scoreResult.scoreDescription
      }
    }
  }
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
.results-wrapper {
  padding: 0 0 4em 0;
  .column {
    padding-bottom: 2em;
    &:first-child {
    }
    &:last-child {
      border-top: 1px solid $lightgray;
      @include breakpoint(1024px) {
        border-top: 0;
        border-right: 1px solid $lightgray;
      }
    }
  }
  .grade, .target {
    text-align: center;
    position: relative;
  }
  .target {
    @include breakpoint(1024px) {
      text-align: left;
    }
    .records {
      margin: 2em 0;
      padding: 0;
      list-style-type: none;
    }
  }
  .number {
    font-size: 48px;
    // font-weight: 100;
    color: $pureblack;
  }
  .additional {
    font-size: 24px;
    .voice {
      span.male {
        color: $primary;
      }
      span.female {
        color: $red;
      }
      span.unknow {
        color: $secondary;
      }
    }
  }
  .provider-wrapper {
    margin: 1em 1em 1em 0;
    background-color: #4d6f84;
    box-shadow: 0 0 24px rgba(0,0,0,.33);
    border-radius: 3px;
    color: $white;
    a {
      color: $white;
      cursor: pointer;
    }
    .provider-inner {
      .provider-info {
        padding: 1em;
        font-size: .9em;
        .brand {
          font-weight: 600;
        }
        .provider-message {
          background-color: darken(#4d6f84, 10%);
          padding: 1em;
          margin-top: .5em;
        }
      }
      .provider-footer {
        padding: .5em 1em;
        background-color: white;
        text-align: center;
        border-radius: 0 0 3px 3px;
      }
    }
    h4 {
      margin: 0;
      color: $white;
    }
  }
  .ads-wrapper {
    margin-top: 2em;
  }
  .points {
    font-size: 120px;
    font-weight: 100;
    line-height: 1;
    @include breakpoint(1024px) {
      font-size: 288px;
    }
    &.bad {
      color: $red;
    }
    &.nice {
      color: $primary;
    }
    &.normal {
      color: #bbca0c;
    }
    &.serious {
      color: $secondary;
    }
  }
  .description {
    font-size: 36px;
    letter-spacing: 23px;
    font-weight: 700;
    &.bad {
      color: $red;
    }
    &.nice {
      color: $primary;
    }
    &.normal {
      color: #bbca0c;
    }
    &.serious {
      color: $secondary;
    }
    span {
      &:last-child {
        font-size: 12px;
        display: block;
        letter-spacing: 1px;
        color: $darkgray;
      }
    }
  }
  .score-wrapper {
    display: flex;
    -webkit-justify-content: center;
            justify-content: center;
    -webkit-align-content: center;
            align-content: center;
    .score {
    }
  }
  .providing-blacklist {
    font-size: 12px;
    margin:.5em 0;
    text-align: right;
    a {
      color: $link;
      text-decoration: none;
    }
  }
  footer {
    border-top: 1px solid $lightgray;
    font-size: .8em;
    color: $darkgray;
    padding: 0 2em;
  }
}
</style>
