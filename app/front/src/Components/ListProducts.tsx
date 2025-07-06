export type Products = {
    name:string,
    price:number,
    id:number,
    imageUrl:string,
    category:string
}
type Props = {
    products:Products[]
}
export const ListProducts = ({products}:Props)=>{

    return (
        products.map((val)=>{
            return
        })
    )
}