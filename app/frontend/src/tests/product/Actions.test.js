import React from "react";
import { fireEvent, render,screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Actions } from "../../Components/Product/ProductContainer";
import {items} from "../fixtures"
import { getCart, saveCart } from "../../Cache";

describe("Actions",()=>{
    let setMessage
    beforeEach(()=>{
        setMessage = jest.fn();
        localStorage.clear()
        jest.clearAllMocks()
    })
    it("When adding a product to the cart, it should correctly save the data in localStorage.",()=>{
        let quantity = 199
        const datas = Array.from( items[0])
        render(
            <Actions setMessage={setMessage} quantity={quantity} datas={ items[0] }/>
        )

        const add_product = screen.queryByTestId("add_productCart")
        expect(add_product).toHaveTextContent("Adicionar ao Carrinho")
        const savedCart = getCart()

        expect(savedCart).toHaveLength(0)

        fireEvent.click( add_product )

        const cartAfterClick = getCart()
        
        expect( cartAfterClick ).toHaveLength(1);
        expect( setMessage ).toHaveBeenCalledTimes(1);
        expect( setMessage ).toHaveBeenCalledWith({content:'Adicionado com sucesso'});
        expect( cartAfterClick[0].quantity ).toEqual( quantity )
        expect( cartAfterClick[0].quantity).not.toEqual( datas.quantity)
        expect( cartAfterClick[0].saved).toBeFalsy()
        expect( cartAfterClick[0].deleted).toBeFalsy()


        fireEvent.click( add_product )

        const cartAfterClick2 = getCart()

        expect( cartAfterClick2 ).toHaveLength(1)
        expect( setMessage ).toHaveBeenCalledTimes(2);
        expect( setMessage ).toHaveBeenCalledWith({content:'Adicionado com sucesso'});
        expect( cartAfterClick[0].quantity ).toEqual( quantity )
        expect( cartAfterClick[0].quantity).not.toEqual( datas.quantity)
        expect( cartAfterClick[0].saved).toBeFalsy()
        expect( cartAfterClick[0].deleted).toBeFalsy()

    })  
    it("When trying to add an item that is already saved in localStorage, it should not add it again.",()=>{
        let quantity = 199
        const datas = Array.from( items[0])
        saveCart( [items[0]])
        render(
            <Actions setMessage={setMessage} quantity={quantity} datas={ items[0] }/>
        )

        const add_product = screen.queryByTestId("add_productCart")
        expect(add_product).toHaveTextContent("Adicionar ao Carrinho")
        const savedCart = getCart()

        expect(savedCart).toHaveLength(1)

        fireEvent.click( add_product )

        const cartAfterClick = getCart()
        
        expect( cartAfterClick ).toHaveLength(1);
        expect( setMessage ).toHaveBeenCalledTimes(1);
        expect( setMessage ).toHaveBeenCalledWith({content:'Adicionado com sucesso'});
        expect( cartAfterClick[0].quantity ).toEqual( quantity )
        expect( cartAfterClick[0].quantity).not.toEqual( datas.quantity)
        expect( cartAfterClick[0].saved).toBeFalsy()
        expect( cartAfterClick[0].deleted).toBeFalsy()
    })
    it("When the item has saved: true and deleted: true, it should change both to false.",()=>{
        let quantity = 199
        const datas = Array.from( items[0])
        datas.saved = true
        datas.deleted = true
        saveCart( [items[0]])
        render(
            <Actions setMessage={setMessage} quantity={quantity} datas={ items[0] }/>
        )

        const add_product = screen.queryByTestId("add_productCart")
        expect(add_product).toHaveTextContent("Adicionar ao Carrinho")
        const savedCart = getCart()

        expect(savedCart).toHaveLength(1)

        fireEvent.click( add_product )

        const cartAfterClick = getCart()
        
        expect( cartAfterClick ).toHaveLength(1);
        expect( setMessage ).toHaveBeenCalledTimes(1);
        expect( setMessage ).toHaveBeenCalledWith({content:'Adicionado com sucesso'});
        expect( cartAfterClick[0].quantity ).toEqual( quantity )
        expect( cartAfterClick[0].quantity).not.toEqual( datas.quantity)
        expect( cartAfterClick[0].saved).toBeFalsy()
        expect( cartAfterClick[0].deleted).toBeFalsy()
    })
    it("When the item has saved: false and deleted: false, it should remain false permanently.",()=>{
        let quantity = 199
        const datas = Array.from( items[0])
        datas.saved = false
        datas.deleted = false
        saveCart( [items[0]])
        render(
            <Actions setMessage={setMessage} quantity={quantity} datas={ items[0] }/>
        )

        const add_product = screen.queryByTestId("add_productCart")
        expect(add_product).toHaveTextContent("Adicionar ao Carrinho")
        const savedCart = getCart()

        expect(savedCart).toHaveLength(1)

        fireEvent.click( add_product )

        const cartAfterClick = getCart()
        
        expect( cartAfterClick ).toHaveLength(1);
        expect( setMessage ).toHaveBeenCalledTimes(1);
        expect( setMessage ).toHaveBeenCalledWith({content:'Adicionado com sucesso'});
        expect( cartAfterClick[0].quantity ).toEqual( quantity )
        expect( cartAfterClick[0].quantity).not.toEqual( datas.quantity)
        expect( cartAfterClick[0].saved).toBeFalsy()
        expect( cartAfterClick[0].deleted).toBeFalsy()
    })
})