import type React from "react";
import { useRef,useState, type JSX } from "react";
import { Link } from "react-router-dom"
import { getMultiInputValues } from "../Utils";
import { UserFormStyles } from "../Styles/Form";
import { isAValidString, isValidEmail } from "../Utils/checkIsValid";
import type { TypeSubmitRegister } from "../Pages/Register";
import type { TypeSubmitLogin } from "../Pages/Login";
import { useMessage } from "../Context/MessageContext";
import { BoxMessage } from "./BoxMessages";
import { FiEye, FiEyeOff } from "react-icons/fi";
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
     
type Props = {
  placeholder: string;
  refPassword: React.RefObject<HTMLInputElement | null>;
};

export const PasswordInput = ({ placeholder, refPassword }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <input
        type={show ? "text" : "password"}
        ref={refPassword}
        placeholder={placeholder}
        required
        minLength={3}
        className="input"
        data-testid="input"
      />
      <span
        onClick={() => setShow((prev) => !prev)}
        style={{
          position: "absolute",
          right: 10,
          top: "55%",
          transform: "translateY(-50%)",
          cursor: "pointer"
        }}
      >
        {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
      </span>
    </div>
  );
};


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
              <input  ref={refUserEmail} type="email" className="input" data-testid="input" required minLength={3} placeholder="Digite seu email"/>
              {type === "Register" && <input  ref={refUserName} type="text" className="input" data-testid="input" required minLength={3} placeholder="Digite seu nome"/>}

              <PasswordInput refPassword={refUserPassword} placeholder={"Digite sua senha"}/>

              {type === "Register" && <PasswordInput refPassword={refRepeatUserPassword} placeholder={"Repita sua senha"}/>}
          
              <button data-testid="btn_send" onClick={onClick}>{'Enviar'}</button>
              <LoginOrRegister option={type}/>
          </div>
    </UserFormStyles>
  )
}