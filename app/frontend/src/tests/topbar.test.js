import React,{useState,useContext} from "react";
import { render,fireEvent, screen, waitFor } from "@testing-library/react";

import { SearchContext } from "../contexts";
import {BrowserRouter, MemoryRouter,Router} from 'react-router-dom'
import { TopBar } from "../components/TopBar";
import { createMemoryHistory } from "history";
var DEFAULT_SEARCH,history;

describe('TopBar',()=>{
  
    beforeEach(()=>{
        
        DEFAULT_SEARCH = {
           searchParams:{
               name:'skirt',lowPrice:0,high:1000,category:''
           },
           setSearchParams:jest.fn()
       }
       jest.spyOn(React,'useState').mockReturnValue([DEFAULT_SEARCH.searchParams,DEFAULT_SEARCH.setSearchParams])
       
        history = createMemoryHistory();
       render(
        <Router location={history.location} navigator={history}>
                    <SearchContext.Provider value={ DEFAULT_SEARCH }>
                        <TopBar></TopBar>
                    </SearchContext.Provider>  
        </Router> 
       )
    })
 
    it("Clicking on the 'Cart' link should change the URL to /cart",()=>{
        const cartLink = screen.getByTestId('cart')
     
        fireEvent.click( cartLink )
        const {pathname} = history.location
        expect( pathname ).toBe('/cart')
        expect( pathname ).not.toBe('/')
      
    })
    it("Clicking on the 'Home' link should change the pathname to /",()=>{
        const homeLink = screen.getByTestId('home')
     
        fireEvent.click( homeLink )
        const {pathname} = history.location
        expect( pathname ).toBe('/')
       
    })
    it("Clicking on the 'Profile' link should change the pathname to /profile",()=>{
        const profileLink = screen.getByTestId('profile')
     
        
        fireEvent.click( profileLink )
        const {pathname} = history.location
        expect( pathname ).toBe('/profile')
        expect( pathname ).not.toBe('/')
    })
    it("Changing the input value to a new value",()=>{
        const input = screen.getByTestId('input_test')
        fireEvent.change(input,{target:{value:'skirt'}})
         
        expect(input.value).toEqual('skirt')
    })
    it("Update the default value from 'name' to a new name, while leaving the other values unchanged.",async()=>{
        const newName = "skirt"
        const input = screen.getByTestId('input_test')
        const button = screen.getByTestId('btn_search')

        fireEvent.change(input,{target:{value:newName}})
        fireEvent.click( button )
        
        await waitFor(()=>{
            expect(DEFAULT_SEARCH.setSearchParams).toHaveBeenCalledWith({...DEFAULT_SEARCH.searchParams,name:newName})
            expect(DEFAULT_SEARCH.setSearchParams).not.toHaveBeenCalledWith({...DEFAULT_SEARCH.searchParams,name:'dress'})

            expect(DEFAULT_SEARCH.setSearchParams).toHaveBeenCalledTimes(1)
        })
    })
    it("When the input value's length is smaller than 2, the name should not be updated.",async()=>{
        const newName = "sk"
        const input = screen.getByTestId('input_test')
        const button = screen.getByTestId('btn_search')

        fireEvent.change(input,{target:{value:newName}})
        fireEvent.click( button )
        
        await waitFor(()=>{
        expect( DEFAULT_SEARCH.setSearchParams ).not.toHaveBeenCalled()
        
        })
    })
})