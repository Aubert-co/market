import React, { useEffect, useState } from "react"
import { AdminContainer } from "../style/store"
import { serviceAdmStore } from "../services"
import { fetchData } from "../hooks"
import { LoadingBox } from "./LoadingBox"

const InfoBoxes = (datas)=>{
    const names = ['VISITAS RECEBIDAS','TOTAL DE PEDIDOS','PEDIDOS EM ABERTO','PEDIDOS CONCLUÍDOS','PEDIDOS CANCELADOS','NOTA DA LOJA']

    const list =datas.map((val)=>{
        return 
          (  <div className="info-box">
                <h3>{val.view}</h3>
            </div>
        )
    })
    
}

export const AdminStore = ()=>{
    const [items,setItems] =  useState({datas:'Carregando',status:''})
    useEffect(()=>{
        fetchData({service:serviceAdmStore,setItems})
    },[])
    if( items === 'Carregando' && !items.status )return <LoadingBox/>
    return (
    
        <AdminContainer>
        <div class="dashboard-container">
        {items.datas.views &&  <div class="dashboard-box visits-box">
            <h3>VISITAS</h3>
         <p>{items.datas.views}</p>
        </div>}
        {items.datas.totally_orders && <div class="dashboard-box total-orders-box">
            <h3>PEDIDOS TOTAL</h3>
            <p>{items.datas.totally_orders}</p>
        </div> }
        { items.datas.totally_orders &&    <div class="dashboard-box open-orders-box">
            <h3>PEDIDOS EM ABERTO</h3>
         <p>{items.datas.opened_orders}</p> 
        </div>}
       {items.datas.closed_orders && <div class="dashboard-box closed-orders-box">
            <h3>PEDIDOS FECHADOS</h3>
            <p>{items.datas.closed_orders}</p>
        </div>}
        { items.datas.canceled_orders  &&  <div class="dashboard-box canceled-orders-box">
            <h3>PEDIDOS CANCELADOS</h3>
          <p>{items.datas.canceled_orders}</p> 
        </div>}
        {items.store_ratting &&  <div class="dashboard-box store-rating-box">
            <h3>NOTA DA LOJA</h3>
          <p>{items.store_ratting}</p> 
        </div> }
        <div class="dashboard-box add-product-box">
            <h3>ADICIONAR NOVO PRODUTO</h3>
            <button class="dashboard-button">Adicionar Produto</button>
        </div>
    </div>
        
        </AdminContainer>
    )
}