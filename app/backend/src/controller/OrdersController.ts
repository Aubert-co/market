import { checkIsAValidNumber } from "@/helpers";
import { ErrorMessage } from "@/helpers/ErrorMessage";
import { OrderService } from "@/services/OrderService";
import { NextFunction, Request, Response } from "express";

export class OrdersController{
    constructor(protected order:OrderService){}

    public async userCreateOrder(req:Request,res:Response,next:NextFunction):Promise<any>{
        const couponId = req.body?.couponId
        const productsId = req.body?.productsId

        if(!Array.isArray(productsId) || productsId.length ===0){
            throw new ErrorMessage("",400)
        }
        const items = productsId.map((val:any)=>{
            if(!checkIsAValidNumber(val.productId) || !checkIsAValidNumber(val.quantity)){
                throw new ErrorMessage("",400)
            }
            return {productId:Number(val.productId),quantity:Number(val.quantity)}
        })
        const userId = req.user
        try{
            await this.order.createOrder({userId,couponId,items})
            res.status(201).send({message:'Sucess'})
        }catch(err:any){
            next(err)
        }
    }
}