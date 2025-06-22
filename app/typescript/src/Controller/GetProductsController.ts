import { Response ,Request, NextFunction} from "express";
import { productService } from "../Services/ProductService";
import { checkIsAValidNumber } from "../Helpers";
import { ErrorMessage } from "../Helpers/ErrorMessage";


export class GetProducts {
    constructor(protected products:productService ){}

    public async handler(req:Request,res:Response,next:NextFunction):Promise<any>{
        let page = Number(req.params.page)
        let countProducts:number
        if( !checkIsAValidNumber(page) ){
            page = 1
        }
        const limit = 10
        try{
            countProducts = await this.products.getCountProductInCache();
           
            if ( countProducts <= 0 ) {
                const count = await this.products.countProducts();
                
                if ( count > 0) {
                    await this.products.saveCountProductsInCache(count)
                    countProducts = count;
                }
            }
            if (countProducts === 0) {
                return res.status(204).send({message: {
                    currentPage: 1,
                    totalPages: 0,
                    datas: [],
                    message: 'No products available at the moment.'
                }})
            }
          
            const totalPages = Math.ceil(countProducts/limit)
            if(page > totalPages)page = totalPages;

            
            const skip = (page -1 )* limit
            const key = `product:page:${page}`
            
            const getProductsInCache =await this.products.getProductInCache( key )
            
            if(getProductsInCache.length >0 ){
                return res.status(200).send({message:'Sucess',datas:getProductsInCache,totalPages,currentPage:page,fromCache:true})
            }
 
            const datas = await this.products.getProducts(limit,skip)
        
            res.status(200).send({message:'Sucess',datas,totalPages,currentPage:page,fromCache:false})
            if(datas.length >0)await this.products.saveProductInCache( key ,datas);
        }catch(err:any){
        
            next(err)
        }
    }
}