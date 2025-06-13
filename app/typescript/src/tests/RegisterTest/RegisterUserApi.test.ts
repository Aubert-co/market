import request from "supertest";
import app from "../../serve";

import { prisma } from "../../lib/prima";

describe('Api post/register: When the name are invalid',()=>{

    it("should return status 422 and 'Invalid name...' When the name is empty.", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: '', password: 'testing1234', email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
        
        expect(response.body.message).toEqual("Invalid name. Please check and try again.");
    });
    it("should return status 422 and 'Invalid name...' When the name is shorter than 4.", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: 'a'.repeat(3), password: 'testing1234', email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid name. Please check and try again.");
    });
     it("should return status 422 and 'Invalid name...' When the name is greater than 15.", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: 'a'.repeat(16), password: 'testing1234', email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid name. Please check and try again.");
    });

})

describe("Api post/register:When the password is invalid",()=>{
  it("should return status 422 and 'Invalid password...' When the password is greater than 15.", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: 'abcde', password: 'a'.repeat(16), email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid password. Please check and try again.");
    });
     it("should return status 422 and 'Invalid password...' When the password is shorter than 4.", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: 'abcde', password: 'a'.repeat(3), email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid password. Please check and try again.");
    });
    it("should return status 422 and an 'Invalid email...' message when the password is empty.", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: 'abcde', password: '', email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid password. Please check and try again.");
    });
})

describe("API POST /register: When the email is invalid",()=>{
     it("should return status 422 and an 'Invalid email...' message when the email is empty.", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: 'abcde', password: 'abcde3e', email: '' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid email. Please check and try again.");
    });
       it("should return status 422 and an 'Invalid email...' message when the email is invalid.", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: 'abcde', password: 'abcde3e', email: 'test@gmail' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid email. Please check and try again.");
    });
})


describe("API POST /register: Database Operations with no users in the database",()=>{
    let data = {name:'lucas',password:'1234456',email:'joses@gmail.com'}
    afterAll(async()=>{
        try{
            await prisma.user.deleteMany({
                    where:{
                        id:{
                            gt:0
                        }
                    }
            })
            
        }catch(err){
            throw err
        }
    })
    it(" should return status 201 and a 'Success message' when a user tries to create a new account.",async()=>{
        const response = await request(app)
        .post('/register')
       
        .send(data); 

        expect(response.body.message).toEqual("User created successfully");
        expect(response.statusCode).toEqual(201);
    })
    
    
})

describe("API POST /register: Database Operations with  users in the database",()=>{
    let data = {name:'lucass',password:'12344568',email:'joeses@gmail.com'}
    beforeAll(async()=>{
        try{
            await prisma.user.create({data})
        }catch(err){
            throw err
        }
    })
    afterAll(async()=>{
        try{
            await prisma.user.deleteMany({
                    where:{
                        id:{
                            gt:0
                        }
                    }
            })
        }catch(err){
            throw err
        }
    })
     it("should return status 500 and an error message when the user already exists.",async()=>{
        const response = await request(app)
        .post('/register')
       
        .send(data); 
        expect(response.body.message).toEqual("User already exists");
        expect(response.statusCode).toEqual(409);
    
        
    })
    })
describe("Api post/register: When the database throws an error",()=>{
   
    it("should return an error when the database throws an error.",async()=>{
        const createSpy = jest.spyOn(prisma.user, 'create');

        createSpy.mockRejectedValueOnce(new Error('Simulated DB error: Connection lost.'));

        const response = await request(app)
        .post('/register')
       
        .send({name:'beste',password:'12345678',email:'lucas@gmail.com'}); 

        expect(response.statusCode).toEqual(409);
    
        expect(response.body.message).toEqual("Failed to create a new user");
    })
    it("should return an error when the database throws an error.",async()=>{
        const createSpy = jest.spyOn(prisma.user, 'findUnique');

        createSpy.mockRejectedValueOnce(new Error('Simulated DB error: Connection lost.'));

        const response = await request(app)
        .post('/register')
       
        .send({name:'beste',password:'12345678',email:'lucas@gmail.com'}); 

        expect(response.statusCode).toEqual(404);
    
        expect(response.body.message).toEqual("Failed to find an user");
    })
})