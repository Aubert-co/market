import React from "react";
import {  render,screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import { Comments } from "../../Components/Product/Comments";

const comments = [
    {text:"Producto Incrivel",rating:1,username:'josefa',date:'10-04-2020'},{text:"Produto horrivel",rating:4,username:'maria',date:"2021-03-07"}
    ,{text:"Nada a reclamar",rating:5,username:'marieta',date:'10-03-2021'}
  ]
describe("Comments",()=>{
    it("When no comments are sent it should not render the comment list",()=>{
        render(
            <Comments/>
        )

        expect( screen.queryByTestId("no_comments") ).toBeInTheDocument()
        expect( screen.queryByTestId("list_comments") ).not.toBeInTheDocument()
    })
    it("When are sent comments should render comments corrctly",()=>{
        render(
            <Comments comments={comments}/>
        )
        const itemsComments = screen.queryAllByTestId("list_comments")

        expect( screen.queryByTestId("no_comments") ).not.toBeInTheDocument()
        
        expect( itemsComments).toHaveLength( comments.length )

        itemsComments.forEach((val,index)=>{
            expect( val.querySelector("p").textContent).toEqual(comments[index].text)
            expect( val.querySelector("small").textContent).toEqual(`${comments[index].username} ${new Date(comments[index].date).toLocaleDateString()}` )
            
        })
    })
})