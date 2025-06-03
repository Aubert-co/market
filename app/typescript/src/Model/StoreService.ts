import { ErrorMessage } from "../Helpers/ErrorMessage"
import { IStoreRepository } from "../Repository/StoreRepository"

export interface storeService{
    createStore(name:string,userId:number,photo:string,description:string): Promise<void>,
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
    public async createStore (name: string, userId: number, photo: string, description: string):Promise<void>{
        await this.storeRepository.createStore({name,userId,photo,description})
    }
}