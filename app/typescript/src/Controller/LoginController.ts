import jwt, { JwtPayload } from "jsonwebtoken";
import { isAValidString, isValidEmail } from "../Helpers";

import {NextFunction, Request,Response} from 'express'
import { LoginCredentials } from "../Model/LoginCredentials";
import { ErrorMessage } from "../Helpers/ErrorMessage";

 
const SECRET_KEY = process.env.JWT_KEY
export class LoginController{
    constructor(private login:LoginCredentials){}
 
    public async handler(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const { email  , password} = req.body

            if(!SECRET_KEY)throw new ErrorMessage("Something went wrong",500);
 
            const id = await this.login.auth(email,password)
            const token = jwt.sign({id},SECRET_KEY) 

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000, 
                path: '/', 
            });
            res.status(201).json({ message: "Login successfully" ,token});
        }catch(error:any){
            next(error)
        }
    }
}