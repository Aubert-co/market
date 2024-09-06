import React,{useState} from "react";
import { SearchBar } from "../Components/Header/SearchBar";
import { render,fireEvent, screen, waitFor } from "@testing-library/react";
import { SearchContext } from "../Contexts";


var DEFAULT_SEARCH;


describe('SearchBar',()=>{
    beforeEach(()=>{
         DEFAULT_SEARCH = {
            searchParams:{
                name:'skirt',lowPrice:0,high:1000,category:''
            },
            setSearchParams:jest.fn()
        }
        jest.spyOn(React,'useState').mockReturnValue([DEFAULT_SEARCH.searchParams,DEFAULT_SEARCH.setSearchParams])

        render(
            <SearchContext.Provider value={ DEFAULT_SEARCH }>
                <SearchBar/>
            </SearchContext.Provider>    
    )
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