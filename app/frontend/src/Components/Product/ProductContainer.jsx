import React, { useEffect, useRef, useState ,useContext} from "react";
import { MainContainer } from "../../style/product";
import { BtnAction } from "../BtnAction";
import { getInputValue } from "../Utils";
import { MessageContext } from "../../Contexts";

const exists = (datas,id)=> datas.some((val)=>val.id === id)

export const Actions = ({quantity,datas,setMessage})=>{
 
  
  const addCart  =()=>{
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    
    if(cart.length >0 && exists(cart,datas.id)){
      cart.map((val)=>{
        if(val.quantity !== quantity)val.quantity= quantity
      })
      localStorage.setItem('cart',JSON.stringify(cart))
      return
    }
    datas.quantity = quantity
    cart.push(datas)
    localStorage.setItem('cart',JSON.stringify(cart))
    setMessage({content:'Adicionado com sucesso'})
        
    
  }
  return (
    <>
       <button>Comprar Agora</button>
        <button  onClick={addCart}> Adicionar ao Carrinho</button>
    </>
  )
}
export const ItemQuantity = ({quantity,setQuantity})=>{
  
  const changeQuantity = (type,value) => {
  
    
    if (type === "increase" ) return setQuantity((val)=>val+=1)
    
    if (quantity > 1 && type==="decrease")return setQuantity((val)=>val-=1)
  
    if(value >=1)setQuantity(Number(value))
  };

  return (
    <>
      <button data-testid="decrease_btn" onClick={() => changeQuantity("decrease")}>-</button>
        <input data-testid="input_quantity" onChange={(e)=>changeQuantity('',e.target.value)}  type="number" value={quantity} />
      <button data-testid="increase_btn" onClick={() => changeQuantity("increase")}>+</button>
    </>
  );
}
export const ProductContainer = ({datas})=>{
   const [quantity,setQuantity] = useState(1)
    const {setMessageParams} = useContext(MessageContext)
   
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
          <ItemQuantity quantity={quantity} setQuantity={setQuantity} />
      </div>
      <div className="actions">
          <Actions setMessage={setMessageParams} datas={datas} quantity={quantity}/>
      </div>
    </div>
  </div>
    </MainContainer>
   )
}