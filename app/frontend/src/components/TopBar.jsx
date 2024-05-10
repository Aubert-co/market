import React,{useRef,useContext} from "react";
import { Header } from "../style";
import { SearchContext } from "../contexts";
import { Link } from "react-router-dom";


export const SearchBar = ()=>{
    const {searchParams,setSearchParams} = useContext( SearchContext )
    const inputRef = useRef( null )
   
    const clickSend = ()=>{
        const name = inputRef.current.value
        if(name.length > 2)  setSearchParams({...searchParams,name})
    }
    return (

        <div className="search">
            <input required minLength={2} maxLength={20} className="input_search" ref={inputRef} data-testid="input_test" placeholder="SEARCH A PRODUCT"/>
            <button className="btn_search" data-testid="btn_search" onClick={clickSend}>Search</button>
        </div>
    )
}
export const TopBar = ()=>{
    return (
       <Header>
            
            <div className="logo">
                <Link to="/" data-testid="home">SUPERSTORE</Link>
            </div>
            <SearchBar  />
            <nav>
            
                <Link to="/cart" data-testid="cart">
                    Cart
                </Link>
                <Link to="/profile" data-testid="profile">
                    Settings 
                </Link>
            </nav>
       </Header>
    )
}