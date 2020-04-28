'use strict'

const createCustomerRepository = require('./createCustomerRepository')
const getCustomerRepository = require('./getCustomerRepository')
const addCreditCardRepository = require('./addCreditCardRepository')
const getIfCardAlreadyAddRepository = require('./getIfCardAlreadyAddRepository')

module.exports = {
  createCustomerRepository,
  getCustomerRepository,
  addCreditCardRepository,
  getIfCardAlreadyAddRepository
}