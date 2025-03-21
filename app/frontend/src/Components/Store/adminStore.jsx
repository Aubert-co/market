import React, { useEffect, useState } from "react"
import { AdminContainer } from "../../style/store"
import { serviceAdmStore } from "../../services/store"
import { fetchData } from "../../Hooks"
import { StatusBox } from "../Utils"
import { Link } from "react-router-dom";
import { FaHome} from 'react-icons/fa';
import { FormCreateProducr } from "./FormCreateProduct"
import ProductTable from "./tables"
import PieGraph from "./grafics_orders"
import MostAccessedProductsChart from "./grafics"
import { ViewItem } from "./ViewItem"
const datas = 
    {views:1000,totally_orders:500,opened_orders:3999,closed_orders:1000,canceled_orders:5000,store_ratting:2999}

const service = async()=>{
    return {datas,status:201}
}
export const AdminStore = ()=>{
    const [items,setItems] =  useState({datas:'Carregando',status:''});
    const [formAddProduct,setFormAddProduct] =useState( false );
    const [getProduct , setProduct] = useState( [] )
    const [showFormUpdate,setShowUpdate] = useState( false )
    const [viewProduct,setViewProduct] = useState( false )
    useEffect(()=>{
        fetchData({service,setItems});
    },[])

   
    if( items === 'Carregando' && !items.status )return <StatusBox text={'Carregando...'}/>
    return (
    
        <AdminContainer>
        <div className="dashboard-container">
            {items.datas.views && 
            <div className="dashboard-box visits-box">
                <h3>VISITAS</h3>
            <p>{items.datas.views}</p>
            </div>}
            {items.datas.totally_orders &&
            <Link to={'/store/orders'} className="dashboard-box total-orders-box">
                <h3>PEDIDOS TOTAL</h3>
                <p>{items.datas.totally_orders}</p>
            </Link> }

            { items.datas.totally_orders &&  
            <Link to={'/store/orders'} className="dashboard-box open-orders-box">
                <h3>PEDIDOS EM ABERTO</h3>
            <p>{items.datas.opened_orders}</p> 
            </Link>}

            {items.datas.closed_orders &&
            <Link to={'/store/orders'} className="dashboard-box closed-orders-box">
                <h3>PEDIDOS FECHADOS</h3>
                <p>{items.datas.closed_orders}</p>
            </Link>}

            { items.datas.canceled_orders  && 
            <Link to={'/store/orders'} className="dashboard-box canceled-orders-box">
                <h3>PEDIDOS CANCELADOS</h3>
            <p>{items.datas.canceled_orders}</p> 
            </Link>}

            {items.store_ratting &&  
            <Link to={'/store/views'} className="dashboard-box store-rating-box">
                <h3>NOTA DA LOJA</h3>
            <p>{items.datas.store_ratting}</p> 
            </Link> }

            <div onClick={()=> setFormAddProduct( true )} className="dashboard-box add-product-box">
                <h3>ADICIONAR NOVO PRODUTO</h3>
                <button className="dashboard-button">Adicionar Produto</button>
            </div>
            <Link to={'/'} className="dashboard-box add-product-box">
                <h3>VOLTA AO INICIO</h3>
                <button className="dashboard-button">
                    <FaHome/>
                </button>
            </Link>
        </div>
        <PieGraph/>
        <MostAccessedProductsChart/>
        {formAddProduct && <FormCreateProducr formAddProduct={formAddProduct}  setShowForm={setFormAddProduct}/>} 
        {showFormUpdate && <FormCreateProducr formAddProduct={showFormUpdate} setShowForm={setShowUpdate} product={getProduct}/>}
        {viewProduct && <ViewItem product={getProduct} isOpen={viewProduct} setShow={setViewProduct}/>}
        <ProductTable setUpdateProduct={setProduct} setViewProduct={setViewProduct} setShowUpdate={setShowUpdate} />
         
        </AdminContainer>
    )
};