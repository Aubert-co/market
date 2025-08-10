import { ListInfo, ListItems } from "@/Styles/StyledUtils"

type Props = {
    review:number
}
export const MiniBoxReview = ({review}:Props)=>{
    return (
        <ListItems size="small">
              <ListInfo>
                <h3>⭐ Nota média</h3>
                <p>{review} / 5</p>
              </ListInfo>
            </ListItems>
    )
}