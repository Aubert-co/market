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


