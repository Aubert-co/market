import React,{useState} from "react";
import { Route, BrowserRouter as Router ,Routes  } from "react-router-dom";
import  Home  from "./home";
import { Login } from "./login";
import {  CartWindowCtx, SearchContext, SetttingsWindowCtx ,MessageContext} from "../Contexts";
import { Register } from "./register";
import {GlobalStyles} from '../style/index'
import { Store } from "./store";
import Product from "./product";
const DEFAULT_MESSAGE = {content:'',type:''};
const DEFAULT_SEARCH= {name:'',lowPrice:0,highPrice:1000};
export const App = () => {
  const [messageParams,setMessageParams] = useState( DEFAULT_MESSAGE )
  const [searchParams,setSearchParams]= useState( DEFAULT_SEARCH  );
  const [isWindowCart,setIsWindowCart] = useState(false);
  const [isWindowProfile,setIsWindowProfile] = useState(false);
  return (
    <MessageContext.Provider value={ {messageParams,setMessageParams} }>
    <SearchContext.Provider value={{searchParams,setSearchParams}}>
    <SetttingsWindowCtx.Provider value={{isWindowProfile,setIsWindowProfile}}>
    <CartWindowCtx.Provider value={{isWindowCart,setIsWindowCart}}>
      <GlobalStyles/>
      <Router >
          <Routes >
              <Route path="/" element={<Home />} />
              <Route path="/store"  element={<Store/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/product/:id" element={<Product/>}/>
          </Routes>
      </Router>
    </CartWindowCtx.Provider>
    </SetttingsWindowCtx.Provider>
    </SearchContext.Provider>
    </MessageContext.Provider>
    
  );
};

