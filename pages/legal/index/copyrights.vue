<template lang="pug">
  #copyrights
    section
      .container.restrict
        p 本網站的完成借助眾多網路資源及廣大免費服務提供商，特標注本站各類圖像、UI 元件等素材來源以及採用的各式開放原始碼模組，以回饋大眾。
        h4 圖像
        .columns
          .column
            .project
              a(href="http://www.flaticon.com/", target="_blank")
                img(src="~assets/img/brands/flaticon.png")
              span FLATICON
          .column
            .project
              a(href="http://zavoloklom.github.io/material-design-iconic-font/", target="_blank")
                img(src="~assets/img/brands/mdif.png")
              span Material Design Iconic-font
          .column
            .project
        h4 技術
        .columns
          .column
            .project
              a(href="https://nodejs.org/", target="_blank")
                img(src="~assets/img/brands/nodejs.png")
              span Node.js
          .column
            .project
              a(href="http://loopback.io/", target="_blank")
                //- img(src="http://loopback.io/images/overview/loopback.svg")
                img(src="~assets/img/brands/loopback.png")
              span Loopback
          .column
            .project
              a(href="https://vuejs.org/", target="_blank")
                img(src="~assets/img/brands/vuejs.png")
              span Vue.js
          .column
            .project
              a(href="https://nuxtjs.org", target="_blank")
                img(src="~assets/img/brands/nuxtjs.png")
              span Nuxt.js

</template>
<script>
export default {
  head: {
    title: '版權說明',
    meta: [
      { hid: 'description', content: "奧客查詢、顧客負評，最強奧客電話查詢服務，小老闆拒絕再迎合奧客！" },
      { hid: 'keywords', content: "靠北奧客 拒絕奧客 奧客查詢 澳洲來的客人 奧客電話查詢 用餐紀錄 餐廳黑名單 餐飲業奧客 訂位不接電話 NOSHOW"}
    ]
  },
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
  padding: 2em 0 6em 0;
  box-sizing: border-box;
  .project {
    span {
      display: block;
      text-align: center;
      font-size: 12px;
      color: $darkgray;
      margin-top: 1em;
    }
  }
  a {
    display: block;
    img {
      transition: .3s all ease;
      filter: grayscale(100%);
    }
    &:hover {
      img {
        filter: grayscale(0);
      }
    }
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
