'use strict'

const Joi = require('joi')

const MONTH_SIZE = 2
const YEAR_SIZE = 2
const CVV_DEFAULT_SIZE = 3
const CVV_AMEX_SIZE = 4

const request = Joi.object({
  userRef: Joi.string().required(),
  expirationMonth: Joi.string().length(MONTH_SIZE).required(),
  expirationYear: Joi.string().length(YEAR_SIZE).required(),
  number: Joi.string().required(),
  cvv: Joi.alternatives().try(
    Joi.string().length(CVV_DEFAULT_SIZE),
    Joi.string().length(CVV_AMEX_SIZE)
  ).required()
})

const response = Joi.object({
  added: Joi.bool().required()
})

module.exports = {
  request,
  response
}