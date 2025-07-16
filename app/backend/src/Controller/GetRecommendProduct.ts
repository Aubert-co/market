import { NextFunction,Request,Response } from "express";
import { ProductService } from "../Services/ProductService";
import { checkIsAValidNumber } from "../Helpers";
import { IProductRedisRepository } from "../Repository/ProductRedisRepository";

export class GetRecommendedProducts {
    constructor(protected products:ProductService,protected redis:IProductRedisRepository){}

    public async handler(req:Request,res:Response,next:NextFunction){
        
        let category:string
        const userId = req.user
        const recommendDatas = await this.redis.getRecentCategories(userId)
        if(recommendDatas.length ===0){
            return res.status(200).send({message:'Sucess',datas:[]})
        }
        
        
        const datas = await this.products.selectByCategory(recommendDatas[0],5,0);
        
    }
}