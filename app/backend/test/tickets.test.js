const request = require('supertest');
const server = require('../serve');
const {Tickets,Person,Store,Product} = require('../models/index')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize');
const {stores,itemStore,users,status} = require('./storefixtures')
require('dotenv').config()

const secret = process.env.SECRET_JWT
var app,token,ticket_id
const [products,products2] = itemStore
const [user,requester_user] = users
const [store]= stores
products2.store_id = 2
describe("METHOD:POST API:/tickets/create ",()=>{
    beforeAll(async()=>{
        app =  server.listen(8095)
        try{
            const person = {user,requester_user}
        
            await Promise.all([
                Person.bulkCreate( users ),
                Store.bulkCreate( stores),
                Product.bulkCreate(itemStore)
            ])
            token = jwt.sign({user_id:requester_user.id},secret)
        }catch(err){
            
            console.error("before all"+err)
        }
    })
    afterAll(async()=>{
        try{
            await Promise.all([
                
                Tickets.destroy({where:{id:{[Op.gt]:0}}})
            ])
            app.close()
        }catch(err){
            console.error("afterAll"+err)
        }
    })
    it("When the product_id is from a different store, it should return an error.",async()=>{
        const response =  await request(app)
            .post('/tickets/create')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({product_id:products2.id,store_id:store.user_id})
   
        expect(response.status).toEqual(400)
    
        const verifyStatus = await Tickets.findAll({where:{requester_id:requester_user.id}})
        expect(verifyStatus).toHaveLength(0)
    })
    it("When product_id is not provided, it should return an error and not create a ticket in the database.",async()=>{
        const response =  await request(app)
            .post('/tickets/create')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({store_id:store.user_id})
   
        expect(response.status).toEqual(400)
    
        const verifyStatus = await Tickets.findAll({where:{requester_id:requester_user.id}})
        expect(verifyStatus).toHaveLength(0)
     
    })
    it("When store_id is not provided, it should return an error and not create a ticket in the database.",async()=>{
        const response =  await request(app)
            .post('/tickets/create')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({product_id:products.id})
   
        expect(response.status).toEqual(400)
    
        const verifyStatus = await Tickets.findAll({where:{requester_id:requester_user.id}})
        expect(verifyStatus).toHaveLength(0)
     
    })
    it("When all fields are provided correctly, it should create a new entry in the database.",async()=>{
        const response =  await request(app)
            .post('/tickets/create')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({product_id:products.id,store_id:store.user_id})
   
        expect(response.status).toEqual(201)
    
        const verifyStatus = await Tickets.findAll({where:{requester_id:requester_user.id}})
        expect(verifyStatus).toHaveLength(1)
        const dataValues = verifyStatus[0].dataValues
        
        expect(dataValues.status).toEqual('open')
        expect(dataValues.product_id).toEqual(products.id)
        expect(dataValues.store_id).toEqual(store.user_id)
    })
   
})

