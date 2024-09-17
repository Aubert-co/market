import React,{useEffect} from "react";
import { ListItems } from "../ListItems";
import { ListSettings } from "./SettingsWindow";


const ListCartItems = ({datas})=>{
  console.log(datas)
  /*const totally = datas.reduce((tr, vl) => {
    return tr + vl.price;
  }, 0);*/
  const totally = datas.price

  return (
  <div className="list_cart" data-testid="list_items">
   
    <ListItems typeComponent={'Cart'} datas={datas} />
    <button>Limpar Carrinho</button>  
    <button> FInalizar Compra</button>
    <h4>Total {totally}</h4>
  </div>
)
}
export const BoxWindow = ({ isWindowOpen, setIsWindowOpen, typeWindow, datas }) => {
    const closeWindow = () => {
      setIsWindowOpen(false);
      console.log("fechado")
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
              datas === 'carregando' ? (
                <div className="loading" data-testid="window_loading">Loading...</div>
              ) : (
                <ListCartItems datas={datas}/>
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
  


