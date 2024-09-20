import React,{useEffect} from "react";
import {ListCartItems} from "./CartWindow"
import { ListSettings } from "./SettingsWindow";

export const BoxWindow = ({ isWindowOpen, setIsWindowOpen, typeWindow, datas,status }) => {
    const closeWindow = () => {
      setIsWindowOpen(false);
    
    }
  
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
  


