import { useEffect, useRef, useState } from "react"
import {  serviceGetStores, type ResponseGetStore, type Store } from "../Services/StoreServices"
import { RenderStores } from "../Components/Store/RenderStores";
import { BoxCreateStore } from "../Components/Store/BoxCreateStore";

import { BoxMessage } from "../Components/BoxMessages";
import { useMessage } from "../Context/MessageContext";


type ParamsFetch = {
    setDatas: (params: { data: Store[] ,status:number}) => void;
    service:()=>Promise<ResponseGetStore>
}
const fetchDatas = async({setDatas,service}:ParamsFetch)=>{
    const {store,status} = await service()
    
    setDatas({data:store,status})
}
type StoresStates = {
    data:Store[];
    status:number
}


export const AdminStore = ()=>{
    const {setMessage} = useMessage()
    const [stores,setStores] = useState<StoresStates>({
        data:[],status:0
    })
    const goToForm = useRef<HTMLInputElement>(null)
    const [setShowBox,setShowCreate] = useState(false)
    useEffect(()=>{
        fetchDatas({setDatas:setStores,service:serviceGetStores})
    },[])
    const handleStoreCreated = async () => {
        setShowCreate(false);
        await fetchDatas({ setDatas: setStores, service: serviceGetStores }); 
        setMessage({content:'Loja criada com sucesso!',type:'success'})
    };

    useEffect(() => {
        if (stores.status >=200) {
         
            setShowCreate( stores.data.length === 1 );
        }
    }, [stores,setShowCreate]);




return (
  <div className="my_store">
    <BoxMessage/>
    {setShowBox ? (
          <RenderStores store={stores.data} />
    ) : (
        <BoxCreateStore handleStoreCreated={handleStoreCreated} formRef={goToForm} />
    )}
  </div>
);

}