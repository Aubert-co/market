import React from "react";
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import  *as Services from "../services"
import { ListItems } from "../Components/ListItems";
import { MessageContext } from "../Contexts";
import '@testing-library/jest-dom'
import { items } from "./fixtures";

var DEFAULT_MESSAGE
const generateSrc = (path)=>`http://localhost:8080/static${path}`
var setTottally;
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
        setTottally= jest.spyOn(React,'useState')
     
        setTottally.mockImplementation((init) => [init, jest.fn()]);

        jest.clearAllMocks()
    })
    it("When the component type is not 'Cart', certain components should not be rendered.",async()=>{
        const redirectToProduct = jest.fn()
        render(
            <MessageContext.Provider value={DEFAULT_MESSAGE}>
                <ListItems datas={items} typeComponent={'home'} redirectToProduct={redirectToProduct} setTottaly={setTottally}/>
            </MessageContext.Provider>
        )
       
        
        const name_ = screen.getAllByTestId('item_name')
        const price_ = screen.getAllByTestId('item_price')
        const img_ = screen.getAllByTestId('item_img')
        const products = screen.queryAllByTestId('item')

        expect(products).toHaveLength(items.length)
                                                                                                                                                                                                                                
       

        expect(name_.length).toEqual(items.length)
        expect(screen.queryByTestId('item_quantity')).not.toBeInTheDocument()
        
        items.map(({name,price,imgPath},ind)=>{
            expect(name_[ind].textContent).toEqual(name)
            expect(price_[ind].textContent).toEqual(price.toString())
            expect(img_[ind].getAttribute('src')).toEqual(generateSrc(imgPath))
            expect(products[ind]).not.toHaveClass(`Cart_${ind}`)
        })

        fireEvent.click(products[0])    
        expect(redirectToProduct).toHaveBeenCalledTimes(1)
        expect(redirectToProduct).toHaveBeenCalledWith(items[0].id)

        expect( setTottally ).not.toHaveBeenCalled()

    })
    
    it("When the component type is 'cart' and the 'Remove from cart' button is clicked, it should call a service.",async()=>{
        render(
           <ListItems datas={items} typeComponent={'Cart'} setTottaly={setTottally}/>
        )
   
        const carts = screen.queryAllByTestId("item")
        const name_ = screen.getAllByTestId('item_name')
        const price_ = screen.queryAllByTestId('item_price')
        const img_ = screen.getAllByTestId('item_img')
      

        expect( price_).toHaveLength( 0 )
        expect(carts).toHaveLength(items.length)
        carts.forEach((val,ind)=>{
            expect( val ).toHaveClass(`Cart_${ind+1}`)
            expect(img_[ind].getAttribute('src')).toEqual(generateSrc(items[ind].imgPath))
            expect( name_[ind]).toHaveTextContent( items[ind].name )
        })
        fireEvent.click( carts[0] )
        expect( window.location.href).toEqual("http://localhost/")
    })
  
})
