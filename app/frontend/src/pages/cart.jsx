import React, { useState } from "react"
import { Container } from "../style"
import { TopBar } from "../components/TopBar"

import { BoxMessage } from "../components/BoxMessage"
import { BoxItems } from "../components/BoxItems"
import { serviceGetCart } from "../services"





export const Cart = ()=>{
    
    return (
        <Container>
            <TopBar/>
            <BoxMessage/>
            <FilterBar/>
            <BoxItems searchParams={searchParams} typeComponent={'Cart'} service={serviceGetCart}/>
        </Container>
    )
}