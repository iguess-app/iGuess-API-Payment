'use strict'

const { cipherManager, psqlManager } = require('../../managers')
const getPool = psqlManager

const PSQL_INDEX = 0
const query = `
  SELECT "userRef"
  FROM payments.creditcard 
  WHERE "cardNumberCiphered"= $1`

const getIfCardAlreadyAddRepository = async (payload) => {
  const cardNumberCiphered = cipherManager.encryptData(payload.number, payload.userRef)
  const values = [cardNumberCiphered]
  const pool = await getPool()
  const { rows } = await pool.query(query, values)
  pool.end()
  return Boolean(rows[PSQL_INDEX])
}

module.exports = getIfCardAlreadyAddRepository