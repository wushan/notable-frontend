<template lang="pug">
article.news-post(:class="{isDetail: available}", @click="goPost('/post/' + news.id)")
  header
    h3
      a(:href="news.url", target="_blank")
        .source
          img(:src="sourceicon")
        .title {{news.title}}
  footer(v-if="available")
    time {{fromNow}}
    a(@click="toggleCommentForm", v-if="user") 發表評論 ({{news.comments.length}})
    nuxt-link.icon-button(to="/login", v-else)
      i.zmdi.zmdi-comment-alt-text
      span 請先登入
  footer(v-else)
    time {{fromNow}}
    nuxt-link(:to="'/post/' + news.id", v-if="news.comments.length > 0") {{news.comments.length}} 則評論
    nuxt-link(:to="'/post/' + news.id", v-else) 發表評論
  form.comment-form(v-if="available && commentForm", @submit.prevent.stop="submitComment")
    .controlgroup
      .controls
        textarea(v-model="form.content")
    .call-action
      button.button(type="button", @click="closeCommentForm") 取消
      button.button.primary(type="submit") 送出
</template>

<script>
import axios from 'axios'
import bus from '~components/bus'
import moment from 'moment'
export default {
  props: ['news', 'available'],
  data () {
    return {
      commentForm: false,
      form: {
        content: ''
      }
    }
  },
  methods: {
    goPost (url) {
      if (!this.available) {
        this.$router.push(url)
      }
    },
    submitComment () {
      axios.post(this.$store.state.baseurl + 'news/' + this.$route.params.id + '/comments', {
        parent_id: '',
        username: this.$store.state.User.data.id,
        comment: this.form.content,
        postdate: new Date()
      })
      .then((res) => {
        bus.$emit('recentReply', res.data)
        this.closeCommentForm()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    toggleCommentForm () {
      bus.$emit('disableCommentForm')
      this.commentForm = !this.commentForm
    },
    openCommentForm () {
      bus.$emit('disableCommentForm')
      this.commentForm = true
    },
    closeCommentForm () {
      this.commentForm = false
    }
  },
  computed: {
    fromNow () {
      return moment(this.news.date).from(moment())
    },
    user () {
      return this.$store.state.User
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
  transition: .3s all ease;
  border: 1px solid transparent;
  cursor: pointer;
  &:hover {
    // box-shadow: 0 0 12px rgba($black, .33);
    border: 1px solid $lightgray;
    background-color: $smokygray;
    // z-index: 99;
  }
  &.isDetail {
    h3 {
      font-size: 1.4em;
    }
  }
  .comment-form {
    margin-top: 1em;
  }
  h3 {
    display: inline-block;
    vertical-align: middle;
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
