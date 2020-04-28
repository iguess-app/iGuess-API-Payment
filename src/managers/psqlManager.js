
'use strict'

const { Pool } = require('pg')
const config = require('../../config')

const getPoolConnection = () => new Pool({
  database: config.postgresqlDatabase,
  host: config.postgresqlHost,
  user: config.postgresqlUser,
  password: config.postgresqlPassword
})

module.exports = getPoolConnection