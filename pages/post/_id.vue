<template lang="pug">
  .news-post.container.restrict.frame
    newsItem(:news="post")
    .comments-wrapper
      .comment comment A
      .comment comment B
      .comment comment C

</template>
<script>
import axios from 'axios'
import newsItem from '~components/newsItem'
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  async asyncData ({ params }) {
    let {data} = await axios.get('http://notable-spider.wushan.io/api/news/' + params.id)
    return { post: data }
  },
  head () {
    return {
      title: 'Pool'
    }
  },
  mounted () {
  },
  data () {
    return {
      post: null
    }
  },
  components: {
    newsItem
  },
  methods: {}
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#pool {}
</style>
