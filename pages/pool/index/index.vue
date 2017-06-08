<template lang="pug">
  .news-wrapper.container.frame.restrict
    .news-list(v-if="newsList.length >= 1")
      newsItem(v-for="news in newsList", :news="news", :key="news.id")

</template>
<script>
import axios from 'axios'
import newsItem from '~components/newsItem'
export default {
  async asyncData ({ params }) {
    let {data} = await axios.get('http://notable-spider.wushan.io/api/news')
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
