import { PrismaClient } from "@prisma/client";
import { Order ,CreateOrderDto, StatusOrder} from "../types/order";

export interface IOrderRepository {
   
    createOrder({couponId,price,
        productId,quantity,userId,total
    }:CreateOrderDto):Promise<void>,
    getOrder(userId:number):Promise<Order[]>,
    getOrderItems(orderId:number):Promise<Order[]>,
    storeGetOrderItems(storeId:number):Promise<Order[]>,
    getOrderItemByIdAndUserId(userId:number,orderItemId:number,status:StatusOrder):Promise<Order | null>
}

export class OrderRepository implements IOrderRepository{
    constructor(protected prisma:PrismaClient){}

   
    public async createOrder({couponId,price,
        productId,quantity,userId,total
    }:CreateOrderDto ):Promise<void>{
        await this.prisma.order.create({
            data:{quantity,price,productId,userId,couponId,total}
        })
    }
    public async getOrder(userId:number):Promise<Order[]>{
        return await this.prisma.order.findMany({
            where:{userId},
            take:5
        })
    }
    public async getOrderItems(id:number):Promise<Order[]>{
        return await this.prisma.order.findMany({
            where:{id},
            take:5,
            include:{'product':true}
        })
    }
    public async storeGetOrderItems(storeId:number):Promise<Order[]>{
        return await this.prisma.order.findMany({
            where:{product:{
                storeId
            }},
            take:5
        })
    }
    public async getOrderItemByIdAndUserId(userId:number,orderId:number,status:StatusOrder):Promise<Order| null>{
        return await this.prisma.order.findUnique({
            where:{id:orderId, userId,status},
        })
    }
}