import { NextFunction ,Request,Response} from "express";
import { checkIsAValidNumber } from "../Helpers";
import { IStoreService } from "../Services/StoreService";



export class VerifyStoreOwnership{
    constructor(protected store:IStoreService){}
    public async handler(req:Request,res:Response,next:NextFunction):Promise<any>{
       
        const storeId = Number(req.body.storeId)
        const userId = req.user
         if(!checkIsAValidNumber(req.body.storeId)){
            return res.status(400).send({message:"Invalid store ID."})
        }
        try{
            const check = await this.store.checkOwnerShip(Number(storeId),Number(userId))
          
            if(!check) {
                return res.status(403).json({ message: "You do not have permission to access this store." });
            }
            next()
        } catch (err: any) {
           
            return res.status(500).json({ message: "An unexpected error occurred." });
        }
    }
}