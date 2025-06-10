import { PrismaClient } from "@prisma/client";
import { ErrorMessage } from "../Helpers/ErrorMessage";

export interface IStoreRepository{
    createStore(data:{storeName:string,userId:string,description:string,photo:string}):Promise<void>,
    findByName(storeName:string):Promise<boolean>,
    findByStoreId(storeId:number):Promise<Array<storeDatas>>
}
export type storeDatas = {
    id:number,
    name:string,
    description:string,
    photo:string,
    userId:string,
}

export class StoreRepository implements IStoreRepository{
    
    constructor(private prisma:PrismaClient){}
 
    public async createStore(data:{storeName:string,userId:string,description:string,photo:string}):Promise<void>{
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
    public async findByName(storeName: string): Promise<boolean> {
        try{
            const store = await this.prisma.store.findUnique({
                where:{
                    name:storeName
                }
            })
            if(!store)return false;

            return true;
        }catch(err:any){
          
            throw new ErrorMessage("Failed to find store",409)
        }
    }
    public async findByStoreId(storeId:number):Promise<Array<storeDatas>>{
        try{
            const store = await this.prisma.store.findUnique({
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