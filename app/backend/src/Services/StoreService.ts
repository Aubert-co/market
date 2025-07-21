import { generateImgPath } from "../Helpers/checkIsValidImage";
import { ErrorMessage } from "../Helpers/ErrorMessage"
import { uploadFileToGCS } from "../Lib/FileUpload";
import { IStoreRepository } from "../Repository/StoreRepository"
import { Store } from "../types/store";

export interface IStoreService{
    createStore({userId,name,description,buffer,originalName,mimeType}:CreateStoreParams): Promise<void>,
    checkOwnerShip(storeId:number,userId:number):Promise<boolean>,
    findByName(storeName:string):Promise<boolean>,
    selectUserStores(userId:number):Promise<Store[]>,
}
type CreateStoreParams = {
    userId:number,
    name:string,
    description:string,
    buffer:Buffer,
    originalName:string,
    mimeType:string
}
export class StoreService implements IStoreService{
    protected storeRepository:IStoreRepository
    constructor(storeRepository:IStoreRepository){
        this.storeRepository = storeRepository
    }
  
    public async createStore ({name,description,userId,buffer,
        originalName,mimeType
    }:CreateStoreParams):Promise<void>{
       
      
            
        const newUrlPath = generateImgPath(originalName)
        
        const existsStoreName = await this.storeRepository.findByName( name )
        if(existsStoreName)throw new ErrorMessage("A store with this name already exists.",409)

        await this.storeRepository.createStore({storeName:name,
            userId,photo:newUrlPath,description
        })
        await uploadFileToGCS({
            fileBuffer:buffer,urlPath:newUrlPath,
            mimeType
        })
       
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
            return datas?.userId === userId;
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