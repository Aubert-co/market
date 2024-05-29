import React from "react";
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import  *as Services from "../services"
import { CartWindow, } from "../components/BoxWindows";
import { MessageContext } from "../contexts";
import '@testing-library/jest-dom'
import { items } from "./fixtures";

const generateSrc = (path)=>`http://localhost:8080/static${path}`

var DEFAULT_MESSAGE;
const itemsCart = (screen)=>{
    const btn_action = screen.getAllByTestId("btn_action")
    const name_ = screen.getAllByTestId('item_name')
    const quantity_ = screen.getAllByTestId('item_quantity')
    const img_ = screen.getAllByTestId('item_img')
    expect(screen.queryByTestId('item_price')).not.toBeInTheDocument()
    expect(name_.length).toEqual(items.length)
    expect(screen.queryByTestId('buy')).not.toBeInTheDocument()
    expect(quantity_).toHaveLength(5)
    
    btn_action.map((val,ind,arr)=>{
        expect(arr[0].textContent).toEqual('-')
        expect(arr[1].textContent).toEqual('+')
    })
    items.map(({name,price,imgPath,quantity},ind)=>{
        expect(name_[ind].textContent).toEqual(name)
        expect(quantity).toEqual(Number(quantity_[ind].textContent))
        expect(img_[ind].getAttribute('src')).toEqual(generateSrc(imgPath))
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
      
    })
    it("When the window type is 'cart', it should render the cart items.",async()=>{
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
        const service = jest.spyOn(Services,'serviceGetCart').mockResolvedValue({message:'sucess',status:500,datas:items})
        
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <CartWindow isWindowOpen={DEFAULT_WINDOW.isWindowOpen} setIsWindowOpen={DEFAULT_WINDOW.setIsWindowOpen}/>
            </MessageContext.Provider>
        )
        
        await waitFor(()=>{
            expect(screen.getByTestId('overlay')).toBeInTheDocument()
       
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledWith({content:'Login necessário',type:'error'})
            itemsCart(screen)
            expect(document.body.style.overflow).toEqual('hidden')
        
        })
    })
})