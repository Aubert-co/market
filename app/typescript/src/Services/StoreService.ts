import { ErrorMessage } from "../Helpers/ErrorMessage"
import { IStoreRepository } from "../Repository/StoreRepository"

export interface storeService{
    createStore(storeName:string,userId:number,photo:string,description:string): Promise<void>,
    checkOwnerShip(storeId:number,userId:number):Promise<boolean>,
    findByName(storeName:string):Promise<boolean>
}

export class StoreService implements storeService{
    protected storeRepository:IStoreRepository
    constructor(storeRepository:IStoreRepository){
        this.storeRepository = storeRepository
    }
  
    public async createStore (storeName: string, userId: number, photo: string, description: string):Promise<void>{
       
        try{
            await this.storeRepository.createStore({storeName,userId,photo,description})
        }catch(err:any){
            
            if(err instanceof ErrorMessage){
                throw new ErrorMessage(err.message,err.status)
            }
            throw new Error(err)

        }
       
    }
    public async findByName(storeName:string):Promise<boolean>{
        try{
            const datas =  await this.storeRepository.findByName(storeName)
            if(!datas)return false;

            return true;
        }catch(err:any){
            throw new Error(err)
        }
    }
    public async checkOwnerShip(storeId:number,userId:number):Promise<boolean>{
        try{
            const datas = await this.storeRepository.checkStoreOwnerShip(storeId)
            if(datas.userId === userId){
                return true;
            }
            return false;
        }catch(err:any){
            throw new ErrorMessage("Failed to find a store",409)
        }
    }
}