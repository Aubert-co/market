import jwt, { JwtPayload } from "jsonwebtoken";
import { isAValidString, isValidEmail } from "../Helpers";

import {NextFunction, Request,Response} from 'express'
import { LoginCredentials } from "../Services/LoginCredentials";
import { ErrorMessage } from "../Helpers/ErrorMessage";
import { generateAccessToken,generateRefreshToken } from "../Helpers/AuthTokens";

 

export class LoginController{
    constructor(private login:LoginCredentials){}
 
    public async handler(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const { email  , password} = req.body

            
 
            const id = await this.login.auth(email,password)
            const accessToken = generateAccessToken( id )
            const refreshToken = generateRefreshToken( id )
            
            res.cookie('token', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000, 
                path: '/'
            })
            .cookie('refresh', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, 
                path: '/'
            });
            res.status(201).json({ message: "Login successfully" });
        }catch(error:any){
           
            next(error)
        }
    }
}