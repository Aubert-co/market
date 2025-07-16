import { isAValidString } from "../Helpers";

import {NextFunction, Request,Response} from 'express'
import bcrypt from 'bcrypt'
import { IUserService } from "../Services/UserService";
export class RegisterUserController{
    constructor(private user:IUserService){}

    public async handler(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            if(!isAValidString(req.body.name)){
                return res.status(422).send({message:"Invalid name. Please check and try again."});
            }
           
            const { email , name , password} = req.body
            const findUser = await this.user.findByEmail( email )
            if(findUser){
                return res.status(409).send({message:"User already exists"});
            }
            const hashedPassword =await bcrypt.hash( password ,10)
            await this.user.createUserAccount({name,email,password:hashedPassword})
            res.status(201).json({ message: "User created successfully" });
        }catch(error:any){
          next(error)
        }
    }
}