'use strict'

const Crypto = require('crypto')

const config = require('../../config')

const encryptData = (dataToEncrypt, uniqueSeed) => {
  const dynamicSeed = config.cipherSeed + uniqueSeed
  const cipher = Crypto.createCipher(config.cipherAlgorithm, dynamicSeed)
  let encrypted = cipher.update(dataToEncrypt, config.outputEnconding, config.inputEnconding)
  encrypted += cipher.final(config.inputEnconding)

  return encrypted
}

const decryptData = (message, uniqueSeed) => {
  const dynamicSeed = config.cipherSeed + uniqueSeed  
  const decipher = Crypto.createDecipher(config.cipherAlgorithm, dynamicSeed)
  let decrypted = decipher.update(message, config.inputEnconding, config.outputEnconding)
  decrypted += decipher.final(config.outputEnconding)

  return decrypted
}

module.exports = {
  encryptData,
  decryptData
}

/**
 * @function encryptData
 * @param {string} dataToEncrypt
 * @returns {string}
 *
 * @function decryptData
 * @param {string} message
 * @returns {string}
*/