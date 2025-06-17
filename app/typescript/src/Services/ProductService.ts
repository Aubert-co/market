import { ErrorMessage } from "../Helpers/ErrorMessage";
import { dataProducts, IProductRepository, ProductRepository } from "../Repository/ProductRepository";

export interface productService{
    createProduct( data:{ category:string,name: string, description: string,
        storeId: number, price: number, stock: number, imageUrl: string }):Promise<void>,
    selectByCategory(category:string,limit:number,skip:number ):Promise<dataProducts[]>,
    getProductInCache(key:string):Promise<dataProducts[] >,
    saveProductInCache(key:string,data:dataProducts[]):Promise<any>,
    getProducts(limit:number,skip:number):Promise<dataProducts[]>
}
export class ProductService  implements productService{
    constructor(protected product:IProductRepository){}

    public async createProduct( data: {category:string, name: string, description: string,
        storeId: number, price: number, 
        stock: number, imageUrl: string 
    }): Promise<void> {
        try{
            await this.product.createProduct( data )
        }catch(err:any){
           throw new ErrorMessage("Failed to create product. Please check your input and try again.", 422);

        }
    }
    public async selectByCategory( category:string,limit:number,skip:number ):Promise<dataProducts[]>{
        try{
            return await this.product.selectByCategory(category,limit,skip) ;
        }catch(err:any){
            throw new ErrorMessage("Failed to get a product. Please check the data and try again.",409);
        } 
    }
    public async getProductInCache(key:string):Promise<dataProducts[] >{
        try{
            const cachedDatas = await this.product.getCachedProduct(key)
            if(!cachedDatas)return [];

            const parsed = JSON.parse(cachedDatas)
            if(!Array.isArray(parsed))return [];

            return parsed as dataProducts[]
        }catch(err:any){
            return [];
        }
    }
    public async saveProductInCache(key:string,data:dataProducts[]):Promise<any>{
        const datas = JSON.stringify(data)
        try{
            await this.product.saveProductInCache(key,datas)
        }catch(err:any){
            return [];
        }
    }
    public async getProducts(limit:number,skip:number):Promise<dataProducts[]>{
        try{
            return await this.product.getProducts(limit,skip);
        }catch(err:any){
            throw new ErrorMessage("",409)
        }
    }
}