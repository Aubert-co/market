import React from "react";
import { StatusStyle } from "../style";


export const getInputValue = (ref) =>{
  if(ref?.current && ref.current.value)return ref.current.value
  return ''
}



export const StatusBox = ({text})=>{
    return(
        <StatusStyle>
            <h3>{text}</h3>
        </StatusStyle>
    )
}