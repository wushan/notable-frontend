<template lang="pug">
  .container.restrict.navigation-footer
    nuxt-link(to="/legal/privacy", active-class="active") 隱私權
    nuxt-link(to="/legal/tou", active-class="active") 使用條款
    nuxt-link(to="/legal/copyrights", active-class="active") 版權說明
    nuxt-link(to="/collaborate", active-class="active") 合作提案
    nuxt-link(to="/press", active-class="active") 媒體中心
</template>
<style lang="scss">
@import "~assets/css/var";
.navigation-footer {
    font-size: .9em;
  a {
    display: inline-block;
    vertical-align: middle;
    margin: 0 1em;
    text-decoration: none;
    // color: $brown;
    color: $white;
    border-bottom: 2px solid transparent;
    &:first-child {
        margin-left: 0;
    }
    // &.active, &:hover, &:active {
    //   border-bottom: 2px solid $brown;
    // }
  }
}
</style>
