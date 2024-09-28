import { getCart, saveCart } from "../Cache";
import { serviceUpdateCart } from "./cart";

describe("serviceUpdateCart",()=>{
    beforeEach(()=>{
        global.fetch = jest.fn()
        jest.clearAllMocks()
        localStorage.clear()
       
    })
    it("Should return status 401 and not modify data in localStorage when no token is provided.",async()=>{
       
        const datas = [{id:1,name:'shirt',quantity:45,saved:false,deleted:true},{id:2,name:'pants',quantity:5,saved:false,deleted:false},
            {id:11,name:'shirt',quantity:45,saved:false,deleted:true}
        ]
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue( datas ),
            status:201
        };
        global.fetch.mockResolvedValue(mockResponse); 

        const response = await serviceUpdateCart()
        expect(response.status).toEqual(401)
    })
    it("Should delete the item by setting deleted to true and update the saved status to true in localStorage.",async()=>{
        localStorage.setItem('token','o831ou3p1m')
        const datas = [{id:1,name:'shirt',quantity:45,saved:false,deleted:false},{id:2,name:'pants',quantity:5,saved:false,deleted:false},
            {id:11,name:'shirt',quantity:45,saved:false,deleted:true}
        ]
        saveCart(datas)
        const mockResponse = {
            ok: true,
            status:201
        };
        global.fetch.mockResolvedValue(mockResponse); 

        const response = await serviceUpdateCart()
        expect(response.status).toEqual(201)

        const cartItems = getCart()

        expect(cartItems).toHaveLength(2)
       
        expect(cartItems).not.toBe(datas[2])
        expect( cartItems[0].deleted).toBeFalsy()
        expect( cartItems[1].deleted).toBeFalsy()
        expect( cartItems[0].saved).toBeTruthy()
        expect( cartItems[1].saved).toBeTruthy()
     })
     it("Should not modify data in localStorage when an error occurs.",async()=>{
        localStorage.setItem('token','o831ou3p1m')
        const datas = [{id:1,name:'shirt',quantity:45,saved:false,deleted:false},{id:2,name:'pants',quantity:5,saved:false,deleted:false},
            {id:11,name:'shirt',quantity:45,saved:false,deleted:true}
        ]
        saveCart(datas)
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue( datas ),
            status:504
        };
        global.fetch.mockResolvedValue(mockResponse); 

        const response = await serviceUpdateCart()
        expect(response.status).toEqual(504)
        const cartItems = getCart()
        expect(cartItems).toHaveLength(3)
        expect( cartItems ).toEqual( datas )
     })
})