import { PrismaClient} from "@prisma/client";
import { ErrorMessage } from "../Helpers/ErrorMessage";

import { CartWithItems } from "../types/cartItems";


export interface UserCartRepository  {
    createOrUpdate(userId:number,productId:number,quantity:number):Promise<void>,
    removeItem(productId:number,cartId:number):Promise<void>,
    getAllCartItems(userId:number):Promise<CartWithItems[] | undefined>,
    countUserCart(userId:number):Promise<number | undefined>
}

export class UserCartRepository implements UserCartRepository{
    constructor(protected prisma:PrismaClient){}
  
     
    public async createOrUpdate(userId:number,productId:number,quantity:number):Promise<void>{
        try{  
            await this.prisma.cartitem.create({
                data:{
                    productId,quantity,userId
                }
            })
        }catch(err:any){
            throw new ErrorMessage("Failed to create or add a item to cart",500)
        }
    }
    public async countUserCart(userId:number):Promise<number >{
        try{
            return await this.prisma.cartitem.count({
                where:{userId}
            })
        }catch(err:any){
            throw new ErrorMessage("Failed to count cart",500)
        }
    }
    
    public async removeItem(productId:number,userId:number):Promise<void>{
        try{
            await this.prisma.cartitem.deleteMany({
                where:{
                    productId,userId
                }
            })
        }catch(err:any){
            throw new ErrorMessage("Failed to remove item",500)
        }
    }
    
    public async getAllCartItems(userId:number):Promise< CartWithItems[]  >{
        return await this.prisma.cartitem.findMany({
            where:{userId},
            include:{product:true}
        })
        
    }   
    public async updateCart(cartId:number,quantity:number,userId:number):Promise<void>{
        await this.prisma.cartitem.update({
            where:{id:cartId,userId},
            data:{quantity}
        })
    }
}

 