<template lang="pug">
.comment-block(v-if="comment")
  .comment-block-inner
    h3.title
      a.comment-user() {{comment.username}}
      .comment-date {{fromNow}}
    .comment-contents {{comment.comment}}
  comment(v-for="childcomment in comment.comments", :key="childcomment.id", :comment="childcomment")
</template>

<script>
import moment from 'moment'
export default {
  name: 'comment',
  props: ['comment'],
  computed: {
    fromNow () {
      return moment(this.comment.postdate).from(moment())
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~breakpoint-sass";
@import '~assets/css/var';
.comments-wrapper {
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
