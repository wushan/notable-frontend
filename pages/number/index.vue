<template lang="pug">
  #number
    section.hero-container.tiny
      .hero-content
        .restrict-small.container
          .controlgroup.centered
            searchNumb
    nuxt-child
</template>
<script>
import searchNumb from '~components/searchNumb.vue'
export default {
  mounted () {
  },
  data () {
    return {
    }
  },
  components: {
    searchNumb
  },
  methods: {}
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#number {
  box-sizing: border-box;
  min-height: calc( 100vh - 391px);
}
</style>
