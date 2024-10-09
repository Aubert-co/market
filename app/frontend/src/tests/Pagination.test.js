import React, { useState } from "react";
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import { Pagination } from "../Components/Pagination";




describe('Pagination',()=>{
    it("When rendering the pagination component and clicking on an element, it should change the page correctly.",async()=>{
        const pageNumber = 3
        const currentPage = 1
        const onChange = jest.fn()
        render(
            <Pagination totalPages={pageNumber} currentPage={currentPage} onPageChange={onChange}/>

        )
        const items = screen.queryAllByTestId("pagination")
        expect( items).toHaveLength( pageNumber )
        items.forEach((val,ind)=>{
            
            expect( val.textContent ).toBe(`${ind+1}`)
        })
        expect( items[0].className).toEqual("active")
        expect( items[1].className).toEqual("")
        expect( items[2].className).toEqual("")
        fireEvent.click( items[0] )
        expect( onChange).toHaveBeenCalledTimes( 1 )
        expect( onChange).toHaveBeenCalledWith( 1 )
        
        fireEvent.click( items[1])
        
        expect( onChange ).toHaveBeenCalledWith( 2 )


    
        fireEvent.click( items[2])
        expect( onChange).toHaveBeenCalledTimes(3)
        expect( onChange).toHaveBeenCalledWith( 3 )

        
    })
    it("When the current page is different from the first page, it should render the items correctly and change the page when clicked.",async()=>{
        const pageNumber = 3
        const currentPage = 2
        const onChange = jest.fn()
        render(
            <Pagination totalPages={pageNumber} currentPage={currentPage} onPageChange={onChange}/>

        )
        const items = screen.queryAllByTestId("pagination")
        expect( items ).toHaveLength( pageNumber )
        items.forEach((val,ind)=>{
            
            expect( val.textContent ).toBe(`${ind+1}`)
        })
        expect( items[0].className).toEqual("")
        expect( items[1].className).toEqual("active")
        expect( items[2].className).toEqual("")

        fireEvent.click( items[0] )
        expect( onChange).toHaveBeenCalledTimes( 1 )
        expect( onChange).toHaveBeenCalledWith( 1 )
     

        
    })
})

