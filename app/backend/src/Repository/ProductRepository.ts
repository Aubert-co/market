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
    getProductById(id:number):Promise<dataProducts | null>,
    countProducts():Promise<number | undefined>,
    getProductsByStoreId(storeId:number,skip:number,limit:number):Promise<dataProducts[]>,
    countProductStore(storeId:number):Promise<number>,
    deleteProduct(storeId:number,productId:number):Promise<void>
}
export class ProductRepository  implements IProductRepository{
    constructor(private prisma:PrismaClient){}

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
    
    
    public async getProductById(id:number):Promise<dataProducts | null>{
        return await this.prisma.product.findUnique({where:{id}})
    }
   
    public async countProducts():Promise<number | undefined>{
        return await this.prisma.product.count()
    }
    
    
    public async getProductsByStoreId(storeId:number,skip:number=0,limit:number=10):Promise<dataProducts[]>{
       return await this.prisma.product.findMany({
            where:{storeId},
            skip,
            take:limit
        })
    }
    public async countProductStore(storeId:number):Promise<number>{
        return await this.prisma.product.count({
            where:{storeId}
        })
    }
    public async deleteProduct(storeId:number,productId:number):Promise<void>{
        await this.prisma.product.deleteMany({where:{id:productId,storeId}})
    }
    
}