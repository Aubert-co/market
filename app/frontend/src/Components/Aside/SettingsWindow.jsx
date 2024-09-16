import React from "react";
import { BoxWindow } from "./BoxWindows";
import { Link } from "react-router-dom";


export const SettingsWindow = ({ setIsSettingsOpen, isSettingsOpen }) => <BoxWindow typeWindow={'settings'} isWindowOpen={isSettingsOpen} setIsWindowOpen={setIsSettingsOpen} />
  

export const ListSettings =()=>{

  return (
    <div className="set_windows">
      <Link to={'/user/compras'}>Minhas Compras</Link>
      <Link to={'/user/cupons'}>Meus Cupons</Link>
    </div>
  )
};