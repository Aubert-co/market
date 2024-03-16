const route = require('express').Router()
const {Product} = require('../models/index')
const {generateWhereClause,isValidNumber, sanitizeString}  = require('../helpers/index')
const limit = 25

route
.get('/products',async(req,res)=>{
    try{
         
        const datas = await Product.findAll({limit});
        res.status(200).send({message:'sucess',datas})
    }catch(err){
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'+err})
    }

})
.post('/products/search',async(req,res)=>{
    var {category,name,color,low,high} = req.body
    
    if(low && !isValidNumber(low))low = 0
    if(high && !isValidNumber(high))high = 1000
    
    const where = generateWhereClause({
        low,high,limit,category:sanitizeString(category),
        name:sanitizeString(name),color:sanitizeString(color)
    })
    try{
       const datas = await Product.findAll(where)
       res.status(200).send({message:'Sucess',datas})
    }catch(err){
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'+err})
    }
})


module.exports = route