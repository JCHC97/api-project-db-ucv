const config = require('@config')

let store, cache

/* if (config.remoteDB === true) {
  cache = require('@store/remote-cache')
} else {
  store = require('@store/mssql')
  cache = require('@store/redis')
} */
store = require('@store/mysql')

const ctrl = require('./controller')

module.exports = ctrl(store, cache)