<template lang="pug">
  section#results.results-wrapper(v-if="number", itemscope, v-bind:itemtype="'https://notable.wushan.io/number/' + number")
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
                .points(v-bind:class="scoresLevel") {{scores}}
                .description(v-bind:class="scoresLevel")
                  span {{scoreDescription.name}}
                  span {{scoreDescription.notify}}
          .column.target
            h3 查詢標的
            .number(itemprop="name") {{number}}
            .additional
              .voice
                | 電話持有人很可能是 
                span(v-bind:class="voice") {{voiceText}}
            .ads-wrapper(v-if="windowEl")
              script(async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js")
              ins.adsbygoogle(style="display:block", data-ad-client="ca-pub-7684683541536230", data-ad-slot="9848245811", data-ad-format="auto")
              script.
                (adsbygoogle = window.adsbygoogle || []).push({});
            p(v-if="latestRecord && latestProvider") {{latestProvider.brand}}
            //- ul.records
            //-   li(v-for="item in relatedRecords") {{item.date}} / {{item.description}}
            //-   li .
            //-   li .
            //-   li .
        footer
          p 注意！本服務旨在提供小老闆互助，避免紀錄不佳的顧客影響您正常的生意，請勿利用本站資訊對當事人進行任何有損其利益之行為，亦不得在本站之外以任何方式公開此評分資訊。
</template>
<script>
import axios from 'axios'
export default {
  fetch ({ store, params }) {
    return axios.get('https://api.notable.wushan.io/numbers/' + params.id + '/blacklist')
    .then(function (response) {
      store.commit('SET_Result', response.data)
    })
    .catch(function (error) {
      store.commit('SET_Result', [])
      console.log(error)
    })
  },
  mounted () {
    this.windowEl = true
  },
  data ({ params }) {
    return {
      number: params.id,
      windowEl: false,
      latestProvider: null
    }
  },
  head () {
    return {
      title: '查詢號碼：' + this.number
    }
  },
  components: {
  },
  methods: {
    getProvider () {
      var token = localStorage.getItem('notable_token')
      var user = localStorage.getItem('notable_user')
      if (token && user) {
        axios.get('http://localhost:3003/records/' + this.searchResult[0].id + '/provider', {
          params: {
            access_token: token
          }
        })
        .then((res) => {
          console.log(res)
          this.latestProvider = res.data
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }
  },
  computed: {
    searchResult () {
      return this.$store.state.searchResult
    },
    relatedRecords () {
      return this.$store.state.searchResult.slice(0, 5)
    },
    latestRecord () {
      if (this.searchResult && this.windowEl) {
        this.getProvider()
        return this.searchResult[0]
      }
    },
    voice () {
      var voiceMale = []
      var voiceFemale = []
      var data = this.$store.state.searchResult
      for (var gender of data) {
        if (gender.voice === 'male') {
          voiceMale.push(gender.voice)
        } else {
          voiceFemale.push(gender.voice)
        }
      }
      console.log(voiceMale.length)
      console.log(voiceFemale.length)
      if (voiceMale.length > voiceFemale.length) {
        return 'male' //male
      } else if (voiceMale.length < voiceFemale.length) {
        return 'female' //female
      } else {
        return 'unknow'
      }
    },
    voiceText () {
      if (this.voice) {
        switch(this.voice) {
          case 'male':
            return '男性'
            break
          case 'female':
            return '女性'
            break
          case 'unknow':
            return '未知性別'
            break
        }
      }
    },
    scores () {
      return 10 - this.$store.state.searchResult.length
    },
    scoresLevel () {
      if (this.scores <= 0) {
        return 'bad'
      } else if (this.scores > 0 && this.scores < 6) {
        return 'serious'
      } else if (this.scores === 10) {
        return 'nice'
      } else {
        return 'normal'
      }
    },
    scoreDescription () {
      if (this.scores <= 0) {
        return {
          name: '罪大惡極',
          notify: '務必謹慎考慮'
        }
      } else if (this.scores > 0 && this.scores < 6) {
        return {
          name: '朽木不可雕',
          notify: '紀錄不良'
        }
      } else if (this.scores === 10) {
        return {
          name: '表現優異',
          notify: '也可能是還沒有人回報...'
        }
      } else {
        return {
          name: '表現普通',
          notify: '曾有不良紀錄'
        }
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