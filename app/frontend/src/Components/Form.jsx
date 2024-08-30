import React, { useEffect, useRef, useState ,useContext} from "react";
import {Link} from 'react-router-dom'
import { getInputValue } from "./Utils";
import { MessageContext } from "../Contexts";
import {BoxMessage} from './BoxMessage'


export const LoginOrRegister = ({type})=>type === "Login" ? 
<Link to="/register" data-testid="link_register">Não tem uma conta crie uma agora!</Link> :
<Link data-testid="link_login" to="/login">Já tem uma conta faça login!</Link> ;
     

export const Form  = ({event,type,formRef})=>{
    const refName = useRef('');
    const refPassword = useRef('');
    const refRepeatPassword = useRef('');
    const { setMessageParams } = useContext(MessageContext);
   
    const onClick =()=>{
        const name = getInputValue(refName)
        const password = getInputValue(refPassword)
        const repeatPass = getInputValue(refRepeatPassword)
    
        if(name.length < 3 )return setMessageParams({content:'Nome muito curto',type:'warning'})
        if(password.length < 5  )return setMessageParams({content:'Senha muito curta',type:'warning'})
        if(type === 'Register' && password !== repeatPass)return setMessageParams({content:'As senhas não concindem',type:'warning'})
        
        event({name,password,setMessageParams})
    }
    return (
        <div>
            <div className="form" ref={formRef}>
                    <h1 className="type_form" data-testid="type_form">{type}</h1>
                    
                <BoxMessage/>

                <input ref={refName} type="text" className="input" data-testid="input" required minLength={3} placeholder="Digite seu nome"/>
          
                <input type="password" ref={refPassword} data-testid="input" placeholder={"Digite sua senha"} required minLength={3} className="input"/>

                {type === "Register" && <input type="password" data-testid="input" ref={refRepeatPassword} required minLength={3} placeholder="Repita sua senha" className="input" />}
            </div>

            <button data-testid="btn_send" onClick={onClick}>{type}</button>
                <LoginOrRegister type={type}/>
            </div>
    
    )
}