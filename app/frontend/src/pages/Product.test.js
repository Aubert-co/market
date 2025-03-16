import React from "react";
import { fireEvent, render,screen, waitFor ,act} from "@testing-library/react";
import  *as Services from "../services";
import Product from "./Product";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from "history";
import { CartWindowCtx, MessageContext, SetttingsWindowCtx ,SearchContext} from "../Contexts";
import { mockContextValue ,mockIsWindowOpen,mockCartWindow, mockSearch} from "../tests/mocks";
import { App } from "./router";

var history;
describe("Prouct",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })

 
   it("should",async()=>{
    history = createMemoryHistory({ initialEntries: ['/product/55'] }); 
    const mockService = jest.spyOn(Services,'serviceGetProduct')
    await act
    (async()=>{ render(
            <SearchContext.Provider value={mockSearch('',0,1000)}>
            <SetttingsWindowCtx.Provider value={mockIsWindowOpen(false)}>
            <CartWindowCtx.Provider value={mockCartWindow(false)}>
            <MessageContext.Provider value={mockContextValue('','')}>
                <MemoryRouter initialEntries={['/product/55']}>
                <Routes>
                    <Route path="/product/:id" element={<Product />} />
                </Routes>
                </MemoryRouter>
            </MessageContext.Provider>
            </CartWindowCtx.Provider>
            </SetttingsWindowCtx.Provider>
            </SearchContext.Provider>
        );
    })
    expect(mockService).toHaveBeenCalledWith({body:"55"})
   })
})