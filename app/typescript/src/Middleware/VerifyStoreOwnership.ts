import { NextFunction ,Request,Response} from "express";
import { checkIsAValidNumber } from "../Helpers";
import { storeService } from "../Services/StoreService";

class VerifyStoreOwnership{
    constructor(protected store:storeService){}
    public async handler(req:Request,res:Response,next:NextFunction):Promise<any>{
        if(!checkIsAValidNumber(req.body.storeId)){
            return res.status(400).send({message:"Invalid store ID."})
        }
        const storeId = req.body.storeId
        const userId = req.user
        try{
            const check = await this.store.checkOwnerShip(storeId,userId)
            if(!check) {
                return res.status(400).json({ message: "Validation failed. Please check your input." });
            }
            next()
        } catch (err: any) {
            return res.status(500).json({ message: "An unexpected error occurred." });
        }
    }
}