import React,{useContext,useState,useEffect} from "react";
import { BoxWindow } from "./BoxWindows";
import { fetchData } from "../../Hooks";
import { MessageContext } from "../../Contexts";
import { serviceGetCart } from "../../services/cart";
import { items } from "../../tests/fixtures";
import {FaTrash} from 'react-icons/fa';
import { QuantitySelector } from "../QuantitySelector";

import { roundANumber } from "../Utils";
import { ListItems } from "../ListItems";


export const CartActions = ({quantity,id,price,setTottaly})=>{
  const [stateQuantity,setQuantity] = useState(quantity)
  const roundPrice= roundANumber(Number(price * stateQuantity))
  useEffect(() => {
    
    setTottaly((val=[]) => {
      
      const exists = val.some(item => item.id === id);
   
      if (exists) {
     
        return val.map(item => 
          item.id === id ? { ...item, total: roundPrice } : item
        );
      } 
     
        return [...val, { id, total: roundPrice }];
      
    });
  }, [stateQuantity]); 
  return(
    <>
     <QuantitySelector id={id} quantity={stateQuantity} setQuantity={setQuantity}/>
     <p className="total" data-testid="cart_total">
      R${roundPrice}
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
      return ()=>setItems({datas:'carregando',status:''})
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

  if(datas.length === 1)return datas[0].total
  return datas.reduce((acc, val) => acc + val.total, 0);
}
export const CartListItems = ({ datas ,setTottaly}) => {
  return datas.map(({ id, name, price, imgPath, quantity }) => {
    
    const img = imgPath.replace('../public', '');
    const src = `http://localhost:8080/static${img}`;

    return (
      <div className="cart_product" data-testid="cart_item" key={id}>
        {src && (
          <div className="img">
            <img alt={name} src={src} data-testid="cart_item_img"></img>
          </div>
        )}
        {name && <p className="item_name" data-testid="cart_item_name">{name}</p>}
        <CartActions id={id} quantity={quantity} price={price} setTottaly={setTottaly} />
      </div>
    );
  });
};
export const ListCartItems = ({datas,status})=>{
  const [changeTotally,setTottaly] = useState([])
  if (datas === "carregando" && !status) return <div className="loading" data-testid="window_loading">Carregando...</div>;
  
  if (Array.isArray(datas) && datas.length === 0 && status === 201) return <div className="error_message" data-testid="error_message">Adicione items ao seu carrinho!</div>;
  

  if (status === 401) return <div className="error_message" data-testid="error_message">Faça login para adicionar items ao seu carrinho!</div>;

  if (status > 401) return <div className="error_message" data-testid="error_message">Algo deu errado enquanto buscavamos seu carrinho , tente mais tarde!</div>;

  const totally = getTotally( changeTotally )
  
 
  return (
    <div className="list_cart" data-testid="list_items">
      <ListItems typeComponent={'Cart'} datas={datas} setTottaly={setTottaly}/>
      <h4>Total {totally  }</h4>
      <button>Limpar Carrinho</button>  
      <button> FInalizar Compra</button>
    </div>
  )
}
