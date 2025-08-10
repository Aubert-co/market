import type { Coupon } from "@/types/coupons.types"
import { useEffect, useState } from "react"
import styled from "styled-components"
import couponImg from '@/Assets/coupon.png'
import { ListContainer } from "@/Styles/StyledUtils"
type StateCoupon = {
    datas:Coupon[],
    status:number
}
type PropsList ={
    datas:Coupon[]
}
export const mockCoupons: Coupon[] = [
  {
    code: "DESCONTO10",
    discount: 10,
    discountType: "percent",
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 dias a partir de agora
    quantity: 100
  },
  {
    code: "FRETEGRATIS",
    discount: 15,
    discountType: "fixed",
    expiresAt: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 dias a partir de agora
    quantity: 50
  },
  {
    code: "BLACK50",
    discount: 50,
    discountType: "percent",
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 dias
    quantity: 200
  },
  {
    code: "WELCOME20",
    discount: 20,
    discountType: "fixed",
    expiresAt: Date.now() + 10 * 24 * 60 * 60 * 1000, // 10 dias
    quantity: 80
  },
  {
    code: "FLASH5",
    discount: 5,
    discountType: "percent",
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 1 dia
    quantity: 30
  }
]

export const ListCoupons = ({ datas }: PropsList) => {
  return (
    <div className="list-container">
      {datas.map((val, index) => (
        <div className="list-item" key={val.code + index}>
            <div className="list-image">
                <img src={couponImg} alt="" />
            </div>
            <div className="list-info">
                <h3>{val.code}</h3>
                <p>Desconto: {val.discountType === "percent" ? `${val.discount}%` : `R$ ${val.discount}`}</p>
                <p>Quantidade: {val.quantity}</p>
                <p>Expira em: {new Date(val.expiresAt).toLocaleDateString()}</p>
            </div>
        </div>
      ))}
    </div>
  )
}
type PropsUserCoupons = {
  formRef:React.RefObject<HTMLInputElement | null>
}
export const UserCoupons = ({formRef}:PropsUserCoupons)=>{
    const [ coupons  ,setCoupons] = useState<StateCoupon>({datas:[],status:0})
  
    useEffect(()=>{
        setCoupons({datas:mockCoupons,status:200})
    },[])
    return (
        <ListContainer >
            <div className="text">
              <h1 >Meus cupons</h1>
            </div>
            <ListCoupons datas={coupons.datas}/>
             <div ref={formRef} className="end"></div>
        </ListContainer>
    )
          
    
}