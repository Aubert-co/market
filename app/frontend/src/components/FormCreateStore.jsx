import React,{ useRef,useState,useEffect } from "react";

import { serviceCreateStore } from "../services";

export const FormCreateStore = ({setShowCreate,formRef}) => {
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
        formData.append('file', image,image.name);
        const {status} = await serviceCreateStore(formData)

        if(status === 201){
            setMessage({content:'Sua loja foi criada com sucesso!'})
            setTimeout(()=>{
                setShowCreate(false)
            },2000)
            return 
        }
        if(status ===401)return setMessage({content:'Você precisá logar para criar uma loja!'})
        if(status >=500)return setMessage({content:'Algo deu errado ao criar sua loja!'})

    };
    return (
        <div ref={formRef} className="create_store" data-testid="formCreate_store">
         
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