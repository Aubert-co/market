import styled from "styled-components";


export const MainContainer = styled.div`

  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
    width:100%;
    margin-top:5%;

.product-container {
  display: flex;
  flex-direction: row; 
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height:500px;
}

.image-section {
  background-color:red;
  display: flex;
  justify-content: center;
  width:40%;
}

.image-section img {
  max-width: 100%;
  height: auto;
 
}

.info-section {
  width:40%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-section h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.info-section p {
  font-size: 16px;
  color: #666;
}

.purchase-section {

  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.price {
  font-size: 28px;
  color: #ff6347;
  margin-bottom: 10px;
}

.quantity-control {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.quantity-control button {
  font-size: 18px;
  border: none;
  background-color: #ff6347;
  color: #fff;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
}

.quantity-control input {
  width: 60px;
  text-align: center;
  font-size: 16px;
  margin: 0 10px;
}

.actions {
  display: flex;
  gap: 10px;
  flex-direction:column;
}

.actions button {

flex-direction:row;
  font-size: 16px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #ff6347;
  color: #fff;
}

.actions button:first-of-type {
  background-color: #28a745; /* Cor verde para 'Comprar Agora' */
}

.actions button:hover {
  background-color: #df472b; /* Cor de hover para 'Adicionar ao Carrinho' */
}

.actions button:first-of-type:hover {
  background-color: #218838; /* Cor de hover para 'Comprar Agora' */
}
  
`

  