<template lang="pug">
  main
    section.hero-container.search-wrapper
      .restrict.container
        h1.title
          span 你好，不管你要訂哪一天，
          vue-typer(:text='["都沒位子","都不可能","都公休"]', :repeat='Infinity', :shuffle='false', initial-action='typing', :pre-type-delay='300', :type-delay='300', :pre-erase-delay='2000', :erase-delay='550', erase-style='select-all', :erase-on-complete='false', caret-animation='blink')
        p &nbsp;
        p &nbsp;
        p &nbsp;
        p &nbsp;
        p 史上最絕奧客防治服務
        h3 即將公開
</template>
<script>
// import Vue from 'vue'
// import VueNotifications from 'vue-notifications'
// var VueTyper = window.VueTyper.VueTyper

export default {
  head: {
    title: 'NOTABLE「嘸位la！」 - 小老闆團結！史上最絕奧客防治服務'
  },
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
<style lang="scss" scope>
@import '~assets/css/var';
h1 {
  font-size: 3em;
}
.hero-container {
  height: 100vh;
  box-sizing: border-box;
  text-align: center;
}
.search-wrapper {
  background-image: url('~assets/img/search-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
// @keyframes rocking {
//   0%,100% {transform: rotateZ(-10deg);},
//   50%     {transform: rotateZ(10deg);}
// }

.vue-typer {
  font-family: inherit;
}
.vue-typer .custom.char.typed {
  color: $primary;
}
.vue-typer .custom.char.selected {
  color: #E91E63;
}
.vue-typer .custom.caret {
  // animation: rocking 1s ease-in-out 0s infinite;
}
.vue-typer .custom.caret.typing {
  background-color: $primary;
}
.vue-typer .custom.caret.selecting {
  display: inline-block;
  background-color: #E91E63;
}
</style>
