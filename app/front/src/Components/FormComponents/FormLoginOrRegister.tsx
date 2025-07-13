import type React from "react";
import { useRef, type JSX } from "react";
import { Link } from "react-router-dom"
import { getMultiInputValues } from "../../Utils";
import { StyleBtn, UserFormStyles } from "../../Styles/Form";
import { isAValidString, isValidEmail } from "../../Utils/checkIsValid";
import type { TypeSubmitRegister } from "../../Pages/Register";
import type { TypeSubmitLogin } from "../../Pages/Login";
import { useMessage } from "../../Context/MessageContext";
import { BoxMessage } from "../BoxMessages";
import { PasswordInput } from "./PasswordInput";
import { InputWithLabel } from "./InputWithLabel";

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
<Link to="/registro" data-testid="link_register">Não tem uma conta crie uma agora!</Link> :
<Link data-testid="link_login" to="/login">Já tem uma conta faça login!</Link> ;
     



export const FormLoginOrRegister = ({submitEvent,type,formRef}:PropsForm)=>{
  const refUserEmail = useRef<HTMLInputElement>(null);
  const refUserName = useRef<HTMLInputElement>(null);
  const refUserPassword = useRef<HTMLInputElement>(null);
  const refRepeatUserPassword = useRef<HTMLInputElement>(null);
  const titleText = type === "Login" ? "Login" : "Cadastro"
  const {setMessage} = useMessage();
  
  const onClick = ():void=>{
    const [email,name,password,repeatPassword] =  getMultiInputValues(
      refUserEmail,refUserName,refUserPassword,refRepeatUserPassword,
    );
    if(!isValidEmail(email)){
      return setMessage({content:'Digite um email valido',type:'info'});
    }
    if(!isAValidString(password)){
      return  setMessage({content:'Digite uma senha valida',type:'info'});
    }
    if(type === "Register"){
      if(!isAValidString(name) ){
        return setMessage({content:'Digite um nome valido',type:'info'});;
      }
      if(password !== repeatPassword)return setMessage({content:'As senhas não coincidem',type:'info'});
    }
    submitEvent({name,password,email,setMessageParams:setMessage})

  }
  return (
    <UserFormStyles>
         <div className="form" ref={formRef}>
              <h1 className="type_form" data-testid="type_form">{titleText}</h1>
              <BoxMessage/>

              <InputWithLabel textLabel="Digite seu email!" inputName={"email"}>
                <input  
                id="email" 
                ref={refUserEmail} type="email" 
                className="input-form"
                required minLength={3}
                placeholder="Ex: joao@gmail.com"
                autoComplete="email"/>
              </InputWithLabel>

              {type === "Register" &&
                <InputWithLabel textLabel="Digite seu nome!" inputName={"name"}>
                  <input id="name" 
                  ref={refUserName}
                  type="text" 
                  className="input-form" 
                  required minLength={3} 
                  placeholder="Ex: joao"
                  maxLength={15}
                  />
                
                </InputWithLabel>
                
                }

              <InputWithLabel textLabel="Digite sua senha!" inputName={"password"}>
                <PasswordInput 
                id="password" 
                refPassword={refUserPassword} 
                placeholder={"Digite uma senha forte!"}/>
              
              </InputWithLabel>

              {type === "Register" &&
               <InputWithLabel textLabel="Repita sua senha!" inputName="repeatPassword">
                <PasswordInput 
                id="repeatPassword" 
                refPassword={refRepeatUserPassword}
                placeholder={"Igual a do campo senha"}/>
               </InputWithLabel>}
          
              <StyleBtn data-testid="btn_send" onClick={onClick}>{'Enviar'}</StyleBtn>
              <LoginOrRegister option={type}/>
          </div>
    </UserFormStyles>
  )
}