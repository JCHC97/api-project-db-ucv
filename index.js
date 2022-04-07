require('module-alias/register')
const config = require('@config')
import app from 'api/app.js'

app.listen(config.api.port, () => {
  console.log('API listen on port ', config.api.port)
})