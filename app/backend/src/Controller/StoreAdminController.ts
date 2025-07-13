import { NextFunction, Response,Request } from "express";
import { IProductService } from "../Services/ProductService";
import { StoreService } from "../Services/StoreService";
import { checkIsAValidNumber } from "../Helpers";
import { ErrorMessage } from "../Helpers/ErrorMessage";
import { generateImgPath } from "../Helpers/checkIsValidImage";
import { uploadFileToGCS } from "../Repository/FileUpload";

export class StoreAdminController{
    constructor(protected storeService:StoreService,protected product:IProductService){}
    public async GetUserStores(req:Request,res:Response,next:NextFunction){
         try{
            const userId = req.user
            const stores = await this.storeService.selectUserStores(userId)
            
            res.status(200).send({message:'Sucess',datas:stores})
        }catch(err:any){
            next(err)
        }
    }
    public async GetProductFromStore(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            let page = Number(req.body.page)
            let storeId =  Number(req.body.storeId)

            if( !checkIsAValidNumber(page) ){
                page = 1
            }
            if( !checkIsAValidNumber(storeId)){
                throw new ErrorMessage("",409)
            }
            const limit = 10
            const skip = 0 
            const countProducts = await this.product.countProductStore(storeId);
            if(countProducts === 0)return res.status(200).send({message:'Sucess',datas:[]});
            
            const datas = await this.product.getProductsByStoreId(storeId,limit,skip)

            res.status(200).send({message:'Sucess',datas,totalPages:countProducts})
        }catch(error:any){
            next(error)
        }
    }
    public async CreateStore(req:Request,res:Response,next:NextFunction):Promise<any>{
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