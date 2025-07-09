import { useEffect, useRef, useState } from "react"
import {  serviceGetStores, type ResponeGetStore, type Store } from "../Services"
import { RenderStores } from "../Components/Store/RenderStores";
import { BoxCreateStore } from "../Components/Store/BoxCreateStore";

type ParamsFetch = {
    setDatas: (params: { data: Store[] ,status:number}) => void;
    service:()=>Promise<ResponeGetStore>
}
const fetchDatas = async({setDatas,service}:ParamsFetch)=>{
    const {store,status} = await service()
    setDatas({data:store,status})
}
type StoresStates = {
    data:Store[];
    status:number
}


export const MyStores = ()=>{
    const [stores,setStores] = useState<StoresStates>({
        data:[],status:0
    })
    const goToForm = useRef<HTMLInputElement>(null)
    const [showFormCreateStore,setShowFormCreate] = useState(false)
    useEffect(()=>{
        fetchDatas({setDatas:setStores,service:serviceGetStores})
      
    },[])
    useEffect(()=>{
        if(stores.status >0 && stores.data.length ===0)setShowFormCreate(true)
    },[stores])
    const createStore = ()=>setShowFormCreate(true)
    if(stores.status === 0)return <h1>carregando...</h1>
    
    return(
        <div className="my_store">
            <button onClick={createStore}>Cria loja</button>
            {stores.data.length >0 && <RenderStores store={stores.data}/> }
            <BoxCreateStore storeLenght={stores.data.length} formRef={goToForm} setShowForm={setShowFormCreate} showForm={showFormCreateStore}/>
        </div>
    )
}