import {  useState } from "react"
import { TopBar } from "../Components/Header/TopBar"
import { Aside, Aside2, Container, Header, Main } from "../Styles/Index"
import { Pagination } from "../Components/Pagination"
import { BoxProducts } from "../Components/BoxProducts"



export type Pagination={
    currentPage:number,
    totalPages:number
}
export const Home = ()=>{
    
    const [pages,setPages] = useState<Pagination>({
        currentPage: 1,
        totalPages: 5,
    })

    
    return (
        <Container>
            <Header>
                <TopBar/>
            </Header>
            <Aside>
                
            </Aside>
            <Main>
                <BoxProducts page={pages} setPages={setPages}/>
                <Pagination setCurrentPage={setPages} currentPage={pages.currentPage}  totalPages={pages.totalPages}/>
            </Main>
            <Aside2>

            </Aside2>
           
        </Container>
    )
}