import { useEffect, useState } from "react"
import { ListProducts } from "./ListProducts"
import type { Product } from "@/types/products.types"
import {  fetchProducts } from "@/Services/fetchDatas"
import { serviceGetProducts } from "@/Services/ProductsServices"
import type { PageInfo } from "@/types/pagination.types"
import { ProductSection } from "@/Styles/Index"

type Props = {
    page:PageInfo;
    setPages: React.Dispatch<React.SetStateAction<PageInfo>>;
}
type ProductState ={
  datas: Product[];
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
        <ProductSection>
            <div className="product-container">
                <ListProducts listType={'Product'} products={products.datas}  />
            </div>
        </ProductSection>
        
    )
}