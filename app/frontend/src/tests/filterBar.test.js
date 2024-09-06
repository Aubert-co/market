import React from "react";
import { fireEvent, render ,screen, waitFor} from "@testing-library/react";
import { FilterBar } from "../Components/Aside/FilterBar";
import { SearchContext } from "../Contexts";
var DEFAULT_SEARCH;

describe.skip("FilterBar",()=>{
    beforeEach(()=>{
        DEFAULT_SEARCH = {
            searchParams:{ name:'camisa',
            lowPrice:49,
            highPrice:4999},
            setSearchParams:jest.fn()
        }
        render(
            <SearchContext.Provider value={DEFAULT_SEARCH}>
                <FilterBar/>
            </SearchContext.Provider>
        )
    })
    it("",async()=>{
        const [inputMin,inputMax] = screen.getAllByTestId("input_filter")
        const btn = screen.getByTestId('btn_filter')
        let lowPrice=5
        let highPrice = 500
        fireEvent.change(inputMin, { target: { value: lowPrice } });
        fireEvent.change(inputMax, { target: { value: highPrice } });
        fireEvent.click(btn)

        await waitFor(()=>{
       
            expect(DEFAULT_SEARCH.setSearchParams).toHaveBeenCalledTimes(1)
            expect(DEFAULT_SEARCH.setSearchParams).toHaveBeenCalledWith({name:'camisa',lowPrice,highPrice})
        })
    
    })
    it("When send values to both inputs equal 0 should not save the values",async()=>{
        const [inputMin,inputMax] = screen.getAllByTestId("input_filter")
        const btn = screen.getByTestId('btn_filter')
        let lowPrice=0
        let highPrice = 0
        fireEvent.change(inputMin, { target: { value: lowPrice } });
        fireEvent.change(inputMax, { target: { value: highPrice } });
        fireEvent.click(btn)

        await waitFor(()=>{
       
            expect(DEFAULT_SEARCH.setSearchParams).toHaveBeenCalledTimes(0)
            expect(DEFAULT_SEARCH.setSearchParams).not.toHaveBeenCalledWith({name:'camisa',lowPrice,highPrice})
        })
    
    })
    it("When lowPrice equal or greater than highPrice should not send the values",async()=>{
        const [inputMin,inputMax] = screen.getAllByTestId("input_filter")
        const btn = screen.getByTestId('btn_filter')
        let lowPrice=12
        let highPrice = 10
        fireEvent.change(inputMin, { target: { value: lowPrice } });
        fireEvent.change(inputMax, { target: { value: highPrice } });
        fireEvent.click(btn)

        await waitFor(()=>{
       
            expect(DEFAULT_SEARCH.setSearchParams).toHaveBeenCalledTimes(0)
            expect(DEFAULT_SEARCH.setSearchParams).not.toHaveBeenCalledWith({name:'camisa',lowPrice,highPrice})
        })
    
    })
})