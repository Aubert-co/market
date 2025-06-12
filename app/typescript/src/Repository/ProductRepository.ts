import { PrismaClient } from "@prisma/client";
import { ErrorMessage } from "../Helpers/ErrorMessage";


export type dataProducts = {
    id:number,
    name:string,
    description:string,
    price:number,
    imageUrl:string,
    stock:number
}
export interface IProductRepository{
    createProduct(data:{name:string,description:string,
        storeId:number,price:number,stock:number,imageUrl:string
    }):Promise<void>,
    getProducts(limit:number,skip:number):Promise<Array<dataProducts | []>>,
    findManyByName(name:string,limit:number,skip:number):Promise<Array<dataProducts>>
}
export class ProductRepository  implements IProductRepository{
    constructor(private prisma:PrismaClient){}

    public async createProduct(data: { name: string; description: string; storeId: number; price: number; stock: number; imageUrl: string; }): Promise<void> {
        try{
            await this.prisma.product.create({data})
        }catch(err:any){
            throw new ErrorMessage("",409);
        }
    }
    public async getProducts(limit:number , skip:number = 0): Promise<Array<dataProducts>> {
         try{
            const datas = await this.prisma.product.findMany({limit,skip})
            return datas;
        }catch(err:any){
            throw new ErrorMessage("",409);
        } 
    }
    public async findManyByName(name: string, limit: number, skip: number): Promise<Array<dataProducts>> {
         try{
            const datas = await this.prisma.product.findMany({
                where:{
                    name
                },
                limit,skip
            })
            return datas;
        }catch(err:any){
            throw new ErrorMessage("",409);
        }
    }
   
}