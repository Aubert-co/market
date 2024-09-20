import React from "react";
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'

import { CartActions } from "../../Components/Aside/CartWindow";
import { mapExpect } from "../fixtures";

var data = [{id:3,quantity:45,name:"shirt",price:39},{id:45,quantity:89,name:"short",price:19}]

describe('Componente CartActions',()=>{
    beforeEach(()=>{
        localStorage.setItem('cart',JSON.stringify(data))
    })
    it("When decrease only the firts element should update only the quantity from the firts element",()=>{
        render(
            <CartActions id={data[0].id} price={data[0].price} quantity={data[0].quantity}/>
        )
        const cart_total = screen.getByTestId("cart_total")
        const decrease_btn = screen.getByTestId("decrease_btn")
        const increase_btn = screen.getByTestId("increase_btn")
        const input_quantity = screen.getByTestId("input_quantity")

        expect(cart_total.textContent).toEqual(`R$${data[0].price* data[0].quantity}`)
        expect(input_quantity.value).toEqual(`${data[0].quantity}`)

        fireEvent.click(decrease_btn)
        const cartLocal = JSON.parse( localStorage.getItem('cart') )

        mapExpect([data[1] ],[cartLocal[1]],'true')
       
        expect(cartLocal[0].quantity).not.toEqual(data[0].quantity)
        expect(cartLocal[0].price).toEqual(data[0].price)
        expect(cartLocal[0].name).toEqual(data[0].name)
        expect(cartLocal[0].quantity+1).toEqual(data[0].quantity)

    })
    it("When decrease , increase and change the value input from the firts element should update only the firts element",()=>{
        render(
            <CartActions id={data[0].id} price={data[0].price} quantity={data[0].quantity}/>
        )
        const cart_total = screen.getByTestId("cart_total")
        const decrease_btn = screen.getByTestId("decrease_btn")
        const increase_btn = screen.getByTestId("increase_btn")
        const input_quantity = screen.getByTestId("input_quantity")

        expect(cart_total.textContent).toEqual(`R$${data[0].price* data[0].quantity}`)
        expect(input_quantity.value).toEqual(`${data[0].quantity}`)

        fireEvent.click(decrease_btn)
        const cartLocal = JSON.parse( localStorage.getItem('cart') )

        mapExpect([data[1] ],[cartLocal[1]],'true')
        expect(input_quantity.value).toEqual(`${data[0].quantity-1}`)
        expect(cartLocal[0].quantity).not.toEqual(data[0].quantity)
        expect(cartLocal[0].price).toEqual(data[0].price)
        expect(cartLocal[0].name).toEqual(data[0].name)
        expect(cartLocal[0].quantity+1).toEqual(data[0].quantity)

        //observation the firts click decrease in 1
        fireEvent.click(increase_btn)
        fireEvent.click(increase_btn)
        const cartLocal2 = JSON.parse( localStorage.getItem('cart') )
        mapExpect([data[1] ],[cartLocal2[1]],'true')
        expect(input_quantity.value).toEqual(`${data[0].quantity+1}`)
        expect(cartLocal2[0].quantity).not.toEqual(data[0].quantity)
        expect(cartLocal2[0].price).toEqual(data[0].price)
        expect(cartLocal2[0].name).toEqual(data[0].name)
        expect(cartLocal2[0].quantity-1).toEqual(data[0].quantity)
        expect(cart_total.textContent).toEqual(`R$${ cartLocal2[0].price * cartLocal2[0].quantity}`)


        fireEvent.change(input_quantity,{target:{value:193}})
        const cartLocal3 = JSON.parse( localStorage.getItem('cart') )
        mapExpect([data[1] ],[cartLocal2[1]],'true')
        expect(cartLocal3[0].quantity).not.toEqual(data[0].quantity)
        expect(cartLocal3[0].price).toEqual(data[0].price)
        expect(cartLocal3[0].name).toEqual(data[0].name)
        expect(cartLocal3[0].quantity).toEqual(193)
        expect(input_quantity.value).toEqual(`${193}`)
        expect(cart_total.textContent).toEqual(`R$${ cartLocal3[0].price * cartLocal3[0].quantity}`)
    })
    it.only("when 2",()=>{
        render(
            <>
                <CartActions id={data[0].id} price={data[0].price} quantity={data[0].quantity}/>
                <CartActions id={data[1].id} price={data[1].price} quantity={data[1].quantity}/>
            </>
        )
        const cart_total = screen.getAllByTestId("cart_total")
        const decrease_btn = screen.getAllByTestId("decrease_btn")
        const increase_btn = screen.getAllByTestId("increase_btn")
        const input_quantity = screen.getAllByTestId("input_quantity")

        
        expect(cart_total[0].textContent).toEqual(`R$${data[0].price* data[0].quantity}`)
        expect(input_quantity[0].value).toEqual(`${data[0].quantity}`)
        expect(cart_total[1].textContent).toEqual(`R$${data[1].price* data[1].quantity}`)
        expect(input_quantity[1].value).toEqual(`${data[1].quantity}`)
        fireEvent.click(decrease_btn[0])
        const cartLocal = JSON.parse( localStorage.getItem('cart') )

        mapExpect([data[1] ],[cartLocal[1]],'true')
       
        expect(cartLocal[0].quantity).not.toEqual(data[0].quantity)
        expect(cartLocal[0].price).toEqual(data[0].price)
        expect(cartLocal[0].name).toEqual(data[0].name)
        expect(cartLocal[0].quantity+1).toEqual(data[0].quantity)
    })
})