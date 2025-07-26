import { ErrorMessage } from "../helpers/ErrorMessage";
import { IOrderRepository } from "../repository/OrderRepository";
import { IReviewsRepository } from "../repository/ReviewsRepository";
import { OrderItem } from "../types/order";

export interface IRewviewsService {
   
    addComments(userId:number,orderItemId:number,content:string):Promise<void>,
    addReview(userId:number,orderItemId:number,rating:number):Promise<void>
}
export class ReviewsService implements IRewviewsService{
    constructor(protected reviews:IReviewsRepository,
        protected  orderItem:IOrderRepository
    ){}

    protected async checkOrderItem(userId:number,orderItemId:number):Promise<OrderItem>{
        const orderItem = await this.orderItem.getOrderItemByIdAndUserId(userId,orderItemId)
        if (!orderItem) {
            throw new ErrorMessage("Order item not found or does not belong to the user.", 404);
        }
        return orderItem;
    }
    public async addComments(userId:number,orderItemId:number,content:string):Promise<void>{
        const orderItem = await this.checkOrderItem(userId,orderItemId)
        
        await this.reviews.addComment({
            userId,content,orderId:orderItem.orderId,productId:orderItem.productId
        })

    }
    public async addReview(userId:number,orderItemId:number,rating:number):Promise<void>{
        const orderItem  = await this.checkOrderItem(userId,orderItemId)
        if(rating > 5)rating =5
        if(rating <0)rating = 1
        await this.reviews.addReview({
            userId,rating,orderId:orderItem.id,productId:orderItem.productId
        })
    }
}