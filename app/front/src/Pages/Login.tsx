import { useNavigate } from "react-router-dom"
import type { Message } from "../Context/MessageContext";
import { useRef } from "react"
import { serviceLogin } from "../Services"
import { FormLoginOrRegister } from "../Components/FormLoginOrRegister";

export type TypeSubmitLogin = {
        email:string,
        password:string,
        setMessageParams:(msg:Message,duration?:number)=>void,
        name:string
}

export const Login = ()=>{
    const formRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    const submitForm = async(submitUserDatas:TypeSubmitLogin):Promise<void>=>{
        const {status} = await serviceLogin({
            password:submitUserDatas.password,
            email:submitUserDatas.email
        } )
        if(status !== 201){
            return submitUserDatas.setMessageParams({content:'Falha ao realizar login',type:'error'})
        }
        submitUserDatas.setMessageParams({content:"Você criou sua conta com sucesso, você será redirecionado",type:'success'})
        setTimeout(()=>{
            navigate('/login');
        },3000)
    }
    return <FormLoginOrRegister type={"Login"} submitEvent={submitForm} formRef={formRef}></FormLoginOrRegister>
}