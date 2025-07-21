import { OrderItem, PrismaClient } from "@prisma/client";
import { checkIsAValidNumber } from "../Helpers";
import { ErrorMessage } from "../Helpers/ErrorMessage";
import { SomeDiscount } from "../Helpers/Some";
import { DiscountType, ICouponRepository } from "../Repository/CouponRepository";
import { IOrderRepository } from "../Repository/OrderRepository";
import { IProductRepository } from "../Repository/ProductRepository";
import { Order } from "../types/order";

type Items = {
    quantity:number,
    productId:number
}
type ArrayItems ={
    price:number,
    quantity:number,
    productId:number
}
export class OrderService{
    constructor(protected order:IOrderRepository,protected product:IProductRepository,
        protected coupon:ICouponRepository,protected prisma:PrismaClient
    ){}
    public async completeOrders(userId:number,couponId:number | null,items:Items[]){

    
        let totalItems:number = 0;
        const itemPrices:ArrayItems[] = [];

        for (const val of items) {
            const products = await this.product.selectProductPrice(val.productId);

            if (!products) {
                throw new ErrorMessage("Invalid product", 400);
            }

            if (products.stock < val.quantity) {
                throw new ErrorMessage("Invalid quantity", 400);
            }

            const itemTotal = products.price * val.quantity;
            totalItems += itemTotal;

            itemPrices.push({
                price: products.price,
                quantity: val.quantity,
                productId:val.productId
            });
        }
        if(couponId){
           const coupon = await this.coupon.getCouponById(couponId)
           if(!coupon)throw new ErrorMessage("Invalid coupon",400)

           totalItems =  SomeDiscount({discount:coupon.discount,
            discountType:coupon.discountType,totalItems})
        }
        await this.prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    userId,
                    total: totalItems,
                    couponId
                }
            });

                for (const { price, productId, quantity } of itemPrices) {
                    await tx.orderItem.create({
                        data: {
                            orderId: order.id,
                            productId,
                            quantity,
                            price
                        }
                });
            }

    
            return order;
        });
        
    }
    public async userGetOrders(userId:number):Promise<Order[]>{
        return await this.order.getOrder(userId)
    }
    public async userGetOrderItems(userId:number):Promise<OrderItem[]>{
        return await this.order.getOrderItems(userId)
    }
    public async storeGetOrderItems(storeId:number):Promise<OrderItem[]>{
        return await this.order.storeGetOrderItems(storeId)
    }
}