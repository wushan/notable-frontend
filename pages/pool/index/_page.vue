<template lang="pug">
  .news-wrapper
    .news-list(v-if="newsList.length >= 1")
      newsItem.frame(v-for="news in newsList", :news="news", :key="news.id")

</template>
<script>
import axios from 'axios'
import newsItem from '~components/newsItem'
var perPage = 10
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.page)
  },
  async asyncData ({ params }) {
    console.log(params)
    let {data} = await axios.get('http://localhost:3002/api/news?filter[include]=comments&filter[skip]=' + (params.page - 1) * perPage)
    return { newsList: data }
  },
  head () {
    return {
      title: 'Pool'
    }
  },
  mounted () {
  },
  data () {
    return {
      newsList: []
    }
  },
  components: {
    newsItem
  },
  methods: {}
}
</script>
<style lang="scss">
@import "~breakpoint-sass";
@import '~assets/css/var';
#pool {}
</style>
