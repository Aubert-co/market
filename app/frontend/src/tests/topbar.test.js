import React,{useState,useContext} from "react";
import { render,fireEvent, screen, waitFor } from "@testing-library/react";

import { SearchContext } from "../contexts";
import {BrowserRouter, MemoryRouter,Router} from 'react-router-dom'
import { TopBar } from "../components/TopBar";
import { createMemoryHistory } from "history";
var DEFAULT_SEARCH,DEFAULT_CART_WINDOW,DEFAULT_PROFILE_WINDOW,history;

describe('TopBar',()=>{
  
    beforeEach(()=>{
        DEFAULT_PROFILE_WINDOW = {
            isWindowProfile:false,setIsWindowProfile:jest.fn()
        }
        DEFAULT_CART_WINDOW={isWindowCart:false,setIsWindowCart:jest.fn()}
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
                    <TopBar isWindowCart={DEFAULT_CART_WINDOW.isWindowCart} 
                    setIsWindowCart={DEFAULT_CART_WINDOW.setIsWindowCart} 
                    isWindowProfile={DEFAULT_PROFILE_WINDOW.isWindowProfile} 
                    setIsWindowProfile={DEFAULT_PROFILE_WINDOW.setIsWindowProfile}/>
              
                    </SearchContext.Provider>  
        </Router> 
       )
    })
 
    it("Clicking on the 'Cart' should open the window cart",()=>{
        const cartLink = screen.getByTestId('cart_window')
     
        fireEvent.click( cartLink )
        expect(DEFAULT_CART_WINDOW.setIsWindowCart).toHaveBeenCalledTimes(1)
        expect(DEFAULT_CART_WINDOW.setIsWindowCart).toHaveBeenCalledWith(true)
      
    })
    it("Clicking on the 'Home' link should change the pathname to /",()=>{
        const homeLink = screen.getByTestId('home')
     
        fireEvent.click( homeLink )
        const {pathname} = history.location
        expect( pathname ).toBe('/')
       
    })
    it("Clicking on the 'Profile' should open the window profile",()=>{
        const profileLink = screen.getByTestId('profile_window')
     
        
        fireEvent.click( profileLink )
        expect(DEFAULT_PROFILE_WINDOW.setIsWindowProfile).toHaveBeenCalledTimes(1)
        expect(DEFAULT_PROFILE_WINDOW.setIsWindowProfile).toHaveBeenCalledWith(true)
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