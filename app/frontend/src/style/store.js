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
    border: 5px solid white;
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


.container {
    max-width: 1200px;
    margin: 0 auto;
}

.info-boxes {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 40px;
}

.info-box {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    flex: 1;
    min-width: 200px;
}

.info-box h3 {
    margin: 0 0 10px 0;
    font-size: 18px;
    color: #6c63ff;
}

.info-box p {
    margin: 0;
    font-size: 24px;
    color: #333;
}

.dashboard-section {
    margin-top: 40px;
    margin-bottom: 40px;
}

.dashboard-section h1 {
    font-size: 24px;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
}

.dashboard {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 40px;
    text-align: center;
}

.table-section {
    margin-top: 40px;
}

.table-section h2 {
    font-size: 22px;
    color: #333;
    margin-bottom: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 40px;
}

table, th, td {
    border: 1px solid #ddd;
}

th, td {
    padding: 12px;
    text-align: left;
}

th {
    background-color: #f4f7fc;
    color: #333;
}

.form-section {
    margin-top: 40px;
}

.form-section h2 {
    font-size: 22px;
    color: #333;
    margin-bottom: 20px;
}

form {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button[type="submit"] {
    background-color: #6c63ff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button[type="submit"]:hover {
    background-color: #5753d5;
}
`