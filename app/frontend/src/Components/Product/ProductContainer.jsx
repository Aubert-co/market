import React from "react";
import { MainContainer } from "../../style/product";


export const ProductContainer = ()=>{
   return( <MainContainer>
     <div className="product-container">
    <div className="image-section">
      <img src="url-da-imagem" alt="Nome do Produto" />
    </div>
    <div className="info-section">
      <h1>Nome do Produto</h1>
      <p>Descrição breve do produto aqui.</p>
    </div>
    <div className="purchase-section">
      <p className="price">R$ 299,00</p>
      <div className="quantity-control">
        <button>-</button>
        <input type="number" value="1" />
        <button>+</button>
      </div>
      <div className="actions">
        <button>Comprar Agora</button>
        <button>Adicionar ao Carrinho</button>
      </div>
    </div>
  </div>
    </MainContainer>
   )
}