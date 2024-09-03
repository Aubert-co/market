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
background-color: #f4f7f9;

 
    
`
export const Aside = styled.aside`
grid-area:aside;
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  width: 100%;
}

.filter-bar label {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.filter-bar input {
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ddd;
}

.filter-bar button {
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  text-transform: uppercase;
}

.filter-bar button:hover {
  background-color: #0056b3;
}

`


export const Main = styled.main`
grid-area: main;
`;
export const PromoContainer = styled.div`
display: flex;
justify-content: space-between;
gap: 10px;
padding: 20px;

cursor:pointer;
.promo-box {
    
    flex: 1;
    padding: 15px;
    background-color: #ff6347;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
}

.promo-box h2 {
    margin-bottom: 10px;
    font-size: 18px;
    color: #ffffff;
}

.promo-box p {
    font-size: 14px;
    color: #ffffff;
}

`
export const ProductSection = styled.div`
text-align: center;
padding: 20px;
background-color: #f7f9fc; 

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor:pointer
}

.product {
  margin: 10px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: start;
  background-color: #fff; /* Fundo branco para destacar */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
  transition: transform 0.3s, box-shadow 0.3s;
}

.product:hover {
  transform: translateY(-5px); /* Efeito de elevação ao passar o mouse */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Aumenta a sombra */
}

.product h3 {
  margin: 10px;
  font-size: 1.2rem;
  color: #333;
}

.product p {
  margin: 10px;
  color: #666;
  font-size: 0.95rem;
}

.product a {
  display: block;
  margin: 10px;
  text-align: center;
  background-color: #007bff;
  color: #fff;
  padding: 10px 16px;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.product a:hover {
  background-color: #0056b3;
}

.img {
  background-color: #e0e0e0;
  width: 100%;
  height: 250px;
  border-radius: 10px 10px 0 0;
}

.product button {
  width: 100%;
  background-color: #144c86;
  border-radius: 0 0 10px 10px;
  border: none;
  text-transform: uppercase;
  height: 40px;
  color: white;
  transition: background-color 0.3s;
}

.product button:hover {
  cursor: pointer;
  color: #e6dede;
  background-color: #0056b3;
}`
export const Header = styled.header`
grid-area: header;
width: 95%;
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px;
background-color: #2a2a2a; 
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
border-radius: 8px;
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
  font-size: 28px;
  color: #f5f5f5; /* Cor neutra e clara */
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
  color: #b0b0b0; /* Cor neutra */
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 15px;
  white-space: nowrap;
  text-transform: uppercase;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 5px;
}

nav a:hover {
  background-color: #b0b0b0;
  color: #2a2a2a;
}

.search {
  display: flex;
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;

}

input {
  width: 70%;
  height: 60%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  font-size: 16px;
}

.btn_search {
  height: 60%;
  background-color: #ff6347; ;
  cursor: pointer;
  width: 30%;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 0 5px 5px 0;
  transition: background-color 0.3s ease;
}

.btn_search:hover {
  background-color: #df472b;
}
i{
 cursor: pointer;
  margin: 0 15px;
  font-size: 1.5em;
  color: #f5f5f5; 

  &:hover {
    color: #ff6347;
    transition: color 0.3s ease-in-out;
  }

  &.cart-icon {
    position: relative;
  }

  &.profile-icon {
    position: relative;
  }

  
  &.active {
    color: #ffd700; 
  }
}
  @media (max-width: 600px) {
  display:grid;
  grid-template-areas:"logo nav"
  "search search";
  .logo{
    grid-area:logo;
  }
  nav{
    grid-area:nav;
  }
  .search {
    grid-area:search;
    width: 95%;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
 
  }

}
 
`

;


export const Aside2 = styled.aside`
grid-area:aside2;
.window {
  position: fixed;
  top: 100px;
  right: 20px; 
  width: 320px; 
  height: 60%; 
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  z-index: 999;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: 1;
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

export const StatusStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  text-align: center;


 h3 {
    font-size: 1.5rem;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        opacity: 0.7;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.7;
    }
}
`