'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')

const config = require('../../../config')
const moip = require('../../managers/moipManager')
const { log } = coincidents.Managers

const createCustomer = (payload, dictionary) =>
  moip.customer.create(_buildRequestObj(payload))
    .catch((err) => _treatError(err, dictionary))

const _buildRequestObj = (payload) => {
  const defaultAddress = config.iGuessBillingDefaultAddress
  return {
    ownId: payload.userRef,
    fullname: payload.fullName,
    email: payload.email,
    birthDate: payload.birthDate,
    taxDocument: {
      type: 'CPF',
      number: payload.cpf
    },
    phone: {
      countryCode: payload.phone.countryCode,
      areaCode: payload.phone.areaCode,
      number: payload.phone.number
    },
    shippingAddress: {
      city: defaultAddress.city,
      complement: defaultAddress.complement,
      district: defaultAddress.district,
      street: defaultAddress.street,
      streetNumber: defaultAddress.streetNumber,
      zipCode: defaultAddress.zipCode,
      state: defaultAddress.state,
      country: defaultAddress.country
    }
  }
}

const _treatError = (err, dictionary) => {
  log.error(err)
  throw Boom.serverUnavailable(dictionary.someWrongWithAtMoip)
}

module.exports = createCustomer