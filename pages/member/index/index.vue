<template lang="pug">
form#addRecord
  .container.restrict
    .frame
      h4.title 加入黑名單，幫助小老闆不再傷心
      .columns
        .column
          .controlgroup
            .controls
              input(type="text", placeholder="電話")
              label 電話
        .column
          .controlgroup
            .controls
              input(type="text", placeholder="電話")
              label 電話
        .column
          .controlgroup
            .controls
              input(type="text", placeholder="電話")
              label 電話
      .columns
        .column
          .controlgroup
            .controls
              input(type="text", placeholder="電話")
              label 電話
      .call-action.restrict-small
        button.button.warning.full(type="submit") 不要再害了，好嗎？
</template>
<script>
// import Vue from 'vue'
// import VueNotifications from 'vue-notifications'
// var VueTyper = window.VueTyper.VueTyper
import axios from 'axios'
export default {
  mounted () {
  },
  data () {
    return {

    }
  },
  components: {
  }
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
</style>
