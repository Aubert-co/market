import React from "react";
import { cacheChangeQuantity ,saveCart} from "../Cache";

export const QuantitySelector = ({quantity,setQuantity,id})=>{

    const changeQuantity = (type, value) => {
        let newQuantity = Number(quantity);
        
        if (type === "increase") {
            newQuantity += 1;
            setQuantity(newQuantity);
        }
        
        if (type === "decrease" && quantity > 1) {
            newQuantity -= 1;
            setQuantity(newQuantity);
        }
        
        if (value >= 1 && !type) {
            newQuantity = Number(value);
            setQuantity(newQuantity);
        }
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