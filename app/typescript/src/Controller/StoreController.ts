
import { isAValidString, isValidEmail } from "../Helpers";

import {Request,Response} from 'express'

import { ErrorMessage } from "../Helpers/ErrorMessage";
import { storeService } from "../Model/StoreService";

export class StoreController{
    constructor(protected storeService:storeService){}

    public async handler(req:Request,res:Response):Promise<void>{
        try{
            if(!isAValidString(req.body.name)){
                throw new ErrorMessage("Invalid name. Please check and try again.",422);
            }
            if(!isAValidString(req.body.name , 200)){
                throw new ErrorMessage("Invalid name. Please check and try again.",422);
            }
            const existsStore = await this.storeService.existsStore(req.body.name);
            if(!existsStore)throw new ErrorMessage("A store with this name already exists.",409);

            //await this.storeService.createStore()
            res.status(201).send({message:"Store sucessfully created"})
        }catch(error:any){
            if(error instanceof ErrorMessage){
                res.status(error.status).json({message:error.message})
                return 
            }
            res.status(500).json({message:'Something went wrong'})
        }
    }
}