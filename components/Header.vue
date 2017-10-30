<template lang="pug">
#navigation
  .columns.is-gapless.is-mobile
    .column.is-6-mobile.is-4-tablet
      nuxt-link(to="/")
        img.logo(src="~assets/img/notable-logo.svg")
    .column.is-6-mobile.is-8-tablet.text-right(v-if="user")
      nav#menu(v-click-outside="closeMenu")
        a.menu-trigger(@click="toggleMenu", :class="{isOpen: menu}")
          i.zmdi.zmdi-close(v-if="menu")
          i.zmdi.zmdi-menu(v-else)
        ul.menu
          li
            nuxt-link(to="/news", active-class="active") 奧客新聞
          //- li
          //-   nuxt-link(to="/complain", active-class="active") 抱怨一下
          li
            nuxt-link(to="/member", active-class="active") 通報奧客
          //- li
          //-   nuxt-link(to="/member/profile", active-class="active") 店舖檔案
          //- li
          //-   nuxt-link#logout(to="/logout") 登出
        .user-menu(v-click-outside="closeSubmenu")
          a.invisible(@click="toggleSubmenu", :title="user.data.brand")
            .avatar {{singleWord}}
              //- img(v-bind:src="avatar")
            .brand 您好
            .chevron-down
          .dropdown(v-if="submenu")
            ul.submenu(@click="closeSubmenu")
              li
                nuxt-link(to="/member/profile", active-class="active") 店舖檔案
              li
                nuxt-link#logout(to="/logout") 帳號登出
    .column.text-right(v-else)
      nav#menu
        a.menu-trigger(@click="toggleMenu", :class="{isOpen: menu}")
          i.zmdi.zmdi-close(v-if="menu")
          i.zmdi.zmdi-menu(v-else)
        ul.menu
          li
            nuxt-link(to="/news", active-class="active") 奧客新聞
          //- li
          //-   nuxt-link(to="/complain", active-class="active") 抱怨一下
          li
            nuxt-link.primary(to="/signup", active-class="active") 申請加入
          li
            nuxt-link(to="/login", active-class="active") 登入
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      submenu: false,
      menu: false
    }
  },
  mounted () {
  },
  computed: {
    user () {
      return this.$store.state.User
    },
    singleWord () {
      return this.user.data.brand.slice(0, 1)
    },
    avatar () {
      if (this.user) {
        if (this.$store.state.User.data.photo) {
          return this.$store.state.User.data.photo
        } else {
          return 'https://dummyimage.com/256x256/ffa600/fff.png&text=' + this.$store.state.User.data.email.split('')[0]
        }
      }
    }
  },
  methods: {
    closeMenu () {
      this.menu = false
    },
    toggleMenu () {
      this.menu = !this.menu
    },
    toggleSubmenu () {
      this.submenu = !this.submenu
    },
    closeSubmenu () {
      this.submenu = false
    }
  }
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import "~assets/css/var";
// .navigation {
//   display: flex;
//   justify-content: center;
//   align-content: center;
//   ul {
//     align-self: stretch;
//     display: flex;
//     align-items: center;
//     li {
//       align-self: stretch;
//       display: flex;
//       align-items: center;
//       position: relative;
//       a {
//         padding: 0 1em;
//         color: $darkgray;
//         &:hover, &.nuxt-link-active {
//           &:after {
//             content: '';
//             display: block;
//             position: absolute;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             height: 4px;
//             background-color: $black;
//           }
//         }
//       }
//     }
//   }
// }
#navigation {
  color: $black;
  // border-bottom: 1px solid $lightgray;
  box-shadow: 0 6px 12px -6px rgba($black, .13);
  background-color: $white;
  .logo {
    padding: .5em 0;
    margin: 0 0 0 .5em;
  }
  .user-menu {
    position: relative;
    display: flex;
    align-items: center;
    min-width: 100px;
    @include breakpoint(768px) {
      margin-left: 1em;
    }
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
  height: 100%;
  padding: 0 1em 0 0;
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  @include breakpoint(768px) {
    flex-direction: row;
    align-content: flex-end;
    justify-content: flex-end;
  }
  .menu-trigger {
    align-self: center;
    color: $primary;
    font-size: 1.7em;
    display: block;
    padding: 0 .5em;
    @include breakpoint(768px) {
      display: none;
    }
    &.isOpen {
      & + ul.menu {
        display: block;
        @include breakpoint(768px) {
          display: flex;
        }
      }
    }
  }
}
ul.menu {
  display: none;
  position: absolute;
  background-color: $white;
  top: 100%;
  right: .5em;
  box-shadow: 0 0px 12px 0px rgba($black, .33);
  text-align: center;
  z-index: 999;
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 9px 12px 9px;
    border-color: transparent transparent $white transparent;
    position: absolute;
    top: -12px;
    right: .3em;
  }
  li {
    display: block;
    border-bottom: 1px solid $lightgray;
    a {
      display: block;
      padding: .6em 2em;
      color: $black;
      transition: .3s all ease;
      &:hover, &.active, &.router-link-exact-active {
         background-color: $primary;
         color: $white;
      }
    }
  }
  @include breakpoint(768px) {
    display: flex;
    position: static;
    background-color: transparent;
    box-shadow: none;
    li {
      display: flex;
      border-bottom: 0;
      justify-content: center;
      align-content: center;
      a {
        padding: 0 1em;
        display: flex;
        align-items: center;
        border-bottom: 4px solid transparent;
        &:hover, &.active, &.router-link-exact-active {
          background-color: transparent;
          color: $black;
          border-bottom: 4px solid $primary;
        }
      }
    }
  }
}
.avatar {
  display: inline-block;
  vertical-align: middle;
  background-color: #ff5252;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: $white;
  text-align: center;
  line-height: 32px;
  font-weight: bold;
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
</style>
