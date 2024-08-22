import React, { useEffect, useState } from "react";
import { fetchData } from "../hooks";
import { serviceStore } from "../services";
import { ShowFormStore } from "../components/ShowFormStore";
import { AdminStore } from "../components/adminStore";

const adTetx ="Por que escolher nossa plataforma para criar sua loja?"
const adLink= "Crie sua loja agora mesmo e comece a faturar com facilidade e segurança."

export const Store = () => {
    const [store, setStore] = useState({ datas: 'Carregando', status: '' });
    const [showCreateStore, setShowCreate] = useState(false);

    useEffect(() => {
        fetchData({ service: serviceStore, setItems: setStore });
    }, []); 
    useEffect(() => {
        if (store.datas !== 'Carregando' && Array.isArray(store.datas) && store.datas.length === 0) {
            setShowCreate(true);
        }
    }, [store]); 
    
    if (showCreateStore) return <ShowFormStore adText={adTetx} adLink={adLink}/>;
    
    
    
    return (
        <div className="box_store" data-testid="box_store">
            {store.datas === 'Carregando' && 'Carregando'}
            <AdminStore/>
        </div>
    );
};
