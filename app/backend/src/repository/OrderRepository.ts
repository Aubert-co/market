import { PrismaClient } from "@prisma/client";
import { Order, OrderItem } from "../types/order";

export interface IOrderRepository {
    createOrder(userId:number,total:number,
        couponId:number | null
    ):Promise<Order>,
    createOrderItem({orderId,
        productId,quantity,price
    }:CreateOrderItem):Promise<void>,
    getOrder(userId:number):Promise<Order[]>,
    getOrderItems(orderId:number):Promise<OrderItem[]>,
    storeGetOrderItems(storeId:number):Promise<OrderItem[]>,
    getOrderItemByIdAndUserId(userId:number,orderItemId:number):Promise<OrderItem | null>
}
type CreateOrderItem = {
    orderId:number,
    productId:number,
    quantity:number,
    price:number
   
}
export class OrderRepository implements IOrderRepository{
    constructor(protected prisma:PrismaClient){}

    public async createOrder(userId:number,total:number,
        couponId:number | null
    ):Promise<Order>{
        return await this.prisma.order.create({
            data:{userId,total,couponId}
        })
    }
    public async createOrderItem({orderId,price,
        productId,quantity
    }:CreateOrderItem ):Promise<void>{
        await this.prisma.orderItem.create({
            data:{orderId,quantity,price,productId}
        })
    }
    public async getOrder(userId:number):Promise<Order[]>{
        return await this.prisma.order.findMany({
            where:{userId},
            take:5
        })
    }
    public async getOrderItems(orderId:number):Promise<OrderItem[]>{
        return await this.prisma.orderItem.findMany({
            where:{orderId},
            take:5,
            include:{'product':true}
        })
    }
    public async storeGetOrderItems(storeId:number):Promise<OrderItem[]>{
        return await this.prisma.orderItem.findMany({
            where:{product:{
                storeId
            }},
            take:5
        })
    }
    public async getOrderItemByIdAndUserId(userId:number,orderItemId:number):Promise<OrderItem | null>{
        return await this.prisma.orderItem.findUnique({
            where:{id:orderItemId, order:{
                userId
            }},
        })
    }
}