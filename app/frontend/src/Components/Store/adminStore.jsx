import React, { useEffect, useState } from "react"
import { AdminContainer } from "../../style/store"
import { serviceAdmStore } from "../../services"
import { fetchData } from "../../Hooks"
import { StatusBox } from "../StatusBox"
import { Link } from "react-router-dom";


export const AdminStore = ()=>{
    const [items,setItems] =  useState({datas:'Carregando',status:''})
    useEffect(()=>{
        fetchData({service:serviceAdmStore,setItems})
    },[])
    if( items === 'Carregando' && !items.status )return <StatusBox text={'Carregando...'}/>
    return (
    
        <AdminContainer>
        <div class="dashboard-container">
        {items.datas.views && 
         <div class="dashboard-box visits-box">
            <h3>VISITAS</h3>
         <p>{items.datas.views}</p>
        </div>}
        {items.datas.totally_orders &&
         <Link to={'/store/orders'} class="dashboard-box total-orders-box">
            <h3>PEDIDOS TOTAL</h3>
            <p>{items.datas.totally_orders}</p>
        </Link> }
        { items.datas.totally_orders &&  
          <Link to={'/store/orders'} class="dashboard-box open-orders-box">
            <h3>PEDIDOS EM ABERTO</h3>
         <p>{items.datas.opened_orders}</p> 
        </Link>}
       {items.datas.closed_orders &&
        <Link to={'/store/orders'} class="dashboard-box closed-orders-box">
            <h3>PEDIDOS FECHADOS</h3>
            <p>{items.datas.closed_orders}</p>
        </Link>}
        { items.datas.canceled_orders  && 
         <Link to={'/store/orders'} class="dashboard-box canceled-orders-box">
            <h3>PEDIDOS CANCELADOS</h3>
          <p>{items.datas.canceled_orders}</p> 
        </Link>}
        {items.store_ratting &&  
        <Link to={'/store/views'} class="dashboard-box store-rating-box">
            <h3>NOTA DA LOJA</h3>
          <p>{items.datas.store_ratting}</p> 
        </Link> }
        <Link to={'/store/product'} class="dashboard-box add-product-box">
            <h3>ADICIONAR NOVO PRODUTO</h3>
            <button class="dashboard-button">Adicionar Produto</button>
        </Link>
    </div>
        
        </AdminContainer>
    )
}