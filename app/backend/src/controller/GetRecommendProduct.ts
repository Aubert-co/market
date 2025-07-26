import { NextFunction,Request,Response } from "express";
import { ProductService } from "../services/ProductService";
import { checkIsAValidNumber } from "../helpers";
import { IProductRedisRepository } from "../repository/ProductRedisRepository";

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