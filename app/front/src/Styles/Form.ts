import styled from "styled-components";

export const UserFormStyles = styled.div`

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-height: 97vh;
background-color: #F7F7F7; 

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    background: #FFFFFF; 
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); 
}

.type_form {
    font-size: 1.5rem;
    color: #333333; 
    margin-bottom: 1rem;
}

.input-form {
   
    max-width: 300px;
    padding: 0.8rem;
    border-radius: 5px;
    border: 1px solid #DDDDDD; 
    outline: none;
    font-size: 1rem;
    background: #F1F1F1; 
    color: #333333;
}

.input-form:focus {
    border-color: #007BFF; 
    background: #FFFFFF;
}

button {
    margin-top: 1rem;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    background: #007BFF; 
    color: white;
    transition: background 0.3s;
}

button:hover {
    background: #0056b3;
}

.message {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
}

.message_success {
  color: #28a745;
}

.message_error {
  color: #dc3545; 
}

.message_info {
  color: #007bff; 
}
.type_form {
  font-size: 1.5rem;         
  font-weight: 700;         
  color: #0e1420;            
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin-bottom: 1rem;      
  line-height: 1.2;
  letter-spacing: 0.5px;     
}


`