import React, { useEffect, useState } from "react";
import { fetchData } from "../Hooks";
import { ListItems } from "./ListItems";


const IsLoading = ()=><h1 data-testid="loading">carregando...</h1>

export const BoxItems = ({searchParams,typeComponent,service})=>{
    const [items, setItems] = useState({ datas: 'carregando', status:''});
   
    useEffect(() => {
        fetchData({service,body:searchParams,setItems});
    }, [searchParams]);
    
    if(items.status !== '' && items.status >201 ) return <h1 data-testid="error">Não encontrado!</h1>;
    
    return (
     <div className="product-container">   {items.datas === 'carregando' ?
        <IsLoading/>: 
        <ListItems datas={items.datas} typeComponent={typeComponent}/>}
    </div>
    );
}

