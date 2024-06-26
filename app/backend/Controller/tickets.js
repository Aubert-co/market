const route = require('express').Router()
const authMiddleware = require('../Middleware')
const { sanitizeString ,updateWhere} = require('../helpers')
const {Product,Store,Tickets,Person} = require('../models/index')
const statusTypes = ['open','cancelled','completed']
const typeUser = ['user','store']
route
.use(authMiddleware)

.get('/tickets',async(req,res)=>{
    const {user_id} = req.user

    const {status,type_user} = req.body
  

    const where = {}
    if(status && statusTypes.includes(status)) where.status = status

    if (!type_user) return res.status(400).send({ message: 'Type user is required' });
    
    
    if (type_user && !typeUser.includes(type_user)) return res.status(400).send({ message: 'Invalid type user' });
    
    try {
      
        if(type_user === 'user'){
           where.requester_id = user_id
            const datas = await Tickets.findAll({
                where,
                include: [{model:Product,as:'Product'}] 
            });
            return res.status(200).send({datas,message:'Sucess'})
        }
        where['$Store.user_id$'] = user_id
        const datas = await Tickets.findAll({
            include: [{
                model:  Store,
                as: 'Store',
                required: true
            },{model:Product,as:'Product'}],
            where
           
        })
       
        res.status(200).send({datas,message:'Sucess'})
    } catch (err) {
   
        res.status(500).send({message:err})
    }
})
.post('/tickets/create',async(req,res)=>{
    const {user_id} = req.user

    const {product_id,store_id} = req.body
   
    try {

        if (!product_id || !store_id) return res.status(400).send({ message: 'Please provide a product ID and store ID.' });
      
        const verifyProduct = await Product.findOne({ where: { id: product_id } });
        if (!verifyProduct || verifyProduct.store_id !== store_id) 
          return res.status(400).send({ message: 'Product not found or does not belong to the specified store.' });
        
        await Tickets.create({requester_id:user_id,store_id,product_id})

        res.status(201).send({ message: 'sucess' });
 
    } catch (error) {
      
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'})
 
    }
})
.put('/tickets/update',async(req,res)=>{
    
    const {user_id} = req.user

    const {status,status_id,type_user} = req.body
    
    if (!status || !status_id || !type_user || !typeUser.includes(type_user) || !statusTypes.includes(status)) return res.status(400).send({ message: 'Missing required fields: status, status_id, or type_user' });
    
    

  try {
        if (type_user === "store") {
            const store = await Store.findOne({ where: { user_id } });
         
            if (!store) return res.status(404).send({ message: 'Store not found' });
            
            const store_id = store.id;
            const existStore = await Tickets.findOne({ where: { store_id,id:status_id} });
            
            if (!status_id || !existStore ) return res.status(401).send({ message: 'Invalid status or store does not have tickets' });
            await Tickets.update({status},{   where:{id:status_id}})
            return res.status(201).send({message:'Sucess'})
        }

        const existUser = await Tickets.findOne({where:{requester_id:user_id,id:status_id}})
        if(!existUser)return res.status(401).send({ message: 'Invalid status or user does not have tickets' });
        await Tickets.update({status},{   
          
          where:{requester_id:user_id,id:status_id}
      })
       res.status(201).send({message:'Sucess'})
  } catch (error) {
    res.status(500).send({message:'Oops, something went wrong! Please try again later.'})
 
  }
})
module.exports = route