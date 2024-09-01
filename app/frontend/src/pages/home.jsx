import React, { useState } from "react"
import { Aside, Aside2, Container,Main ,ProductSection,Header} from "../style"
import { TopBar } from "../Components/Header/TopBar"
import {  SearchContext } from "../Contexts"
import { BoxMessage } from "../Components/BoxMessage"
import { BoxItems } from "../Components/BoxItems"
import { FilterBar } from "../Components/Aside/FilterBar"
import {  serviceGetItems } from "../services";
import {items} from '../tests/fixtures'
import { CartWindow } from "../Components/Aside/CartWindow"
import { SettingsWindow } from "../Components/Aside/SettingsWindow"
const DEFAULT_SEARCH= {name:'',lowPrice:0,highPrice:1000}

export default function Home(){
    const [isWindowCart,setIsWindowCart] = useState(false);
    const [isWindowProfile,setIsWindowProfile] = useState(false);
    const [searchParams,setSearchParams]= useState( DEFAULT_SEARCH  )
    const service =async()=>{
        return {datas:items,status:200}
    }
    return (
        <Container>
            <SearchContext.Provider value={{searchParams,setSearchParams}}>
                <Header>
                    <TopBar isWindowCart={isWindowCart} setIsWindowCart={setIsWindowCart} isWindowProfile={isWindowProfile} setIsWindowProfile={setIsWindowProfile}/>
               
                </Header>
               <Aside>
                 
                </Aside>
          
                <Main>
                    <ProductSection>
                    <BoxItems searchParams={searchParams} service={service}/>
                    </ProductSection>
                </Main>

                <Aside2>
                    <BoxMessage/>
                    <CartWindow setIsWindowOpen={setIsWindowCart} isWindowOpen={isWindowCart}/>
                    <SettingsWindow setIsSettingsOpen={setIsWindowProfile} isSettingsOpen={isWindowProfile}/>
                </Aside2>
            </SearchContext.Provider>
        </Container>
    )
}