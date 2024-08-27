import React from "react";
import { StatusStyle } from "../style";

export const StatusBox = ({text})=>{
    return(
        <StatusStyle>
                <h3>{text}</h3>
        </StatusStyle>
    )
}