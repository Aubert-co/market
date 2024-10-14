import React, { useState } from "react";
import { fireEvent, render,screen } from "@testing-library/react";
import { QuantitySelector } from "../Components/QuantitySelector";


var quantity,setQuantity,cart

  
describe('QuantitySelector',()=>{
    afterEach(()=>{
        jest.clearAllMocks()
    })
    beforeEach(() => {
        jest.clearAllMocks()
        
        setQuantity =jest.fn()
        localStorage.clear()
        
      });
    it("test",async()=>{
        quantity = 2
        localStorage.setItem('cart',JSON.stringify([{id:3,quantity},{id:4,quantity:35}]))
        render(
            <QuantitySelector id={3} quantity={quantity} setQuantity={setQuantity} />
        )
        const btn_increase = screen.getByTestId("increase_btn")
        const btn_decrease = screen.getByTestId("decrease_btn")
        const input = screen.getByTestId("input_quantity")
        
        fireEvent.click(btn_decrease)
        cart= JSON.parse(localStorage.getItem('cart'))
        expect(setQuantity).toHaveBeenLastCalledWith(1)
        expect(cart[0].quantity).toEqual(1)
        expect(cart).toHaveLength(2)
        expect(cart[1].quantity).toEqual(35)
        fireEvent.click(btn_increase)
        cart =JSON.parse(localStorage.getItem('cart'))
        expect(cart).toHaveLength(2)
        expect(setQuantity).toHaveBeenLastCalledWith(3)
        expect(cart[0].quantity).toEqual(3)
        expect(cart[1].quantity).toEqual(35)
        fireEvent.change(input,{target:{value:5}})
       
        expect(setQuantity).toHaveBeenLastCalledWith(5)
        cart =JSON.parse(localStorage.getItem('cart'))
        expect(cart).toHaveLength(2)
        expect(cart[0].quantity).toEqual(5)
        expect(cart[1].quantity).toEqual(35)
        

    })
    it("when the quantity is 1 and try to decrease should not decrease and not change the localStorage",()=>{
        quantity =1
        localStorage.setItem('cart',JSON.stringify([{id:3,quantity}]))
        render(
            <QuantitySelector id={3} quantity={quantity} setQuantity={setQuantity} />
        )
        const btn_increase = screen.getByTestId("increase_btn")
        const btn_decrease = screen.getByTestId("decrease_btn")
        const input = screen.getByTestId("input_quantity")
        
        fireEvent.click(btn_decrease)
        cart= JSON.parse(localStorage.getItem('cart'))
        expect(setQuantity).not.toHaveBeenCalled()
        expect(cart[0].quantity).toEqual(1)
        expect(cart).toHaveLength(1)

        fireEvent.click(btn_increase)
        cart =JSON.parse(localStorage.getItem('cart'))
        expect(cart).toHaveLength(1)
        expect(setQuantity).toHaveBeenLastCalledWith(2)
        expect(cart[0].quantity).toEqual(2)

        fireEvent.change(input,{target:{value:5}})
        expect(cart).toHaveLength(1)
        expect(setQuantity).toHaveBeenLastCalledWith(5)
        cart =JSON.parse(localStorage.getItem('cart'))
        expect(cart[0].quantity).toEqual(5)
        expect(cart).toHaveLength(1)
    })
    it("when no pass an id should not change the localstorage",()=>{
        quantity =5
        localStorage.setItem('cart',JSON.stringify([{id:3,quantity:1}]))
       
        render(
            <QuantitySelector  quantity={quantity} setQuantity={setQuantity} />
        )
        const btn_increase = screen.getByTestId("increase_btn")
        const btn_decrease = screen.getByTestId("decrease_btn")
        const input = screen.getByTestId("input_quantity")
        
        fireEvent.click(btn_decrease)
        cart= JSON.parse(localStorage.getItem('cart'))
        expect(setQuantity).toHaveBeenLastCalledWith(4)
        expect(cart[0].quantity).toEqual(1)
        expect(cart).toHaveLength(1)

        fireEvent.click(btn_increase)
        cart =JSON.parse(localStorage.getItem('cart'))
        expect(cart).toHaveLength(1)
        expect(setQuantity).toHaveBeenLastCalledWith(6)
        expect(cart[0].quantity).toEqual(1)

        
        fireEvent.change(input,{target:{value:55}})
      
        expect(cart).toHaveLength(1)
        expect(setQuantity).toHaveBeenLastCalledWith(55)
        cart =JSON.parse(localStorage.getItem('cart'))
        expect(cart[0].quantity).toEqual(1)
        expect(cart).toHaveLength(1)
        
    })
    it("when pass a limit and try to increase abose the limit it not should do it",()=>{
        quantity =4
        localStorage.setItem('cart',JSON.stringify([{id:3,quantity:1}]))
       
        render(
            <QuantitySelector limit={5}  quantity={quantity} setQuantity={setQuantity} />
        )
        const btn_increase = screen.getByTestId("increase_btn")
        const btn_decrease = screen.getByTestId("decrease_btn")
        const input = screen.getByTestId("input_quantity")
        
        fireEvent.click(btn_increase)
        cart =JSON.parse(localStorage.getItem('cart'))
        expect(cart).toHaveLength(1)
        expect(setQuantity).toHaveBeenLastCalledWith(5)
        expect(cart[0].quantity).toEqual(1)


    
        fireEvent.change(input,{target:{value:55}})
      
        expect(cart).toHaveLength(1)

        expect(setQuantity).toHaveBeenCalledTimes(1)
        cart =JSON.parse(localStorage.getItem('cart'))
        expect(cart[0].quantity).toEqual(1)
        expect(cart).toHaveLength(1)
        
       
      
    })
    it.only("when pass a limit and try to increase abose the limit it not should do it",()=>{
        quantity =4
        localStorage.setItem('cart',JSON.stringify([{id:3,quantity:1}]))
       
        render(
            <QuantitySelector limit={5}  quantity={quantity} setQuantity={setQuantity} />
        )
        const btn_increase = screen.getByTestId("increase_btn")
        const btn_decrease = screen.getByTestId("decrease_btn")
        const input = screen.getByTestId("input_quantity")
        
        fireEvent.click(btn_increase)
        cart =JSON.parse(localStorage.getItem('cart'))
        expect(cart).toHaveLength(1)
        expect(setQuantity).toHaveBeenLastCalledWith(5)
        expect(cart[0].quantity).toEqual(1)


    
        fireEvent.change(input,{target:{value:55}})
      
        expect(cart).toHaveLength(1)

        expect(setQuantity).toHaveBeenCalledTimes(1)
        cart =JSON.parse(localStorage.getItem('cart'))
        expect(cart[0].quantity).toEqual(1)
        expect(cart).toHaveLength(1)
        
       
      
    })
})


