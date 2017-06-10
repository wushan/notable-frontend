<template lang="pug">
article.news-post
  header
    h3
      a(:href="news.url", target="_blank")
        .source
          img(:src="sourceicon")
        .title {{news.title}}
  footer
    time {{fromNow}}
    nuxt-link(:to="'/post/' + news.id", v-if="news.commentsCount > 0") {{news.commentsCount}} 則評論
    nuxt-link(:to="'/post/' + news.id", v-else) 發表評論
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
    fromNow () {
      return moment(this.news.date).from(moment())
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
    font-size: 14px;
    color: $darkgray;
    padding: .5em 0 0 0;
    a {
      color: $darkgray;
      margin-left: .5em;
      border-left: 1px solid $gray;
      padding-left: .5em;
      &:hover {
        color: $pureblack;
      }
    }
  }
}
</style>
