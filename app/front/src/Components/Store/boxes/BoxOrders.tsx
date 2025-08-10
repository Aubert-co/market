import { ListItems } from "@/Styles/StyledUtils"
import { Link } from "react-router-dom"

type Orders ={
    id:number,
    status:string
}
type Props  ={
    datas:Orders[]
}
export const BoxLastOrders = ({datas}:Props)=>{
    return (
        <ListItems >
              <div className="list-info">
                <h3>📦 Últimos pedidos</h3>
                <ul>
                    {datas.map((val:Orders)=><li>#{val.id}-{val.status} </li>)}
                </ul>
                <Link to={'test'}>Ver mais</Link>
              </div>
        </ListItems>
    )
}