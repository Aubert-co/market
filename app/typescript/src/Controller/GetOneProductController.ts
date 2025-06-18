import { NextFunction, Response ,Request} from "express";
import { ProductService } from "../Services/ProductService";
import { checkIsAValidNumber } from "../Helpers";
import { ErrorMessage } from "../Helpers/ErrorMessage";

export class GetOneProduct{
    constructor(protected products:ProductService){}

    public async handler(req:Request,res:Response,next:NextFunction){
        let category:string;
        if(!checkIsAValidNumber(req.params.id)){
            throw new ErrorMessage("Failed to retrieve products. Please try again later.", 500);
        }
        try{
            const product = await this.products.getProductById(Number(req.params.id));
            if(!product){
                return res.status(200).send({message:'Sucess',datas:[]})
            }
            category = product.category
            res.status(200).send({message:'Sucess',datas:[product]})
            const userId = req.user
            if(category){
                await this.products.saveRecentCategories(category,userId)
            }
        }catch(err:any){
            next(err)
        }
            
           
    }
}