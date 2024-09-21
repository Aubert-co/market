import React,{useContext,useState,useEffect} from "react";
import { BoxWindow } from "./BoxWindows";
import { fetchData } from "../../Hooks";
import { MessageContext } from "../../Contexts";
import { serviceGetCart } from "../../services/cart";
import { items } from "../../tests/fixtures";
import {FaTrash} from 'react-icons/fa';
import { QuantitySelector } from "../QuantitySelector";
import { ListItems } from "../ListItems";


export const CartActions = ({quantity,id,price})=>{
  const [stateQuantity,setQuantity] = useState(quantity)
  return(
    <>
     <QuantitySelector id={id} quantity={stateQuantity} setQuantity={setQuantity}/>
     <p className="total" data-testid="cart_total">
      R${Number(price) * Number(stateQuantity)}
     </p>
 
     <FaTrash />
   </>
  )
 }

export const CartWindow = ({ setIsWindowOpen, isWindowOpen }) => {
    const { setMessageParams } = useContext(MessageContext);
    const [items, setItems] = useState({ datas: 'carregando', status: '' });

    useEffect(() => {
      
      if (isWindowOpen) {
        fetchData({ service:serviceGetCart, setItems });
      }
    }, [isWindowOpen]);
  
    useEffect(() => {
      if (items.status && items.status > 201) {
        setMessageParams({ content: 'Login necessário', type: 'error' });
      }
    }, [items.status, setMessageParams]);
  
    
    if (!isWindowOpen || items.datas === 'carregando') return null;
  
    return (
      <BoxWindow
        typeWindow={'Cart'}
        isWindowOpen={isWindowOpen}
        setIsWindowOpen={setIsWindowOpen}
        datas={items.datas}
        status={items.status}
      />
    );
  };

 const getTotally = (datas)=>{
  return datas.r.reduce((tr, vl) => {
    return tr + vl.price;
  }, 0);
}
export const ListCartItems = ({datas,status})=>{
  if (datas === "carregando" && !status) return <div className="loading" data-testid="window_loading">Carregando...</div>;
  
  if (Array.isArray(datas) && datas.length === 0 && status === 201) return <div className="error_message" data-testid="error_message">Adicione items ao seu carrinho!</div>;
  

  if (status === 401) return <div className="error_message" data-testid="error_message">Faça login para adicionar items ao seu carrinho!</div>;

  if (status > 401) return <div className="error_message" data-testid="error_message">Algo deu errado enquanto buscavamos seu carrinho , tente mais tarde!</div>;

  const totally = datas.length === 1  ? getTotally(datas) : datas.price

  return (
  <div className="list_cart" data-testid="list_items">
   
    <ListItems typeComponent={'Cart'} datas={datas} />
    <button>Limpar Carrinho</button>  
    <button> FInalizar Compra</button>
    <h4>Total {totally}</h4>
  </div>
)
}
