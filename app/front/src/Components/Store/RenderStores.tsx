import { useNavigate } from "react-router-dom";
import {  loadImage} from "../../Services";
import type {Store} from '../../Services/StoreServices'
import { StyleBtn } from "../../Styles/Form";
import { ProductSection } from "../../Styles/Index";

type Props = {
    store:Store[]
}
type PropsListStore = Props &{
    onClick:(id:number)=>void
}
export const ListStores = ({store,onClick}:PropsListStore)=>
    store.map(({ name, photo, description,id }) => (
    <div className="product" key={name} >
        <img    
            src={loadImage(photo)}
            alt={`Imagem da loja ${name}`}
            className="img"
        />
        <h2>{name}</h2>
        <p>
             {description.split(" ").slice(0, 20).join(" ")}
        </p>
        <StyleBtn  onClick={() => onClick(id)} >Visualizar Produtos</StyleBtn>
    </div>
  ));

export const RenderStores = ({store}:Props)=>{
    const navigate = useNavigate()
    
    const onClick = (storeId:number)=>{
        navigate(`/admin/products/${storeId}`)
    }
    return(
        <ProductSection>
            <div className="product-container">
                <ListStores store={store} onClick={onClick}/>
            </div>
        </ProductSection>
    )
    
}