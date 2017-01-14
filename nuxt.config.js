module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    // title: '小老闆團結！史上最絕奧客防治服務 - NOTABLE「嘸位la！」',
    titleTemplate: '%s - NOTABLE「嘸位la！」',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: "奧客查詢 顧客負評" },
      { hid: 'keywords', content: "靠北奧客 拒絕奧客 奧客查詢 澳洲來的客人 奧客電話查詢 用餐紀錄 餐廳黑名單"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [{ src: '~assets/css/main.scss', lang: 'scss'}, { src: 'font-awesome/scss/font-awesome.scss', lang: 'scss' }],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  build: {
    vendor: [
      'axios'
    ]
  },
  plugins: ['plugins/vue-typer.js', 'plugins/vuelidate.js', 'plugins/ga.js']
}
