import React, { useEffect, useRef, useState } from "react";
import { MainContainer } from "../../style/product";
import { BtnAction } from "../BtnAction";
import { addToCart } from "../../services";
import { getInputValue } from "../Utils";


export const Actions = ({refItemQuantity})=>{
  const quantity = Number(getInputValue(refItemQuantity));
  return (
    <>
       <button>Comprar Agora</button>
        <BtnAction service={addToCart} quantity={quantity}  text={'Adicionar ao carrinho'} message={'Adicionado ao carrinho'} />
    </>
  )
}
export const ItemQuantity = ({refItemQuantity,itemInStock})=>{
  
  const changeQuantity = (type) => {
    const val = Number(getInputValue(refItemQuantity));
    
    if (type === "increase"  && val < itemInStock) return refItemQuantity.current.value = val + 1;
    
    if (val > 1 && type==="decrease") refItemQuantity.current.value = val - 1; 
  
  };

  return (
    <>
      <button data-testid="decrease_btn" onClick={() => changeQuantity("decrease")}>-</button>
        <input data-testid="input_quantity" ref={refItemQuantity} type="number" defaultValue="1" />
      <button data-testid="increase_btn" onClick={() => changeQuantity("increase")}>+</button>
    </>
  );
}
export const ProductContainer = ({datas})=>{
   const refItemQuantity = useRef(1);
   
   if(!datas)return
   return( 
   <MainContainer>
     <div className="product-container">
    <div className="image-section">
      <img src="url-da-imagem" alt="Nome do Produto" />
    </div>
    <div className="info-section">
      <h1>{datas.product_name}</h1>
      <p>{datas.description}</p>
    </div>
    <div className="purchase-section">
      <p className="price">{datas.price}</p>

      <div className="quantity-control">
          <ItemQuantity refItemQuantity={refItemQuantity} itemInStock={50}/>
      </div>
      <div className="actions">
          <Actions refItemQuantity={refItemQuantity}/>
      </div>
    </div>
  </div>
    </MainContainer>
   )
}