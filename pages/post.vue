<template lang="pug">
  .news-post-wrapper
    nuxt-child
</template>
<script>
export default {
  head () {
    return {
      title: 'Pool'
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
#pool {}
</style>
