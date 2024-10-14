import React from "react";
import { cacheChangeQuantity ,saveCart} from "../Cache";

export const QuantitySelector = ({quantity,setQuantity,id,limit})=>{

    const changeQuantity = (type, value) => {
      let newQuantity = Number(quantity);
      
      if(limit && type === "increase" && limit <= newQuantity)return
      if(limit && !type && value > limit)return
      if(type==="decrease" && newQuantity -1 ===0)return
      if (type === "increase") newQuantity += 1;

      if (type === "decrease" && quantity > 1) newQuantity -= 1;
          
      if (value >= 1 && !type ) newQuantity = Number(value);
     
      setQuantity(newQuantity);
      if (id) {
        const cartCache = cacheChangeQuantity({ quantity: newQuantity, id });
        saveCart(cartCache);
    
      }
    };
  
    return (
      <>
        <button data-testid="decrease_btn" onClick={() => changeQuantity("decrease")}>-</button>
          <input data-testid="input_quantity" onChange={(e)=>changeQuantity('',e.target.value)}  type="number" value={quantity} />
        <button data-testid="increase_btn" onClick={() => changeQuantity("increase")}>+</button>
      </>
    );
  }