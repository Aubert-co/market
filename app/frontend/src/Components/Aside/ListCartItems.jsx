import React,{useState} from "react";
import { ListItems } from "../ListItems";
import { ClearAllCart } from "../../Cache";
import { changeDisplayToNone, getTotally } from "../Utils";



export const CleanALlCart = ({setTottaly,datas})=>{
    const clean = ()=>{
      setTottaly([])
      ClearAllCart()
      datas.forEach(({id})=>{
        changeDisplayToNone(`.Cart_${id}`)
      })
    }
    return <button className="btn_finish btn_clean" data-testid="cleanAll_cart" onClick={clean}>Limpar carrinho</button>
}


export const ListCartItems = ({datas,status})=>{
    const [changeTotally,setTottaly] = useState([])
    
    if (datas === "loading" && !status) return <div className="loading" data-testid="window_loading">Carregando...</div>;
    
    if (Array.isArray(datas) && datas.length === 0 && status === 201) return <div className="error_message" data-testid="error_message">Adicione items ao seu carrinho!</div>;
    
  
    if (status === 401) return <div className="error_message" data-testid="error_message">Faça login para adicionar items ao seu carrinho!</div>;
  
    if (status > 401) return <div className="error_message" data-testid="error_message">Algo deu errado enquanto buscavamos seu carrinho , tente mais tarde!</div>;
  
    const totally = getTotally( changeTotally )
    
   
    return (
    
      <div className="list_cart" data-testid="list_items">
        <ListItems typeComponent={'Cart'} datas={datas} setTottaly={setTottaly}/>
        {totally !== 0 ? (
          <div className="cart_finish" data-testid="cart_actions">
            <h4 data-testid="cart_tottally">Total R${ totally  }</h4>
            <button className="btn_finish btn_buy">Finalizar Compra</button>
            <CleanALlCart totally={totally} setTottaly={setTottaly} datas={datas} />
          </div>
        ): <h1 data-testid="msg_add_cart">Adicione items ao seu carrinho</h1>}
      </div>
   
    )
  }