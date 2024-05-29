import React, { useEffect, useState } from "react";
import { fetchData } from "../hooks";
import { serviceStore } from "../services";
import { ShowForm } from "../components/CreateStore";


export const Store = () => {
    const [store, setStore] = useState({ datas: 'Carregando', status: '' });
    const [showCreateStore, setShowCreate] = useState(false);

    useEffect(() => {
        fetchData({service:serviceStore,setItems:setStore})
    }, [showCreateStore]); 

    if (store.datas !== 'Carregando' && Array.isArray(store.datas) && store.datas.length === 0) 
        return <ShowForm setShowCreate={setShowCreate} showCreateStore={showCreateStore} />;
    
    

    return (
        <div className="box_store" data-testid="box_store">
            {store.datas === 'Carregand' && 'Carregando'}
        </div>
    );
};
