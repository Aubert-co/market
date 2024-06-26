const route = require('express').Router()
const authMiddleware = require('../Middleware')
const { sanitizeString ,updateWhere} = require('../helpers')
const {Product,Store} = require('../models/index')
const fileUpload = require('express-fileupload')
const {savesImg, existImg,createPathImg} = require('../helpers/saveFiles')
const fs = require('fs').promises
route
.use(authMiddleware)
.get('/store/admin',async(req,res)=>{
    const {user_id} = req.user
    try{
        const stores = await Store.findAll({where:{user_id},attributes:['name','category','description','imgPath','id']})
    
        res.status(200).send({message:"sucess",datas:stores})
    }catch(err){
        res.status(500).send({message:'Something went wrong'})
    }

})
.use(fileUpload({createParentPath:true}))
.post('/store/create',async(req,res)=>{
    const {user_id} = req.user
    const {name,description,category} =req.body
   
    if(!name || !description || !category)return res.status(400).send({ message: 'Please provide all required fields: name, description, and category.' });

    if (!req.files)return res.status(400).send({ message: 'No files were sent in the request.' });

    const {file} = req.files
    try{
        const {imgPath} =  createPathImg(file)

        
        const [,created] = await Store.findOrCreate({    
            where:{name},
            defaults:{name,user_id,imgPath,description,category}
        })
        if(!created)return res.status(400).send({message:'Already exist a store with this name'})
        
        await savesImg(file,imgPath)

        const isImg =await existImg(imgPath)
        
        if(!isImg)return res.status(404).send({ message: 'Failed to save the image.' });
    
        res.status(201).send({message:'sucess'})
    }catch(err){
        
        res.status(500).send({message:'Something went wrong'+err})
    }
})

.put('/store/edit',async(req,res)=>{
    const {user_id} = req.user
    const {description,category,id} =req.body
    const valuesToUpdate =  updateWhere({description,category})
    const lengthOfValues =Object.values(valuesToUpdate).length

    if( lengthOfValues === 0 && !req.files)return res.status(400).send({message:"No fields sent"})

    try{
    
        const oldStore= await Store.findOne( {where:{user_id,id}} )

        if(!oldStore)return res.status(404).send({message:'Store not found'})
        
        if(req.files){
            await savesImg(req.files.file,oldStore.imgPath)
           
        }
         if(lengthOfValues === 0)return res.status(201).send({message:"Sucess"})
        await Store.update(  valuesToUpdate,{
            where:{user_id},
        })
        res.status(201).send({message:"Sucess"})
    }catch(err){
        res.status(500).send({message:'Something went wrong'+err})
    }
})
.post('/store/product/create',async(req,res)=>{
    const {user_id} = req.user
    const {store_id,quantity,category,price,name,description} = req.body
  
    if(!store_id)return res.status(400).send({message:'Store ID not sent'})
    if (!req.files)return res.status(400).send({ message: 'No files were sent in the request.' });
    if(!name || !category ||!quantity || !price ||!description)return  res.status(400).send({ message: 'Missing required fields' });



    const {file} = req.files
    try{
        const store = await Store.findByPk(store_id)
       
        
        if(!store || store.user_id !== user_id)return res.status(404).send({message:'Store not found'})
    
        const {imgPath} =  createPathImg(file)

       
         await Product.create( {name,quantity,price,store_id,imgPath,description,category},{    
            where:{store_id},
           
        })
    
        await savesImg(file,imgPath)

        const isImg =await existImg(imgPath)
        
        if(!isImg)return res.status(404).send({ message: 'Failed to save the image.' });
    
       
        res.status(201).send({message:'Sucess'})
    }catch(err){
        res.status(500).send({message:'Something went wrong'+err})
    }
})

.use(async(req,res,next)=>{
    const {user_id} = req.user
    const {store_id,product_id,} =req.body
    if (!product_id  || !store_id) return res.status(400).send({ message: "ID not provided" });

    const store = await Store.findByPk(store_id);
    if(!store || store.user_id !== user_id)return res.status(404).send({message:'Store not found'})
    
    req.store = store
    next()
})
.put('/store/product/edit',async(req,res)=>{
  
    const {name,category,description,price,store_id,product_id,quantity} =req.body
  
   
    try{
        const valuesToUpdate = updateWhere({name,category,description,price,quantity})
        
        
        const oldProducts = await Product.findOne({where:{store_id,id:product_id}})
        if(!oldProducts)return res.status(404).send({message:'Product not found'})
        
        if(req.files)await savesImg(req.files.file,oldProducts.imgPath)
       
        await Product.update(valuesToUpdate,{where:{id:product_id}})
        res.status(201).send({message:'Sucess'})
    }catch(err){
        res.status(500).send({message:'Something went wrong'+err})
    }
})
.delete('/store/product/delete',async(req,res)=>{
   
    const {product_id,store_id} =req.body

    try{
       
        const products = await Product.findOne({
            where:{id:product_id,store_id}
        })
        if(products === null)return res.status(404).send({message:'product not found'})

        const imgPathToDelete = products.imgPath
        const isImg =await existImg(imgPathToDelete)
        if(isImg)await fs.unlink(imgPathToDelete)

        await Product.destroy({where:{id:product_id}})
        
        res.status(201).send({message:'Sucess'})
    }catch(err){
        res.status(500).send({message:'Something went wrong'+err})
    }
})


module.exports = route