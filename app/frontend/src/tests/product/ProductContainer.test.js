import React from "react";
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import  *as Services from "../../services"
import '@testing-library/jest-dom';
import { ItemQuantity } from "../../Components/Product/ProductContainer";

var refItemQuantity,itemInStock;

describe("ItemQuantity",()=>{
    beforeEach(()=>{
        refItemQuantity = {current:{value:1}};
        itemInStock = 50
        render(
            <ItemQuantity refItemQuantity={refItemQuantity} itemInStock={itemInStock}/>
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
    it("When the value is 1 and an attempt is made to decrease, it should not decrease and the value should remain 1.",()=>{
        const increase_btn = screen.queryByTestId("increase_btn")
        const input_quantity = screen.queryByTestId("input_quantity")
        const decrease_btn = screen.queryByTestId("decrease_btn")

        fireEvent.click( decrease_btn )

        expect(decrease_btn.textContent).toEqual("-")
        expect(increase_btn.textContent).toEqual("+")
        expect(Number(refItemQuantity.current.value)).toBe(1)
        expect(input_quantity).toHaveValue(1)
    })
    it("When changing the input value, it should update correctly.",()=>{
        const increase_btn = screen.queryByTestId("increase_btn")
        const input_quantity = screen.queryByTestId("input_quantity")
        const decrease_btn = screen.queryByTestId("decrease_btn")

        fireEvent.change(input_quantity, { target: { value: 54 } });

        expect(decrease_btn.textContent).toEqual("-")
        expect(increase_btn.textContent).toEqual("+")
        expect(Number(refItemQuantity.current.value)).toBe(54)
        expect(input_quantity).toHaveValue(54)
    })
    it("When pressing the decrease button multiple times and the value reaches 1, it should remain at 1 and not become negative.",()=>{
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
    it("When pressing the increase button multiple times, the value should not exceed the available stock.",()=>{
        const increase_btn = screen.queryByTestId("increase_btn")
        const input_quantity = screen.queryByTestId("input_quantity")
        const decrease_btn = screen.queryByTestId("decrease_btn")

        for(let i =1;i<55;i++){
            fireEvent.click(increase_btn)
        }

        expect(decrease_btn.textContent).toEqual("-")
        expect(increase_btn.textContent).toEqual("+")
        expect(Number(refItemQuantity.current.value)).toBe(itemInStock)
        expect(input_quantity).toHaveValue(itemInStock)
    })
    it("When pressing the decrease button multiple times and the value is equal to 1, it should remain 1 and not become negative.",()=>{
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