import { ListItems } from "@/Styles/StyledUtils"
type Values = {
    name:string,
    stock:number
}
type Props ={
    datas:Values[]
}
export const BoxLowStock = ({datas}:Props)=>{
    return (
        <ListItems>
            <h3>⚠ Estoque baixo</h3>
              <div className="list-info">
                <ul>
                {datas.map((val:Values)=>{
                    return (
                    
                        <li>{val.name} - possui {val.stock} unidades restantes</li>
                   
                )
                })}
                 </ul>
              </div>
        </ListItems>
    )
}