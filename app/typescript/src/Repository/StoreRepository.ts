import { PrismaClient } from "@prisma/client";
import { ErrorMessage } from "../Helpers/ErrorMessage";

export interface IStoreRepository{
    createStore(data:{name:string,userId:number,description:string,photo:string}):Promise<void>,
    findByName(storeName:string):Promise<boolean>,
    findByStoreId(storeId:number):Promise<Array<storeDatas>>
}
export interface storeDatas{
    id:number,
    name:string,
    description:string,
    photo:string,
    userId:string,
}

export class StoreRepository implements IStoreRepository{
    protected prisma:PrismaClient
    constructor(prisma:PrismaClient){}
 
    public async createStore(data:{name:string,userId:number,description:string,photo:string}):Promise<void>{
        try{
            this.prisma.store.create({data})
        }catch(err:any){
            throw new ErrorMessage("Failed to create a store",409)
        }
    }
    public async findByName(storeName: string): Promise<boolean> {
        try{
            const store = this.prisma.store.findUnique({
                where:{
                    name:storeName
                }
            })
            
            return store ? true : false;
        }catch(err:any){
            throw new ErrorMessage("Failed to find store",409)
        }
    }
    public async findByStoreId(storeId:number):Promise<Array<storeDatas>>{
        try{
            const store = this.prisma.store.findUnique({
                where:{
                    id:storeId
                }
            })
            return store ? [store] : [];
        }catch(err:any){
            throw new ErrorMessage("Failed to find store",409)
        }
    }
}