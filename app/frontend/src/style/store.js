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
`