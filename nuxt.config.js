module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: "Nuxt.js project" }
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
