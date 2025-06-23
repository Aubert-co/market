import styled from "styled-components";

export const UserFormStyles = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #F7F7F7; /* Cor neutra de fundo */


.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    background: #FFFFFF; /* Cor clara para o formulário */
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.type_form {
    font-size: 1.5rem;
    color: #333333; /* Cor de texto escuro */
    margin-bottom: 1rem;
}

.input {
    width: 100%;
    max-width: 300px;
    padding: 0.8rem;
    border-radius: 5px;
    border: 1px solid #DDDDDD; /* Bordas neutras */
    outline: none;
    font-size: 1rem;
    background: #F1F1F1; /* Cor de fundo suave */
    color: #333333;
}

.input:focus {
    border-color: #007BFF; /* Cor para foco, ideal para e-commerce */
    background: #FFFFFF;
}

button {
    margin-top: 1rem;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    background: #007BFF; /* Cor do botão de ação */
    color: white;
    transition: background 0.3s;
}

button:hover {
    background: #0056b3; /* Cor ao passar o mouse */
}


`