import React,{useRef,useContext} from "react";
import { Header } from "../style";
import { SearchContext } from "../contexts";
import { Link } from "react-router-dom";
import { FaShoppingCart ,FaUser} from 'react-icons/fa';


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
export const TopBar = ({isWindowCart,setIsWindowCart,isWindowProfile,setIsWindowProfile})=>{
    return (
       <Header>
            
            <div className="logo">
                <Link to="/" data-testid="home">SUPERSTORE</Link>
            </div>
            <SearchBar  />
            <nav>
            
                <i>
                    <FaShoppingCart data-testid="cart_window" onClick={()=>setIsWindowCart(!isWindowCart)}/>
                </i>
                <i >
                    <FaUser data-testid="profile_window" onClick={()=>setIsWindowProfile(!isWindowProfile)}/> 
                </i>
            </nav>
       </Header>
    )
}