import { NextFunction, Request, Response } from "express";
import { IProductService } from "../Services/ProductService";
import { checkIsAValidCategory, checkIsAValidNumber } from "../Helpers";
import { ErrorMessage } from "../Helpers/ErrorMessage";
import { dataProducts } from "../Repository/ProductRepository";
import { IProductRedisService } from "../Services/ProductRediService";

export class ProductsController{
    constructor(protected products:IProductService,protected productCache:IProductRedisService){}
    public async GetProducts(req:Request,res:Response,next:NextFunction):Promise<any>{
        let page = Number(req.params.page)
        let countProducts:number
        if( !checkIsAValidNumber(page) ){
            page = 1
        }
        const limit = 10
        try{
            countProducts = await this.productCache.getCountProductInCache();
           
            if ( countProducts <= 0 ) {
                const count = await this.products.countProducts();
                
                if ( count > 0) {
                    await this.productCache.saveCountProductsInCache(count)
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
            
            const getProductsInCache =await this.productCache.getProductInCache( key )
            
            if(getProductsInCache.length >0 ){
                return res.status(200).send({message:'Sucess',datas:getProductsInCache,totalPages,currentPage:page,fromCache:true})
            }
 
            const datas = await this.products.getProducts(limit,skip)
        
            res.status(200).send({message:'Sucess',datas,totalPages,currentPage:page,fromCache:false})
            if(datas.length >0)await this.productCache.saveProductInCache( key ,datas);
        }catch(err:any){
        
            next(err)
        }
    }
    public async GetOneProduct(req:Request,res:Response,next:NextFunction):Promise<any>{
         let category:string;
        if(!checkIsAValidNumber(req.params.id)){
            throw new ErrorMessage("Failed to retrieve products. Please try again later.", 500);
        }
        try{
            const product = await this.products.getProductById(Number(req.params.id));
            if(!product){
                return res.status(200).send({message:'Sucess',datas:[]})
            }
            category = product.category
            res.status(200).send({message:'Sucess',datas:[product]})
           
            
            
        }catch(err:any){
            next(err)
        }
            
    }
    public async GetProductsByCategory(req:Request,res:Response,next:NextFunction):Promise<any>{
        if(!checkIsAValidCategory(req.params.category)){
            throw new ErrorMessage("Invalid category. Please check and try again.",422)
        }
        const category = req.params.category
        try{
            const key = `product:category:${category}`
            const getCachedProduct = await this.productCache.getProductInCache( key );
            if(getCachedProduct.length <=0 ){
                return res.status(200).send({message:'Sucess',datas:getCachedProduct,fromCache:true})
            }
            const datas = await this.products.selectByCategory(category,10,0)
        
            res.status(200).send({message:'Sucess',datas,fromCache:false})

            if(datas.length > 0)await this.productCache.saveProductInCache(key,datas as dataProducts[]);
            
        }catch(err:any){
            next(err)
        }
    }
}