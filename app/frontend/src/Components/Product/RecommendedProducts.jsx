import React, { useEffect, useState ,useRef} from "react";
import { ProductSection } from "../../style";
import *as values from '../../tests/fixtures';
import { BoxItems } from "../BoxItems";
import { StyleH3 } from "../../style/product";
import { fetchData } from "../../Hooks";



export const RecommendedProducts = ({text,service})=>{
    
    return (
        <>
            <ProductSection>
                <BoxItems TextRecommended={text} searchParams={null} currentPage={null} service={service}></BoxItems>
            </ProductSection>       
        </>
    )   
}