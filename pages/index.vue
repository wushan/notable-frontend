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
          .recentlyReported
            span 近期舉報：
            nuxt-link.recentNumber(v-bind:to="'/number/' + num.number", v-for="num in recents", :key="num") {{num.number}}
  section
    h3.title.centered
      | 誰在使用 NOTABLE 平台
      span 目前共有 {{clientCount}} 間店加入本平台
    ul.clientlist
      li(v-for="client in clientList") {{client.brand}}/{{client.vat}}
  section.service-intro
    .restrict.container
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
      recents: [],
      clientList: null,
      clientCount: 0
    }
  },
  components: {
    searchNumb
  },
  methods: {
    init () {
      Api.getUnsplashImages((err, res) => {
        if (err) {
          console.log(err)
        } else {
          this.images = res.data.results
        }
      })
      Api.getRecentNumbers((err, res) => {
        if (err) {
          console.log(err)
        } else {
          this.recents = res.data
        }
      })
      Api.getClients((err, res) => {
        if (err) {
          console.log(err)
        } else {
          this.clientList = res.data.clients
          this.clientCount = res.data.counts
        }
      })
    }
  },
  computed: {
    randomImages () {
      if (this.images) {
        return this.images[Math.floor(Math.random() * 10)]
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
  .recentlyReported {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    span, .recentNumber {
      margin: .5em;
      color: $white;
      &:hover {
        text-decoration: none;
      }
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
