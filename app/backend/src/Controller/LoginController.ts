import {NextFunction, Request,Response} from 'express'
import { ErrorMessage } from "../Helpers/ErrorMessage";
import { generateAccessToken,generateRefreshToken } from "../Helpers/AuthTokens";
import { IUserService } from "../Services/UserService";
import bcrypt from 'bcrypt'
 

export class LoginController{
    constructor(private user:IUserService){}
 
    public async handler(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            const { email  , password} = req.body

            const user = await this.user.findByEmail(email)
            if(!user)return res.status(400).send({message:"Invalid email or password"});


            const hashedPassword = user.password
            const compare = await bcrypt.compare(password,hashedPassword)
            
            if(!compare)return res.status(400).send({message:"Invalid email or password"})

            const accessToken = generateAccessToken( user.id )
            const refreshToken = generateRefreshToken( user.id )
            
            res.cookie('token', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 15 * 60 * 1000, 
                path: '/'
            })
            .cookie('refresh', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000, 
                path: '/'
            });
            res.status(201).json({ message: "Login successfully" });
        }catch(error:any){
            next(error)
        }
    }
}