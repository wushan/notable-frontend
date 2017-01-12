<template lang="pug">
  #number
    nuxt-child
</template>
<script>
export default {
  created () {
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
#number {
  padding: 2em 0;
  box-sizing: border-box;
  min-height: calc( 100vh - 391px);
}
</style>
