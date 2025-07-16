import {useRef} from "react";
import { useNavigate } from "react-router-dom";
import { serviceRegister } from "../Services/index";
import { FormLoginOrRegister } from "../Components/FormComponents/FormLoginOrRegister";
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
    
    const submitForm = async({name,password,email,setMessageParams}:TypeSubmitRegister):Promise<void>=>{
        
        const {status} = await serviceRegister({name,password,email})
    
        if(status === 201){
            setTimeout(()=>{
                navigate('/login');
            },3000)
            return setMessageParams({content:"Você criou sua conta com sucesso, você será redirecionado",type:'success'})
        }
        if(status === 422){
            return setMessageParams({content:'Nome, email ou senha inválidos.',type:'info'});
        }
       
        if(status === 409){
            return setMessageParams({content:'Este email já está cadastrado.',type:'info'})
        }
        setMessageParams({content:'Ocorreu um erro inesperado.'+status,type:'info'});
    }
    return (
        <StyleCreateStore>
            <BoxBenefits benefits={benefitsRegister} adText={adTextRegister} adLink={adLinkRegister} formRef={formRef}/>
            <FormLoginOrRegister type={"Register"} submitEvent={submitForm} formRef={formRef}></FormLoginOrRegister>
        </StyleCreateStore>
   )
}