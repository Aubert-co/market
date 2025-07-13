import { NextFunction,Request, Response } from "express";
import { IProductService, ProductService } from "../Services/ProductService";
import { StoreService } from "../Services/StoreService";
import { checkIsAValidCategory, checkIsAValidNumber, isAValidString } from "../Helpers";
import { ErrorMessage } from "../Helpers/ErrorMessage";
import { checkIsValidImage, generateImgPath } from "../Helpers/checkIsValidImage";
import { deleteImgFromBucket, uploadFileToGCS } from "../Repository/FileUpload";
import { deleteProductProducer } from "../lib/Jobs/deleteProduct.producer";


export class ProductAdminController{
    constructor(protected products:IProductService ,protected store:StoreService){}

    public async createProduct(req:Request,res:Response,next:NextFunction){
         if (
                !req.file ||
                !checkIsValidImage({
                    fileBuffer: req.file.buffer,
                    mimeType: req.file.mimetype,
                    originalFileName: req.file.originalname,
                })
                ) {
                throw new ErrorMessage("Invalid or missing image file.",422) 
            }
        
        if(!isAValidString(req.body.name)){
            throw new ErrorMessage("Invalid name. Please check and try again.",422)
            
        }
        if(!isAValidString(req.body.description , 200)){
            throw new ErrorMessage("Invalid description. Please check and try again.",422)
        }
        if (!checkIsAValidNumber(req.body.stock)) {
            throw new ErrorMessage("Invalid or missing stock value. Must be a non-negative number.", 422);
        }

        if (!checkIsAValidNumber(req.body.price)) {
            throw new ErrorMessage("Invalid or missing price value. Must be a non-negative number.", 422);
        }
        if(!checkIsAValidCategory(req.body.category)){
            throw new ErrorMessage("Invalid category. Please check and try again.",422)
        }
        if(!checkIsAValidNumber(req.body.storeId)){
            throw new ErrorMessage('Invalid request.',400);
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

            await uploadFileToGCS(buffer,mimetype,publicUrlStorage)
            res.status(201).send({message:"Product sucessfully created."})
       }catch(err:any){
        next(err)
       }
    }
    public async DeleteProducts(req:Request,res:Response,next:NextFunction):Promise<any>{
        
     
        const {storeId,productIds} = req.body
        try{
           
            if (!Array.isArray(productIds) || productIds.length === 0) {
                throw new ErrorMessage("Invalid product IDs provided.",400)
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