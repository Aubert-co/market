import React,{useContext,useState,useEffect} from "react";
import { BoxWindow } from "./BoxWindows";
import { fetchData } from "../../Hooks";
import { MessageContext } from "../../Contexts";
import { serviceGetCart } from "../../services/cart";
import { CartActions } from "./CartActions";




export const CartWindow = ({ setIsWindowOpen, isWindowOpen }) => {
    const { setMessageParams } = useContext(MessageContext);
    const [items, setItems] = useState({ datas: 'loading', status: '' });
    
    useEffect(() => {
      
      if (isWindowOpen) {
        fetchData({ service:serviceGetCart, setItems });
      }
      return ()=>setItems({datas:'loading',status:''})
    }, [isWindowOpen]);
  
    useEffect(() => {
      if (items.status && items.status > 201) {
       
        setMessageParams({ content: 'Login necessário', type: 'error' });
      }
    }, [items.status, setMessageParams]);
  
    
    if (!isWindowOpen || items.datas === 'loading') return null;
  
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

