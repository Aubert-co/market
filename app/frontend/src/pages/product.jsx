import React, { useContext, useState } from "react"
import { Aside, Aside2, Container,Main ,Header} from "../style";
import { TopBar } from "../Components/Header/TopBar";
import {  SearchContext ,CartWindowCtx,SetttingsWindowCtx} from "../Contexts";
import { BoxMessage } from "../Components/BoxMessage";
import {  serviceGetItems } from "../services";
import {items} from '../tests/fixtures';
import { CartWindow } from "../Components/Aside/CartWindow";
import { SettingsWindow } from "../Components/Aside/SettingsWindow";
import { useParams } from "react-router-dom";
import { MainContainer } from "../style/product";
import { ProductContainer } from "../Components/Product/ProductContainer";


export default function Product(){
    const {isWindowCart,setIsWindowCart} = useContext(CartWindowCtx);
    const {isWindowProfile,setIsWindowProfile} = useContext(SetttingsWindowCtx);
    const {searchParams,setSearchParams}=   useContext(SearchContext);
    const {id} = useParams()
    const service =async()=>{
        return {datas:items,status:200};
    };
    return (
        <Container>
            <SearchContext.Provider value={{searchParams,setSearchParams}}>
                <Header>
                    <TopBar isWindowCart={isWindowCart} setIsWindowCart={setIsWindowCart} isWindowProfile={isWindowProfile} setIsWindowProfile={setIsWindowProfile}/>
               
                </Header>
               <Aside>
                 
                </Aside>
          
                <Main>
                   <ProductContainer/>
                </Main>

                <Aside2>
                    <BoxMessage/>
                    <CartWindow setIsWindowOpen={setIsWindowCart} isWindowOpen={isWindowCart}/>
                    <SettingsWindow setIsSettingsOpen={setIsWindowProfile} isSettingsOpen={isWindowProfile}/>
                </Aside2>
            </SearchContext.Provider>
        </Container>
    )
};