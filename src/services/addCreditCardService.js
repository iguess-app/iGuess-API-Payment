'use strict'

const Boom = require('boom')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const repositories = require('../repositories')

const addCreditCard = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  await _checkIfTheCardAlreadyInserted(payload, dictionary)

  return repositories.psql.getCustomerRepository(payload, dictionary)
    .then((userData) => repositories.moip.addCreditCardRepository(payload, userData, dictionary))
    .then((moipCustomerObj) => repositories.psql.addCreditCardRepository(payload, moipCustomerObj, dictionary))
    .then(() => _buildResponse())
}

const _checkIfTheCardAlreadyInserted = async (payload, dictionary) => {
  const card = await repositories.psql.getIfCardAlreadyAddRepository(payload, dictionary)
  if (card) {
    throw Boom.forbidden(dictionary.cardAlreadyAdded)
  }
}

const _buildResponse = () => ({ added: true })

module.exports = addCreditCard