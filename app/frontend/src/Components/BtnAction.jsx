import React,{useContext,useState,useEffect} from "react";
import { MessageContext } from "../Contexts";

export const BtnAction =({product_id,service,text,message,quantity=1})=>{
    const {messageParams,setMessageParams} = useContext( MessageContext );

    const event = async()=>{
        
        const {status} =  await service({product_id,quantity});

        if(status === 401)return setMessageParams({content:'Login necessário para adicionar ao carrinho.',type:'error'});
            
        if(message && status === 201)return setMessageParams({content:message.sucess,type:'sucess'});
        if(status > 401)  setMessageParams({content:'Algo deu errado',type:'error'});
        
    }
    if(text && text.props)return React.cloneElement(text,{onClick:event,className:'btn_action',"data-testid":"btn_component"});
    return (
        <button onClick={event} className="btn_action" data-testid="btn_action">
           {text}
        </button>
    );
};