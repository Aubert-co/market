const route = require('express').Router()
const cart = require('./UserCart')
const loginAndRegister = require('./LoginAndRegister')
const products = require('./products')
const stores = require('./stores')
const tickets = require('./tickets')

route
.use(loginAndRegister)
.use(products)
.use('/cart',cart)
.use(stores)
.use(tickets)
module.exports = route