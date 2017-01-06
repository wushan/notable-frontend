<template lang="pug">
  #signup
    section#signup-container
      .container.restrict.frame
        h1.title 我要加入
        .columns
          .column
            .controlgroup
              .controls
                input(type="text")
                label 店家名稱
            .controlgroup
              .controls
                input(type="text")
                label 店家名稱
            .controlgroup
              .controls
                input(type="text")
                label 店家名稱
          .column

</template>

<style lang="scss">
</style>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'SignUp',
  // data (params) {
  //   return axios.get('//localhost:35687/api/records', {
  //     params: {
  //       filter: {
  //         limit: 5
  //       }
  //     }
  //   })
  //   .then((res) => {
  //     return { records: res.data }
  //   })
  //   .catch((e) => {
  //     console.log(e)
  //   })
  // }
  data ({req}) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  methods: {
  }
}
</script>