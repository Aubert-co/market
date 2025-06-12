import { ErrorMessage } from "../Helpers/ErrorMessage"
import { IStoreRepository, storeDatas } from "../Repository/StoreRepository"

export interface storeService{
    createStore(storeName:string,userId:string,photo:string,description:string): Promise<void>,
}

export class StoreService implements storeService{
    protected storeRepository:IStoreRepository
    constructor(storeRepository:IStoreRepository){
        this.storeRepository = storeRepository
    }
 
    public async createStore (storeName: string, userId: string, photo: string, description: string):Promise<void>{
       
        try{
            await this.storeRepository.createStore({storeName,userId,photo,description})
        }catch(err:any){
            
            if(err instanceof ErrorMessage){
                throw new ErrorMessage(err.message,err.status)
            }
            throw new Error(err)

        }
       
    }
}