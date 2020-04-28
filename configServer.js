'use strict'

const Hapi = require('hapi')
const Config = require('./config')

const server = new Hapi.Server()
server.connection({
  host: '0.0.0.0',
  port: Config.serverPort
})

module.exports = server