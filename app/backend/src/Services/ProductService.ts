import { checkIsAValidNumber } from "../Helpers";
import { generateImgPath } from "../Helpers/checkIsValidImage";
import { ErrorMessage } from "../Helpers/ErrorMessage";
import { deleteProductProducer } from "../Lib/Jobs/deleteProduct.producer";
import { uploadFileToGCS } from "../Lib/FileUpload";
import { IProductRedisRepository } from "../Repository/ProductRedisRepository";
import {  IProductRepository, ProductRepository,GetProductById } from "../Repository/ProductRepository";
import { Product, SelectedProduct } from "../types/product";
import { IProductRedisService } from "./ProductRediService";

export interface IProductService{
    createProduct( {category, name, description,
        storeId, price, 
        stock ,fileBuffer,originalName ,mimeType }:CreateProduct
    ): Promise<void>
    selectByCategory(category:string,limit:number,skip:number ):Promise<Product[]>,
    getProducts(page:number):Promise<GetProducts>,
    getProductById(id:number):Promise< GetProductById>,
    countProducts():Promise<number>,
    countProductStore(storeId:number):Promise<number>,
    getProductsByStoreId(storeId:number,page:number):Promise<GetProductByStore>,
    deleteProduct(productIds:any,storeId:number):Promise<void>
}
type GetProductByStore ={
    datas:Product[],
    currentPage:number,
    totalPages:number
}
type CreateProduct = {
    category:string,
    name:string,
    description:string,
    storeId:number,
    price:number,
    stock:number,
    mimeType:string,
    fileBuffer:Buffer,
    originalName:string
}
type GetProducts = {
    datas:SelectedProduct[],
    currentPage:number,
    totalPages:number,
    fromCache:boolean
}
export class ProductService  implements IProductService{
    constructor(protected product:IProductRepository,protected redis:IProductRedisService){}

    public async createProduct( {category, name, description,
        storeId, price, 
        stock ,fileBuffer,originalName ,mimeType }:CreateProduct
    ): Promise<void> {
        const imageUrl = generateImgPath(originalName)
        
        await this.product.createProduct({
            description,name,stock,storeId,category,
            price,imageUrl
        })
        await uploadFileToGCS({
            fileBuffer,
            mimeType,
            urlPath:imageUrl
        })
    }
    public async selectByCategory( category:string,limit:number,skip:number ):Promise<Product[]>{
        try{
            return await this.product.selectByCategory(category,limit,skip) ;
        }catch(err:any){
            throw new ErrorMessage("Failed to retrieve products. Please try again later.", 500);
        } 
    }
   
    public async getProducts( page:number):Promise<GetProducts>{
        const limit = 10
        let countProducts = await this.redis.getCountProductInCache()
        if ( countProducts <= 0 ) {
            const count = await this.product.countProducts()
            
            if ( count > 0) {
                await this.redis.saveCountProductsInCache(count)
                countProducts = count;
            }
        }
        if (countProducts === 0) {
            throw new ErrorMessage("No products available at the moment.",204)
        }
        const totalPages = Math.ceil(countProducts/limit)
        if(page > totalPages)page = totalPages;

        
        const skip = (page -1 )* limit
        const key = `product:page:${page}`

        const getProductsInCache =await this.redis.getProductInCache( key )

         if(getProductsInCache.length >0 ){
            return {
                datas:getProductsInCache,
                totalPages,currentPage:page,fromCache:true
            }
        }
 
        const datas = await this.product.getProducts(limit,skip)
        if(datas.length >0)await this.redis.saveProductInCache( key ,datas)

        return{
            datas,totalPages,currentPage:page,fromCache:false
        }
    }
    public async getProductById(id:number):Promise<GetProductById>{
        try{
            const datas = await this.product.getProductById(id);
            
            return datas
        }catch(err:any){
            throw new ErrorMessage("Failed to retrieve products. Please try again later.", 500);
        }
    }
   
   
    public async countProducts():Promise<number>{
        try {
            const count =  await this.product.countProducts();
            if(count)return Number(count);

            return 0;
        } catch (err: any) {
            throw new ErrorMessage("Failed to count products in the database", 500);
        }

    }
   
 
    public async getProductsByStoreId(storeId:number,page:number):Promise<GetProductByStore>{
        const limit = 10
        
        const countProducts = await this.product.countProductStore(storeId);
        if(countProducts  ===0){
            return {
                datas:[],
                totalPages:0,
                currentPage:0
            }
        }
        const totalPages = Math.ceil(countProducts/limit)
        
        if(page >totalPages) page = totalPages;
        
        const skip = (page -1 )* limit
        const datas = await this.product.getProductsByStoreId(storeId,skip,limit)
        return {
            datas,
            totalPages,
            currentPage:page
        }
    }
    public async countProductStore(storeId:number):Promise<number>{
        try{
            const count =  await this.product.countProductStore(storeId)
            if(!count)return 0

            return count;
        }catch(err:any){
            return 0;
        }
    }
    public async deleteProduct(productIds:any,storeId:number):Promise<void>{
        if (!Array.isArray(productIds) || productIds.length === 0) {
            throw new ErrorMessage("Invalid product IDs provided.",400)
        }
        await Promise.all(
            productIds.map(async(id)=>{
                let productId = Number(id)
                if(checkIsAValidNumber(id)){
                    await deleteProductProducer(productId,storeId)
                }
                
            })
        )
    }
}