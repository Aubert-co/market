import React, { useContext, useEffect } from "react";
import { MessageContext } from "../Contexts";



export const BoxMessage = ()=>{
    const {messageParams,setMessageParams} = useContext( MessageContext )
    useEffect(()=>{
        
        if(messageParams.content){
            const timer = setTimeout(()=>{
                setMessageParams({content:'',type:''});
            },5000)
    
            return () => clearTimeout(timer);
        }
    }, [messageParams.content, setMessageParams]);
    return (
        <>
            {messageParams.content && (
                <div className={"message_"+messageParams.type} data-testid="message_box">
                    <p data-testid="message_content">{messageParams.content}</p>
                </div>
            )}
        </>
    );
    
};