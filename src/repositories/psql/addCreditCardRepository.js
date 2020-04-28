'use strict'

const moment = require('moment')

const { cipherManager, psqlManager } = require('../../managers')
const getPool = psqlManager

const PSQL_INDEX = 0

const getBrandQuery = `
  SELECT "brandId"
  FROM payments.cardBrands
  WHERE "brandName" = $1`

const insertCardQuery = `
  INSERT INTO payments.creditcard("userRef","cardNumberCiphered","moipHashCardId","brandId","dueDate", "last4") 
  VALUES ($1, $2, $3, $4, $5, $6)`

const _getBrandId = async (cardInfo, pool) => {
  const brandValues = [cardInfo.brand]
  const {
    rows
  } = await pool.query(getBrandQuery, brandValues)
  return rows[PSQL_INDEX].brandId
}

const createCustomer = async (payload, moipCardObj) => {
  const cardInfo = moipCardObj.body.creditCard
  const pool = await getPool()
  const brandId = await _getBrandId(cardInfo, pool)

  const dueDateObj = moment(`${payload.expirationMonth}/${payload.expirationYear}`, 'MM/YY').toDate()
  const cardNumberCiphered = cipherManager.encryptData(payload.number, payload.userRef)

  const cardValues = [
    payload.userRef,
    cardNumberCiphered,
    cardInfo.id,
    brandId,
    dueDateObj,
    cardInfo.last4
  ]

  await pool.query(insertCardQuery, cardValues)
  pool.end()
}

module.exports = createCustomer