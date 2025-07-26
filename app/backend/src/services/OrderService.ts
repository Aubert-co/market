import { OrderItem, PrismaClient } from "@prisma/client";
import { checkIsAValidNumber } from "../helpers";
import { ErrorMessage } from "../helpers/ErrorMessage";
import { SomeDiscount } from "../helpers/Some";
import { DiscountType, ICouponRepository } from "../repository/CouponRepository";
import { IOrderRepository } from "../repository/OrderRepository";
import { IProductRepository } from "../repository/ProductRepository";
import { Order } from "../types/order";

interface OrderServices  {
    createOrder(userId:number,couponId:number | null,items:Items[]):Promise<void>,
}
type Items = {
    quantity:number,
    productId:number
}
type ArrayItems ={
    price:number,
    quantity:number,
    productId:number
}
type DatasCreateOrder = {
    userId:number,couponId:number | null,items:Items[]
}
export class OrderService{
    constructor(protected order:IOrderRepository,protected product:IProductRepository,
        protected coupon:ICouponRepository,protected prisma:PrismaClient
    ){}
    public async createOrder({userId,couponId,items}:DatasCreateOrder):Promise<void>{

    
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