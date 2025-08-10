import type { UserCart } from "@/types/cart.types"
import orderhistory from '@/Assets/orderhistory.png'

import { CartActions } from "./CartActions"

type PropsCartList = {
  cart:UserCart[]
}
type Props = {
  cart:UserCart[],
  status:number
}
export const CartList = ({ cart }: PropsCartList) => {
  return (
    <div className="list-container">
      {cart.map((val:any) => {
        if (val?.isDeleted) return null; 

        return (
          <div className="list-item" key={val.productId}>
            <div className="list-image">
              <img src={orderhistory} alt="Ícone de histórico de compras" />
            </div>

            <div className="list-info">
              <h3>{val.price}</h3>
              <p>Produto: {val.name}</p>
              <p>Estoque: {val.stock}</p>
              <CartActions id={val.productId} quantity={val.quantity} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export const RenderConditions = ({cart,status}:Props)=>{
  const hasError = cart.length === 0 && status>204
  const emptyCart = cart.length ===0
  if( hasError ){
    return (
      <div className="text">
        <h1>Algo deu errado ao carregar o seu carrinho</h1>
      </div>
    )
  }
  if( emptyCart ){
    return (
      <div className="text">
            <h1>Seu carrinho está vazio. Adicione itens para continuar.</h1>
      </div>
    )
  }
  return (
    <div className="list-container">
        <CartList cart={cart}/>
    </div>
  )
}

