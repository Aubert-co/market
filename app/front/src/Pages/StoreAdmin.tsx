import { useParams ,Link} from "react-router-dom"
import { FormCreateProduct } from "../Components/FormComponents/FormCreateProduct"
import { deleteProduct ,serviceGetAdminProducts} from "../Services/ProductsServices";
import { StyleBtn } from "../Styles/Form";
import { ProductSection } from "../Styles/Index";
import type { Product } from "@/types/products.types";
import { useEffect, useState } from "react";
import { checkIsAValidNumber } from "../Utils/checkIsValid";
import { loadImage } from "../Services";
import { Container } from "@/Components/Container";
import { StoreLayout } from "@/Components/Store/StoreLayout";
import { ListItems, ListContainer, ListInfo } from "@/Styles/StyledUtils";
import { MiniBoxReview } from "@/Components/Store/boxes/BoxReviews";
import { BoxLowStock } from "@/Components/Store/boxes/BoxLowStock";
import { BoxMostViewd } from "@/Components/Store/boxes/BoxMostViewd";
import { BoxMostSOld } from "@/Components/Store/boxes/BoxMostSold";
/*
type Props = {
    products:Product[],
    storeId:number
}
type PropsListStore = {
    products:Product[],
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
    setDatas:(params:{data:Product[]})=>void,
    storeId:number,
}
const fetchDatas = async({setDatas,storeId}:fetchD):Promise<void>=>{
    const {datas,message,status} = await serviceGetAdminProducts(storeId)
    console.log(message,status)
    setDatas({data:datas})
}
type useSt = {
    data:Product[]
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
}*/

export const StoreAdmin = ()=>{
    return (
        <StoreLayout>
            <ListContainer>
  <div className="list-container">
    
    <BoxMostSOld datas={[{name:'camisa azul',sold:12}]} />
    <BoxMostViewd datas={[{name:'camisa polo',views:559},{name:'vestido',views:52}]}/>

 
    <MiniBoxReview  review={4.5}/>

    
    <BoxLowStock datas={[{name:'camisa polo',stock:5},{name:'camisa azul',stock:3}]}/>

    

  </div>
</ListContainer>

      </StoreLayout>
  )
}