import { useParams } from "react-router-dom"
import { FormCreateProduct } from "../Components/FormComponents/FormCreateProduct"
import { deleteProduct ,serviceGetAdminProducts} from "../Services/ProductsServices";
import { StyleBtn } from "../Styles/Form";
import { ProductSection } from "../Styles/Index";
import type { Products } from "../Components/ListProducts";
import { useEffect, useState } from "react";
import { checkIsAValidNumber } from "../Utils/checkIsValid";
import { loadImage } from "../Services";

type Props = {
    products:Products,
    storeId:number
}
type PropsListStore = {
    products:Products,
    onDelete:(id:number)=>void
}
export const ListStores = ({products,onDelete}:PropsListStore)=>
    products.map(( val ) => (
    <div className="product" key={val.name} >
        <img    
            src={loadImage(val.imageUrl)}
            alt={`Imagem da loja ${val.name}`}
            className="img"
        />
        <h2>{val.name}</h2>
        <p>
            {val.description.split(" ").slice(0, 20).join(" ")}
        </p>
     
        <StyleBtn onClick={()=>onDelete(val.id)}>Deletar produto</StyleBtn>
    </div>
  ));

export const RenderStores = ({products,storeId}:Props)=>{
    
   
    const onDelete = async(productId:number):Promise<void>=>{
        
        await deleteProduct({productIds:[productId],storeId})
    }
    return(
        <ProductSection>
            <div className="product-container">
                <ListStores products={products} onDelete={onDelete}/>
            </div>
        </ProductSection>
    )
    
}
type fetchD ={
    setDatas:(params:{data:Products})=>void,
    storeId:number,
}
const fetchDatas = async({setDatas,storeId}:fetchD):Promise<void>=>{
    const {datas,message,status} = await serviceGetAdminProducts(storeId)
    console.log(message,status)
    setDatas({data:datas})
}
type useSt = {
    data:Products
}
export const AdminProducts = ()=>{
    const [useDatas,setDatas] = useState<useSt>({data:[]})
    const { storeid }  = useParams()    
    useEffect(()=>{
        if(storeid && checkIsAValidNumber(storeid)){
            fetchDatas({setDatas,storeId:Number(storeid)})
        }
    },[])
    if(!storeid)return;
    return (
        <>
            <RenderStores products={useDatas.data} storeId={Number(storeid)}/>
            <FormCreateProduct storeId={storeid}/>
        </>
    )
}