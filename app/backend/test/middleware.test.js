const Middleware = require('../Middleware/index')
const jwt = require('jsonwebtoken')
const request = require('supertest')
const user_id = 10
const server = require('../serve')
require('dotenv').config()
const secret = process.env.SECRET_JWT
var token,app
const headers = {
    request:{
        headers:{authorization:""},
        user:""
    },
    response:{
        status:(sta)=>{
            const json = (message)=>{return { ...message ,status:sta}};
            return {json}
          }

    },
   
}
const next = jest.fn()
describe("Middleware function.",()=>{
    beforeAll(async()=>{
        token = jwt.sign({user_id},secret)
    })
    it("When an invalid authorization is sent, the middleware function Should return a status code of 401 and a message 'Token not provided'.",()=>{
        const {request,response} = headers
        const expectedValue = Middleware(request,response,next)
        
        expect(expectedValue).toHaveProperty("message")
        expect(expectedValue).toHaveProperty("status")
        expect(expectedValue.status).toBe(401)
        expect(expectedValue.message).toBe("Token not provided")
    })
    it("When an invalid token with only one part is sent, the middleware function Should return status code 401 and a message 'Invalid token format'.",()=>{
        const {request,response} = headers
        request.headers.authorization = token

        const expectedValue = Middleware(request,response,next)

        expect(expectedValue).toHaveProperty("message")
        expect(expectedValue).toHaveProperty("status")
        expect(expectedValue.status).toBe(401)
        expect(expectedValue.message).toBe("Invalid token format")
    })
    it("When a token is sent without the Bearer prefix, the middleware function Should return a 401 status code and the message 'Invalid token format'.",()=>{
        const {request,response} = headers
        request.headers.authorization = token

        const expectedValue = Middleware(request,response,next)

        expect(expectedValue).toHaveProperty("message")
        expect(expectedValue).toHaveProperty("status")
        expect(expectedValue.status).toBe(401)
        expect(expectedValue.message).toBe("Invalid token format")
    })
   
    it("When an invalid token is sent, the middleware function Should return a status code of 401 and a message of 'Invalid token'.",()=>{
        const {request,response} = headers
        request.headers.authorization = `Bearer ${token+"E"}`

        const expectedValue = Middleware(request,response,next)

        expect(expectedValue).toHaveProperty("message")
        expect(expectedValue).toHaveProperty("status")
        expect(expectedValue.status).toBe(401)
        expect(expectedValue.message).toBe("Invalid token")
    })
      
    it("When a valid token with the 'Bearer' prefix is provided, the middleware function Should call the 'next()' function and continue to the next middleware in the chain.",()=>{
        const {request,response} = headers
        request.headers.authorization = `Bearer ${token}`

        const expectedValue = Middleware(request,response,next)
        
        expect(request.user.user_id).toBe(user_id)
        expect(next).toHaveBeenCalled()
    })

})

