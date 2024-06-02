const route = require('express').Router()
const authMiddleware = require('../Middleware')
const { sanitizeString ,updateWhere} = require('../helpers')
const {Product,Store,Status} = require('../models/index')

route
.use(authMiddleware)

.get('/tickets',(req,res)=>{
    const {user_id} = req.user

    const {status} = req.body
})
.post('/tickets/create',async(req,res)=>{
    const {user_id} = req.user

    const {product_id,store_id} = req.body
   
    try {

        if (!product_id || !store_id) return res.status(400).send({ message: 'Please provide a product ID and store ID.' });
      
        const verifyProduct = await Product.findOne({ where: { id: product_id } });
        if (!verifyProduct || verifyProduct.store_id !== store_id) 
          return res.status(400).send({ message: 'Product not found or does not belong to the specified store.' });
        
        await Status.create({requester_id:user_id,store_id,product_id})

        res.status(201).send({ message: 'sucess' });
 
    } catch (error) {
        console.log(error)
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'})
 
    }
})
module.exports = route