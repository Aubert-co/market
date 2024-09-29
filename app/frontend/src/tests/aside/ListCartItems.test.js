import * as React from 'react'
import { fireEvent, queryByTestId, render,screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import { items } from '../fixtures';
import * as Service from '../../services/cart';
import { ListCartItems } from '../../Components/Aside/ListCartItems';
import { getTotally, roundANumber } from '../../Components/Utils';



describe("ListCartItems when there is an error in status or invalid data",()=>{
    it("When the data is equal to 'loading' and status is null, it should return a loading text.",()=>{
        render(
            <ListCartItems datas={"loading"} status={""}/>
        )
        const window_loading = screen.queryByTestId("window_loading")
        const error_message = screen.queryAllByTestId("error_message")
        const list_items = screen.queryByTestId("list_items")
        expect( list_items ).not.toBeInTheDocument()
        expect( window_loading ).toBeInTheDocument()
        expect( window_loading ).toHaveTextContent("Carregando")
        expect( error_message ).toEqual( [] )
     
    })
    it("When the data is equal to [] and the status is 201, it should return the text 'Adicione items ao seu carrinho!'",()=>{
        render(
            <ListCartItems datas={[]} status={201}/>
        )
        const window_loading = screen.queryByTestId("window_loading")
        const error_message = screen.queryAllByTestId("error_message")
        const list_items = screen.queryByTestId("list_items")
        expect( list_items ).not.toBeInTheDocument()
        expect( window_loading ).not.toBeInTheDocument()
        expect( error_message[0] ).toHaveTextContent("Adicione items ao seu carrinho!")
        expect( error_message ).toHaveLength(1)
    })
    it("When there are items in the data but the status is 401, it should return a login message.",()=>{
        render(
            <ListCartItems datas={items} status={401}/>
        )
        const window_loading = screen.queryByTestId("window_loading")
        const error_message = screen.queryAllByTestId("error_message")
        const list_items = screen.queryByTestId("list_items")
        expect( list_items ).not.toBeInTheDocument()
        expect( window_loading ).not.toBeInTheDocument()
        expect( error_message[0] ).toHaveTextContent("Faça login para adicionar items ao seu carrinho!")
        expect( error_message ).toHaveLength(1)
    })
    it("When there are items in the data but the status is greater than 401, it should return an internal error.",()=>{
        render(
            <ListCartItems datas={items} status={402}/>
        )
        const window_loading = screen.queryByTestId("window_loading")
        const error_message = screen.queryAllByTestId("error_message")
        const list_items = screen.queryByTestId("list_items")
        expect( list_items ).not.toBeInTheDocument()
        expect( window_loading ).not.toBeInTheDocument()
        expect( error_message[0] ).toHaveTextContent("Algo deu errado enquanto buscavamos seu carrinho , tente mais tarde!")
        expect( error_message ).toHaveLength(1)
    })
})


describe.only("ListCartItems",()=>{
    let tottally = items.reduce((acc,val)=>acc + roundANumber(val.price*val.quantity),0)
    it("When send datas and status it should render a list of items in a cart",async()=>{
        render(
            <ListCartItems datas={items} status={201}/>
        );
    
        const window_loading = screen.queryByTestId("window_loading")
        const error_message = screen.queryAllByTestId("error_message")
        const list_items = screen.queryByTestId("list_items")
        const cart_tottally = screen.queryByTestId("cart_tottally")
        const cleanAll_cart = screen.queryByTestId("cleanAll_cart")
        const msg_add_cart = screen.queryByTestId("msg_add_cart")

        expect( list_items ).toBeInTheDocument()
        expect( window_loading ).not.toBeInTheDocument()
        expect( error_message ).toHaveLength(0)
        expect( cart_tottally ).toHaveTextContent(`Total ${tottally}`)
        expect( cleanAll_cart ).toBeInTheDocument()
        expect( msg_add_cart).not.toBeInTheDocument()
        fireEvent.click( cleanAll_cart )

        expect( cart_tottally ).not.toBeInTheDocument()
        expect( cleanAll_cart ).not.toBeInTheDocument()
        
        
        expect(screen.queryByTestId("msg_add_cart")).toBeInTheDocument()
        expect(screen.queryByTestId("msg_add_cart")  ).toHaveTextContent("Adicione items ao seu carrinho")
    })
})