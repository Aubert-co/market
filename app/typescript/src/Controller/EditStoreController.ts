
import { isAValidString } from "../Helpers";

import {NextFunction, Request,Response} from 'express'

import { ErrorMessage } from "../Helpers/ErrorMessage";
import { storeService } from "../Model/StoreService";
import { uploadFileToGCS } from "../Services/FileUpload";
import { checkIsValidImage,generateImgPath } from "../Helpers/checkIsValidImage";

export class StoreController{
    constructor(protected storeService:storeService){}

    public async handler(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            if (req.file && !checkIsValidImage({
                    fileBuffer: req.file.buffer,
                    mimeType: req.file.mimetype,
                    originalFileName: req.file.originalname,
                }) ) {
                const {buffer,originalname,mimetype} = req.file
                const publicUrlStorage = generateImgPath(originalname)
            }

            if(!isAValidString(req.body.name)){
                throw new ErrorMessage("Invalid name. Please check and try again.",422);
            }
            if(!isAValidString(req.body.description , 200)){
                throw new ErrorMessage("Invalid name. Please check and try again.",422);
            }
            const existsStore = await this.storeService.existsStore(req.body.name);
            if(existsStore)throw new ErrorMessage("A store with this name already exists.",409);

            const {name,description} = req.body
            const userId = req.user as string;
           
           
            /*await Promise.all([
                this.storeService.createStore(name,userId,publicUrlStorage,description),
                uploadFileToGCS(buffer,originalname,mimetype)
            ])*/
            res.status(201).send({message:"Store sucessfully created"})
        }catch(error:any){
            next(error)
        }
    }
}