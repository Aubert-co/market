import { Container } from "@/Components/Container";
import { TopBar } from "@/Components/Header/TopBar";
import { ListComments } from "@/Components/Product/ListComments";
import { ListProducts } from "@/Components/Product/ListProducts";
import { ListRatings } from "@/Components/Product/ListRatings";
import { fetchProduct } from "@/Services/fetchDatas"

import { ProductStyle } from "@/Styles/Product";
import type {  SelectedProduct } from "@/types/products.types";
import { useEffect, useState } from "react"


type ProductState ={
  datas: SelectedProduct,
  status: number,

}


export const Products = ()=>{
    const [products,setProducts] = useState<ProductState>({
        datas: {
            product: [],
            ratings: {
            _avg: {},
            _count: {
                rating: 0
            }
            },
            comments: [],
            reviews:[]
        },
        status:0
    })
    
    useEffect(()=>{
        fetchProduct({setProducts})
    },[])
    
    return(
         <Container>
            <ProductStyle>
                    <ListProducts products={products.datas.product} listType="Product" />
                    <ListRatings ratings={products.datas.ratings}/>
                    <ListComments reviews={products.datas.reviews} comments={products.datas.comments}></ListComments>
            </ProductStyle>
         </Container>
    )
}
  