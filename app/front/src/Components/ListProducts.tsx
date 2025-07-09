import { useNavigate } from "react-router-dom"

export type Product ={
    name:string,
    price:number,
    id:number,
    imageUrl:string,
    category:string
}
type ListType = 'Product' | 'Cart'
export type Products = Product[]
type Props = {
    products:Products,
    listType:ListType
}
export const RenderPrice = (params:{type:ListType,price:number})=> 
    params.type === "Product" &&
    <p className="item_price" >{params.price}</p>;

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
                    onClick={()=>redirectToProduct(id)}
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