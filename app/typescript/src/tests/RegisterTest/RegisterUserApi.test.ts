import request from "supertest";
import app from "../../serve";

describe('Api post/register when the name are invalid',()=>{

    it("When the name is empty should return status 422 and a message 'Invalid name'", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: '', password: 'testing1234', email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
        
        expect(response.body.message).toEqual("Invalid name. Please check and try again.");
    });
    it("When the name is shorter than 4 characters should return status 422 and an 'Invalid name' message", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: 'abc', password: 'testing1234', email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid name. Please check and try again.");
    });
     it("When the name is greater than 15 characters should return status 422 and an 'Invalid name' message", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: 'abcdefghijklmnop', password: 'testing1234', email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid name. Please check and try again.");
    });

})

describe("Api post/register When the password is invalid",()=>{
  it("When the password is greater than 15 characters should return status 422 and an 'Invalid password...' message", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: 'abcde', password: 'abcdefghijklmnop', email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid password. Please check and try again.");
    });
     it("When the password is shorter than 4 characters should return status 422 and an 'Invalid password...' message", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: 'abcde', password: 'abc', email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid password. Please check and try again.");
    });
    it("When the password is shorter than 4 characters should return status 422 and an 'Invalid password...' message", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: 'abcde', password: '', email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
    
        expect(response.body.message).toEqual("Invalid password. Please check and try again.");
    });
})