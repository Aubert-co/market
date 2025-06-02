import { isAValidString, isValidEmail } from "../Helpers";
import { ErrorMessage } from "../Helpers/ErrorMessage";
import { RegisterCredentials } from "../Model/RegisterCredentials";
import {Request,Response} from 'express'

export class RegisterUserController{
    constructor(private registerUser:RegisterCredentials){}

    public async handler(req:Request,res:Response):Promise<void>{
        try{
            if(!isAValidString(req.body.name)){
                throw new ErrorMessage("Invalid name. Please check and try again.",422);
            }
            if(!isAValidString(req.body.password)){
                throw new ErrorMessage("Invalid password. Please check and try again.",422);
            }
            if(!isValidEmail(req.body.email)){
                throw new ErrorMessage("Invalid email. Please check and try again.",422)
            }
            const { email , name , password} = req.body

            await this.registerUser.createUserAccount(email,name,password)
            res.status(201).json({ message: "User created successfully" });
        }catch(error:any){
            if (error instanceof ErrorMessage) {
                res.status(error.status).json({ message: error.message });
                return;
            } 
            
            res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
            
        }
    }
}