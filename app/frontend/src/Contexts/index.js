import React ,{ createContext } from "react";



export const SearchContext = createContext({name:'',lowPrice:0,highPrice:1000});


export const MessageContext = createContext({type:'',content:''});

export const CartWindowCtx = createContext(false)

export const SetttingsWindowCtx = createContext(false)