import { IProductRedisRepository } from "../Repository/ProductRedisRepository";
import type { dataProducts } from "../Repository/ProductRepository";
export interface IProductRedisService{
    getCountProductInCache():Promise<number>,
    saveProductInCache(key:string,data:dataProducts[]):Promise<any>,
    saveCountProductsInCache(countProducts:number):Promise<void>,
    getProductInCache(key:string):Promise<dataProducts[] >
}

export class ProductRedisService implements IProductRedisService{
    constructor(private redis:IProductRedisRepository){}
    public async saveProductInCache(key:string,data:dataProducts[]):Promise<any>{
        const datas = JSON.stringify(data)
        try{
            await this.redis.saveProductInCache(key,datas)
        }catch(err:any){
            return [];
        }
    }
     public async getProductInCache(key:string):Promise<dataProducts[] >{
        try{
            const cachedDatas = await this.redis.getCachedProduct(key)
          
            if(!cachedDatas)return [];
            
            const parsed = JSON.parse(cachedDatas)
            if(!Array.isArray(parsed))return [];
           
            return parsed as dataProducts[]
        }catch(err:any){
            return [];
        }
    }
   
    
    public async saveRecentCategories(category:string,userId:number):Promise<void>{
        try{
            await this.redis.saveRecentCategories(category,userId)
        }catch(err:any){
            return;
        }
    }
    public async getRecentCategories(userId:number):Promise<string[]>{
        try{
            return await this.redis.getRecentCategories(userId) 
        }catch(err:any){
            return [];
        }
    }
    public async saveCountProductsInCache(countProducts:number):Promise<void>{
        try{
            await this.redis.saveCountProductsInCache(countProducts);
        }catch(err:any){
            return;
        }
    }
    public async getCountProductInCache():Promise<number>{
        try{
            const count =  await this.redis.getCountProductsInCache();
            if(count)return Number(count);

            return 0;
        }catch(err:any){
            return 0;
        }
    }
}