describe("Routes that use middleware should return the first error in the middleware when a token is not sent.",()=>{
    beforeAll(async()=>{
        app =  server.listen(8090)
       
    })
   
   
    it("Route GET/cart/items Should return an error with status code 401 and a message 'Token not provided' when no token is provided.",async()=>{
        const response = await request(app)
        .get(`/cart/items`)
        expect(response.body.message).not.toBe('sucess')
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('datas')
        expect(response.body.message).toBe('Token not provided')
        expect(response.status).toBe(401)  
    })
    it("Route POST/cart Should return an error with status code 401 and a message 'Token not provided' when no token is provided in the request header.",async()=>{
        const response = await request(app)
        .post(`/cart/create`)
        expect(response.body.message).not.toBe('sucess')
        expect(response.status).not.toBe(201)
      
        expect(response.body.message).toBe('Token not provided')
        expect(response.status).toBe(401)  
    })
    it("Route DELETE/cart Should return an error with status code 401 and message 'Token not provided' when no token is provided.",async()=>{
        const response = await request(app)
        .delete(`/cart/delete`)
        expect(response.body.message).not.toBe('sucess')
        expect(response.status).not.toBe(201)
      
        expect(response.body.message).toBe('Token not provided')
        expect(response.status).toBe(401)  
    })
    it("Route PUT/cart Should return an error with status code 401 and message 'Token not provided' when no token is provided.",async()=>{
        const response = await request(app)
        .put(`/cart/edit`)
        expect(response.body.message).not.toBe('sucess')
        expect(response.status).not.toBe(201)
      
        expect(response.body.message).toBe('Token not provided')
        expect(response.status).toBe(401)  
    })
    it("Route GET/store/admin Should return an error with status code 401 and message 'Token not provided' when no token is provided.",async()=>{
        const response = await request(app)
        .get(`/store/admin`)
        expect(response.body.message).not.toBe('sucess')
        expect(response.status).not.toBe(201)
      
        expect(response.body.message).toBe('Token not provided')
        expect(response.status).toBe(401)  
    })
    it("Route POST/store/create Should return an error with status code 401 and message 'Token not provided' when no token is provided.",async()=>{
        const response = await request(app)
        .post(`/store/create`)
        expect(response.body.message).not.toBe('sucess')
        expect(response.status).not.toBe(201)
      
        expect(response.body.message).toBe('Token not provided')
        expect(response.status).toBe(401)  
    })
    it("Route PUT/store/edit Should return an error with status code 401 and message 'Token not provided' when no token is provided.",async()=>{
        const response = await request(app)
        .put(`/store/edit`)
        expect(response.body.message).not.toBe('sucess')
        expect(response.status).not.toBe(201)
      
        expect(response.body.message).toBe('Token not provided')
        expect(response.status).toBe(401)  
    })
    it("Route POST/store/product/create Should return an error with status code 401 and message 'Token not provided' when no token is provided.",async()=>{
        const response = await request(app)
        .post(`/store/product/create`)
        expect(response.body.message).not.toBe('sucess')
        expect(response.status).not.toBe(201)
      
        expect(response.body.message).toBe('Token not provided')
        expect(response.status).toBe(401)  
    })
    it("Route POST/store/product/edit Should return an error with status code 401 and message 'Token not provided' when no token is provided.",async()=>{
        const response = await request(app)
        .put(`/store/product/edit`)
        expect(response.body.message).not.toBe('sucess')
        expect(response.status).not.toBe(201)
      
        expect(response.body.message).toBe('Token not provided')
        expect(response.status).toBe(401)  
    })
    it("Route DELETE/store/product/delete Should return an error with status code 401 and message 'Token not provided' when no token is provided.",async()=>{
        const response = await request(app)
        .delete(`/store/product/delete`)
        expect(response.body.message).not.toBe('sucess')
        expect(response.status).not.toBe(201)
      
        expect(response.body.message).toBe('Token not provided')
        expect(response.status).toBe(401)  
    })
})


describe("Routes that do not use middleware should return the first error encountered in the route, without executing subsequent middleware functions or route handlers.",()=>{
    it("route POST/login Should return an error message 'Missing fields' if one or more required fields are not provided.",async()=>{
        const response = await request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
    
        expect(response.body.message).toBe('Missing fields')
        expect(response.status).toBe(400)
        expect(response.body.message).not.toBe('Token not provided')
        expect(response.status).not.toBe(401)
    })
    it("route POST/register Should return an error message 'Missing fields' if one or more required fields are not provided.",async()=>{
        const response = await request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
    
        expect(response.body.message).toBe('Missing fields')
        expect(response.status).toBe(400)
        expect(response.body.message).not.toBe('Token not provided')
        expect(response.status).not.toBe(401)  
    })
    it("route GET/products  Should return a sucess message",async()=>{
      
        const response = await request(app)
        .get(`/products/`)
        expect(response.body.message).toBe('sucess')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')
        expect(response.body.message).not.toBe('Token not provided')
        expect(response.status).not.toBe(401)  
    })
    it("route POST/products/search Should return a sucess message",async()=>{
    
        const response = await request(app)
        .post(`/products/search`)
        expect(response.body.message).toBe('Sucess')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('datas')
        expect(response.body.message).not.toBe('Token not provided')
        expect(response.status).not.toBe(401)  
    })
})