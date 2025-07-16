import { NextFunction,Request, Response } from "express";
import { IProductService, ProductService } from "../Services/ProductService";
import { StoreService } from "../Services/StoreService";
import { checkIsAValidCategory, checkIsAValidNumber, isAValidString } from "../Helpers";
import { ErrorMessage } from "../Helpers/ErrorMessage";
import { checkIsValidImage, generateImgPath } from "../Helpers/checkIsValidImage";
import {  uploadFileToGCS } from "../Repository/FileUpload";
import { deleteProductProducer } from "../lib/Jobs/deleteProduct.producer";


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
        const publicUrlStorage = generateImgPath(originalname)
        const {name,description,price,stock,storeId,category} = req.body
       try{
            
            await this.products.createProduct({category,
                name,
                description,
                price:Number(price),
                stock:Number(stock),
                storeId:Number(storeId),
                imageUrl:publicUrlStorage
            })

            await uploadFileToGCS(buffer,publicUrlStorage,mimetype)
            res.status(201).send({message:"Product sucessfully created."})
       }catch(err:any){
            next(err)
       }
    }
    public async DeleteProducts(req:Request,res:Response,next:NextFunction):Promise<any>{
       
        const {storeId,productIds} = req.body
        try{
          
            if (!Array.isArray(productIds) || productIds.length === 0) {
                return res.status(400).send({message:"Invalid product IDs provided."})
            }
            await Promise.all(
                productIds.map(async(id)=>{
                    let productId = Number(id)
                    if(checkIsAValidNumber(id)){
                        await deleteProductProducer(productId,Number(storeId))
                    }
                   
                })
            )
        
            res.status(202).send({ message: 'Delete scheduled.' });

        }catch(err:any){
            next(err)
        }
    }
    
}