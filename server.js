const { Nuxt } = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// import nuxt config
let config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// deploy under development environment
if (config.dev) {
  nuxt.build()
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on [localhost:${port}]`)
})

