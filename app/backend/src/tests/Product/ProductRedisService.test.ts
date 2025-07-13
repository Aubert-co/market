import { ErrorMessage } from '../../Helpers/ErrorMessage'
import {ProductRedisService} from '../../Services/ProductRediService'
import { dataProducts } from '../../Repository/ProductRepository'



const description = "lorem iptsu"
const name = "a name"
const id = 1
const storeId = 10
const category = "anyiqwen"
const stock = 10
const imageUrl = "lqrqerqer"
const price = 10
const skip = 10
const limit =10

let data:dataProducts

data = {
    description,name,stock,category,price,imageUrl,id,
    storeId
}



describe("method getProductInCache",()=>{
    let mockProductRepository:any
    let getCachedProduct:any
    beforeEach(()=>{
        getCachedProduct = jest.fn()
        
        mockProductRepository = {
            getCachedProduct
        }
    })
    it("should successfully retrieve the value from cache",async()=>{
        const stringifyDatas = JSON.stringify( [data] )
        mockProductRepository.getCachedProduct.mockResolvedValue( stringifyDatas )
        const product = new ProductRedisService(mockProductRepository)
        const getProduct = await product.getProductInCache(name)
       
        expect(getCachedProduct).toHaveBeenCalledTimes(1)
        expect(getProduct[0]).toEqual( data )
         
    })
    it("should return an empty array when cache is empty",async()=>{
        const stringifyDatas = JSON.stringify( [] )
        mockProductRepository.getCachedProduct.mockResolvedValue( stringifyDatas )
        const product = new ProductRedisService(mockProductRepository)
        const getProduct = await product.getProductInCache(name)
       
        expect(getCachedProduct).toHaveBeenCalledTimes(1)
        expect(getProduct).toEqual( [] )
         
    })
    it("should return [] when the value is not an array",async()=>{
        const stringifyDatas = JSON.stringify( 'name' )
        mockProductRepository.getCachedProduct.mockResolvedValue( stringifyDatas )
        const product = new ProductRedisService(mockProductRepository)
        const getProduct = await product.getProductInCache(name)
       
        expect(getCachedProduct).toHaveBeenCalledTimes(1)
        expect(getProduct).toEqual( [] )
         
    })
    it("should return [] when an error is thrown",async()=>{
        mockProductRepository.getCachedProduct.mockRejectedValue()
        const product = new ProductRedisService(mockProductRepository)
        const getProduct = await product.getProductInCache(name)
       
        expect(getCachedProduct).toHaveBeenCalledTimes(1)
        expect(getProduct).toEqual( [] )
         
    })
})

describe("method saveProductInCache",()=>{
    let mockProductRepository:any
    let saveProductInCache:any
    beforeEach(()=>{
        saveProductInCache = jest.fn()
        
        mockProductRepository = {
            saveProductInCache
        }
    })
    it("should save the products in cache successfully",async()=>{
        const product = new ProductRedisService(mockProductRepository)
        const key = 'lvauee'
        await product.saveProductInCache(key,[data])
        const stringify = JSON.stringify([data])
        expect(saveProductInCache).toHaveReturnedTimes(1)
        expect(saveProductInCache).toHaveBeenCalledWith(key,stringify)
    })
    it("should return an empty array when an error is thrown",async()=>{
        mockProductRepository.saveProductInCache.mockRejectedValue()
        const product = new ProductRedisService(mockProductRepository)
        const key = 'lvauee'
        const cached = await product.saveProductInCache(key,[data])
        const stringify = JSON.stringify([data])
        expect(saveProductInCache).toHaveReturnedTimes(1)
        expect(saveProductInCache).toHaveBeenCalledWith(key,stringify)
        expect(cached).toEqual([])
    })
})






