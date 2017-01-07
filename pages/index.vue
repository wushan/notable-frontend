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
              input(type="search")
              button 肉搜你
        .hero-table
          img(src="~assets/img/table.svg")
    section.service-intro
      .restrict.container
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

export default {
  mounted () {
    console.log('created')
    console.log(window)
    // const VueTyper = require('vue-typer').VueTyper
    // this.$options.components.VueTyper = require('vue-typer').VueTyper
  },
  data () {
    return {

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
    padding-top: 20%;
    @include breakpoint(1024px) {
      padding-top: 10%;
    }
  }
}
.search-wrapper {
  background-image: url('~assets/img/search-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  .title {
    @include breakpoint(768px) {
     h1 {
      font-size: 3em;
     }
    }
  }
  .hero-table {
    position: absolute;
    top: 76%;
    left: 0;
    right: 0;
    pointer-events: none;
  }
}
// @keyframes rocking {
//   0%,100% {transform: rotateZ(-10deg);},
//   50%     {transform: rotateZ(10deg);}
// }
</style>
