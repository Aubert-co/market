import request from "supertest";
import app from "../../serve";

describe('Api /register',()=>{

    it("should return status 422 and an error message when required fields are invalid", async () => {
        const response = await request(app)
        .post('/register')
       
        .send({ name: '', password: 'sho', email: 'not-an-email' }); 

        expect(response.statusCode).toEqual(422);
        
        expect(response.body.message).toEqual("'Invalid name. Please check and try again.'");
    });
})