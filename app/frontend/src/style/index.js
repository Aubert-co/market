import styled,{createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

  }
`;
export const Container = styled.div`
  display: grid;
    grid-template-areas:
      "header header header header"
      "aside main main aside2"
      "footer footer footer footer";
    grid-template-columns: 10% 70% 5%;
    grid-template-rows: auto 1fr auto; 
    column-gap: 1%;
    background-color: rgb(14, 20, 32);
    
`
export const Aside = styled.aside`
grid-area:aside`


export const Main = styled.main`

grid-area: main;

.product-section {
    text-align: center;
    padding: 20px;
  }
  
  .product-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .product {
    margin: 10px;
    width: 300px;
    border: 1px solid #ddd;
  
    border-radius: 10px;
    text-align: start;
  }
  
  .product h3 {
    margin:5px 0px 10px 10px;
  }
  
  .product p {
    margin: 5px 0px 10px 10px;
  }
  
  .product a {
    display: block;
    margin-top: 10px;
    text-align: center;
    background-color: #007bff;
    color: #fff;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 4px;
  }
  
  .product a:hover {
    background-color: #0056b3;
  }
  .img{
    background-color: red;
    width: 100%;
    height: 250px;
    border-radius: 10px 10px 0px 0;
  }
.product button{
    width: 100%;
    background-color: #144c86;
    border-radius: 0px 0px 10px 10px;
    border: none;
    text-transform: uppercase;
    height: 40px;
    color: white;
}
button:hover{
    cursor: pointer;
    color: rgb(230, 222, 222);

    background-color: #0056b3;
}
`
export const Header = styled.header`
grid-area: header;
width: 95%;
display: flex;
justify-content: space-between;
align-items: center;
padding: 5px;
background-color: rgb(14, 20, 32);;
box-shadow: 0 0 10px rgb(37, 55, 90);;
border-radius: 10px;
box-shadow: 0 0 10px rgb(42, 61, 99);;
justify-self: center;
margin-top: 1%;

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
}


.logo img {
  max-width: 50px; 
  height: auto; 
}


.logo a {
  text-decoration: none;

  font-weight: bold;
  font-size: 32px;
}

nav {
  
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  
}

nav a {
  margin-left: 10%;
  color: #dfdede;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
 
  padding: 2%;
  white-space: nowrap;
  text-transform: uppercase;
}
nav  :hover{
  background-color: #dfdede;
  color: rgb(92,85,85);
}
.search{
  display:flex;
  width:50%;
  height:50%;
  text-align:center;
  justify-content:center;
  align-items:center;
  justify-items:center
}
input{
  width:100%;
  height:90%
}
.btn_search{
  height:100%;
  background:red;
  cursor:pointer;
  width:30%;

}

`

export const Aside2 = styled.aside`
grid-area:aside2;
.window {
  position: fixed;
  top: 100px; /* Ajuste aqui para mover a janela para baixo */
  right: 20px; /* Espaçamento da borda direita */
  width: 320px; /* Largura ajustada para um layout mais moderno */
  height: 60%; /* Altura ajustada */
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra moderna */
  border-radius: 12px; /* Bordas arredondadas */
  z-index: 999;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: 1; /* Opacidade para transições */
  display: flex;
  flex-direction: column;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.window_content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  align-self: flex-end;
  color: #333;
}

.close-button:hover {
  color: #ff0000;
  transform: scale(1.1);
}

.list-items,
.list-settings {
  flex: 1;
  overflow-y: auto; /* Permite que o conteúdo role verticalmente */
  margin-top: 10px;
  margin-bottom: 10px;
  padding-right: 10px; /* Espaço para evitar que o conteúdo fique sob o scrollbar */
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #888;
  margin-top: 20px;
}

`