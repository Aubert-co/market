import { isAValidString, isValidEmail } from "../Helpers";
import { RegisterUser } from "../Model/RegisterUser";
import {Request,Response} from 'express'
export class RegisterUserController{
    constructor(private registerUser:RegisterUser){}

    public async handler(req:Request,res:Response):Promise<void>{
        try{
            if(!isAValidString(req.body.name)){
                  res.status(422).json({ 
                    message: 'Invalid name. Please check and try again.'
                });
                return;
            }
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
            //await this.registerUser.createUserAccount(email,name,password)
            res.status(201).json({ message: "User created successfully" });
        }catch(error:any){
            res.status(400).send({error:error.message})
        }
    }
}