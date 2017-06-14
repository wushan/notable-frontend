<template lang="pug">
  #press
    section#press-container
      .container.restrict-large.centered
        h1.title 媒體報導
        .columns.is-gapless.press-list
          .column.is-4-tablet.press(v-for="article in press")
            .frame
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
