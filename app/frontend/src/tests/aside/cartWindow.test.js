import React from "react";
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import  *as Services from "../../services/cart"
import { CartWindow, } from "../../Components/Aside/CartWindow";
import { MessageContext } from "../../Contexts";
import '@testing-library/jest-dom'
import { items } from "../fixtures";
import { roundANumber } from "../../Components/Utils";
import { getCart } from "../../Cache";

const generateSrc = (path)=>`http://localhost:8080/static${path}`

var DEFAULT_MESSAGE;
const itemsCart = (screen)=>{
    const btn_increase = screen.getAllByTestId("increase_btn")
    const btn_decrease = screen.getAllByTestId("decrease_btn")
    const input = screen.getAllByTestId("input_quantity")
    const name_ = screen.getAllByTestId("item_name")
    const img_ = screen.getAllByTestId("item_img")
    const cart_total = screen.getAllByTestId("cart_total")
    expect(name_.length).toEqual(items.length)
    expect(screen.queryByTestId("buy")).not.toBeInTheDocument()
    
    items.map(({name,price,imgPath,quantity},ind)=>{
        expect(name_[ind].textContent).toEqual(name)
        expect(quantity).toEqual(Number(input[ind].value))
        expect(img_[ind].getAttribute('src')).toEqual(generateSrc(imgPath))
        expect(btn_decrease[ind].textContent).toEqual("-")
        expect(btn_increase[ind].textContent).toEqual("+")
        
    })
}

