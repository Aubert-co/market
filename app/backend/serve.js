const express = require('express')
const app = express()
const route   = require('./Controller/route')
const cors = require("cors")

require('dotenv').config()


/*const session = require('express-session')
//app.set('trust proxy', 1)
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:24*60*60*1000 }
}))*/

app.use(cors())
app.use(express.json())
app.use('/static',express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(route)

//app.listen(8080,()=>console.log('rodando'))


module.exports = app