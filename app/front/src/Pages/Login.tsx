import { useNavigate } from "react-router-dom"
import type { TypeMessageParams } from "../Components/BoxMessages"
import { useRef } from "react"
import { serviceLogin } from "../Services"
import { FormLoginOrRegister } from "../Components/FormLoginOrRegister";

export type TypeSubmitLogin = {
        email:string,
        password:string,
        setMessageParams:TypeMessageParams,
        name:string
}

export const Login = ()=>{
    const formRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    const submitForm = async(submitUserDatas:TypeSubmitLogin):Promise<void>=>{
        const {message,status} = await serviceLogin({
            password:submitUserDatas.password,
            email:submitUserDatas.email
        } )
        if(status !== 201){
            return submitUserDatas.setMessageParams({content:message,type:'warning'})
        }
        submitUserDatas.setMessageParams({content:"Você criou sua conta com sucesso, você será redirecionado",type:'sucess'})
        setTimeout(()=>{
            navigate('/login');
        },3000)
    }
    return <FormLoginOrRegister type={"Register"} submitEvent={submitForm} formRef={formRef}></FormLoginOrRegister>
}