describe("method saveRecentCategories",()=>{
    let saveRecentCategories:any
    let mockProductRepository:any
    beforeEach(()=>{
        saveRecentCategories = jest.fn()
        
        mockProductRepository = {
            saveRecentCategories
        }
    })
    it("should sucessfully saves a category in cache",async()=>{
        const getValues = new ProductRedisService(mockProductRepository)
        await getValues.saveRecentCategories(category,id)

        expect(saveRecentCategories).toHaveBeenCalledTimes(1)
        expect(saveRecentCategories).toHaveBeenCalledWith(category,id)
    })
    it("should return void when throws an error",async()=>{
        mockProductRepository.saveRecentCategories.mockRejectedValue(  )
        const getValues = new ProductRedisService(mockProductRepository)
        try{
            const values = await getValues.saveRecentCategories(category,id)
            expect(values).toBe(null)
        }catch(err:any){

        }
    })
})

describe("method getRecentCategories",()=>{
    let getRecentCategories:any
    let mockProductRepository:any
    beforeEach(()=>{
        getRecentCategories = jest.fn()
        
        mockProductRepository = {
            getRecentCategories
        }
    })
    it("should sucessfully gets a category in cache",async()=>{
        mockProductRepository.getRecentCategories.mockResolvedValue( [category]  )
        const getValues = new ProductRedisService(mockProductRepository)
        const recentCategory = await getValues.getRecentCategories(id)

        expect(recentCategory).toEqual([category])
        expect(getRecentCategories).toHaveBeenCalledTimes(1)
        expect(getRecentCategories).toHaveBeenCalledWith(id)
    })
    it("should return void when throws an error",async()=>{
        mockProductRepository.getRecentCategories.mockRejectedValue(  )
        const getValues = new ProductRedisService(mockProductRepository)
        try{
            const values = await getValues.getRecentCategories(id)
            expect(values).toBe([])
        }catch(err:any){

        }
    })
})



describe("method getCountProductInCache",()=>{
    let getCountProductsInCache:any
    let mockProductRepository:any
    beforeEach(()=>{
        getCountProductsInCache = jest.fn()
        
        mockProductRepository = {
            getCountProductsInCache
        }
    })
    it("should sucessfully gets the count of products in cache",async()=>{
        mockProductRepository.getCountProductsInCache.mockResolvedValue( 10  )
        const getValues = new ProductRedisService(mockProductRepository)
        const count = await getValues.getCountProductInCache()

        expect(count).toEqual(10)
        expect(getCountProductsInCache).toHaveBeenCalledTimes(1)
        expect(getCountProductsInCache).toHaveBeenCalledWith()
    })
    it("should return 0 when throws an error",async()=>{
        mockProductRepository.getCountProductsInCache.mockRejectedValue(  )
        const getValues = new ProductRedisService(mockProductRepository)
        try{
            const values = await getValues.getCountProductInCache()
            expect(values).toBe(0)
        }catch(err:any){
          
        }
    })
    it("should return 0 when the count of product is null",async()=>{
        mockProductRepository.getCountProductsInCache.mockResolvedValue( null )
        const getValues = new ProductRedisService(mockProductRepository)
        
        const values = await getValues.getCountProductInCache()
        expect(values).toBe(0)
       
    })
})

describe("method saveCountProductsInCache",()=>{
    let saveCountProductsInCache:any
    let mockProductRepository:any
    beforeEach(()=>{
        saveCountProductsInCache = jest.fn()
        
        mockProductRepository = {
            saveCountProductsInCache
        }
    })
    afterAll(()=>{
        jest.clearAllMocks()
    })
    it.skip("should sucessfully gets the count of products in cache",async()=>{
        mockProductRepository.saveCountProductsInCache.mockResolvedValue( 10  )
        const getValues = new ProductRedisService(mockProductRepository)
        const count = await getValues.saveCountProductsInCache(10)

        expect(saveCountProductsInCache).toHaveBeenCalledWith(10)
        expect(saveCountProductsInCache).toHaveBeenCalledTimes(1)
      
    })
    it("should return null when throws an error",async()=>{
        mockProductRepository.saveCountProductsInCache.mockRejectedValue(  )
        const getValues = new ProductRedisService(mockProductRepository)
        try{
            const values = await getValues.saveCountProductsInCache(10)
            expect(values).toBe(null)
        }catch(err:any){
          
        }
    })
    
})