describe("METHOD:GET API:/tickets",()=>{
   
    beforeAll(async()=>{
        try{
     
        await Tickets.bulkCreate(status)
        }catch(err){
            console.error(err)
        }
    })
    it("When type_user is different from 'user' or 'store', it should return an error and not send data.",async()=>{
        const response =  await request(app)
            .get('/tickets')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({type_user:null})
        expect(response.status).toEqual(400)
        expect(response.body).not.toHaveProperty('datas')

        
    })
    it("When type_user is different from 'user' or 'store', it should return an error and not send data.",async()=>{
        const response =  await request(app)
            .get('/tickets')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({type_user:'stores'})
        expect(response.status).toEqual(400)
        expect(response.body).not.toHaveProperty('datas')

        
    })
    it("When type_user is 'store' and status is null, it should return all types of tickets.",async()=>{
        const response =  await request(app)
            .get('/tickets')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({type_user:'store'})
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
        expect(response.body.datas).toHaveLength(3)

        const typeTickets =['completed','open','cancelled']
        response.body.datas.map((val)=>{
            expect(typeTickets.includes(val.status)).toBeTruthy()
            expect(val.store_id).toEqual(requester_user.id)
        })
    })
    it("When type_user is 'user' and status is 'completed', it should return only tickets with the status 'completed'.",async()=>{
        const response =  await request(app)
            .get('/tickets')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({type_user:'user',status:'completed'})
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
        expect(response.body.datas).toHaveLength(1)

        const typeTickets =['completed']
        response.body.datas.map((val)=>{
            expect(typeTickets.includes(val.status)).toBeTruthy()
            expect(val.requester_id).toEqual(requester_user.id)
        })
    })
    it("When type_user is 'user' and status is 'completed', it should return only tickets with the status 'cancelled'.",async()=>{
        const response =  await request(app)
            .get('/tickets')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({type_user:'user',status:'cancelled'})
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
        expect(response.body.datas).toHaveLength(1)

        const typeTickets =['cancelled']
        response.body.datas.map((val)=>{
            expect(typeTickets.includes(val.status)).toBeTruthy()
            expect(val.requester_id).toEqual(requester_user.id)
        })
    })
    it("When type_user is 'user' and status is 'open', it should return only tickets with the status 'open'.",async()=>{
        const response =  await request(app)
            .get('/tickets')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({type_user:'user',status:'open'})
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
        expect(response.body.datas).toHaveLength(1)

        const typeTickets =['open']
        response.body.datas.map((val)=>{
            expect(typeTickets.includes(val.status)).toBeTruthy()
            expect(val.requester_id).toEqual(requester_user.id)
        })
    })
    it("When type_user is 'user' and status is null, it should return all types of tickets.",async()=>{
        const response =  await request(app)
            .get('/tickets')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({type_user:'user'})
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
        expect(response.body.datas).toHaveLength(3)

        const typeTickets =['completed','open','cancelled']
        response.body.datas.map((val)=>{
            expect(typeTickets.includes(val.status)).toBeTruthy()
            expect(val.requester_id).toEqual(requester_user.id)
        })
    })
    it("When type_user is 'store' and status is 'open', it should return tickets from that store with status 'completed'.",async()=>{
        const response =  await request(app)
            .get('/tickets')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({type_user:'store',status:'completed'})
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
        expect(response.body.datas).toHaveLength(1)

        const datas = response.body.datas[0]
        const StatusDB = await Tickets.findAll({
            include: [{
                model:  Store,
                as: 'Store',
                required: true
            },{model:Product,as:'Product'}],
            where:{status:'completed','$Store.user_id$':requester_user.id}
        })
        const dataValues = StatusDB[0].dataValues
        const keys = Object.keys(datas)
        expect(dataValues.status).toEqual('completed')
        keys.map((val,ind)=>{
            if(val ==='createdAt' || val ==='updatedAt' || val==='Product'||val==='Store')return
            expect(dataValues[val]).toEqual(datas[val])
        })

    
    })
    it("When type_user is 'store' and status is 'open', it should return tickets from that store with status 'cancelled'.",async()=>{
        const response =  await request(app)
            .get('/tickets')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({type_user:'store',status:'cancelled'})
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
        expect(response.body.datas).toHaveLength(1)

        const datas = response.body.datas[0]
        const StatusDB = await Tickets.findAll({
            include: [{
                model:  Store,
                as: 'Store',
                required: true
            },{model:Product,as:'Product'}],
            where:{status:'cancelled','$Store.user_id$':requester_user.id}
        })
        const dataValues = StatusDB[0].dataValues
        const keys = Object.keys(datas)
        expect(datas.status).toEqual('cancelled')
        keys.map((val,ind)=>{
            if(val ==='createdAt' || val ==='updatedAt' || val==='Product'||val==='Store')return
            expect(dataValues[val]).toEqual(datas[val])
        })

    
    })
    it("When type_user is 'store' and status is 'open', it should return tickets from that store with status 'open'.",async()=>{
        const response =  await request(app)
            .get('/tickets')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({type_user:'store',status:'open'})
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(200)
        expect(response.body.datas).toHaveLength(1)

        const datas = response.body.datas[0]
        const StatusDB = await Tickets.findAll({
            include: [{
                model:  Store,
                as: 'Store',
                required: true
            },{model:Product,as:'Product'}],
            where:{status:'open','$Store.user_id$':requester_user.id}
        })
        const dataValues = StatusDB[0].dataValues
        ticket_id = dataValues.id
        const keys = Object.keys(datas)
        expect(datas.status).toEqual('open')
        keys.map((val,ind)=>{
            if(val ==='createdAt' || val ==='updatedAt' || val==='Product'||val==='Store')return
            expect(dataValues[val]).toEqual(datas[val])
        })

    })
})

