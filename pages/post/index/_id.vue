<template lang="pug">
  .news-post.container.restrict.frame
    newsItem(:news="post")
    .comments-wrapper
      comment(:comment="comment", v-for="comment in post.comments", :key="comment.id")
</template>
<script>
import axios from 'axios'
import newsItem from '~components/newsItem'
import comment from '~components/comment'
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  async asyncData ({ params }) {
    let {data} = await axios.get('http://localhost:3002/api/news/getNewsWithComments?id=' + params.id)
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
    newsItem,
    comment
  },
  methods: {}
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#pool {}
.comments-wrapper {
  margin-top: 1em;
}
</style>
