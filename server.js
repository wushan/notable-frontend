const app = require('express')()
const Nuxt = require('nuxt')

// We instantiate Nuxt.js with the options
const isProd = process.env.NODE_ENV === 'production'
let config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)
// No build in production
const promise = (isProd ? Promise.resolve() : nuxt.build())
promise.then(() => {
  app.use(nuxt.render)
  app.listen(5000)
  console.log('Server is listening on http://localhost:9487')  // eslint-disable-line no-console
})
.catch((error) => {
  console.error(error)  // eslint-disable-line no-console
  process.exit(1)
})