<template lang="pug">
.comment-block(v-if="comment")
  .comment-block-inner
    h3.title
      .comment-user {{comment.username}}
      .comment-date {{fromNow}}
    .comment-contents {{comment.comment}}
    .comment-meta(v-if="user")
      a(v-if="!commentForm", @click="openCommentForm") 回覆
    .comments-toggle(v-if="comment.comments")
      a(v-if="!collapse", @click="doCollapse")
        i.zmdi.zmdi-minus-circle-outline
      a(v-else, @click="expand")
        i.zmdi.zmdi-plus-circle-o
  transition(name="fade", mode="out-in")
    form.comment-form(v-if="commentForm", @submit.prevent.stop="submitComment")
      .controlgroup
        .controls
          textarea(v-model="form.content")
      .call-action
        button.button(type="button", @click="closeCommentForm") 取消
        button.button.primary(type="submit") 送出
  transition-group(name="fade", mode="out-in")
    comment(v-show="!collapse", v-for="childcomment in comment.comments", :key="childcomment.id", :comment="childcomment")
</template>

<script>
import bus from '~components/bus'
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'comment',
  props: ['comment'],
  computed: {
    fromNow () {
      return moment(this.comment.postdate).from(moment())
    },
    user () {
      return this.$store.state.User
    }
  },
  created () {
    bus.$on('disableCommentForm', () => {
      this.commentForm = false
    })
  },
  data () {
    return {
      commentForm: false,
      collapse: false,
      form: {
        content: ''
      }
    }
  },
  methods: {
    doCollapse () {
      this.collapse = true
    },
    expand () {
      this.collapse = false
    },
    submitComment () {
      axios.post(this.$store.state.baseurl + 'news/' + this.$route.params.id + '/comments', {
        parent_id: this.comment.id,
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
    openCommentForm () {
      bus.$emit('disableCommentForm')
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
      position: relative;
      .comments-toggle {
        position: absolute;
        left: -1.3em;
        top: 1.1em;
      }
    }
    .comment-block {
      margin-left: 2em;
      font-size: inherit;
    }
  }
}
</style>
