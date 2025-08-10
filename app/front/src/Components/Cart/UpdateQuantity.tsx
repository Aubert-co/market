import { UpdateCartContext } from "@/Context/CartContext";
import { updateItemCart } from "@/Storage/cart";
import type React from "react"
import { useContext } from "react";

type Props = {
    id:number,
    quantity:number,
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
}
export  const UpdateCartQuantity =({id,quantity,setQuantity}:Props)=>{
    const {setUpdateCart} = useContext(UpdateCartContext)!
    const click = (action:'increase'|'decrease')=>{
      
       if(action === "increase"){
            if(quantity >= 5){
                return;
            }
            setQuantity(prev=>prev+1)
            updateItemCart(id , quantity+1)
            setUpdateCart(true)
            
            return;
       
        }
        if(quantity <= 1){
            return;
        }
        setQuantity(prev=>prev-1)
        updateItemCart(id , quantity-1)
        setUpdateCart(true)
    }
    return(
        <>
        <button onClick={()=>click('decrease')}>
            -
        </button>
        {quantity}
        <button onClick={()=>click('increase')}>
            +
        </button>
        </>
    )
}