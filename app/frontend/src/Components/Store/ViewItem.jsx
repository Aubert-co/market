import React from "react";
import useLockBodyScroll from "../../Hooks";
import { handleOverlayClick } from "../Utils";



export const ViewItem = ({isOpen,product,setShow})=>{
    useLockBodyScroll( isOpen )
    
    return (
        <div className="form-overlay" onClick={(event)=>handleOverlayClick({event,setShow,className:"form-overlay"})}>
            <div className="form-product">
            <img></img>
            <h1>{product.name}</h1>
            <h1>{product.description}</h1>
            <h1>{product.price}</h1>
            </div>
          
        </div>
    )
}