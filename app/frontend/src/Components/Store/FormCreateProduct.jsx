import React from "react";




export const FormCreateProducr = ({setShowForm})=>{
    return (
      <div className="form-overlay">
        <button className="close-button" onClick={() => setShowForm(false)}>
          &times;
        </button>
      
        <div className="form-product">
        <h3>ADICIONE UM NOVO PRODUTO</h3>
          <div className="form-group">
            <h3 className="form-title">Escolha o nome do seu produto</h3>
            <input type="text" className="form-input" placeholder="Nome do produto" />
          </div>
      
          <div className="form-group">
            <h3 className="form-title">Adicione uma descrição para o seu produto</h3>
            <textarea className="form-input" placeholder="Descrição do produto"></textarea>
          </div>
      
          <div className="form-group">
            <h3 className="form-title">Escolha a imagem do seu produto</h3>
            <input type="file" className="form-input" />
          </div>
      
          <div className="form-group">
            <h3 className="form-title">Agora escolha a categoria que melhor representa o seu produto</h3>
            <select className="form-select">
              <option value="carros">Carros</option>
              <option value="roupas">Roupas</option>
              <option value="eletronicos">Eletrônicos</option>
              <option value="moveis">Móveis</option>
              <option value="">Selecionar...</option>
            </select>
          </div>
      
          <div className="form-group">
            <h3 className="form-title">Qual o preço você deseja escolher para o seu produto</h3>
            <input type="number" className="form-input" placeholder="Preço do produto" />
          </div>
          <div className="form-group">
            <h3 className="form-title">Qual a quantidade de produtos disponiveis</h3>
            <input type="number" className="form-input" placeholder="Preço do produto" />
          </div>
        </div>
        </div>
      );
      
}