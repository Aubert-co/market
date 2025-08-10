import { UpdateCartQuantity } from "./UpdateQuantity"
import { RemoveFromCart } from "./RemoveFromCart"
import { useContext, useState } from "react"


type Props = {
    id:number,
    quantity:number
}
export const CartActions = ({id,quantity}:Props)=>{
    const [updatedQuantity,setQuantity] = useState( quantity )
  
    return (
        <>
            <UpdateCartQuantity id={id} quantity={updatedQuantity} setQuantity={setQuantity}/>
            <RemoveFromCart id={id}/>
        </>
    )
}