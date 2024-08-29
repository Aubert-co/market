import React,{ useRef,useContext, useState, useEffect } from "react";

import { serviceCreateStore } from "../../services";
import { BoxMessage } from "../BoxMessage";
import { MessageContext } from "../../contexts";
import { getInputValue } from "../utils";
import { useNavigate } from "react-router-dom";


const handleSubmit = async(inputsRefs,setMessage) => {
    const name = getInputValue(inputsRefs.name)
    const description = getInputValue(inputsRefs.description)
    const category = getInputValue(inputsRefs.category)
    const image = inputsRefs.image.current.files[0];
    
   
    if(!name || !description || !category || !image){
      
        return setMessage({content:'Os campos nome , descrição , categoria e imagem são obrigatorios',type:'warning'})
    }
    const formData = new FormData();
    
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('file', image,image.name);
    const {status} = await serviceCreateStore(formData)
    return status
   
};  

   
const handleStatus = ({ status, setMessage, setShowCreate, navigate }) => {
    if (status === 201) {
        setMessage({ content: 'Sua loja foi criada com sucesso!', type: 'success' });
        setTimeout(() => {
            setShowCreate(false);
        }, 3000);
        return;
    }

    if (status === 401) {
        setMessage({ content: 'Você precisá logar para criar uma loja!', type: 'error' });
        setTimeout(() => {
            navigate('/login'); 
        }, 3000);
        return;
    }

    if (status >= 500) {
        setMessage({ content: 'Algo deu errado ao criar sua loja!', type: 'error' });
    }
};

export const FormCreateStore = ({setShowCreate,formRef}) => {
    const {setMessageParams} = useContext( MessageContext )
    const inputsRefs = {name:useRef(null),description:useRef(null),category:useRef(null),image:useRef(null)}
    const navigate = useNavigate(); 
 
    const onClick =async ()=>{
        const status = await handleSubmit(inputsRefs,setMessageParams)
        handleStatus({status,setMessage:setMessageParams,setShowCreate,navigate})
    }
    
    return (
        <div ref={formRef} className="create_store" data-testid="formCreate_store">
         
            <div className="form_store">
                <h1>Crie sua loja!</h1>
                    <BoxMessage/>
                <div className="form">
                    <h3>Escolha um nome marcante</h3>
                    <input data-testid="name_store" type="text" ref={inputsRefs.name} required />
                </div>
                <div className="form">
                    <h3>Escolha uma descrição que melhor descreva a sua loja</h3>
                    <textarea data-testid="description_store" ref={inputsRefs.description}></textarea>
                </div>
                <div className="form">
                    <h3>Escolha a categoria que melhor encaixa os produtos que sua loja irá vender</h3>
                    <select data-testid="category_store" ref={inputsRefs.category} required>
                        <option value="electronics">Eletrônicos</option>
                        <option value="clothing">Roupas</option>
                        <option value="home">Casa</option>
                        <option value="toys">Brinquedos</option>
                        <option value="beauty">Beleza</option>
                    </select>
                </div>
                <div className="form">
                    <h3>Escolha a imagem que melhor representa a sua loja!</h3>
                    <input data-testid="img_store" type="file" ref={inputsRefs.image} required/>
                    <button data-testid="btn_submit" onClick={onClick}>Enviar</button>
                </div>
               
            </div>
        </div>
    );
};