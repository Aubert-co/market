import React, { useRef,useEffect } from "react";
import useLockBodyScroll from "../../Hooks";




export const FormCreateProducr = ({setShowForm,formAddProduct,type,product})=>{
 
 const refs = {
  productName: useRef(product?.name || "Adicione um nome"),
  productDescription: useRef(product?.description || "Adicone uma descrição"),
  productPrice: useRef(product?.price || "Adicione um preço"),
  productCategory: useRef(product?.category || "Adicione uma categoria"),
  productQuantity: useRef(product?.quantity || "Adicione a quantidade disponivel"),
  productImage:useRef("")
};
  /*useEffect(() => {
    if (product) {
      refs.productName.current = product.name;
      refs.productDescription.current = product?.description;
      refs.productPrice.current = product.price;
      refs.productCategory.current = product.category;
      refs.productQuantity.current = product.quantity;
    }
  }, [product]);*/
  useLockBodyScroll( formAddProduct)
  const onChange =()=>{
    console.log( refs )
  }
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('form-overlay')) {
       setShowForm( false )
       
    }
  };

  if (!formAddProduct) return null; 
    return (
      <div className="form-overlay" onClick={ handleOverlayClick }>
        <button className="close-button" onClick={() => setShowForm(false)}>
          &times;
        </button>
      
        <div className="form-product">
        <h3>ADICIONE UM NOVO PRODUTO</h3>
          <div className="form-group">
            <h3 className="form-title">Escolha o nome do seu produto</h3>
            <input type="text" defaultValue={refs.productName.current} ref={refs.productName} className="form-input"  />
          </div>
      
          <div className="form-group">
            <h3 className="form-title">Adicione uma descrição para o seu produto</h3>
            <textarea defaultValue={refs.productDescription.current} ref={refs.productDescription}className="form-input" ></textarea>
          </div>
      
          <div className="form-group">
            <h3 className="form-title">Escolha a imagem do seu produto</h3>
            <input type="file"  ref={refs.productImage}className="form-input" />
          </div>
      
          <div className="form-group">
            <h3 className="form-title">Agora escolha a categoria que melhor representa o seu produto</h3>
            <select defaultValue={refs.productCategory.current} className="form-select">
              {product?.category ? <option> {product.category}</option> : <option>Selecione...</option>}
              <option value="carros">Carros</option>
              <option value="roupas">Roupas</option>
              <option value="eletronicos">Eletrônicos</option>
              <option value="moveis">Móveis</option>
            </select>
          </div>
      
          <div className="form-group">
            <h3 className="form-title">Qual o preço você deseja escolher para o seu produto</h3>
            <input defaultValue={refs.productPrice.current} ref={refs.productPrice} type="number" className="form-input" />
          </div>
          <div className="form-group">
            <h3 className="form-title">Qual a quantidade de produtos disponiveis</h3>
            <input type="number" defaultValue={refs.productQuantity.current} ref={refs.productQuantity}  className="form-input" />
          </div>
  
        </div>
        <button onClick={onChange}> Salvar</button>
        </div>
      );
      
}