import { PrismaClient } from "@prisma/client"

export type Product = {
    id:number,
    name:string,
    description:string,
    price:number,
    imageUrl:string,
    stock:number,
    category:string,
    storeId:number
}

export const prisma = new PrismaClient()



export class ProductRepository  {
    constructor(protected prisma:PrismaClient){}

    public async getProductById(id:number):Promise<Product | null >{
        return await this.prisma.product.findUnique({where:{id}})
    }
    public async deleteProduct(storeId:number,productId:number):Promise<void>{
        await this.prisma.product.deleteMany({where:{id:productId,storeId}})
    }
}