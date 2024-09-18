import React,{useContext,useState,useEffect} from "react";
import { BoxWindow } from "./BoxWindows";
import { fetchData } from "../../Hooks";
import { MessageContext } from "../../Contexts";
import { serviceGetCart } from "../../services";
import { items } from "../../tests/fixtures";
import {FaTrash} from 'react-icons/fa';
import { QuantitySelector } from "../QuantitySelector";

export const CartActions = ({quantity,id,price})=>{
  const [stateQuantity,setQuantity] = useState(quantity)
  return(
    <>
     <QuantitySelector id={id} quantity={stateQuantity} setQuantity={setQuantity}/>
     <p className="total" data-testid="total">
       R${price * quantity}
     </p>
 
     <FaTrash />
   </>
  )
 }

export const CartWindow = ({ setIsWindowOpen, isWindowOpen }) => {
    const { setMessageParams } = useContext(MessageContext);
    const [items, setItems] = useState({ datas: 'carregando', status: '' });
    const [lastUpdate,setUpdate]= useState(null)
    useEffect(() => {
      const cacheDuration = 1000 * 60 * 5; 
      const now = new Date().getTime();
      if(now - lastUpdate < cacheDuration){
        const cartDatas = localStorage.getItem('cart')
        const datas = JSON.parse(cartDatas)
        return setItems({datas,status:201})
      }
      if (isWindowOpen) {
        //fetchData({ service, setItems });
        const cartDatas = localStorage.getItem('cart')
        const datas = JSON.parse(cartDatas)
        setItems({datas,status:201})
        setUpdate(now)
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
      />
    );
  };

