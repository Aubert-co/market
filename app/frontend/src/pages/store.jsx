import React, { useEffect, useState ,useRef} from "react";
import { fetchData } from "../Hooks";
import { serviceStore } from "../services";
import { BoxBenefits } from "../Components/BoxBenefits";
import { AdminStore } from "../Components/Store/adminStore";
import { FormCreateStore } from "../Components/Store/FormCreateStore";
import {StyleCreateStore} from '../style/store'
import { StatusBox } from "../Components/StatusBox";
import { benefitsCreateStore ,adLinkStore,adTextStore} from "../Constants/benefits";

export const Store = () => {
    const [store, setStore] = useState({ datas: 'Carregando', status: '' });
    const [showCreateStore, setShowCreate] = useState(false);
    const formRef = useRef(null);
    useEffect(() => {
        fetchData({ service: serviceStore, setItems: setStore });
    }, []); 
    useEffect(() => {
        if (store.datas !== 'Carregando' && Array.isArray(store.datas) && store.datas.length === 0) {
            setShowCreate(true);
        }
    }, [store]); 
    
        if(store.datas === 'Carregando' && !store.status)return <StatusBox/>
   /* if (showCreateStore) return (
        <StyleCreateStore>
            <BoxBenefits benefits={benefitsCreateStore} adText={adTextStore} adLink={adLinkStore} formRef={formRef}/>
            <FormCreateStore formRef={formRef}/>
        </StyleCreateStore>
    )*/
    
    
    return (
        <div className="box_store" data-testid="box_store">
            <AdminStore/>
        </div>
    );
};
