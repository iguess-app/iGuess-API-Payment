'use strict'

const statusUtils = require('iguess-api-coincidents').Utils.statusUtils

const addCreditCardService = require('../services/addCreditCardService')

const addCreditCard = (request, reply) => {
  const payload = request.payload
  const headers = request.headers

  addCreditCardService(payload, headers)
    .then((response) => reply(response).code(statusUtils.created))
    .catch((err) => reply(err))
}

module.exports = {
  addCreditCard
}