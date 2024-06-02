const express = require('express')
const app = express()
const route   = require('./Controller/route')
const cors = require("cors")

require('dotenv').config()


app.use(cors())
app.use(express.json())

app.use('/static',express.static('public'))

app.use(express.urlencoded({extended:true}))

app.use(route)


app.listen(8080,()=>console.log('rodando'))


module.exports = app