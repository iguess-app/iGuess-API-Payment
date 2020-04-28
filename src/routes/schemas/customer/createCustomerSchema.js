'use strict'

const Joi = require('joi')

const request = Joi.object({
  userRef: Joi.string().required(),
  cpf: Joi.string().required(),
  fullName: Joi.string().required(),
  birthDate: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.object({
    countryCode: Joi.number().required(),
    areaCode: Joi.number().required(),
    number: Joi.number().required()
  }).required()
})

const response = Joi.object({
  created: Joi.bool().required()
})

module.exports = {
  request,
  response
}