<template lang="pug">
footer#footer
  .restaurant-animation
    .windows
    .tables
    .floor
  aside.bottom-nav.centered
    navigation
  .copyrights.centered
    .container.restrict Copyrights by 小老闆的逆襲. All Rights Reserved.
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
  }
  .copyrights {
    font-size: 12px;
  }
}
</style>
