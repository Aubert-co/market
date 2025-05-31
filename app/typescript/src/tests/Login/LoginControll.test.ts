import request from "supertest";
import app from "../../serve";

import { prisma } from "../../lib/prima";


describe("Api post/login:When the password is invalid",()=>{
  it("Should return status 422 and 'Invalid password...' When the password is greater than 15.", async () => {
        const response = await request(app)
        .post('/login')
       
        .send({  password: 'a'.repeat(16), email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid password. Please check and try again.");
    });
     it("Should return status 422 and 'Invalid password...' When the password is shorter than 4.", async () => {
        const response = await request(app)
        .post('/login')
       
        .send({  password: 'a'.repeat(3), email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid password. Please check and try again.");
    });
    it("Should return status 422 and an 'Invalid email...' message when the password is empty.", async () => {
        const response = await request(app)
        .post('/login')
       
        .send({  password: '', email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid password. Please check and try again.");
    });
})
describe("API POST /login: When the email is invalid",()=>{
     it("Should return status 422 and an 'Invalid email...' message when the email is empty.", async () => {
        const response = await request(app)
        .post('/login')
       
        .send({  password: 'abcde3e', email: '' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid email. Please check and try again.");
    });
       it("Should return status 422 and an 'Invalid email...' message when the email is invalid.", async () => {
        const response = await request(app)
        .post('/login')
       
        .send({  password: 'abcde3e', email: 'test@gmail' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid email. Please check and try again.");
    });
})


describe("API POST /login: Database Operations",()=>{
    let data = {name:'lucas',password:'1234456',email:'jose@gmail.com'}
    
    beforeAll(async()=>{
        try{
            await prisma.user.deleteMany({
                    where:{
                        id:{
                            gt:0
                        }
                    }
            })
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
    it(" Should return status 201 and a 'Success message' when a user tries to create a new account.",async()=>{
        const response = await request(app)
        .post('/login')
       
        .send({  password: 'abcde3e', email: 'loremiptsu@gmail.com' }); 

        expect(response.body.message).toEqual("User created successfully");
          expect(response.statusCode).toEqual(201);
    })
    it("Should return status 500 and an error message when the user already exists.",async()=>{
        const response = await request(app)
        .post('/login')
       
        .send(data); 
        expect(response.body.message).toEqual("User already exists");
        expect(response.statusCode).toEqual(500);
    
        
    })
})