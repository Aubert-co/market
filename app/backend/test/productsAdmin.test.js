const request = require('supertest');
const server = require('../serve');
const {Person,Cart,Store,Product} = require('../models/index')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize');
const {itemStore,users, stores} = require('./storefixtures')
const fs = require('fs').promises
require('dotenv').config()
const {existImg} = require('../helpers/saveFiles')
const secret = process.env.SECRET_JWT
var app,token,productImg,store_id,product_id
const [products] = itemStore
const [user] = users
const [store] = stores
const path = require('path');

const newDatas  ={
    name:'newData',
    category:'newCategory',
    price:343,
    quantity:35,
    description:"lorem iptu new"
}
store.id=59
store_id = 59
describe("API /store/product",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    beforeAll(async()=>{
        app =  server.listen(8086)
        try{
            await Promise.all([
                Person.create( user ),
                Store.create( store)
            ])
            token = jwt.sign({user_id:user.id},secret)
        }catch(err){        
            console.error("before all"+err)
        }
    })
    it("When not sending a store_id, an error should be returned, and a product should not be created.",async()=>{
        try{
            const mockFS = jest.spyOn(fs,'writeFile')
            const file = path.join(__dirname, 'imgupdate.jpg');
            const response = await request(app)
                .post('/store/product/create')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
                .attach('file',file)

            expect(response.status).toEqual(400)
            expect(response.body.message).toEqual('Store ID not sent')

            const productsInDB = await Product.findAll({where:{store_id}})

            expect(productsInDB).toHaveLength(0)
            expect(mockFS).toHaveBeenCalledTimes(0)
        }catch(err){
            throw err
        }
    })
    it("When attempting to create a product but not sending a file, an error should be returned.",async()=>{
        try{
            const mockFS = jest.spyOn(fs,'writeFile')
            const response = await request(app)
                .post('/store/product/create')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
                .send({store_id})
            
            expect(response.status).toEqual(400)
            expect(response.body.message).toEqual('No files were sent in the request.')

            const productsInDB = await Product.findAll({where:{store_id}})
            expect(productsInDB).toHaveLength(0)
            expect(mockFS).toHaveBeenCalledTimes(0)
        }catch(err){
            throw err
        }
    })
    it("When attempting to create a product and the store ID does not match the user ID, an error should be returned.",async()=>{
        try{
            const mockFS = jest.spyOn(fs,'writeFile')
            const file = path.join(__dirname, 'imgupdate.jpg');
            const response = await request(app)
                .post('/store/product/create')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
                .attach('file',file)
                .field('store_id',store_id+5)
                .field('name',products.name)
                .field('quantity',products.quantity)
                .field('price',products.price)
                .field('category',products.category)
                .field("description",products.description)
            expect(response.body.message).toEqual('Store not found')
            expect(response.status).toEqual(404)

            const productsInDB = await Product.findAll({where:{store_id}})
            expect(productsInDB).toHaveLength(0)
            expect(mockFS).toHaveBeenCalledTimes(0)
        }catch(err){
            throw err
        }
    })
    it("When attempting to create a product but not sending a name, an error should be returned.",async()=>{
        try{
            const mockFS = jest.spyOn(fs,'writeFile')
            const file = path.join(__dirname, 'imgupdate.jpg');
            const response = await request(app)
                .post('/store/product/create')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
                .attach('file',file)
                .field('store_id',store_id)
                .field('category',products.category)
                .field('price',products.price)
                .field('quantity',products.quantity)
                .field("description",products.description)
            expect(response.status).toEqual(400)
            expect(response.body.message).toEqual('Missing required fields')

            const productsInDB = await Product.findAll({where:{store_id}})
            expect(productsInDB).toHaveLength(0)
            expect(mockFS).toHaveBeenCalledTimes(0)
        }catch(err){
            throw err
        }
    })
    it("When attempting to create a product but not sending a description, an error should be returned.",async()=>{
        try{
            const mockFS = jest.spyOn(fs,'writeFile')
            const file = path.join(__dirname, 'imgupdate.jpg');
            const response = await request(app)
                .post('/store/product/create')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
                .attach('file',file)
                .field('store_id',store_id)
                .field('category',products.category)
                .field('price',products.price)
                .field('quantity',products.quantity)
              
            expect(response.status).toEqual(400)
            expect(response.body.message).toEqual('Missing required fields')

            const productsInDB = await Product.findAll({where:{store_id}})
            expect(productsInDB).toHaveLength(0)
            expect(mockFS).toHaveBeenCalledTimes(0)
        }catch(err){
            throw err
        }
    })
    it("When attempting to create a product but not sending a category, an error should be returned.",async()=>{
        try{
            const mockFS = jest.spyOn(fs,'writeFile')
            const file = path.join(__dirname, 'imgupdate.jpg');
            const response = await request(app)
                .post('/store/product/create')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
                .attach('file',file)
                .field('store_id',store_id)
                .field('name',products.name)
                .field('price',products.price)
                .field('quantity',products.quantity)
                .field("description",products.description)
            expect(response.status).toEqual(400)
            expect(response.body.message).toEqual('Missing required fields')

            const productsInDB = await Product.findAll({where:{store_id}})
            expect(productsInDB).toHaveLength(0)
            expect(mockFS).toHaveBeenCalledTimes(0)
        }catch(err){
            throw err
        }
    })
    it("When attempting to create a product but not sending a price, an error should be returned.",async()=>{
        try{
            const mockFS = jest.spyOn(fs,'writeFile')
            const file = path.join(__dirname, 'imgupdate.jpg');
            const response = await request(app)
                .post('/store/product/create')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
                .attach('file',file)
                .field('store_id',store_id)
                .field('category',products.category)
                .field('name',products.name)
                .field('quantity',products.quantity)
                .field("description",products.description)
            expect(response.status).toEqual(400)
            expect(response.body.message).toEqual('Missing required fields')

            const productsInDB = await Product.findAll({where:{store_id}})
            expect(productsInDB).toHaveLength(0)
            expect(mockFS).toHaveBeenCalledTimes(0)
        }catch(err){
            throw err
        }
    })
    it("When attempting to create a product but not sending a quantity, an error should be returned.",async()=>{
        try{
            const mockFS = jest.spyOn(fs,'writeFile')
            const file = path.join(__dirname, 'imgupdate.jpg');
            const response = await request(app)
                .post('/store/product/create')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
                .attach('file',file)
                .field('store_id',store_id)
                .field('category',products.category)
                .field('price',products.price)
                .field('name',products.name)
                .field("description",products.description)
            expect(response.status).toEqual(400)
            expect(response.body.message).toEqual('Missing required fields')

            const productsInDB = await Product.findAll({where:{store_id}})
            expect(productsInDB).toHaveLength(0)
            expect(mockFS).toHaveBeenCalledTimes(0)
        }catch(err){
            throw err
        }
    })
   
    it("When all data is sent correctly, a new product should be created.",async()=>{
        try{
            const mockFS = jest.spyOn(fs,'writeFile')
            const file = path.join(__dirname, 'imgupdate.jpg');
            const buffer = await fs.readFile(file)
            const response = await request(app)
                .post('/store/product/create')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
                .attach('file',file)
                .field('store_id',store_id)
                .field('category',products.category)
                .field('price',products.price)
                .field('name',products.name)
                .field('quantity',products.quantity)
                .field("description",products.description)
            expect(response.body.message).toEqual('Sucess')
            expect(response.status).toEqual(201)
            

            const datasFromDB = await Product.findAll({where:{store_id}})
            const [productsInDB]  = datasFromDB
            productImg = productsInDB.imgPath
            product_id = productsInDB.id

            expect(datasFromDB).toHaveLength(1)
            expect(productsInDB.name).toEqual(products.name)
            expect(productsInDB.category).toEqual(products.category)
            expect(productsInDB.quantity).toEqual(products.quantity)
            expect(productsInDB.price).toEqual(products.price)


            const firstArgument = mockFS.mock.calls[0][0];
            const secondArgument = mockFS.mock.calls[0][1]
            expect(firstArgument).toBe(productImg);  
            expect(existImg(productsInDB.imgPath)).toBeTruthy()
            expect(mockFS).toHaveBeenCalledTimes(1)
            expect(firstArgument).toBe(productsInDB.imgPath)
            expect(secondArgument.toString()).toBe(Buffer.from(buffer).toString())
        }catch(err){
            throw err
        }
    })
    it("When attempting to update a product without sending a name, the product should be updated, but the name should remain unchanged.",async()=>{
        try{
            const mockFS = jest.spyOn(fs,'writeFile')
            const file = path.join(__dirname, 'sports.jpg');
            const buffer = await fs.readFile(file)
            const response = await request(app)
                .put('/store/product/edit')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
                .attach('file',file)
                .field('store_id',store_id)
                .field('product_id',product_id)
                .field('category',newDatas.category)
                .field('price',newDatas.price)
                .field('quantity',newDatas.quantity)
                .field("description",newDatas.description)
            
            expect(response.body.message).toEqual('Sucess')
            expect(response.status).toEqual(201)
            

            const datasFromDB = await Product.findAll({where:{id:product_id}})
            const [productsInDB]  = datasFromDB
            
            expect(datasFromDB).toHaveLength(1)
            expect(productsInDB.name).not.toEqual(newDatas.name)
            expect(productsInDB.name).toEqual(products.name)
            expect(productsInDB.category).toEqual(newDatas.category)
            expect(productsInDB.quantity).toEqual(newDatas.quantity)
            expect(productsInDB.price).toEqual(newDatas.price)

            expect(existImg(productsInDB.imgPath)).toBeTruthy()
            productImg = productsInDB.imgPath
            const firstArgument = mockFS.mock.calls[0][0];
            const secondArgument = mockFS.mock.calls[0][1]
            expect(firstArgument).toBe(productImg);  
        
            expect(mockFS).toHaveBeenCalledTimes(1)
            expect(firstArgument).toBe(productsInDB.imgPath)
            expect(secondArgument.toString()).toBe(Buffer.from(buffer).toString())
        }catch(err){
            throw err
        }
    })
    it("When a store ID is not sent, an error should be returned, and the product should not be deleted.",async()=>{
        try{
            const mockFS = jest.spyOn(fs,'unlink')
            
            const response = await request(app)
                .delete('/store/product/delete')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
                .send({product_id})
            expect(response.body.message).toEqual('ID not provided')
            expect(response.status).toEqual(400)
            
            const datasFromDB = await Product.findAll({where:{id:product_id}})
            
            expect(datasFromDB).toHaveLength(1)
          
            const exists = await existImg(productImg)
            expect(exists).toBeTruthy()
            expect(mockFS).toHaveReturnedTimes(0)
        }catch(err){
            throw err
        }
    })
      it("When a product ID is not sent, an error should be returned, and the product should not be deleted.",async()=>{
        try{
           
            const mockFS = jest.spyOn(fs,'unlink')
            const response = await request(app)
                .delete('/store/product/delete')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
                .send({store_id})
            expect(response.body.message).toEqual('ID not provided')
            expect(response.status).toEqual(400)
            
            const datasFromDB = await Product.findAll({where:{id:product_id}})
            
            expect(datasFromDB).toHaveLength(1)
          
            const exists = await existImg(productImg)
            expect(exists).toBeTruthy()
            expect(mockFS).toHaveReturnedTimes(0)
        }catch(err){
            throw err
        }
    })
    it("When the store does not match the user ID, an error should be returned.",async()=>{
        try{
           
            const mockFS = jest.spyOn(fs,'unlink')
            const response = await request(app)
                .delete('/store/product/delete')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
                .send({store_id:store_id+5,product_id})
            expect(response.body.message).toEqual('Store not found')
            expect(response.status).toEqual(404)
            
            const datasFromDB = await Product.findAll({where:{id:product_id}})
            
            expect(datasFromDB).toHaveLength(1)

            const exists = await existImg(productImg)
            expect(exists).toBeTruthy()
            expect(mockFS).toHaveReturnedTimes(0)
        }catch(err){
            throw err
        }
    })
    it("When all correct data is sent, the product should be deleted.",async()=>{
        try{
           
            const mockFS = jest.spyOn(fs,'unlink')
            const response = await request(app)
                .delete('/store/product/delete')
                .set({'Content-type':'application/json'})
                .set('Authorization',`Bearer ${token}`)
                .send({store_id:store_id,product_id})

            expect(response.body.message).toEqual('Sucess')
            expect(response.status).toEqual(201)
            
            const datasFromDB = await Product.findAll({where:{id:product_id}})
            
            expect(datasFromDB).toHaveLength(0)
          
            const exists = await existImg(productImg)
            expect(exists).toBeFalsy()
           
            const firstArgument = mockFS.mock.calls[0][0];
        
            expect(firstArgument).toBe(productImg)
            expect(mockFS).toHaveBeenCalledTimes(1)
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
         
            const exists = await existImg(productImg)
            if(exists)await fs.unlink(productImg)
        }catch(err){
            console.error("afterAll"+err)
        }
    })
})