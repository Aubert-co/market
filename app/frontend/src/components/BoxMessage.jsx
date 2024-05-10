import React, { useContext, useEffect } from "react";
import { MessageContext } from "../contexts";



export const BoxMessage = ()=>{
    const {messageParams,setMessageParams} = useContext( MessageContext )
    useEffect(()=>{
        setTimeout(()=>{
            setMessageParams({content:'',type:''})
            
        },5000)
    }, [messageParams.content])
    return (
        <>
            {messageParams.content && (
            <div className={"message_"+messageParams.type} data-testid="message_box">
                <p data-testid="message_content">{messageParams.content}</p>
            </div>
            )
            }
        </>
    )
    
}