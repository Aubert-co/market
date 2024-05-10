import React from "react";
import { fireEvent, render,screen, waitFor ,act} from "@testing-library/react";
import  *as Services from "../services"
import { BoxItems } from "../components/BoxItems";
import { MessageContext } from "../contexts";
import '@testing-library/jest-dom'
import { items } from "./fixtures";

var DEFAULT_MESSAGE 
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
    it("When requisicion is ok should render the items",async()=>{
        const datas = items
        const serviceAdd= jest.spyOn(Services,'addToCart').mockResolvedValue({message:'sucess',status:201})
        const serviceGet = jest.fn().mockReturnValue({status:201,datas:items})
        const searchParams = {price:32}
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <BoxItems searchParams={searchParams} service={serviceGet}/>
            </MessageContext.Provider>
        )
        const loading = screen.getByTestId('loading')

        expect(loading.textContent).toEqual('carregando...')
        expect(serviceGet).toHaveBeenCalledTimes(1)
 
        const sleep =(period)=>  new Promise(resolve => setTimeout(resolve, period));
        await act(async()=>{
            await sleep(2000)
            
        })
        const add_cart = screen.getAllByTestId("btn_action")[0]
        fireEvent.click(add_cart)
   
        expect(serviceAdd).toHaveBeenCalledTimes(1)
        expect(serviceAdd).toHaveBeenCalledWith({product_id:items[0].id,quantity:1})
      
        const name_ = screen.getAllByTestId('item_name')
        const price_ = screen.getAllByTestId('item_price')
        const img_ = screen.getAllByTestId('item_img')
        
        datas.map(({name,price,imgPath},ind)=>{
            expect(name_[ind].textContent).toEqual(name)
            expect(price_[ind].textContent).toEqual(price.toString())
            expect(img_[ind].getAttribute('src')).toEqual(generateSrc(imgPath))
        })
      await waitFor(()=>{
        expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledTimes(1)
        expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledWith({type:'sucess',content:'Sucesso ao adicionar.'})
       })
        
       
 
        
    })
    it("When requisicion is not ok should return an error",async()=>{
        const datas = items
        const serviceGet = jest.fn().mockReturnValue({status:500,datas:items})
        const searchParams = {price:32}
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <BoxItems searchParams={searchParams} service={serviceGet}/>
            </MessageContext.Provider>
        )
        const loading = screen.getByTestId('loading')

        expect(loading.textContent).toEqual('carregando...')
        await waitFor(()=>{
            const error = screen.getByTestId('error')
            
            expect( screen.queryByTestId("btn_action") ).not.toBeInTheDocument()
            expect(screen.queryByTestId('item')).not.toBeInTheDocument()
            expect(error.textContent).toEqual('Não encontrado!')
        })
        
    })
})