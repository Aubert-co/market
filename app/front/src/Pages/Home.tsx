import { useEffect, useState } from "react"
import { TopBar } from "../Components/Header/TopBar"
import { Aside, Aside2, Container, Header, Main } from "../Styles/Index"
import { fetchData } from "../Services/fetchDatas"
import { serviceGetProducts } from "../Services"

import { Pagination } from "../Components/Pagination"
import type { Products } from "../Components/ListProducts"

type ProductState ={
  datas: Products[];
  status: number;
}
export type TPagination={
    currentPage:number,
    totalPages:number
}
export const Home = ()=>{
    const [products, setProducs] = useState<ProductState>({
        datas: [],
        status:200
    });
    const [pages,setPages] = useState<TPagination>({
        currentPage: 1,
        totalPages: 5,
    })

    useEffect(() => {
        fetchData<number, Products[]>({
            setItems: setProducs,
            service: serviceGetProducts,
            args: pages.currentPage,
            setPages
        });
    }, [pages]);
    return (
        <Container>
            <Header>
                <TopBar/>
            </Header>
            <Aside>
                
            </Aside>
            <Main>
                <Pagination setCurrentPage={setPages} currentPage={pages.currentPage}  totalPages={pages.totalPages}/>
            </Main>
            <Aside2>

            </Aside2>
           
        </Container>
    )
}