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
        
        const {message,status} = await serviceRegister({
            name:submitUserDatas.name,
            password:submitUserDatas.password,
            email:submitUserDatas.email
        } )
        console.log(message)
        if(status !== 201){
            return submitUserDatas.setMessageParams({content:message,type:'error'})
        }
        submitUserDatas.setMessageParams({content:"Você criou sua conta com sucesso, você será redirecionado",type:'success'})
        setTimeout(()=>{
            navigate('/login');
        },3000)
    }
    return (
        <StyleCreateStore>
            <BoxBenefits benefits={benefitsRegister} adText={adTextRegister} adLink={adLinkRegister} formRef={formRef}/>
            <FormLoginOrRegister type={"Register"} submitEvent={submitForm} formRef={formRef}></FormLoginOrRegister>
        </StyleCreateStore>
   )
}