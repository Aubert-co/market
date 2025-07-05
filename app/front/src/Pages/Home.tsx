import { useEffect, useState } from "react"
import { TopBar } from "../Components/Header/TopBar"
import { Aside, Aside2, Container, Header, Main } from "../Styles/Index"
import { fetchData } from "../Services/fetchDatas"
import { serviceGetProducts } from "../Services"

type Products = {
    name:string,
    price:number,
    id:number,
    imgPath:string,
    category:string
}
export const Home = ()=>{
    const [products, setProducs] = useState({
  datas: [],
  currentPage: 1,
  totalPages: 5,
});

useEffect(() => {
  fetchData<number, Products[]>({
    setItems: setProducs,
    service: serviceGetProducts,
    args: products.currentPage,
  });
}, []);
    return (
        <Container>
            <Header>
                <TopBar/>
            </Header>
            <Aside>
                
            </Aside>
            <Main>
                
            </Main>
            <Aside2>

            </Aside2>
        </Container>
    )
}