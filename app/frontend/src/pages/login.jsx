import React, { useRef, useState } from "react";
import { Form } from "../Components/Form";
import { serviceLogin } from "../services";
import { Route, BrowserRouter as Router ,Routes,useNavigate  } from "react-router-dom";


export const Login = ()=>{
   
    const navigate = useNavigate()

    const clickToSend =async ({name,password,setMessageParams})=>{
        
       const {token,status} = await serviceLogin({name,password})
        
       if(!token || status !== 200){
        setMessageParams({content:"Algo deu errado"})
        return  
      
       }

        localStorage.setItem('token',token)
        setMessageParams({content:"Você fez login com sucesso, você será redirecionado"})

        setTimeout(()=>{
            navigate("/")
        },3000)
        
    }
    return <Form type={"Login"} event={clickToSend} />
    
}