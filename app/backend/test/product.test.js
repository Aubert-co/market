const request = require('supertest');
const server = require('../serve');
const {Product,Views} = require('../models/index')
const {Op} = require('sequelize')
const {itemStore,defaultLimit} = require('./storefixtures')
require('dotenv')
var app


describe("GET/products",()=>{
    beforeAll(async()=>{
        app =  server.listen(8089)
        await Product.bulkCreate(itemStore)
    
        .catch((err)=>{
            console.error("error beforeal",err)
            throw err
        })
    })
    it("Should return 5 items from the route when the limit is set to 5.",async()=>{
    
        const response = await request(app)
        .get(`/products`)
        expect(response.body.message).toBe('sucess')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')
        expect(response.body.datas).toHaveLength(defaultLimit)
    })
    it("Should return the default limit when limit is not valid",async()=>{
        
        const response = await request(app)
        .get(`/products`)
        expect(response.body.message).toBe('sucess')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')
        expect(response.body.datas).toHaveLength(defaultLimit)
    })
    it("Should return an array with the default limit when a limit of 0 is sent.", async () => {

        const response = await request(app).get(`/products`);
      
        expect(response.body.message).toBe("sucess");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("datas");
        expect(response.body.datas).toHaveLength(defaultLimit);
      });
      
    it("Should return the default limit of items when a non-numeric limit is sent.",async()=>{
      
        const response = await request(app)
        .get(`/products`)
        expect(response.body.message).toBe('sucess')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')
        expect(response.body.datas).toHaveLength(defaultLimit)
    })
    it("When a limit greater than 25 is sent, the route should return a maximum limit of 25 by default.", async () => {
   
        const response = await request(app).get(`/products/`);
      
        expect(response.body.message).toBe("sucess");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("datas");
        expect(response.body.datas).toHaveLength(defaultLimit);
      });
      it("When a limit is not provided, the route should return a default limit of 5.", async () => {
      
        const response = await request(app).get(`/products`);
      
        expect(response.body.message).toBe("sucess");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("datas");
        expect(response.body.datas).toHaveLength(defaultLimit);
      });
    
   
})

describe("GET/products/info/:product_id",()=>{
    it("When sending a valid product_id, the operation should succeed, and the corresponding product should be returned. The view should be saved in the table 'views'.",async()=>{
        const [item,...e] =itemStore
  
        const response = await request(app).get(`/products/info/${itemStore[0].id}`);
      
        expect(response.body.message).toBe("sucess");
        expect(response.status).toBe(200);
        const datas =response.body.datas
        const keys = Object.keys(datas)
        const [product,views] =await Promise.all([Product.findOne({where:{id:datas.id}}),Views.findAll({where:{product_id:datas.id}})])
     
        const dataViews = views[0].dataValues
        const datasProduct = product.dataValues
        expect(views).toHaveLength(1)
        expect(dataViews.product_id).toEqual(itemStore[0].id)

        keys.map((val)=>{
            if(val ==='createdAt' || val === 'updatedAt')return
            expect(datasProduct[val]).toEqual(datas[val])
        })
    })
    it("When sending a non-existent product_id, the operation should succeed, and the data returned should be null. It should not save a view in the table 'views'.",async()=>{
        const [item,...e] =itemStore
  
        const response = await request(app).get(`/products/info/559`);
      
        expect(response.body.message).toBe("sucess");
        expect(response.status).toBe(200);
        expect(response.body.datas).toBeNull()
        const views =await Views.findAll()
        expect(views).toHaveLength(1)
    })
    afterAll(async()=>{
        try{
           await Product.destroy({ where: { id: { [Op.gt]: 0 } } })
           await Views.destroy({ where: { id: { [Op.gt]: 0 } } })
        }catch(err){
            console.error(err)
            throw err
        }
    })
})