import {  useState } from "react"

import { Pagination } from "../Components/Pagination"
import { BoxProducts } from "../Components/Product/BoxProducts"
import type { PageInfo } from "../types/pagination.types"
import { Container } from "@/Components/Container"




export const Home = ()=>{
    
    const [pages,setPages] = useState<PageInfo>({
        currentPage: 1,
        totalPages: 5,
    })

    
    return (
       <Container>
            <BoxProducts page={pages} setPages={setPages}/>
            <Pagination setCurrentPage={setPages} currentPage={pages.currentPage}  totalPages={pages.totalPages}/>
       </Container>
    )
}