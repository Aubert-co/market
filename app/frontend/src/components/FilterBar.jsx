import React, { useRef, useContext} from "react";
import { SearchContext, } from "../contexts";



export const FilterBar = ()=>{
    const {searchParams,setSearchParams} = useContext( SearchContext )
    const minPrice = useRef(0)
    const maxPrice = useRef(1000)
    
    const clickToFilter = () => {
      const lowPrice =Number(minPrice.current.value)
      const highPrice = Number(maxPrice.current.value)

        if(lowPrice === 0 && highPrice === 0 )return
        if( searchParams.highPrice === highPrice && searchParams.lowPrice === lowPrice)return
        if(lowPrice >= highPrice)return
        const newFilterParams = {...searchParams,lowPrice,highPrice};
  
        setSearchParams(newFilterParams);
       
      };
    return (
        <div>
          <div className="price">
            min:
            <input  data-testid="input_filter" min={0} type="number" ref={minPrice} />
            max:
            <input data-testid="input_filter" min={1} type="number" ref={maxPrice} />
            <button data-testid="btn_filter" onClick={clickToFilter}>Filter</button>
          </div>
        </div>
      );
    
}