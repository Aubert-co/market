import { NextFunction,Request, Response } from "express";
import { IProductService } from "../Services/ProductService";
import { StoreService } from "../Services/StoreService";
import { checkIsAValidCategory, checkIsAValidNumber, isAValidString } from "../Helpers";

import { checkIsValidImage } from "../Helpers/checkIsValidImage";



export class ProductAdminController{
    constructor(protected products:IProductService ,protected store:StoreService){}

    public async createProduct(req:Request,res:Response,next:NextFunction):Promise<any>{
         if (
                !req.file ||
                !checkIsValidImage({
                    fileBuffer: req.file.buffer,
                    mimeType: req.file.mimetype,
                    originalFileName: req.file.originalname,
                })
                ) {
                return res.status(422).send({message:"Invalid or missing image file."}) 
            }
        
        if(!isAValidString(req.body.name)){
            return res.status(422).send({message:"Invalid name. Please check and try again."})
            
        }
        if(!isAValidString(req.body.description , 200)){
            return res.status(422).send({message:"Invalid description. Please check and try again."})
        }
        if (!checkIsAValidNumber(req.body.stock)) {
            return res.status(422).send({message:"Invalid or missing stock value. Must be a non-negative number."});
        }

        if (!checkIsAValidNumber(req.body.price)) {
            return res.status(422).send({message:"Invalid or missing price value. Must be a non-negative number."});
        }
        if(!checkIsAValidCategory(req.body.category)){
            return res.status(422).send({message:"Invalid category. Please check and try again."})
        }
        if(!checkIsAValidNumber(req.body.storeId)){
            return res.status(400).send({message:'Invalid request.'});
        }
       
        const {buffer,originalname,mimetype} = req.file
       
        const {name,description,price,stock,storeId,category} = req.body
       try{
            
            await this.products.createProduct({category,
                name,
                description,
                price:Number(price),
                stock:Number(stock),
                storeId:Number(storeId),
                fileBuffer:buffer,
                originalName:originalname,
                mimeType:mimetype,
            })

          
            res.status(201).send({message:"Product sucessfully created."})
       }catch(err:any){
            next(err)
       }
    }
    public async DeleteProducts(req:Request,res:Response,next:NextFunction):Promise<any>{
       
        const {storeId,productIds} = req.body
        try{
          
            await this.products.deleteProduct(productIds,Number(storeId))
        
            res.status(202).send({ message: 'Delete scheduled.' });

        }catch(err:any){
            next(err)
        }
    }
    
}