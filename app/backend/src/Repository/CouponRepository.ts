import { PrismaClient } from "@prisma/client";
import { ErrorMessage } from "../Helpers/ErrorMessage";
import { now } from "../Helpers/Dates";
import { Coupon, CouponUsage } from "../types/coupon";

export type DiscountType = "fixed" | "percent"

export type StoreCreateCoupon = {
    storeId:number,
    quantity:number,
    expiresAt:Date,
    discount:number,
    discountType:DiscountType,
    code:string
}
export interface ICouponRepository {
    storeCreateCoupon({
        storeId,quantity,expiresAt,code,discount,discountType
    }:StoreCreateCoupon):Promise<void>,
    userAddCoupon(userId:number,couponId:number):Promise<void>,
    userSelectCoupons(userId:number):Promise<any>,
    storeGetCoupons(storeId:number,limit:number,skip:number):Promise<Coupon[]>,
    countStoreCoupons(storeId:number):Promise<number>,
    countCouponUsage(userId:number):Promise<number>,
    getCouponById(couponId:number):Promise<Coupon | null>,
    availableCoupons(limit:number,skip:number):Promise<Coupon[]>,
    userSelectCoupons(userId:number,limit:number,skip:number):Promise<CouponUsage[]>
}
export class CouponRepository{
    constructor(protected prisma:PrismaClient){}

    public async storeCreateCoupon({
        storeId,quantity,expiresAt,code,discount,discountType
    }:StoreCreateCoupon):Promise<void>{
        try{
            await this.prisma.coupon.create({
            data:{
                storeId,
                quantity,
                expiresAt,
                discount,
                discountType,
                code
            }
        })
        }catch(err:any){
            throw new ErrorMessage("Failed to create a coupon.",500)
        }
    }
    public async userAddCoupon(userId:number,couponId:number):Promise<void>{
            try{
                await this.prisma.couponUsage.create({
                data:{
                    userId,
                    couponId,
                }
            })
        }catch(err:any){
            throw new ErrorMessage("Failed to get coupon",500)
        }
    }
    public async userSelectCoupons(userId:number,limit:number,skip:number):Promise<CouponUsage[]>{
        try{
            return await this.prisma.couponUsage.findMany({
            where:{userId}
        })
        }catch(err:any){
            throw new ErrorMessage("Failed to select coupons",500)
        }
    }
    public async storeGetCoupons(storeId:number,limit:number,skip:number):Promise<Coupon[]>{
        try{
            return await this.prisma.coupon.findMany({
                where:{storeId},
                take:limit,
                skip
            })
        }catch(err:any){
            throw new ErrorMessage("Failed to get coupons",500)
        }
    }
    public async countStoreCoupons(storeId:number):Promise<number>{
        try{
            return await this.prisma.coupon.count({
            where:{storeId,expiresAt:{
                gt:now
            }}
        })
        }catch(err:any){
            throw new ErrorMessage("Failed to count coupons",500)
        }
    }
    public async countCouponUsage(userId:number):Promise<number>{
        try{
            return await this.prisma.couponUsage.count({
            where:{userId,
                coupon:{
                    expiresAt:now
                }
            }
        })
        }catch(err:any){
            throw new ErrorMessage("Failed to count coupon usage",500)
        }
    }
    
    public async getCouponById(couponId:number):Promise<Coupon | null>{
        try{
            return  await this.prisma.coupon.findUnique({
                where:{id:couponId,expiresAt:{
                    gt:now
                }}
            })
            
        }catch(err:any){
            throw new ErrorMessage("Failed to verify coupon is not expired",500)
        }
    }
    public async availableCoupons(limit:number,skip:number):Promise<Coupon[]>{
        try{
            return await this.prisma.coupon.findMany({
                take:limit,
                skip,
                where:{
                    expiresAt:{
                        gt:now
                    }
                }
            })
        }catch(err:any){
            throw new ErrorMessage("Failed to get available coupons",500)
        }
    }
}