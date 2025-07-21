import { CouponUsage } from "@prisma/client";
import { ErrorMessage } from "../Helpers/ErrorMessage";
import { ICouponRepository,StoreCreateCoupon } from "../Repository/CouponRepository";
import { Coupon } from "../types/coupon";

export class CoponServices{
    constructor(protected coupon:ICouponRepository){}

    public async storeCreateCoupon({quantity,expiresAt,
        storeId,discountType,discount,code
    }:StoreCreateCoupon):Promise<void>{
        const countStoreCoupons = await this.coupon.countStoreCoupons(storeId)
        if (countStoreCoupons > 5) {
            throw new ErrorMessage("Limit of active coupons reached for this store.", 400);
        }
        if(quantity > 50)quantity = 50
        await this.coupon.storeCreateCoupon({
            quantity,expiresAt,storeId,discount,discountType,code
        })
    }
    public async userAddCoupon(couponId:number,userId:number):Promise<any>{
        const coupon = await this.coupon.getCouponById(couponId)

        if (!coupon) {
            throw new ErrorMessage("Invalid or expired coupon.", 410);
        }

        const countUserCoupons = await this.coupon.userSelectCoupons(userId)
        if(countUserCoupons > 5){
            throw new ErrorMessage("Limit of active coupons reached.", 400);
        }
        await this.coupon.userAddCoupon(userId,couponId)
    }
    public async storeSelectCoupon(storeId:number,limit:number=5,skip:number):Promise<Coupon[]>{
        return await this.coupon.storeGetCoupons(storeId,limit,skip)
    }
    public async userGetCoupons(userId:number,limit:number=5,skip:number):Promise<CouponUsage[]>{
        return await this.coupon.userSelectCoupons(userId,limit,skip)
    }
    public async availableCoupons(limit:number=5,skip:number):Promise<Coupon[]>{
        return await this.coupon.availableCoupons(limit,skip)
    }
}