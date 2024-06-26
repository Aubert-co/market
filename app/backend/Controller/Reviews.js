const route = require('express').Router()
const authMiddleware = require('../Middleware')
const { sanitizeString ,updateWhere, isValidNumber,clampToRange} = require('../helpers')
const {Product,Store,Reviews,Tickets} = require('../models/index')
const fileUpload = require('express-fileupload')
const {savesImg, existImg,createPathImg} = require('../helpers/saveFiles')
const fs = require('fs').promises


route
.get('/reviews/product',async(req,res)=>{
    try{
        const {product_id} = req.body
        if(!product_id)return res.status(400).send({message:'Product id not provided.'})
        const datas = await Reviews.findAll({
            include:[{
                model:Tickets,
                as:'Tickets',
                required:true    
            }],
            where:{
                '$Tickets.product_id$':product_id,'$Tickets.status':'completed'
            },
            limit:5
        })
        res.status(200).send({message:'Sucess',datas})
    }catch(err){
        res.status(500).send({message:'Something went wrong'})
    }
})
.use(authMiddleware)
.use(fileUpload({createParentPath:true}))


.post('/reviews/product/create',async(req,res)=>{
    const {user_id} = req.user
    var {ticket_id,comments,rating} = req.body
    var where ={}
    try{
        if(!ticket_id)return res.status(400).send({message:'Ticket id not provided.'})
        if (!isValidNumber(rating)) return res.status(400).send({ message: 'Rating not provided.' })

        const findTickets = await  Tickets.findOne({where:{id:ticket_id,requester_id:user_id}})
        if (!findTickets || findTickets.status!=='completed'|| findTickets.requester_id !== user_id) return res.status(400).send({ message: 'No tickets found.' })
        
        const findReview = await Reviews.findOne({
            include:[
                {
                    model:Tickets,
                    as:'Tickets'
                }
            ],
            where:{'$Tickets.requester_id$':user_id,ticket_id}
        })
        if (findReview) return res.status(400).send({ message: 'Review already exists.' });

        if(comments)where.comments = comments
       
        rating =  rating > 5 ? 5 : rating
        
        where.rating = rating
        where.ticket_id = ticket_id
        if(req.files){
            const {file} = req.files
            const {imgPath}=createPathImg(file)
            where.imgPath = imgPath
            await savesImg(file,imgPath)
        }
    
        const isImg =await existImg(where.imgPath)
        
        if(!isImg)return res.status(404).send({ message: 'Failed to save the image.' });
    
        await Reviews.create(where)
        res.status(201).send({message:'Sucess'})
    }catch(error){
        console.log(error)
        res.status(500).send({message:'Something went wrong'})
    }
})

.use(async(req,res,next)=>{
    const {user_id} =req.user
    const {review_id} = req.body
   
    if(!review_id)return res.status(400).send({message:'Review id not provided.'})
    
    try{
        const findReview = await Reviews.findOne({
            include:[
                {
                    model:Tickets,
                    as:'Tickets'
                }
            ],
            where:{'$Tickets.requester_id$':user_id,id:review_id}
        })
        if (!findReview) return res.status(400).send({ message: 'Review not found.' });

        req.datas = findReview
   
        next()
    }catch(err){
        res.status(500).send({message:'error'})
    }
   
})
.put('/reviews/product/edit',async(req,res)=>{
 
    var {review_id,comments,rating} = req.body
    const valuesToUpdate ={}
    const savedDatas = req.datas
    try{
        if (rating && !isValidNumber(rating)) return res.status(400).send({ message: 'Rating is not valid.' })

        if(comments)valuesToUpdate.comments = comments
        if(rating){
            rating =  rating > 5 ? 5 : rating
            valuesToUpdate.rating = rating
        }
        if(req.files)await savesImg(req.files.file,savedDatas.imgPath)
        
        await Reviews.update(valuesToUpdate,{where:{id:review_id}})
        res.status(200).send({message:'Sucess'})
    }catch(err){
        res.status(500).send({message:'error'})
    }
})

.delete('/reviews/product/delete',async(req,res)=>{
    const {review_id} = req.body
    const findReview = req.datas
    try{    
      
        const imgPath = findReview.imgPath

        const existImgInDB = await existImg(imgPath)
        if(existImgInDB)await fs.unlink(imgPath)
        await Reviews.destroy({where:{id:review_id}})
        res.status(201).send({message:'Sucess'})
    }catch(err){
        res.status(500).send({message:'error'})
    }
})

module.exports = route