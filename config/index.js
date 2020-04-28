/* eslint-disable */

const config = require('iguess-api-coincidents').Config

const moipConfigs = {
  moipToken: process.env.MOIP_TOKEN || '',
  moipKey: process.env.MOIP_KEY || '',
  moipCategory: 'SOFTWARE',
  moipPaymentAllowedMethod: {
    credit: 'CREDIT_CARD',
    debit: 'BOLETO',
    boleto: 'ONLINE_BANK_DEBIT'
  },
  iGuessBillingDefaultAddress: {
    city: '',
    complement: '',
    district: '',
    street: '',
    streetNumber: '',
    zipCode: '',
    state: '',
    country: ''
  }
}

const postgresql = {
  postgresqlUser: process.env.PSQL_USER || 'api',
  postgresqlPassword: process.env.PSQL_PASSWORD || 'ggEasy',
  postgresqlDatabase: process.env.PSQL_DATABASE || 'iguess_payment',
  postgresqlConnName: process.env.PSQL_INSTANCE_CONNECTION_NAME || 'iguess-666666:southamerica-east1:payment-postgre',
  postgresqlHost: process.env.PSQL_HOST || ''
}

const cipher = {
  cipherSeed: process.env.CIPHER_SEED || '',
  cipherAlgorithm: process.env.CIPHER_ALGORITHM || '',
  outputEnconding: process.env.OUTPUT_ENCONDING || 'utf8',
  inputEnconding: process.env.INPUT_ENCONDING || ''
}

module.exports = Object.assign(config, moipConfigs, postgresql, cipher)