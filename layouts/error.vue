<template lang="pug">
section#errorpage
  .container.restrict.centered
    h1 OOPS ! {{ error.statusCode }}
    .info {{ error.message }}
    .call-action
      nuxt-link.button(to="/" v-if="error.statusCode === 404") 回首頁
</template>
<script>
export default {
  props: ['error']
}
</script>

<style lang="scss">
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
  }
  .call-action {
    margin-top: 2em;
  }
}
</style>
