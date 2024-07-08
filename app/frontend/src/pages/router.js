import React,{useState} from "react";
import { Route, BrowserRouter as Router ,Routes  } from "react-router-dom";
import  Home  from "./home";
import { Login } from "./login";
import { MessageContext, SearchContext } from "../contexts"
import { Register } from "./register";
import {GlobalStyles} from '../style/index'
import { Store } from "./store";

const DEFAULT_MESSAGE = {content:'',type:''}
export const App = () => {
  const [messageParams,setMessageParams] = useState( DEFAULT_MESSAGE )
  
  return (
    <MessageContext.Provider value={ {messageParams,setMessageParams} }>
    <GlobalStyles/>
    <Router >

        <Routes >
 
            <Route path="/" element={<Home />} />
            <Route path="/store"  element={<Store/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </Router>
    </MessageContext.Provider>
  );
};

