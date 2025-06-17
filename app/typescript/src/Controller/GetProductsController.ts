import { Response ,Request, NextFunction} from "express";
import { productService } from "../Services/ProductService";
import { checkIsAValidNumber } from "../Helpers";

export class GetProducts {
    constructor(protected products:productService ){}

    public async handler(req:Request,res:Response,next:NextFunction){
        let page = Number(req.query.page)
        
        if( !checkIsAValidNumber(page) ){
            page = 1
        }
        page = Number(req.query.page)
        const limit = 10
        const skip = (page -1 )* limit
        const key = `product:page:${page}`
        try{
            const getProductsInCache =await this.products.getProductInCache( key )
            
            if(getProductsInCache ){
                return res.status(200).send({message:'Sucess',datas:getProductsInCache})
            }
            const datas = await this.products.getProducts(limit,skip)
            await this.products.saveProductInCache( key ,datas)
            res.status(200).send({message:'Sucess',datas})
        }catch(err:any){
            next(err)
        }
    }
}