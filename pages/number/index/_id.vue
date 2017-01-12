<template lang="pug">
  section#results.container.restrict.results-wrapper
    .frame
      .columns
        .column
          h3 查詢標的
          .number {{number}}
          .additional
            .voice 電話持有人很可能是 {{voice}}
          ul
            li(v-for="item in searchResult") {{item.number}}/{{item.date}}
        .column.grade.centered
          h3 綜合評分
          .score-wrapper
            .score
              .points 8.0
              .description 表現良好
      footer
        p 注意！本服務旨在提供小老闆互助，避免紀錄不佳的顧客影響您正常的生意，請勿利用本站資訊對當事人進行任何有損其利益之行為，亦不得在本站之外以任何方式公開此評分資訊。
</template>
<script>
import axios from 'axios'
export default {
  fetch ({ store, params }) {
    return axios.get('https://api.notable.wushan.io/records', {
      params: {
        "filter": {
          "where": {
            "number": params.id
          }
        }
      }
    })
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
    }
  }
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
.results-wrapper {
  .column {
    &:first-child {
      border-right: 1px solid $lightgray;
    }
  }
  .number {
    font-size: 48px;
    // font-weight: 100;
    color: $pureblack;
  }
  .additional {
    font-size: 24px;
  }
  .points {
    font-size: 288px;
    font-weight: 100;
    line-height: 1;
  }
  .description {
    font-size: 36px;
    letter-spacing: 23px;
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
  footer {
    border-top: 1px solid $lightgray;
    font-size: .8em;
    color: $darkgray;
    padding: 0 2em;
  }
}
</style>
