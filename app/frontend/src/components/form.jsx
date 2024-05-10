import React, { useEffect, useRef, useState } from "react";
import {Link} from 'react-router-dom'



export const LoginOrRegister = ({type})=>type === "Login" ? <Link to="/register" data-testid="link_register">Não tem uma conta crie uma agora!</Link> :
 <Link data-testid="link_login" to="/login">Já tem uma conta faça login!</Link> 
     

export const Form  = ({event,type})=>{
    const refName = useRef('')
    const refPassword = useRef('')
    const refRepeatPassword = useRef('')
    const [message,setMessage] = useState({content:''})

    useEffect(()=>{
        setTimeout(()=>{
            setMessage({content:""})
        },5000)
    },[message])
    const onClick =()=>{
        const name = refName.current.value
        const password = refPassword.current.value
        const repeatPass = refRepeatPassword.current.value
    
     
        if(name.length < 3 )return setMessage({content:'Nome muito curto'})
        if(password.length < 5  )return setMessage({content:'Senha muito curta'})
        if(type === 'Register' && password !== repeatPass)return setMessage({content:'As senhas não concindem'})
        
        event({name,password,setMessage})
    }
    return (
        <div>
            <div className="form">
                    <h1 className="type_form" data-testid="type_form">{type}</h1>
                <div className="message" >
                   <h3 data-testid="message">{message.content}</h3>
                </div>

                <input ref={refName} type="text" className="input" data-testid="input" required minLength={3} placeholder="Digite seu nome"/>
          
                <input type="password" ref={refPassword} data-testid="input" placeholder={"Digite sua senha"} required minLength={3} className="input"/>

                {type === "Register" && <input type="password" data-testid="input" ref={refRepeatPassword} required minLength={3} placeholder="Repita sua senha" className="input" />}
            </div>

            <button data-testid="btn_send" onClick={onClick}>{type}</button>
                <LoginOrRegister type={type}/>
            </div>
    
    )
}