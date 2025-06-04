
import { isAValidString, isValidEmail } from "../Helpers";

import {NextFunction, Request,Response} from 'express'

import { ErrorMessage } from "../Helpers/ErrorMessage";
import { storeService } from "../Model/StoreService";
import { uploadFileToGCS } from "../Services/FileUpload";

export class StoreController{
    constructor(protected storeService:storeService){}

    public async handler(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            if(!req.file)throw new ErrorMessage("",409);
            
            if(!isAValidString(req.body.name)){
                throw new ErrorMessage("Invalid name. Please check and try again.",422);
            }
            if(!isAValidString(req.body.description , 200)){
                throw new ErrorMessage("Invalid name. Please check and try again.",422);
            }
            const existsStore = await this.storeService.existsStore(req.body.name);
            if(!existsStore)throw new ErrorMessage("A store with this name already exists.",409);

            const {name,description} = req.body
            const userId = req.user as string;
            const {buffer,originalname,mimetype} = req.file

            const photo =await uploadFileToGCS(buffer,originalname,mimetype);
            await this.storeService.createStore(name,userId,photo,description)
            res.status(201).send({message:"Store sucessfully created"})
        }catch(error:any){
            next(error)
        }
    }
}