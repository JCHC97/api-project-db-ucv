require('module-alias/register')
const express = require('express')
const cors = require('cors')

const errors = require('@network/errors')

// const testRouter = require('./components/test/routes')
const queriesRouter = require('./components/queries/routes')

const app = express()

// Middleware
app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Router
// app.use('/api/test', testRouter)
app.use('/api/queries', queriesRouter)

// Error Handlers
app.use(errors)

export default app