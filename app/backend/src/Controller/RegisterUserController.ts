import { isAValidString, isValidEmail } from "../Helpers";
import { ErrorMessage } from "../Helpers/ErrorMessage";
import { RegisterCredentials } from "../Services/RegisterCredentials";
import {NextFunction, Request,Response} from 'express'

export class RegisterUserController{
    constructor(private registerUser:RegisterCredentials){}

    public async handler(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            if(!isAValidString(req.body.name)){
                throw new ErrorMessage("Invalid name. Please check and try again.",422);
            }
           
            const { email , name , password} = req.body

            await this.registerUser.createUserAccount(email,name,password)
            res.status(201).json({ message: "User created successfully" });
        }catch(error:any){
          next(error)
        }
    }
}