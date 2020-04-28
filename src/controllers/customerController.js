'use strict'

const statusUtils = require('iguess-api-coincidents').Utils.statusUtils

const createCustomerService = require('../services/createCustomerService')

const createCustomer = (request, reply) => {
  const payload = request.payload
  const headers = request.headers

  createCustomerService(payload, headers)
    .then((response) => reply(response).code(statusUtils.created))
    .catch((err) => reply(err))
}

module.exports = {
  createCustomer
}