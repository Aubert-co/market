import { useNavigate } from "react-router-dom";
import { imageUrl ,type Store} from "../../Services";

type Props = {
    store:Store[]
}
export const RenderStores = ({store}:Props)=>{
    const navigate = useNavigate()
    
    const onClick = (storeId:number)=>{
        navigate(`/store/mystores/${storeId}`)
    }
    
    return store.map(({ name, photo, description,id }) => (
    <div onClick={() => onClick(id)} className="store-box" key={name} style={{ textAlign: "center" }}>
        <img
            src={imageUrl(photo)}
            alt={`Imagem da loja ${name}`}
            style={{
            maxWidth: "200px",
            height: "auto",
            borderRadius: "8px",
            objectFit: "cover"
            }}
        />
        <h2>{name}</h2>
        <p>{description}</p>
    </div>
  ));
}