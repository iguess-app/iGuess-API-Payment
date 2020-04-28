'use strict'

const customerController = require('../controllers/customerController')
const server = require('../../configServer')
const defaultSessionHeaderSchema = require('./schemas/defaultSessionHeaderSchema')
const createCustomerSchema = require('./schemas/customer/createCustomerSchema')

server.route({
  path: '/customer/createCustomer',
  method: 'POST',
  config: {
    handler: (request, reply) => {
      customerController.createCustomer(request, reply)
    },
    validate: {
      payload: createCustomerSchema.request,
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: createCustomerSchema.response
    }
  }
})