<template lang="pug">
  #press
    section#press-container
      .container.restrict
        .centered
          h1.title 媒體報導
          ul.press-list
            li.article.frame(v-for="article in press")
              .multimedia(v-if="article.video")
                .video-container
                  iframe(width="560", height="315", v-bind:src="article.video" frameborder="0" allowfullscreen)
              .multimedia(v-else)
                a(v-bind:href="article.url", target="_blank")
                  img(v-bind:src="article.image")
              .title.text-left
                a(v-bind:href="article.url", target="_blank") {{article.title}}
              .source.text-right
                a(v-bind:href="article.url", target="_blank") {{article.source}}

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
    color: $pureblack;
  }
  .press-list {
    margin: 0;
    padding: 0;
    display: flex;
    list-style-type: none;
    li {
      margin: 1em;
      flex: 1;
      .video-container {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 */
        padding-top: 25px;
        height: 0;
        iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      .title {
        a {
          color: $pureblack;
          text-decoration: none;
        }
        
      }
      .multimedia {
        margin-bottom: .5em;
      }
      .source {
        font-size: 12px;
        a {
          color: $link;
        }
      }
    }
  }
}
</style>
<script>
import Api from '~assets/api/api'
export default {
  name: 'Press',
  head: {
    title: '媒體報導'
  },
  data () {
    return {
      press: []
    }
  },
  validations: {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      Api.getMediaReports((err, res) => {
        if (err) {
          console.log(err)
        } else {
          this.press = res.data
        }
      })
    }
  }
}
</script>
