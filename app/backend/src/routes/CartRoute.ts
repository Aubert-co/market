import { Router,Request,Response,NextFunction } from "express"
import { UserCartController } from "@/controller/UserCartController"
import { UserCartRepository } from "@/repository/UserCartRepository"
import { UserCartService } from "@/services/UserCartService"
import { prisma } from "@/lib/prisma"
import { ProductRepository } from "@/repository/ProductRepository"
import { Auth } from "@/middleware/Auth"
const userCartRepository = new UserCartRepository(prisma)
const productRepository = new ProductRepository(prisma)
const userCartService = new UserCartService(userCartRepository,productRepository)
const userCartController = new UserCartController(userCartService)
const route = Router()
route.get('/user/cart',[Auth],
    (req:Request,res:Response,next:NextFunction)=>userCartController.getCartItems(req,res,next)
)
route.delete('/user/cart/remove',[Auth],
    (req:Request,res:Response,next:NextFunction)=> userCartController.removeItemFromCart(req,res,next)
)
route.post('/user/cart/add',[Auth],
    (req:Request,res:Response,next:NextFunction)=>userCartController.addItemToCart(req,res,next)
)
route.put('/user/cart/update',[Auth],
    (req:Request,res:Response,next:NextFunction)=>userCartController.updateCart(req,res,next)
)

export default route;