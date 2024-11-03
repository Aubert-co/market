import React, { useEffect, useState } from "react";
import { fetchData } from "../Hooks";
import { ListItems } from "./ListItems";
import { useNavigate } from "react-router";
import { StyleH3 } from "../style/product";

const IsLoading = ()=><h1 data-testid="loading">carregando...</h1>;

export const BoxItems = ({searchParams,service,currentPage,TextRecommended})=>{
    const [items, setItems] = useState({ datas: 'carregando', status:''});
    const navigate = useNavigate();

    const redirectToProduct = (product_id)=>{
      navigate(`/product/${product_id}`);
    }
  
    useEffect(() => {
        fetchData({service,body:searchParams,setItems});
        
    }, [searchParams,currentPage]);
    
    if(items.status !== '' && items.status >201 ) return <h1 data-testid="error">Algo deu errado!</h1>;
    
    return (
      <>
      {Array.isArray(items.datas) && items.datas.length !==0 && TextRecommended ?
        <StyleH3 data-testid="text_item">{TextRecommended}</StyleH3>:""
      }
      <div className="product-container" data-testid="product-container">  
        {items.datas === 'carregando' ? (
          <IsLoading />
        ) : Array.isArray(items.datas) && items.datas.length === 0 && !TextRecommended ? ( 
          <p  className="no_data" data-testid="no_data">Nenhum dado disponível.</p>
        ) : (
          <ListItems datas={items.datas} typeComponent={'product'} redirectToProduct={redirectToProduct} />
        )
        }
      </div>
      </>
    );
};

