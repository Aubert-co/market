import jwt from "jsonwebtoken";
import { isAValidString, isValidEmail } from "../Helpers";

import {Request,Response} from 'express'
import { LoginUser } from "../Model/LoginUser";
import { ErrorMessage } from "../Helpers/ErrorMessage";

const SECRET_KEY = process.env.JWT_KEY
export class LoginController{
    constructor(private login:LoginUser){}

    public async handler(req:Request,res:Response):Promise<void>{
        try{
          
            if(!isAValidString(req.body.password)){
                throw new ErrorMessage("Invalid password. Please check and try again.",422)
                
            }
            if(!isValidEmail(req.body.email)){
                throw new ErrorMessage("Invalid email. Please check and try again.",422)
            }
            const { email  , password} = req.body

            if(!SECRET_KEY)throw new ErrorMessage("Something went wrong",500)

            const userId = await this.login.login(email,password)
            const token = jwt.sign({userId},SECRET_KEY)
            res.status(201).json({ message: "Login successfully" ,token});
        }catch(error:any){
            if(error instanceof ErrorMessage){
               
                res.status(error.status).json({message:error.message})
                return 
            }
            res.status(500).json({message:'Something went wrong'})
        }
    }
}