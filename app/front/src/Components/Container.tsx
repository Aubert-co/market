import { Aside, Aside2, ContainerStyle, Header, Main } from "@/Styles/Index"
import { TopBar } from "./Header/TopBar"
import type React from "react"

type Props={
    children:React.ReactNode
}
export const Container = ({children}:Props)=>{
    return(
    <ContainerStyle>
        <Header>
            <TopBar/>
        </Header>
        <Aside></Aside>
        <Main>
            {children}
        </Main>
        <Aside2>

        </Aside2>
    </ContainerStyle>
    )
}