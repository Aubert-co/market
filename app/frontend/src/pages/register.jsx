import React, { useRef } from "react";
import { InputText } from "../components/utils";
import { Form } from "../components/form";
import { serviceRegister } from "../services";


export const Register = ({navigate})=>{
   
    
    const clickToSend =async({name,password,setMessage})=>{
        const {message,status} = await serviceRegister({name,password})
        
        
        if( status !== 200){
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