import { RegisterUser } from "../Model/RegisterUser";
import {Request,Response} from 'express'
export class RegisterUserController{
    constructor(private registerUser:RegisterUser){}

    public async handler(req:Request,res:Response){
        const {name,email,password} = req.body
        try{
           
            //await this.registerUser.createUserAccount(email,name,password)
            res.status(201).json({ message: "User created successfully" });
        }catch(error:any){
            res.status(400).send({error:error.message})
        }
    }
}