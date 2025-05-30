import React from "react";

import { Link } from "react-router-dom";
import { FaShoppingCart ,FaUser} from 'react-icons/fa';
import { SearchBar } from "./SearchBar";

export const TopBar = ({isWindowCart,setIsWindowCart,isWindowProfile,setIsWindowProfile})=>{
    return (
       <>
            <div className="logo">
                <Link to="/index/pages" data-testid="home">SUPERSTORE</Link>
            </div>
            <SearchBar  />
            <nav>
            
                <i>
                    <FaShoppingCart data-testid="cart_window" onClick={()=>setIsWindowCart(!isWindowCart)}/>
                </i>
                <i >
                    <FaUser data-testid="profile_window" onClick={()=>setIsWindowProfile(!isWindowProfile)}/> 
                </i>
            </nav>
       </>
    )
};