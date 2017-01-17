<template lang="pug">
  #about
    section
      .restrict.container
        h1.title.centered 小老闆團結！史上最絕奧客防治服務
      .restrict-small.container
        p 2014 年底，我們終於創業
        p 開設了一間屬於我們的餐廳，從地板、窗框、油漆到一切裝飾品，菜色、桌椅、廚具到衛浴，全部一點一滴的累積，逐步建構起這家店在我們想像中的樣子。創業之初舉步維艱，每天長達十多個小時的工作，只為換得顧客滿意的笑容。
        p 當然，真正開始之前我們仔細地規劃一切，一而再、再而三的研究過成本，不斷地檢視手邊的資金是否能夠支持這個夢想穩健邁進，想當然爾，計畫永遠趕不上變化，添購設備的成本計算失誤，可以忍；颱風天食材價格暴漲的成本，可以忍；租金漲價的成本，也可以忍。
        p 孰可忍孰不可忍，一個只有寥寥幾桌的小餐館，因為一大桌客人的訂位而做足了事前準備，調派員工；補充食材，卻怎麼也料不到，他們一通電話也沒有的就讓空空蕩蕩的小店與本來就不高的營業額度過了一個難熬的黃金假期。
        p 身為服務業的苦辣酸甜，只有親身經歷的人才懂，我們要合作起來，做有尊嚴的服務業，至於那些連基本尊重都做不到的人們啊！
        p 你們回家吃自己吧！
        p.text-right by 小老闆 2017.01.17
    nuxt-child
</template>
<script>
export default {
  head: {
    title: '小老闆團結！史上最絕奧客防治服務'
  },
  created () {
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
#about {
  .title {
    color: $pureblack;
    font-weight: 600;
  }
}
</style>
