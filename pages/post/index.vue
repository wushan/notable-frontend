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
#post-container {
  width: 100%;
}
</style>
