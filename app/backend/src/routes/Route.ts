
import { prisma } from "../lib/prisma";
import redis from "../lib/redis";
import { ProductRepository } from "../repository/ProductRepository";
import { StoreRepository } from "../repository/StoreRepository";
import { UserRepository } from "../repository/UserRepository";
import { ProductService } from "../services/ProductService";
import { StoreService } from "../services/StoreService";


import { Router,NextFunction,Request,Response } from "express";
import { generateSignedUrl } from "../lib/googleStorage";
import { Auth } from "../middleware/Auth";
import { ProductAdminController } from "../controller/ProductAdminController";


import { ProductRedisRepository } from "../repository/ProductRedisRepository";
import { ProductRedisService } from "../services/ProductRediService";
import { VerifyStoreOwnership } from "../middleware/VerifyStoreOwnership";
import {  UserService } from "../services/UserService";
import { RefreshTokenController } from "../controller/RefreshTokenController";
import { CouponController } from "../controller/CouponController";
import { CouponRepository } from "../repository/CouponRepository";
import { CouponServices } from "../services/CouponServices";

import storeRoute from '../routes/StoreRoute'
import cartRoute from '@/routes/CartRoute'
import { fileUpload } from "@/lib/fileUpload";
import productRoute from '@/routes/ProductsRoute'
import authRoute from '@/routes/AuthRoute'

const userRepository = new UserRepository( prisma)
const storeRepository = new StoreRepository(prisma)
const productRepository = new ProductRepository(prisma)
const productRedisRepository = new ProductRedisRepository(redis)
const userService = new UserService(userRepository)

const couponRepository = new CouponRepository(prisma)





const productRedisService = new ProductRedisService(productRedisRepository)
const storeService = new StoreService(storeRepository,productRepository)
const productService = new ProductService( productRepository,productRedisService)

const couponService = new CouponServices(couponRepository,prisma)


const productAdmin = new ProductAdminController(productService,storeService)



const refreshToken = new RefreshTokenController(userService)

const verifyStoreOwnershipMiddle = new VerifyStoreOwnership(storeService)
const couponController = new CouponController(couponService)



const route = Router();

route.use(cartRoute)
route.use(storeRoute)
route.use(productRoute)
route.use(authRoute)



route.post('/product/create',[
    fileUpload.single('image')
    ,Auth
    ,(req:Request,res:Response,next:NextFunction)=>verifyStoreOwnershipMiddle.handler(req,res,next)
],
  (req:Request,res:Response,next:NextFunction)=> productAdmin.createProduct(req,res,next)
)

route.delete('/products/delete',[Auth,
    (req:Request,res:Response,next:NextFunction)=>verifyStoreOwnershipMiddle.handler(req,res,next)],
    (req:Request,res:Response,next:NextFunction)=>productAdmin.DeleteProducts(req,res,next)
)

route.post('/store/create/coupon',[
    Auth,
    (req:Request,res:Response,next:NextFunction)=>verifyStoreOwnershipMiddle.handler(req,res,next)
    ],
    (req:Request,res:Response,next:NextFunction)=>couponController.storeCreateCoupon(req,res,next)
)
route.post('/user/add/coupon',[Auth],
    (req:Request,res:Response,next:NextFunction)=>couponController.userAddCoupon(req,res,next)
)
route.get('/user/list/coupons',[Auth],
  (req:Request,res:Response,next:NextFunction)=>couponController.userListCoupons(req,res,next)
)
route.get('/coupon/available/:page',(req:Request,res:Response,next:NextFunction)=>
  couponController.getAvailableCoupons(req,res,next)
)
/*route.get('/auth/me',(req:Request,res:Response,next:NextFunction)=>{
    
})*/
route.get('/images/:filename', async (req, res) => {
  const { filename } = req.params;

  const signedUrl = await generateSignedUrl(filename);

  res.redirect(signedUrl);
}); 
route.get('/auth/refresh',refreshToken.handler)
 
export default route