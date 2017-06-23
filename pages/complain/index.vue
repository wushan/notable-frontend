<template lang="pug">
  #complain
    section#complain-container
      .container.restrict
        
        p {{complains}}
</template>

<script>
import axios from 'axios'
import newsItem from '~components/newsItem'
export default {
  fetch ({ params, redirect }) {
    // if (!params.page) {
    //   redirect('/news/1')
    // }
  },
  head () {
    return {
      title: '抱怨一下'
    }
  },
  async asyncData ({ store, params }) {
    let {data} = await axios.get(store.state.baseurl + 'complains?filter[include]=author&access_token=DJ0oAonHX4IzJsf8ElhyaKC6lAWGRUBN7s9h2szfuH1EIJ9QFGPE47XiY34JeKqc')
    return { complains: data }
  },
  components: {
    newsItem
  },
  data () {
    return {
      complains: null
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
    // nextPage () {
    //   if (parseInt(this.$route.params.page) + 1 <= this.lastPage) {
    //     return JSON.stringify(parseInt(this.$route.params.page) + 1)
    //   }
    // },
    // prevPage () {
    //   if (parseInt(this.$route.params.page) - 1 >= 1) {
    //     return JSON.stringify(parseInt(this.$route.params.page) - 1)
    //   } else {
    //     return null
    //   }
    // },
    // lastPage () {
    //   return Math.floor(this.count / 10)
    // }
  }
}
</script>

<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#complain {
  min-height: calc( 100vh - 391px);
  padding: 2em 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
#complain-container {
  width: 100%;
}
</style>
