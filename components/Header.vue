<template lang="pug">
#navigation
  .columns.is-mobile
    .column
      nuxt-link(to="/")
        img.logo(src="~assets/img/notable-logo.svg")
    .column.centered
      nav.navigation
        li
          nuxt-link(to="/pool") 新聞
        li
          nuxt-link(to="/complain") 抱怨
        li
    .column.text-right(v-if="user")
      nav#menu
        ul.menu
          li
            .user-menu
              .button.invisible(@click="toggleSubmenu", :title="user.data.brand")
                .avatar {{singleWord}}
                  //- img(v-bind:src="avatar")
                .brand 您好
                .chevron-down
              .dropdown(v-if="submenu")
                ul.submenu(@click="closeSubmenu")
                  li
                    nuxt-link(to="/member/profile", active-class="active") 店舖檔案
                  li
                    nuxt-link(to="/member", active-class="active") 通報奧客
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
@import "~assets/css/var";
ul.menu {
  li {
    display: inline-block;
    vertical-align: middle;
  }
}
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
    margin: 0 0 0 .5em;
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
