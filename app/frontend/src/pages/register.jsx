import React, { useRef } from "react";
import { InputText } from "../components/utils";
import { Form } from "../components/form";
import { serviceRegister } from "../services";
import descontoImg from '../assets/desconto.png'
import freteGratisImg from '../assets/delivery.png'
import entregaRapidaImg from '../assets/deliveryMoto.png'
import { Route, BrowserRouter as Router ,Routes,useNavigate  } from "react-router-dom";
import { BoxBenefits } from "../components/BoxBenefits";
import { FormCreateStore } from "../components/FormCreateStore";

const adText = "Por que criar uma conta na nossa plataforma de e-commerce?";
const adLink = "Cadastre-se agora e aproveite cupons de desconto exclusivos e muito mais!";

const benefits = [
    {
      title: "Descontos Exclusivos: Mais Vantagens para Você",
      content: "Ao criar uma conta na nossa plataforma, você terá acesso a cupons de desconto exclusivos, válidos para toda a loja. Oferecemos promoções especiais regularmente, ajudando você a economizar enquanto compra os produtos que mais deseja.",
      img: descontoImg
    },
    {
      title: "Frete Grátis: Receba Seus Produtos Sem Custo Adicional",
      content: "Cadastre-se e aproveite o frete grátis em suas compras! Nossa plataforma oferece condições especiais para que você possa receber seus produtos em casa sem pagar nada a mais. Faça suas compras sem se preocupar com o custo da entrega.",
      img: freteGratisImg
    },
    {
      title: "Entrega Super Rápida: Receba Seu Pedido em Tempo Recorde",
      content: "Na nossa plataforma, a rapidez na entrega é uma prioridade. Com parcerias logísticas de alta eficiência, garantimos que seus pedidos cheguem até você no menor tempo possível. Crie sua conta e experimente a velocidade da nossa entrega.",
      img: entregaRapidaImg
    },
   
];

export const Register = ()=>{
   
    const navigate = useNavigate()
    const clickToSend =async({name,password,setMessage})=>{
        const {message,status} = await serviceRegister({name,password})
        
       
        if( status !== 201){
         setMessage({content:"Algo deu errado"})
         return  
       
        }
 
         setMessage({content:"Você criou sua conta com sucesso, você será redirecionado"})
 
         setTimeout(()=>{
            navigate("/login")
         },3000)
         
    }
    return (
        <div className="box_store">
            <BoxBenefits beneficts={benefits} adText={adText} adLink={adLink} Form={ FormCreateStore}/>
           
        </div>
       
    )
    
}