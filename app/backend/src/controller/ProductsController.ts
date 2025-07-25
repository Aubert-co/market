import { NextFunction, Request, Response } from "express";
import { IProductService } from "../services/ProductService";
import { checkIsAValidCategory, checkIsAValidNumber } from "../helpers";
import { Product } from "../types/product";
import { IProductRedisService } from "../services/ProductRediService";


export class ProductsController{
    constructor(protected products:IProductService,protected productCache:IProductRedisService){}
    public async GetProducts(req:Request,res:Response,next:NextFunction):Promise<any>{
        let page = Number(req.params?.page)
       
        if( !checkIsAValidNumber(page) ){
            page = 1
        }
        try{
            const {datas,currentPage,fromCache,totalPages} = await this.products.getProducts(page)
        
            res.status(200).send({message:'Sucess',datas,totalPages,currentPage,fromCache})
            
        }catch(err:any){
            next(err)
        }
    } 
    public async GetOneProduct(req:Request,res:Response,next:NextFunction):Promise<any>{
        const id = req.params?.id
        if(!checkIsAValidNumber(id)){
            return res.status(500).send({message:"Failed to retrieve products. Please try again later."});
        }
        try{
            const datas = await this.products.getProductById(Number(id));
           
            res.status(200).send({message:'Sucess',datas})
        }catch(err:any){
            next(err)
        }
            
    }
    public async GetProductsByCategory(req:Request,res:Response,next:NextFunction):Promise<any>{
         const category = req.params?.category
        if(!checkIsAValidCategory(category)){
            return res.status(422).send({message:"Invalid category. Please check and try again."})
        }
       
        try{
            const key = `product:category:${category}`
            const getCachedProduct = await this.productCache.getProductInCache( key );
            if(getCachedProduct.length <=0 ){
                return res.status(200).send({message:'Sucess',datas:getCachedProduct,fromCache:true})
            }
            const datas = await this.products.selectByCategory(category,10,0)
        
            res.status(200).send({message:'Sucess',datas,fromCache:false})

            if(datas.length > 0)await this.productCache.saveProductInCache(key,datas as Product[]);
            
        }catch(err:any){
            next(err)
        }
    }
}