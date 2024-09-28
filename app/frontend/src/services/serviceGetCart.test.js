import { getCart } from "../Cache";
import { serviceGetCart } from "./cart";



describe("serviceGetCart",()=>{
    beforeEach(()=>{
        global.fetch = jest.fn()
        jest.clearAllMocks()
        localStorage.clear()
        jest.useFakeTimers()
    })
    it("When no token is saved in localStorage, it should return data equal to [] and status 401.",async()=>{
        const datas = [{id:1,name:'shirt',quantity:45}]
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue( datas ),
            status:201
        };
        global.fetch.mockResolvedValue(mockResponse); 
        const service = await serviceGetCart()
        
        expect(service.datas).toEqual([])
        expect(service.status).toEqual(401)
        expect(localStorage.getItem('times')).toBeNull()
    })
    it("When calling a service and it returns successfully, it should save the data in localStorage.",async()=>{
        localStorage.setItem('token','o831ou3p1m')
        const datas = [{id:1,name:'shirt',quantity:45}]
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue( datas ),
            status:201
        };
        global.fetch.mockResolvedValue(mockResponse); 
        const service = await serviceGetCart()
        const dateNow = new Date().getTime()      
        expect(service.datas).toEqual(datas)
        expect(service.status).toEqual(201)
        const localData = JSON.parse(localStorage.getItem('times'))
        expect( localData['cart'] ).toEqual(dateNow)
        expect(global.fetch).toHaveBeenCalledTimes(1)

        const getStorageCart = getCart()
        
        expect(getStorageCart).toHaveLength(1)
        expect(getStorageCart).toEqual(datas)
        
    })
    it("When there are dates saved in localStorage and the time has not been exceeded, it should return the data from localStorage.",async()=>{
        const datasToStorage = [{id:35,name:'pants',quantity:55}]
        const date = new Date().getTime()
        localStorage.setItem('cart',JSON.stringify(datasToStorage))
        localStorage.setItem('token','o831ou3p1m')
        localStorage.setItem('times',JSON.stringify({cart:date}))

        const datas = [{id:1,name:'shirt',quantity:45}]
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue( datas ),
            status:201
        };
        global.fetch.mockResolvedValue(mockResponse); 
        const service = await serviceGetCart()
        const dateNow = new Date().getTime()      
        expect(service.datas).not.toEqual(datas)
        expect(service.status).toEqual(201)
        expect(service.datas).toEqual(datasToStorage)
        const localData = JSON.parse(localStorage.getItem('times'))
        expect( localData['cart'] ).toEqual(dateNow)
        expect(global.fetch).toHaveBeenCalledTimes(0)

        const getStorageCart = getCart()
        
        expect(getStorageCart).toHaveLength(1)
        expect(getStorageCart).toEqual(datasToStorage)
        
    })
    it("When the cached time is exceeded, it should save new items from the request in the localStorage.",async()=>{
        const datasToStorage = [{id:35,name:'pants',quantity:55}]
        const date = new Date().getTime() - (11 * 1000 * 60);
        localStorage.setItem('cart',JSON.stringify(datasToStorage))
        localStorage.setItem('token','o831ou3p1m')
        localStorage.setItem('times',JSON.stringify({cart:date}))

        const datas = [{id:1,name:'shirt',quantity:45}]
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue( datas ),
            status:201
        };
        global.fetch.mockResolvedValue(mockResponse); 
        const service = await serviceGetCart()
        expect(global.fetch).toHaveBeenCalledTimes(1)
        const dateNow = new Date().getTime()      
        expect(service.datas).toEqual(datas)
        expect(service.status).toEqual(201)
        expect(service.datas).not.toEqual(datasToStorage)
        const localData = JSON.parse(localStorage.getItem('times'))
        expect( localData['cart'] ).toEqual(dateNow)
        

        const getStorageCart = getCart()
        
        expect(getStorageCart).toHaveLength(1)
        expect(getStorageCart).toEqual(datas)
        
    })
    
})