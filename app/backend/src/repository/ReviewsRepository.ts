import { AddReviewDto } from "../types/reviews";
import { PrismaClient } from "@prisma/client";

export interface IReviewsRepository  {
    addReview({userId,rating,productId,orderId}:AddReviewDto & Product):Promise<void>,
  
}

type Product = {
    productId:number
}
export class ReviewsRepository implements IReviewsRepository{
    constructor(protected prisma:PrismaClient){}
    public async addReview({userId,rating,productId,orderId,content}:AddReviewDto & Product):Promise<void>{
        await this.prisma.review.create({
            data:{
                orderId,
                userId,rating,productId
            }
        })
        await this.prisma.$transaction(async(tx)=>{
            await tx.review.create({
                data:{
                    orderId,userId,rating,productId
                }
            })
            await tx.comment.create({
                data:{
                    userId,content,productId,orderId
                }
            })
            
        })
    }
   
}