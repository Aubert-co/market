import React,{useContext,useState,useEffect} from "react";
import { addToCart,serviceGetCart, serviceRemoveFromCart,serviceDecreaseCart,serviceIncreaseCart } from "../services";
import { MessageContext } from "../Contexts";
import {FaTrash} from 'react-icons/fa'




export const BtnAction =({product_id,service,text,message})=>{
    const {messageParams,setMessageParams} = useContext( MessageContext )

    const event = async()=>{
    
        const {status} =  await service({product_id,quantity:1})

        if(status === 401)return setMessageParams({content:'Login necessário para adicionar ao carrinho.',type:'error'})
            
        if(message && status === 201)return setMessageParams({content:message.sucess,type:'sucess'})
        if(status > 401)  setMessageParams({content:'Algo deu errado',type:'error'})
        
    }
    if(text && text.props)return React.cloneElement(text,{onClick:event,className:'btn_action',"data-testid":"btn_component"})
    return (
        <button onClick={event} className="btn_action" data-testid="btn_action">
           {text}
        </button>
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
            <>
              <BtnAction text="-" product_id={id} service={serviceDecreaseCart} />
              <p className="quantity" data-testid="item_quantity">{quantity}</p>
              <BtnAction text="+" product_id={id} service={serviceIncreaseCart} />
              <p className="total" data-testid="total">
                R${price * quantity}
              </p>

              <BtnAction
              text={<FaTrash />}
              product_id={id}
              service={serviceRemoveFromCart}
              />
            </>
          )}
      
        </div>
      );
    });
  };
  
export const ListItems = ({typeComponent,datas,redirectToProduct})=>{

  return listItems({datas,typeComponent,redirectToProduct})
}

