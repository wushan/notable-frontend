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
  },
  mounted () {
    if (this.$route.fullPath === '/legal' || this.$route.fullPath === '/legal/') {
      this.$router.replace('/legal/privacy')
    }
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
#legal {
  .navigation-footer {
    text-align: center;
  }
}
</style>
