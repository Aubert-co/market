import { Auth } from "../../Middleware/Auth";
import { Request, Response, NextFunction } from 'express';
import jwt,{JwtPayload} from 'jsonwebtoken'

const SECRET_JWT = process.env.ACCESS_TOKEN
describe("Auth",()=>{
    let request:Partial<Request>
    let response:Partial<Response>
    let next:Partial<NextFunction>
    let token:string
    let id = 101
    beforeEach(()=>{
        if(!SECRET_JWT)throw new Error("missing secret_jwt")
        token = jwt.sign({id},SECRET_JWT);
        request = {
            headers: {},
            body: {},
            params: {},
            query: {},
            user: undefined
        } 

        response = {
       
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
    
        };
        next = jest.fn();
    })
    it("should return an error message and status 401 when authorization is not sent.",()=>{
        request.cookies ={token:""}
        
 
        Auth(request as Request ,response as Response,next as NextFunction)
          
        expect(response.status).toHaveBeenCalledTimes(1)
        expect(response.status).toHaveBeenCalledWith(401)
        expect(response.json).toHaveBeenCalledWith({message:"Access Denied"})
        expect(next).not.toHaveBeenCalled()
    })
     it("should return an error for an authorization header without a token.",()=>{
        request.cookies ={token:"invalid"}
         

        Auth(request as Request ,response as Response,next as NextFunction)
       
        
        expect(response.status).toHaveBeenCalledTimes(1)
        expect(response.status).toHaveBeenCalledWith(400)
        expect(response.json).toHaveBeenCalledWith({message:"Invalid token"})
          expect(next).not.toHaveBeenCalled()
    })
     it("should return an error for a token missing 'Bearer' prefix",()=>{
        
        request.cookies ={}
        

        Auth(request as Request ,response as Response,next as NextFunction)
       
        
        expect(response.status).toHaveBeenCalledTimes(1)
        expect(response.status).toHaveBeenCalledWith(401)
        expect(response.json).toHaveBeenCalledWith({message:"Access Denied"})
        expect(next).not.toHaveBeenCalled()
    })
     it("should call next when authorization is valid.",()=>{
        
        request.cookies = {token}
        

        Auth(request as Request ,response as Response,next as NextFunction)
       
        
        expect(response.status).toHaveBeenCalledTimes(0)
        expect(request.user).toEqual(id)
        expect(response.json).toHaveBeenCalledTimes(0)
        expect(next).toHaveBeenCalledTimes(1)
    })
    it("should return an error when the token and secret do not match.",()=>{
        const dontMatchToken = jwt.sign({id},"loremip1112")
       
        request.cookies = {token:dontMatchToken}

        Auth(request as Request ,response as Response,next as NextFunction)
       
        
        expect(response.status).toHaveBeenCalledTimes(1)
   
        expect(response.json).toHaveBeenCalledWith({message:"Invalid token"})
        expect(next).toHaveBeenCalledTimes(0)
    })
}) 