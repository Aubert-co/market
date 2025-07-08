
import { isAValidString } from "../Helpers";

import {NextFunction, Request,Response} from 'express'

import { ErrorMessage } from "../Helpers/ErrorMessage";
import { storeService } from "../Services/StoreService";
import { uploadFileToGCS } from "../Repository/FileUpload";
import { checkIsValidImage,generateImgPath } from "../Helpers/checkIsValidImage";

export class StoreController{
    constructor(protected storeService:storeService){}

    public async handler(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            if (!req.file ){
                throw new ErrorMessage("Invalid or missing image file.", 422);
            }

        
            const {name,description} = req.body
            const userId = req.user;
            const {buffer,originalname,mimetype} = req.file
            const publicUrlStorage = generateImgPath(originalname)
            
            const existsStoreName = await this.storeService.findByName( name )
            if(existsStoreName)throw new ErrorMessage("A store with this name already exists.",409);

            await this.storeService.createStore(name,userId,publicUrlStorage,description)
            await uploadFileToGCS(buffer,publicUrlStorage,mimetype)
            res.status(201).send({message:"Store sucessfully created"})
        }catch(error:any){
            next(error)
        }
    }
}  