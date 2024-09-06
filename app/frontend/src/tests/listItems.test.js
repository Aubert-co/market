import React from "react";
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import  *as Services from "../services"
import { ListItems } from "../Components/ListItems";
import { MessageContext } from "../Contexts";
import '@testing-library/jest-dom'
import { items } from "./fixtures";

var DEFAULT_MESSAGE
const generateSrc = (path)=>`http://localhost:8080/static${path}`

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
describe("ListItems",()=>{
    beforeEach(()=>{
        DEFAULT_MESSAGE = {
            messageParams:{
                content:'',type:''
            },
            setMessageParams:jest.fn()
        }
    })
    it("When the component type is not 'Cart', certain components should not be rendered.",async()=>{
        const redirectToProduct = jest.fn()
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <ListItems datas={items} typeComponent={'home'} redirectToProduct={redirectToProduct}/>
            </MessageContext.Provider>
        )
       
        const btn_action = screen.queryByTestId("btn_action")
        const name_ = screen.getAllByTestId('item_name')
        const price_ = screen.getAllByTestId('item_price')
        const img_ = screen.getAllByTestId('item_img')
        const products = screen.queryAllByTestId('item')

        expect(products).toHaveLength(items.length)
                                                                                                                                                                                                                                
        expect(btn_action).not.toBeInTheDocument()

        expect(name_.length).toEqual(items.length)
        expect(screen.queryByTestId('item_quantity')).not.toBeInTheDocument()
        
        items.map(({name,price,imgPath},ind)=>{
            expect(name_[ind].textContent).toEqual(name)
            expect(price_[ind].textContent).toEqual(price.toString())
            expect(img_[ind].getAttribute('src')).toEqual(generateSrc(imgPath))
        })
        fireEvent.click(products[0])    
        expect(redirectToProduct).toHaveBeenCalledTimes(1)
        expect(redirectToProduct).toHaveBeenCalledWith(items[0].id)
    })
    
    it("When the component type is 'cart' and the 'Remove from cart' button is clicked, it should call a service.",async()=>{
        const service = jest.spyOn(Services,'serviceRemoveFromCart').mockResolvedValue({message:'sucess',status:201})
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <ListItems datas={items} typeComponent={'Cart'} />
            </MessageContext.Provider>
        )
        expect(screen.getAllByTestId('btn_action')).toHaveLength(10)
        const btn_component = screen.getAllByTestId("btn_component")
      
        fireEvent.click(btn_component[0])

        expect(service).toHaveBeenCalledTimes(1)
        expect(service).toHaveBeenCalledWith({product_id:items[0].id,quantity:1})

        itemsCart(screen)
      
    })
    it(
        "When the component type is 'cart' and the 'decrease -' button is clicked, it should call a service.",async()=>{
        const service = jest.spyOn(Services,'serviceDecreaseCart').mockReturnValue({message:'sucess',status:201})
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <ListItems datas={items} typeComponent={'Cart'}/>
            </MessageContext.Provider>
        )
        expect(screen.getAllByTestId('btn_action')).toHaveLength(10)
        const btn_action = screen.getAllByTestId("btn_action")
        fireEvent.click(btn_action[0])

        expect(service).toHaveBeenCalledTimes(1)
        expect(service).toHaveBeenCalledWith({product_id:items[0].id,quantity:1})

       
      
    })
    it("When the component type is 'cart' and the 'increase +' button is clicked, it should call a service.",async()=>{
        const service = jest.spyOn(Services,'serviceIncreaseCart').mockReturnValue({message:'sucess',status:201})
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <ListItems datas={items} typeComponent={'Cart'}/>
            </MessageContext.Provider>
        )
        expect(screen.getAllByTestId('btn_action')).toHaveLength(10)
        const btn_action = screen.getAllByTestId("btn_action")
    
        fireEvent.click(btn_action[1])

        expect(service).toHaveBeenCalledTimes(1)
        expect(service).toHaveBeenCalledWith({product_id:items[0].id,quantity:1})

        itemsCart(screen)
      
    })
})

