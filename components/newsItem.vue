<template lang="pug">
article.news-post
  header
    h3
      a(:href="news.url", target="_blank")
        .source
          img(:src="sourceicon")
        .title {{news.title}}
  footer
    time {{date}}
    nuxt-link(:to="'/post/' + news.id") comments (number)
</template>

<script>
import moment from 'moment'
export default {
  props: ['news'],
  data () {
    return {
    }
  },
  computed: {
    date () {
      return moment(this.news.date).format('YYYY/MM/DD')
    },
    sourceicon () {
      var iconlink
      switch (this.news.source) {
        case 'appledaily':
          iconlink = '/appledaily-icon.png'
          break
        case 'appledaily-local':
          iconlink = '/appledaily-icon.png'
          break
        case 'appledaily-life':
          iconlink = '/appledaily-icon.png'
          break
        case 'udn':
          iconlink = '/udn-icon.png'
          break
        case 'udn-breakingnews':
          iconlink = '/udn-icon.png'
          break
        case 'ettoday':
          iconlink = '/ettoday-icon.png'
          break
        case 'tvbs':
          iconlink = '/tvbs-icon.png'
          break
      }
      return iconlink
    }
  }
}
</script>

<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
.news-post {
  h3 {
    a {
      color: $pureblack;
      display: flex;
      .source {
        flex: initial;
        width: 30px;
        margin-right: .5em;
        img {
          display: block;
          width: 24px;
          height: 24px;
        }
      }
      .title {
        flex: 1;
      }
    }
  }
  footer {
    font-size: 12px;
    color: $darkgray;
    padding: .5em 0 0 0;
    a {
      margin-left: .5em;
    }
  }
}
</style>
