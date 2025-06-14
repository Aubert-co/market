import { PrismaClient } from "@prisma/client";
import { ErrorMessage } from "../Helpers/ErrorMessage";

export interface IStoreRepository{
    createStore(data:{storeName:string,userId:number,description:string,photo:string}):Promise<void>,
 
}


export class StoreRepository implements IStoreRepository{
    
    constructor(private prisma:PrismaClient){}
 
    public async createStore(data:{storeName:string,userId:number,description:string,photo:string}):Promise<void>{
        try{
            await this.prisma.store.create({data:{
                name:data.storeName,
                userId:data.userId,
                description:data.description,
                photo:data.photo
            }}) 
        }catch(err:any){
            if (err.code === 'P2002') {
                throw new ErrorMessage('A store with this name already exists.', 409);
            }
            throw new ErrorMessage("Failed to create a store",409)
        }
    }
  
}