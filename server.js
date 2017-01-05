const app = require('express')()
const Nuxt = require('nuxt')

const nuxt = new Nuxt()
nuxt.build()
.then(() => {
  // Render every route with Nuxt.js
  app.use(nuxt.render)
  // Server listening
  app.listen(3000)
})