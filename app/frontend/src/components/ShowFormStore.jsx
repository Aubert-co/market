import React, { useEffect, useState,useRef } from "react";
import analiseImg from '../assets/analise.jpeg';
import facilImg from '../assets/facil.jpeg';
import segImg from '../assets/seg.jpeg';
import storeImg from '../assets/store.png';
import {StyleCreateStore} from '../style/store'
import { FormCreateStore } from "./FormCreateStore";
const datas = [
    {
      title: "Fácil de Usar: Sua Loja, Sua Experiência",
      content: "Na nossa plataforma, simplificamos o processo de criar e gerenciar sua própria loja online. Basta colocar seus produtos e deixar o resto conosco. Nossa interface intuitiva e ferramentas de gerenciamento de loja simplificadas permitem que você personalize sua loja conforme desejar, sem necessidade de conhecimentos técnicos complexos. Concentre-se em expandir sua base de clientes enquanto nós cuidamos da distribuição e da experiência de compra dos seus clientes.",
      img: facilImg
    },
    {
      title: "Segurança garantida",
      content: "Na nossa plataforma, a segurança é a nossa prioridade número um. Com tecnologia de ponta e protocolos de segurança avançados, você pode criar e gerenciar sua loja com total confiança. Nosso compromisso é garantir que suas transações sejam seguras e protegidas, para que você possa se concentrar no crescimento do seu negócio. Junte-se a nós e faça parte de uma comunidade de empreendedores seguros e bem-sucedidos.",
      img:segImg
    },
    {
      title: "Análise Detalhada: Conheça Melhor Seu Público e Suas Vendas",
      content: "Com nossa poderosa ferramenta de análise, você terá insights valiosos sobre o desempenho da sua loja. Saiba quantas pessoas estão acessando seus produtos, quais buscas levaram os clientes até você e como suas vendas estão se saindo. Com essas informações, você pode tomar decisões mais inteligentes e eficazes para impulsionar o crescimento do seu negócio e alcançar ainda mais sucesso.",
      img: analiseImg
    }
  ];
  
export const BoxBeneficts = ({datas,scrollToForm})=>{
    const List =  ()=>datas.map(({title,img,content},ind)=>{
        return <div key={ind}  className="benefit-box" onClick={scrollToForm}>
            <img src={img}></img>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    })
    return <List/>
}


export const ShowFormStore = ({setShowCreate})=>{
    
    const formRef = useRef(null);
    const scrollToForm = () => {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
    };
   
    return(
        <StyleCreateStore>
        <div className="main-container" data-testid="show_storeForm">
            <div className="header">
                <div className="header-content">
                    <img src={storeImg} alt="Loja" className="header-image" />
                    <h1>Por que escolher nossa plataforma para criar sua loja?</h1>
                    <p style={{cursor:"pointer"}} onClick={scrollToForm}>Crie sua loja agora mesmo e comece a faturar com facilidade e segurança.</p>
                </div>
            </div>
            <div className="benefits" data-testid="benefits">
                <h2>Benefícios</h2>
                <div className="benefits-container">
                    <BoxBeneficts scrollToForm={scrollToForm} datas={datas} />
                </div>
            </div>
        </div>
         <FormCreateStore formRef={formRef} setShowCreate={setShowCreate}/>
    </StyleCreateStore>
    )
}
