import request from "supertest";
import app from "../../serve";

describe('Api /register',()=>{

    it("When the name is empty should return status 422 and a message 'Invalid name'", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: '', password: 'testing1234', email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
        
        expect(response.body.message).toEqual("Invalid name. Please check and try again.");
    });
    it("When the name is too short should return status 422 and a message 'Invalid name'", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: 'eur', password: 'testing1234', email: 'lorem@gmail.com' }); 

        expect(response.statusCode).toEqual(422);
        
        expect(response.body.message).toEqual("Invalid name. Please check and try again.");
    });
})