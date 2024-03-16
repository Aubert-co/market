const request = require('supertest');
const server = require('../serve');
const {Person} = require('../models/index')
const {Op} = require('sequelize')
const bcrypt = require("bcrypt")
require('dotenv')

var app
const personData =  {name:"matheus",password:'1234567e'}
describe("apis",()=>{
    beforeAll(async()=>{
        app =  server.listen(8082)
    })
   
    it("It should return a status of 404 when the user is not registered in the database.",async()=>{
        const response = await request(app)
        .post('/register')
        .set('Content-Type', 'application/json')
        .send({name:personData.name,password:personData.password})

        expect(response.status).toBe(201)
        expect(response.body.message).toBe('sucess')
        const findValuesAtDB = await Person.findOne({where:{name:personData.name}})
       
        expect(findValuesAtDB.name).toEqual(personData.name)
        expect(findValuesAtDB.password).not.toEqual(personData.password)

       const comparePassword  = await bcrypt.compare(personData.password,findValuesAtDB.password)
        
       expect(comparePassword).toBeTruthy()
    })
    it("Should return an error when users already exists",async()=>{
        const response = await request(app)
        .post('/register')
        .set('Content-Type', 'application/json')
        .send({name:personData.name,password:personData.name})
        
        expect(response.status).toBe(404)
    })
    it("Should return an error when name is not sent",async()=>{
        const response = await request(app)
        .post('/register')
        .set('Content-Type', 'application/json')
        .send({name:"",password:"1234"})
        
        expect(response.status).toBe(400)
       
    })
    it("Should return an error when password is not sent",async()=>{
        const name ="jose"
        const response = await request(app)
        .post('/register')
        .set('Content-Type', 'application/json')
        .send({name,password:""})
        
        expect(response.status).toBe(400)
        const datas = await Person.findOne({where:{name}})
        expect(datas).toBeNull()
    })
    it("Should return an error when name is not sent",async()=>{
        const response = await request(app)
        .post('/register')
        .set('Content-Type', 'application/json')
        .send({name:"",password:"1234"})
        
        expect(response.status).toBe(400)
       
    })
   
 afterAll(async()=>{
    await Person.destroy({ where: { id: { [Op.gt]: 1 } } });
 })
})