import React,{useRef,useContext} from "react";
import { SearchContext } from "../../Contexts";

export const SearchBar = ()=>{
    const {searchParams,setSearchParams} = useContext( SearchContext )
    const inputRef = useRef( null )
   
    const clickSend = ()=>{
        const name = inputRef.current.value
        if(name.length > 2)  setSearchParams({...searchParams,name})
    }
    return (

        <div className="search">
            <input required minLength={2} maxLength={20} className="input_search" ref={inputRef} data-testid="input_test" placeholder="BUSQUE POR UM PRODUTO"/>
            <button className="btn_search" data-testid="btn_search" onClick={clickSend}>BUSCAR</button>
        </div>
    )
}