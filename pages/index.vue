<template lang="pug">
#intro
  section.hero-container.search-wrapper
    .background-color
    .background-img(v-if="randomImages", v-bind:style="'background-image: url(' + randomImages.urls.full + ');'")
    .background-img(v-else)
    .image-credit(v-if="randomImages")
      .author
        span Photo by 
        .avatrar
          img(v-bind:src="randomImages.user.profile_image.small")
        .name
          a(v-bind:href="'https://unsplash.com/@' + randomImages.user.username", target="_blank") {{randomImages.user.name}}
          |  /  
          a(href="https://unsplash.com", target="_blank") Unsplash
    .hero-content
      .restrict.container
        h1.title.centered
          span 你好，不管你要訂哪一天，
          span(v-if="windowAv")
            vue-typer(:text='["都沒位子","都不可能","都公休"]', :repeat='Infinity', :shuffle='false', initial-action='typing', :pre-type-delay='300', :type-delay='300', :pre-erase-delay='2000', :erase-delay='550', erase-style='select-all', :erase-on-complete='false', caret-animation='blink')
      .restrict-small.container
        .controlgroup.centered
          searchNumb
          p
            | 近期舉報：
            nuxt-link.recentNumber(v-bind:to="'/number/' + num.number", v-for="num in recents") {{num.number}}
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
      .call-action.centered
        nuxt-link.button.invert(to="/member") 奧客通報
</template>
<script>
import Api from '~assets/api/api'
import searchNumb from '~components/searchNumb.vue'
export default {
  name: 'Home',
  head: {
    title: '小老闆團結！史上最絕奧客防治服務'
  },
  mounted () {
    this.windowAv = true
    this.init()
  },
  data () {
    return {
      error: null,
      windowAv: false,
      images: null,
      recents: []
    }
  },
  components: {
    searchNumb
  },
  methods: {
    init () {
      Api.getUnsplashImages ((err, res) => {
        if (err) {
          console.log(err)
        } else {
          this.images = res.data.results
        }
      })
      Api.getRecentNumbers ((err, res) => {
        if (err) {
          console.log(err)
        } else {
          this.recents = res.data
        }
      })
    }
  },
  computed: {
    randomImages () {
      var imagesArray
      if (this.images) {
        return this.images[Math.floor(Math.random()*10)]
      }
    }
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
    padding-bottom: 5em;
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
  .recentNumber {
    margin: .5em;
    color: $white;
    &:hover {
      text-decoration: none;
    }
  }
  .background-color {
    background-color: $pureblack;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    border-radius: 0 0 100% 100%;
    transform-origin: center bottom;
    transform: scale(4);
  }  
  .background-img {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-image: url('~assets/img/random/1.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 0 0 100% 100%;
    transform-origin: center bottom;
    transform: scale(4);
    opacity: .65;
  }
  .hero-content {
    margin-bottom: 10vh;
  }
  .title {
    @include breakpoint(768px) {
     h1 {
      font-size: 3em;
     }
    }
  }
}
.image-credit {
  background-color: $pureblack;
  color: $white;
  position: absolute;
  top: 1em;
  right: 1em;
  padding: .5em 1em;
  font-size: 12px;
  font-style: italic;
  a {
    color: rgba($white, .7);
    text-decoration: none;
    font-style: normal;
    &:hover {
      color: $primary;
    }
  }
  & > span {
    
  }
  .author {
    display: flex;
    .avatrar {
      width: 18px;
      height: 18px;
      flex: initial;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 .5em;
    }
    .name {
      flex: 1;
    }
  }
}
</style>
