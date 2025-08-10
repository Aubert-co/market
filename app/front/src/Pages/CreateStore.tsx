import {  useRef } from "react"
import { BoxCreateStore } from "../Components/Store/BoxCreateStore";
import { BoxMessage } from "../Components/BoxMessages";
import { useMessage } from "../Context/MessageContext";



export const CreateStore = ()=>{
    const {setMessage} = useMessage()
   
    const goToForm = useRef<HTMLInputElement>(null)
   
    const handleStoreCreated = async () => {
       
        setMessage({content:'Loja criada com sucesso!',type:'success'})
    };

return (
    <>
        <BoxMessage/>
        <BoxCreateStore handleStoreCreated={handleStoreCreated} formRef={goToForm} />
    </>
  
);

}