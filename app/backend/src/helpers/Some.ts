import { DiscountType } from "../repository/CouponRepository"
type Params = {
    discount:number,
    discountType:string,
    totalItems:number
}
export const SomeDiscount = ({totalItems,discount,discountType}:Params ):number=>{
    
    if(discountType === 'fixed'){
        return totalItems -  discount
    }
    let percent = discount /100
    return totalItems +(totalItems/percent)
}