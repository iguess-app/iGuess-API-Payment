'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const repositories = require('../repositories')

const createCustomer = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  return repositories.moip.createCustomerRepository(payload, dictionary)
    .then((moipCustomerObj) => repositories.psql.createCustomerRepository(payload, moipCustomerObj, dictionary))
    .then(() => _buildResponse())
}

const _buildResponse = () => ({created: true})

module.exports = createCustomer