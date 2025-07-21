import { ErrorMessage } from "../Helpers/ErrorMessage";
import { IOrderRepository } from "../Repository/OrderRepository";
import { IReviewsRepository } from "../Repository/ReviewsRepository";
import { OrderItem } from "../types/order";

export class ReviewsService {
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
    public async addComments(content:string,userId:number,orderItemId:number):Promise<void>{
        const orderItem = await this.checkOrderItem(userId,orderItemId)
        
        await this.reviews.addComment({
            userId,content,orderId:orderItem.orderId,productId:orderItem.productId
        })

    }
    public async addReview(userId:number,orderItemId:number,rating:number):Promise<void>{
        const orderItem  = await this.checkOrderItem(userId,orderItemId)
        
        await this.reviews.addReview({
            userId,rating,orderId:orderItem.id,productId:orderItem.productId
        })
    }
}