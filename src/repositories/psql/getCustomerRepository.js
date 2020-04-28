'use strict'

const getPool = require('../../managers/psqlManager')

const PSQL_INDEX = 0
const query = `
  SELECT "userRef", "cpf", "fullName", "birthDate", "moipCustomerId"
  FROM profiles.users 
  WHERE "userRef" = $1`

const getCustomer = async (payload) => {
  const values = [payload.userRef]
  const pool = await getPool()
  const { rows } = await pool.query(query, values)
  pool.end()
  return rows[PSQL_INDEX]
}

module.exports = getCustomer