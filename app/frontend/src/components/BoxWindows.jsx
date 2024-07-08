import React,{useContext,useState,useEffect} from "react";
import { addToCart,serviceGetCart, serviceRemoveFromCart,serviceDecreaseCart,serviceIncreaseCart } from "../services";
import { MessageContext } from "../contexts";

import {fetchData} from '../hooks/index'
import { ListItems } from "./listItems";
import { items } from "../tests/fixtures";

const messageAddCart = {sucess:'Sucesso ao adicionar.'}

const ListSettings =()=><div data-testid="settings">settings</div>
export const BoxWindow = ({ isWindowOpen, setIsWindowOpen, typeWindow, datas }) => {
    const closeWindow = () => setIsWindowOpen(false);
  
    useEffect(() => {
      if (isWindowOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [isWindowOpen]);
  
    const handleOverlayClick = (e) => {
      if (e.target.classList.contains('overlay')) {
        closeWindow();
      }
    };
  
    if (!isWindowOpen) return null; 
  
    return (
      <div onClick={handleOverlayClick} data-testid="overlay" className="overlay">
        <div className="window">
          <div className="window_content">
          <button onClick={closeWindow} className="close-button">×</button>
            {typeWindow === 'Cart' ? (
              datas === 'carregando' ? (
                <div className="loading" data-testid="window_loading">Loading...</div>
              ) : (
                <div className="list_items" data-testid="list_items">
                  <ListItems typeComponent={'Cart'} datas={datas} />
                </div>
              )
            ) : (
              <div className="list-settings" data-testid="list_settings">
                <ListSettings />
              </div>
            )}
         
          </div>
        </div>
      </div>
    );
  };
  

  export const SettingsWindow = ({ setIsSettingsOpen, isSettingsOpen }) => (
    <BoxWindow typeWindow={'settings'} isWindowOpen={isSettingsOpen} setIsWindowOpen={setIsSettingsOpen} />
  );
  

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
      />
    );
  };