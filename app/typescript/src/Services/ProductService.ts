import { ErrorMessage } from "../Helpers/ErrorMessage";
import { dataProducts, IProductRepository, ProductRepository } from "../Repository/ProductRepository";

export interface productService{
    createProduct( data:{ category:string,name: string, description: string,
        storeId: number, price: number, stock: number, imageUrl: string }):Promise<void>,
    selectByCategory(category:string,limit:number,skip:number ):Promise<dataProducts[]>,
    getProductInCache(key:string):Promise<dataProducts[] >,
    saveProductInCache(key:string,data:dataProducts[]):Promise<any>,
    getProducts(limit:number,skip:number):Promise<dataProducts[]>,
    getProductById(id:number):Promise<dataProducts|null >,
    countProducts():Promise<number>,
    saveCountProductsInCache(countProducts:number):Promise<void>,
    getCountProductInCache():Promise<number>
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
            throw new ErrorMessage("Failed to retrieve products. Please try again later.", 500);
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
            throw new ErrorMessage("Failed to retrieve products. Please try again later.", 500);
        }
    }
    public async getProductById(id:number):Promise<dataProducts |null>{
        try{
            const datas = await this.product.getProductById(id);
            if(!datas)return null;
            return datas
        }catch(err:any){
            throw new ErrorMessage("Failed to retrieve products. Please try again later.", 500);
        }
    }
    public async saveRecentCategories(category:string,userId:number):Promise<void>{
        try{
            await this.product.saveRecentCategories(category,userId)
        }catch(err:any){
            return;
        }
    }
    public async getRecentCategories(userId:number):Promise<string[]>{
        try{
            return await this.product.getRecentCategories(userId) 
        }catch(err:any){
            return [];
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
    public async saveCountProductsInCache(countProducts:number):Promise<void>{
        try{
            await this.product.saveCountProductsInCache(countProducts);
        }catch(err:any){
            return;
        }
    }
    public async getCountProductInCache():Promise<number>{
        try{
            const count =  await this.product.getCountProductsInCache();
            if(count)return Number(count);

            return 0;
        }catch(err:any){
            return 0;
        }
    }
}