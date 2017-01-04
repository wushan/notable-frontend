<template lang="pug">
  nav#navigation
    .columns.is-mobile
      .column.is-half
        nuxt-link.button(to="/") Home
      .column.is-half.has-text-right
        nuxt-link.button(to="/signup") 申請加入
        nuxt-link.button(to="/login") 登入
</template>
<style lang="scss">
#navigation {
  background-color: #43260B;
  padding: .5em 1em;
}
</style>