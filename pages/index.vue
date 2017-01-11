<template lang="pug">
  #intro
    section.hero-container.search-wrapper
      .hero-content
        .restrict.container
          h1.title.centered 你好，不管你要訂哪一天，
            vue-typer(:text='["都沒位子","都不可能","都公休"]', :repeat='Infinity', :shuffle='false', initial-action='typing', :pre-type-delay='300', :type-delay='300', :pre-erase-delay='2000', :erase-delay='550', erase-style='select-all', :erase-on-complete='false', caret-animation='blink')
        .restrict-small.container
          .controlgroup.centered
            .controls
              input.phone-type(type="search", v-model="number")
              button 肉搜你
            span 範例：手機： 0978978078；市話：0228785487 - 不用自己輸入空格
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
var Cleave = require('cleave.js')
require('cleave.js/dist/addons/cleave-phone.tw')
export default {
  mounted () {
    console.log('created')
    console.log(window)
    var cleave = new Cleave('.phone-type', {
      phone: true,
      phoneRegionCode: 'tw'
    })
  },
  data () {
    return {
      number: null
    }
  },
  components: {
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
