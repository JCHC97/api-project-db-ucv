import queries from './queries.js'

module.exports = function (injectedStore, injectedCache) {
  let store = injectedStore
  let cache = injectedCache
  if (!store) store = require('@store/dummy')
  if (!cache) cache = require('@store/dummy')

  async function querie1() {
    let result = await store.queryString(queries.querie1)
    return result
  }

  async function querie2() {
    let result = await store.queryString(queries.querie2)
    return result
  }

  async function querie3() {
    let result = await store.queryString(queries.querie3)
    return result
  }

  async function querie4() {
    let result = await store.queryString(queries.querie4)
    return result
  }

  async function querie5() {
    let result = await store.queryString(queries.querie5)
    return result
  }

  async function querie6() {
    let result = await store.queryString(queries.querie6)
    return result
  }

  return {
    querie1,
    querie2,
    querie3,
    querie4,
    querie5,
    querie6
  }
}
