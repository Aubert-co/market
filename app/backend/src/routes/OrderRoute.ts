import { NextFunction, Request, Response, Router } from "express";
import { OrdersController } from "../controller/OrdersController";
import { prisma } from "../lib/prisma";
import { Auth } from "../middleware/Auth";
import { CouponRepository } from "../repository/CouponRepository";
import { OrderRepository } from "../repository/OrderRepository";
import { ProductRepository } from "../repository/ProductRepository";
import { OrderService } from "../services/OrderService";


const route = Router()

const orderRepository = new OrderRepository(prisma)
const productRepository = new ProductRepository(prisma)
const couponRepository = new CouponRepository(prisma)
const orderService = new OrderService( orderRepository ,productRepository,couponRepository,prisma)
const orderController = new OrdersController( orderService)

route.post('/order/create',
    [Auth],
    (req:Request,res:Response,next:NextFunction)=>orderController.userCreateOrder(req,res,next)
)

export default route