import { useNavigate } from "react-router-dom"
import type { Product } from "@/types/products.types"

type ListType = 'Product' | 'Cart'

type Props = {
    products:Product[],
    listType:ListType
}
export const RenderPrice = (params:{type:ListType,price:number})=> 
    params.type === "Product" &&
    <p className="item_price" >R${params.price}</p>;

export const ListProducts = ({products,listType}:Props)=>{
    const navigate = useNavigate()
    const redirectToProduct = (productId:number)=>{
        navigate(`/product/${productId}`)
    }
    return (
        products.map(({id,name,imageUrl,price})=>{
            return (
                <div className="product"
                    key={id}
                    onClick={
                        ()=>redirectToProduct(id)
                    }
                >
                    <div className="img">
                        <img alt={name}
                            src={imageUrl}
                        />
                    </div>
                    <RenderPrice price={price} type={listType}/>
                    <p className="item_name">{name}</p>

                </div>
            )
        })
    )
}