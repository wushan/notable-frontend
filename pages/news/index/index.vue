<template lang="pug">
  .news-wrapper.container
    .news-list(v-if="newsList.length >= 1")
      newsItem.frame(v-for="news in newsList", :news="news", :key="news.id")

</template>
<script>
import axios from 'axios'
import newsItem from '~components/newsItem'
export default {
  async asyncData ({ store, params }) {
    let {data} = await axios.get(store.state.baseurl + 'news?filter[include]=comments')
    return { newsList: data }
  },
  head () {
    return {
      title: '新聞'
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