describe("CartWIndow",()=>{
    beforeEach(()=>{
        DEFAULT_MESSAGE = {
            messageParams:{
                content:'',type:''
            },
            setMessageParams:jest.fn()
        }
      global.fetch = jest.fn()
      localStorage.clear()
    })
    afterEach(()=>{
        localStorage.clear()
        global.fetch = jest.fn()
    })
    it("When clicking on decrease, increase, or delete, it should perform the actions correctly.",async()=>{
        const token = "932u4joinelmrnqyrg3"
        localStorage.setItem("token",token)
        const DEFAULT_WINDOW ={
            isWindowOpen:true, setIsWindowOpen:jest.fn()
        }
        
        const datas = [items[0]]
      
        const mockResponse = {ok: true,status:201,json:jest.fn().mockResolvedValue( datas )};
        const fetchs =  global.fetch.mockResolvedValue(mockResponse); 
        const {container} = render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <CartWindow isWindowOpen={DEFAULT_WINDOW.isWindowOpen} setIsWindowOpen={DEFAULT_WINDOW.setIsWindowOpen}/>
            </MessageContext.Provider>
        )
      
        await waitFor(()=>{
            expect(screen.getByTestId('overlay')).toBeInTheDocument()
            expect(screen.getByTestId("delete_cartItem")).toBeInTheDocument()
          
            expect(screen.queryByTestId("list_items")).toBeInTheDocument()
            expect(document.body.style.overflow).toEqual('hidden')

            const cart_total = screen.getByTestId("cart_total")
           
            const input_quantity = screen.getByTestId("input_quantity")
            const totally = roundANumber(items[0].price* items[0].quantity)
            expect(cart_total.textContent).toEqual(`R$${totally}`)
            expect(`${input_quantity.value}`).toEqual(`${datas[0].quantity}`)
           
            expect(container.querySelector(`.Cart_${items[0].id}`)).toHaveStyle("display:block")
            const cartLocal = JSON.parse( localStorage.getItem('cart') )
            
            expect(cartLocal[0].quantity).toEqual(items[0].quantity)
          
            expect(cartLocal[0].quantity).toEqual(datas[0].quantity)
            expect(cartLocal[0].price).toEqual(datas[0].price)
            expect(cartLocal[0].name).toEqual(datas[0].name)
            expect(cartLocal[0].quantity).toEqual(datas[0].quantity)
        })

        expect( fetchs ).toHaveBeenCalledTimes(1)
        expect( fetchs ).toHaveBeenCalledWith("http://localhost:8080/cart/items",{
        method:'GET',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
       }
        )   ;
        const decrease_btn = screen.getByTestId("decrease_btn")
        const increase_btn = screen.getByTestId("increase_btn")
        const input_quantity = screen.getByTestId("input_quantity")
        const cart_total = screen.getByTestId("cart_total")
        const delete_cartItem = screen.getByTestId("delete_cartItem")
        fireEvent.click( decrease_btn )
        const totally = roundANumber(items[0].price* (items[0].quantity-1))
        expect(`${input_quantity.value}`).toEqual(`${datas[0].quantity-1}`)
   
        expect(cart_total.textContent).toEqual(`R$${totally}`)
           
        fireEvent.click( increase_btn )

        expect(`${input_quantity.value}`).toEqual(`${datas[0].quantity}`)
        expect(cart_total.textContent).toEqual(`R$${roundANumber(items[0].price* items[0].quantity)}`)
   
        fireEvent.click( delete_cartItem )

        const cacheCart = getCart()[0]

        expect(cacheCart.deleted).toBeTruthy()
        expect( cacheCart.saved ).toBeFalsy()
        expect(container.querySelector(`.Cart_${items[0].id}`)).toHaveStyle("display:none")
    })
    it("When the window type is 'Cart', it should render the cart items.",async()=>{
        const DEFAULT_WINDOW ={
            isWindowOpen:true, setIsWindowOpen:jest.fn()
        }
        const service = jest.spyOn(Services,'serviceGetCart').mockResolvedValue({message:'sucess',status:201,datas:items})
        
        const{rerender}=render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <CartWindow isWindowOpen={DEFAULT_WINDOW.isWindowOpen} setIsWindowOpen={DEFAULT_WINDOW.setIsWindowOpen}/>
            </MessageContext.Provider>
        )
        
        await waitFor(()=>{
            expect(screen.getByTestId('overlay')).toBeInTheDocument()
            expect(service).toHaveBeenCalledTimes(1)
            
            itemsCart(screen)
            expect(document.body.style.overflow).toEqual('hidden')
            expect(screen.queryByTestId('list_settings')).toBeNull()
        })
        rerender(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <CartWindow isWindowOpen={false} setIsWindowOpen={DEFAULT_WINDOW.setIsWindowOpen} />
            </MessageContext.Provider>
        );
        await waitFor(()=>{
            expect(screen.queryByTestId('overlay')).toBeNull();
            expect(screen.queryByTestId('item')).toBeNull();
            expect(service).toHaveBeenCalledTimes(1)
            expect(screen.queryByTestId('list_settings')).toBeNull()
        
        })
    })
    it("When the window is closed, it should not render the items.",async()=>{
        const DEFAULT_WINDOW ={
            isWindowOpen:false, setIsWindowOpen:jest.fn()
        }
        const service= jest.spyOn(Services,'serviceGetCart').mockResolvedValue({message:'sucess',status:201,datas:items})
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <CartWindow isWindowOpen={DEFAULT_WINDOW.isWindowOpen} setIsWindowOpen={DEFAULT_WINDOW.setIsWindowOpen}/>
            </MessageContext.Provider>
        )

        await waitFor(()=>{
            expect(screen.queryByTestId('overlay')).toBeNull();
            expect(screen.queryByTestId('list_settings')).toBeNull()
            expect(service).toHaveBeenCalledTimes(1)
            
            expect(screen.queryByTestId('item')).toBeNull();
        
        })
    })
    it("When the user is not logged in, it should return a message informing that the user is not logged in.",async()=>{
        const DEFAULT_WINDOW ={
            isWindowOpen:true, setIsWindowOpen:jest.fn()
        }
        const service = jest.spyOn(Services,'serviceGetCart').mockResolvedValue({message:'sucess',status:401,datas:items})
        
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <CartWindow isWindowOpen={DEFAULT_WINDOW.isWindowOpen} setIsWindowOpen={DEFAULT_WINDOW.setIsWindowOpen}/>
            </MessageContext.Provider>
        )
        
        await waitFor(()=>{
            expect(screen.getByTestId('overlay')).toBeInTheDocument()
       
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledWith({content:'Login necessário',type:'error'})
            expect(screen.queryByTestId("list_items")).not.toBeInTheDocument()
            expect(document.body.style.overflow).toEqual('hidden')
            expect(screen.queryByTestId("error_message").textContent).toEqual("Faça login para adicionar items ao seu carrinho!")
        
        })
    })
    it("When the user is logged but thres nothing in her cart",async()=>{
        const DEFAULT_WINDOW ={
            isWindowOpen:true, setIsWindowOpen:jest.fn()
        }
        const service = jest.spyOn(Services,'serviceGetCart').mockResolvedValue({message:'sucess',status:201,datas:[]})
        
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <CartWindow isWindowOpen={DEFAULT_WINDOW.isWindowOpen} setIsWindowOpen={DEFAULT_WINDOW.setIsWindowOpen}/>
            </MessageContext.Provider>
        )
        
        await waitFor(()=>{
            expect(screen.getByTestId('overlay')).toBeInTheDocument()
       
            expect(screen.queryByTestId("list_items")).not.toBeInTheDocument()
            expect(document.body.style.overflow).toEqual('hidden')
            expect(screen.queryByTestId("error_message").textContent).toEqual("Adicione items ao seu carrinho!")
        
        })
    })
    it("When the request return an internal error",async()=>{
        const DEFAULT_WINDOW ={
            isWindowOpen:true, setIsWindowOpen:jest.fn()
        }
        const service = jest.spyOn(Services,'serviceGetCart').mockResolvedValue({message:'sucess',status:501,datas:[]})
        
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <CartWindow isWindowOpen={DEFAULT_WINDOW.isWindowOpen} setIsWindowOpen={DEFAULT_WINDOW.setIsWindowOpen}/>
            </MessageContext.Provider>
        )
        
        await waitFor(()=>{
            expect(screen.getByTestId('overlay')).toBeInTheDocument()
       
          
            expect(screen.queryByTestId("list_items")).not.toBeInTheDocument()
            expect(document.body.style.overflow).toEqual('hidden')
            expect(screen.queryByTestId("error_message").textContent).toEqual("Algo deu errado enquanto buscavamos seu carrinho , tente mais tarde!")
        
        })
    })
    
})
