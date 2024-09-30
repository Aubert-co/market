import * as React from 'react'
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'

import { CartActions } from "../../Components/Aside/CartActions";
import { mapExpectAll, mapExpectDiferentQnt } from "../fixtures";

var data = [{id:3,quantity:45,name:"shirt",price:39},{id:45,quantity:89,name:"short",price:19}]
var setTottally;
describe('Componente CartActions',()=>{
    beforeEach(()=>{
        localStorage.setItem('cart',JSON.stringify(data))
        jest.clearAllMocks()
        setTottally= jest.spyOn(React,'useState')

        setTottally.mockImplementation((init) => [init, jest.fn()]);
    })
    it("When decrease only the firts element should update only the quantity from the firts element",()=>{
       
        render(
            <CartActions setTottaly={setTottally} id={data[0].id} price={data[0].price} quantity={data[0].quantity}/>
        )
        const cart_total = screen.getByTestId("cart_total")
        const decrease_btn = screen.getByTestId("decrease_btn")
        const increase_btn = screen.getByTestId("increase_btn")
        const input_quantity = screen.getByTestId("input_quantity")

        expect(cart_total.textContent).toEqual(`R$${data[0].price* data[0].quantity}`)
        expect(input_quantity.value).toEqual(`${data[0].quantity}`)
        expect(setTottally).toHaveBeenCalledTimes(1)
     
        expect(setTottally.mock.calls[0][0]()[0]).toEqual({"id":data[0].id,"total":data[0].price*data[0].quantity})
        fireEvent.click(decrease_btn)
        const cartLocal = JSON.parse( localStorage.getItem('cart') )

        mapExpectAll([data[1] ],[cartLocal[1]],'true')
       
        mapExpectDiferentQnt([cartLocal[0]],[data[0]],data[0].quantity-1)
       
        expect(setTottally.mock.calls[1][0]()[0]).toEqual({"id":data[0].id,"total":data[0].price*(data[0].quantity-1)})
      
       expect(setTottally).toHaveBeenCalledTimes(2)
    })
    it("When decrease , increase and change the value input from the firts element should update only the firts element",()=>{
        render(
            <CartActions setTottaly={setTottally} id={data[0].id} price={data[0].price} quantity={data[0].quantity}/>
        )
        const cart_total = screen.getByTestId("cart_total")
        const decrease_btn = screen.getByTestId("decrease_btn")
        const increase_btn = screen.getByTestId("increase_btn")
        const input_quantity = screen.getByTestId("input_quantity")

        expect(cart_total.textContent).toEqual(`R$${data[0].price* data[0].quantity}`)
        expect(input_quantity.value).toEqual(`${data[0].quantity}`)
        expect(setTottally).toHaveBeenCalledTimes(1)

        fireEvent.click(decrease_btn)
        const cartLocal = JSON.parse( localStorage.getItem('cart') )
        expect(setTottally).toHaveBeenCalledTimes(2)
        mapExpectAll([data[1] ],[cartLocal[1]],'true')
        expect(input_quantity.value).toEqual(`${data[0].quantity-1}`)
        mapExpectDiferentQnt([cartLocal[0]],[data[0]],data[0].quantity-1)

      
        fireEvent.click(increase_btn)
        expect(setTottally).toHaveBeenCalledTimes(3)
        fireEvent.click(increase_btn)
        expect(setTottally).toHaveBeenCalledTimes(4)
     
        const cartLocal2 = JSON.parse( localStorage.getItem('cart') )
        mapExpectAll([data[1] ],[cartLocal2[1]],'true')
        
        expect(cart_total.textContent).toEqual(`R$${ cartLocal2[0].price * cartLocal2[0].quantity}`)
        mapExpectDiferentQnt([cartLocal2[0]],[data[0]],data[0].quantity+1)

        fireEvent.change(input_quantity,{target:{value:193}})
        const cartLocal3 = JSON.parse( localStorage.getItem('cart') )
        mapExpectAll([data[1] ],[cartLocal2[1]],'true')
        mapExpectDiferentQnt([cartLocal3[0]],[data[0]],193)
        expect(input_quantity.value).toEqual(`${193}`)
        expect(cart_total.textContent).toEqual(`R$${ cartLocal3[0].price * cartLocal3[0].quantity}`)
    })
    it("When two elements are rendered and change the values from the firts the second must remain the same",()=>{
        render(
            <>
                <CartActions setTottaly={setTottally} id={data[0].id} price={data[0].price} quantity={data[0].quantity}/>
                <CartActions setTottaly={setTottally}  id={data[1].id} price={data[1].price} quantity={data[1].quantity}/>
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

        expect(setTottally.mock.calls[0][0]()[0]).toEqual({"id":data[0].id,"total":data[0].price*(data[0].quantity)})
        const cartLocal = JSON.parse( localStorage.getItem('cart') )

        mapExpectAll([data[1] ],[cartLocal[1]],'true')
       
        mapExpectDiferentQnt([cartLocal[0]],[data[0]],data[0].quantity-1)
        expect(input_quantity[1].value).toEqual(`${data[1].quantity}`)

       
        fireEvent.click(increase_btn[0])
        expect(setTottally.mock.calls[0][0]()[0]).toEqual({"id":data[0].id,"total":data[0].price*(data[0].quantity)})
        fireEvent.click(increase_btn[0])
        const cartLocal2 = JSON.parse( localStorage.getItem('cart') )
        mapExpectAll([data[1] ],[cartLocal2[1]],'true')
        expect(input_quantity[0].value).toEqual(`${data[0].quantity+1}`)
        expect(cartLocal2[0].quantity).not.toEqual(data[0].quantity)
        expect(cartLocal2[0].price).toEqual(data[0].price)
        expect(cartLocal2[0].name).toEqual(data[0].name)
        expect(cartLocal2[0].quantity-1).toEqual(data[0].quantity)
        expect(cart_total[0].textContent).toEqual(`R$${ cartLocal2[0].price * cartLocal2[0].quantity}`)
        expect(input_quantity[1].value).toEqual(`${data[1].quantity}`)

        fireEvent.change(input_quantity[0],{target:{value:193}})
        const cartLocal3 = JSON.parse( localStorage.getItem('cart') )
        mapExpectAll([data[1] ],[cartLocal2[1]],'true')
        expect(cartLocal3[0].quantity).not.toEqual(data[0].quantity)
        expect(cartLocal3[0].price).toEqual(data[0].price)
        expect(cartLocal3[0].name).toEqual(data[0].name)
        expect(cartLocal3[0].quantity).toEqual(193)
        expect(input_quantity[0].value).toEqual(`${193}`)
        expect(cart_total[0].textContent).toEqual(`R$${ cartLocal3[0].price * cartLocal3[0].quantity}`)
        expect(input_quantity[1].value).toEqual(`${data[1].quantity}`)
    })
    it.skip("When two elements are rendered and change the values from the second the firts must remain the same",()=>{
        render(
            <>
                <CartActions id={data[0].id} price={data[0].price} quantity={data[0].quantity} setTottaly={setTottally}/>
                <CartActions id={data[1].id} price={data[1].price} quantity={data[1].quantity} setTottaly={setTottally}/>
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

        fireEvent.click(decrease_btn[1])
        const cartLocal = JSON.parse( localStorage.getItem('cart') )

        mapExpectAll([data[0] ],[cartLocal[0]],'true')
       
        expect(cartLocal[1].quantity).not.toEqual(data[1].quantity)
        expect(cartLocal[1].price).toEqual(data[1].price)
        expect(cartLocal[1].name).toEqual(data[1].name)
        expect(cartLocal[1].quantity+1).toEqual(data[1].quantity)
        expect(input_quantity[0].value).toEqual(`${data[0].quantity}`)

       
        fireEvent.click(increase_btn[1])
        fireEvent.click(increase_btn[1])
        const cartLocal2 = JSON.parse( localStorage.getItem('cart') )
        mapExpectAll([data[0] ],[cartLocal2[0]],'true')
        expect(input_quantity[1].value).toEqual(`${data[1].quantity+1}`)
        expect(cartLocal2[1].quantity).not.toEqual(data[1].quantity)
        expect(cartLocal2[1].price).toEqual(data[1].price)
        expect(cartLocal2[1].name).toEqual(data[1].name)
        expect(cartLocal2[1].quantity-1).toEqual(data[1].quantity)
        expect(cart_total[1].textContent).toEqual(`R$${ cartLocal2[1].price * cartLocal2[1].quantity}`)
        expect(input_quantity[0].value).toEqual(`${data[0].quantity}`)

        fireEvent.change(input_quantity[1],{target:{value:193}})
        const cartLocal3 = JSON.parse( localStorage.getItem('cart') )
        mapExpectAll([data[0] ],[cartLocal2[0]],'true')
        expect(cartLocal3[1].quantity).not.toEqual(data[1].quantity)
        expect(cartLocal3[1].price).toEqual(data[1].price)
        expect(cartLocal3[1].name).toEqual(data[1].name)
        expect(cartLocal3[1].quantity).toEqual(193)
        expect(input_quantity[1].value).toEqual(`${193}`)
        expect(cart_total[1].textContent).toEqual(`R$${ cartLocal3[1].price * cartLocal3[1].quantity}`)
        expect(input_quantity[1].value).toEqual(`${data[1].quantity}`)
    })
})