import { NextFunction, Request, Response } from "express";
import { storeService } from "../Services/StoreService";

export class GetUserStore{
    constructor(protected storeService:storeService){}

    public async handler(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            const userId = req.user
            const stores = await this.storeService.selectUserStores(userId)
            
            res.status(200).send({message:'Sucess',datas:stores})
        }catch(err:any){
            next(err)
        }
    }
}