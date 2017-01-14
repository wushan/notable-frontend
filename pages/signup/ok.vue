<template lang="pug">
  #message
    section
      .container.restrict-small
        .frame.centered
          h1.title 註冊成功
          p 現在，把你的黑名單告訴我們吧！
          nuxt-link.button.primary(to="") 輸入黑名單
          nuxt-link.button(to="") 查詢澳客

</template>

<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#message {
  min-height: calc(100vh - 332px);
}
</style>
<script>
export default {
  name: 'Message',
  head: {
    // title: '小老闆團結！史上最絕奧客防治服務 - NOTABLE「嘸位la！」',
    title: '註冊成功'
  },
  data () {
    return {
      
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>