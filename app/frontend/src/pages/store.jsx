import React, { useEffect, useState ,useRef} from "react";
import { fetchData } from "../hooks";
import { serviceStore } from "../services";
import { BoxBenefits } from "../components/BoxBenefits";
import { AdminStore } from "../components/adminStore";
import { FormCreateStore } from "../components/FormCreateStore";
import {StyleCreateStore} from '../style/store'
import analiseImg from '../assets/analise.png';
import facilImg from '../assets/facil.png';
import segImg from '../assets/seg.png';
import entregaImg from '../assets/delivery.png';
const adText ="Por que escolher nossa plataforma para criar sua loja?"
const adLink= "Crie sua loja agora mesmo e comece a faturar com facilidade e segurança."

const benefits = [
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
    },
    {
        title: "Logística Simplificada: Foque no Que Importa, Nós Cuidamos das Entregas",
        content: "Com nosso sistema de entrega integrado, você pode se concentrar em vender e gerenciar sua loja, enquanto nós cuidamos de todo o processo logístico. Desde a coleta dos produtos até a entrega na porta do cliente, garantimos que cada pedido seja tratado com o máximo cuidado e eficiência. Assim, você tem mais tempo para focar no crescimento do seu negócio, sabendo que suas entregas estão em boas mãos.",
        img: entregaImg
      }
  ];
  
export const Store = () => {
    const [store, setStore] = useState({ datas: 'Carregando', status: '' });
    const [showCreateStore, setShowCreate] = useState(false);
    const formRef = useRef(null);
    useEffect(() => {
        fetchData({ service: serviceStore, setItems: setStore });
    }, []); 
    useEffect(() => {
        if (store.datas !== 'Carregando' && Array.isArray(store.datas) && store.datas.length === 0) {
            setShowCreate(true);
        }
    }, [store]); 
    
    if (showCreateStore) return (
        <StyleCreateStore>
            <BoxBenefits benefits={benefits} adText={adText} adLink={adLink} formRef={formRef}/>
            <FormCreateStore formRef={formRef}/>
        </StyleCreateStore>
    )
    
    
    return (
        <div className="box_store" data-testid="box_store">
            {store.datas === 'Carregando' && 'Carregando'}
            <AdminStore/>
        </div>
    );
};
