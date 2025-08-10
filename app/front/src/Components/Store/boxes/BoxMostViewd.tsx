import { ListItems } from "@/Styles/StyledUtils"

type Views = {
    name:string,
    views:number
}
type Props = {
    datas:Views[]
}
export const BoxMostViewd = ({datas}:Props)=>{
    return (
          <ListItems>
              <div className="list-info">
                <h3>👀 Produtos mais visualizados</h3>
                <ul>
                  {datas.map((val:Views)=>{
                    return <li>{val.name} - {val.views} visualizações</li>
                  })}
                </ul>
              </div>
            </ListItems>
    )
}