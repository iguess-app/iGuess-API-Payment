'use strict'

const paymentController = require('../controllers/paymentController')
const server = require('../../configServer')
const defaultSessionHeaderSchema = require('./schemas/defaultSessionHeaderSchema')
const addCreditCardSchema = require('./schemas/customer/addCreditCardSchema')


server.route({
  path: '/payment/addCreditCard',
  method: 'POST',
  config: {
    handler: (request, reply) => {
      paymentController.addCreditCard(request, reply)
    },
    validate: {
      payload: addCreditCardSchema.request,
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: addCreditCardSchema.response
    }
  }
})