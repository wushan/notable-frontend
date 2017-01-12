<template lang="pug">
  #legal
    section.hero-container.normal
      .hero-content
        .restrict.container
          h1.title.centered Legal
          navigation
    nuxt-child
</template>
<script>
import Navigation from '~components/navigation-footer.vue'
export default {
  created () {
    this.$router.replace('/legal/privacy')
  },
  data () {
    return {

    }
  },
  components: {
    Navigation
  }
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';

</style>
