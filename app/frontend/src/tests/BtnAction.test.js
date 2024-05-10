import React from "react"

import { fireEvent, render,screen ,waitFor} from "@testing-library/react"
import *as Services from "../services"
import { MessageContext } from "../contexts"
import { BtnAction } from "../components/listItems"

var DEFAULT_MESSAGE ;

describe('addCart',()=>{
    beforeEach(()=>{
      jest.useFakeTimers()
    })
    it("When the service returns successfully, it should set the message context to 'Sucesso ao adicionar'.",async()=>{
        const service = jest.fn().mockReturnValue({status:201})
        const message = {sucess:'Sucesso ao adicionar.'}
        DEFAULT_MESSAGE = {
            messageParams:{
                content:'',type:''
            },
            setMessageParams:jest.fn()
        }
       jest.spyOn(React,'useState').mockReturnValue([DEFAULT_MESSAGE.messageParams,DEFAULT_MESSAGE.setMessageParams])

        render(
            <MessageContext.Provider value={  DEFAULT_MESSAGE }>
                <BtnAction message={message} product_id={84} service={service} text={'Remover do carrinho'}></BtnAction>
            </MessageContext.Provider>
            )
        const clickButton = screen.getByTestId('btn_action')

        fireEvent.click(clickButton)
        expect(clickButton.textContent).toEqual('Remover do carrinho')
        expect(service).toHaveBeenCalledWith({product_id:84,quantity:1})
        expect(service).toHaveBeenCalledTimes(1)
        await waitFor(()=>{
        
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledTimes(1)
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledWith({type:'sucess',content:message.sucess})
            expect(DEFAULT_MESSAGE.setMessageParams).not.toHaveBeenCalledWith({type:'error',content:'Algo deu errado'})
           
        })

    })
    it("When a service returns an error status, it should trigger a message context with 'Falha ao adicionar'.",async()=>{
        const service = jest.fn().mockReturnValue({status:500})
        const message = {sucess:'Sucesso ao adicionar.'}
        DEFAULT_MESSAGE = {
            messageParams:{
                content:'',type:''
            },
            setMessageParams:jest.fn()
        }
        jest.spyOn(React,'useState').mockReturnValue([DEFAULT_MESSAGE.messageParams,DEFAULT_MESSAGE.setMessageParams])

        render(
            <MessageContext.Provider value={  DEFAULT_MESSAGE }>
                <BtnAction service={service} product_id={84} text={'increase'} message={message}></BtnAction>
            </MessageContext.Provider>
            )
        const clickButton = screen.getByTestId('btn_action')

        fireEvent.click(clickButton)
        expect(clickButton.textContent).toEqual('increase')
        expect(service).toHaveBeenCalledWith({product_id:84,quantity:1})
        expect(service).toHaveBeenCalledTimes(1)
        await waitFor(()=>{
        
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledTimes(1)
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledWith({type:'error',content:'Algo deu errado'})
            expect(DEFAULT_MESSAGE.setMessageParams).not.toHaveBeenCalledWith({type:'sucess',content:'Sucesso ao adicionar.'})
           
        })
        
    })
    it("When a user is not logged in, an error message should be returned.",async()=>{
        const service = jest.fn().mockReturnValue({status:401})
        const message = {sucess:'Sucesso ao adicionar.'}
        DEFAULT_MESSAGE = {
            messageParams:{
                content:'',type:''
            },
            setMessageParams:jest.fn()
        }
        jest.spyOn(React,'useState').mockReturnValue([DEFAULT_MESSAGE.messageParams,DEFAULT_MESSAGE.setMessageParams])

        render(
            <MessageContext.Provider value={  DEFAULT_MESSAGE }>
                <BtnAction service={service} product_id={84} text={'increase'} message={message}></BtnAction>
            </MessageContext.Provider>
            )
        const clickButton = screen.getByTestId('btn_action')

        fireEvent.click(clickButton)
        expect(clickButton.textContent).toEqual('increase')
        expect(service).toHaveBeenCalledWith({product_id:84,quantity:1})
        expect(service).toHaveBeenCalledTimes(1)
        await waitFor(()=>{
        
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledTimes(1)
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledWith({type:'error',content:'Login necessário para adicionar ao carrinho.'})
            expect(DEFAULT_MESSAGE.setMessageParams).not.toHaveBeenCalledWith({type:'error',content:'Algo deu errado'})
            expect(DEFAULT_MESSAGE.setMessageParams).not.toHaveBeenCalledWith({type:'sucess',content:'Sucesso ao adicionar.'})
           
        })
        
    })
    it("When no message parameters are sent, the message component should not be rendered.",async()=>{
        const service = jest.fn().mockReturnValue({status:401})
        const message = {sucess:'Sucesso ao adicionar.'}
        DEFAULT_MESSAGE = {
            messageParams:{
                content:'',type:''
            },
            setMessageParams:jest.fn()
        }
        jest.spyOn(React,'useState').mockReturnValue([DEFAULT_MESSAGE.messageParams,DEFAULT_MESSAGE.setMessageParams])

        render(
            <MessageContext.Provider value={  DEFAULT_MESSAGE }>
                <BtnAction service={service} product_id={84} text={'increase'} ></BtnAction>
            </MessageContext.Provider>
            )
        const clickButton = screen.getByTestId('btn_action')

        fireEvent.click(clickButton)
        expect(clickButton.textContent).toEqual('increase')
        expect(service).toHaveBeenCalledWith({product_id:84,quantity:1})
        expect(service).toHaveBeenCalledTimes(1)
        await waitFor(()=>{
        
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledTimes(0)
            expect(DEFAULT_MESSAGE.setMessageParams).not.toHaveBeenCalledWith({type:'error',content:'Login necessário para adicionar ao carrinho.'})
            expect(DEFAULT_MESSAGE.setMessageParams).not.toHaveBeenCalledWith({type:'error',content:'Algo deu errado'})
            expect(DEFAULT_MESSAGE.setMessageParams).not.toHaveBeenCalledWith({type:'sucess',content:'Sucesso ao adicionar.'})
           
        })
        
    })
})