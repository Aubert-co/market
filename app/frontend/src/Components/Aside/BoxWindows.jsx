import React,{useEffect} from "react";
import { ListItems } from "../ListItems";


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
  


