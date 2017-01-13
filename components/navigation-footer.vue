<template lang="pug">
  .container.restrict.navigation-footer
    nuxt-link(to="/legal/privacy") 隱私權
    nuxt-link(to="/legal/tou") 使用條款
    nuxt-link(to="/legal/copyrights") 版權說明
    nuxt-link(to="/collaborate") 合作提案
    nuxt-link(to="/press") 媒體中心
</template>
<style lang="scss">
@import "~assets/css/var";
.navigation-footer {
  a {
    display: inline-block;
    vertical-align: middle;
    margin: 0 1em;
    text-decoration: none;
    color: $white;
  }
}
</style>
