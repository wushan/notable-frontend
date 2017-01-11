<template lang="pug">
  nav#navigation
    .columns.is-mobile
      .column
        nuxt-link(to="/")
          img.logo(src="~assets/img/notable-logo.svg")
      .column.text-right(v-if="user")
        .user-menu
          .button.primary(@click="toggleSubmenu") {{user.data.brand}}
          .dropdown(v-if="submenu")
            ul.submenu(@click="closeSubmenu")
              li
                nuxt-link(to="/member") 輸入黑名單
              li
                nuxt-link#logout(to="/logout") 登出
      .column.text-right(v-else)
        nuxt-link.button.primary(to="/signup") 申請加入
        nuxt-link.button(to="/login") 登入
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      submenu: false
    }
  },
  mounted () {
  },
  computed: {
    user () {
      return this.$store.state.User
    }
  },
  methods: {
    toggleSubmenu () {
      this.submenu = !this.submenu
    },
    closeSubmenu () {
      console.log('trig')
      this.submenu = false
    }
  }
}
</script>
<style lang="scss">
@import "~assets/css/var";
#navigation {
  // background-color: $brown;
  padding: .5em 1em;
  color: $black;
  border-bottom: 1px solid $lightgray;
  a {
    display: inline-block;
    vertical-align: middle;
  }
  .logo {
    padding: 5px 0;
    margin: 0;
  }
  .user-menu {
    position: relative;
  }
  .dropdown {
    z-index: 2;
    margin: 1em 0 0 0;
    padding: 0;
    position: absolute;
    right: 0;
    top: 100%;
    padding: .5em 1em;
    box-sizing: border-box;
    background-color: $white;
    border: 1px solid $gray;
    border-radius: 6px;
    box-shadow: 0px 10px 40px -5px rgba(37, 45, 51, 0.25);
    width: 100%;
    max-width: 240px;
    &:before {
      display: block;
      position: absolute;
      right: 17px;
      top: -17px;
      content: "\f2f8";
      height: 16px;
      width: 18px;
      color: $gray;
      font-family: 'Material-Design-Iconic-Font';
      font-size: 40px;
      line-height: 25px;
    }
    &:after {
      display: block;
      position: absolute;
      right: 17px;
      top: -16px;
      content: "\f2f8";
      height: 16px;
      width: 18px;
      color: #ffffff;
      font-family: 'Material-Design-Iconic-Font';
      font-size: 40px;
      line-height: 25px;
    }
    ul {
      display: block;
      list-style-type: none;
      margin: 0;
      padding: 0;
      text-align: left;
      li {
        display: block;
        a {
          padding: .5em 0;
          display: block;
          color: $darkgray;
          text-decoration: none;
          &:hover {
            color: $primary;
          }
        }
      }
    }
  }
}
</style>