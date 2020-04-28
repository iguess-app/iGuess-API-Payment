'use strict'

const config = require('../../config')

const moip = require('moip-sdk-node').default({
  token: config.moipToken,
  key: config.moipKey,
  production: config.isProd()
})

module.exports = moip