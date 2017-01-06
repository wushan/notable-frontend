<template lang="pug">
  nav#navigation
    .columns.is-mobile
      .column
        nuxt-link(to="/")
          img.logo(src="~assets/img/notable-logo.svg")
      .column.text-right
        nuxt-link.button.primary(to="/signup") 申請加入
        nuxt-link.button(to="/login") 登入
</template>
<style lang="scss">
@import "~assets/css/var";
#navigation {
  // background-color: $brown;
  padding: .5em 1em;
  color: $white;
  border-bottom: 1px solid $lightgray;
  a {
    display: inline-block;
    vertical-align: middle;
  }
  .logo {
    padding: 5px 0;
    margin: 0;
  }
}
</style>