import {useRef} from "react";
import { useNavigate } from "react-router-dom";
import { serviceRegister } from "../Services";
import { FormLoginOrRegister } from "../Components/FormLoginOrRegister";
import type { Message } from "../Context/MessageContext";
import { StyleCreateStore } from "../Styles/RegisterPage";
import { BoxBenefits } from "../Components/BoxBenefits";
import { adLinkRegister, adTextRegister, benefitsRegister } from "../Constants/BenefitsRegister";



export type TypeSubmitRegister ={
    email:string,
    password:string,
    setMessageParams:(msg:Message,duration?:number)=>void,
    name:string

}
export const Register = ()=>{
    const formRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()
    
    const submitForm = async(submitUserDatas:TypeSubmitRegister):Promise<void>=>{
        
        const {status} = await serviceRegister({
            name:submitUserDatas.name,
            password:submitUserDatas.password,
            email:submitUserDatas.email
        } )
    
        if(status === 201){
            setTimeout(()=>{
                navigate('/login');
            },3000)
            return submitUserDatas.setMessageParams({content:"Você criou sua conta com sucesso, você será redirecionado",type:'success'})
        }
        if(status === 422){
            return submitUserDatas.setMessageParams({content:'Nome, email ou senha inválidos.',type:'info'});
        }
       
        if(status === 409){
            return submitUserDatas.setMessageParams({content:'Este email já está cadastrado.',type:'info'})
        }
        submitUserDatas.setMessageParams({content:'Ocorreu um erro inesperado.'+status,type:'info'});
    }
    return (
        <StyleCreateStore>
            <BoxBenefits benefits={benefitsRegister} adText={adTextRegister} adLink={adLinkRegister} formRef={formRef}/>
            <FormLoginOrRegister type={"Register"} submitEvent={submitForm} formRef={formRef}></FormLoginOrRegister>
        </StyleCreateStore>
   )
}