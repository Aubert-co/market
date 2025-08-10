import { loadImage, usableFetch } from "@/Services"
import { serviceGetStores } from "@/Services/store.services"
import { ListContainer } from "@/Styles/StyledUtils"
import type { Store } from "@/types/store.types"
import { shortDescription } from "@/Utils"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

type Props={
    status:number,
    store:Store[]
}
type StoreState = {
    datas:Store[],
    status:number
}
type PropsUserStore = {
    formRef:React.RefObject<HTMLInputElement |null>
}
type PropsListStore = {
    store:Store[],
}
export const ListStore =  ({store,formRef}:PropsListStore & PropsUserStore)=>{
return(
    <div className="list-container">
        {store.map(({photo,description,name,id})=>{
        return (
            <div  className="list-item" key={id}>
                <div className="list-image">
                    <img src={loadImage(photo)} alt="" />
                </div>
                
                <div className="list-info">
                    <p>{name}</p>
                    <p>{shortDescription(description)}</p>    
                </div>
                
            </div>
        )
        })}
        <div className="end" ref={formRef}></div>
    </div>)
}
export const RenderConditionsStore = ({store,status,formRef}:Props &PropsUserStore)=>{
    const isEmpty = store.length ===0
    const hasError = isEmpty && status > 204
    
    if( hasError ){
        return (
        <div ref={formRef} className="text">
            <h1>Algo deu errado ao carregar a sua loja!</h1>
        </div>
        )
    }
    if( isEmpty ){
        return (
            <div ref={formRef} className="text">
                <h1>Você ainda não tem uma loja ,<Link to={"/loja/criar"}>crie uma agora mesmo</Link> </h1>
            </div>
        )
    }
    return (
        <>
            <ListStore formRef={formRef} store={store}/>
        </>
    )
}

export const UserStore =({formRef}:PropsUserStore)=>{
    const [ stores,setStores] = useState<StoreState>({
        datas:[],status:0
    })
    useEffect(()=>{
        usableFetch<Store[]>({setDatas:setStores,service:serviceGetStores})
    },[])
    return (
        <ListContainer>
            <RenderConditionsStore formRef={formRef} status={stores.status} store={stores.datas}/>
        </ListContainer>
    )
}