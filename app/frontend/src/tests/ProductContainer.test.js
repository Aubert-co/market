import React from "react";
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import  *as Services from "../services"
import '@testing-library/jest-dom';
import { ItemQuantity } from "../Components/Product/ProductContainer";

var refItemQuantity;

describe("ItemQuantity",()=>{
    beforeEach(()=>{
        refItemQuantity = {current:{value:1}}
        render(
            <ItemQuantity refItemQuantity={refItemQuantity}/>
        )
    })
    it("Should increase the values correctly",()=>{
        const increase_btn = screen.queryByTestId("increase_btn")
        const input_quantity = screen.queryByTestId("input_quantity")
        const decrease_btn = screen.queryByTestId("decrease_btn")

        fireEvent.click( increase_btn )

        expect(decrease_btn.textContent).toEqual("-")
        expect(increase_btn.textContent).toEqual("+")
        expect(Number(refItemQuantity.current.value)).toBe(2)
        expect(input_quantity).toHaveValue(2)
    })
    it("When the values is equal 1 and try to decrease shoudl not decrease and the value should be 1",()=>{
        const increase_btn = screen.queryByTestId("increase_btn")
        const input_quantity = screen.queryByTestId("input_quantity")
        const decrease_btn = screen.queryByTestId("decrease_btn")

        fireEvent.click( decrease_btn )

        expect(decrease_btn.textContent).toEqual("-")
        expect(increase_btn.textContent).toEqual("+")
        expect(Number(refItemQuantity.current.value)).toBe(1)
        expect(input_quantity).toHaveValue(1)
    })
    it("When change the input value should change correctly",()=>{
        const increase_btn = screen.queryByTestId("increase_btn")
        const input_quantity = screen.queryByTestId("input_quantity")
        const decrease_btn = screen.queryByTestId("decrease_btn")

        fireEvent.change(input_quantity, { target: { value: 54 } });

        expect(decrease_btn.textContent).toEqual("-")
        expect(increase_btn.textContent).toEqual("+")
        expect(Number(refItemQuantity.current.value)).toBe(54)
        expect(input_quantity).toHaveValue(54)
    })
    it("When press the decrease button multipli times and the value is equal 1 should permanecer o valor 1 e nao ficar negativo",()=>{
        const increase_btn = screen.queryByTestId("increase_btn")
        const input_quantity = screen.queryByTestId("input_quantity")
        const decrease_btn = screen.queryByTestId("decrease_btn")

        for(let i =0;i<10;i++){
            fireEvent.click(decrease_btn)
        }

        expect(decrease_btn.textContent).toEqual("-")
        expect(increase_btn.textContent).toEqual("+")
        expect(Number(refItemQuantity.current.value)).toBe(1)
        expect(input_quantity).toHaveValue(1)
    })
    it("When press the decrease button multipli times and the value is equal 1 should permanecer o valor 1 e nao ficar negativo",()=>{
        const increase_btn = screen.queryByTestId("increase_btn")
        const input_quantity = screen.queryByTestId("input_quantity")
        const decrease_btn = screen.queryByTestId("decrease_btn")

        for(let i =1;i<10;i++){
            fireEvent.click(increase_btn)
        }

        expect(decrease_btn.textContent).toEqual("-")
        expect(increase_btn.textContent).toEqual("+")
        expect(Number(refItemQuantity.current.value)).toBe(10)
        expect(input_quantity).toHaveValue(10)
    })
    it("When press the decrease button multipli times and the value is equal 1 should permanecer o valor 1 e nao ficar negativo",()=>{
        const increase_btn = screen.queryByTestId("increase_btn")
        const input_quantity = screen.queryByTestId("input_quantity")
        const decrease_btn = screen.queryByTestId("decrease_btn")

        for(let i =1;i<10;i++){
            fireEvent.click(increase_btn)
        }

        for(let i=1;i<15;i++){
            fireEvent.click(decrease_btn)
        }
        expect(decrease_btn.textContent).toEqual("-")
        expect(increase_btn.textContent).toEqual("+")
        expect(Number(refItemQuantity.current.value)).toBe(1)
        expect(input_quantity).toHaveValue(1)
    })
})