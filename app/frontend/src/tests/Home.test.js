import React, { act } from "react";
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import  *as Services from "../services"
import { ListItems } from "../Components/ListItems";
import { CartWindowCtx, MessageContext, SearchContext, SetttingsWindowCtx } from "../Contexts";
import '@testing-library/jest-dom'
import { items } from "./fixtures";
import {BrowserRouter, MemoryRouter,Router} from 'react-router-dom'
import { createMemoryHistory } from "history";
import Home from "../pages/home";

var DEFAULT_MESSAGE,DEFAULT_SEARCH,DEFAULT_CART_WINDOW,DEFAULT_PROFILE_WINDOW,history;
describe("test",()=>{
    beforeEach(()=>{
        DEFAULT_MESSAGE = {
            messageParams:{
                content:'',type:''
            },
            setMessageParams:jest.fn()
        }
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
       history = createMemoryHistory();
    })
    it("tets",async()=>{
        await act(async () => {
            render(
              <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={DEFAULT_MESSAGE}>
                  <SetttingsWindowCtx.Provider value={DEFAULT_PROFILE_WINDOW}>
                    <SearchContext.Provider value={DEFAULT_SEARCH}>
                      <CartWindowCtx.Provider value={DEFAULT_CART_WINDOW}>
                        <Home />
                      </CartWindowCtx.Provider>
                    </SearchContext.Provider>
                  </SetttingsWindowCtx.Provider>
                </MessageContext.Provider>
              </Router>
            );
        
            
          });
        
       expect( screen.queryByTestId("header") ).toBeInTheDocument()
       expect( screen.queryByTestId("promo_container")).toBeInTheDocument()
       expect( screen.queryByTestId("product_section") ).toBeInTheDocument()
       screen.queryAllByTestId("pagination")
       .forEach((val)=>{
        expect( val ).toBeInTheDocument()
       })
        
       })
})