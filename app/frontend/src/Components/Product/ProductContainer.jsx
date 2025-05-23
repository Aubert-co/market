import React, {  useState ,useContext} from "react";
import { MainContainer } from "../../style/product";
import { MessageContext } from "../../Contexts";
import { cacheChangeQuantity, getCart, saveCart } from "../../Cache";
import { existValue, roundANumber } from "../Utils";
import {QuantitySelector} from "../QuantitySelector";

import freteGratisImg from '../../Assets/facil.png'
import {StarRating} from "./StarRating"

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
        <button data-testid="add_productCart" onClick={addCart}>Adicionar ao Carrinho</button>
        <button>Comprar</button>
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
        <img src={freteGratisImg} alt="Nome do Produto" />
      </div>

      <div className="info-section">
        <h1>{datas.name}</h1>
        <StarRating reviews={[{ratings: datas.ratings}]}/> 
        <p>{datas.description}</p>
      </div>
      
      <div className="purchase-section">
        <p className="price">R${finalPrice}</p>

        <div className="quantity-control">
            <QuantitySelector limit={5} quantity={quantity} setQuantity={setQuantity} />
        </div>
        <div className="actions">
          <Actions setMessage={setMessageParams} datas={datas} quantity={quantity}/>
        </div>
      </div>
    </div>
    
    </MainContainer>
   )
}