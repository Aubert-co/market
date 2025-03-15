import React,{useContext,useState,useEffect} from "react";
import { BoxWindow } from "./BoxWindows";
import { fetchData } from "../../Hooks";
import { MessageContext } from "../../Contexts";
import { serviceGetCart } from "../../services/cart";
import { CartActions } from "./CartActions";
import styled from "styled-components";



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

const CartStyle = styled.div` 
.cart_product {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.cart_product:hover {
  background-color: #f1f1f1;
}

.cart_product .img {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  margin-right: 15px;
}

.cart_product .img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.cart_product .item_name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-right: 20px;
  flex-grow: 1;
}

.cart_product .CartActions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
}

.cart_product .CartActions button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;
}

.cart_product .CartActions button:hover {
  background-color: #0056b3;
}
`
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

