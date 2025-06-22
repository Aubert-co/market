import { ErrorMessage } from '../../Helpers/ErrorMessage'
import { dataProducts } from '../../Repository/ProductRepository'
import {ProductService} from '../../Services/ProductService'


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
describe("method createProduct",()=>{
    let mockProductRepository:any
    let createProduct:any
    beforeEach(()=>{
        createProduct = jest.fn()
        mockProductRepository = {
            createProduct
        }
    })
    it("should call createProduct with the correct data",async()=>{
        
        const product = new ProductService(mockProductRepository)

        await product.createProduct({
            description,name,price,stock,storeId,imageUrl,
            category
        })
        expect(createProduct).toHaveBeenCalledTimes(1)
        expect(createProduct).toHaveBeenCalledWith({storeId,price,stock,imageUrl,category,name,description})
    })
    it("should throw an error when trying to create a new product",async()=>{
        mockProductRepository.createProduct.mockRejectedValue('wrong')
        const product  =  new ProductService(mockProductRepository)
        
        try{
            await product.createProduct({
            description,name,price,stock,storeId,imageUrl,
            category
        })
        }catch(err:any){
            expect(err).toBeInstanceOf(ErrorMessage)
            expect(err.message).toEqual("Failed to create product. Please check your input and try again.")
            expect(err.status).toEqual(422)
        }
    })
})
describe("method selectByCategory",()=>{
    let mockProductRepository:any
    let selectByCategory:any
    beforeEach(()=>{
        selectByCategory = jest.fn()
        mockProductRepository = {
            selectByCategory
        }
    })
    it("should call selectByCategory with the correct data",async()=>{
        mockProductRepository.selectByCategory.mockResolvedValue([])
        const product = new ProductService(mockProductRepository)

        const categoryProduct = await product.selectByCategory(category,limit,skip)
        expect(categoryProduct).toEqual([])
        expect(selectByCategory).toHaveBeenCalledTimes(1)
        expect(selectByCategory).toHaveBeenCalledWith(category,limit,skip)
    })
    it("should throw an error when trying to retrieve a product category",async()=>{
        mockProductRepository.selectByCategory.mockRejectedValue('wrong')
        const product  =  new ProductService(mockProductRepository)
        
        try{
            await product.selectByCategory(category,limit,skip)
        
        }catch(err:any){
            expect(err).toBeInstanceOf(ErrorMessage)
            expect(err.message).toEqual("Failed to retrieve products. Please try again later.")
            expect(err.status).toEqual(500)
        }
    })
})

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
        const product = new ProductService(mockProductRepository)
        const getProduct = await product.getProductInCache(name)
       
        expect(getCachedProduct).toHaveBeenCalledTimes(1)
        expect(getProduct[0]).toEqual( data )
         
    })
    it("should return an empty array when cache is empty",async()=>{
        const stringifyDatas = JSON.stringify( [] )
        mockProductRepository.getCachedProduct.mockResolvedValue( stringifyDatas )
        const product = new ProductService(mockProductRepository)
        const getProduct = await product.getProductInCache(name)
       
        expect(getCachedProduct).toHaveBeenCalledTimes(1)
        expect(getProduct).toEqual( [] )
         
    })
    it("should return [] when the value is not an array",async()=>{
        const stringifyDatas = JSON.stringify( 'name' )
        mockProductRepository.getCachedProduct.mockResolvedValue( stringifyDatas )
        const product = new ProductService(mockProductRepository)
        const getProduct = await product.getProductInCache(name)
       
        expect(getCachedProduct).toHaveBeenCalledTimes(1)
        expect(getProduct).toEqual( [] )
         
    })
    it("should return [] when an error is thrown",async()=>{
        mockProductRepository.getCachedProduct.mockRejectedValue()
        const product = new ProductService(mockProductRepository)
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
        const product = new ProductService(mockProductRepository)
        const key = 'lvauee'
        await product.saveProductInCache(key,[data])
        const stringify = JSON.stringify([data])
        expect(saveProductInCache).toHaveReturnedTimes(1)
        expect(saveProductInCache).toHaveBeenCalledWith(key,stringify)
    })
    it("should return an empty array when an error is thrown",async()=>{
        mockProductRepository.saveProductInCache.mockRejectedValue()
        const product = new ProductService(mockProductRepository)
        const key = 'lvauee'
        const cached = await product.saveProductInCache(key,[data])
        const stringify = JSON.stringify([data])
        expect(saveProductInCache).toHaveReturnedTimes(1)
        expect(saveProductInCache).toHaveBeenCalledWith(key,stringify)
        expect(cached).toEqual([])
    })
})

describe("method getProducts",()=>{
    let getProducts:any
    let mockProductRepository:any
    beforeEach(()=>{
        getProducts = jest.fn()
        
        mockProductRepository = {
            getProducts
        }
    })
    it("should get the products sucessfully",async()=>{
        mockProductRepository.getProducts.mockResolvedValue( data )
        const getValues = new ProductService(mockProductRepository)
        const products = await getValues.getProducts(limit,skip)
 
        expect(products).toEqual(data)
        expect(getProducts).toHaveBeenCalledTimes(1)
        expect(getProducts).toHaveBeenCalledWith(limit,skip)
        
    })
    it("should throws an error",async()=>{
        mockProductRepository.getProducts.mockRejectedValue(  )
        const getValues = new ProductService(mockProductRepository)
        try{
            const products = await getValues.getProducts(limit,skip)
        }catch(err:any){
            expect(err).toBeInstanceOf(ErrorMessage)
            expect(err.message).toEqual("Failed to retrieve products. Please try again later.")
            expect(err.status).toEqual(500)
        }
    })
})

