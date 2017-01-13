<template lang="pug">
  section#results.container.restrict.results-wrapper
    .frame
      .columns.reverse
        .column.grade
          h3 綜合評分
          .score-wrapper
            .score
              .points(v-bind:class="scoresLevel") {{scores}}
              .description
                span 表現良好
                span 或者說正義還沒被彰顯
            .providing-blacklist
              | 怎麼可能這麼高分？
              nuxt-link(to="/member") 我有他的把柄！
        .column.target
          h3 查詢標的
          .number {{number}}
          .additional
            .voice
              | 電話持有人很可能是 
              span(v-bind:class="voice") {{voice==='Male'?'男性':'女性'}}
          ul.records
            li(v-for="item in relatedRecords") {{item.number}}/{{item.date}}
            li .
            li .
            li .
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
      console.log(error)
    })
  },
  data ({ params }) {
    return {
      number: params.id
    }
  },
  components: {
  },
  computed: {
    searchResult () {
      return this.$store.state.searchResult
    },
    relatedRecords () {
      return this.$store.state.searchResult.slice(0, 5)
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
      if (voiceMale.length > voiceFemale) {
        return 'Male'
      } else {
        return 'Female'
      }
    },
    scores () {
      return 10 - this.$store.state.searchResult.length
    },
    scoresLevel () {
      if (this.scores < 0) {
        return 'bad'
      } else if (this.scores >= 0 && this.scores < 6) {
        return 'serious'
      } else {
        return 'nice'
      }
    }
  }
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
.results-wrapper {
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
      span.Male {
        color: $primary;
      }
      span.Female {
        color: $red;
      }
    }
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
    &.serious {
      color: $secondary;
    }
  }
  .description {
    font-size: 36px;
    letter-spacing: 23px;
    font-weight: 700;
    span {
      &:last-child {
        font-size: 12px;
        display: block;
        letter-spacing: 1px;
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
    .providing-blacklist {
      font-size: 12px;
      position: absolute;
      top: -0.5em;
      right: -0.5em;
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
