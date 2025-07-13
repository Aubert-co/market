import { StyleBtn } from "../../Styles/Form"
type Props = {
    name:string,
    onClick:()=>void;
}
export const Button = ({name,onClick}:Props)=><StyleBtn onClick={onClick}>{name}</StyleBtn>