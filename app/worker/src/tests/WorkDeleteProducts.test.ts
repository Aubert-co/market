import { doAWork} from '../deleteProduct.worker'
import * as storages from '../Services/storageGoogle'


const storeId = 1
const productId = 1
let product = {
    id:productId,storeId,name:'shirt',
    imageUrl:'image-1',
    limit:10,
    stock:10,
    description:'lorem isptu'
}
describe("doAWork",()=>{
    let productService:any
     ={
        getProductById:jest.fn(),
        deleteProduct:jest.fn()
    } 
    it("should call the database with the correct parameters and delete the image",async()=>{
        let spyDelete = jest.spyOn(storages,'deleteImgFromBucket').mockResolvedValue(undefined)
        productService.getProductById.mockResolvedValue(product)
 
        await doAWork({productId:1,storeId:1,productRep:productService})
        
        expect(productService.getProductById).toHaveBeenCalledWith(1)
        expect(productService.deleteProduct).toHaveBeenCalledWith(storeId,productId)
        expect(spyDelete).toHaveBeenCalledTimes(1)
        expect(spyDelete).toHaveBeenCalledWith(product.imageUrl)
    })
    it("should not call the database when the storeid is different from the product",async()=>{
        let spyDelete = jest.spyOn(storages,'deleteImgFromBucket').mockResolvedValue(undefined)
        productService.getProductById.mockResolvedValue(product)
 
        await doAWork({productId:1,storeId:2,productRep:productService})
        
        expect(productService.getProductById).toHaveBeenCalledWith(1)
        expect(productService.deleteProduct).toHaveBeenCalledTimes(0)
        expect(spyDelete).toHaveBeenCalledTimes(0)
       
    })
    it("should not call the database when the product is null",async()=>{
        let spyDelete = jest.spyOn(storages,'deleteImgFromBucket').mockResolvedValue(undefined)
        productService.getProductById.mockResolvedValue({})
 
        await doAWork({productId:1,storeId:1,productRep:productService})
        
        expect(productService.getProductById).toHaveBeenCalledWith(1)
        expect(productService.deleteProduct).toHaveBeenCalledTimes(0)
        expect(spyDelete).toHaveBeenCalledTimes(0)
       
    })
    it("should not delete the image when a database error occurs",async()=>{
        let spyDelete = jest.spyOn(storages,'deleteImgFromBucket').mockResolvedValue(undefined)
        productService.getProductById.mockResolvedValue(product)
        productService.deleteProduct.mockRejectedValue(new Error())


        try{
            await doAWork({productId:1,storeId:1,productRep:productService})
            
            expect(productService.getProductById).toHaveBeenCalledWith(1)
            expect(productService.deleteProduct).toHaveBeenCalledTimes(0)
            expect(spyDelete).toHaveBeenCalledTimes(0)
        }catch(err:any){

        }
    })
})