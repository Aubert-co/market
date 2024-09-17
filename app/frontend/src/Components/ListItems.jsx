import React,{useContext,useState,useEffect} from "react";
import { addToCart,serviceGetCart, serviceRemoveFromCart,serviceDecreaseCart,serviceIncreaseCart } from "../services";
import { MessageContext } from "../Contexts";
import {FaTrash} from 'react-icons/fa';
import { BtnAction } from "./BtnAction";

export const CartActions = ({quantity,id,price})=>{
 return(
   <>
    <button  product_id={id} >-</button>
    <input type="text" className="quantity" data-testid="item_quantity" value={quantity}/>
    <button product_id={id}  >+</button>
    <p className="total" data-testid="total">
      R${price * quantity}
    </p>

    <FaTrash />
  </>
 )
}


const listItems = ({ datas, typeComponent,redirectToProduct }) => {
 
    return datas.map(({ id, name, price, imgPath, quantity }) => {
      const img = imgPath.replace('../public', '');
      const src = `http://localhost:8080/static${img}`;
  
      return (
        <div
          className="product"
          data-testid="item"
          key={id}
          {...(redirectToProduct && { onClick: () => redirectToProduct(id) })}
        >
      
          {src && (
            <div className="img">
              <img alt={name} src={src} data-testid="item_img"></img>
            </div>
          )}
          {name && <p className="item_name" data-testid="item_name">{name}</p>}
          {typeComponent !== 'Cart' && price && (
            <p className="item_price" data-testid="item_price">{price}</p>
          )}
          {typeComponent === 'Cart' && (
           <CartActions id={id} quantity={quantity} price={price}/>
          )}
      
        </div>
      );
    });
  };
  
export const ListItems = ({typeComponent,datas,redirectToProduct})=>{

  return listItems({datas,typeComponent,redirectToProduct});
};

