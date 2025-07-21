import { NextFunction, Request, Response } from "express";
import { checkIsAValidNumber } from "../Helpers";
import { IUserCartService } from "../Services/UserCartService";

export class UserCartController{
    public constructor(protected userCart:IUserCartService){}

    public async addItemToCart(req:Request,res:Response,next:NextFunction):Promise<any>{
        if (!checkIsAValidNumber(req.body.quantity)) {
                return res.status(400).send({
                    message: "Invalid quantity. Please provide a valid number."
                });
            }
        if (!checkIsAValidNumber(req.body.productId)) {
            return res.status(400).send({
                message: "Invalid product ID. Please provide a valid number."
            });
        }
        try{
            const userId = req.user
            const quantity = Number(req.body.quantity)
            const productId =  Number(req.body.productId)

            await this.userCart.createOrUpdate(userId,productId,quantity)

            res.status(201).send({message:'Sucess'})
        }catch(err:any){
            next(err)
        }
    }
    public async getCartItems(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            const userId = req.user
            const datas = await this.userCart.getAllCartItems(userId)
            
            res.status(200).send({message:'Sucess',datas})
        }catch(err:any){
            next(err)
        }
    }
    public async removeUserCart(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
          if (!checkIsAValidNumber(req.body.productId)) {
                return res.status(400).send({
                    message: "Invalid product ID. Please provide a valid number."
                });
            }
            const productId = Number(req.body.productId)
            const userId = req.user
            await this.userCart.removeItem(productId,userId)
            res.status(200).send({message:'Sucess'})
        }catch(err:any){
            next(err)
        }
    }
    public async updateCart(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            const cart = req.body.cart
            if(cart && !Array.isArray( cart ) ){
                return res.status(400).send({message:'Invalid cart'})
            }
            const userId = req.user
            
            await this.userCart.updateCart(cart,userId);
            res.status(201).send({message:'Updating cart'})
        }catch(err:any){
            next(err)
        }
    }
}