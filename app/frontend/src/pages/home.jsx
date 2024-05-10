import React, { useState } from "react"
import { Container,Main } from "../style"
import { TopBar } from "../components/TopBar"
import {  SearchContext } from "../contexts"
import { BoxMessage } from "../components/BoxMessage"
import { BoxItems } from "../components/BoxItems"
import { FilterBar } from "../components/FilterBar"
import {  serviceGetItems } from "../services";
import {items} from '../tests/fixtures'

const DEFAULT_SEARCH= {name:'',lowPrice:0,highPrice:1000}

export default function Home(){
   
    const [searchParams,setSearchParams]= useState( DEFAULT_SEARCH  )
    const service =async()=>{
        return {datas:items,status:200}
    }
    return (
        <Container>
            <SearchContext.Provider value={{searchParams,setSearchParams}}>
    
                <TopBar/>
                <BoxMessage/>
                <FilterBar/>
               
                <Main>
                    <BoxItems className="product-section" searchParams={searchParams} service={service}/>
                </Main>
  
            </SearchContext.Provider>
        </Container>
    )
}