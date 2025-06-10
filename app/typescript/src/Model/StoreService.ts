import { ErrorMessage } from "../Helpers/ErrorMessage"
import { IStoreRepository, storeDatas } from "../Repository/StoreRepository"

export interface storeService{
    createStore(storeName:string,userId:string,photo:string,description:string): Promise<void>,
    existsStore(name:string):Promise<boolean>
}

export class StoreService implements storeService{
    protected storeRepository:IStoreRepository
    constructor(storeRepository:IStoreRepository){
        this.storeRepository = storeRepository
    }
    public async existsStore(name:string):Promise< boolean>{
        
        const exists = await this.storeRepository.findByName(name)
        return exists;
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

    public async getStoreById(id:number):Promise<Array<storeDatas>>{
        const datas = await this.storeRepository.findByStoreId(id);
        return datas;
    }
}