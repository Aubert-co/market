import { NextFunction,Response,Request } from "express";
import { productService } from "../Services/ProductService";
import { checkIsAValidCategory } from "../Helpers";
import { ErrorMessage } from "../Helpers/ErrorMessage";
import { dataProducts } from "../Repository/ProductRepository";

export class GetProductByCategory{
    constructor(protected products:productService){}
    public async handler(req:Request,res:Response,next:NextFunction):Promise<any>{
        if(!checkIsAValidCategory(req.body.category)){
            throw new ErrorMessage("Invalid category. Please check and try again.",422)
        }
        const category = req.body.category
        try{
            const key = `product:category:${category}`
            const getCachedProduct = await this.products.getProductInCache( key );
            if(getCachedProduct){
                return res.status(200).send({message:'Sucess',datas:getCachedProduct})
            }
            const datas = await this.products.selectByCategory(category,10,0)
           
            await this.products.saveProductInCache(key,datas as dataProducts[]);
            
            
            res.status(200).send({message:'Sucess',datas})

        }catch(err:any){
            next(err)
        }
    }
}