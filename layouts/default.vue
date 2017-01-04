<template lang="pug">
  #wrapper
    my-header
    nuxt
    my-footer
</template>

<script>
import MyHeader from '~components/Header.vue'
import MyFooter from '~components/Footer.vue'

export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style lang="scss">

</style>
