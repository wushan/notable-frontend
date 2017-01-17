<template lang="pug">
  #press
    section#press-container
      .container.restrict
        .frame.centered
          h1.title 媒體中心
          p 建構中
          nuxt-link.button(to="/") 返回

</template>

<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#press {
  min-height: calc( 100vh - 391px);
  padding: 2em 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
#press-container {
  width: 100%;
  .title {
    text-align: center;
    color: $pureblack;
  }
}
</style>
<script>
export default {
  name: 'Press',
  head: {
    title: '媒體中心'
  },
  data () {
    return {}
  },
  validations: {
  },
  mounted () {
  },
  methods: {}
}
</script>