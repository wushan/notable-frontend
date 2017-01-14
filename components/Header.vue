<template lang="pug">
#navigation
  .columns.is-mobile
    .column
      nuxt-link(to="/")
        img.logo(src="~assets/img/notable-logo.svg")
    .column.text-right(v-if="user")
      nav#menu
        ul.menu
          li
            nuxt-link(to="/member", active-class="active") 我要提供黑名單
          li
            .user-menu
              .button.invisible(@click="toggleSubmenu")
                .avatar
                  img(v-bind:src="avatar")
                .brand {{user.data.brand}}
                .chevron-down
              .dropdown(v-if="submenu")
                ul.submenu(@click="closeSubmenu")
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
    },
    avatar () {
      if (this.user) {
        if (this.$store.state.User.data.photo) {
          return this.$store.state.User.data.photo
        } else {
          return 'https://dummyimage.com/256x256/ffa600/fff.png&text=' + this.$store.state.User.data.username.split('')[0]
        }
      }
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
  padding: .5em;
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
      text-align: center;
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
#menu {
  ul.menu {
    margin: 0;
    padding: 0;
    display: block;
    & > li {
      display: inline-block;
      vertical-align: middle;
      margin-right: 1em;
      &:last-child {
        margin-right: 0;
      }
      a {
        color: $darkgray;
        text-decoration: none;
        &:hover, &.active {
          color: $pureblack;
        }
      }
    }
  }
  .avatar {
    display: inline-block;
    vertical-align: middle;
    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .brand {
    display: inline-block;
    vertical-align: middle;
    margin: 0 .5em;
  }
  .chevron-down {
    display: inline-block;
    vertical-align: middle;
    &:after {
      display: inline-block;
      vertical-align: middle;
      content: '\f2f9';
      font-family: 'Material-Design-Iconic-Font';
    }
  }
}
</style>