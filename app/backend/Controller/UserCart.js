const route = require('express').Router()
const authMiddleware = require('../Middleware')
const { isValidNumber } = require('../helpers')
const {Cart,Product} = require('../models/index')

route
.use(authMiddleware)
.get('/items',async (req,res)=>{
    const {user_id} = req.user
   
    try{
        const datas = await Cart.findAll({where:{user_id}, include:{ model: Product, as: 'product' }})
       
        res.status(200).send({message:'sucess',datas})
    }catch(err){
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'})
    }
})
.post('/create',async(req,res)=>{
    
    let {product_id,size,quantity,color} = req.body
    const {user_id} = req.user
    
    quantity =  isValidNumber(quantity) === true ? quantity  : 1
    
    if (!isValidNumber(product_id))return res.status(400).send({ message: 'Invalid product ID' });

    try {
        const findCartItem = await Product.findByPk(product_id)
        if(findCartItem === null)return res.status(404).send({message:'Cart not found'})
      
        const [cartItem, created] = await Cart.findOrCreate({
            where: { product_id ,user_id},
            defaults: {user_id,size,quantity:quantity ,color,product_id},
            include: { model: Product, as: 'product' },
            
            });
    
        if (!created)await cartItem.update({ quantity: cartItem.quantity + 1 });
    
        res.status(201).send({ message: 'success' });
      } catch (err) {
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'+err})
      }
      
})
.put('/edit',async(req,res)=>{
    var {cart_id,quantity,action} =  req.body

        
    if (quantity === 0)  return res.status(400).send({ message: 'Quantity should be greater than zero' });
    
    if (!isValidNumber(cart_id) )  return res.status(400).send({ message: 'Invalid cart ID' });

    if (action !== "decrease" && action !== "increase" || !isValidNumber(quantity)) return res.status(400).send({ message: 'Invalid action or quantity' });
    
    
   
    try{
        const cart =await Cart.findByPk(cart_id)
    
        if(!cart)return res.status(400).send({message:'Cart not found'})
    
        let updateQuantity  = cart.quantity+quantity
    
        if(action === "decrease")updateQuantity = cart.quantity - quantity

        updateQuantity = updateQuantity < 0 ? 0 : updateQuantity

        await Cart.update({quantity:updateQuantity},{where:{id:cart_id}})
        res.status(201).send({message:'sucess'})
    }catch(err){
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'})
    }
})
.delete('/delete',async(req,res)=>{
    const {cart_id} = req.body
    if (!isValidNumber(cart_id) )  return res.status(400).send({ message: 'Invalid cart ID' });

    try{
        await Cart.destroy({where:{id:cart_id}})
        res.status(201).send({message:'sucess'})
    }catch(err){
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'})
    }
   
})

module.exports =route