import { checkIsAValidNumber } from "../Helpers";
import { ErrorMessage } from "../Helpers/ErrorMessage"
import { UserCartRepository } from "../Repository/UserCartRepository";
import { CartWithItems } from "../types/cartItems";

export interface IUserCartService{
    
    createOrUpdate(userId:number,productId:number,quantity:number):Promise<void>,
    removeItem(productId:number,userId:number):Promise<void>,
    getAllCartItems(userId:number):Promise< CartWithItems[]  >,
    updateCart(datas:Array<any>,userId:number):Promise<void>
}


export class UserCartService implements IUserCartService{
    constructor(protected cart:UserCartRepository){}
   
    public async createOrUpdate(userId:number,productId:number,quantity:number):Promise<void>{
        const countCartItems = await this.cart.countUserCart(userId)
        if (countCartItems >= 5) {
            throw new ErrorMessage("Cart limit reached. You can only have up to 5 items in your cart.",400)
        }
        await this.cart.createOrUpdate(userId,productId,quantity)
        
    }
    public async removeItem(productId:number,userId:number):Promise<void>{
        try{
            await this.cart.removeItem(productId,userId)
        }catch(err:any){
            throw new ErrorMessage("Failed to remove a item from cart",500)
        }
    }
    public async getAllCartItems(userId:number):Promise< CartWithItems[]  >{
        try{
            return await this.cart.getAllCartItems(userId);
        }catch(err:any){
            throw new ErrorMessage("Failed to get items from cart",500)
        }
    }
    public async updateCart(datas:any,userId:number):Promise<void>{
       
        datas.map(async(val:any)=>{
            if(checkIsAValidNumber(val.cartId) && checkIsAValidNumber(val.quantity) && Number(val.quantity) <5){
                await this.cart.updateCart(Number(val.cartId),Number(val.quantity),userId)
            }
           
        })
    }
}