import jwt from "jsonwebtoken";
import { isAValidString, isValidEmail } from "../Helpers";

import {Request,Response} from 'express'
import { LoginUser } from "../Model/LoginUser";

const SECRET_KEY = process.env.JWT_KEY
export class LoginController{
    constructor(private login:LoginUser){}

    public async handler(req:Request,res:Response):Promise<void>{
        try{
          
            if(!isAValidString(req.body.password)){
                  res.status(422).json({ 
                    message: 'Invalid password. Please check and try again.'
                });
                return; 
            }
            if(!isValidEmail(req.body.email)){
                res.status(422).json({ 
                    message: 'Invalid email. Please check and try again.'
                });
                return; 
            }
            const { email  , password} = req.body

            if(!SECRET_KEY)throw new Error("Something went wrong.")

            const userId = await this.login.login(email,password)
            const token = jwt.sign({userId},SECRET_KEY)
            res.status(201).json({ message: "Login successfully" ,token});
        }catch(error:any){
            const message = error.message || "Something went wrong."
            res.status(500).send({message})
        }
    }
}