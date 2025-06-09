import request from "supertest";
import app from "../../serve";
import bcrypt from "bcrypt"
import { prisma } from "../../lib/prima";


describe("Api post/login:When the password is invalid",()=>{
  it("should return status 422 and 'Invalid password...' When the password is greater than 15.", async () => {
        const response = await request(app)
        .post('/login')
       
        .send({  password: 'a'.repeat(16), email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid password. Please check and try again.");
    });
     it("should return status 422 and 'Invalid password...' When the password is shorter than 4.", async () => {
        const response = await request(app)
        .post('/login')
       
        .send({  password: 'a'.repeat(3), email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid password. Please check and try again.");
    });
    it("should return status 422 and an 'Invalid email...' message when the password is empty.", async () => {
        const response = await request(app)
        .post('/login')
       
        .send({  password: '', email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid password. Please check and try again.");
    });
})
describe("API POST /login: When the email is invalid",()=>{
     it("should return status 422 and an 'Invalid email...' message when the email is empty.", async () => {
        const response = await request(app)
        .post('/login')
       
        .send({  password: 'abcde3e', email: '' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid email. Please check and try again.");
    });
       it("should return status 422 and an 'Invalid email...' message when the email is invalid.", async () => {
        const response = await request(app)
        .post('/login')
       
        .send({  password: 'abcde3e', email: 'test@gmail' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid email. Please check and try again.");
    });
})


describe("API POST /login: Database Operations",()=>{
    let data = {name:'lucas',password:'12345678',email:'jose@gmail.com'}
    let password = '12345678'
    beforeAll(async()=>{
        const hash = await bcrypt.hash(data.password,10)
        data.password = hash
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
    it(" should return status 201 and a 'Success message' when a user tries to login with valid datas.",async()=>{
        const response = await request(app)
        .post('/login')
       
        .send( {email:data.email,password} ); 

        expect(response.body.message).toEqual("Login successfully");
        expect(response.statusCode).toEqual(201);
    })
    it(" should return status 401 and a 'Error message' when a user try to log with email not registred.",async()=>{
        const response = await request(app)
        .post('/login')
       
        .send( {email:'test1231@gmail.com',password} ); 

        expect(response.body.message).toEqual("User not found");
        expect(response.statusCode).toEqual(401); 
    })
    it("should return status 401 and '' when the user exists but the password dont match",async()=>{
        const response = await request(app)
        .post('/login')
        
        .send( {email:data.email,password:'1lorem2'} ); 
        expect(response.body.message).toEqual("Invalid credentials");
        expect(response.statusCode).toEqual(401);
    
        
    })
    describe("",()=>{
        beforeEach(async ()=>{
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
     it("should return status 401 and the message 'User not found' if the user does not exist in the database during login.",async()=>{
        const response = await request(app)
        .post('/login')
       
        .send( {email:data.email,password} ); 

        expect(response.body.message).toEqual("User not found");
        expect(response.statusCode).toEqual(401);
    })
    })
})

describe("Api post/register: When the database throws an error",()=>{
   
   
    it("should return an error when the database throws an error.",async()=>{
        const createSpy = jest.spyOn(prisma.user, 'findUnique');

        createSpy.mockRejectedValueOnce(new Error('Simulated DB error: Connection lost.'));

        const response = await request(app)
        .post('/login')
       
        .send({password:'12345678',email:'lucas@gmail.com'}); 

        expect(response.statusCode).toEqual(404);
    
        expect(response.body.message).toEqual("Failed to find an user");
    })
})