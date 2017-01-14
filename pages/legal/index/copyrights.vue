<template lang="pug">
  #copyrights
    section
      .container.restrict
        p 本網站的完成借助眾多網路資源及廣大免費服務提供商，特標注本站各類圖像、UI 元件等素材來源以及採用的各式開放原始碼模組，以回饋大眾。
        h4 圖像
        .columns
          .column
            a(href="http://www.flaticon.com/", target="_blank")
              img(src="https://media.freepik.com/flaticon/img/flaticon-logo.svg")
          .column
          .column
        h4 技術
        .columns
          .column
            a(href="https://nodejs.org/", target="_blank")
              img(src="https://nodesource.com/assets/nodejs-training.png")
          .column
            a(href="http://loopback.io/", target="_blank")
              //- img(src="http://loopback.io/images/overview/loopback.svg")
              img(src="https://d7umqicpi7263.cloudfront.net/img/product/369b5575-e2a8-4361-896f-9eec9f786030/f627dc3e-93c4-4cea-9354-3ae7c5073da6.png")
          .column
            a(href="https://vuejs.org/", target="_blank")
              img(src="https://vuejs.org/images/logo.png")
          .column
            a(href="https://nuxtjs.org", target="_blank")
              img(src="https://nuxtjs.org/_nuxt/img/logo_nav.png?be08efae0d5c46fd682e2a24f18545ae")

</template>
<script>
export default {
  mounted () {
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
#copyrights {
  img {
    max-height: 60px;
    width: auto;
  }
  a {
    display: block;
  }
  .columns {
    .column {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
