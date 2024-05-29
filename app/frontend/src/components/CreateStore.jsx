import React, { useEffect, useState,useRef } from "react";
import { fetchData } from "../hooks";
import { serviceCreateStore } from "../services";
import analiseImg from '../assets/analise.jpeg';
import facilImg from '../assets/facil.jpeg';
import segImg from '../assets/seg.jpeg';
import storeImg from '../assets/store.png';
import {StyleCreateStore} from '../style/store'
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
  
export const BoxBeneficts = ({datas,formRef})=>{
    
    const scrollToForm = () => {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
      
    
    };
    const List =  ()=>datas.map(({title,img,content})=>{
        return <div className="benefit-box" onClick={scrollToForm}>
            <img src={img}></img>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    })
    return <List/>
}
export const CreateStore = ({setShowCreate,formRef}) => {
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    const categoryRef = useRef(null);
    const imageRef = useRef(null);
    const [message,setMessage] = useState({content:''})

    useEffect(()=>{
        const timer = setTimeout(() => {
            setMessage({ content: "" });
          }, 5000);
      
          return () => clearTimeout(timer);
    },[message.content])

    const handleSubmit = async() => {
        const name = nameRef.current.value;
        const description = descriptionRef.current.value;
        const category = categoryRef.current.value;
        const image = imageRef.current.files[0];
       
        if(!name || !description || !category || !image)return setMessage({content:'Os campos nome , descrição , categoria e imagem são obrigatorios'})
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('image', image);
        const {status} = await serviceCreateStore(formData)

        if(status === 201){
            setMessage({content:'Sua loja foi criada com sucesso!'})
            setTimeout(()=>{
                setShowCreate(false)
            },5000)
            return 
        }
        if(status ===401)return setMessage({content:'Você precisá logar para criar uma loja!'})
        if(status >=500)return setMessage({content:'Algo deu errado ao criar sua loja!'})

    };
  

   
    return (
        <div ref={formRef} className="create_store" data-testid="create_store">
         
            <div className="form_store">
                <h1>Crie sua loja!</h1>
                <div className="message" >
                   <h3 data-testid="message">{message.content}</h3>
                </div>
                <div className="form">
                    <h3>Escolha um nome marcante</h3>
                    <input data-testid="name_store" type="text" ref={nameRef} required />
                </div>
                <div className="form">
                    <h3>Escolha uma descrição que melhor descreva a sua loja</h3>
                    <textarea data-testid="description_store" ref={descriptionRef}></textarea>
                </div>
                <div className="form">
                    <h3>Escolha a categoria que melhor encaixa os produtos que sua loja irá vender</h3>
                    <select data-testid="category_store" ref={categoryRef} required>
                        <option value="electronics">Eletrônicos</option>
                        <option value="clothing">Roupas</option>
                        <option value="home">Casa</option>
                        <option value="toys">Brinquedos</option>
                        <option value="beauty">Beleza</option>
                    </select>
                </div>
                <div className="form">
                    <h3>Escolha a imagem que melhor representa a sua loja!</h3>
                    <input data-testid="img_store" type="file" ref={imageRef} required/>
                    <button data-testid="btn_submit" onClick={handleSubmit}>Enviar</button>
                </div>
               
            </div>
        </div>
    );
};

export const ShowForm = ({showCreateStore,setShowCreate})=>{
    
    const formRef = useRef(null);

   
    return(
        <StyleCreateStore>
        <div className="main-container" data-testid="text_store">
            <div class="header">
                <div class="header-content">
                    <img src={storeImg} alt="Loja" class="header-image" />
                    <h1>Por que escolher nossa plataforma para criar sua loja?</h1>
                    <p onClick={()=>setShowCreate(!showCreateStore)}>Crie sua loja agora mesmo e comece a faturar com facilidade e segurança.</p>
                </div>
            </div>
            <div class="benefits">
                <h2>Benefícios</h2>
                <div class="benefits-container">
                    <BoxBeneficts formRef={formRef} datas={datas} />
                </div>
            </div>
        </div>
         <CreateStore formRef={formRef} setShowCreate={setShowCreate}/>
    </StyleCreateStore>
    )
}
