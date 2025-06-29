import { PrismaClient } from "@prisma/client";
import { ErrorMessage } from "../Helpers/ErrorMessage";
import { RedisClientType } from "redis";


export type dataProducts = {
    id:number,
    name:string,
    description:string,
    price:number,
    imageUrl:string,
    stock:number,
    category:string,
    storeId:number
}
export interface IProductRepository{
    createProduct(data:{category:string,name:string,description:string,
        storeId:number,price:number,stock:number,imageUrl:string
    }):Promise<void>,
    getProducts(limit:number,skip:number):Promise<dataProducts[]>,
    findManyByName(name:string,limit:number,skip:number):Promise<Array<dataProducts>>
    selectByCategory(category:string,limit:number,skip:number):Promise<dataProducts[] >,
    getCachedProduct(key:string):Promise<any>,
    saveProductInCache(key:string,data:string):Promise<void>,
    getProductById(id:number):Promise<dataProducts | null>,
    getRecentCategories(userId: number): Promise<string[]>,
    saveRecentCategories(category:string,userId:number):Promise<void>,
    countProducts():Promise<number | undefined>,
    getCountProductsInCache():Promise<string | null>,
    saveCountProductsInCache(countProduct:number):Promise<void>
}
export class ProductRepository  implements IProductRepository{
    constructor(private prisma:PrismaClient,private redis:RedisClientType){}

    public async createProduct(data: { category:string,name: string; description: string; storeId: number; price: number; stock: number; imageUrl: string; }): Promise<void> {
        await this.prisma.product.create({data})
        
    }
    public async getProducts(limit:number , skip:number = 0): Promise<dataProducts[]> {
         
        const datas = await this.prisma.product.findMany({take: limit,
            skip
        })
        return datas;
        
    }
    public async findManyByName(name: string, limit: number=10, skip: number = 0): Promise<dataProducts[]> {
        
        const datas = await this.prisma.product.findMany({
            where: {
                name,
            },
            take: limit,
            skip,
        });

        return datas;
       
    }
   public async selectByCategory(category:string,limit:number=10,skip:number=0):Promise<dataProducts[]>{
        const datas = await this.prisma.product.findMany({
            where:{
                category
            },
            take: limit,
            skip
        })
        return datas;
       
   }
    public async saveProductInCache(key:string,datas:string):Promise<void>{
       
        await this.redis.set(key,datas,
            {
                expiration: {
                    type: 'EX',
                    value: 3600 
                }
            }
        )
    }
    public async getCachedProduct(key:string):Promise<string | null>{
        return await this.redis.get(key)
    }
    public async getProductById(id:number):Promise<dataProducts | null>{
        return await this.prisma.product.findUnique({where:{id}})
    }
    public async saveRecentCategories(category:string,userId:number):Promise<void>{
        const key = `user${userId}:recent_categories`;
        await this.redis.lRem(key, 0, category);
        await this.redis.lPush(key,category);
        await this.redis.lTrim(key,0,4);
    }
    public async getRecentCategories(userId: number): Promise<string[]> {
        const categories = await this.redis.lRange(`user:${userId}:recent_categories`, 0, -1);
        return categories;
    }
    public async countProducts():Promise<number | undefined>{
        return await this.prisma.product.count()
    }
    public async saveCountProductsInCache(countProduct:number):Promise<void>{
        await this.redis.set('countProduct',countProduct)
    }
    public async  getCountProductsInCache():Promise<string | null>{
        return await this.redis.get('countProduct')
       
    }
}