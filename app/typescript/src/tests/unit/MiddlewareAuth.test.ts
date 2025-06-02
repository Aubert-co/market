import { Auth } from "../../Middleware/Auth";
import { Request, Response, NextFunction } from 'express';
import jwt,{JwtPayload} from 'jsonwebtoken'
const SECRET_JWT = process.env.JWT_KEY
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
    it("Should return an error message and status 401 when authorization is not sent.",()=>{
        request.headers ={authorization:""}
        const auth = new Auth
 
        auth.handler(request as Request ,response as Response,next as NextFunction)
          
        expect(response.status).toHaveBeenCalledTimes(1)
        expect(response.status).toHaveBeenCalledWith(401)
        expect(response.json).toHaveBeenCalledWith({message:"Access Denied"})
        expect(next).not.toHaveBeenCalled()
    })
     it("Should return an error for an authorization header without a token.",()=>{
        request.headers ={authorization:"Bearer"}
        const auth = new Auth

        auth.handler(request as Request ,response as Response,next as NextFunction)
       
        
        expect(response.status).toHaveBeenCalledTimes(1)
        expect(response.status).toHaveBeenCalledWith(401)
        expect(response.json).toHaveBeenCalledWith({message:"Invalid token format"})
          expect(next).not.toHaveBeenCalled()
    })
     it("Should return an error for a token missing 'Bearer' prefix",()=>{
        
        request.headers ={authorization:`${token}`}
        const auth = new Auth

        auth.handler(request as Request ,response as Response,next as NextFunction)
       
        
        expect(response.status).toHaveBeenCalledTimes(1)
        expect(response.status).toHaveBeenCalledWith(401)
        expect(response.json).toHaveBeenCalledWith({message:"Invalid token format"})
        expect(next).not.toHaveBeenCalled()
    })
     it("Should call next when authorization is valid.",()=>{
        
        request.headers ={authorization:`Bearer ${token}`}
        const auth = new Auth

        auth.handler(request as Request ,response as Response,next as NextFunction)
       
        
        expect(response.status).toHaveBeenCalledTimes(0)
        expect(request.user).toEqual(id)
        expect(response.json).toHaveBeenCalledTimes(0)
        expect(next).toHaveBeenCalledTimes(1)
    })
    it("Should return an error when the token and secret do not match.",()=>{
        const dontMatchToken = jwt.sign({id},"loremip1112")
        request.headers ={authorization:`Bearer ${dontMatchToken}`}
        const auth = new Auth

        auth.handler(request as Request ,response as Response,next as NextFunction)
       
        
        expect(response.status).toHaveBeenCalledTimes(1)
   
        expect(response.json).toHaveBeenCalledWith({message:"Invalid token"})
        expect(next).toHaveBeenCalledTimes(0)
    })
}) 