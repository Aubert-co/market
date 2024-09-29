import * as React from 'react'
import { fireEvent, queryByTestId, render,screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import { BoxWindow } from '../../Components/Aside/BoxWindows';
import { items } from '../fixtures';
import * as Service from '../../services/cart';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";

var setIsWindowOpen,serviceUpdateCart;
describe('BoxWindow',()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
        setIsWindowOpen = jest.fn();
        serviceUpdateCart= jest.spyOn(Service,'serviceUpdateCart')
    })
    it("When the window is closed, it should not render items from the cart or settings.",()=>{
        render(
            <BoxWindow setIsWindowOpen={setIsWindowOpen} isWindowOpen={false} datas={items} typeWindow={'Cart'} status={201}/>
        )
        const overlay = screen.queryByTestId("overlay")
        expect( overlay ).not.toBeInTheDocument()
        expect( setIsWindowOpen ).not.toHaveBeenCalled()
        expect( screen.queryByTestId("list_settings") ).not.toBeInTheDocument()
        expect( screen.queryByTestId("list_items") ).not.toBeInTheDocument()
        expect( screen.queryByTestId("window_close") ).not.toBeInTheDocument()
        expect(document.body).toHaveStyle("overflow:auto")
        
    })
    it("When the window is open and the type is 'Cart', it should render items from the cart.",()=>{
        render(
            <BoxWindow setIsWindowOpen={setIsWindowOpen} isWindowOpen={true} datas={items} typeWindow={'Cart'} status={201}/>
        )
        const window_close = screen.queryByTestId("window_close")
        const overlay = screen.queryByTestId("overlay")

        expect( overlay ).toBeInTheDocument()
        expect( setIsWindowOpen ).not.toHaveBeenCalled()
        expect( screen.queryByTestId("list_settings") ).not.toBeInTheDocument()
        expect( screen.queryByTestId("list_items") ).toBeInTheDocument()
        expect( window_close ).toBeInTheDocument()

        fireEvent.click( window_close )

        expect(setIsWindowOpen).toHaveBeenCalledWith( false )
        expect( setIsWindowOpen ).toHaveBeenCalledTimes(1)
        expect( serviceUpdateCart ).toHaveBeenCalledTimes(1)
        expect(document.body).toHaveStyle("overflow:hidden")
    })
    it("When the window is open and the type is 'Settings', it should render items from 'Settings'.",()=>{
       const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <BoxWindow setIsWindowOpen={setIsWindowOpen} isWindowOpen={true} datas={items} typeWindow={'Settings'} status={201}/>
            </Router>
        )
        const window_close = screen.queryByTestId("window_close")
        const overlay = screen.queryByTestId("overlay")
        expect( overlay ).not.toBeInTheDocument()
        expect( setIsWindowOpen ).not.toHaveBeenCalled()
        
        expect( screen.queryByTestId("list_settings") ).toBeInTheDocument()
        expect( screen.queryByTestId("list_items") ).not.toBeInTheDocument()
        expect( window_close ).toBeInTheDocument()

        fireEvent.click( window_close )

        expect(setIsWindowOpen).toHaveBeenCalledWith( false )
        expect( setIsWindowOpen ).toHaveBeenCalledTimes(1)
        expect( serviceUpdateCart ).toHaveBeenCalledTimes(0)
        expect(document.body).toHaveStyle("overflow:hidden")
    })
    it("When clicking on the overlay and the type of window is 'Settings', it should close the window.",()=>{
        const history = createMemoryHistory();
         render(
             <Router location={history.location} navigator={history}>
                 <BoxWindow setIsWindowOpen={setIsWindowOpen} isWindowOpen={true} datas={items} typeWindow={'Settings'} status={201}/>
             </Router>
         )
         const window_close = screen.queryByTestId("window_close")
         const overlay = screen.queryByTestId("overlay")

         expect( setIsWindowOpen ).not.toHaveBeenCalled()
         expect( screen.queryByTestId("list_settings") ).toBeInTheDocument()
         expect( screen.queryByTestId("list_items") ).not.toBeInTheDocument()
         expect( window_close ).toBeInTheDocument()
         expect( overlay).toBeInTheDocument()
         fireEvent.click(  overlay)
 
         expect(setIsWindowOpen).toHaveBeenCalledWith( false )
         expect( setIsWindowOpen ).toHaveBeenCalledTimes(1)
         expect( serviceUpdateCart ).toHaveBeenCalledTimes(0)
         expect(document.body).toHaveStyle("overflow:hidden")
     })
    it("When clicking on the overlay and the type of window is 'Cart', it should close the window.",()=>{
        render(
            <BoxWindow setIsWindowOpen={setIsWindowOpen} isWindowOpen={true} datas={items} typeWindow={'Cart'} status={201}/>
        )
        const window_close = screen.queryByTestId("window_close")
        const overlay = screen.queryByTestId("overlay")
        expect( setIsWindowOpen ).not.toHaveBeenCalled()
        expect( screen.queryByTestId("list_settings") ).not.toBeInTheDocument()
        expect( screen.queryByTestId("list_items") ).toBeInTheDocument()
        expect( window_close ).toBeInTheDocument()
        expect( overlay).toBeInTheDocument()
        fireEvent.click(  overlay)

        expect(setIsWindowOpen).toHaveBeenCalledWith( false )
        expect( setIsWindowOpen ).toHaveBeenCalledTimes(1)
        expect( serviceUpdateCart ).toHaveBeenCalledTimes(1)
        expect(document.body).toHaveStyle("overflow:hidden")
    })
})