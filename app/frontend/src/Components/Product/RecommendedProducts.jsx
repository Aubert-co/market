import React, { useEffect, useState } from "react";
import { ProductSection } from "../../style";
import *as values from '../../tests/fixtures';
import { BoxItems } from "../BoxItems";
import { StyleH3 } from "../../style/product";
import { fetchData } from "../../Hooks";
const newItesm = [values.items[0],values.items[1],values.items[2]]


export const RecommendedProducts = ({text,service})=>{
    const service =async()=>{
        return {datas:newItesm,status:200};
    };
    return (
        <>
        <ProductSection>
        <StyleH3>{text}</StyleH3>
            <BoxItems service={service}></BoxItems>
        </ProductSection>       
        </>
    )   
}