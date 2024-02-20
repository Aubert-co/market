const route = require('express').Router()
const cart = require('./UserCart')
const loginAndRegister = require('./LoginAndRegister')
const products = require('./products')



route
.use(loginAndRegister)
.use(products)
.use('/cart',cart)
module.exports = route