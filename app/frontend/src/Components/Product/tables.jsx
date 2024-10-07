import React from 'react';
import { FaEye } from 'react-icons/fa';

const products = [
    { id: 1, name: 'Produto A',description:"o1p3j4nerjkqekrb qekhr bqekhr qekjrqe", category:"house",quantity: 10, price: 100, visits: 150,status:"closed",score:5 },
    { id: 2, name: 'Produto B',description:"o1p3j4nerjkqekrb eqreqreqr33r4312rqerqe",category:"tech" ,quantity: 5, price: 200, visits: 300 ,status:"opened",score:5 },
    { id: 3, name: 'Produto C',description:"óqkewonqwekbqekhqbwekqweqwe",category:"clothes" ,quantity: 8, price: 150, visits: 120,status:"cancelled",score:5  },
  ];
  const description = (text)=>text.substring(0,10)+"..."

const ProductTable = ({ setUpdateProduct ,setShowUpdate ,setViewProduct}) => {
  const onUpdate = (...values)=>{

    setUpdateProduct( ...values )
    setShowUpdate( true )
  }
  const onDelete =(id)=>{
    console.log( id ) 
  }
  const onViewProduct = (values)=>{
    setViewProduct( true )
    setUpdateProduct( values )
  }
  return (
    <table className="product-table" >
      <thead>
        <tr>
          <th>Nome</th>
          <th>Description</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Visitas</th>
          <th>Status</th>
          <th>Categoria</th>
          <th>Nota</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{description( product.description )}</td>
            <td>{product.quantity}</td>
            <td>{`R$ ${product.price.toFixed(2)}`}</td>
            <td>{product.visits}</td>
            <td>{product.status}</td>
            <td>{product.category}</td>
            <td>{product.score}</td>
            <td>
              <FaEye onClick={()=>onViewProduct(product)}/>
              <button onClick={()=> onUpdate(product)} >Atualizar</button>
              <button onClick={()=>onDelete(product.id)} >Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
