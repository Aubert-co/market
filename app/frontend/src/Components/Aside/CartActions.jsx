import React,{useState,useEffect} from "react";
import { QuantitySelector } from "../QuantitySelector"
import {FaTrash} from 'react-icons/fa';
import { changeDisplayToNone, existValue, roundANumber } from "../Utils";
import {  deleteItemCart, saveCart } from "../../Cache";


export const deleteItem= ({id,setQuantity})=>{
  const cart =deleteItemCart(id)
  saveCart( cart )
  setQuantity(0)
  changeDisplayToNone(`.Cart_${id}`)
}

export const CartActions = ({quantity,id,price,setTottaly})=>{
  const [stateQuantity,setQuantity] = useState(quantity)
  const roundPrice= roundANumber(Number(price * stateQuantity))
  
  useEffect(() => {
    
    setTottaly((val=[]) => {
      
      const exists = existValue(val,id)
    
      if (exists) {
        return val.map(item => 
          item.id === id ? { ...item, total: roundPrice } : item
        );
      } 
      
      return [...val, { id, total: roundPrice }];
      
    });
  }, [stateQuantity]); 
    return(
      <>
       <QuantitySelector id={id} quantity={stateQuantity} setQuantity={setQuantity}/>
       <p className="total" data-testid="cart_total">
        R${roundPrice}
       </p>
       <FaTrash data-testid="delete_cartItem" onClick={()=>deleteItem({id,setQuantity})}/>

     </>
    )
  }