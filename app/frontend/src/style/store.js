import styled from "styled-components"

export const AdminContainer = styled.div`


font-family: Arial, sans-serif;
background-color: #f4f4f4;
margin: 0;
padding: 0;
display: flex;
justify-content: center;
align-items: center;
height: auto;
flex-direction:column;

.dashboard-container {
  width: 90%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top:5%;
  margin-bottom:5%
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
  max-width: 90%;
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
.product-table {
  width: 50%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
}

.product-table thead {
  background-color: #0e1420; /* Título de fundo escuro */
  color: white;
  text-align: left;
}

.product-table th,
.product-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.product-table th {
  font-weight: bold;
  font-size: 16px;
}

.product-table tbody tr:nth-child(even) {
  background-color: #f2f2f2; /* Alterna as cores das linhas */
}

.product-table tbody tr:hover {
  background-color: #eaeaea; /* Efeito de hover */
}

.product-table td button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}





  .product-table td {
    padding: 10px;
    text-align: right;
 
    border-bottom: 1px solid #ddd;
  }

  .product-table td::before {
    content: attr(data-label); /* Exibe o rótulo da coluna como um pseudo-elemento */
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 10px;
    font-weight: bold;
    text-align: left;
  }

  .product-table td:last-of-type {
    border-bottom: 2px solid #ddd;
  }



  .product-table td button:first-of-type {
    background-color: #4caf50; /* Botão de atualização verde */
    color: white;
    margin-right: 5px;
}

.product-table td button:last-of-type {
    background-color: #f44336; /* Botão de exclusão vermelho */
    color: white;
}

.product-table td button:hover {
    opacity: 0.8;
}

.product-table td svg {
    font-size: 20px;
    color: #000;
    cursor: pointer;
    margin-right: 10px;
}

.product-table td svg:hover {
    color: #4caf50; /* Mudança de cor no hover */
}
`