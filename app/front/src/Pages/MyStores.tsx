import { useEffect, useRef, useState } from "react"
import {  serviceGetStores, type ResponeGetStore, type Store } from "../Services"
import { RenderStores } from "../Components/Store/RenderStores";
import { BoxCreateStore } from "../Components/Store/BoxCreateStore";
import { Loading } from "../Components/Loading";
import { StyleBtn } from "../Styles/Form";
import { Actions } from "../Styles/MyStoresStyle";
import storeImg from '../Assets/store.png'
const datas = [
  {
    "id": 1,
    "name": "Loja Tech",
    "description": "Produtos eletrônicos de última geração e acessórios premium.",
    "photo": storeImg
  },
  {
    "id": 2,
    "name": "Super Moda",
    "description": "Roupas e acessórios para todas as estações.",
    "photo": storeImg
  },
  {
    "id": 3,
    "name": "Casa & Conforto",
    "description": "Itens para deixar sua casa mais aconchegante.",
    "photo": storeImg
  }
  ]
type ParamsFetch = {
    setDatas: (params: { data: Store[] ,status:number}) => void;
    service:()=>Promise<ResponeGetStore>
}
const fetchDatas = async({setDatas,service}:ParamsFetch)=>{
    //const {store,status} = await service()
    const store = datas
    setDatas({data:store,status:200})
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
    const [showFormCreate,setShowFormCreate] = useState(false)
    useEffect(()=>{
        fetchDatas({setDatas:setStores,service:serviceGetStores})
      
    },[])
    useEffect(()=>{
        if(stores.status >201 && stores.data.length ===0)setShowFormCreate(true)
    },[stores])

    const showForm = () => {
        setShowFormCreate(true);
        requestAnimationFrame(() => {
            if (goToForm.current) {
                goToForm.current.scrollIntoView({ behavior: 'smooth' });
            }
        });
    };

   
    if(stores.status === 0 && stores.data.length ===0)return <Loading/>
    
    return(
        <div className="my_store">
          <Actions>
          
            <StyleBtn onClick={showForm} $bg="#007bff" $hoverBg="#0056b3">
                Criar Loja
            </StyleBtn>

            <StyleBtn $bg="#6c757d" $hoverBg="#5a6268">
                Voltar ao Início
            </StyleBtn>

        </Actions>

            {stores.data.length >0 && <RenderStores store={stores.data}/> }
            <BoxCreateStore storeLenght={stores.data.length} formRef={goToForm} setShowForm={setShowFormCreate} showForm={showFormCreate}/>
        </div>
    )
}