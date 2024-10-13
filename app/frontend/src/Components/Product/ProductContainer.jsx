import React, {  useState ,useContext} from "react";
import { MainContainer } from "../../style/product";
import { MessageContext } from "../../Contexts";
import { cacheChangeQuantity, getCart, saveCart } from "../../Cache";
import { existValue, roundANumber } from "../Utils";
import {QuantitySelector} from "../QuantitySelector";
import { Comments } from "./Comments";
import { FaStar } from "react-icons/fa";

export const Actions = ({quantity,datas,setMessage})=>{
 
  const addCart  =()=>{
    const cart = getCart()

    setMessage({content:'Adicionado com sucesso'})
    if(cart.length >0 && existValue(cart,datas.id)){
      const value = cart.map((val)=>{
        if(val.id === datas.id){
          val.quantity = quantity
          val.saved =  false
          val.deleted = false
        }
        return val
      })
    
      saveCart(value)
      return
    }
    datas.quantity = quantity
    datas.saved = false
    datas.deleted = false
    cart.push(datas)
    saveCart(cart)
  }
  return (
    <>
        <button>Comprar Agora</button>
        <button data-testid="add_productCart" onClick={addCart}>Adicionar ao Carrinho</button>
    </>
  )
}

export const ProductContainer = ({datas})=>{
  const [quantity,setQuantity] = useState(1)
  const {setMessageParams} = useContext(MessageContext)
 
   if(!datas)return
   const finalPrice = roundANumber(quantity* datas.price)
   return( 
   <MainContainer>
    <div className="product-container">
      <div className="image-section">
        <img src="url-da-imagem" alt="Nome do Produto" />
      </div>

      <div className="info-section">
        <FaStar/>
        <h1>qiwenhkjqweqwejkqejknqel</h1>
        <p>Avalicações</p>
        
        <p>oqnwekbqwekjbqehjbqwehbqwjhebvqwjhyeqwyjegqiwehqileljqwnekhqwbvejhq  ejq 
          qwjelqeuqhwekuqhekuq  keqkeuk
        </p>
      </div>
      
      <div className="purchase-section">
        <p className="price">Total R${finalPrice}</p>

        <div className="quantity-control">
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </div>
        <div className="actions">
          <Actions setMessage={setMessageParams} datas={datas} quantity={quantity}/>
        </div>
      </div>
    </div>
    
    </MainContainer>
   )
}