<template lang="pug">
  footer#footer
    .restaurant-animation
      .tables
      .floor
    aside.bottom-nav.centered
      .container.restrict
        nuxt-link(to="/") 隱私權
        nuxt-link(to="/") 使用條款
        nuxt-link(to="/") 媒體中心
    .copyrights.centered
      .container.restrict Copyrights by 小老闆的逆襲. All Rights Reserved.
</template>
<style lang="scss">
@import "~assets/css/var";
.restaurant-animation {
  .tables {
    height: 130px;
    background-image: url('~assets/img/tables.svg');
    background-repeat: repeat-x;
    position: relative;
    bottom: -20px;
  }
  .floor {
    height: 44px;
    background-image: url('~assets/img/floor.svg');
    background-repeat: repeat-x;
  }
}
#footer {
  .bottom-nav {
    background-color: $brown;
    box-shadow: inset 0 10px 12px 0 rgba(darken($brown, 10%), .7);
    a {
      display: inline-block;
      vertical-align: middle;
      margin: 0 1em;
      text-decoration: none;
      color: $white;
    }
  }
  .copyrights {
    font-size: 12px;
  }
}
</style>
