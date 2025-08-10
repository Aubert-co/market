import { useEffect, useState } from "react"
import type { UserCart } from "@/types/cart.types"
import {  RenderConditions } from "@/Components/Cart/ListCart"
import { getUserCart } from "@/Services/cart"
import { UpdateCartContext, type UpdateCart } from "@/Context/CartContext"
import { ListContainer } from "@/Styles/StyledUtils"


type CartState = {
    datas:UserCart[],
    status:number
}

export const fetchData = async(setUserCart: React.Dispatch<React.SetStateAction<CartState>>) => {
  const {datas,status}= await getUserCart()
  setUserCart({
    datas:datas as UserCart[],status
  })
};

type Props = {
  formRef:React.RefObject<HTMLInputElement | null>
}
export const Cart = ({formRef}:Props)=>{
    const [userCart,setUserCart] = useState<CartState>({
        datas:[],
        status:0
    })
    const [updateCart,setUpdateCart] = useState<UpdateCart>(true)

    useEffect(() => {
        if (updateCart) {
            fetchData(setUserCart);
            setUpdateCart(false);
        }
    }, [updateCart]);
    
    return(
        <UpdateCartContext.Provider value={{updateCart,setUpdateCart}}>
            <ListContainer>
            <div className="text">
              <h1>Meu carrinho</h1>
            </div>
          <RenderConditions cart={userCart.datas} status={userCart.status}/>
          <div ref={formRef} className="end"></div>
        </ListContainer>
        </UpdateCartContext.Provider>
        
    )
}