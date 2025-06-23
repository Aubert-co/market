import type React from "react";
import { useRef, type JSX } from "react";
import { Link } from "react-router-dom"
import { getMultiInputValues } from "../Utils";
import { UserFormStyles } from "../Styles/Form";
import { isAValidString, isValidEmail } from "../Utils/checkIsValid";
import type { TypeSubmitRegister } from "../Pages/Register";
import type { TypeSubmitLogin } from "../Pages/Login";

type TypeForm = "Login" | "Register"
type PropsTypeForm = {
  option:TypeForm
}
type SubmitEvent = TypeSubmitRegister | TypeSubmitLogin
type PropsForm = {
  type: TypeForm;
  submitEvent:(datas:SubmitEvent)=>void; 
  formRef: React.RefObject<HTMLInputElement | null>; 
};
export const LoginOrRegister = ({option}:PropsTypeForm):JSX.Element=>
option === "Login" ?
<Link to="/register" data-testid="link_register">Não tem uma conta crie uma agora!</Link> :
<Link data-testid="link_login" to="/login">Já tem uma conta faça login!</Link> ;
     
export const FormLoginOrRegister = ({submitEvent,type,formRef}:PropsForm)=>{
  const refUserEmail = useRef<HTMLInputElement>(null);
  const refUserName = useRef<HTMLInputElement>(null);
  const refUserPassword = useRef<HTMLInputElement>(null);
  const refRepeatUserPassword = useRef<HTMLInputElement>(null);
  const titleText = type === "Login" ? "Login" : "Cadastro"

  const onClick = ():void=>{
    const [email,name,password,repeatPassword] =  getMultiInputValues(
      refUserEmail,refUserName,refUserPassword,refRepeatUserPassword,
    );
    if(!isValidEmail(email))return;
    if(!isAValidString(password))return;
    if(type === "Register"){
      if(!isAValidString(name) ){
        return;
      }
      if(password !== repeatPassword)return;
    }
    submitEvent({name,password,email,setMessageParams:()=>{}})

  }
  return (
    <UserFormStyles>
         <div className="form" ref={formRef}>
              <h1 className="type_form" data-testid="type_form">{titleText}</h1>
                  
              <input  ref={refUserEmail} type="email" className="input" data-testid="input" required minLength={3} placeholder="Digite seu email"/>
              {type === "Register" && <input  ref={refUserName} type="text" className="input" data-testid="input" required minLength={3} placeholder="Digite seu nome"/>}
        
              <input   type="password" ref={refUserPassword} data-testid="input" placeholder={"Digite sua senha"} required minLength={3} className="input"/>

              {type === "Register" && <input  type="password" data-testid="input" ref={refRepeatUserPassword} required minLength={3} placeholder="Repita sua senha" className="input" />}
          
              <button data-testid="btn_send" onClick={onClick}>{'Enviar'}</button>
              <LoginOrRegister option={type}/>
          </div>
    </UserFormStyles>
  )
}