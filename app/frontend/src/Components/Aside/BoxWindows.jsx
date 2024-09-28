import React,{useEffect} from "react";
import {ListCartItems} from "./CartWindow"
import { ListSettings } from "./SettingsWindow";
import { serviceUpdateCart } from "../../services/cart";


export const closeWindow = async({typeWindow,setIsWindowOpen})=>{
  setIsWindowOpen( false );
  if(typeWindow !== 'Cart')return ;
  
  await serviceUpdateCart()
}
export const BoxWindow = ({ isWindowOpen, setIsWindowOpen, typeWindow, datas,status }) => {

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
        closeWindow({setIsWindowOpen,typeWindow});
      }
    };
  
    if (!isWindowOpen) return null; 
    
    return (
      <div onClick={handleOverlayClick} data-testid="overlay" className="overlay">
        <div className="window">
          <div className="window_content">
          <button onClick={()=>closeWindow({setIsWindowOpen,typeWindow})} className="close-button" data-testid="window_close">×</button>
            {typeWindow === 'Cart' ? (
              <ListCartItems datas={datas} status={status}/>
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
  


