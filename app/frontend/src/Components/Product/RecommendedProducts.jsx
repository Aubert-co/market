import React from "react";
import { ProductSection } from "../../style";
import *as values from '../../tests/fixtures';
import { BoxItems } from "../BoxItems";
const newItesm = [values.items[0],values.items[1],values.items[2]]

export const RecommendedProducts = ({})=>{
    const service =async()=>{
        return {datas:newItesm,status:200};
    };
      
    return (
        <>
        <h2>Produtos recomendados</h2>
        <ProductSection>
            <BoxItems service={service}></BoxItems>
        </ProductSection>       
        </>
    )   
}