import React from "react";
import { fireEvent, render,screen, waitFor ,act} from "@testing-library/react";
import  *as Services from "../services";
import { BoxItems } from "../Components/BoxItems";
import { MessageContext } from "../Contexts";
import '@testing-library/jest-dom';
import { items } from "./fixtures";
import { Router} from 'react-router-dom'
import { createMemoryHistory } from "history";

var DEFAULT_MESSAGE;
const generateSrc = (path)=>`http://localhost:8080/static${path}`
describe("BoxItems",()=>{
    beforeEach(()=>{
        DEFAULT_MESSAGE = {
            messageParams:{
                content:'',type:''
            },
            setMessageParams:jest.fn()
        }
    }) 
    it("When the request is successful, it should render the items.",async()=>{

        const serviceGet = jest.fn().mockReturnValue({status:201,datas:items})
        const searchParams = {price:32}
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={DEFAULT_MESSAGE}>
                    <BoxItems searchParams={searchParams} service={serviceGet}/>
                </MessageContext.Provider>
            </Router>
        )
        const loading = screen.getByTestId('loading')

        expect(loading.textContent).toEqual('carregando...')
        expect(serviceGet).toHaveBeenCalledTimes(1)
        expect( serviceGet ).toHaveBeenCalledWith( {body:searchParams} )
   
    await waitFor(()=>{
        const name_ = screen.getAllByTestId('item_name')
        const price_ = screen.getAllByTestId('item_price')
        const img_ = screen.getAllByTestId('item_img')
        const product = screen.queryAllByTestId('item')
        const btn_action = screen.queryByTestId('btn_action')
        expect(screen.queryByTestId("text_item")).not.toBeInTheDocument()
        expect(btn_action).not.toBeInTheDocument()
        expect( screen.queryByTestId("text_item") ).not.toBeInTheDocument()
        items.map(({name,price,imgPath},ind)=>{
            expect(name_[ind].textContent).toEqual(name)
            expect(price_[ind].textContent).toEqual(price.toString())
            expect(img_[ind].getAttribute('src')).toEqual(generateSrc(imgPath))
        })
        fireEvent.click(product[0])
        expect(history.location.pathname).toEqual(`/product/${items[0].id}`)
    
    })
        
    })
    it("When requisicion is not ok should return an error",async()=>{
        
        const serviceGet = jest.fn().mockReturnValue({status:500,datas:items})
        const searchParams = {price:32}
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={DEFAULT_MESSAGE}>
                    <BoxItems searchParams={searchParams} service={serviceGet}/>
                </MessageContext.Provider>
            </Router>
        )
        const loading = screen.getByTestId('loading')

        expect(loading.textContent).toEqual('carregando...')
        expect( serviceGet ).toHaveBeenCalledWith( {body:searchParams} )
        await waitFor(()=>{
            const error = screen.getByTestId('error')
            const btn_action = screen.queryByTestId('btn_action')
            expect(screen.queryByTestId("text_item")).not.toBeInTheDocument()
            expect(btn_action).not.toBeInTheDocument()
            expect( screen.queryByTestId("btn_action") ).not.toBeInTheDocument()
            expect(screen.queryAllByTestId('item')).toEqual( [] )
            expect(error.textContent).toEqual('Algo deu errado!')
            expect( screen.queryByTestId("text_item") ).not.toBeInTheDocument()
        })
        
    })
    it("When the request is successful but the array is empty, it should not render the items.",async()=>{
        
        const serviceGet = jest.fn().mockReturnValue({status:201,datas:[]})
        const searchParams = {price:32}
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={DEFAULT_MESSAGE}>
                    <BoxItems searchParams={searchParams} service={serviceGet}/>
                </MessageContext.Provider>
            </Router>
        )
        const loading = screen.getByTestId('loading')

        expect(loading.textContent).toEqual('carregando...')
        await waitFor(()=>{
            expect(screen.queryByTestId("text_item")).not.toBeInTheDocument()
            expect(screen.queryAllByTestId('item')).toEqual( [] )
            expect( screen.queryByTestId("no_data")).toBeInTheDocument()
            expect( screen.queryByTestId("text_item") ).not.toBeInTheDocument()
        })
        
    })
    it("When searchParams are not provided.",async()=>{
    
        const serviceGet = jest.fn().mockReturnValue({status:200,datas:items})
      
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={DEFAULT_MESSAGE}>
                    <BoxItems currentPage={null} searchParams={null} service={serviceGet}/>
                </MessageContext.Provider>
            </Router>
        )
        const loading = screen.getByTestId('loading')
    
        expect(loading.textContent).toEqual('carregando...')
        expect( serviceGet ).toHaveBeenCalledWith( undefined )
        await waitFor(()=>{
            const error = screen.queryByTestId('error')
            const btn_action = screen.queryByTestId('btn_action')
            expect(screen.queryByTestId("text_item")).not.toBeInTheDocument()
            expect(btn_action).not.toBeInTheDocument()
            expect( screen.queryByTestId("btn_action") ).not.toBeInTheDocument()
            expect(screen.queryAllByTestId('item')).toEqual( [] )
            expect(error).not.toBeInTheDocument()
        })
        
    })
    it("When 'text' is provided.",async()=>{
    
        const serviceGet = jest.fn().mockReturnValue({status:200,datas:items})
      
        const history = createMemoryHistory();
        const text = "texto recomended"
        render(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={DEFAULT_MESSAGE}>
                    <BoxItems text={text} currentPage={null} searchParams={null} service={serviceGet}/>
                </MessageContext.Provider>
            </Router>
        )
        const loading = screen.getByTestId('loading')
    
        expect(loading.textContent).toEqual('carregando...')
        expect( serviceGet ).toHaveBeenCalledWith( undefined )
        await waitFor(()=>{
            const error = screen.queryByTestId('error')
            const btn_action = screen.queryByTestId('btn_action')
            expect(screen.queryByTestId("text_item")).toBeInTheDocument()
            expect(btn_action).not.toBeInTheDocument()
            expect( screen.queryByTestId("btn_action") ).not.toBeInTheDocument()
            expect(screen.queryAllByTestId('item')).toHaveLength( items.length )
            expect(error).not.toBeInTheDocument()
        })
        
    })
    it("When 'text' is provided but the request results in an error.",async()=>{
    
        const serviceGet = jest.fn().mockRejectedValue()
      
        const history = createMemoryHistory();
        const text = "texto recomended"
        render(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={DEFAULT_MESSAGE}>
                    <BoxItems text={text} currentPage={null} searchParams={null} service={serviceGet}/>
                </MessageContext.Provider>
            </Router>
        )
        const loading = screen.getByTestId('loading')
    
        expect(loading.textContent).toEqual('carregando...')
        expect( serviceGet ).toHaveBeenCalledWith( undefined )
        await waitFor(()=>{
            const error = screen.queryByTestId('error')
            const btn_action = screen.queryByTestId('btn_action')
            expect(screen.queryByTestId("text_item")).not.toBeInTheDocument()
            expect(btn_action).not.toBeInTheDocument()
            expect( screen.queryByTestId("btn_action") ).not.toBeInTheDocument()
            expect(screen.queryAllByTestId('item')).toEqual( [] )
            expect(error).toBeInTheDocument()
          
        })
        
    })
})