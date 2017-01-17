<template lang="pug">
  #member
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
  beforeMount () {
    if (!this.$store.state.User) {
      this.$router.push('/login')
    }
  },
  mounted () {
  },
  data () {
  },
  components: {
    searchNumb
  },
  methods: {
  }
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#member {
}
</style>
