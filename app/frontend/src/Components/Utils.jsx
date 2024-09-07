import React from "react";
import { StatusStyle } from "../style";

export const StatusBox = ({text})=>{
    return(
        <StatusStyle>
            <h3>{text}</h3>
        </StatusStyle>
    )
};
export const getInputValue = (ref) =>{
    if(ref?.current && ref.current.value)return ref.current.value;
    return '';
  };
export const getMultiInputValues = (...refs)=>{
   return refs.map((val)=>{
        return getInputValue(val);
    });
};
export const isAlphanumeric = (input)=>{
    const regex = /^[a-zA-Z0-9]+$/; 
    return regex.test(input); 
}
