import {  PrismaClient } from "@prisma/client";
import { checkIsAValidNumber } from "../helpers";
import { ErrorMessage } from "../helpers/ErrorMessage";
import {  ICouponRepository } from "../repository/CouponRepository";
import { IOrderRepository } from "../repository/OrderRepository";
import { IProductRepository } from "../repository/ProductRepository";
import { DatasCreateOrderDto, Order, OrderProductInput } from "../types/order";
import { GetCouponDto,DiscountType } from "../types/coupon";
import { applyDiscount } from "../helpers/ApplyDiscount";

interface OrderServices  {
    createOrder(userId:number,couponId:number | null):Promise<void>,
}




export class OrderService{
    constructor(protected order:IOrderRepository,protected product:IProductRepository,
        protected coupon:ICouponRepository,protected prisma:PrismaClient
    ){}

    protected async getCouponById(couponId:number | undefined):Promise<GetCouponDto>{
        if(!couponId)return {discount:undefined,discountType:undefined}

        const coupon = await this.coupon.getCouponById(couponId)
        if (!coupon) {
            throw new ErrorMessage("Coupon not found or is invalid.", 404);
        }

        return {
            discount:coupon.discount,discountType:coupon.discountType as DiscountType
        }
    }
  
    public async createOrder({userId,items}:DatasCreateOrderDto):Promise<void>{

        try{
            await this.prisma.$transaction(async (tx) => {
                for (const val of items) {
                    const product = await tx.product.findFirst({
                        where:{id:val.productId},
                        select:{
                            price:true,stock:true
                        }
                    })
                    
                    if (!product) {
                    throw new ErrorMessage("No valid product found to create the order.", 404);
                    }

                    if (product.stock < val.quantity) {
                        throw new ErrorMessage("Insufficient product stock for the requested quantity.", 400);
                    }

                    const {discount,discountType} = await this.getCouponById(val.couponId)

                    const total = applyDiscount({
                        total: product.price * val.quantity,
                        discount,
                        discountType
                    });

                    await tx.order.create({
                        data:{
                        price: product.price,
                        productId: val.productId,
                        userId,
                        couponId:val.couponId,
                        quantity: val.quantity,
                        total
                        }
                    });

                    await tx.product.update({
                        where:{id:val.productId},
                        data:{stock: product.stock -  val.quantity}
                    });
                    
                }
            });

       }catch(err:any){
            if(err instanceof ErrorMessage){
                throw new ErrorMessage(err.message,err.status)
            }
            throw new ErrorMessage("Internal error while creating the order.", 500)
        }

        
    }
    
   
}