describe("method getProductById",()=>{
    let getProductById:any
    let mockProductRepository:any
    beforeEach(()=>{
        getProductById = jest.fn()
        
        mockProductRepository = {
            getProductById
        }
    })
    it("should get the product sucessfully",async()=>{
        mockProductRepository.getProductById.mockResolvedValue( data )
        const getValues = new ProductService(mockProductRepository)
        const products = await getValues.getProductById(id)
 
        expect(products).toEqual(data)
        expect(getProductById).toHaveBeenCalledTimes(1)
        expect(getProductById).toHaveBeenCalledWith(id)
    })
    it("should get null when repository return a null product",async()=>{
        mockProductRepository.getProductById.mockResolvedValue( null )
        const getValues = new ProductService(mockProductRepository)
        const products = await getValues.getProductById(id)
 
        expect(products).toEqual( null )
        expect(getProductById).toHaveBeenCalledTimes(1)
        expect(getProductById).toHaveBeenCalledWith(id)
    })
    it("should throws an error",async()=>{
        mockProductRepository.getProductById.mockRejectedValue(  )
        const getValues = new ProductService(mockProductRepository)
        try{
        const products = await getValues.getProductById(id)
        }catch(err:any){
            expect(err).toBeInstanceOf(ErrorMessage)
            expect(err.message).toEqual("Failed to retrieve products. Please try again later.")
            expect(err.status).toEqual(500)
        }
        
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
        const getValues = new ProductService(mockProductRepository)
        await getValues.saveRecentCategories(category,id)

        expect(saveRecentCategories).toHaveBeenCalledTimes(1)
        expect(saveRecentCategories).toHaveBeenCalledWith(category,id)
    })
    it("should return void when throws an error",async()=>{
        mockProductRepository.saveRecentCategories.mockRejectedValue(  )
        const getValues = new ProductService(mockProductRepository)
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
        const getValues = new ProductService(mockProductRepository)
        const recentCategory = await getValues.getRecentCategories(id)

        expect(recentCategory).toEqual([category])
        expect(getRecentCategories).toHaveBeenCalledTimes(1)
        expect(getRecentCategories).toHaveBeenCalledWith(id)
    })
    it("should return void when throws an error",async()=>{
        mockProductRepository.getRecentCategories.mockRejectedValue(  )
        const getValues = new ProductService(mockProductRepository)
        try{
            const values = await getValues.getRecentCategories(id)
            expect(values).toBe([])
        }catch(err:any){

        }
    })
})

describe("method countProducts",()=>{
    let countProducts:any
    let mockProductRepository:any
    beforeEach(()=>{
        countProducts = jest.fn()
        
        mockProductRepository = {
            countProducts
        }
    })
    it("should sucessfully gets the count of products",async()=>{
        mockProductRepository.countProducts.mockResolvedValue( 10  )
        const getValues = new ProductService(mockProductRepository)
        const count = await getValues.countProducts()

        expect(count).toEqual(10)
        expect(countProducts).toHaveBeenCalledTimes(1)
        expect(countProducts).toHaveBeenCalledWith()
    })
    it("should return void when throws an error",async()=>{
        mockProductRepository.countProducts.mockRejectedValue(  )
        const getValues = new ProductService(mockProductRepository)
        try{
            const values = await getValues.countProducts()
            expect(values).toBe([])
        }catch(err:any){
            expect(err).toBeInstanceOf(ErrorMessage)
            expect(err.status).toEqual(500)
            expect(err.message).toEqual("Failed to count products in the database")
        }
    })
    it("should return 0 when the count of product is null",async()=>{
        mockProductRepository.countProducts.mockResolvedValue( null )
        const getValues = new ProductService(mockProductRepository)
        
            const values = await getValues.countProducts()
            expect(values).toBe(0)
       
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
        const getValues = new ProductService(mockProductRepository)
        const count = await getValues.getCountProductInCache()

        expect(count).toEqual(10)
        expect(getCountProductsInCache).toHaveBeenCalledTimes(1)
        expect(getCountProductsInCache).toHaveBeenCalledWith()
    })
    it("should return 0 when throws an error",async()=>{
        mockProductRepository.getCountProductsInCache.mockRejectedValue(  )
        const getValues = new ProductService(mockProductRepository)
        try{
            const values = await getValues.getCountProductInCache()
            expect(values).toBe(0)
        }catch(err:any){
          
        }
    })
    it("should return 0 when the count of product is null",async()=>{
        mockProductRepository.getCountProductsInCache.mockResolvedValue( null )
        const getValues = new ProductService(mockProductRepository)
        
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
    it("should sucessfully gets the count of products in cache",async()=>{
        mockProductRepository.saveCountProductsInCache.mockResolvedValue( 10  )
        const getValues = new ProductService(mockProductRepository)
        const count = await getValues.saveCountProductsInCache(10)

        expect(saveCountProductsInCache).toHaveBeenCalledWith(10)
        expect(saveCountProductsInCache).toHaveBeenCalledTimes(1)
      
    })
    it("should return null when throws an error",async()=>{
        mockProductRepository.saveCountProductsInCache.mockRejectedValue(  )
        const getValues = new ProductService(mockProductRepository)
        try{
            const values = await getValues.saveCountProductsInCache(10)
            expect(values).toBe(null)
        }catch(err:any){
          
        }
    })
    
})