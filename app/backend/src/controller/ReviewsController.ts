import { NextFunction, Request, Response } from "express";
import { IRewviewsService } from "../services/ReviewsService";
import { checkIsAValidNumber, isAValidString } from "../helpers";

export class ReviewsController{
    constructor(protected reviews:IRewviewsService){}
    public async addReview(req:Request,res:Response,next:NextFunction):Promise<any>{
        const rating = req.body?.rating
        const orderId = req.body.order

        if (!checkIsAValidNumber(rating)) {
            return res.status(400).send({ message: "Invalid rating. It must be a valid number." });
        }

        if (!checkIsAValidNumber(orderId)) {
            return res.status(400).send({ message: "Invalid order ID. It must be a valid number." });
        }

       try{
            const userId = req.user
            await this.reviews.addReview(userId,orderId,rating)
            res.status(200).send({message:'Sucess'})
        }catch(err){
            next(err)
        }
    }
    public async addComments(req:Request,res:Response,next:NextFunction):Promise<any>{
        const content = req.body?.content
        const orderId = req.body?.order

        if(!isAValidString(content,150)){
            return res.status(400).send({
                message: "Content must be between 5 and 150 characters long."
            });
        }
        if (!checkIsAValidNumber(orderId)) {
            return res.status(400).send({ message: "Invalid order ID. It must be a valid number." });
        }
        try{
            const userId = req.user
            await this.reviews.addComments(userId,orderId,content)
            res.status(200).send({message:'Sucess'})
        }catch(err:any){
            next(err)
        }
    }
}