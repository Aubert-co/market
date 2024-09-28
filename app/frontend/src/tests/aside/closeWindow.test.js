import * as Service from '../../services/cart';
import { closeWindow } from '../../Components/Aside/BoxWindows';
import { render, screen, waitFor } from '@testing-library/react';
import { saveCart,getCart } from '../../Cache';
import { filterArray } from '../../Components/Utils';


const setIsWindowOpen = jest.fn()
describe('closeWindow',()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
        global.fetch = jest.fn()
        localStorage.clear()
    })
    afterEach(()=>{
        jest.clearAllMocks()
        global.fetch = jest.fn()
        localStorage.clear()
    })
    it("Should delete the item by setting deleted to true and update the saved status to true in localStorage.",async()=>{
        const token = "o1i3434mkdmf"
        localStorage.setItem("token",token)
        const datas = [{id:1,name:'shirt',quantity:45,saved:false,deleted:false},{id:2,name:'pants',quantity:5,saved:false,deleted:false},
            {id:11,name:'shirt',quantity:45,saved:false,deleted:true}
        ]
        saveCart(datas)
        const mockResponse = {ok: true,status:201,};
        const fetchs =  global.fetch.mockResolvedValue(mockResponse); 
        await closeWindow({typeWindow:'Cart',setIsWindowOpen})

        
        expect( fetchs ).toHaveBeenCalledWith("http://localhost:8080/cart/changes",{
        method:'PUT',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body:JSON.stringify( filterArray( datas ) )
       })
     
        const cartItems = getCart()
        expect(cartItems).toHaveLength(2)
        expect(cartItems).not.toBe(datas[2])
        expect( cartItems[0].deleted).toBeFalsy()
        expect( cartItems[1].deleted).toBeFalsy()
        expect( cartItems[0].saved).toBeTruthy()
        expect( cartItems[1].saved).toBeTruthy()
         
     })
     it("When the items have the saved key set to true, it should not fetch the values.",async()=>{
        const token = "o1i3434mkdmf"
        localStorage.setItem("token",token)
        const datas = [{id:1,name:'shirt',quantity:45,saved:true,deleted:false},{id:2,name:'pants',quantity:5,saved:true,deleted:false},
            {id:11,name:'shirt',quantity:45,saved:true,deleted:false}
        ]
        saveCart(datas)
        
        const mockResponse = {ok: true,status:201,};
        const fetchs =  global.fetch.mockResolvedValue(mockResponse); 
        await closeWindow({typeWindow:'Cart',setIsWindowOpen})

        expect( fetchs ).not.toHaveBeenCalled()
        const cartItems = getCart()
        expect(cartItems).toHaveLength(3)
        cartItems.map((val)=>{
            expect(val.saved).toBeTruthy()
        })
         
     })
    it("When the typeWindow is not 'Cart' should not call the service.",async()=>{
        const serviceUpdateCart= jest.spyOn(Service,'serviceUpdateCart')
        await closeWindow({typeWindow:'Product',setIsWindowOpen})

        expect(setIsWindowOpen).toHaveBeenCalledTimes(1)
        expect(setIsWindowOpen).toHaveBeenCalledWith(false)

        expect( serviceUpdateCart ).not.toHaveBeenCalled()
    })
    it("When the type is 'Cart' and no token is provided, it should return status 401, and the data in localStorage should remain unchanged.",async()=>{
        const serviceUpdateCart= jest.spyOn(Service,'serviceUpdateCart')
        const datas = [{id:1,name:'shirt',quantity:45,saved:false,deleted:true},{id:2,name:'pants',quantity:5,saved:false,deleted:false},
            {id:11,name:'shirt',quantity:45,saved:false,deleted:true}
        ]
        saveCart(datas)
        serviceUpdateCart.mockReturnValue({status:401})
        await closeWindow({typeWindow:'Cart',setIsWindowOpen})

        expect(setIsWindowOpen).toHaveBeenCalledTimes(1)
        expect(setIsWindowOpen).toHaveBeenCalledWith(false)

        expect(serviceUpdateCart).toHaveBeenCalledTimes(1)
        const cartItems = getCart()

        expect(cartItems).toHaveLength(3)
        expect( cartItems ).toEqual( datas )
      
    })
    

})