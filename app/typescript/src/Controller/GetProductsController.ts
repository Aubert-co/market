import { Response ,Request, NextFunction} from "express";
import { productService } from "../Services/ProductService";
import { checkIsAValidNumber } from "../Helpers";


export class GetProducts {
    constructor(protected products:productService ){}

    public async handler(req:Request,res:Response,next:NextFunction):Promise<any>{
        let page = Number(req.query.page)
        
        if( !checkIsAValidNumber(page) ){
            page = 1
        }
        page = Number(req.query.page)
        const limit = 10
        const skip = (page -1 )* limit
        const key = `product:page:${page}`
        try{
            const countProducts = await this.products.countProducts()
            
            const getProductsInCache =await this.products.getProductInCache( key )
            const totalPages = Math.ceil(countProducts/limit)
            if(getProductsInCache ){
                return res.status(200).send({message:'Sucess',datas:getProductsInCache,totalPages,currentPage:page})
            }
            const datas = await this.products.getProducts(limit,skip)
            
            res.status(200).send({message:'Sucess',datas,totalPages,currentPage:page})
            if(datas.length >0)await this.products.saveProductInCache( key ,datas);
        }catch(err:any){
            next(err)
        }
    }
}