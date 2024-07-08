const request = require('supertest');
const server = require('../serve');
const {Tickets,Reviews} = require('../models/index')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize');
const {itemStore,users, stores,status} = require('./storefixtures')
const fs = require('fs').promises
require('dotenv').config()
const {existImg} = require('../helpers/saveFiles')
const secret = process.env.SECRET_JWT
var app,token,productImg,store_id,product_id,img_Path,review_id
// this user_id is from a user that already buyed a product 
const user_id = 3
const ticket_completed = 2
const path = require('path');
const imgToUpdate = path.join(__dirname,'imgupdate.jpg')
const notUpdatedDatas = {  rating :5,comment:'lorem ipstu'}
const updateDatas = {rating:4,comment:'updated value',file:imgToUpdate}


describe("apis",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    beforeAll(async()=>{
        app =  server.listen(8095)
        await Tickets.bulkCreate(status)
        .catch((err)=>{
            console.error("error beforeal",err)
            throw err
        })
        token = jwt.sign({user_id},secret)
      
    })
    afterAll(async()=>{
        try{
            await Promise.all([
                Reviews.destroy({ where: { id: { [Op.gt]: 0 } } }),
                Tickets.destroy({ where: { id: { [Op.gt]: 0 } } }),
            ])
            app.close()
            const exist = await existImg(img_Path)
            if( exist )await fs.unlink(img_Path)
        }catch(err){
            console.error("afterAll"+err)
        }
    })
    it.only("When not send a ticket id should return an error",async()=>{
     
        const file = path.join(__dirname, 'sports.jpg');
        const response = await request(app)
            .post('/reviews/product/create')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .attach('file',file)
            .field('rating',5)
            .field('comments','lorem ipstu')
            
        expect(response.status).toEqual(400)
        console.log(response.body.message)
        expect(response.body.message).toEqual('Ticket id not provided.')
        
        const checkInDB = await Reviews.findAll()
        expect(checkInDB).toHaveLength(0)
        const items = await fs.readdir('./testpublic');
      
    })
    it("When not send a ticket id should return an error",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')
        const file = path.join(__dirname, 'sports.jpg');
        const response = await request(app)
            .post('/reviews/product/create')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .attach('file',file)
            .field('rating','6e')
            .field('comments','lorem ipstu')
            .field('ticket_id',2)

        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual('Rating not provided.')
        const checkInDB = await Reviews.findAll()
        expect(checkInDB).toHaveLength(0)

        const items = await fs.readdir('./testpublic');
        expect(items.length).toEqual(0)
        expect(mockFS).toHaveBeenCalledTimes(0)
    })
    it("When send a ticket that the status is not completed should return an error",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')
        const file = path.join(__dirname, 'sports.jpg');
        const response = await request(app)
            .post('/reviews/product/create')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .attach('file',file)
            .field('rating',5)
            .field('comments','lorem ipstu')
            .field('ticket_id',1)
          
        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual('No tickets found.')
        const checkInDB = await Reviews.findAll()
        expect(checkInDB).toHaveLength(0)

        const items = await fs.readdir('./testpublic');
        expect(items.length).toEqual(0)
        expect(mockFS).toHaveBeenCalledTimes(0)
    })
    it("When send a rating smaller than 1 should return an error",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')
        const rating = 0
        const comments = 'lorem ipstu'
        const file = path.join(__dirname, 'sports.jpg');
        const response = await request(app)
            .post('/reviews/product/create')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .attach('file',file)
            .field('rating',rating)
            .field('comments',comments)
            .field('ticket_id',ticket_completed)
          
        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual('Rating not provided.')
        const checkInDB = await Reviews.findAll()
        expect(checkInDB).toHaveLength(1)
        
        const datas = checkInDB[0].dataValues
        expect(datas).toHaveLength(0)
        expect(mockFS).toHaveBeenCalledTimes(0)
    })
    it("When send all data correct should create a new review",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')
        const rating = 6
        const comments = 'lorem ipstu'
        const file = path.join(__dirname, 'sports.jpg');
        const buffer = await fs.readFile(file)
        const response = await request(app)
            .post('/reviews/product/create')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .attach('file',file)
            .field('rating',rating)
            .field('comments',comments)
            .field('ticket_id',ticket_completed)
          
        expect(response.status).toEqual(201)
        expect(response.body.message).toEqual('Sucess')
        const checkInDB = await Reviews.findAll()
        expect(checkInDB).toHaveLength(1)
        
        const datas = checkInDB[0].dataValues
        img_Path =datas.imgPath
        review_id = datas.id
        expect(datas.comments).toEqual(comments)
        //When the rating is greater than 5 they should return 5
        expect(datas.rating).toEqual(5)
        const firstArgument = mockFS.mock.calls[0][0];
        const secondArgument = mockFS.mock.calls[0][1]
        expect(firstArgument).not.toBe(img_Path);    
        expect(secondArgument.toString()).toBe(Buffer.from(buffer).toString())
        expect(mockFS).toHaveBeenCalledTimes(1)
    })
    it("When a user try to create a review to a ticket that already exists a review",async()=>{
        const rating = 5
        const comments = 'lorem ipstu'
        const file = path.join(__dirname, 'sports.jpg');
        const response = await request(app)
            .post('/reviews/product/create')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .attach('file',file)
            .field('rating',rating)
            .field('comments',comments)
            .field('ticket_id',ticket_completed)
          
        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual('Review already exists.')
        const checkInDB = await Reviews.findAll()
        expect(checkInDB).toHaveLength(1)
        
        const datas = checkInDB[0].dataValues
        img_Path =datas.imgPath

        expect(datas.comments).toEqual(comments)
        expect(datas.rating).toEqual(rating)

        const items = await fs.readdir('./testpublic');
        expect(items.length).toEqual(1)
        const exist = await existImg(datas.imgPath)
        expect(exist).toEqual(true)
    })
    it("When try to update a review but not send review_id should not update",async()=>{
       
        const file = path.join(__dirname, 'sports.jpg');
        const response = await request(app)
            .put('/reviews/product/edit')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .attach('file',file)
            .field('rating',updateDatas.rating)
            .field('comments',updateDatas.comment)
       
          
        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual('Review id not provided.')
        const checkInDB = await Reviews.findAll()
        expect(checkInDB).toHaveLength(1)
        
        const datas = checkInDB[0].dataValues
        img_Path =datas.imgPath

      
        expect(datas.comments).toEqual(notUpdatedDatas.comment)
        expect(datas.rating).toEqual(notUpdatedDatas.rating)
        const items = await fs.readdir('./testpublic');
        expect(items.length).toEqual(1)
        const exist = await existImg(datas.imgPath)
        expect(exist).toEqual(true)
    })
    it("When try to update a review but send an invalid rating should not update",async()=>{
       
        const file = path.join(__dirname, 'sports.jpg');
        const response = await request(app)
            .put('/reviews/product/edit')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .attach('file',file)
            .field('review_id',review_id)
            .field('rating','e5')
            .field('comments','qweqwe')
          
        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual('Rating is not valid.')
        const checkInDB = await Reviews.findAll()
        expect(checkInDB).toHaveLength(1)
        
        const datas = checkInDB[0].dataValues
        img_Path =datas.imgPath

     
        expect(datas.comments).toEqual(notUpdatedDatas.comment)
        expect(datas.rating).toEqual(notUpdatedDatas.rating)
        const items = await fs.readdir('./testpublic');
        expect(items.length).toEqual(1)
        const exist = await existImg(datas.imgPath)
        expect(exist).toEqual(true)
    })
    it("When not send a rating the rating should not be updated",async()=>{
       
        const response = await request(app)
            .put('/reviews/product/edit')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .attach('file',updateDatas.file)
            .field('review_id',review_id)
            .field('comments',updateDatas.comment)
          
        expect(response.status).toEqual(200)
        const checkInDB = await Reviews.findAll()
        expect(checkInDB).toHaveLength(1)
        
        const datas = checkInDB[0].dataValues
        img_Path =datas.imgPath

     
        expect(datas.comments).not.toEqual(notUpdatedDatas.comment)
        expect(datas.rating).toEqual(notUpdatedDatas.rating)
        expect(datas.rating).not.toEqual(updateDatas.rating)

        const items = await fs.readdir('./testpublic');
        expect(items.length).toEqual(1)
        const exist = await existImg(datas.imgPath)
        expect(exist).toEqual(true)
    })
    it("When try to update a review but not send a comment  the comment should not be updated",async()=>{

        const mockFS = jest.spyOn(fs,'writeFile')

        const response = await request(app)
            .put('/reviews/product/edit')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .attach('file',updateDatas.file)
            .field('review_id',review_id)
            .field('rating',3)
          
        expect(response.status).toEqual(200)
        const checkInDB = await Reviews.findAll()
        expect(checkInDB).toHaveLength(1)
        
        const datas = checkInDB[0].dataValues
        img_Path =datas.imgPath

    
        expect(datas.rating).not.toEqual(notUpdatedDatas.rating)
        expect(datas.rating).not.toEqual(updateDatas.rating)
        expect(datas.rating).toEqual(3)
        const items = await fs.readdir('./testpublic');
        expect(items.length).toEqual(1)
        const exist = await existImg(datas.imgPath)
        expect(exist).toEqual(true)
        expect(mockFS).toHaveBeenCalledTimes(1)
        expect(mockFS).toHaveBeenCalledWith(datas.imgPath,Buffer.from(updateDatas.file))
    })
    it("When try to delete a review but not sehdn a review_id should not delete",async()=>{
        const response = await request(app)
            .delete('/reviews/product/delete')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
          
          
        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual('Review id not provided.')
    

        const checkInDB = await Reviews.findAll()
        expect(checkInDB).toHaveLength(1)
        const items = await fs.readdir('./testpublic');
        
        expect(items.length).toEqual(1)
    })
    it("when try to delete a review but the user dosent have that a review",async()=>{
        const mocktoken = jwt.sign({user_id:20},secret)
        const response = await request(app)
            .delete('/reviews/product/delete')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${mocktoken}`)
            .send({review_id})
      
        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual('Review not found.')


        const checkInDB = await Reviews.findAll()
        expect(checkInDB).toHaveLength(1)
        const items = await fs.readdir('./testpublic');
        expect(items.length).toEqual(1)
    })
    it("when try to delete a review and send all datas correctly should delete the review",async()=>{
        const response = await request(app)
            .delete('/reviews/product/delete')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .send({review_id})
        
        expect(response.status).toEqual(201)
        expect(response.body.message).toEqual('Sucess')


        const checkInDB = await Reviews.findAll()
        expect(checkInDB).toHaveLength(0)
        const items = await fs.readdir('./testpublic');
        
        expect(items.length).toEqual(0)
    })
    it("when try to delete a review but the reviews is already deleted",async()=>{
        const response = await request(app)
            .delete('/reviews/product/delete')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .send({review_id})
        
            expect(response.status).toEqual(400)
            expect(response.body.message).toEqual('Review not found.')


        const checkInDB = await Reviews.findAll()
        expect(checkInDB).toHaveLength(0)
        const items = await fs.readdir('./testpublic');
        
        expect(items.length).toEqual(0)
    })
})