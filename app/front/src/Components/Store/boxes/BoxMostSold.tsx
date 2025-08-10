import { ListItems } from "@/Styles/StyledUtils"

type MostSold = {
    name:string,
    sold:number
}
type Props = {
    datas:MostSold[]
}
export const BoxMostSOld = ({datas}:Props)=>{
    return (
        <ListItems size="big">
              <div className="list-info">
                <h3>📈 Produtos mais vendidos</h3>
                <ul>
                    {datas.map((val:MostSold)=>{
                        return <li>{val.name} - {val.sold} vendas</li>
                    })}
                </ul>
              </div>
        </ListItems>
    )
}