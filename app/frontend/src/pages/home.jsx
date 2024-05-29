import React, { useState } from "react"
import { Aside, Aside2, Container,Main } from "../style"
import { TopBar } from "../components/TopBar"
import {  SearchContext } from "../contexts"
import { BoxMessage } from "../components/BoxMessage"
import { BoxItems } from "../components/BoxItems"
import { FilterBar } from "../components/FilterBar"
import {  serviceGetItems } from "../services";
import {items} from '../tests/fixtures'
import { CartWindow, SettingsWindow } from "../components/BoxWindows"

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
    
                <TopBar isWindowCart={isWindowCart} setIsWindowCart={setIsWindowCart} isWindowProfile={isWindowProfile} setIsWindowProfile={setIsWindowProfile}/>
                <Aside>
                    <FilterBar/>
                </Aside>
          
                <Main>
                    <BoxItems className="product-section" searchParams={searchParams} service={service}/>
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