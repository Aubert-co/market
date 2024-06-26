const request = require('supertest');
const server = require('../serve');
const {Person,Store,Product} = require('../models/index')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize');
const {itemStore,users, stores} = require('./storefixtures')
const fs = require('fs').promises
require('dotenv').config()
const {existImg} = require('../helpers/saveFiles')
const secret = process.env.SECRET_JWT
var app,token,img_Path,store_id

const [user] = users

const path = require('path');
let name = "tech store"
let category ="tech"
let description = "a tecnologya store"


describe("API Store",()=>{
    beforeAll(async()=>{
        app =  server.listen(8085)
        try{
            await Promise.all([
                Person.create( user ),
             
            ])
            token = jwt.sign({user_id:user.id},secret)
        }catch(err){        
            console.error("before all"+err)
        }
    })
    
    it("When a file is not sent, a Store should not be created.",async()=>{
        try{
            const response = await request(app)
            .post('/store/create')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
        
            .field('name','tech store')
            .field('category','tecnology')
            .field('description','qkbweq bwen')

        expect(response.body.message).toEqual('No files were sent in the request.')
        expect(response.status).toEqual(400)
       
        const datasFromDB = await Store.findOne({where:{user_id:user.id}})

        expect(datasFromDB).toBeNull()
        }catch(err){
            throw err
        }
    })
    it("A Store should not be created when a name is not sent.",async()=>{
       try{
             
        const file = path.join(__dirname, 'sports.jpg');
        const response = await request(app)
            .post('/store/create')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .attach('file',file)
            .field('name','')
            .field('category','tecnology')
            .field('description','qkbweq bwen')

        expect(response.body.message).toEqual( 'Please provide all required fields: name, description, and category.')
        expect(response.status).toEqual(400)

        const datasFromDB = await Store.findOne({where:{user_id:user.id}})

        expect(datasFromDB).toBeNull()
       }catch(err){
            throw err
       }
    
    })
    it("A Store should not be created when a category is not sent.",async()=>{
        
       try {
        const file = path.join(__dirname, 'sports.jpg');
        const response = await request(app)
            .post('/store/create')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .attach('file',file)
            .field('name','')
            .field('category','')
            .field('description','qkbweq bwen')

        expect(response.body.message).toEqual( 'Please provide all required fields: name, description, and category.')
        expect(response.status).toEqual(400)

        const datasFromDB = await Store.findOne({where:{user_id:user.id}})

        expect(datasFromDB).toBeNull()
       } catch (err) {
            throw err
       }
    
    })
    it("A Store should not be created when a description is not sent.",async()=>{
      try{
          
        const file = path.join(__dirname, 'sports.jpg');
        const response = await request(app)
            .post('/store/create')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .attach('file',file)
            .field('name','')
            .field('category','tecnology')
            .field('description','')

        expect(response.body.message).toEqual( 'Please provide all required fields: name, description, and category.')
        expect(response.status).toEqual(400)

        const datasFromDB = await Store.findOne({where:{user_id:user.id}})

        expect(datasFromDB).toBeNull()
      }catch(err){
        throw err
      }
    
    })
    it("When correct data is sent, a new Store should be created.",async()=>{
       try{
        const file = path.join(__dirname, 'sports.jpg');
        const response = await request(app)
            .post('/store/create')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .attach('file',file)
            .field('name',name)
            .field('category',category)
            .field('description',description)

        
        expect(response.body.message).toEqual('sucess')
        expect(response.status).toEqual(201)
        
        const datasFromDB = await Store.findOne({where:{user_id:user.id}})

        expect(datasFromDB).not.toBeNull()
        store_id = datasFromDB.id
        const existImgInDB = await existImg(datasFromDB.imgPath)
        img_Path = datasFromDB.imgPath
        expect(existImgInDB).toBeTruthy()
        expect(datasFromDB.name).toEqual(name)
        expect(datasFromDB.category).toEqual(category)
        expect(datasFromDB.description).toEqual(description)
       }catch(err){
        throw err
       }
      
    })
    it("When sending a store name that already exists, a new store should not be created.",async()=>{
        try{
        const file = path.join(__dirname, 'sports.jpg');
        const response = await request(app)
            .post('/store/create')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .attach('file',file)
            .field('name',name)
            .field('category',category)
            .field('description',description)

        
        expect(response.body.message).toEqual('Already exist a store with this name')
        expect(response.status).toEqual(400)
    
        const datasFromDB = await Store.findAll({where:{name}})

        expect(datasFromDB).toHaveLength(1)
        
        const items = await fs.readdir('./testpublic');
        
        expect(items.length).toEqual(1)
        }catch(err){
            throw err
        }
    })
    it("When no values are sent to update, an error should be returned.",async()=>{
        try{
            const file = path.join(__dirname, 'sports.jpg');
            const response = await request(app)
                .put('/store/edit')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
              
    
            
            expect(response.body.message).toEqual('No fields sent')
            expect(response.status).toEqual(400)
        
            }catch(err){
                throw err
            }
    })
    it("When sending only a file to update, it should be updated.",async()=>{
        try{
        const file = path.join(__dirname, 'imgupdate.jpg');
        const response = await request(app)
            .put('/store/edit')
            .set({'Content-type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .attach('file',file)
            .field('id',store_id)
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
    
        const datasFromDB = await Store.findOne({where:{name}})

        expect(datasFromDB.category).toEqual(category)
        expect(datasFromDB.description).toEqual(description)

        expect(existImg(datasFromDB.imgPath)).toBeTruthy()
        const items = await fs.readdir('./testpublic');
        expect(items.length).toEqual(1)
        }catch(err){
            throw err
        }
    })
    it("When sending a category to be changed, it should update.",async()=>{
        try{
            const categoryToUpdate = "newValue"
            const response = await request(app)
                .put('/store/edit')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
                .send({category:categoryToUpdate,id:store_id})
    
            
            expect(response.body.message).toEqual('Sucess')
            expect(response.status).toEqual(201)
            const datasFromDB = await Store.findOne({where:{user_id:user.id}})

            expect(datasFromDB.category).not.toEqual(category)
            expect(datasFromDB.category).toEqual(categoryToUpdate)
        }catch(err){
            throw err
        }
    })
    
    it("When sending a description to be changed, it should update.",async()=>{
        try{
            const descriptionToUpdate = "newValue"
            const response = await request(app)
                .put('/store/edit')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
                .send({description:descriptionToUpdate,id:store_id})
    
            
            expect(response.body.message).toEqual('Sucess')
            expect(response.status).toEqual(201)
            const datasFromDB = await Store.findOne({where:{user_id:user.id}})

            expect(datasFromDB.description).not.toEqual(description)
            expect(datasFromDB.description).toEqual(descriptionToUpdate)
        }catch(err){
            throw err
        }
    })
   
     
    afterAll(async()=>{
        try{
            await Promise.all([
                Person.destroy({ where: { id: { [Op.gt]: 0 } } }),
                Store.destroy({ where: { id: { [Op.gt]: 0 } } }),
                Product.destroy({ where: { id: { [Op.gt]: 0 } } }),
            ])
            app.close()
         
            await fs.unlink(img_Path)
        
        }catch(err){
            console.error("afterAll"+err)
        }
    })
})