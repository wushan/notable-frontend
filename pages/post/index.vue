<template lang="pug">
  #post
    section#post-container
      .container.restrict
        nuxt-child
</template>
<script>
export default {
  head () {
    return {
      title: '新聞'
    }
  },
  mounted () {
  },
  data () {
    return {
    }
  },
  components: {
  },
  methods: {}
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#post {
  min-height: calc( 100vh - 391px);
  padding: 2em 0;
  box-sizing: border-box;
}
#post-container {
  width: 100%;
}
</style>
