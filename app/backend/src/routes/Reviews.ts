import { ReviewsController } from "../controller/ReviewsController";
import { Auth } from "../middleware/Auth";
import { NextFunction, Router,Request,Response } from "express";
import { ReviewsRepository } from "../repository/ReviewsRepository";
import { prisma } from "../lib/prisma";
import { ReviewsService } from "../services/ReviewsService";
import { OrderRepository } from "../repository/OrderRepository";

const reviewsRepository  =new ReviewsRepository(prisma)
const orderRepository = new OrderRepository(prisma)
const reviewsService = new ReviewsService(reviewsRepository,orderRepository)
const reviewsController =new  ReviewsController(reviewsService)
const route = Router()


route.post('/reviews/create',[Auth],
   (req:Request,res:Response,next:NextFunction)=> reviewsController.addReview(req,res,next)
)

export default route