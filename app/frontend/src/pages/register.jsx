import React, { useRef } from "react";
import {StyleCreateStore} from '../style/store'
import { Form } from "../Components/Form";
import { serviceRegister } from "../services";
import { useNavigate  } from "react-router-dom";
import { BoxBenefits } from "../Components/BoxBenefits";
import { benefitsRegister,adTextRegister,adLinkRegister } from "../Constants/benefits";


export const Register = ()=>{
    const formRef = useRef(null);
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
    return (
        <StyleCreateStore>
            <BoxBenefits benefits={benefitsRegister} adText={adTextRegister} adLink={adLinkRegister} formRef={formRef}/>
            <Form type={"Register"} event={clickToSend} formRef={formRef}/>
        </StyleCreateStore>
    )
    
}