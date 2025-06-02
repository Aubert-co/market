import { PrismaClient } from "@prisma/client";
import { ErrorMessage } from "../Helpers/ErrorMessage";

export interface IStoreRepository{
    createStore(data:{name:string,userId:number,description:string,photo:string}):Promise<void>
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
}