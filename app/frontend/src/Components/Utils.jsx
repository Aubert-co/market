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
export const existValue = (datas,id)=> datas.some((val)=>val.id === id)

export const roundANumber = (number) => {
   
    return Math.round(number);
};

export const changeDisplayToNone = (className)=>{
    const divClass = document.querySelector(className)
    if( divClass )divClass.style.display="none"
}

export const filterArray =(array)=>{
    return array.filter((val)=>!val.saved)
    .map((val)=>{
        if(val.deleted)return {id:val.id,deleted:true}
        return {id:val.id,quantity:val.quantity}
    })
}

export const filterNotDeleteItems = (array)=>{
    return array.filter((val)=>!val.deleted)
    .map((val)=>{
        return {...val,saved:true}
    })
}
export const getTotally = (datas)=>{
    if(datas.length === 1)return datas[0].total || 0
    return datas.reduce((acc, val) => {
        const total = val.total || 0
       return acc + total
    }, 0);
  }
  