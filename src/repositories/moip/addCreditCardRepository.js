'use strict'

const Boom = require('boom')
const moment = require('moment')
const coincidents = require('iguess-api-coincidents')

const config = require('../../../config')
const moip = require('../../managers/moipManager')
const { log } = coincidents.Managers

const addCreditCard = (payload, userData, dictionary) =>
  moip.customer.createCreditCard(userData.moipCustomerId, _buildRequestObj(payload, userData))
  .catch((err) => _treatError(err, dictionary))

const _buildRequestObj = (payload, userData) => ({
  method: config.moipPaymentAllowedMethod.credit,
  creditCard: {
    expirationMonth: payload.expirationMonth,
    expirationYear: payload.expirationYear,
    number: payload.number,
    cvc: payload.cvv,
    holder: {
      fullname: userData.fullName,
      birthdate: moment(userData.birthDate).format('YYYY-MM-DD'),
      taxDocument: {
        type: 'CPF',
        number: userData.cpf
      }
    }
  }
})

const _treatError = (err, dictionary) => {
  log.error(err)
  throw Boom.serverUnavailable(dictionary.someWrongWithAtMoip)
}

module.exports = addCreditCard