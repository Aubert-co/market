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
    height:auto;
    min-height:400px;
    justify-content: space-between; 
  }
  
  .image-section {
    display: flex;
    justify-content: center;
    width:40%;
    align-items:center;
    
  }
    
.image-section img {
  width: 90%;
  max-width: 90vw; 
  height: auto;
  max-height: 70vh;  
  object-fit: contain; 
  border-radius: 8px;
 
}

.info-section {
  width:40%;

  padding: 20px;
  display: flex;
  flex-direction: column;
  
}

.info-section h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.info-section p {
  font-size: 14px;           
  color: #666;
  line-height: 1.5;           
  text-align: justify;      
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-top: 10px;         
}


.purchase-section {

  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.price {
  font-size: 28px;
 
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
 @media (max-width: 1024px) {
  .product-container{
    display:flex;
    flex-direction:column;
    
    height:auto;
  }
  .info-section{
    display:flex;
    flex-direction:column;
    width:100%;
   
    max-width:100%;
  }
  .image-section{
    width:100%;
    height:100%;
  }
    .image-section img {
      heigth:200px;
    }
 }

`
export const ContainerInfo = styled.div` 
  display: flex;
  
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
 
  

`
export const StyleH3 = styled.h3` 
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  margin-top:2%;
`
export const CommentStyle = styled.div`
background-color: #f9f9f9;
padding: 20px;
border-radius: 8px;
max-width: 700px;
margin: auto;

 background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #fff;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

p {
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
}

small {
  font-size: 12px;
  color: #888;
}

.no-comments {
  font-size: 16px;
  color: #999;
  text-align: center;
}
`;