const express = require('express')

const response = require('@network/response')
const Controller = require('./controller')

const router = express.Router()

// Routes
router.get('/1', querie1)
router.get('/2', querie2)
router.get('/3', querie3)
router.get('/4', querie4)
router.get('/5', querie5)
router.get('/6', querie6)

//Functions Callbacks

function querie1(req, res, next) {
  Controller.querie1()
    .then((data) => {
      response.success(req, res, data, 200)
    }).catch(next)
}

function querie2(req, res, next) {
  Controller.querie2()
    .then((data) => {
      response.success(req, res, data, 200)
    }).catch(next)
}

function querie3(req, res, next) {
  Controller.querie3()
    .then((data) => {
      response.success(req, res, data, 200)
    }).catch(next)
}

function querie4(req, res, next) {
  Controller.querie4()
    .then((data) => {
      response.success(req, res, data, 200)
    }).catch(next)
}

function querie5(req, res, next) {
  Controller.querie5()
    .then((data) => {
      response.success(req, res, data, 200)
    }).catch(next)
}


function querie6(req, res, next) {
  Controller.querie6()
    .then((data) => {
      response.success(req, res, data, 200)
    }).catch(next)
}

module.exports = router