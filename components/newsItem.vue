<template lang="pug">
article.news-post
  header
    h3
      nuxt-link(:to="news.url") {{news.source}} - {{news.title}}
  footer
    time {{news.date}}
    nuxt-link(:to="'/pool/post/' + news.id") comments (number)
</template>

<script>
export default {
  props: ['news']
}
</script>

<style>

</style>
