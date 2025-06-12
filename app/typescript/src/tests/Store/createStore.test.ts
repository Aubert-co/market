import { ErrorMessage } from "../../Helpers/ErrorMessage";
import { prisma } from "../../lib/prima";
import { StoreService } from "../../Model/StoreService";
import { StoreRepository } from "../../Repository/StoreRepository";


class MocksError extends Error{
    code :string;
    constructor(message:string,code:string){
        super(message)
        this.code = code
    }
}
describe("StoreService",()=>{
 
    const mockedPrisma  ={
        store:{
            create:jest.fn()
        }
    }
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should throw if an error occurs when creating a new store",async()=>{
      
        mockedPrisma.store.create.mockRejectedValue(new Error("Something went wrong"))
        const storeService = new StoreRepository(mockedPrisma as any)
        const datas =  {storeName:'test',description:'test',photo:'test',userId:'1'}
        try{
            await storeService.createStore(datas )
        }catch(err:any){
            expect(err).toBeInstanceOf(ErrorMessage)
            expect(err.message).toEqual('Failed to create a store')
            expect(err.status).toEqual(409)
        }
        expect(mockedPrisma.store.create).toHaveBeenCalledTimes(1)
                expect(mockedPrisma.store.create).toHaveBeenCalledWith(  {data: {
            name: 'test',
            description: 'test',
            photo: 'test',
            userId: '1'
        } })
    })
    it("should throw an error if a store with the same name already exists in the database",async()=>{
       
        mockedPrisma.store.create.mockRejectedValue(new MocksError("user already exists",'P2002'))
        const storeService = new StoreRepository(mockedPrisma as any)
        const datas =  {storeName:'test',description:'test',photo:'test',userId:'1'}
        try{
            await storeService.createStore(datas )
        }catch(err:any){
            expect(err).toBeInstanceOf(ErrorMessage)
            expect(err.message).toEqual('A store with this name already exists.')
            expect(err.status).toEqual(409)
        }
        expect(mockedPrisma.store.create).toHaveBeenCalledTimes(1)
        expect(mockedPrisma.store.create).toHaveBeenCalledWith(  {data: {
            name: 'test',
            description: 'test',
            photo: 'test',
            userId: '1'
        } })
    })
})