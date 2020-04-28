'use strict'

require('./src/routes')
const server = require('./configServer')
const plugins = require('./config/plugins/serverPlugins')

server.register(plugins, () => {
  server.start((err) => {
    if (err) {
      throw err
    }
  })
})

module.exports = server


/*moip.customer.create({
  fullname: 'Jose Silva',
  email: 'jose_silva0@email.com',
  birthDate: '1988-12-30',
  taxDocument: {
      type: 'CPF',
      number: '22222222222'
  },
  phone: {
      countryCode: '55',
      areaCode: '11',
      number: '66778899'
  },
  shippingAddress: {
      city: 'Sao Paulo',
      complement: '8',
      district: 'Itaim',
      street: 'Avenida Faria Lima',
      streetNumber: '2927',
      zipCode: '01234000',
      state: 'SP',
      country: 'BRA'
  }
}).then((response) => {
  console.log(response.body) 
}).catch((err) => {
  console.log(err) 
}) */

/*moip.customer.getOne('CUS-6F02IHGW7DLI')
  .then((response) => {
    console.log(response.body)
  })
  .catch((err) => {
    console.log(err)
  }) */