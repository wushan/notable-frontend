<template lang="pug">
  #pool
    section#pool-container
      .container.restrict
        .page-nav.frame.text-right
          nuxt-link(v-if="prevPage", :to="prevPage")
            i.zmdi.zmdi-chevron-left
          span(v-else)
            i.zmdi.zmdi-chevron-left
          span
            span.current {{$route.params.page}}
            | /
            span.lastpage {{lastPage}}
          nuxt-link(v-if="nextPage", :to="nextPage")
            i.zmdi.zmdi-chevron-right
          span(v-else)
            i.zmdi.zmdi-chevron-right
        nuxt-child
        .page-nav.frame.text-right
          nuxt-link(v-if="prevPage", :to="prevPage")
            i.zmdi.zmdi-chevron-left
          span(v-else)
            i.zmdi.zmdi-chevron-left
          span
            span.current {{$route.params.page}}
            | /
            span.lastpage {{lastPage}}
          nuxt-link(v-if="nextPage", :to="nextPage")
            i.zmdi.zmdi-chevron-right
          span(v-else)
            i.zmdi.zmdi-chevron-right
</template>

<script>
import axios from 'axios'
export default {
  fetch ({ params, redirect }) {
    if (!params.page) {
      redirect('/pool/1')
    }
  },
  async asyncData ({ store, params }) {
    let {data} = await axios.get(store.state.baseurl + 'news/count')
    return { count: data.count }
  },
  data () {
    return {
    }
  },
  watch: {
    // '$route': 'updateParams'
  },
  methods: {
    // updateParams () {
    //   console.log('trigggg')
    //   this.currentPage = this.$route.params.page
    //   console.log(this.$route.params.page)
    //   console.log(this.currentPage)
    // }
  },
  computed: {
    nextPage () {
      if (parseInt(this.$route.params.page) + 1 <= this.lastPage) {
        return JSON.stringify(parseInt(this.$route.params.page) + 1)
      }
    },
    prevPage () {
      if (parseInt(this.$route.params.page) - 1 >= 1) {
        return JSON.stringify(parseInt(this.$route.params.page) - 1)
      } else {
        return null
      }
    },
    lastPage () {
      return Math.floor(this.count / 10)
    }
  }
}
</script>

<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#pool {
  padding: 2em 0;
}
#pool-container {
  width: 100%;
}
.page-nav {
  color: $gray;
  span, a {
    display: inline-block;
    vertical-align: middle;
    padding: 0 .3em;
  }
  span {
    &.current {
      color: $pureblack;
    }
    &.lastpage {
      font-size: 14px;
    }
  }
  a {
    color: $pureblack;
  }
}
</style>
