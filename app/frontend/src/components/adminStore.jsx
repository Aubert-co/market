import React from "react"
import { AdminContainer } from "../style/store"

 /*const InfoBoxes = (datas)=>{
    const names = ['Visitas','Vendas','Peidos Total','Pedidos em Aberto','Pedidos Concluídos','Pedidos Cancelados']

    const list =datas.map((val)=>{
        return (
            <div className="info-box">
                <h3>{val.view}</h3>
            </div>
        )
    })
    
}*/
export const AdminStore = ()=>{
    return (
        <AdminContainer>
            <div className="container">
            <section className="info-boxes">
                <div className="info-box">
                    <h3>Visitas</h3>
                    <p>12345</p>
                </div>
                <div className="info-box">
                    <h3>Vendas</h3>
                    <p>6789</p>
                </div>
                <div className="info-box">
                    <h3>Pedidos Total</h3>
                    <p>2345</p>
                </div>
                <div className="info-box">
                    <h3>Pedidos em Aberto</h3>
                    <p>345</p>
                </div>
                <div className="info-box">
                    <h3>Pedidos Concluídos</h3>
                    <p>2000</p>
                </div>
                <div className="info-box">
                    <h3>Pedidos Cancelados</h3>
                    <p>45</p>
                </div>
            </section>
            </div>
        </AdminContainer>
    )
}