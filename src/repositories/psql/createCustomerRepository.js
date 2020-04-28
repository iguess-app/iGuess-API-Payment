'use strict'

const getPool = require('../../managers/psqlManager')

const query = `
  INSERT INTO profiles.users("userRef","cpf","fullName","birthDate","email","moipCustomerId") 
  VALUES ($1, $2, $3, $4, $5, $6)`

const createCustomer = async (payload, moipCustomerObj) => {
  const values = [payload.userRef, payload.cpf, payload.fullName, payload.birthDate, payload.email, moipCustomerObj.body.id]
  const pool = await getPool()
  await pool.query(query, values)
  pool.end()
}

module.exports = createCustomer