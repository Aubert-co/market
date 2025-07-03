import { ErrorMessage } from "../Helpers/ErrorMessage"
import { IStoreRepository } from "../Repository/StoreRepository"
import type { Store } from "../Repository/StoreRepository"
export interface storeService{
    createStore(storeName:string,userId:number,photo:string,description:string): Promise<void>,
    checkOwnerShip(storeId:number,userId:number):Promise<boolean>,
    findByName(storeName:string):Promise<boolean>,
    selectUserStores(userId:number):Promise<Store[]>
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
            throw new ErrorMessage("Failed to create a store",409)
        }
       
    }
    public async findByName(storeName:string):Promise<boolean>{
        try{
            const datas =  await this.storeRepository.findByName(storeName)
            if(!datas)return false;

            return true;
        }catch(err:any){
            throw new ErrorMessage("Failed to find a store",409)
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
    public async selectUserStores(userId:number):Promise<Store[]>{
        try{
            const datas = await this.storeRepository.selectUserStores(userId)
            if(!datas && datas.length <0)return [];

            return datas ;
        }catch(err:any){
            throw new ErrorMessage("Failed to find a store",409)
        }
    }
}