import React,{useContext,useState,useEffect} from "react";
import { CartActions } from "./Aside/CartWindow";



export const ListItems = ({ datas, typeComponent,redirectToProduct,setTottaly }) => {
  
    return datas.map(({ id, name, price, imgPath, quantity },ind) => {
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
           <CartActions id={id} quantity={quantity} price={price} setTottaly={setTottaly}/>
          )}
      
        </div>
      );
    });
  };
  