describe("When the service returns a user who is not logged in.",()=>{
    beforeEach(()=>{
        DEFAULT_MESSAGE = {
            messageParams:{
                content:'',type:''
            },
            setMessageParams:jest.fn()
        }
    })
    
    it("When the user tries to increase the cart while not logged in, it should return an error.",async()=>{
        const service = jest.spyOn(Services,'serviceIncreaseCart').mockReturnValue({message:'sucess',status:401})
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <ListItems datas={items} typeComponent={'Cart'}/>
            </MessageContext.Provider>
        )
      
        const btn_action = screen.getAllByTestId("btn_action")
       

        fireEvent.click(btn_action[1])

        await waitFor(()=>{
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledTimes(1)
            expect(DEFAULT_MESSAGE.setMessageParams).not.toHaveBeenCalledWith({type:'sucess',content:'Sucesso ao adicionar.'})
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledWith({type:'error',content:'Login necessário para adicionar ao carrinho.'})
       
        })
    })
    it("When the user tries to decrease but is not logged in, it should return an error.",async()=>{
        const service = jest.spyOn(Services,'serviceDecreaseCart').mockReturnValue({message:'sucess',status:401})
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <ListItems datas={items} typeComponent={'Cart'}/>
            </MessageContext.Provider>
        )
       
        const btn_action = screen.getAllByTestId("btn_action")
        
        fireEvent.click(btn_action[1])

       
        await waitFor(()=>{
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledTimes(1)
            expect(DEFAULT_MESSAGE.setMessageParams).not.toHaveBeenCalledWith({type:'sucess',content:'Sucesso ao adicionar.'})
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledWith({type:'error',content:'Login necessário para adicionar ao carrinho.'})
       
        })
    })
    it("When a user tries to remove an item from the cart but is not logged in, it should return an error.",async()=>{
        const service = jest.spyOn(Services,'serviceRemoveFromCart').mockReturnValue({message:'sucess',status:401})
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <ListItems datas={items} typeComponent={'Cart'} />
            </MessageContext.Provider>
        )
       
        const btn_action = screen.getAllByTestId("btn_action")
       

        fireEvent.click(btn_action[0])

        await waitFor(()=>{
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledTimes(1)
            expect(DEFAULT_MESSAGE.setMessageParams).not.toHaveBeenCalledWith({type:'sucess',content:'Sucesso ao adicionar.'})
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledWith({type:'error',content:'Login necessário para adicionar ao carrinho.'})
       
        })
      
    })
})


describe("When the service returns an error.",()=>{
    beforeEach(()=>{
        DEFAULT_MESSAGE = {
            messageParams:{
                content:'',type:''
            },
            setMessageParams:jest.fn()
        }
    })
   
    it("When the user tries to increase the cart while not logged in, it should return an error.",async()=>{
        const service = jest.spyOn(Services,'serviceIncreaseCart').mockReturnValue({message:'sucess',status:500})
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <ListItems datas={items} typeComponent={'Cart'}/>
            </MessageContext.Provider>
        )
      
        const btn_action = screen.getAllByTestId("btn_action")
       

        fireEvent.click(btn_action[1])

        await waitFor(()=>{
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledTimes(1)
            expect(DEFAULT_MESSAGE.setMessageParams).not.toHaveBeenCalledWith({type:'sucess',content:'Sucesso ao adicionar.'})
            expect(DEFAULT_MESSAGE.setMessageParams).not.toHaveBeenCalledWith({type:'error',content:'Login necessário para adicionar ao carrinho.'})
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledWith({type:'error',content:'Algo deu errado'})
        })
    })
    it("When the user tries to decrease the cart but is not logged in, it should return an error.",async()=>{
        const service = jest.spyOn(Services,'serviceDecreaseCart').mockReturnValue({message:'sucess',status:500})
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <ListItems datas={items} typeComponent={'Cart'}/>
            </MessageContext.Provider>
        )
       
        const btn_action = screen.getAllByTestId("btn_action")
        
        fireEvent.click(btn_action[1])

       
        await waitFor(()=>{
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledTimes(1)
            expect(DEFAULT_MESSAGE.setMessageParams).not.toHaveBeenCalledWith({type:'sucess',content:'Sucesso ao adicionar.'})
            expect(DEFAULT_MESSAGE.setMessageParams).not.toHaveBeenCalledWith({type:'error',content:'Login necessário para adicionar ao carrinho.'})
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledWith({type:'error',content:'Algo deu errado'})
        })
    })
    it("When a user tries to remove an item from the cart but is not logged in, it should return an error.",async()=>{
        const service = jest.spyOn(Services,'serviceRemoveFromCart').mockReturnValue({message:'sucess',status:500})
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <ListItems datas={items} typeComponent={'Cart'} />
            </MessageContext.Provider>
        )
       
        const btn_action = screen.getAllByTestId("btn_action")
       

        fireEvent.click(btn_action[0])

        await waitFor(()=>{
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledTimes(1)
            expect(DEFAULT_MESSAGE.setMessageParams).not.toHaveBeenCalledWith({type:'sucess',content:'Sucesso ao adicionar.'})
            expect(DEFAULT_MESSAGE.setMessageParams).not.toHaveBeenCalledWith({type:'error',content:'Login necessário para adicionar ao carrinho.'})
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledWith({type:'error',content:'Algo deu errado'})
        })
      
    })
})