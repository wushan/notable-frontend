const webpack = require('webpack')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    // title: '小老闆團結！史上最絕奧客防治服務 - NOTABLE「嘸位la！」',
    titleTemplate: '%s - NOTABLE「嘸位la！」奧客查詢服務',
    meta: [
      { 'http-equiv':"Content-Type", content:"text/html", charset:"UTF-8"},
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: "description", content: "奧客警示/顧客負評最佳查詢網站，避免您的餐廳再接到澳洲來的客人"},
      { name: "keywords", content: "靠北奧客 拒絕奧客 奧客查詢 澳洲來的客人 奧客電話查詢 用餐紀錄 餐廳黑名單"},
      { hid: 'ogtitle', property: 'og:title', content: 'NOTABLE「嘸位la！」奧客查詢服務'},
      { property: "fb:app_id", content:"1836475513305061"},
      // { hid: 'og:title', name: 'og:type', content: ''},
      { hid: 'ogimage', property: 'og:image', content: 'https://notable.wushan.io/notable-website-ogimage.jpg'},
      { hid: 'ogurl', property: 'og:url', content: 'https://notable.wushan.io'},
      { hid: 'ogdescription', property: 'og:description', content: '奧客警示/顧客負評最佳查詢網站，避免您的餐廳再接到澳洲來的客人'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: 'apple-icon-57x57.png'},
      { rel: 'apple-touch-icon', sizes: '60x60', href: 'apple-icon-60x60.png'},
      { rel: 'apple-touch-icon', sizes: '72x72', href: 'apple-icon-72x72.png'},
      { rel: 'apple-touch-icon', sizes: '76x76', href: 'apple-icon-76x76.png'},
      { rel: 'apple-touch-icon', sizes:'114x114', href: 'apple-icon-114x114.png'},
      { rel: 'apple-touch-icon', sizes:'120x120', href: 'apple-icon-120x120.png'},
      { rel: 'apple-touch-icon', sizes:'144x144', href: 'apple-icon-144x144.png'},
      { rel: 'apple-touch-icon', sizes:'152x152', href: 'apple-icon-152x152.png'},
      { rel: 'apple-touch-icon', sizes:'180x180', href: 'apple-icon-180x180.png'},
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: 'android-icon-192x192.png'},
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'favicon-32x32.png'},
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: 'favicon-96x96.png'},
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'favicon-16x16.png'}
    ],
    script: [
      {src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js' , type: 'text/javascript'},
      {src: '/js/picker.js' , type: 'text/javascript'},
      {src: '/js/picker.date.js' , type: 'text/javascript'}
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
    ],
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery'
        // ...etc.
      })
    ]
  },
  plugins: ['plugins/vue-typer.js', 'plugins/vuelidate.js', 'plugins/ga.js']
}