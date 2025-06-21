import {GetProducts}from'../../Controller/GetProductsController'
import { ProductService } from '../../Services/ProductService'



describe("class GetProducts",()=>{
    let productService:any
    let getProducts:any
    let countProducts:any
    let getProductInCache:any
    let saveProductInCache:any
    let request:any
    let response:any
    let next:any
    let produRepository:any
    beforeEach(()=>{
        request = jest.fn()
        response  = jest.fn()
        next = jest.fn()
        getProducts = jest.fn()
        countProducts = jest.fn()
        getProductInCache = jest.fn()
        saveProductInCache = jest.fn()
        productService ={ 
            countProducts,
            getProductInCache,
            saveProductInCache,
            getProducts
        }
    })
    it("test whem",()=>{
        const prodService = new ProductService(produRepository) 
        jest.spyOn(prodService,'countProducts').mockReturnValueOnce(new Promise((res,reje)=>res(10)))
        request = {params:{page:undefined}}
        const prod = new GetProducts(productService)
        prod.handler(request,response,next)
        expect(countProducts).toHaveBeenCalledTimes(1)
        expect(getProductInCache).toHaveBeenCalledTimes(1)
        expect(getProductInCache).toHaveBeenCalledWith(`product:page:1`)
        expect(getProducts).toHaveBeenCalledTimes(1)
        expect(getProducts).toHaveBeenCalledWith(10,0)
    })
})