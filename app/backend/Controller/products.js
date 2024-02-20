const route = require('express').Router()
const {Store,Cart} = require('../models/index')
const {createWhere,setLimit}  = require('../helpers/index')
const Cache = require('../cache/index')

const getDatas = async(limit)=>{
    if(Cache.getCache(`limit=${limit}`))return Cache.getCache(`limit=${limit}`)
        
    const datas = await Store.findAll({limit,include: [{ model: Cart, as: 'carts',}]});
      
    Cache.setCache(`limit=${limit}`,datas,50000)
    return datas
}
route
.get('/home/products/:limit?',async(req,res)=>{
    const limit = setLimit(req.params.limit) 
    const datas = await getDatas(limit)
    try{
        res.status(200).send({message:'sucess',datas})
    }catch(err){
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'+err})
    }
})
.post('/products/search',async(req,res)=>{
    const where = createWhere(req.body)

    try{
        const datas = await Store.findAll(where)
        res.status(200).send({msg:'sucess',datas})
        console.log(datas)
    }catch(err){
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'+err})
    }
})


module.exports = route