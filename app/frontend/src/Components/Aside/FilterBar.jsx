import React, { useRef, useContext} from "react";
import { SearchContext, } from "../../Contexts";
import { getMultiInputValues } from "../Utils";



export const FilterBar = ()=>{
    const {searchParams,setSearchParams} = useContext( SearchContext );
    const minPrice = useRef(0);
    const maxPrice = useRef(1000);
    
    const clickToFilter = () => {
        const[lowPrice,highPrice]=getMultiInputValues(minPrice,maxPrice);
        if(lowPrice === 0 && highPrice === 0 )return;
        if( searchParams.highPrice === highPrice && searchParams.lowPrice === lowPrice)return;
        if(lowPrice >= highPrice)return;
        const newFilterParams = {...searchParams,lowPrice,highPrice};
  
        setSearchParams(newFilterParams);
       
      };
    return (
      <div className="filter-bar">
        <label htmlFor="minPrice">Min:</label>
        <input id="minPrice" data-testid="input_filter" min={0} type="number" ref={minPrice} />
        
        <label htmlFor="maxPrice">Max:</label>
        <input id="maxPrice" data-testid="input_filter" min={1} type="number" ref={maxPrice} />
        
        <button data-testid="btn_filter" onClick={clickToFilter}>Filter</button>
      </div>
    
      );
    
}