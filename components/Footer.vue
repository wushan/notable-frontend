<template lang="pug">
footer#footer
  .restaurant-animation
    .windows
    .tables
    .floor
  aside.bottom-nav
      .container.restrict.navigation-footer
        nuxt-link(to="/about", active-class="active") 服務簡介
        nuxt-link(to="/member", active-class="active") 奧客通報
        nuxt-link(to="/contact", active-class="active") 聯絡我們
      .footer-menu
        navigation
  .copyrights
    .container.restrict.text-right
      | POWERED BY  
      b THE ANGRY BOSS.
</template>
<script>
  import Navigation from '~components/navigation-footer.vue'
  export default {
    components: {
      Navigation
    }
  }
</script>
<style lang="scss">
@import "~assets/css/var";
@keyframes animatedBackground {
  from { background-position: 0 0; }
  to { background-position: 100% 0; }
}
.restaurant-animation {
  .tables {
    height: 130px;
    background-image: url('~assets/img/tables.svg');
    background-repeat: repeat-x;
    background-position: 0 0;
    // animation: animatedBackground 5s linear infinite;
    position: relative;
    bottom: -20px;
  }
  .floor {
    height: 44px;
    background-image: url('~assets/img/floor.svg');
    background-repeat: repeat-x;
  }
  .windows {
    height: 60px;
    background-image: url('~assets/img/windows.svg');
    background-repeat: repeat-x;
  }
}
#footer {
  .bottom-nav {
    background-color: $brown;
    box-shadow: inset 0 10px 12px 0 rgba(darken($brown, 10%), .7);
    .footer-menu {
      background-color: $white;
      font-size: 13px;
      a {
        color: $darkgray;
        &:hover {
          color: $pureblack;
        }
      }
    }
  }
  .copyrights {
    font-size: 12px;
  }
}
</style>
