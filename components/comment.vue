<template lang="pug">
.comment-block(v-if="comment")
  .comment-block-inner
    h3.title
      a.comment-user() {{comment.username}}
      .comment-date {{fromNow}}
    .comment-contents {{comment.comment}}
    .comment-meta
      a(v-if="!commentForm", @click="openCommentForm") 回覆
  form.comment-form(v-if="commentForm", @submit.prevent.stop="submitComment")
    .controlgroup
      .controls
        textarea(v-model="form.content")
    .call-action
      button.button(type="button", @click="closeCommentForm") 取消
      button.button.primary(type="submit") 送出
  comment(v-for="childcomment in comment.comments", :key="childcomment.id", :comment="childcomment")
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'comment',
  props: ['comment'],
  computed: {
    fromNow () {
      return moment(this.comment.postdate).from(moment())
    }
  },
  data () {
    return {
      commentForm: false,
      form: {
        content: ''
      }
    }
  },
  methods: {
    submitComment () {
      axios.post(this.$store.state.baseurl + 'news/' + this.$route.params.id + '/comments', {
        username: 'string22',
        comment: this.form.content,
        postdate: new Date()
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    openCommentForm () {
      this.commentForm = true
    },
    closeCommentForm () {
      this.commentForm = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~breakpoint-sass";
@import '~assets/css/var';
.comments-wrapper {
  .comment-form {
    margin-bottom: 1em;
    .controlgroup {
      margin-bottom: 1em;
    }
  }
  .comment-block {
    font-size: .9em;
    .title {
      display: flex;
      // justify-content: center;
      align-content: center;
    }
    .comment-date {
      color: $darkgray;
      margin-left: .5em;
      font-size: 12px;
    }
    .comment-user, .comment-date {
      display: inline-block;
      vertical-align: middle;
      align-self: center;
      line-height: 21px;
    }
    .comment-user {
      text-decoration: underline;
      color: $darkgray;
    }
    .comment-contents {
      padding: .5em .5em .5em 0;
      color: $pureblack;
    }
  }
  .comment-block {
    .comment-block-inner {
      padding: 1em 0;
      border-top: 1px solid $lightgray;
    }
    .comment-block {
      margin-left: 2em;
      font-size: inherit;
    }
  }
}
</style>
