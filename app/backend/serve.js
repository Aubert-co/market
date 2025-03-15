const express = require('express')
const app = express()
const route   = require('./Controller/route')
const cors = require("cors")

require('dotenv').config()
const pathMode = process.env.mode ==="test" ? "testpublic" : "public"

app.use(cors())
app.use(express.json())

app.use('/static',express.static(pathMode))

app.use(express.urlencoded({extended:true}))

app.use(route)


//app.listen(8080,()=>console.log('rodando'))


module.exports = app