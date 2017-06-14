<template lang='pug'>
  .news-post
    .page-nav.frame.text-right
      a.icon-button(@click="goBack")
        i.zmdi.zmdi-chevron-left
        span 返回
    .container.restrict.frame
      newsItem(:news='post', :available="true")
      .comments-wrapper
        comment(:comment='comment', v-for='comment in this.structuredComments', :key='comment.id')
    .page-nav.frame.text-right
      a.icon-button(@click="goBack")
        i.zmdi.zmdi-chevron-left
        span 返回
</template>
<script>
import axios from 'axios'
import bus from '~components/bus'
import newsItem from '~components/newsItem'
import comment from '~components/comment'
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  async asyncData ({ store, params }) {
    let {data} = await axios.get(store.state.baseurl + 'news/getNewsWithComments?id=' + params.id)
    return { post: data }
  },
  head () {
    return {
      title: this.post.title
    }
  },
  created () {
    bus.$on('recentReply', (data) => {
      data.username = Array.from(this.$store.state.User.data.email.split('@')[0])[0] + 'x'.repeat(Array.from(this.$store.state.User.data.email.split('@')[0]).length - 2) + Array.from(this.$store.state.User.data.email.split('@')[0])[Array.from(this.$store.state.User.data.email.split('@')[0]).length - 1]
      this.post.comments.unshift(data)
      this.structureComments()
    })
  },
  mounted () {
    this.structureComments()
  },
  data () {
    return {
      post: null,
      structuredComments: null
    }
  },
  components: {
    newsItem,
    comment
  },
  methods: {
    goBack () {
      this.$router.go('-1')
    },
    structureComments () {
      if (this.post.comments) {
        var tree = (function (data, root) {
          var r = []
          var o = {}
          data.forEach(function (a) {
            var comments = o[a.id] && o[a.id].comments
            if (comments) {
              a.comments = comments
            }
            o[a.id] = a
            if (a.parent_id === root) {
              r.push(a)
            } else {
              o[a.parent_id] = o[a.parent_id] || {}
              o[a.parent_id].comments = o[a.parent_id].comments || []
              o[a.parent_id].comments.push(a)
            }
          })
          return r
        }(this.post.comments, ''))
        this.structuredComments = tree
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.User
    }
  }
}
</script>
<style lang='scss'>
@import '~breakpoint-sass';
@import '~assets/css/var';
#pool {}
.comments-wrapper {
  margin-top: 1em;
  padding-left: 1em;
}
</style>
