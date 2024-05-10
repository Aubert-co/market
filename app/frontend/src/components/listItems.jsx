import React,{useContext} from "react";
import { addToCart, serviceRemoveFromCart,serviceDecreaseCart,serviceIncreaseCart } from "../services";
import { MessageContext } from "../contexts";

const messageAddCart = {sucess:'Sucesso ao adicionar.'}

export const BtnAction =({product_id,service,text,message})=>{
    const {messageParams,setMessageParams} = useContext( MessageContext )

    const clickToAdd = async()=>{
    
        const {status} =  await service({product_id,quantity:1})
        
        if(status === 401)return setMessageParams({content:'Login necessário para adicionar ao carrinho.',type:'error'})
            
        if(message && status === 201)return setMessageParams({content:message.sucess,type:'sucess'})
            
        
        if(status > 401)  setMessageParams({content:'Algo deu errado',type:'error'})
        
    }
    return (
        <button onClick={clickToAdd} className="btn_action" data-testid="btn_action">
           {text}
        </button>
    )
}



export const ListItems = ({typeComponent,datas})=>{
    const listItems =({id,name,price,imgPath,quantity})=>{
        const img = imgPath.replace('../public','')
        const src = `http://localhost:8080/static${img}`
        return (
            <div className="product" data-testid="item" key={id}>
                {src && <div className="img"><img alt={name} src={src} data-testid="item_img"></img></div>}
                {name && <p className="item_name" data-testid="item_name">{name}</p>}
                {typeComponent === 'Cart' ? '' : price && <p className="item_price" data-testid="item_price">{price}</p>}
                {typeComponent === 'Cart' ?'' :<button className="buy" data-testid="buy">Comprar</button>}   
                {typeComponent === 'Cart' ? <BtnAction text={'Remover do carrinho'} product_id={id} service={serviceRemoveFromCart}/> :
                 <BtnAction message={messageAddCart} text={'Adicionar ao carrinho'} product_id={id}  service={addToCart}/>}
                {typeComponent === 'Cart' && <BtnAction text={'-'} product_id={id}  service={serviceDecreaseCart}/>}
                {typeComponent === 'Cart' && <p className="quantity" data-testid="item_quantity">{quantity*price}</p>}
                {typeComponent === 'Cart' && <BtnAction text={'+'} product_id={id}  service={serviceIncreaseCart}/>}
            </div>
        )
    }
    console.log(datas)
    return datas.map(listItems)
}
