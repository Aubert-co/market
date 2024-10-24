import React from "react";
import {  render,screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import { Comments } from "../../Components/Product/Comments";

const comments = [
    {text:"Producto Incrivel",rating:1,username:'josefa',date:'10-04-2020'},{text:"Produto horrivel",rating:4,username:'maria',date:"2021-03-07"}
    ,{text:"Nada a reclamar",rating:5,username:'marieta',date:'10-03-2021'}
  ]
describe("Comments",()=>{
    it("When no comments are sent, it should not render the comment list.",()=>{
        render(
            <Comments/>
        )

        expect( screen.queryByTestId("no_comments") ).toBeInTheDocument()
        expect( screen.queryByTestId("list_comments") ).not.toBeInTheDocument()
    })
    it("When comments are sent but it is an empty array, it should not render the comment list.",()=>{
        render(
            <Comments comments={[]}/>
        )

        expect( screen.queryByTestId("no_comments") ).toBeInTheDocument()
        expect( screen.queryByTestId("list_comments") ).not.toBeInTheDocument()
    })
    it("When only one comment is sent, it should render it correctly.",()=>{
        render(
            <Comments comments={[comments[0]]}/>
        )
        const itemsComments = screen.queryAllByTestId("list_comments");
        expect( screen.queryByTestId("no_comments") ).not.toBeInTheDocument()
        expect( screen.queryByTestId("list_comments") ).toBeInTheDocument()

        expect( itemsComments).toHaveLength( 1 )
        
        itemsComments.forEach((val,index)=>{
            expect( val.querySelector("p").textContent).toEqual(comments[index].text)
            expect( val.querySelector("small").textContent).toEqual(`${comments[index].username} ${new Date(comments[index].date).toLocaleDateString()}` )
        })

    })
    it("When comments are sent, it should render the comments correctly.",()=>{
        render(
            <Comments comments={comments}/>
        )
        const itemsComments = screen.queryAllByTestId("list_comments");
        const fullStars = screen.queryAllByTestId("full_star");
        const halfStars = screen.queryAllByTestId("half_star");
        const emptyStars = screen.queryAllByTestId("empty_star")
        expect( screen.queryByTestId("no_comments") ).not.toBeInTheDocument()
        
        expect( itemsComments).toHaveLength( comments.length )

        itemsComments.forEach((val,index)=>{
            expect( val.querySelector("p").textContent).toEqual(comments[index].text)
            expect( val.querySelector("small").textContent).toEqual(`${comments[index].username} ${new Date(comments[index].date).toLocaleDateString()}` )
        })

        expect( fullStars ).toHaveLength(
            comments.reduce((prev,curent)=>{
                return prev+=curent.rating  
            },0)
        )
        expect( halfStars ).toHaveLength(0)
        expect( emptyStars ).toHaveLength(
            comments.reduce((prev,current)=>{
                let value = current.rating
                if( value <= 5)value = 5 - value
                
                if( value === 5)value = 0
                return prev+=value
            },0)
        )
    })
})