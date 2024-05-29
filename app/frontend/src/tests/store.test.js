import React from "react";
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import  *as Services from "../services"
import '@testing-library/jest-dom'

import { Store } from "../pages/store";
var mockSerivce;
describe('Store',()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
        mockSerivce =jest.spyOn(Services,'serviceStore').mockResolvedValue({ status: 401, datas: [] });

    })
    it("When a user not have a store should show a btn to click to show a store",async()=>{
         
        render(<Store />);

     

        expect(mockSerivce).toHaveBeenCalledTimes(1);

        await waitFor(()=>{
            expect(screen.queryByTestId('btn_showstore')).toBeInTheDocument()
            expect(screen.queryByTestId('box_store')).toBeNull()
            expect(screen.queryByTestId('create_store')).toBeNull()
        })
        
     
        const btn = screen.getByTestId('btn_showstore')
        fireEvent.click(btn)

        await waitFor(()=>{
            expect(screen.queryByTestId('create_store')).toBeInTheDocument()
            expect(screen.queryByTestId('btn_showstore')).toBeInTheDocument()
            expect(screen.queryByTestId('box_store')).toBeNull()
        })
    });
    it("When a user have a store should not show a btn to create a store",async()=>{
       
        render(<Store />);

        expect(mockSerivce).toHaveBeenCalledTimes(1);

        await waitFor(()=>{
            expect(screen.queryByTestId('btn_showstore')).toBeNull()
            expect(screen.queryByTestId('box_store')).toBeInTheDocument()
            expect(screen.queryByTestId('create_store')).toBeNull()
        })
        
    })
})