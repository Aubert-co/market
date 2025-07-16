import { PrismaClient } from "@prisma/client";
import { ErrorMessage } from "../Helpers/ErrorMessage";

export interface IStoreRepository{
    createStore(data:{storeName:string,userId:number,description:string,photo:string}):Promise<void>,
    checkStoreOwnerShip(storeId:number):Promise<any>,
    findByName(storeName:string):Promise<any>,
    selectUserStores(userId:number):Promise<Store[] | any>,
    
}
export type Store = {
    name:string,
    photo:string,
    description:string,
    id:number,
    userId:number
}

export class StoreRepository implements IStoreRepository{
    
    constructor(private prisma:PrismaClient){}
 
    public async createStore(data:{storeName:string,userId:number,description:string,photo:string}):Promise<void>{
       
        await this.prisma.store.create({data:{
            name:data.storeName,
            userId:data.userId,
            description:data.description,
            photo:data.photo
        }})  
       
    } 
    public async checkStoreOwnerShip(storeId:number):Promise<any>{
        
        const datas =  await this.prisma.store.findUnique({
            where:{id:storeId}
        })
        return datas
     
    }
    public async findByName(storeName:string):Promise<any>{
  
        const datas = await this.prisma.store.findUnique({
            where:{name:storeName}
        })
        return datas;
        
    }
    public async selectUserStores(userId:number):Promise<Store | any>{
        const datas = await this.prisma.store.findMany({
            where:{userId}
        })
        return datas
    }
}