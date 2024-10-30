import React, { useEffect, useState } from "react";
import { ProductSection } from "../../style";
import *as values from '../../tests/fixtures';
import { BoxItems } from "../BoxItems";
import { StyleH3 } from "../../style/product";
import { fetchData } from "../../Hooks";



export const RecommendedProducts = ({text,service})=>{
   
    return (
        <>
        <ProductSection>
        <StyleH3 data-testid="styled_h3">{text}</StyleH3>
            <BoxItems searchParams={null} currentPage={null} service={service}></BoxItems>
        </ProductSection>       
        </>
    )   
}