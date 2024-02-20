const request = require('supertest');
const server = require('../serve');
const {Store} = require('../models/index')
const {Op} = require('sequelize')
const {itemStore,defaultLimit,maximumLimit} = require('./storefixtures')
require('dotenv')
var app


describe("GET/home/products/:limit",()=>{
    beforeAll(async()=>{
        app =  server.listen(8089)
        await Store.bulkCreate(itemStore)
        .catch((err)=>{
            console.error("error beforeal",err)
            throw err
        })
    })
    it("Should return 5 items from the route when the limit is set to 5.",async()=>{
        const limit = 5
        const response = await request(app)
        .get(`/home/products/${limit}`)
        expect(response.body.message).toBe('sucess')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')
        expect(response.body.datas).toHaveLength(limit)
    })
    it("Should return the default limit when limit is not valid",async()=>{
        const limit = 'h2'
        const response = await request(app)
        .get(`/home/products/${limit}`)
        expect(response.body.message).toBe('sucess')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')
        expect(response.body.datas).toHaveLength(defaultLimit)
    })
    it("Should return an array with the default limit when a limit of 0 is sent.", async () => {
        const limit = 0;
        const response = await request(app).get(`/home/products/${limit}`);
      
        expect(response.body.message).toBe("sucess");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("datas");
        expect(response.body.datas).toHaveLength(defaultLimit);
      });
      
    it("Should return the default limit of items when a non-numeric limit is sent.",async()=>{
        const limit = 'not a number'
        const response = await request(app)
        .get(`/home/products/${limit}`)
        expect(response.body.message).toBe('sucess')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')
        expect(response.body.datas).toHaveLength(defaultLimit)
    })
    it("When a limit greater than 25 is sent, the route should return a maximum limit of 25 by default.", async () => {
        const limit = 100;
        const response = await request(app).get(`/home/products/${limit}`);
      
        expect(response.body.message).toBe("sucess");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("datas");
        expect(response.body.datas).toHaveLength(maximumLimit);
      });
      it("When a limit is not provided, the route should return a default limit of 5.", async () => {
      
        const response = await request(app).get(`/home/products`);
      
        expect(response.body.message).toBe("sucess");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("datas");
        expect(response.body.datas).toHaveLength(defaultLimit);
      });
    
    afterAll(async()=>{
        try{
           await Store.destroy({ where: { id: { [Op.gt]: 0 } } })
        }catch(err){
            console.error(err)
            throw err
        }
    })
})