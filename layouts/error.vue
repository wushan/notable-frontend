<template lang="pug">
section#errorpage
  .container.restrict.centered
    h1 OOPS ! {{ error.statusCode }}
    .info {{ error.message }}
    .call-action
      a.button(href="javascript:;", @click="backHistory") 回上頁
      nuxt-link.button(to="/" v-if="error.statusCode === 404") 回首頁
</template>
<script>
export default {
  head: {
    // title: '小老闆團結！史上最絕奧客防治服務 - NOTABLE「嘸位la！」',
    title: '歐歐！'
  },
  props: ['error'],
  methods: {
    backHistory () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#errorpage {
  min-height: calc( 100vh - 391px);
  padding: 2em 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 3em;
    margin-bottom: 0;
    @include breakpoint(1280px) {
      font-size: 5em;
    }
  }
  .call-action {
    margin-top: 2em;
  }
}
</style>
