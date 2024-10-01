import styled from "styled-components";
export const StyleCreateStore = styled.div`
body {
    font-family: 'Roboto', sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
}

.main-container {
    text-align: center;
}

.header {
    background: linear-gradient(to right, #6ec1e4, #8e44ad);
    padding: 50px 20px;
    border-bottom-left-radius: 50% 20%;
    border-bottom-right-radius: 50% 20%;
    color: white;
    position: relative;
}

.header-content {
    position: relative;
    z-index: 2;
}

.header-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 20px;
}

.header h1 {
    font-size: 2em;
    margin: 0;
}

.header p {
    font-size: 1.2em;
    margin-top: 10px;
}

.benefits {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    margin: -50px auto 0;
    max-width: 1000px;
    margin-top: 1%;
    margin-bottom: 2%;
}

.benefits h2 {
    font-size: 1.8em;
    color: #333;
    margin-bottom: 20px;
}

.benefits-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.benefit-box {
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 500px;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
    cursor:pointer;
}

.benefit-box img {
    max-width: 100%;
    height: 80px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
    
}

.benefit-box p {
    font-size: 1em;
    color: #555;
    margin-top: 10px; 
    margin-bottom: 0; 

}


.benefit-box:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
    .benefit-box {
        width: 45%;
       
    }
}

@media (max-width: 480px) {
    .benefit-box {
        width: 100%;
    }
}
.create_store {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f7f7f7;
    margin-bottom:2%
  }
  .form_store {
    display:flex;
    justify-content:center;
    flex-direction:column;
    text-align:center;
    width: 500px;
    padding: 40px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    height:100%;
  }
  .form{
    display:flex;
    flex-direction:column;
    margin:3%;
    align-items: center;
  }
  .message h3{
    color:red
  }
 input,textarea,select,button{

  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
  margin-top:2%;
}
button{
    cursor:pointer;
}
    
`


export const AdminContainer = styled.div`


font-family: Arial, sans-serif;
background-color: #f4f4f4;
margin: 0;
padding: 0;
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
flex-direction:column;

.dashboard-container {
width: 90%;
max-width: 1200px;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
gap: 20px;
}

.dashboard-box {
    background-color: #1a1a2e;
    color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    transition: transform 0.3s ease;
    cursor:pointer
}

.dashboard-box:hover {
    transform: translateY(-5px);
}

.dashboard-box h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.dashboard-box p {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
}

.visits-box {
    background-color: #00adb5;
}

.total-orders-box {
    background-color: #393e46;
}

.open-orders-box {
    background-color: #f8b400;
}

.closed-orders-box {
    background-color: #4caf50;
}

.canceled-orders-box {
    background-color: #e94560;
}

.store-rating-box {
    background-color: #6a0572;
}
.add-product-box {
background-color: #2196f3;
}

.check-products-box {
    background-color: #ff5722;
}

.dashboard-button {
    margin-top: 15px;
    padding: 10px 20px;
    background-color: white;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

.dashboard-button:hover {
    background-color: #f0f0f0;
}
.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
}


.form-product {
  max-width: 700px;
  margin: 50px auto;
  padding: 30px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.form-product:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.form-product__group {
  margin-bottom: 20px;
}

.form-product__group label {
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
}

.form-product__group input[type="text"],
.form-product__group input[type="number"],
.form-product__group select,
.form-product__group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-product__group input[type="text"]:focus,
.form-product__group input[type="number"]:focus,
.form-product__group select:focus,
.form-product__group textarea:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
}


.form-product__group textarea {
  height: 120px;
  resize: none;
}

.form-product__group input[type="file"] {
  margin-top: 10px;
}

.form-product__group select {
  appearance: none;
  background-color: #f9f9f9;
}

.form-product__group select:focus {
  outline: none;
}

/* Botão */
.form-product button {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  color: white;
  background-color: #28a745;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.form-product button:hover {
  background-color: #218838;
}

/* Responsivo */
@media (max-width: 768px) {
  .form-product {
    padding: 20px;
  }

  .form-product__group {
    margin-bottom: 15px;
  }

  .form-product button {
    font-size: 14px;
    padding: 12px;
  }
}
 
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}

.close-button:hover {
  color: #dc3545;
}
`