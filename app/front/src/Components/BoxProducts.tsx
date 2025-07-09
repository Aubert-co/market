import { useEffect, useState } from "react"
import type { Pagination } from "../Pages/Home"
import { ListProducts } from "./ListProducts"
import type { Products } from "./ListProducts"
import {  fetchProducts } from "../Services/fetchDatas"
import { serviceGetProducts } from "../Services"

type Props = {
    page:Pagination;
    setPages: React.Dispatch<React.SetStateAction<Pagination>>;
}
type ProductState ={
  datas: Products;
  status: number;
}
export const BoxProducts = ({page,setPages}:Props)=>{
    const [products,setProducts] = useState<ProductState>({
        datas:[],
        status:0
    })
    useEffect(() => {
        fetchProducts({setPages,setProducts,service:serviceGetProducts,pages:page.currentPage})
    }, [page.currentPage,setPages]);
    if(products.datas.length === 0 && products.status <200)return <h1>carregando...</h1>
    return (
        <ListProducts listType={'Product'} products={products.datas}  />
    )
}