import React, { useRef } from "react";
import { InputText } from "../components/utils";
import { Form } from "../components/form";
import { serviceRegister } from "../services";

import { Route, BrowserRouter as Router ,Routes,useNavigate  } from "react-router-dom";

export const Register = ()=>{
   
    const navigate = useNavigate()
    const clickToSend =async({name,password,setMessage})=>{
        const {message,status} = await serviceRegister({name,password})
        
       
        if( status !== 201){
         setMessage({content:"Algo deu errado"})
         return  
       
        }
 
         setMessage({content:"Você criou sua conta com sucesso, você será redirecionado"})
 
         setTimeout(()=>{
            navigate("/login")
         },3000)
         
    }
    return <Form type={"Register"} event={clickToSend} />
    
}