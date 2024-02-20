const route = require('express').Router()
const Middleware = require('../Middleware')
const { isValidNumber } = require('../helpers')
const {Cart,Store} = require('../models/index')

route
.use(Middleware)
.get('/items',async (req,res)=>{
    const {user_id} = req.user
   
    try{
        const datas = await Cart.findAll({where:{user_id}, include:{ model: Store, as: 'store' }})
        res.status(200).send({message:'sucess',datas})
    }catch(err){
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'})
    }
})
.post('/create',async(req,res)=>{
    
    let {product_id,size,quantity,color} = req.body
    const {user_id} = req.user
    
    quantity =  isValidNumber(quantity) === true ? quantity  : 1
    if(!isValidNumber(product_id))return res.status(404).send({message:'Oops, something went wrong! Please try again later.'})
    
    try {
        const findCartItem = await Store.findOne({where:{id:product_id}})
        if(findCartItem === null)return res.status(404).send({message:'Oops, something went wrong! Please try again later.'})
        const [cartItem, created] = await Cart.findOrCreate({
          where: { product_id ,user_id},
          defaults: {user_id,size,quantity:quantity ,color,product_id},
          include: { model: Store, as: 'store' },
          
        });
      
        if (!created)await cartItem.update({ quantity: cartItem.quantity + 1 });
        
        res.status(201).send({ message: 'success' });
      } catch (err) {
       
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'+err})
      }
      
})
.put('/edit',async(req,res)=>{
    const {cart_id,quantity} =  req.body
    if(!isValidNumber(cart_id) || !isValidNumber(quantity))return   res.status(500).send({message:'Oops, something went wrong! Please try again later.'})
    try{
        await Cart.update({quantity},{where:{id:cart_id}})
        res.status(201).send({message:'sucess'})
    }catch(err){
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'})
    }
})
.delete('/delete',async(req,res)=>{
    const {cart_id} = req.body
    if(!isValidNumber(cart_id))return res.status(500).send({message:'Oops, something went wrong! Please try again later.'})
   
    try{
        await Cart.destroy({where:{id:cart_id}})
        res.status(201).send({message:'sucess'})
    }catch(err){
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'})
    }
   
})

module.exports =route