const Nuxt = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// Import API Routes
// app.use('/api', require('./api/index'))

// Import and Set Nuxt.js options
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error) // eslint-disable-line no-console
    process.exit(1)
  })
}

// Listen the server
const server = app.listen(port, function () {
  const host = server.address().address
  const port = server.address().port
  console.log('Server listening on http://%s:%s', host, port)
})
