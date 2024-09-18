import React from "react";
import { fireEvent, render,screen } from "@testing-library/react";
import { QuantitySelector } from "../Components/QuantitySelector";


var localStorageMock,quantity,setQuantity;
var changeValues = {
    quantity:1,
    setQuantity:(value)=>{
        if (typeof value === 'function') {
            changeValues.quantity = value(changeValues.quantity);
          } else {
            // Caso contrário, apenas define o novo valor diretamente
            changeValues.quantity = value;
          }
    }
}
describe('QuantitySelector',()=>{
    beforeEach(() => {
        jest.clearAllMocks()

         localStorageMock = {
          getItem: jest.fn(),
          setItem: jest.fn(),
          removeItem: jest.fn(),
          clear: jest.fn(),
        };
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
      });
    it("test",()=>{
       
        render(
            <QuantitySelector quantity={changeValues.quantity} setQuantity={changeValues.setQuantity} />
        )
        const btn_increase = screen.getByTestId("increase_btn")
        const btn_decrease = screen.getByTestId("decrease_btn")
        const input = screen.getByTestId("input_quantity")

        fireEvent.click(btn_increase)
        fireEvent.click(btn_increase)
        expect(changeValues.quantity).toEqual(3)
        expect(Number(input.value)).toEqual(2)
       
    })
})


