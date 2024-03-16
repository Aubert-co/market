const route = require('express').Router()
const cart = require('./UserCart')
const loginAndRegister = require('./LoginAndRegister')
const products = require('./products')
const stores = require('./stores')


route
.use(loginAndRegister)
.use(products)
.use('/cart',cart)
.use(stores)
module.exports = route