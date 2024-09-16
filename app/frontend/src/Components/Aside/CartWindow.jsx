import React,{useContext,useState,useEffect} from "react";
import { BoxWindow } from "./BoxWindows";
import { fetchData } from "../../Hooks";
import { MessageContext } from "../../Contexts";
import { serviceGetCart } from "../../services";
import { items } from "../../tests/fixtures";
const service =async()=>{
  return {datas:items,status:200};
};
export const CartWindow = ({ setIsWindowOpen, isWindowOpen }) => {
    const { setMessageParams } = useContext(MessageContext);
    const [items, setItems] = useState({ datas: 'carregando', status: '' });
   
    useEffect(() => {
      if (isWindowOpen) {
        fetchData({ service, setItems });
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