describe('METHOD:PUT API/tickets/update',()=>{
    afterAll(async()=>{
        try{
            await Promise.all([
                Person.destroy({ where: { id: { [Op.gt]: 0 } } }),
                Store.destroy({ where: { id: { [Op.gt]: 0 } } }),
                Product.destroy({ where: { id: { [Op.gt]: 0 } } }),
                Tickets.destroy({where:{id:{[Op.gt]:0}}})
            ])
            app.close()
        }catch(err){
            console.error("afterAll"+err)
        }
    })
    it("When type_user is not provided, it should return an error.",async()=>{
        const response =  await request(app)
            .put('/tickets/update')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({status_id:ticket_id,status:'completed'})

        expect(response.body.message).toEqual('Missing required fields: status, status_id, or type_user')
        expect(response.status).toEqual(400)
        
        const StatusDB = await Tickets.findAll({
            include: [{
                model:  Store,
                as: 'Store',
                required: true
            },{model:Product,as:'Product'}],
            where:{status:'open','$Store.user_id$':requester_user.id}
        })
        const dataValues = StatusDB[0].dataValues
        
        //default value is open
        expect(dataValues.status).toEqual('open')

    })
    it("When type_user is different from 'user' or 'store', it should return an error.",async()=>{
        const response =  await request(app)
            .put('/tickets/update')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({type_user:'not user',status_id:ticket_id,status:'completed'})

        expect(response.body.message).toEqual('Missing required fields: status, status_id, or type_user')
        expect(response.status).toEqual(400)
        
        const StatusDB = await Tickets.findAll({
            include: [{
                model:  Store,
                as: 'Store',
                required: true
            },{model:Product,as:'Product'}],
            where:{status:'open','$Store.user_id$':requester_user.id}
        })
        const dataValues = StatusDB[0].dataValues
        
        //default value is open
        expect(dataValues.status).toEqual('open')

    })
    it("When status is not provided, it should return an error.",async()=>{
        const response =  await request(app)
            .put('/tickets/update')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({status_id:ticket_id,type_user:'store'})

        expect(response.body.message).toEqual('Missing required fields: status, status_id, or type_user')
        expect(response.status).toEqual(400)
        
        const StatusDB = await Tickets.findAll({
            include: [{
                model:  Store,
                as: 'Store',
                required: true
            },{model:Product,as:'Product'}],
            where:{status:'open','$Store.user_id$':requester_user.id}
        })
        const dataValues = StatusDB[0].dataValues
        
        //default value is open
        expect(dataValues.status).toEqual('open')

    })
    it("When status_id is not provided, it should return an error.",async()=>{
        const response =  await request(app)
            .put('/tickets/update')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({status:'cancelled',type_user:'store'})

        expect(response.body.message).toEqual('Missing required fields: status, status_id, or type_user')
        expect(response.status).toEqual(400)
        
        const StatusDB = await Tickets.findAll({
            include: [{
                model:  Store,
                as: 'Store',
                required: true
            },{model:Product,as:'Product'}],
            where:{status:'open','$Store.user_id$':requester_user.id}
        })
        const dataValues = StatusDB[0].dataValues
        
        //default value is open
        expect(dataValues.status).toEqual('open')

    })
    it("When all fields are provided, but the status is not one of [open, cancelled, completed], it should return an error.",async()=>{
        const response =  await request(app)
            .put('/tickets/update')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({status:'test',status_id:ticket_id,type_user:'store'})

        expect(response.body.message).toEqual('Missing required fields: status, status_id, or type_user')
        expect(response.status).toEqual(400)
        
        const StatusDB = await Tickets.findAll({
            include: [{
                model:  Store,
                as: 'Store',
                required: true
            },{model:Product,as:'Product'}],
            where:{status:'open','$Store.user_id$':requester_user.id}
        })
        const dataValues = StatusDB[0].dataValues
        
        //default value is open
        expect(dataValues.status).toEqual('open')

    })
    it("When all fields are provided correctly, it should update the status to the desired value in the field.",async()=>{
        const response =  await request(app)
            .put('/tickets/update')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({status:'completed',status_id:ticket_id,type_user:'store'})

        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        
        const StatusDB = await Tickets.findAll({
            where:{id:ticket_id}
        })
        const dataValues = StatusDB[0].dataValues
        
        
        expect(dataValues.status).toEqual('completed')

    })
    it("When all fields are provided correctly, it should update the status to the desired value in the field.",async()=>{
        //changed user token to a user with a ticket in a store
        token = jwt.sign({user_id:3},secret)
        const response =  await request(app)
            .put('/tickets/update')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({status:'cancelled',status_id:ticket_id,type_user:'user'})

        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        
        const StatusDB = await Tickets.findAll({
            where:{id:ticket_id}
        })
        const dataValues = StatusDB[0].dataValues
        
      
        expect(dataValues.status).toEqual('cancelled')

    })
    it("When sending a ticket with a requester ID different from the table, it should return an error.",async()=>{
        //"Changed the user token to a user with a ticket in a store.
        token = jwt.sign({user_id:1},secret)
        const response =  await request(app)
            .put('/tickets/update')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({status:'cancelled',status_id:ticket_id,type_user:'user'})

        expect(response.body.message).toEqual('Invalid status or user does not have tickets')
        expect(response.status).toEqual(401)
        
        const StatusDB = await Tickets.findAll({
            where:{id:ticket_id}
        })
        const dataValues = StatusDB[0].dataValues
        
      
        expect(dataValues.status).toEqual('cancelled')

    })
    it("When sending a ticket from a store that is not in the table.",async()=>{
     
        token = jwt.sign({user_id:2},secret)
        const response =  await request(app)
            .put('/tickets/update')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({status:'cancelled',status_id:2,type_user:'store'})

        expect(response.body.message).toEqual('Invalid status or store does not have tickets')
        expect(response.status).toEqual(401)
        
        const StatusDB = await Tickets.findAll({
            where:{id:ticket_id}
        })
        const dataValues = StatusDB[0].dataValues
        
      
        expect(dataValues.status).toEqual('cancelled')

    })
})