import { PrismaClient } from "@prisma/client";

export interface IReviewsRepository  {
    addReview({userId,rating,productId,orderId}:AddReview & Rating):Promise<void>,
    addComment({userId,content,productId,orderId}:AddReview & Content):Promise<void>
}
type Rating = {
    rating:number
}
type Content = {
    content:string
}
type AddReview =  {
    orderId:number,
    userId:number,
    productId:number
}

export class ReviewsRepository implements IReviewsRepository{
    constructor(protected prisma:PrismaClient){}
    public async addReview({userId,rating,productId,orderId}:AddReview & Rating):Promise<void>{
        await this.prisma.review.create({
            data:{
                orderItemId:orderId,
                userId,rating,productId
            }
        })
    }
    public async addComment({userId,content,productId,orderId}:AddReview & Content):Promise<void>{
        await this.prisma.comment.create({
            data:{
                userId,content,productId,orderItemId:orderId
            }
        })
    }
}