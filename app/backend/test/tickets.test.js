const request = require('supertest');
const server = require('../serve');
const {Status,Person,Store,Product} = require('../models/index')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize');
const {stores,itemStore,users} = require('./storefixtures')
require('dotenv').config()

const secret = process.env.SECRET_JWT
var app,token
const [products] = itemStore
const [user,requester_user] = users
const [store]= stores

describe("API CART",()=>{
    beforeAll(async()=>{
        app =  server.listen(8095)
        try{
            const person = {user,requester_user}
        
            await Promise.all([
                Person.bulkCreate( person ),
                Store.create( store ),
                Product.create(products)
            ])
            token = jwt.sign({user_id:requester_user.id},secret)
        }catch(err){
            
            console.error("before all"+err)
        }
    })
    afterAll(async()=>{
        try{
            await Promise.all([
                Person.destroy({ where: { id: { [Op.gt]: 0 } } }),
                Store.destroy({ where: { id: { [Op.gt]: 0 } } }),
                Product.destroy({ where: { id: { [Op.gt]: 0 } } }),
                Status.destroy({where:{id:{[Op.gt]:0}}})
            ])
            app.close()
        }catch(err){
            console.error("afterAll"+err)
        }
    })
    it("tets",async()=>{
        const response =  await request(app)
            .post('/tickets/create')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({product_id:products.id,store_id:store.user_id})
   
        expect(response.status).toEqual(201)
    
        const verifyStatus = await Status.findAll({where:{requester_id:requester_user.id}})
        expect(verifyStatus).toHaveLength(1)
        const dataValues = verifyStatus[0].dataValues
        console.log(dataValues)
        expect(dataValues.status).toEqual('open')
        expect(dataValues.product_id).toEqual(products.id)
        expect(dataValues.store_id).toEqual(store.user_id)
    })
})